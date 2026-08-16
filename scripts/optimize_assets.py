"""资源优化：PNG/JPG/JPEG → WebP，并更新 index.html / js/main.js 中的引用。

安全策略（默认）：
  - 转换成功后，原文件【移动到备份目录】 assets/_original_backup/，保留相对路径结构。
  - 转换后会重新打开 WebP 校验可读性与尺寸，校验失败则丢弃 WebP、保留原文件。
  - 原文件已不存在（之前已处理过）则跳过，脚本可重复运行（幂等）。

显式删除：
  - 加 --delete 参数才真删除原文件；仅在已确认 WebP 在目标浏览器可用时使用。

依赖：Pillow (PIL)。
"""
import argparse
import os
import shutil
import sys

try:
    from PIL import Image
except ImportError:
    print('Pillow 未安装，请运行: pip install Pillow', file=sys.stderr)
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, 'assets')
EXTS = ('.png', '.jpg', '.jpeg')
TARGETS = [os.path.join(ROOT, 'index.html'), os.path.join(ROOT, 'js', 'main.js')]


def should_skip(name):
    low = name.lower()
    # 备份文件、裁剪预览图不处理（网站未引用）
    return low.endswith('.bak') or 'crop-preview' in low


def verify_webp(path, orig_size):
    """转换后校验：重新打开 WebP 确认可读且尺寸非零。"""
    try:
        with Image.open(path) as im:
            im.verify()
        with Image.open(path) as im:
            w, h = im.size
        return w > 0 and h > 0
    except Exception:  # noqa: BLE001
        return False


def parse_args():
    p = argparse.ArgumentParser(description='PNG/JPG → WebP 转换并更新引用')
    p.add_argument('--delete', action='store_true',
                   help='转换后直接删除原文件（默认：移到 assets/_original_backup/）')
    p.add_argument('--backup-dir', default='assets/_original_backup',
                   help='备份目录（相对项目根，默认 assets/_original_backup）')
    return p.parse_args()


def main():
    args = parse_args()
    backup_root = os.path.join(ROOT, args.backup_dir.replace('/', os.sep))
    converted = {}
    skipped = 0
    failed = 0

    for dirpath, _dirs, files in os.walk(ASSETS):
        # 不递归进备份目录本身
        if os.path.normpath(dirpath).startswith(os.path.normpath(backup_root)):
            continue
        for f in files:
            if not f.lower().endswith(EXTS):
                continue
            if should_skip(f):
                continue
            src = os.path.join(dirpath, f)
            webp = os.path.splitext(src)[0] + '.webp'
            # 同名 .webp 已存在 → 已转换过，跳过原文件（可能是手动保留的 <picture> fallback 源）
            if os.path.exists(webp):
                skipped += 1
                continue
            try:
                img = Image.open(src)
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    img = img.convert('RGBA')
                else:
                    img = img.convert('RGB')
                orig_size = img.size
                img.save(webp, 'WEBP', quality=82, method=6)
            except Exception as e:  # noqa: BLE001
                print(f'FAIL 转换失败，保留原文件: {src} -> {e}')
                failed += 1
                # 清理可能产生的半成品 webp
                if os.path.exists(webp):
                    try:
                        os.remove(webp)
                    except OSError:
                        pass
                continue

            # 校验 WebP 完整性，失败则丢弃 webp、保留原文件
            if not verify_webp(webp, orig_size):
                print(f'FAIL WebP 校验失败，保留原文件: {src}')
                failed += 1
                try:
                    os.remove(webp)
                except OSError:
                    pass
                continue

            rel = os.path.relpath(src, ROOT).replace('\\', '/')
            rel_w = os.path.relpath(webp, ROOT).replace('\\', '/')

            # 处理原文件：删除 或 移到备份目录
            if args.delete:
                os.remove(src)
            else:
                rel_to_assets = os.path.relpath(src, ASSETS)
                dst = os.path.join(backup_root, rel_to_assets)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.move(src, dst)

            converted[rel] = rel_w

    # 按路径长度降序替换，避免短路径误匹配长路径子串
    for tgt in TARGETS:
        if not os.path.exists(tgt):
            continue
        with open(tgt, 'r', encoding='utf-8') as fh:
            content = fh.read()
        for rel in sorted(converted, key=len, reverse=True):
            content = content.replace(rel, converted[rel])
        with open(tgt, 'w', encoding='utf-8') as fh:
            fh.write(content)

    # 报告
    action = '删除' if args.delete else f'移到 {args.backup_dir}/'
    print(f'转换 {len(converted)} 张 → WebP，原文件{action}')
    for rel, rel_w in sorted(converted.items()):
        print(f'  {rel} -> {rel_w}')
    if skipped:
        print(f'跳过 {skipped} 张（同名 .webp 已存在，原文件保留）')
    if failed:
        print(f'失败 {failed} 张（原文件已保留，请检查上方 FAIL 行）')
    if not converted and not failed:
        print('无新文件需处理（原文件可能已转换过）')
    print('已更新引用: ' + ', '.join(os.path.basename(t) for t in TARGETS))


if __name__ == '__main__':
    main()
