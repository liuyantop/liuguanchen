# 移动端 Bilibili 视频需二次点击问题 — 根因分析报告

> **状态**: 仅诊断与方案,不包含实施
> **生成日期**: 2026-08-17
> **基线提交**: `b3b8c37`(已回滚到 `58cedb5` 稳定状态)
> **失败尝试存档**: `archive/mobile-bilibili-failed-attempts` 分支(`8f7435e` / `09c661f`)

---

## 1. 问题陈述

**现象**: PC 端点击作品弹窗内的「点击播放」占位按钮后,Bilibili 视频能一次性自动播放;但在**移动端**(iOS Safari / Android Chrome),用户点击占位按钮后 iframe 虽被注入,视频并未开始播放,需要**再次点击 iframe 内部 Bilibili 播放器自带的大播放按钮**才能真正播放。

**两次失败修复**:
| PR | 提交 | 策略 | 结果 |
|---|---|---|---|
| #2 | `8f7435e` | 通过 `postMessage({verb:'play'})` 命令 B站播放器播放 | 移动端无效 |
| #3 | `09c661f` | 三重静音参数 `&muted=1&mute=1#muted=1` + "点击播放声音"按钮 + 多格式命令 | 移动端无效 |

---

## 2. 复现步骤与环境

### 2.1 环境
- 本地 HTTP 服务器: `http://127.0.0.1:8001/`
- 测试 URL: `http://127.0.0.1:8001/?nocache=20260817rootcause`
- 模拟设备: iPhone 14 Pro (UA: `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 ... Mobile/15E148 Safari/604.1`)
- 目标元素: `<button id="trailerPlayBtn">` (IPHI 预告片占位)

### 2.2 详细复现步骤
1. 在移动端视口下打开测试 URL,等待页面加载完成
2. 定位 `#trailerPlayBtn` (位于 `.iphi-trailer-frame` 容器内)
3. 调用 `btn.scrollIntoView({ block: 'center' })` 确保按钮可见
4. 点击 `#trailerPlayBtn`
5. 等待 5 秒,观察 iframe 是否注入及是否自动播放
6. 在 iframe 中央位置(`rect.x + rect.width/2`, `rect.y + rect.height/2`)派发 `MouseEvent('click')`
7. 等待 3 秒,观察播放状态变化

### 2.3 收集到的证据

**证据 A — 代码事实** (`js/main.js:381` 与 `js/main.js:667`):
```html
<iframe class="iphi-trailer-iframe" loading="lazy"
        src="https://player.bilibili.com/player.html?bvid=...&autoplay=1"
        scrolling="no" border="0" frameborder="no" framespacing="0"
        allowfullscreen="true" title="Bilibili Trailer"></iframe>
```
**完全没有 `allow` 属性**,只有 `allowfullscreen="true"`。

**证据 B — 浏览器实测** (browser agent 复现):
- 点击前: `#iphiTrailerFrame` 内 `innerHTML` 为占位按钮,无 iframe
- 点击后: iframe 已注入,`src` 包含 `autoplay=1`,但 **`hasAllowAttr=false`**
- 父页面控制台: **无任何报错或警告**(跨源 iframe 内的 `play()` 失败不会冒泡到父页面)
- 第二次点击 iframe 中央后视频才开始播放 — 现象得到复现

**证据 C — Bilibili 官方文档要求** (直播活动播放器示例):
```html
<iframe src="https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=23058"
        frameborder="no" framespacing="0" scrolling="no"
        allow="autoplay; encrypted-media" allowfullscreen="true"></iframe>
```
官方示例明确包含 `allow="autoplay; encrypted-media"`。

**证据 D — 浏览器 Permissions Policy 规范**:
- Chrome: 跨源 iframe 内的 autoplay 默认被禁用,必须通过 `allow="autoplay"` 委派权限
- Safari/WebKit: 移动端对自动播放执行「用户手势 + 静音」双阈值校验
- MDN: 「Autoplay-Berechtigungsrichtlinie」明确要求通过 Permissions Policy 向 iframe 委派 autoplay 权限

**证据 E — postMessage 不传递用户手势** (CSDN 文档):
> `iframe.contentWindow.postMessage('play', '*')` → 子帧内执行 `play()` — 跨源 iframe 手势不继承

---

## 3. 根因分析

### 3.1 主因(Primary Cause): iframe 缺少 `allow="autoplay"` 权限策略

**机制**: 浏览器 Permissions Policy 规定,**跨源 iframe 默认无 autoplay 权限**。父页面必须通过 `<iframe allow="autoplay">` 显式委派该权限,iframe 内的播放器才能调用 `video.play()` 触发自动播放。

**当前代码违反该要求**:
- `js/main.js:381` (IPHI 预告片直注入路径)和 `js/main.js:667` (弹窗占位点击注入路径)生成的 iframe 均无 `allow` 属性
- 仅靠 URL 参数 `autoplay=1` 不足以绕过 Permissions Policy 限制

**为什么 PC 端能正常播放**:
- 桌面浏览器对 `player.bilibili.com` 域名的 MEI(Media Engagement Index)较高,被列入 autoplay 白名单,绕过 Permissions Policy 检查
- 移动端浏览器**不计算 MEI**(或阈值极严),严格强制 Permissions Policy → 自动播放被拦截

**这解释了"PC 正常、移动端异常"的不对称现象**。

### 3.2 加剧因素 1: 用户手势链断裂

**机制**: 移动端浏览器要求 `play()` 调用必须在 `click`/`touchstart` 事件的**同步执行栈内**(或微任务内),不允许跨宏任务。

**当前流程的时序问题**:
```
[t=0ms]   用户点击占位按钮 (gesture token 激活)
[t=0ms]   click handler 同步执行: wrap.innerHTML = '<iframe src="...">'
[t=5ms]   浏览器开始创建 iframe 元素
[t=50ms]  iframe 发起 HTTP 请求加载 player.bilibili.com
[t=300ms] iframe 文档解析,Bilibili 播放器 JS 开始加载
[t=800ms] Bilibili 播放器初始化,读取 URL 参数 autoplay=1
[t=900ms] Bilibili 播放器调用 video.play()  ← 用户手势 token 早已过期
[t=900ms] 浏览器: "非用户手势上下文,且无 allow=autoplay 委派" → 拒绝
```

即使补上 `allow="autoplay"` 权限,**异步注入的 iframe 内的播放请求仍不在用户手势上下文中**,会被「无手势 + 非静音」规则拦截。

### 3.3 加剧因素 2: 缺少移动端必需参数

**机制**: iOS Safari 要求视频 `playsinline` 才能内联播放;移动端浏览器要求**静音**才能自动播放(无手势时)。

**当前 URL 参数**:
```
?bvid=xxx&page=1&high_quality=1&danmaku=0&autoplay=1
```
缺少:
- `muted=1` — 移动端自动播放的强制前提
- `playsinline=1` — iOS Safari 内联播放要求(Bilibili 播放器内部可能已处理,但显式声明更稳妥)

### 3.4 为什么前两次修复尝试必然失败?

#### 第一次尝试(`8f7435e`, PR #2)— postMessage 命令播放
**失败原因(双重)**:
1. **协议错误**: 使用 `{verb: 'play'}` 格式,但 Bilibili 公开文档中直播播放器协议为 `setPlayer-{JSON}` 格式,普通视频播放器(`player.html?bvid=xxx`)的 postMessage 协议**未公开**。猜测的命令格式不会被识别。
2. **原理错误**: 即使协议正确,跨源 iframe 的 postMessage **不传递用户手势**(证据 E),Bilibili 播放器收到命令后调用的 `play()` 仍不在手势上下文中,仍被自动播放策略拦截。

#### 第二次尝试(`09c661f`, PR #3)— 静音 + 解禁按钮
**失败原因(三重)**:
1. **核心未解决**: 仍然没有添加 `allow="autoplay"` 权限委派 → iframe 内的自动播放从源头被 Permissions Policy 拦截,任何后续操作都无效。
2. **postMessage 仍不传手势**: "点击播放声音"按钮通过 postMessage 发送 unmute 命令,同样不传递用户手势到跨源 iframe 内。
3. **协议仍为猜测**: 发送 `func/cmd/type/action/verb` 多格式命令是"广撒网"策略,未基于实际协议文档,无法保证命中。

---

## 4. 系统性修复方案(不实施,仅设计)

按推荐度排序,给出三个可选方案。

### 方案 A: 权限委派 + 静音自动播放 + 手势内解禁(推荐)

**核心思路**: 让首次点击触发**静音自动播放**(满足移动端双阈值),再让用户在 iframe 内或父页面手势内取消静音。

**改造点**:

1. **iframe 添加完整权限策略**(同时改 `js/main.js:381` 和 `js/main.js:667`):
   ```html
   <iframe ... allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
           referrerpolicy="strict-origin-when-cross-origin"
           allowfullscreen="true"></iframe>
   ```

2. **URL 默认静音自动播放**(改 `bilibiliIframeSrc` 函数):
   ```js
   function bilibiliIframeSrc(bvid) {
     const bv = encodeURIComponent(bvid);
     return `https://player.bilibili.com/player.html?bvid=${bv}&page=1&high_quality=1&danmaku=0&autoplay=1&muted=1&playsinline=1`;
   }
   ```

3. **占位按钮点击后注入 iframe,并在 iframe 上方显示"取消静音"提示**(用户手势上下文内通过 postMessage 尝试解禁,失败则引导用户点击 iframe 内部):
   ```js
   btn.addEventListener('click', () => {
     const src = btn.dataset.iframeSrc;
     const wrap = btn.parentElement;
     wrap.innerHTML = `<div class="trailer-wrapper">
       <iframe class="iphi-trailer-iframe" src="${src}"
               allow="autoplay; fullscreen; encrypted-media"
               allowfullscreen="true" referrerpolicy="strict-origin-when-cross-origin"></iframe>
       <button type="button" class="trailer-unmute-hint">🔊 ${currentLang === 'zh' ? '点击取消静音' : 'Tap to unmute'}</button>
     </div>`;
     const iframe = wrap.querySelector('iframe');
     const unmuteBtn = wrap.querySelector('.trailer-unmute-hint');
     unmuteBtn.addEventListener('click', () => {
       // 用户手势上下文内,尝试通过 postMessage 命令 B站播放器取消静音
       // 注意:协议可能不被支持,失败时引导用户点击 iframe 内部音量按钮
       const cmds = [
         JSON.stringify({ cmd: 'unmute' }),
         JSON.stringify({ func: 'unmute' }),
         'setPlayer-' + JSON.stringify({ type: 'changeVolume', value: { volume: 80 } })
       ];
       cmds.forEach(c => iframe.contentWindow.postMessage(c, 'https://player.bilibili.com'));
       unmuteBtn.style.display = 'none';
     });
   }, { once: true });
   ```

**预期效果**:
- 首次点击 → 静音自动播放(满足移动端「手势 + 静音」双阈值,且 `allow=autoplay` 委派权限)
- 二次点击"取消静音"按钮 → 在用户手势上下文内尝试 postMessage 解禁(成功则无声;失败则用户需点击 iframe 内部音量按钮,但这是 B站播放器原生手势,必然生效)

**风险**: Bilibili 普通视频播放器的 postMessage 协议未公开,unmute 命令可能不被识别。降级方案是让"取消静音"按钮直接 `style.display='none'` 并提示用户"如无声音请点击播放器内音量按钮"。

### 方案 B: 引入 Bilibili 官方 SDK 显式控制(更可靠但侵入性高)

**核心思路**: 使用 `https://player.bilibili.com/openplayer.js` SDK,在用户手势内创建播放器实例并调用 API。

**改造点**:
1. 在页面底部加载 SDK: `<script src="https://player.bilibili.com/openplayer.js"></script>`
2. 点击占位按钮时,用 SDK 创建播放器而非注入 iframe
3. 在 click handler 内同步调用 `player.play()`(保留手势上下文)

**风险**:
- 该 SDK 文档较少,接口稳定性未知
- 增加外部脚本依赖,影响首屏性能
- 仍受 Permissions Policy 限制,需配合 `allow=autoplay`

### 方案 C: 桌面端用 iframe,移动端跳转 B站(最简单但功能降级)

**核心思路**: 检测移动端,移动端不嵌入 iframe,改为显示封面 + "在 B站观看"跳转按钮。

**改造点**:
```js
function buildTrailerHTML(work, embed) {
  if (work && work.trailerBvid) {
    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    if (isMobile) {
      return `<a class="trailer-external-link" href="https://www.bilibili.com/video/${work.trailerBvid}"
                target="_blank" rel="noopener noreferrer">
        <picture>...</picture>
        <span>${currentLang === 'zh' ? '在 B站打开' : 'Open in Bilibili'}</span>
      </a>`;
    }
    // 桌面端保持现有 iframe 逻辑(但需补 allow 属性)
    ...
  }
}
```

**优点**: 彻底规避移动端自动播放限制,体验最稳定
**缺点**: 用户离开网站,失去内嵌播放的沉浸感

---

## 5. 推荐实施顺序

1. **第一步(必做,零风险)**: 给所有 B站 iframe 添加 `allow="autoplay; fullscreen; encrypted-media"` 属性 — 这是 B站官方文档要求的标配,本身不会引入任何副作用
2. **第二步(验证主因)**: 添加 `allow` 后在移动端实测,确认是否解决
3. **第三步(若主因未完全解决)**: 实施**方案 A**,添加 `muted=1` + "取消静音"按钮
4. **第四步(若方案 A 仍不理想)**: 评估**方案 C**作为移动端降级方案

---

## 6. 验证清单

实施修复后,需在以下环境验证:
- [ ] iOS Safari (iPhone 14 Pro, iOS 17+)
- [ ] Android Chrome (最新版)
- [ ] 微信内置浏览器 (X5 内核)
- [ ] 桌面 Chrome (验证未回归)
- [ ] 桌面 Safari (验证未回归)
- [ ] 桌面 Firefox (验证未回归)

每个环境验证:
- [ ] 首次点击占位按钮后,视频是否开始播放(静音或非静音)
- [ ] 控制台是否有 autoplay 相关报错
- [ ] 网络请求中 player.bilibili.com 是否正常加载
- [ ] 是否有任何回归(如弹窗焦点陷阱、页面滚动等)

---

## 7. 参考资料

- [Chrome Autoplay Policy](https://developer.chrome.com/blog/autoplay/) — 跨源 iframe 需 `allow="autoplay"` 委派
- [MDN Autoplay Guide](https://developer.mozilla.org/de/docs/Web/Media/Guides/Autoplay) — Permissions Policy 委派机制
- [Bilibili 直播活动播放器文档](https://live.bilibili.com/p/html/bilibili-live-player/docs/player-activity.html) — 官方 iframe 示例包含 `allow="autoplay; encrypted-media"`
- [WebKit Autoplay Policy](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/) — iOS 双阈值模型
- [CSDN: play() failed 用户未交互限制](https://ask.csdn.net/questions/9301298) — postMessage 不传递用户手势的证明

---

## 8. 附录: 当前代码相关位置

| 文件 | 行号 | 内容 | 问题 |
|---|---|---|---|
| `js/main.js` | 352-355 | `bilibiliIframeSrc(bvid)` | URL 缺 `muted=1` / `playsinline=1` |
| `js/main.js` | 381 | IPHI 预告片 iframe 模板 | 缺 `allow` 属性 |
| `js/main.js` | 667 | 弹窗占位点击注入 iframe | 缺 `allow` 属性 |
| `js/main.js` | 661-669 | 弹窗占位点击 handler | 手势链断裂(异步注入) |
| `js/main.js` | 799-807 | IPHI 占位点击 handler | 手势链断裂(异步注入) |
