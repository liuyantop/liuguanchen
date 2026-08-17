# 刘冠辰作品集网站 — 视觉设计规范文档

> 版本：2.0 | 更新日期：2026-08-17
> 本文档记录第二轮视觉美化后的完整设计系统规范。

---

## 一、色彩系统 / Color System

### 1.1 品牌色板

| 角色 | 变量名 | 亮色模式 | 暗黑模式 | 用途 |
|---|---|---|---|---|
| **主色** | `--accent` | `#ff3b30` | `#ff4d42` | 按钮、链接、强调 |
| **主色悬停** | `--accent-hover` | `#ff5147` | `#ff6358` | 交互悬停态 |
| **主色渐变** | `--accent-gradient` | `135°, #ff3b30→#ff6b5a→#ff9500` | `135°, #ff4d42→#ff7a6e→#ff9500` | 渐变文字、进度条 |
| **辅助金** | `--gold` | `#c9a227` | `#d4af37` | 序号、装饰线、时间线日期 |
| **辅助靛蓝** | `--indigo` | `#6366f1` | `#818cf8` | 冷调光晕、信息提示 |

### 1.2 中性色板

| 角色 | 亮色 | 暗黑 | 用途 |
|---|---|---|---|
| 背景 | `#fafafa` | `#0a0a0c` | 页面底色 |
| 次背景 | `#f0f0f0` | `#121216` | 交替区块 |
| 表面 | `#ffffff` | `#16161b` | 卡片、输入框 |
| 文字主 | `#1a1a1a` | `#f4f4f7` | 标题、正文 |
| 文字次 | `#555` | `#c9c9d2` | 描述、副标题 |
| 文字弱 | `#6b6b6b` | `#92929c` | 标签、提示 |
| 边框 | `#e5e5e5` | `#26262c` | 分割线、卡片边框 |

### 1.3 阴影系统

```css
--shadow-sm:       轻微浮起（按钮、标签）
--shadow-md:       中等深度（卡片、弹窗）
--shadow-lg:       大深度（悬浮卡片、模态）
--shadow-card:     卡片默认（双层复合阴影）
--shadow-card-hover: 卡片悬停（三层阴影 + 红色边框光）
--shadow-glow-accent: 品牌色辉光（按钮悬停、图标激活）
```

### 1.4 玻璃态

```css
--glass-bg:     rgba(255,255,255,0.72)  /  rgba(22,22,27,0.72)
--glass-border: rgba(255,255,255,0.5)   /  rgba(255,255,255,0.08)
搭配: backdrop-filter: blur(20px) saturate(180%)
```

---

## 二、排版系统 / Typography System

### 2.1 字体族

| 变量 | 字体 | 用途 |
|---|---|---|
| `--font-sans` | Inter, Noto Sans SC | 正文、UI |
| `--font-display` | Playfair Display, Noto Sans SC | 标题、序号、装饰 |
| `--font-zh` | Noto Sans SC | 中文专用 |

### 2.2 字重梯度

| 字重 | 用途 |
|---|---|
| 400 | 正文、描述 |
| 500 | 标签、按钮文字 |
| 600 | 副标题、导航 |
| 700 | 卡片标题、技能名 |
| 800 | 区块标题、姓名 |
| 900 | Hero 大标题 |

### 2.3 字号梯度（1.250 模数比）

| 变量 | 值 | 用途 |
|---|---|---|
| `--text-xs` | 0.75rem (12px) | 标签、徽章 |
| `--text-sm` | 0.875rem (14px) | 描述、元信息 |
| `--text-base` | 1rem (16px) | 正文 |
| `--text-lg` | 1.25rem (20px) | 副标题 |
| `--text-xl` | 1.5rem (24px) | 卡片标题 |
| `--text-2xl` | 2rem (32px) | 弹窗标题 |
| `--text-3xl` | 2.5rem (40px) | 区块标题 |
| `--text-4xl` | 3.5rem (56px) | Hero 标题 |

### 2.4 渐变文字效果

应用于：Hero 强调词、统计数字、模态标题
```css
background: var(--accent-gradient);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 三、组件设计规范 / Component Specs

### 3.1 按钮

| 状态 | 样式 |
|---|---|
| 默认 | 实心黑底 / 描边幽灵 |
| 悬停 | `translateY(-3px)` + 微光扫过 (`::before`) + 品牌色辉光 |
| 按压 | `scale(0.97)` 即时回缩 |
| 焦点 | `outline: 2px solid var(--accent); outline-offset: 3px` |

### 3.2 作品卡片

| 属性 | 值 |
|---|---|
| 圆角 | `var(--radius-lg)` (20px) |
| 默认阴影 | `--shadow-card`（双层复合） |
| 悬停 | `translateY(-8px)` + `--shadow-card-hover` + 渐变边框光 (`::after` mask) |
| 图片缩放 | `scale(1.08)` on hover |
| 覆盖层 | 三段渐变 + `translateY(10px→0)` 入场 |
| 年份徽章 | 玻璃态 + `blur(12px) saturate(180%)` + 半透明边框 |

### 3.3 技能进度条

| 属性 | 值 |
|---|---|
| 高度 | 8px |
| 圆角 | 100px（全圆角） |
| 填充 | `var(--accent-gradient)` 红→橙渐变 |
| 动画 | `width 1.2s var(--ease-out)` + 持续微光扫过 (`shimmer`) |

### 3.4 时间线

| 元素 | 样式 |
|---|---|
| 竖线 | 三色渐变：红(顶)→金(中)→灰(底) |
| 日期 | Playfair Display 斜体，金色 |
| 节点 | 18px 圆，3px 红边框，4px 背景外圈 |
| 节点悬停 | `scale(1.25)` + 红色辉光 |
| 内容卡片 | `--shadow-card` + 悬停 `translateX(8px)` + 红色边框 |

### 3.5 表单输入

| 状态 | 样式 |
|---|---|
| 默认 | 1.5px 边框，`--bg` 背景 |
| 焦点 | 红色边框 + `0 0 0 4px var(--accent-soft)` 光环 + 白色背景 |

### 3.6 联系卡片

- 双层光晕：红色暖光（右上）+ 靛蓝冷光（左下）
- 圆角 `var(--radius-xl)` (24px)
- 联系图标：48px 方形，悬停 `scale(1.08)` + 红色辉光

---

## 四、动画系统 / Animation System

### 4.1 缓动函数

| 变量 | 曲线 | 用途 |
|---|---|---|
| `--ease` | `cubic-bezier(0.25,0.46,0.45,0.94)` | 通用过渡 |
| `--ease-out` | `cubic-bezier(0.16,1,0.3,1)` | 入场动画 |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | 弹性效果 |
| `--ease-bounce` | `cubic-bezier(0.68,-0.55,0.265,1.55)` | 回弹效果 |

### 4.2 关键帧动画

| 动画名 | 用途 | 时长 |
|---|---|---|
| `heroEntrance` | Hero 元素交错淡入上滑 | 0.8s |
| `glowFloat` | 红色光晕浮动 | 8s infinite |
| `glowFloat2` | 紫色光晕浮动 | 10s infinite |
| `shimmer` | 进度条/按钮微光扫过 | 2s infinite |
| `dotPulse` | Hero 标签圆点脉冲 | 2s infinite |
| `scrollLine` | 滚动指示线缩放 | 2s infinite |

### 4.3 交互时序

| 交互 | 时长 | 缓动 |
|---|---|---|
| 按钮悬停 | 0.35s | `--ease` |
| 卡片悬停 | 0.5s | `--ease-out` |
| 图片缩放 | 0.6s | `--ease` |
| 入场动画 | 0.8s | `--ease-out` |
| 弹性反馈 | 0.3-0.4s | `--ease-spring` |

### 4.4 可访问性

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.001ms !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
    }
}
```

---

## 五、圆角系统 / Radius System

| 变量 | 值 | 用途 |
|---|---|---|
| `--radius-sm` | 8px | 小元素、标签 |
| `--radius-md` | 12px | 输入框、图标容器 |
| `--radius-lg` | 20px | 卡片、照片 |
| `--radius-xl` | 24px | 大卡片、联系卡片 |
| 100px | 全圆角 | 按钮、徽章、进度条 |

---

## 六、视觉前后对比 / Before & After

### 6.1 色彩方案

| 元素 | 前（v1） | 后（v2） |
|---|---|---|
| 区块序号 | 红色 `--accent` | 金色 `--gold` |
| 时间线日期 | 红色 `--accent` | 金色 `--gold` |
| 时间线竖线 | 红→灰双色渐变 | 红→金→灰三色渐变 |
| 照片装饰框 | 红色边框 | 金色边框 + 金色辉光 |
| 联系卡片光晕 | 单层红色 | 双层（红 + 靛蓝） |
| 色彩丰富度 | 单一红色系 | 红 + 金 + 靛蓝三色系 |

### 6.2 排版效果

| 元素 | 前（v1） | 后（v2） |
|---|---|---|
| Hero 强调词 | 纯红色 | 红→橙渐变文字 |
| 统计数字 | 纯黑色 | 红→橙渐变文字 |
| 模态标题 | 纯色 | 深色渐变文字 |
| 角色头衔 | 纯文字 | 红色圆点装饰前缀 |
| 统计标签 | 普通文字 | 大写 + 字间距 |

### 6.3 组件精致度

| 组件 | 前（v1） | 后（v2） |
|---|---|---|
| 作品覆盖层 | 双段渐变，无位移 | 三段渐变 + translateY 入场 |
| 作品年份徽章 | 简单半透明 | 玻璃态 + 边框 + saturate |
| 技能进度条 | 6px，简单渐变 | 8px，全圆角 + shimmer |
| 技能卡片图标 | 纯色文字 | 背景色块 + 悬停旋转放大 |
| 时间线节点 | 简单圆点 | 外圈光环 + 悬停辉光 |
| 时间线卡片 | 无默认阴影 | 复合阴影 + 悬停红色边框 |
| 筛选按钮 | 无悬停位移 | `translateY(-1px)` 上浮 |
| 联系图标 | 简单变色 | `scale(1.08)` + 辉光阴影 |
| 标签 | 简单变色 | 弹性放大 + 辉光阴影 |

### 6.4 交互反馈

| 交互 | 前（v1） | 后（v2） |
|---|---|---|
| 卡片悬停 | 简单上浮 + 阴影 | 上浮 + 三层阴影 + 渐变边框光 |
| 按钮点击 | 无反馈 | `scale(0.97)` 即时回缩 |
| 按钮微光 | 无 | `::before` 光带扫过 |
| 时间线悬停 | 简单变色 | 节点辉光 + 卡片位移 + 边框高亮 |
| 技能图标悬停 | 无反馈 | 旋转 -5° + 放大 1.1 + 背景填充 |

---

## 七、文件清单 / File Manifest

| 文件 | 修改内容 |
|---|---|
| `css/style.css` | 设计系统变量、组件样式、视觉增强系统（300+ 行新增） |
| `css/style.min.css` | 压缩产出（59183 字节） |
| `index.html` | hero-glow-2、contact-card-glow-2 元素 |

---

## 八、设计原则 / Design Principles

1. **三色平衡**：红色（行动）+ 金色（装饰）+ 靛蓝（氛围），避免单一色彩疲劳
2. **分层深度**：双层复合阴影 + 玻璃态 + 辉光，营造空间纵深感
3. **渐进反馈**：hover → transform → shadow → glow，三层递进
4. **弹性交互**：`--ease-spring` 用于需要"活力感"的元素（图标、标签）
5. **可访问性优先**：`:focus-visible` 焦点环 + `prefers-reduced-motion` 尊重用户偏好
6. **性能意识**：仅使用 GPU 加速属性（transform/opacity），避免 reflow
