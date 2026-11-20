#!/usr/bin/env python3
"""Kiểm tra rò rỉ môi trường POC trong html_docs/ (chỉ đọc).

Luật đề xuất gộp vào html_docs/qa/check-release.py ở giai đoạn 2:
  - chuỗi `nab-quick-poc` không được xuất hiện trong bất kỳ file văn bản nào của html_docs/
  - URL portal/Quick của POC (lấy host từ .env nếu có, KHÔNG in giá trị) không được xuất hiện
  - Directory ID Identity Center (d-xxxxxxxxxx) không được xuất hiện

Chỉ quét gói phát hành (index.html, chapters/, assets/, logo/) nếu có; nếu không, quét cả thư mục.
Chạy:  uv run --no-project python capture/check_env_leaks.py [html_docs]
Ảnh (PNG/JPG) không quét được bằng văn bản — cần duyệt bằng mắt/OCR (ghi trong gap report).
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
TEXT_SUFFIXES = {".html", ".js", ".css", ".md", ".json", ".txt", ".py", ".svg", ".xml"}
POC_ACCOUNT = "nab-quick-poc"
# Gói phát hành (spec): chỉ quét những gì gửi cho người dùng; qa/ chứa chính luật kiểm tra.
RELEASE_PACKAGE = ("index.html", "chapters", "assets", "logo")
LIVE_PORTAL_HOSTS = {"nab-opba-ai.awsapps.com", "ssoins-7223f5880341d54d.portal.us-east-1.app.aws"}


def poc_hosts_from_env() -> list[str]:
    """Đọc host POC từ .env mà không in giá trị ra ngoài."""
    env_file = ROOT / ".env"
    hosts: list[str] = []
    if not env_file.is_file():
        return hosts
    for line in env_file.read_text(encoding="utf-8").splitlines():
        key, _, value = line.partition("=")
        if key.strip() in {"QUICK_START_URL", "QUICK_APP_URL"} and value.strip():
            host = urlsplit(value.strip().strip('"\'')).netloc
            if host and host not in LIVE_PORTAL_HOSTS and "quicksight.aws.amazon.com" not in host:
                hosts.append(host)
    return hosts


def main() -> int:
    target = (Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "html_docs").resolve()
    patterns: list[tuple[str, re.Pattern[str]]] = [
        ("chuỗi account name POC", re.compile(re.escape(POC_ACCOUNT), re.I)),
        ("Directory ID Identity Center", re.compile(r"\bd-[0-9a-f]{10}\b")),
    ]
    patterns += [(f"URL portal POC (host #{i + 1} từ .env)", re.compile(re.escape(h), re.I)) for i, h in enumerate(poc_hosts_from_env())]
    errors: list[str] = []
    roots = [target / item for item in RELEASE_PACKAGE if (target / item).exists()] or [target]
    files = sorted({f for r in roots for f in ([r] if r.is_file() else r.rglob("*"))})
    for path in files:
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        if any(part in {".git", "node_modules", "__pycache__"} for part in path.parts):
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for label, pattern in patterns:
            hits = len(pattern.findall(text))
            if hits:
                errors.append(f"{path.relative_to(target).as_posix()}: {label} xuất hiện {hits} lần")
    if errors:
        print(f"FAIL: {len(errors)} vi phạm môi trường POC")
        for error in errors:
            print(f"- {error}")
        return 1
    print("PASS: không thấy chuỗi/URL POC trong văn bản (ảnh cần duyệt riêng)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
