#!/usr/bin/env bash
set -euo pipefail

project_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
profile_dir=$(mktemp -d)
stage_dir=$(mktemp -d)

cleanup() {
  case "$profile_dir" in /tmp/tmp.*) rm -rf -- "$profile_dir" ;; esac
  case "$stage_dir" in /tmp/tmp.*) rm -rf -- "$stage_dir" ;; esac
}
trap cleanup EXIT

libreoffice -env:UserInstallation="file://$profile_dir" --headless \
  --convert-to odt --outdir "$stage_dir" \
  "$project_dir/documents/thong-bao-noi-bo.html"

libreoffice -env:UserInstallation="file://$profile_dir" --headless \
  --convert-to docx:"Office Open XML Text" --outdir "$project_dir/documents" \
  "$stage_dir/thong-bao-noi-bo.odt"

python3 "$project_dir/tools/embed-docx-logo.py" \
  "$project_dir/documents/thong-bao-noi-bo.docx" \
  "$project_dir/logo/NAB-logo.png"

libreoffice -env:UserInstallation="file://$profile_dir" --headless \
  --convert-to pdf:"writer_pdf_Export" --outdir "$project_dir/documents" \
  "$project_dir/documents/thong-bao-noi-bo.docx"

printf 'Built documents/thong-bao-noi-bo.docx and documents/thong-bao-noi-bo.pdf\n'
