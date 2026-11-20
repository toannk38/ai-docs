"""Luật phát hành riêng cho phần Amazon Quick (chương 11–15 và trang con).

Các hàm nhận chuỗi HTML (không phụ thuộc DocumentParser của check-release.py) để test độc lập.
"""

from __future__ import annotations

import hashlib
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

QUICK_GROUP_SLUGS: dict[str, str] = {
    "11": "chapter-11-amazon-quick-bat-dau.html",
    "12": "chapter-12-amazon-quick-spaces-chat-agents.html",
    "13": "chapter-13-amazon-quick-du-lieu-dashboard.html",
    "14": "chapter-14-amazon-quick-research.html",
    "15": "chapter-15-amazon-quick-flows-tu-dong-hoa.html",
}

# Trang việc ĐÃ PHÁT HÀNH (thêm dần theo từng chương; đích cuối: 24 trang theo spec §6).
QUICK_TASK_PAGES: dict[str, dict] = {
    "chapter-11-1-kich-hoat-tai-khoan.html": {"id": "11.1", "group": "11", "limited": False},
    "chapter-11-2-dang-nhap-qua-portal.html": {"id": "11.2", "group": "11", "limited": False},
    "chapter-11-3-dang-nhap-bang-link-quick.html": {"id": "11.3", "group": "11", "limited": False},
    "chapter-11-4-dang-nhap-tren-microsoft-office.html": {"id": "11.4", "group": "11", "limited": False},
    "chapter-11-5-lam-quen-giao-dien.html": {"id": "11.5", "group": "11", "limited": False},
    "chapter-11-6-chat-voi-quick.html": {"id": "11.6", "group": "11", "limited": False},
    "chapter-11-7-tao-tai-lieu-slide-hinh.html": {"id": "11.7", "group": "11", "limited": False},
    "chapter-12-1-hoi-dap-tai-lieu-trong-space.html": {"id": "12.1", "group": "12", "limited": False},
    "chapter-12-2-tao-space-tai-tai-lieu.html": {"id": "12.2", "group": "12", "limited": False},
    "chapter-12-3-chia-se-space.html": {"id": "12.3", "group": "12", "limited": False},
    "chapter-12-4-dung-chat-agent.html": {"id": "12.4", "group": "12", "limited": False},
    "chapter-12-5-tao-chat-agent.html": {"id": "12.5", "group": "12", "limited": False},
    "chapter-12-6-chia-se-chat-agent.html": {"id": "12.6", "group": "12", "limited": False},
    "chapter-12-7-luu-y-khi-chia-se.html": {"id": "12.7", "group": "12", "limited": False},
    "chapter-13-1-xem-hoi-dashboard.html": {"id": "13.1", "group": "13", "limited": False},
    "chapter-13-2-hoi-dap-du-lieu.html": {"id": "13.2", "group": "13", "limited": False},
    "chapter-13-3-scenarios.html": {"id": "13.3", "group": "13", "limited": True},
    "chapter-13-4-tao-dataset.html": {"id": "13.4", "group": "13", "limited": True},
    "chapter-13-5-tao-analysis-dashboard.html": {"id": "13.5", "group": "13", "limited": True},
    "chapter-14-1-tao-research.html": {"id": "14.1", "group": "14", "limited": False},
    "chapter-14-2-kiem-chung-chia-se-research.html": {"id": "14.2", "group": "14", "limited": False},
    "chapter-15-1-chay-flow-co-san.html": {"id": "15.1", "group": "15", "limited": False},
    "chapter-15-2-tao-flow.html": {"id": "15.2", "group": "15", "limited": False},
    "chapter-15-3-tao-app.html": {"id": "15.3", "group": "15", "limited": True},
    "chapter-15-4-automations.html": {"id": "15.4", "group": "15", "limited": True},
}

LOCKED_CONTENT_SHA256: dict[str, str] = {
    "content-general.js": "e70f046e829fd80d17d182e2ddb03bf7a4a87ff19644d6acb9af95525c1d3d8e",
    "content-ms365.js": "89c0da32a5f0947e0a0d8d830c01ae418ec35600fb2a1776f5dcb044d147df06",
    "content-reference.js": "64a506b77bb6fa8c63c4e68df1c42821afe2efe2bb8b3b7204b6756e08907d31",
    "content-glossary.js": "9d1ca03cc6682417396baf0ab43662aad948b0f54d64cb6c4817fb3f37bdaa13",
}

VIDEO_MAX_BYTES = 8 * 1024 * 1024
VIDEO_TOTAL_MAX_BYTES = 150 * 1024 * 1024

LIVE_ACCOUNT = "opba-ai"
LIVE_PORTAL_HOST_PREFIX = "nab-opba-ai"
LIVE_SSOINS = "7223f5880341d54d"
PORTAL_URL = "https://nab-opba-ai.awsapps.com/start"
PORTAL_BACKUP_URL = "https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws"
QUICK_DIRECT_URL = "https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start"
LOGIN_PORTAL_SLUG = "chapter-11-2-dang-nhap-qua-portal.html"
LOGIN_LINK_SLUG = "chapter-11-3-dang-nhap-bang-link-quick.html"
LOGIN_FIRST_FAQ = "Tôi nhập tên đăng nhập vào ô Account name và bị báo lỗi?"
LIMITED_NOTICE = "Tính năng này giới hạn user"
REQUIRED_LABELS = ["Đang sử dụng tại NAB", "Nguyên tắc dừng", "Mã nguồn kiểm soát:"]

_SUBPAGE_RE = re.compile(r"^chapter-1[1-5]-\d+-[a-z0-9-]+\.html$")
_BANNED_ALWAYS = [
    (re.compile(r"nab-quick-poc", re.I), "chuỗi account name POC 'nab-quick-poc'"),
    (re.compile(r"\bd-[0-9a-f]{10}\b"), "directory ID Identity Center (d-…)"),
]
_AWSAPPS_RE = re.compile(r"([a-z0-9-]+)\.awsapps\.com", re.I)
_SSOINS_RE = re.compile(r"ssoins-([0-9a-f]{16})", re.I)
_QUICK_ACCOUNT_RE = re.compile(r"quicksight\.aws\.amazon\.com/sn/account/([^/\"'\s<>?#]+)", re.I)
_ADMIN_TERMS = [
    (re.compile(r"Manage account", re.I), "Manage account"),
    (re.compile(r"/admin\b", re.I), "/admin"),
    (re.compile(r"\bPOC\b"), "môi trường POC (tài liệu viết cho LIVE opba-ai)"),
]


def is_quick_slug(name: str) -> bool:
    return name in QUICK_GROUP_SLUGS.values() or name in QUICK_TASK_PAGES or bool(_SUBPAGE_RE.match(name))


class _QuickParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.figures_complete = 0
        self.figures_total = 0
        self.verify_boxes = 0
        self.faq_items = 0
        self.faq_summaries: list[str] = []
        self.h1_html: list[str] = []
        self.status_notice_text: list[str] = []
        self.hrefs: list[str] = []
        self.nav_links: dict[str, str] = {}
        self.table_headers: list[str] = []
        self.classes: set[str] = set()
        self._figure: dict | None = None
        self._depth: list[str] = []
        self._in_h1 = 0
        self._in_summary = False
        self._summary_text: list[str] = []
        self._notice_depth = 0
        self._nav_depth = 0
        self._main_depth = 0
        self.content_hrefs: list[str] = []  # trong <main>, ngoài <nav> (không tính sidebar/pager)
        self._nav_href: str | None = None
        self._nav_text: list[str] = []
        self._in_th = False
        self._th_text: list[str] = []

    def handle_starttag(self, tag, attrs):
        values = {k: v or "" for k, v in attrs}
        classes = set(values.get("class", "").split())
        self.classes |= classes
        if tag == "figure" and "doc-figure" in classes:
            self._figure = {"img_alt": False, "caption": False}
            self.figures_total += 1
        if self._figure is not None:
            if tag == "img" and values.get("alt", "").strip():
                self._figure["img_alt"] = True
            if tag == "figcaption":
                self._figure["caption"] = True
        if "verify-box" in classes:
            self.verify_boxes += 1
        if "faq-item" in classes:
            self.faq_items += 1
        if tag == "summary":
            self._in_summary = True
            self._summary_text = []
        if tag == "h1":
            self._in_h1 += 1
        if self._in_h1:
            self.h1_html.append(f"<{tag} class=\"{values.get('class', '')}\">")
        if "status-notice" in classes or self._notice_depth:
            self._notice_depth += 1
        if tag == "nav":
            self._nav_depth += 1
        if tag == "main":
            self._main_depth += 1
        if tag == "a":
            href = values.get("href", "")
            self.hrefs.append(href)
            if self._main_depth and not self._nav_depth:
                self.content_hrefs.append(href)
            if self._nav_depth:
                self._nav_href = Path(urlsplit(href).path).name
                self._nav_text = []
        if self._nav_href is not None and "limited-star" in classes:
            self._nav_text.append("<limited-star>")
        if tag == "th":
            self._in_th = True
            self._th_text = []

    def handle_endtag(self, tag):
        if tag == "figure" and self._figure is not None:
            if self._figure["img_alt"] and self._figure["caption"]:
                self.figures_complete += 1
            self._figure = None
        if tag == "summary" and self._in_summary:
            self.faq_summaries.append("".join(self._summary_text).strip())
            self._in_summary = False
        if tag == "h1" and self._in_h1:
            self._in_h1 -= 1
        if self._notice_depth:
            self._notice_depth -= 1
        if tag == "nav" and self._nav_depth:
            self._nav_depth -= 1
        if tag == "main" and self._main_depth:
            self._main_depth -= 1
        if tag == "a" and self._nav_href is not None:
            self.nav_links[self._nav_href] = "".join(self._nav_text)
            self._nav_href = None
        if tag == "th" and self._in_th:
            self.table_headers.append("".join(self._th_text).strip())
            self._in_th = False

    def handle_data(self, data):
        if self._in_summary:
            self._summary_text.append(data)
        if self._in_h1:
            self.h1_html.append(data)
        if self._notice_depth:
            self.status_notice_text.append(data)
        if self._nav_href is not None:
            self._nav_text.append(data)
        if self._in_th:
            self._th_text.append(data)


def _parse(html: str) -> _QuickParser:
    parser = _QuickParser()
    parser.feed(html)
    parser.close()
    return parser


def check_banned_patterns(files: list[Path], root: Path) -> list[str]:
    errors: list[str] = []
    for path in files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        try:
            rel = path.relative_to(root)
        except ValueError:
            rel = path
        for pattern, label in _BANNED_ALWAYS:
            if pattern.search(text):
                errors.append(f"{rel}: chứa {label}")
        for host in _AWSAPPS_RE.findall(text):
            if host.lower() != LIVE_PORTAL_HOST_PREFIX:
                errors.append(f"{rel}: host portal không phải LIVE: {host}.awsapps.com")
        for instance in _SSOINS_RE.findall(text):
            if instance.lower() != LIVE_SSOINS:
                errors.append(f"{rel}: instance portal không phải LIVE: ssoins-{instance}")
        for account in _QUICK_ACCOUNT_RE.findall(text):
            if account != LIVE_ACCOUNT:
                errors.append(f"{rel}: URL Quick với account khác {LIVE_ACCOUNT}: {account}")
        if is_quick_slug(path.name):
            for pattern, label in _ADMIN_TERMS:
                if pattern.search(text):
                    errors.append(f"{rel}: trang Quick nhắc màn hình quản trị ({label})")
    return errors


def _require_labels(slug: str, html: str) -> list[str]:
    return [f"{slug}: thiếu '{label}'" for label in REQUIRED_LABELS if label not in html]


def check_quick_group_page(slug: str, html: str) -> list[str]:
    doc = _parse(html)
    errors = _require_labels(slug, html)
    if not 3 <= doc.faq_items <= 8:
        errors.append(f"{slug}: trang nhóm Quick cần 3–8 FAQ, có {doc.faq_items}")
    group = next((gid for gid, s in QUICK_GROUP_SLUGS.items() if s == slug), None)
    linked = {Path(urlsplit(h).path).name for h in doc.content_hrefs}
    for child, meta in QUICK_TASK_PAGES.items():
        if meta.get("group") == group and child not in linked:
            errors.append(f"{slug}: thiếu liên kết tới trang con {child}")
    return errors


def check_quick_task_page(slug: str, html: str) -> list[str]:
    doc = _parse(html)
    errors = _require_labels(slug, html)
    if doc.figures_complete < 2 or doc.figures_complete != doc.figures_total:
        errors.append(
            f"{slug}: trang việc cần ≥2 figure.doc-figure đủ img[alt] + figcaption (đủ: {doc.figures_complete}/{doc.figures_total})"
        )
    if doc.verify_boxes < 1:
        errors.append(f"{slug}: thiếu verify-box (kết quả cần kiểm chứng)")
    if not 2 <= doc.faq_items <= 6:
        errors.append(f"{slug}: trang việc Quick cần 2–6 FAQ, có {doc.faq_items}")
    h1 = "".join(doc.h1_html)
    h1_starred = "limited-star" in h1 or "*" in re.sub(r"<[^>]+>", "", h1)
    limited = bool(QUICK_TASK_PAGES.get(slug, {}).get("limited"))
    if limited:
        if not h1_starred:
            errors.append(f"{slug}: trang giới hạn user cần dấu * trong h1")
        if "<limited-star>" not in doc.nav_links.get(slug, "") and "*" not in doc.nav_links.get(slug, ""):
            errors.append(f"{slug}: trang giới hạn user cần dấu * ở mục sidebar")
        if LIMITED_NOTICE not in html:
            errors.append(f"{slug}: thiếu dòng '{LIMITED_NOTICE}'")
    elif h1_starred:
        errors.append(f"{slug}: trang không giới hạn user không được có dấu * trong h1")
    return errors


def check_login_pages(pages: dict[str, str]) -> list[str]:
    errors: list[str] = []
    for slug in (QUICK_GROUP_SLUGS["11"], LOGIN_LINK_SLUG):
        if slug in pages and LIVE_ACCOUNT not in "".join(_parse(pages[slug]).status_notice_text):
            errors.append(f"{slug}: khối status-notice phải nêu account name {LIVE_ACCOUNT}")
    if LOGIN_PORTAL_SLUG in pages:
        hrefs = _parse(pages[LOGIN_PORTAL_SLUG]).hrefs
        for url in (PORTAL_URL, PORTAL_BACKUP_URL):
            if not any(h.rstrip("/") == url for h in hrefs):
                errors.append(f"{LOGIN_PORTAL_SLUG}: thiếu link {url}")
    if LOGIN_LINK_SLUG in pages:
        html = pages[LOGIN_LINK_SLUG]
        doc = _parse(html)
        if not any(h.rstrip("/") == QUICK_DIRECT_URL for h in doc.hrefs):
            errors.append(f"{LOGIN_LINK_SLUG}: thiếu link {QUICK_DIRECT_URL}")
        if not {"compare-wrong", "compare-right"} <= doc.classes:
            errors.append(f"{LOGIN_LINK_SLUG}: thiếu khối Sai/Đúng (compare-wrong/compare-right)")
        for phrase in ("Invalid account name", "Choose your account"):
            if phrase not in html:
                errors.append(f"{LOGIN_LINK_SLUG}: thiếu '{phrase}'")
        if not {"Account name", "Username"} <= set(doc.table_headers):
            errors.append(f"{LOGIN_LINK_SLUG}: thiếu bảng Account name / Username")
        if not doc.faq_summaries or doc.faq_summaries[0] != LOGIN_FIRST_FAQ:
            errors.append(f"{LOGIN_LINK_SLUG}: FAQ đầu phải là '{LOGIN_FIRST_FAQ}'")
    return errors


def check_videos(root: Path, videos: list[tuple[Path, str, str]]) -> list[str]:
    errors: list[str] = []
    for page, src, poster in videos:
        name = page.name
        if not src.lower().endswith(".mp4"):
            errors.append(f"{name}: video phải là .mp4 ({src})")
        target = (page.parent / src).resolve()
        if not target.is_file():
            errors.append(f"{name}: thiếu file video {src}")
        elif target.stat().st_size > VIDEO_MAX_BYTES:
            errors.append(f"{name}: video {src} vượt {VIDEO_MAX_BYTES // (1024 * 1024)} MB")
        if not poster:
            errors.append(f"{name}: video thiếu poster")
        elif not (page.parent / poster).resolve().is_file():
            errors.append(f"{name}: thiếu ảnh poster {poster}")
    video_dir = root / "assets" / "videos" / "quick"
    if video_dir.is_dir():
        total = sum(p.stat().st_size for p in video_dir.glob("*.mp4"))
        if total > VIDEO_TOTAL_MAX_BYTES:
            errors.append(f"assets/videos/quick: tổng dung lượng video {total} byte vượt {VIDEO_TOTAL_MAX_BYTES} byte")
    return errors


def check_locked_content(tools_dir: Path) -> list[str]:
    errors: list[str] = []
    for name, expected in LOCKED_CONTENT_SHA256.items():
        path = tools_dir / name
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            errors.append(f"tools/{name} đã thay đổi; nội dung chương ngoài Amazon Quick phải giữ nguyên")
    return errors
