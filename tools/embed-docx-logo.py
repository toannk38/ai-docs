#!/usr/bin/env python3
"""Embed the NAB logo in a LibreOffice-generated DOCX for portability."""

from __future__ import annotations

import argparse
import tempfile
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
CONTENT_NS = "http://schemas.openxmlformats.org/package/2006/content-types"
REL_PATH = "word/_rels/document.xml.rels"
DOCUMENT_PATH = "word/document.xml"
CONTENT_TYPES_PATH = "[Content_Types].xml"
MEDIA_PATH = "word/media/NAB-logo.png"


def embed(docx_path: Path, logo_path: Path) -> None:
    if not docx_path.is_file():
        raise FileNotFoundError(docx_path)
    if not logo_path.is_file():
        raise FileNotFoundError(logo_path)

    ET.register_namespace("", REL_NS)
    with zipfile.ZipFile(docx_path, "r") as source:
        relationships = ET.fromstring(source.read(REL_PATH))
        image_relationships = [
            relation
            for relation in relationships.findall(f"{{{REL_NS}}}Relationship")
            if relation.get("Type", "").endswith("/image")
        ]
        if not image_relationships:
            raise RuntimeError("DOCX does not contain an image relationship")

        target = next(
            (relation for relation in image_relationships if "NAB-logo" in relation.get("Target", "")),
            image_relationships[0],
        )
        target.set("Target", "media/NAB-logo.png")
        target.attrib.pop("TargetMode", None)
        relationship_id = target.get("Id")
        if not relationship_id:
            raise RuntimeError("Image relationship does not have an Id")
        relationship_xml = ET.tostring(relationships, encoding="utf-8", xml_declaration=True)

        document_xml = source.read(DOCUMENT_PATH)
        linked_attribute = f'r:link="{relationship_id}"'.encode()
        embedded_attribute = f'r:embed="{relationship_id}"'.encode()
        if linked_attribute not in document_xml:
            raise RuntimeError("DOCX drawing does not reference the external image relationship")
        document_xml = document_xml.replace(linked_attribute, embedded_attribute)

        ET.register_namespace("", CONTENT_NS)
        content_types = ET.fromstring(source.read(CONTENT_TYPES_PATH))
        png_declared = any(
            item.get("Extension", "").lower() == "png"
            for item in content_types.findall(f"{{{CONTENT_NS}}}Default")
        )
        if not png_declared:
            ET.SubElement(
                content_types,
                f"{{{CONTENT_NS}}}Default",
                {"Extension": "png", "ContentType": "image/png"},
            )
        content_types_xml = ET.tostring(content_types, encoding="utf-8", xml_declaration=True)

        with tempfile.NamedTemporaryFile(
            prefix="nab-notice-", suffix=".docx", dir=docx_path.parent, delete=False
        ) as handle:
            temporary = Path(handle.name)

        try:
            with zipfile.ZipFile(temporary, "w", compression=zipfile.ZIP_DEFLATED) as destination:
                for info in source.infolist():
                    if info.filename in {REL_PATH, DOCUMENT_PATH, CONTENT_TYPES_PATH, MEDIA_PATH}:
                        continue
                    destination.writestr(info, source.read(info.filename))
                destination.writestr(REL_PATH, relationship_xml)
                destination.writestr(DOCUMENT_PATH, document_xml)
                destination.writestr(CONTENT_TYPES_PATH, content_types_xml)
                destination.write(logo_path, MEDIA_PATH)
            temporary.replace(docx_path)
        except Exception:
            temporary.unlink(missing_ok=True)
            raise


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("docx", type=Path)
    parser.add_argument("logo", type=Path)
    args = parser.parse_args()
    embed(args.docx.resolve(), args.logo.resolve())
    print(f"Embedded {args.logo.name} into {args.docx}")


if __name__ == "__main__":
    main()
