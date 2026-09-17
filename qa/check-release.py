#!/usr/bin/env python3
"""Read-only release checks for the NAB static guidance package."""

from __future__ import annotations

import re
import sys
import zipfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent.parent
CHAPTERS_DIR = ROOT / "chapters"
EXPECTED_CHAPTERS = [
    next(CHAPTERS_DIR.glob(f"chapter-{number:02d}-*.html"), None)
    for number in range(1, 24)
]
EXPECTED_HTML = [ROOT / "index.html", *EXPECTED_CHAPTERS]
EXTERNAL_SCHEMES = {"http", "https", "mailto", "tel"}
RESOURCE_TAG_ATTRS = {
    "script": "src",
    "img": "src",
    "link": "href",
    "iframe": "src",
    "source": "src",
}


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.links: list[tuple[str, str]] = []
        self.resources: list[tuple[str, str]] = []
        self.images_without_alt: list[str] = []
        self.h1_count = 0
        self.heading_levels: list[int] = []
        self.title_depth = 0
        self.title_text: list[str] = []
        self.html_lang: str | None = None
        self.has_main = False
        self.has_skip_link = False
        self.chapter_nav_current = 0
        self.walkthrough_count = 0
        self.faq_count = 0
        self.doc_figures_missing_elements: list[str] = []
        self._chapter_nav_depth = 0
        self._doc_figure_stack: list[dict[str, bool]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        classes = set(values.get("class", "").split())
        if "walkthrough" in classes:
            self.walkthrough_count += 1
        if "faq-item" in classes:
            self.faq_count += 1
        if tag == "html":
            self.html_lang = values.get("lang")
        if tag == "main":
            self.has_main = True
        if tag == "h1":
            self.h1_count += 1
        if re.fullmatch(r"h[1-6]", tag):
            self.heading_levels.append(int(tag[1]))
        if tag == "title":
            self.title_depth += 1
        if values.get("id"):
            self.ids.append(values["id"])
        if tag == "nav" and "nav-group" in classes:
            self._chapter_nav_depth += 1
        if tag == "figure" and "doc-figure" in classes:
            self._doc_figure_stack.append({"img": False, "figcaption": False})
        if self._doc_figure_stack:
            if tag == "img":
                self._doc_figure_stack[-1]["img"] = True
            elif tag == "figcaption":
                self._doc_figure_stack[-1]["figcaption"] = True
        if tag == "a":
            href = values.get("href", "")
            self.links.append((tag, href))
            if "skip-link" in classes and href.startswith("#"):
                self.has_skip_link = True
            if self._chapter_nav_depth and values.get("aria-current") == "page":
                self.chapter_nav_current += 1
        if tag == "img" and "alt" not in values:
            self.images_without_alt.append(values.get("src", "<unknown>"))
        resource_attr = RESOURCE_TAG_ATTRS.get(tag)
        if resource_attr and values.get(resource_attr):
            self.resources.append((tag, values[resource_attr]))
        if tag == "script" and values.get("type", "").lower() == "module":
            self.resources.append(("module-script", values.get("src", "<inline>")))

    def handle_endtag(self, tag: str) -> None:
        if tag == "title" and self.title_depth:
            self.title_depth -= 1
        if tag == "nav" and self._chapter_nav_depth:
            self._chapter_nav_depth -= 1
        if tag == "figure" and self._doc_figure_stack:
            figure = self._doc_figure_stack.pop()
            if not figure["img"]:
                self.doc_figures_missing_elements.append("img")
            if not figure["figcaption"]:
                self.doc_figures_missing_elements.append("figcaption")

    def handle_data(self, data: str) -> None:
        if self.title_depth:
            self.title_text.append(data)

    def finish(self) -> None:
        while self._doc_figure_stack:
            figure = self._doc_figure_stack.pop()
            if not figure["img"]:
                self.doc_figures_missing_elements.append("img")
            if not figure["figcaption"]:
                self.doc_figures_missing_elements.append("figcaption")


def parse_documents(paths: list[Path]) -> dict[Path, DocumentParser]:
    parsed: dict[Path, DocumentParser] = {}
    for path in paths:
        parser = DocumentParser()
        parser.feed(path.read_text(encoding="utf-8"))
        parser.finish()
        parsed[path] = parser
    return parsed


def local_target(source: Path, href: str) -> tuple[Path, str] | None:
    parts = urlsplit(href)
    if parts.scheme.lower() in EXTERNAL_SCHEMES or href.startswith("//"):
        return None
    if parts.scheme or parts.netloc:
        return None
    raw_path = unquote(parts.path)
    target = source if not raw_path else (source.parent / raw_path).resolve()
    return target, unquote(parts.fragment)


def run() -> list[str]:
    errors: list[str] = []

    if any(path is None for path in EXPECTED_CHAPTERS):
        missing_numbers = [str(index + 1) for index, path in enumerate(EXPECTED_CHAPTERS) if path is None]
        errors.append(f"Missing chapter numbers: {', '.join(missing_numbers)}")
        return errors

    # tmp.html is the explicitly retained visual reference, not a release page.
    root_html_paths = sorted(path for path in ROOT.glob("*.html") if path.name != "tmp.html")
    chapter_html_paths = sorted(CHAPTERS_DIR.glob("*.html"))
    html_paths = [*root_html_paths, *chapter_html_paths]
    expected_paths = [path for path in EXPECTED_HTML if path is not None]
    if root_html_paths != [ROOT / "index.html"]:
        errors.append("Root must contain only index.html; chapters belong in chapters/")
    if len(chapter_html_paths) != 23:
        errors.append(f"Expected 23 chapter HTML files, found {len(chapter_html_paths)}")
    unexpected = sorted(set(html_paths) - set(expected_paths))
    if unexpected:
        errors.append("Unexpected HTML: " + ", ".join(str(path.relative_to(ROOT)) for path in unexpected))
    missing = sorted(set(expected_paths) - set(html_paths))
    if missing:
        errors.append("Missing HTML: " + ", ".join(path.name for path in missing))
        return errors

    parsed = parse_documents(html_paths)
    chapter_names = {path.name for path in EXPECTED_CHAPTERS if path is not None}
    source_register_text = (ROOT / "qa" / "source-register.md").read_text(encoding="utf-8")
    registered_source_ids = set(re.findall(r"^\| ((?:NAB|VEN)-[A-Z]+-\d{3}) \|", source_register_text, re.M))

    for path, doc in parsed.items():
        rel = path.relative_to(ROOT)
        if doc.html_lang != "vi":
            errors.append(f"{rel}: html lang must be vi")
        if doc.h1_count != 1:
            errors.append(f"{rel}: expected one h1, found {doc.h1_count}")
        if not doc.heading_levels or doc.heading_levels[0] != 1:
            errors.append(f"{rel}: first heading must be h1")
        for previous, current in zip(doc.heading_levels, doc.heading_levels[1:]):
            if current > previous + 1:
                errors.append(f"{rel}: heading level jumps from h{previous} to h{current}")
                break
        if not "".join(doc.title_text).strip():
            errors.append(f"{rel}: missing non-empty title")
        if not doc.has_main:
            errors.append(f"{rel}: missing main landmark")
        if not doc.has_skip_link:
            errors.append(f"{rel}: missing skip link")
        if doc.images_without_alt:
            errors.append(f"{rel}: images missing alt: {', '.join(doc.images_without_alt)}")
        if doc.doc_figures_missing_elements:
            errors.append(f"{rel}: documentation figures missing required elements: {', '.join(doc.doc_figures_missing_elements)}")
        duplicates = sorted({item for item in doc.ids if doc.ids.count(item) > 1})
        if duplicates:
            errors.append(f"{rel}: duplicate ids: {', '.join(duplicates)}")

        href_names = {Path(urlsplit(href).path).name for _, href in doc.links if urlsplit(href).path}
        missing_chapter_links = sorted(chapter_names - href_names)
        if missing_chapter_links:
            errors.append(f"{rel}: missing links to {len(missing_chapter_links)} chapter(s)")

        if path.name.startswith("chapter-") and doc.chapter_nav_current != 1:
            errors.append(f"{rel}: expected one current item in chapter navigation, found {doc.chapter_nav_current}")

        if path.name.startswith("chapter-"):
            text = path.read_text(encoding="utf-8")
            for label in ["Dự thảo 0.9", "Kiểm chứng nguồn:", "Đối tượng:", "Owner:", "Source ID kiểm soát:"]:
                if label not in text:
                    errors.append(f"{rel}: missing required metadata label {label!r}")
            if not re.search(r"\b(?:NAB|VEN)-[A-Z]+-\d{3}\b", text):
                errors.append(f"{rel}: missing Source ID value")
            page_source_ids = set(re.findall(r"\b(?:NAB|VEN)-[A-Z]+-\d{3}\b", text))
            unknown_source_ids = sorted(page_source_ids - registered_source_ids)
            if unknown_source_ids:
                errors.append(f"{rel}: Source ID not declared in source register: {', '.join(unknown_source_ids)}")

            number_match = re.match(r"chapter-(\d{2})-", path.name)
            number = int(number_match.group(1)) if number_match else 0
            if 4 <= number <= 15:
                if not 2 <= doc.walkthrough_count <= 3:
                    errors.append(f"{rel}: live-tool page needs 2-3 walkthroughs, found {doc.walkthrough_count}")
                if not 5 <= doc.faq_count <= 8:
                    errors.append(f"{rel}: live-tool page needs 5-8 FAQs, found {doc.faq_count}")
            if 16 <= number <= 21:
                if doc.walkthrough_count != 1:
                    errors.append(f"{rel}: reference-tool page needs one walkthrough, found {doc.walkthrough_count}")
                if not 3 <= doc.faq_count <= 5:
                    errors.append(f"{rel}: reference-tool page needs 3-5 FAQs, found {doc.faq_count}")

        for tag, resource in doc.resources:
            parts = urlsplit(resource)
            if parts.scheme.lower() in EXTERNAL_SCHEMES or resource.startswith("//"):
                errors.append(f"{rel}: external auto-loaded resource in {tag}: {resource}")
            if tag == "module-script":
                errors.append(f"{rel}: ES module script is not allowed for file://")

        for _, href in doc.links:
            if not href:
                errors.append(f"{rel}: empty href")
                continue
            target_info = local_target(path, href)
            if target_info is None:
                continue
            target, fragment = target_info
            try:
                target.relative_to(ROOT)
            except ValueError:
                errors.append(f"{rel}: local link escapes package: {href}")
                continue
            if not target.exists():
                errors.append(f"{rel}: broken local link: {href}")
                continue
            if fragment and target.suffix.lower() == ".html":
                target_doc = parsed.get(target)
                if target_doc is None:
                    parser = DocumentParser()
                    parser.feed(target.read_text(encoding="utf-8"))
                    target_doc = parser
                if fragment not in target_doc.ids:
                    errors.append(f"{rel}: missing fragment {fragment!r} in {target.name}")

        for _, resource in doc.resources:
            target_info = local_target(path, resource)
            if target_info is None:
                continue
            target, _ = target_info
            if not target.exists():
                errors.append(f"{rel}: missing local resource: {resource}")

        text = path.read_text(encoding="utf-8")
        if re.search(r"(?:src|href)=[\"'](?:file:|[A-Za-z]:\\|/(?!/))", text, re.I):
            errors.append(f"{rel}: contains absolute/root local path")

    for number in range(16, 22):
        path = EXPECTED_CHAPTERS[number - 1]
        assert path is not None
        text = path.read_text(encoding="utf-8")
        phrase = "Không đồng nghĩa với việc được NAB phê duyệt sử dụng."
        if phrase not in text:
            errors.append(f"{path.name}: missing mandatory reference-tool disclaimer")

    for number in range(4, 16):
        path = EXPECTED_CHAPTERS[number - 1]
        assert path is not None
        if "Đang sử dụng tại NAB" not in path.read_text(encoding="utf-8"):
            errors.append(f"{path.name}: missing live-tool status")

    code_files = html_paths + list((ROOT / "assets" / "js").glob("*.js"))
    forbidden = re.compile(r"\bfetch\s*\(|XMLHttpRequest|navigator\.serviceWorker|type=[\"']module[\"']")
    for path in code_files:
        if forbidden.search(path.read_text(encoding="utf-8")):
            errors.append(f"{path.relative_to(ROOT)}: contains file://-incompatible runtime pattern")

    for required in [
        ROOT / "assets/css/style.css",
        ROOT / "assets/js/site.js",
        ROOT / "logo/NAB-logo.png",
        ROOT / "logo/background.png",
        ROOT / "qa/source-register.md",
        ROOT / "qa/review-log.md",
        ROOT / "qa/release-checklist.md",
        ROOT / "qa/project-control.md",
        ROOT / "qa/technical-test-report.md",
        ROOT / ".codex/plan.md",
        ROOT / "documents/thong-bao-noi-bo.docx",
        ROOT / "documents/thong-bao-noi-bo.pdf",
    ]:
        if not required.is_file() or required.stat().st_size == 0:
            errors.append(f"Missing or empty required file: {required.relative_to(ROOT)}")

    notice_docx = ROOT / "documents/thong-bao-noi-bo.docx"
    if notice_docx.is_file():
        try:
            with zipfile.ZipFile(notice_docx) as archive:
                names = set(archive.namelist())
                if "word/media/NAB-logo.png" not in names:
                    errors.append("Notice DOCX does not embed the NAB logo")
                relationships = archive.read("word/_rels/document.xml.rels")
                if b"TargetMode=\"External\"" in relationships or b"file:///" in relationships:
                    errors.append("Notice DOCX contains an external file relationship")
                document_xml = archive.read("word/document.xml")
                match = re.search(rb'Id="([^"]+)"[^>]+Target="media/NAB-logo\.png"', relationships)
                if not match or b'r:embed="' + match.group(1) + b'"' not in document_xml:
                    errors.append("Notice DOCX drawing is not linked to the embedded logo")
        except (OSError, KeyError, zipfile.BadZipFile) as exc:
            errors.append(f"Notice DOCX is invalid: {exc}")

    notice_pdf = ROOT / "documents/thong-bao-noi-bo.pdf"
    if notice_pdf.is_file() and not notice_pdf.read_bytes().startswith(b"%PDF-"):
        errors.append("Notice PDF does not have a valid PDF header")

    return errors


if __name__ == "__main__":
    failures = run()
    if failures:
        print(f"FAIL: {len(failures)} release check(s) failed")
        for failure in failures:
            print(f"- {failure}")
        sys.exit(1)
    print("PASS: static release checks completed")
    print("- index.html and 23 files in chapters/ present")
    print("- internal links, fragments and local resources resolved")
    print("- required metadata, navigation and disclaimers present")
    print("- no external auto-loaded resources or forbidden file:// runtime APIs")
