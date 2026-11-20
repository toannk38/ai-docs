"""uv run --no-project --with pytest python -m pytest capture/tests/test_check_env_leaks.py -q"""

import importlib.util
import os
from pathlib import Path

import pytest

SPEC = importlib.util.spec_from_file_location("check_env_leaks", Path(__file__).resolve().parent.parent / "check_env_leaks.py")
leaks = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(leaks)


@pytest.fixture
def site(tmp_path, monkeypatch):
    monkeypatch.setattr(leaks, "poc_hosts_from_env", lambda: [])
    for rel in ["index.html", "chapters/a.html", "assets/js/s.js", "logo/x.svg"]:
        (tmp_path / rel).parent.mkdir(parents=True, exist_ok=True)
        (tmp_path / rel).write_text("ok", encoding="utf-8")
    (tmp_path / "qa").mkdir()
    (tmp_path / "qa/rules.py").write_text("re.compile('nab-quick-poc')", encoding="utf-8")
    monkeypatch.chdir(tmp_path.parent)
    return tmp_path


def run(target, monkeypatch):
    monkeypatch.setattr("sys.argv", ["check_env_leaks.py", str(target)])
    return leaks.main()


def test_relative_target_and_non_release_files_ignored(site, monkeypatch):
    assert run(Path(site.name), monkeypatch) == 0


def test_leak_in_release_page_reported(site, monkeypatch, capsys):
    (site / "chapters/a.html").write_text("account nab-quick-poc", encoding="utf-8")
    assert run(Path(site.name), monkeypatch) == 1
    assert "chapters/a.html" in capsys.readouterr().out
