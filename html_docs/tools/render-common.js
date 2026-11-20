"use strict";

/** Hàm render dùng chung cho build-site.js và render-quick.js. */

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function chapterNo(id) {
  return typeof id === "string" ? id : String(id).padStart(2, "0");
}

function renderList(items, className = "check-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderTable(block) {
  const tableClass = block.className ? ` ${esc(block.className)}` : "";
  const caption = block.caption ? `<caption>${esc(block.caption)}</caption>` : "";
  return `<div class="table-wrap${block.wrapClassName ? ` ${esc(block.wrapClassName)}` : ""}">
    <table class="content-table${tableClass}">
      ${caption}
      <thead><tr>${block.headers.map((header) => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead>
      <tbody>${block.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;
}

function renderDetailItem(value) {
  const markdownLabel = value.match(/^\*\*(.+?)\*\*\s*(?:—|:|-)?\s*(.*)$/s);
  const dashLabel = value.match(/^([^.!?]{2,70})\s+—\s+(.+)$/s);
  const match = markdownLabel || dashLabel;
  if (!match) return esc(value);
  return `<strong>${esc(match[1])}:</strong>${match[2] ? ` <span>${esc(match[2])}</span>` : ""}`;
}

function renderGuideBody(body) {
  if (!body) return "";
  const parts = body.split(/\s*\(\d+\)\s*/);
  if (parts.length < 2) return `<p>${esc(body)}</p>`;
  const intro = parts.shift().trim();
  return `${intro ? `<p>${esc(intro)}</p>` : ""}<ul class="detail-list">${parts.map((part) => `<li>${renderDetailItem(part.trim())}</li>`).join("")}</ul>`;
}

function renderFigure(figure, rootPrefix = "./") {
  return `<figure class="doc-figure">
    <button class="doc-figure-trigger" type="button" data-image-zoom aria-label="Mở rộng: ${esc(figure.caption)}">
      <img src="${rootPrefix}${esc(figure.src)}" alt="${esc(figure.alt)}" loading="lazy" decoding="async">
    </button>
    <figcaption>${esc(figure.caption)}</figcaption>
  </figure>`;
}

function renderFaqs(items) {
  return `<div class="faq-list">${items.map(([question, answer]) => `
    <details class="faq-item">
      <summary>${esc(question)}</summary>
      <div class="faq-answer">${renderGuideBody(answer)}</div>
    </details>`).join("")}</div>`;
}

function renderSources(items, sourceDate, sourceIds) {
  return `<div class="sources">
    <p><strong>Mã nguồn kiểm soát:</strong> ${sourceIds.map((id) => `<code>${esc(id)}</code>`).join(", ")}</p>
    <ol>${items.map(([label, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`).join("")}</ol>
    <p class="source-note">Nguồn của nhà cung cấp hoặc nguồn chuyên môn được truy cập ngày ${esc(sourceDate)}. Liên kết ngoài chỉ được mở khi người dùng chủ động chọn và có kết nối Internet phù hợp.</p>
  </div>`;
}

module.exports = { esc, chapterNo, renderList, renderTable, renderDetailItem, renderGuideBody, renderFigure, renderFaqs, renderSources };
