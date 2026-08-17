# -*- coding: utf-8 -*-
import os, sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
import pypdf

base = r'H:\刘冠辰备份\毕设\二辩\基于情境体验的游戏场景设计研究-毕业设计方案册及其他'
outroot = os.path.join(os.environ.get('TEMP', '/tmp'), 'baishe_imgs')
os.makedirs(outroot, exist_ok=True)

jobs = [
    ('01.毕业设计方案册.pdf', 'fangan'),
    ('02.毕业设计过程,.pdf', 'guocheng'),
    ('03.游戏场景设计静态图（共6份）.pdf', 'jingtai'),
    ('05.游戏场景海报设计（共5份）.pdf', 'haibao'),
    ('06.游戏场景杂志设计.pdf', 'zazhi'),
    ('07.游戏场景logo设计.pdf', 'logo'),
]
for fn, tag in jobs:
    f = os.path.join(base, fn)
    try:
        r = pypdf.PdfReader(f)
        for i, page in enumerate(r.pages):
            if not getattr(page, 'images', None):
                continue
            for j, img in enumerate(page.images):
                ext = os.path.splitext(img.name)[1] or '.img'
                ext = ext.lower()
                safe = tag + f'_p{i+1}_im{j+1}' + ext
                with open(os.path.join(outroot, safe), 'wb') as fo:
                    fo.write(img.data)
                print('OK', safe, len(img.data))
    except Exception as e:
        print('ERR', fn, e)
print('OUTROOT', outroot)
