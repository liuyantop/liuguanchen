# -*- coding: utf-8 -*-
import os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
import pypdf

base = r'H:\刘冠辰备份\毕设\二辩\基于情境体验的游戏场景设计研究-毕业设计方案册及其他'
files = [
    '01.毕业设计方案册.pdf',
    '02.毕业设计过程,.pdf',
    '03.游戏场景设计静态图（共6份）.pdf',
    '05.游戏场景海报设计（共5份）.pdf',
    '06.游戏场景杂志设计.pdf',
    '07.游戏场景logo设计.pdf',
]
for fn in files:
    f = os.path.join(base, fn)
    try:
        r = pypdf.PdfReader(f)
        print(f'===== {fn} | pages={len(r.pages)} =====')
        for i, p in enumerate(r.pages):
            t = p.extract_text() or '[NO TEXT]'
            print(f'--- P{i+1} ---')
            print(t[:800])
    except Exception as e:
        print(f'ERROR {fn}: {e}')
