"""Test phần tích hợp luật Quick vào check-release.py."""

from __future__ import annotations


def parse(check_release, html: str):
    doc = check_release.DocumentParser()
    doc.feed(html)
    doc.finish()
    return doc


def test_parser_collects_video_and_poster(check_release):
    doc = parse(check_release, '<video controls src="a.mp4" poster="a.jpg"></video>')
    assert doc.videos == [("a.mp4", "a.jpg")]
    assert ("video", "a.mp4") in doc.resources
    assert ("video-poster", "a.jpg") in doc.resources


def test_parser_video_without_poster(check_release):
    doc = parse(check_release, '<video controls src="b.mp4"></video>')
    assert doc.videos == [("b.mp4", "")]


def test_live_tool_walkthrough_rule_only_ms365(check_release):
    assert check_release.live_tool_rule_applies("chapter-05-ms365-copilot.html") is True
    assert check_release.live_tool_rule_applies("chapter-10-ms365-powerpoint.html") is True
    assert check_release.live_tool_rule_applies("chapter-11-amazon-quick-bat-dau.html") is False
    assert check_release.live_tool_rule_applies("chapter-12-3-chia-se-space.html") is False
    assert check_release.live_tool_rule_applies("chapter-16-chon-ai-theo-nhu-cau.html") is False


def test_expected_slugs_use_new_quick_groups(check_release):
    slugs = check_release.EXPECTED_SLUGS
    assert len(slugs) == 23
    assert slugs[10:15] == [
        "chapter-11-amazon-quick-bat-dau.html",
        "chapter-12-amazon-quick-spaces-chat-agents.html",
        "chapter-13-amazon-quick-du-lieu-dashboard.html",
        "chapter-14-amazon-quick-research.html",
        "chapter-15-amazon-quick-flows-tu-dong-hoa.html",
    ]
    assert not hasattr(check_release, "QUICK_CONTENT_SHA256")


def test_release_package_files(check_release, tmp_path):
    for rel in ["index.html", "chapters/a.html", "assets/css/s.css", "assets/js/s.js", "logo/x.png", "tmp.html", "quick-docs/x.md"]:
        p = tmp_path / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text("x", encoding="utf-8")
    names = {p.relative_to(tmp_path).as_posix() for p in check_release.release_text_files(tmp_path)}
    assert names == {"index.html", "chapters/a.html", "assets/css/s.css", "assets/js/s.js"}
