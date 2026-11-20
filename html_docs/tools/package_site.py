#!/usr/bin/env python3
"""Đóng gói cẩm nang thành file zip để gửi/đưa lên máy chủ web.

Các bước:
  1. Build lại trang (node tools/build-site.js)
  2. Chạy checker phát hành (qa/check-release.py) và quét rò rỉ POC (capture/check_env_leaks.py)
  3. Gom đúng các file trang web dùng: đi từ index.html theo mọi href/src trong HTML và url() trong CSS
     (không lấy qa/, tools/, docs/, file .md, ảnh không trang nào dùng…)
  4. Nén vào dist/<tên>-<ngày giờ>.zip, mọi file nằm trong một thư mục gốc <tên>/

Chạy (từ thư mục gốc repo hoặc html_docs/):
  uv run --no-project python html_docs/tools/package_site.py
  uv run --no-project python html_docs/tools/package_site.py --no-build --no-check --out /đường/dẫn/gói.zip

Giải nén rồi mở <tên>/index.html (chạy được cả bằng file:// lẫn qua máy chủ web).
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
import zipfile
from datetime import datetime
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit

SITE = Path(__file__).resolve().parent.parent  # html_docs/
REPO = SITE.parent
DEFAULT_NAME = "nab-ai-handbook"

HTML_REF = re.compile(r"""\b(?:href|src)\s*=\s*["']([^"']+)["']""", re.I)
SRCSET = re.compile(r"""\bsrcset\s*=\s*["']([^"']+)["']""", re.I)
CSS_URL = re.compile(r"""url\(\s*["']?([^"')]+)["']?\s*\)""", re.I)
EXTERNAL = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|//|#)", re.I)  # http:, mailto:, data:, javascript:, //cdn, #anchor


def _refs(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    if path.suffix.lower() == ".css":
        return CSS_URL.findall(text)
    refs = HTML_REF.findall(text)
    for value in SRCSET.findall(text):
        refs += [part.strip().split()[0] for part in value.split(",") if part.strip()]
    for style in re.findall(r"<style[^>]*>(.*?)</style>", text, re.S | re.I):
        refs += CSS_URL.findall(style)
    return refs


def _resolve(base_rel: PurePosixPath, ref: str) -> str | None:
    """Đường dẫn tương đối (so với thư mục web) của tham chiếu; None nếu là link ngoài/neo."""
    if EXTERNAL.match(ref):
        return None
    target = unquote(urlsplit(ref).path)
    if not target:
        return None
    parts: list[str] = [] if target.startswith("/") else list(base_rel.parent.parts)
    for part in PurePosixPath(target).parts:
        if part in ("/", "."):
            continue
        if part == "..":
            if not parts:
                return "../" + target.split("../")[-1]
            parts.pop()
        else:
            parts.append(part)
    return "/".join(parts)


def collect_files(root: Path, entry: str = "index.html") -> tuple[list[str], list[str]]:
    """Trả về (danh sách file cần cho web, danh sách tham chiếu hỏng)."""
    root = root.resolve()
    seen: set[str] = set()
    missing: list[str] = []
    queue = [entry]
    while queue:
        rel = queue.pop()
        if rel in seen:
            continue
        seen.add(rel)
        path = root / rel
        if path.suffix.lower() not in (".html", ".htm", ".css"):
            continue
        for ref in _refs(path):
            target = _resolve(PurePosixPath(rel), ref)
            if target is None or target in seen:
                continue
            if target.startswith("../"):
                missing.append(f"{rel} -> {target} (ngoài thư mục web)")
                continue
            file = root / target
            if file.is_dir():
                target = f"{target.rstrip('/')}/index.html"
                file = root / target
            if not file.is_file():
                missing.append(f"{rel} -> {target}")
                seen.add(target)
                continue
            queue.append(target)
    files = sorted(f for f in seen if (root / f).is_file())
    return files, sorted(set(missing))


def write_zip(root: Path, files: list[str], out: Path, top: str) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    tmp = out.with_suffix(out.suffix + ".part")
    # Nén không mất dữ liệu: ảnh giữ nguyên chất lượng, chỉ đóng gói.
    with zipfile.ZipFile(tmp, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for rel in files:
            z.write(root / rel, f"{top}/{rel}")
    tmp.replace(out)


def _run(cmd: list[str], cwd: Path) -> None:
    print(f"$ {' '.join(cmd)}", flush=True)
    result = subprocess.run(cmd, cwd=cwd)
    if result.returncode != 0:
        sys.exit(f"Dừng: lệnh trên lỗi (mã {result.returncode}). Chưa tạo file zip.")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Đóng gói cẩm nang NAB thành file zip.")
    ap.add_argument("--name", default=DEFAULT_NAME, help=f"tên thư mục gốc trong zip (mặc định {DEFAULT_NAME})")
    ap.add_argument("--out", type=Path, help="đường dẫn file zip (mặc định html_docs/dist/<tên>-<ngày giờ>.zip)")
    ap.add_argument("--no-build", action="store_true", help="không build lại trang")
    ap.add_argument("--no-check", action="store_true", help="bỏ qua checker phát hành và quét rò rỉ (không khuyến nghị)")
    args = ap.parse_args(argv)

    if not args.no_build:
        _run(["node", "tools/build-site.js"], SITE)
    if not args.no_check:
        _run([sys.executable, "qa/check-release.py"], SITE)
        _run([sys.executable, str(REPO / "capture" / "check_env_leaks.py"), str(SITE)], REPO)

    files, missing = collect_files(SITE)
    if missing:
        print(f"Dừng: {len(missing)} tham chiếu tới file không có:")
        for item in missing:
            print(f"  - {item}")
        return 1

    out = args.out or SITE / "dist" / f"{args.name}-{datetime.now():%Y%m%d-%H%M}.zip"
    write_zip(SITE, files, out.resolve(), args.name)

    size = sum((SITE / f).stat().st_size for f in files)
    kinds: dict[str, int] = {}
    for f in files:
        kinds[Path(f).suffix.lower() or "(khác)"] = kinds.get(Path(f).suffix.lower() or "(khác)", 0) + 1
    print(f"\nĐã tạo: {out.resolve()}")
    print(f"  {len(files)} file ({', '.join(f'{n} {k}' for k, n in sorted(kinds.items()))})")
    print(f"  dữ liệu gốc {size / 1e6:.1f} MB, file zip {out.stat().st_size / 1e6:.1f} MB")
    print(f"  Giải nén rồi mở {args.name}/index.html")
    return 0


if __name__ == "__main__":
    sys.exit(main())
