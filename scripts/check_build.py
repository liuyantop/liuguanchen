"""发布前资源完整性校验。

检查内容：
1. index.html / 404.html 中引用的所有本地资源（css/js/图片/pdf 等）存在且非空；
2. 被引用的 .min 压缩文件非空（防空文件事故，如 style.min.css 为 0 字节）；
3. js/main.js 中动态引用的 assets/ 资源存在。

用法：
    python3 scripts/check_build.py

退出码：
- 0：全部通过
- 1：存在缺失或空文件
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 需要检查引用完整性的 HTML 文件
HTML_FILES = ['index.html', '404.html']
# JS 中需要额外扫描 assets 引用的文件
JS_FILES = ['js/main.js']

# 匹配标签属性中的相对路径引用（排除协议、锚点、data:、mailto:、tel:、空值）
_REF_RE = re.compile(
    r'''(?:src|href|poster|data-src|srcset)\s*=\s*["']([^"']+)["']''',
    re.IGNORECASE,
)
# srcset 用逗号分隔多张图，需要单独提取
_SRCSET_ITEM_RE = re.compile(r'(?:^|,)\s*([^\s,]+)\s+\d+[wx]', re.IGNORECASE)
_ASSETS_RE = re.compile(r'assets/[a-zA-Z0-9/_.-]+\.(?:jpg|jpeg|png|webp|pdf|svg|gif|ico)', re.IGNORECASE)


def _is_external(ref: str) -> bool:
    """判断是否为外部/非文件引用（协议、data:、mailto:、tel:、# 锚点、/ 根路径、空）。"""
    if not ref or ref.startswith(('//', '/', 'http:', 'https:', 'data:', 'mailto:', 'tel:', '#', '{', '%')):
        return True
    return False


def _strip_query(ref: str) -> str:
    """去掉 query string / hash（如 js/main.js?v=1 → js/main.js）。"""
    return ref.split('?')[0].split('#')[0]


def collect_refs(html_path: str):
    """收集 HTML 中所有本地资源引用。"""
    refs = []
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    for m in _REF_RE.finditer(content):
        ref = m.group(1)
        if _is_external(ref):
            continue
        ref = _strip_query(ref)
        if ref:
            refs.append(ref)
    # srcset 属性内容（如 "a.webp 1x, b.webp 2x"）
    for m in re.finditer(r'srcset\s*=\s*["\']([^"\']+)["\']', content, re.IGNORECASE):
        for item in _SRCSET_ITEM_RE.finditer(m.group(1)):
            if not _is_external(item.group(1)):
                refs.append(item.group(1))
    return sorted(set(refs))


def collect_js_assets(js_path: str):
    """收集 JS 中引用的 assets/ 资源。"""
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    return sorted(set(_ASSETS_RE.findall(content)))


def check_refs(refs, source_label, errors):
    """校验一组引用对应的文件存在且非空。"""
    for ref in refs:
        path = os.path.join(ROOT, ref)
        if not os.path.exists(path):
            errors.append(f'[缺失] {source_label} 引用 {ref} 不存在')
            continue
        size = os.path.getsize(path)
        if size == 0:
            errors.append(f'[空文件] {source_label} 引用 {ref} 大小为 0 bytes')
            continue
        # 显式标记 .min 产物的非空校验，便于在输出中识别
        if ref.endswith('.min.css') or ref.endswith('.min.js'):
            print(f'  [OK] {ref} ({size} bytes, 压缩产物非空)')
        else:
            print(f'  [OK] {ref} ({size} bytes)')


def main():
    errors = []
    for html in HTML_FILES:
        html_path = os.path.join(ROOT, html)
        if not os.path.exists(html_path):
            errors.append(f'[缺失] HTML 文件不存在: {html}')
            continue
        print(f'\n== {html} 引用的本地资源 ==')
        refs = collect_refs(html_path)
        check_refs(refs, html, errors)

    for js in JS_FILES:
        js_path = os.path.join(ROOT, js)
        if not os.path.exists(js_path):
            errors.append(f'[缺失] JS 文件不存在: {js}')
            continue
        print(f'\n== {js} 动态引用的 assets 资源 ==')
        assets = collect_js_assets(js_path)
        check_refs(assets, js, errors)

    print()
    if errors:
        for e in errors:
            print(e)
        print(f'\n[失败] 共 {len(errors)} 个问题，请修复后重新校验')
        sys.exit(1)
    print('[成功] 全部资源存在且非空，可发布')


if __name__ == '__main__':
    main()
