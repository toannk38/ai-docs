"""Cấu hình pytest cho checker phát hành."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

import pytest

QA_DIR = Path(__file__).resolve().parent.parent
if str(QA_DIR) not in sys.path:
    sys.path.insert(0, str(QA_DIR))


@pytest.fixture(scope="session")
def check_release():
    """Nạp check-release.py (tên file có dấu gạch ngang nên không import trực tiếp được)."""
    spec = importlib.util.spec_from_file_location("check_release", QA_DIR / "check-release.py")
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module
