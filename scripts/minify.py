"""一次性压缩：CSS/JS → .min 版本。
CSS 会优先使用 csscompressor；缺少依赖时使用内置保守压缩器。
JS 会优先使用 jsmin；缺少依赖时跳过 JS 压缩，因为 main.js 使用大量模板字符串。
"""
import os
import re

try:
    from csscompressor import compress as css_min
except ImportError:
    css_min = None

try:
    from jsmin import jsmin
except ImportError:
    jsmin = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _strip_css_comments(css):
    result = []
    i = 0
    quote = None
    while i < len(css):
        ch = css[i]
        nxt = css[i + 1] if i + 1 < len(css) else ''
        if quote:
            result.append(ch)
            if ch == '\\' and i + 1 < len(css):
                result.append(css[i + 1])
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue
        if ch in ('"', "'"):
            quote = ch
            result.append(ch)
            i += 1
            continue
        if ch == '/' and nxt == '*':
            i += 2
            while i + 1 < len(css) and not (css[i] == '*' and css[i + 1] == '/'):
                i += 1
            i += 2
            continue
        result.append(ch)
        i += 1
    return ''.join(result)


def conservative_css_min(css):
    """保留 calc() 所需空格的基础压缩器，避免激进改写导致样式失效。"""
    css = _strip_css_comments(css)
    css = re.sub(r'\s+', ' ', css).strip()
    css = re.sub(r'\s*([{}:;,>])\s*', r'\1', css)
    css = re.sub(r';}', '}', css)
    css = re.sub(r'\s*([~|^$*]?=)\s*', r'\1', css)
    return css


def minify_css():
    src = os.path.join(ROOT, 'css', 'style.css')
    out = os.path.join(ROOT, 'css', 'style.min.css')
    with open(src, 'r', encoding='utf-8') as f:
        data = f.read()
    if css_min:
        mini = css_min(data)
        method = 'csscompressor'
    else:
        mini = conservative_css_min(data)
        method = 'built-in conservative'
    with open(out, 'w', encoding='utf-8') as f:
        f.write(mini)
    print(f'CSS ({method}): {len(data)} -> {len(mini)} bytes ({100*len(mini)/len(data):.1f}%)')


def minify_js():
    if jsmin is None:
        print('JS: 缺少 jsmin，跳过 JS 压缩；index.html 继续引用 main.js 源文件')
        return False
    src = os.path.join(ROOT, 'js', 'main.js')
    out = os.path.join(ROOT, 'js', 'main.min.js')
    with open(src, 'r', encoding='utf-8') as f:
        data = f.read()
    mini = jsmin(data)
    # 完整性校验：模板字符串反引号数量必须成对、关键函数名必须保留
    if mini.count('`') % 2 != 0:
        print('JS: 模板字符串反引号不成对，跳过压缩（保留源文件）', file=sys.stderr)
        return False
    for key in ['worksData', 'renderWorks', 'openModal', 'applyLanguage', 'CONTACT']:
        if key not in mini:
            print(f'JS: 压缩后丢失关键标识符 {key}，跳过压缩', file=sys.stderr)
            return False
    with open(out, 'w', encoding='utf-8') as f:
        f.write(mini)
    print(f'JS:  {len(data)} -> {len(mini)} bytes ({100*len(mini)/len(data):.1f}%)')
    return True


minify_css()
ok = minify_js()
if not ok:
    print('JS 未产出 min 版本，index.html 将继续引用 main.js 源文件')
