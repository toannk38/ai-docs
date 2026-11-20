"""Test luật phát hành riêng cho phần Amazon Quick (qa/quick_rules.py)."""

from __future__ import annotations

import hashlib
from pathlib import Path

import pytest

import quick_rules as qr

TASK_SLUG = "chapter-12-3-chia-se-space.html"
LIMITED_SLUG = "chapter-13-3-scenarios.html"
GROUP_SLUG = "chapter-12-amazon-quick-spaces-chat-agents.html"
LOGIN_PORTAL = "chapter-11-2-dang-nhap-qua-portal.html"
LOGIN_LINK = "chapter-11-3-dang-nhap-bang-link-quick.html"
REQUIRED = '<div class="status-notice"><strong>Đang sử dụng tại NAB</strong></div><div class="callout warning"><strong>Nguyên tắc dừng</strong></div><p><strong>Mã nguồn kiểm soát:</strong> NAB-AQ-001</p>'


def figure(n: int) -> str:
    return "".join(
        f'<figure class="doc-figure"><img src="a{i}.png" alt="Ảnh {i}"><figcaption>Bước {i}</figcaption></figure>'
        for i in range(n)
    )


def faqs(n: int, first: str = "Câu hỏi") -> str:
    items = [f'<details class="faq-item"><summary>{first if i == 0 else f"Câu hỏi {i}"}</summary></details>' for i in range(n)]
    return "".join(items)


def task_page(*, h1: str = "Chia sẻ Space", figures: int = 2, verify: bool = True, faq: int = 3, extra: str = "", nav: str = "") -> str:
    return (
        f'<html><body><aside><nav class="nav-group">{nav}</nav></aside><main><h1>{h1}</h1>{REQUIRED}'
        f'{figure(figures)}{"<div class=\"verify-box\">ok</div>" if verify else ""}{faqs(faq)}{extra}</main></body></html>'
    )


@pytest.fixture(autouse=True)
def quick_pages(monkeypatch):
    monkeypatch.setattr(
        qr,
        "QUICK_TASK_PAGES",
        {
            TASK_SLUG: {"id": "12.3", "group": "12", "limited": False},
            "chapter-12-1-hoi-dap-tai-lieu-trong-space.html": {"id": "12.1", "group": "12", "limited": False},
            LIMITED_SLUG: {"id": "13.3", "group": "13", "limited": True},
            LOGIN_PORTAL: {"id": "11.1", "group": "11", "limited": False},
            LOGIN_LINK: {"id": "11.2", "group": "11", "limited": False},
        },
    )


def write(tmp_path: Path, name: str, text: str) -> Path:
    path = tmp_path / name
    path.write_text(text, encoding="utf-8")
    return path


# ---------- Cấm lộ POC / admin ----------

def test_banned_poc_account(tmp_path):
    f = write(tmp_path, "chapter-05-x.html", "<p>nab-quick-poc</p>")
    errors = qr.check_banned_patterns([f], tmp_path)
    assert len(errors) == 1 and "nab-quick-poc" in errors[0]


def test_quick_page_must_not_mention_poc(tmp_path):
    quick = write(tmp_path, "chapter-15-2-tao-flow.html", "<p>ví dụ tài khoản Reader trên POC</p>")
    other = write(tmp_path, "chapter-05-x.html", "<p>giai đoạn POC</p>")
    assert any("POC" in e for e in qr.check_banned_patterns([quick], tmp_path))
    assert qr.check_banned_patterns([other], tmp_path) == []


def test_banned_directory_id(tmp_path):
    bad = write(tmp_path, "a.html", "https://us-east-1.signin.aws/platform/d-906671560e/login")
    good = write(tmp_path, "b.html", "platform/d-xxxxxxxxxx/login")
    assert qr.check_banned_patterns([bad], tmp_path)
    assert qr.check_banned_patterns([good], tmp_path) == []


def test_banned_portal_host(tmp_path):
    bad = write(tmp_path, "a.html", '<a href="https://d-9066713766.awsapps.com/start">x</a>')
    good = write(tmp_path, "b.html", '<a href="https://nab-opba-ai.awsapps.com/start">x</a>')
    assert qr.check_banned_patterns([bad], tmp_path)
    assert qr.check_banned_patterns([good], tmp_path) == []


def test_banned_ssoins_instance(tmp_path):
    bad = write(tmp_path, "a.html", "https://ssoins-0123456789abcdef.portal.us-east-1.app.aws")
    good = write(tmp_path, "b.html", "https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws")
    assert qr.check_banned_patterns([bad], tmp_path)
    assert qr.check_banned_patterns([good], tmp_path) == []


def test_banned_quick_account_url(tmp_path):
    bad = write(tmp_path, "a.html", "https://us-east-1.quicksight.aws.amazon.com/sn/account/nab-quick-poc/start")
    other = write(tmp_path, "b.html", "https://us-east-1.quicksight.aws.amazon.com/sn/account/other-acct/start")
    good = write(tmp_path, "c.html", "https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start")
    assert qr.check_banned_patterns([bad], tmp_path)
    assert qr.check_banned_patterns([other], tmp_path)
    assert qr.check_banned_patterns([good], tmp_path) == []


def test_admin_terms_only_in_quick_pages(tmp_path):
    quick = write(tmp_path, TASK_SLUG, "<p>Mở Manage account</p>")
    quick_admin_path = write(tmp_path, "chapter-11-amazon-quick-bat-dau.html", '<a href="https://x/sn/account/opba-ai/admin/landing">x</a>')
    other = write(tmp_path, "chapter-05-ms365-copilot.html", "<p>Manage account</p>")
    assert any("Manage account" in e for e in qr.check_banned_patterns([quick], tmp_path))
    assert any("/admin" in e for e in qr.check_banned_patterns([quick_admin_path], tmp_path))
    assert qr.check_banned_patterns([other], tmp_path) == []


# ---------- Trang việc ----------

def test_task_page_valid_without_video():
    assert qr.check_quick_task_page(TASK_SLUG, task_page()) == []


def test_task_page_requires_two_figures():
    errors = qr.check_quick_task_page(TASK_SLUG, task_page(figures=1))
    assert any("figure" in e for e in errors)


def test_task_page_figure_needs_alt_and_caption():
    broken = task_page(figures=1, extra='<figure class="doc-figure"><img src="x.png"></figure>')
    assert any("figure" in e for e in qr.check_quick_task_page(TASK_SLUG, broken))


def test_task_page_requires_verify_box():
    assert any("verify-box" in e for e in qr.check_quick_task_page(TASK_SLUG, task_page(verify=False)))


def test_task_page_faq_range():
    assert any("FAQ" in e for e in qr.check_quick_task_page(TASK_SLUG, task_page(faq=1)))
    assert any("FAQ" in e for e in qr.check_quick_task_page(TASK_SLUG, task_page(faq=7)))


def test_task_page_required_labels():
    html = task_page().replace("Nguyên tắc dừng", "")
    assert any("Nguyên tắc dừng" in e for e in qr.check_quick_task_page(TASK_SLUG, html))


# ---------- Trang giới hạn user ----------

def limited_nav(slug: str, star: bool) -> str:
    star_html = '<span class="limited-star">*</span>' if star else ""
    return f'<a href="./{slug}" data-nav-link>13.3 Scenarios{star_html}</a>'


def test_limited_page_valid():
    html = task_page(h1='Phân tích với Scenarios <span class="limited-star">*</span>', nav=limited_nav(LIMITED_SLUG, True),
                     extra='<p class="limited-user-notice">* Tính năng này giới hạn user</p>')
    assert qr.check_quick_task_page(LIMITED_SLUG, html) == []


def test_limited_page_needs_star_in_h1_nav_and_notice():
    no_h1 = task_page(h1="Phân tích với Scenarios", nav=limited_nav(LIMITED_SLUG, True), extra="<p>Tính năng này giới hạn user</p>")
    no_nav = task_page(h1="Scenarios *", nav=limited_nav(LIMITED_SLUG, False), extra="<p>Tính năng này giới hạn user</p>")
    no_notice = task_page(h1="Scenarios *", nav=limited_nav(LIMITED_SLUG, True))
    assert any("h1" in e for e in qr.check_quick_task_page(LIMITED_SLUG, no_h1))
    assert any("sidebar" in e for e in qr.check_quick_task_page(LIMITED_SLUG, no_nav))
    assert any("giới hạn user" in e for e in qr.check_quick_task_page(LIMITED_SLUG, no_notice))


def test_unlimited_page_must_not_be_starred():
    html = task_page(h1='Chia sẻ Space <span class="limited-star">*</span>')
    assert any("không giới hạn" in e for e in qr.check_quick_task_page(TASK_SLUG, html))


# ---------- Trang nhóm ----------

def group_page(links: list[str], faq: int = 4) -> str:
    anchors = "".join(f'<a href="./{slug}">x</a>' for slug in links)
    return f"<html><body><main><h1>Nhóm</h1>{REQUIRED}{anchors}{faqs(faq)}</main></body></html>"


def test_group_page_links_all_children():
    ok = group_page([TASK_SLUG, "chapter-12-1-hoi-dap-tai-lieu-trong-space.html"])
    missing = group_page(["chapter-12-1-hoi-dap-tai-lieu-trong-space.html"])
    assert qr.check_quick_group_page(GROUP_SLUG, ok) == []
    assert any(TASK_SLUG in e for e in qr.check_quick_group_page(GROUP_SLUG, missing))


def test_group_page_sidebar_or_pager_links_do_not_count():
    children = [TASK_SLUG, "chapter-12-1-hoi-dap-tai-lieu-trong-space.html"]
    nav = "".join(f'<a href="./{slug}">x</a>' for slug in children)
    html = (f'<html><body><aside class="sidebar"><nav>{nav}</nav></aside>'
            f'<main><h1>Nhóm</h1>{REQUIRED}{faqs(4)}<nav class="pager">{nav}</nav></main></body></html>')
    errors = qr.check_quick_group_page(GROUP_SLUG, html)
    assert any(TASK_SLUG in e for e in errors)


def test_group_page_faq_range():
    children = [TASK_SLUG, "chapter-12-1-hoi-dap-tai-lieu-trong-space.html"]
    assert any("FAQ" in e for e in qr.check_quick_group_page(GROUP_SLUG, group_page(children, faq=2)))
    assert any("FAQ" in e for e in qr.check_quick_group_page(GROUP_SLUG, group_page(children, faq=9)))


# ---------- Trang đăng nhập ----------

NOTICE = '<div class="status-notice danger"><strong>Account name tại NAB là opba-ai</strong></div>'
PORTAL_LINKS = '<a href="https://nab-opba-ai.awsapps.com/start">x</a><a href="https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws">y</a>'
LINK_PAGE_BODY = (
    NOTICE
    + '<a href="https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start">z</a>'
    + '<div class="compare-grid"><div class="compare-wrong">✗</div><div class="compare-right">✓</div></div>'
    + "<p>Invalid account name</p><p>Choose your account</p>"
    + '<table class="content-table"><thead><tr><th scope="col">Account name</th><th scope="col">Username</th></tr></thead></table>'
    + faqs(3, first=qr.LOGIN_FIRST_FAQ)
)


def login_pages(**overrides: str) -> dict[str, str]:
    pages = {
        qr.QUICK_GROUP_SLUGS["11"]: f"<main>{NOTICE}</main>",
        LOGIN_PORTAL: f"<main>{PORTAL_LINKS}</main>",
        LOGIN_LINK: f"<main>{LINK_PAGE_BODY}</main>",
    }
    pages.update(overrides)
    return pages


def test_login_pages_valid():
    assert qr.check_login_pages(login_pages()) == []


def test_login_portal_needs_backup_link():
    pages = login_pages(**{LOGIN_PORTAL: '<main><a href="https://nab-opba-ai.awsapps.com/start">x</a></main>'})
    assert any("ssoins-7223f5880341d54d" in e for e in qr.check_login_pages(pages))


def test_login_link_first_faq_exact():
    body = LINK_PAGE_BODY.replace(qr.LOGIN_FIRST_FAQ, "Câu hỏi khác")
    assert any("FAQ đầu" in e for e in qr.check_login_pages(login_pages(**{LOGIN_LINK: f"<main>{body}</main>"})))


def test_login_link_needs_compare_block():
    body = LINK_PAGE_BODY.replace("compare-wrong", "x")
    assert any("Sai/Đúng" in e for e in qr.check_login_pages(login_pages(**{LOGIN_LINK: f"<main>{body}</main>"})))


def test_login_notice_must_mention_account_name():
    pages = login_pages(**{qr.QUICK_GROUP_SLUGS["11"]: '<main><div class="status-notice">Đăng nhập</div></main>'})
    assert any("opba-ai" in e for e in qr.check_login_pages(pages))


def test_login_checks_skip_unpublished_pages():
    pages = login_pages()
    del pages[LOGIN_LINK]
    assert qr.check_login_pages(pages) == []


# ---------- Video ----------

def make_site(tmp_path: Path) -> tuple[Path, Path]:
    chapters = tmp_path / "chapters"
    videos = tmp_path / "assets" / "videos" / "quick"
    chapters.mkdir(parents=True)
    videos.mkdir(parents=True)
    return chapters / TASK_SLUG, videos


def test_video_ok(tmp_path):
    page, videos = make_site(tmp_path)
    (videos / "12-3.mp4").write_bytes(b"0" * 100)
    (videos / "12-3.jpg").write_bytes(b"0")
    assert qr.check_videos(tmp_path, [(page, "../assets/videos/quick/12-3.mp4", "../assets/videos/quick/12-3.jpg")]) == []


def test_video_missing_file_and_poster(tmp_path):
    page, _ = make_site(tmp_path)
    errors = qr.check_videos(tmp_path, [(page, "../assets/videos/quick/12-3.mp4", "../assets/videos/quick/12-3.jpg")])
    assert any("12-3.mp4" in e for e in errors)
    assert any("12-3.jpg" in e for e in errors)


def test_video_requires_poster_and_mp4(tmp_path):
    page, videos = make_site(tmp_path)
    (videos / "12-3.webm").write_bytes(b"0")
    errors = qr.check_videos(tmp_path, [(page, "../assets/videos/quick/12-3.webm", "")])
    assert any("mp4" in e for e in errors)
    assert any("poster" in e for e in errors)


def test_video_size_limits(tmp_path, monkeypatch):
    page, videos = make_site(tmp_path)
    monkeypatch.setattr(qr, "VIDEO_MAX_BYTES", 10)
    monkeypatch.setattr(qr, "VIDEO_TOTAL_MAX_BYTES", 15)
    (videos / "12-3.mp4").write_bytes(b"0" * 11)
    (videos / "12-3.jpg").write_bytes(b"0")
    (videos / "12-4.mp4").write_bytes(b"0" * 5)
    errors = qr.check_videos(tmp_path, [(page, "../assets/videos/quick/12-3.mp4", "../assets/videos/quick/12-3.jpg")])
    assert any("vượt" in e and "12-3.mp4" in e for e in errors)
    assert any("tổng" in e for e in errors)


# ---------- Khoá nội dung chương khác ----------

def test_locked_content_hash(tmp_path, monkeypatch):
    (tmp_path / "content-general.js").write_text("a", encoding="utf-8")
    monkeypatch.setattr(qr, "LOCKED_CONTENT_SHA256", {"content-general.js": hashlib.sha256(b"a").hexdigest()})
    assert qr.check_locked_content(tmp_path) == []
    (tmp_path / "content-general.js").write_text("b", encoding="utf-8")
    errors = qr.check_locked_content(tmp_path)
    assert len(errors) == 1 and "content-general.js" in errors[0]


def test_locked_content_real_values():
    assert set(qr.LOCKED_CONTENT_SHA256) == {"content-general.js", "content-ms365.js", "content-reference.js", "content-glossary.js"}
    assert qr.LOCKED_CONTENT_SHA256["content-general.js"] == "e70f046e829fd80d17d182e2ddb03bf7a4a87ff19644d6acb9af95525c1d3d8e"
