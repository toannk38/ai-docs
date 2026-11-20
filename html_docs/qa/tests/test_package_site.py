"""Test script đóng gói trang web (tools/package_site.py)."""

from __future__ import annotations

import importlib.util
import zipfile
from pathlib import Path

import pytest

SCRIPT = Path(__file__).resolve().parents[2] / "tools" / "package_site.py"


@pytest.fixture(scope="module")
def pkg():
    spec = importlib.util.spec_from_file_location("package_site", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def write(root: Path, rel: str, text: str = "x") -> None:
    path = root / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def site(tmp_path: Path) -> Path:
    write(tmp_path, "index.html", '<link href="assets/css/style.css"><a href="chapters/c1.html#top">c1</a>'
          '<a href="https://example.com">x</a><a href="mailto:a@b.c">m</a><img src="data:image/png;base64,AA">')
    write(tmp_path, "chapters/c1.html", '<img src="../assets/images/a%201.png?v=2"><a href="../index.html">home</a>')
    write(tmp_path, "assets/css/style.css", 'body{background:url("../../logo/bg.png")} @font-face{src:url(../fonts/f.woff2)}')
    write(tmp_path, "assets/images/a 1.png")
    write(tmp_path, "assets/images/unused.png")
    write(tmp_path, "assets/images/README.md")
    write(tmp_path, "assets/fonts/f.woff2")
    write(tmp_path, "logo/bg.png")
    write(tmp_path, "qa/secret-notes.md")
    return tmp_path


def test_collect_follows_html_and_css_references_only(pkg, tmp_path):
    files, missing = pkg.collect_files(site(tmp_path))
    assert missing == []
    assert sorted(files) == [
        "assets/css/style.css",
        "assets/fonts/f.woff2",
        "assets/images/a 1.png",
        "chapters/c1.html",
        "index.html",
        "logo/bg.png",
    ]


def test_collect_reports_missing_reference(pkg, tmp_path):
    root = site(tmp_path)
    write(root, "chapters/c1.html", '<img src="../assets/images/gone.png">')
    _, missing = pkg.collect_files(root)
    assert missing == ["chapters/c1.html -> assets/images/gone.png"]


def test_collect_refuses_paths_outside_site(pkg, tmp_path):
    root = site(tmp_path / "site")
    write(tmp_path, "outside.png")
    write(root, "chapters/c1.html", '<img src="../../outside.png">')
    _, missing = pkg.collect_files(root)
    assert missing == ["chapters/c1.html -> ../outside.png (ngoài thư mục web)"]


def test_write_zip_puts_files_under_one_top_folder(pkg, tmp_path):
    root = site(tmp_path / "site")
    files, _ = pkg.collect_files(root)
    out = tmp_path / "out.zip"
    pkg.write_zip(root, files, out, "nab-ai-handbook")
    with zipfile.ZipFile(out) as z:
        names = sorted(z.namelist())
        assert names[0] == "nab-ai-handbook/assets/css/style.css"
        assert "nab-ai-handbook/index.html" in names
        assert all(n.startswith("nab-ai-handbook/") for n in names)
        assert z.read("nab-ai-handbook/assets/images/a 1.png") == b"x"
