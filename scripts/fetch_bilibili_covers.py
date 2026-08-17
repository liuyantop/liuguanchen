"""抓取 B 站视频封面并保存为 WebP（+ JPG 格式 fallback）。

通过 B 站 web-interface/view 接口获取视频封面 URL，下载后用 Pillow 转 WebP。
同时保留原始 JPG 作为 <picture> 元素的格式 fallback（兼容不支持 WebP 的浏览器）。

安全策略（默认）：
  - 目标文件已存在则跳过，脚本可重复运行（幂等）。
  - 加 --force 才覆盖；覆盖前会把原文件移动到 assets/_original_backup/covers/。

依赖：Pillow (PIL)。
"""
import argparse
import json
import os
import shutil
import sys
import urllib.request

try:
    from PIL import Image
except ImportError:
    print('Pillow 未安装，请运行: pip install Pillow', file=sys.stderr)
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COVERS_DIR = os.path.join(ROOT, 'assets', 'covers')

# 网站当前引用的 B 站视频 BV 号（与 js/main.js 中 worksData 的 trailerBvid 一致）
DEFAULT_BVIDS = ['BV1NAbS6xEXT', 'BV1SvbS6YEiv', 'BV1eKbD6GEkL']

API_URL = 'https://api.bilibili.com/x/web-interface/view?bvid={bvid}'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' \
     '(KHTML, like Gecko) Chrome/120.0 Safari/537.36'


def fetch_cover_url(bvid):
    """调用 B 站 API 返回封面 URL，失败返回 None。"""
    url = API_URL.format(bvid=bvid)
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
    except Exception as e:  # noqa: BLE001
        print(f'  [错误] 调用 API 失败: {e}', file=sys.stderr)
        return None
    if data.get('code') != 0:
        print(f'  [错误] API 返回非零: code={data.get("code")} message={data.get("message")}',
              file=sys.stderr)
        return None
    pic = data.get('data', {}).get('pic')
    if not pic:
        print('  [错误] 响应中未找到 data.pic', file=sys.stderr)
        return None
    # B 站返回 http://，统一升级为 https 避免混合内容
    if pic.startswith('http://'):
        pic = 'https://' + pic[len('http://'):]
    return pic


def download(url, dst):
    """下载文件到 dst，返回是否成功。"""
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            with open(dst, 'wb') as f:
                shutil.copyfileobj(resp, f)
        return True
    except Exception as e:  # noqa: BLE001
        print(f'  [错误] 下载失败: {e}', file=sys.stderr)
        return False


def verify_image(path):
    """校验图片可读且尺寸非零。"""
    try:
        with Image.open(path) as im:
            im.verify()
        with Image.open(path) as im:
            w, h = im.size
        return w > 0 and h > 0
    except Exception:  # noqa: BLE001
        return False


def convert_to_webp(src, dst, quality=90):
    """JPG → WebP，返回是否成功。"""
    try:
        with Image.open(src) as im:
            im.convert('RGB').save(dst, 'WEBP', quality=quality, method=6)
        return verify_image(dst)
    except Exception as e:  # noqa: BLE001
        print(f'  [错误] WebP 转换失败: {e}', file=sys.stderr)
        return False


def backup_existing(bvid, backup_root):
    """把已存在的 <BVID>.webp / <BVID>.jpg 移动到备份目录。"""
    for ext in ('.webp', '.jpg'):
        src = os.path.join(COVERS_DIR, bvid + ext)
        if os.path.exists(src):
            rel = os.path.relpath(src, os.path.join(ROOT, 'assets'))
            dst = os.path.join(backup_root, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.move(src, dst)
            print(f'  备份: {src} → {dst}')


def process(bvid, force, backup_root):
    print(f'\n处理 {bvid}:')
    webp_path = os.path.join(COVERS_DIR, bvid + '.webp')
    jpg_path = os.path.join(COVERS_DIR, bvid + '.jpg')

    if not force and (os.path.exists(webp_path) or os.path.exists(jpg_path)):
        print('  已存在，跳过（加 --force 可强制重抓）')
        return 'skipped'

    if force:
        backup_existing(bvid, backup_root)

    os.makedirs(COVERS_DIR, exist_ok=True)

    pic_url = fetch_cover_url(bvid)
    if not pic_url:
        return 'failed'

    print(f'  封面 URL: {pic_url}')
    if not download(pic_url, jpg_path):
        return 'failed'
    if not verify_image(jpg_path):
        print('  [错误] 下载的 JPG 校验失败', file=sys.stderr)
        return 'failed'
    print(f'  已保存 JPG: {jpg_path}')

    if not convert_to_webp(jpg_path, webp_path):
        print('  [警告] WebP 转换失败，仅保留 JPG', file=sys.stderr)
    else:
        print(f'  已保存 WebP: {webp_path}')

    return 'ok'


def parse_args():
    p = argparse.ArgumentParser(description='抓取 B 站视频封面 → WebP + JPG')
    p.add_argument('bvids', nargs='*', default=DEFAULT_BVIDS,
                   help='BV 号列表（默认抓取网站引用的全部）')
    p.add_argument('--force', action='store_true',
                   help='覆盖已存在的封面（原文件备份到 assets/_original_backup/covers/）')
    p.add_argument('--backup-dir', default='assets/_original_backup',
                   help='备份目录（相对项目根，默认 assets/_original_backup）')
    return p.parse_args()


def main():
    args = parse_args()
    backup_root = os.path.join(ROOT, args.backup_dir.replace('/', os.sep))

    results = {'ok': [], 'skipped': [], 'failed': []}
    for bvid in args.bvids:
        status = process(bvid, args.force, backup_root)
        results[status].append(bvid)

    print('\n========== 汇总 ==========')
    print(f'成功: {results["ok"] or "无"}')
    print(f'跳过: {results["skipped"] or "无"}')
    print(f'失败: {results["failed"] or "无"}')
    if results['failed']:
        sys.exit(1)


if __name__ == '__main__':
    main()
