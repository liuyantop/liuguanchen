"""一次性压缩：CSS/JS → .min 版本。
依赖：csscompressor (CSS 安全)、jsmin (JS)。
注意：main.js 大量使用 ES6 模板字符串，jsmin 对反引号字符串处理可能不完美，
因此 JS 压缩后会做一次完整性校验（含模板字符串标记），失败则不产出 .min 并提示。
"""
import os
import sys

try:
    from csscompressor import compress as css_min
except ImportError:
    print('[错误] 缺少依赖 csscompressor，请执行: pip install csscompressor', file=sys.stderr)
    sys.exit(1)

try:
    from jsmin import jsmin
except ImportError:
    print('[错误] 缺少依赖 jsmin，请执行: pip install jsmin', file=sys.stderr)
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def minify_css():
    src = os.path.join(ROOT, 'css', 'style.css')
    out = os.path.join(ROOT, 'css', 'style.min.css')
    with open(src, 'r', encoding='utf-8') as f:
        data = f.read()
    mini = css_min(data)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(mini)
    print(f'CSS: {len(data)} -> {len(mini)} bytes ({100*len(mini)/len(data):.1f}%)')


def minify_js():
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
