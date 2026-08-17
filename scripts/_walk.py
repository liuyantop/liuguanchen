# -*- coding: utf-8 -*-
import os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

def walk(p, depth=0, maxdepth=4):
    if depth > maxdepth:
        return
    try:
        items = sorted(os.listdir(p))
    except Exception as e:
        print('  ' * depth, 'ERR', e)
        return
    for it in items:
        full = os.path.join(p, it)
        print('  ' * depth + it + ('/' if os.path.isdir(full) else ''))
        if os.path.isdir(full) and depth < maxdepth:
            walk(full, depth + 1, maxdepth)

base = r'H:\刘冠辰备份'
walk(base)
