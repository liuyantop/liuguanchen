# -*- coding: utf-8 -*-
import os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

root = r'H:\刘冠辰备份'
targets = []
for r, dirs, fnames in os.walk(root):
    for fn in fnames:
        if '游戏场景' in fn and fn.lower().endswith('.pdf'):
            targets.append(os.path.join(r, fn))
for t in sorted(targets):
    print(os.path.exists(t), '|', repr(t))
print('count:', len(targets))
