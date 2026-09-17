#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const chaptersDir = path.join(root, "chapters");
const chapters = [
  ...require("./content-general"),
  ...require("./content-ms365"),
  ...require("./content-quick"),
  ...require("./content-reference")
].sort((a, b) => a.id - b.id);

const sourceIdsByChapter = {
  1: ["NAB-POL-002", "VEN-MS-001", "VEN-AQ-001"],
  2: ["NAB-POL-001", "NAB-POL-003"],
  3: ["NAB-POL-001", "NAB-POL-002"],
  4: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  5: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  6: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  7: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  8: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  9: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  10: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  11: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  12: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  13: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  14: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  15: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  16: ["NAB-OTH-001", "VEN-OAI-001"],
  17: ["NAB-OTH-001", "VEN-GGL-001"],
  18: ["NAB-OTH-001", "VEN-ANT-001"],
  19: ["NAB-OTH-001", "VEN-GGL-001"],
  20: ["NAB-OTH-001", "VEN-PPLX-001"],
  21: ["NAB-OTH-001", "VEN-CANVA-001"],
  22: ["NAB-POL-001", "NAB-MS-001", "NAB-AQ-001"],
  23: ["NAB-POL-003", "NAB-SUP-001"]
};

function assertContent() {
  const ids = chapters.map((chapter) => chapter.id);
  const slugs = chapters.map((chapter) => chapter.slug);
  if (chapters.length !== 23) throw new Error(`Expected 23 chapters, got ${chapters.length}`);
  for (let id = 1; id <= 23; id += 1) {
    if (!ids.includes(id)) throw new Error(`Missing chapter ${id}`);
  }
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate chapter id");
  if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate chapter slug");
  chapters.forEach((chapter) => {
    ["title", "navTitle", "summary", "statusLabel", "statusText", "audience", "owner"].forEach((field) => {
      if (!chapter[field]) throw new Error(`Chapter ${chapter.id} missing ${field}`);
    });
    if (!Array.isArray(chapter.walkthroughs) || !chapter.walkthroughs.length) {
      throw new Error(`Chapter ${chapter.id} needs at least one walkthrough`);
    }
    if (!Array.isArray(chapter.faqs) || chapter.faqs.length < 3) {
      throw new Error(`Chapter ${chapter.id} needs at least three FAQs`);
    }
    if (!sourceIdsByChapter[chapter.id]?.length) {
      throw new Error(`Chapter ${chapter.id} needs at least one Source ID`);
    }
  });
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cleanOutput(value) {
  return value.replace(/[ \t]+$/gm, "");
}

function chapterNo(id) {
  return String(id).padStart(2, "0");
}

function statusClass(kind) {
  if (kind === "live") return "tag-live";
  if (kind === "reference") return "tag-reference";
  return "";
}

function groupChapters() {
  return [
    ["Nền tảng chung", chapters.filter((chapter) => chapter.id <= 3)],
    ["Microsoft 365 — trọng tâm", chapters.filter((chapter) => chapter.id >= 4 && chapter.id <= 10)],
    ["Amazon Quick — trọng tâm", chapters.filter((chapter) => chapter.id >= 11 && chapter.id <= 15)],
    ["Công cụ tham khảo", chapters.filter((chapter) => chapter.id >= 16 && chapter.id <= 21)],
    ["Ứng dụng và hỗ trợ", chapters.filter((chapter) => chapter.id >= 22)]
  ];
}

function renderNav(currentSlug, chapterPrefix = "./") {
  return groupChapters().map(([title, items], groupIndex) => {
    const groupId = `nav-group-${groupIndex + 1}`;
    const isCurrentGroup = items.some((chapter) => chapter.slug === currentSlug);
    return `
    <nav class="nav-group${isCurrentGroup ? " current-group" : ""}" aria-label="${esc(title)}">
      <button class="nav-group-toggle" type="button" data-accordion-button aria-expanded="true" aria-controls="${groupId}">
        <span>${esc(title)}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <ol class="chapter-nav" id="${groupId}">
        ${items.map((chapter) => `
          <li>
            <a href="${chapterPrefix}${esc(chapter.slug)}" data-nav-link data-search="${esc(`${chapterNo(chapter.id)} ${chapter.navTitle} ${chapter.title} ${chapter.group}`)}"${chapter.slug === currentSlug ? ' aria-current="page"' : ""}>
              <span class="nav-num">${chapterNo(chapter.id)}</span>
              <span>${esc(chapter.navTitle)}${chapter.kind === "live" ? '<span class="nav-priority" aria-label="Nội dung trọng tâm">●</span>' : ""}</span>
            </a>
          </li>`).join("")}
      </ol>
    </nav>`;
  }).join("");
}

function renderHeader(includeMenu = true, rootPrefix = "./") {
  return `
  <a class="skip-link" href="#main-content">Bỏ qua điều hướng</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${rootPrefix}index.html" aria-label="Về trang chủ hướng dẫn NAB">
        <img src="${rootPrefix}logo/NAB-logo.png" alt="Ngân hàng Nam Á - NAB" width="297" height="58">
        <span class="brand-text">
          <span class="brand-kicker">Cẩm nang nội bộ</span>
          <span class="brand-title">Ứng dụng công nghệ và AI</span>
        </span>
      </a>
      <div class="header-search" role="search">
        <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
        <label class="sr-only" for="portal-search">Tìm nhanh chương</label>
        <input id="portal-search" type="search" data-portal-search placeholder="Tìm nhanh chương..." autocomplete="off">
        <kbd>Ctrl K</kbd>
      </div>
      <div class="header-actions">
        <a class="home-link" href="${rootPrefix}index.html">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>
          <span>Trang chủ</span>
        </a>
        ${includeMenu ? '<button class="menu-button" type="button" data-menu-button aria-controls="chapter-sidebar" aria-expanded="false" aria-label="Mở danh mục chương"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>Danh mục</span></button>' : ""}
      </div>
    </div>
  </header>`;
}

function renderSidebar(currentSlug, chapterPrefix = "./") {
  return `<aside class="sidebar" id="chapter-sidebar" data-sidebar aria-label="Danh mục hướng dẫn">
      <div class="sidebar-heading">
        <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22Z"/></svg>Danh mục chương</span>
        <button type="button" data-sidebar-close aria-label="Thu gọn danh mục"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m11 18-6-6 6-6M19 18l-6-6 6-6"/></svg></button>
      </div>
      <div class="sidebar-inner">
        ${renderNav(currentSlug, chapterPrefix)}
        <p class="nav-empty" data-nav-empty>Không tìm thấy chương phù hợp.</p>
      </div>
    </aside>`;
}

function renderSidebarExpand() {
  return `<button class="sidebar-expand" type="button" data-sidebar-expand aria-label="Mở danh mục chương"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16"/></svg><span>Mục lục</span></button>`;
}

function renderPageToc(items) {
  return `<nav class="page-toc" aria-label="Mục lục trong chương">
    <strong>Nội dung chương này</strong>
    <ol>${items.map(([id, label], index) => `<li><a href="#${id}"><span>${chapterNo(index + 1)}</span>${label}</a></li>`).join("")}</ol>
  </nav>`;
}

function renderRightSidebar(items) {
  return `<aside class="right-sidebar" id="right-sidebar" data-right-sidebar aria-label="Nội dung chương này">
    <div class="right-sidebar-heading"><strong>Nội dung chương này</strong><button type="button" data-right-sidebar-close aria-label="Thu gọn mục lục trang"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m13 6 6 6-6 6M5 6l6 6-6 6"/></svg></button></div>
    ${renderPageToc(items)}
    <div class="reading-note"><strong>Mẹo tra cứu</strong><p>Nhấn <kbd>Ctrl</kbd> + <kbd>K</kbd> để tìm nhanh một chương trong cẩm nang.</p></div>
  </aside>
  <button class="right-sidebar-expand" type="button" data-right-sidebar-expand aria-label="Mở mục lục trang"><span>Tiện ích</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>`;
}

function renderList(items, className = "check-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderCards(items) {
  return `<div class="grid grid-3">${items.map((item, index) => `
    <article class="card">
      <span class="card-number" aria-hidden="true">${index + 1}</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.text)}</p>
    </article>`).join("")}</div>`;
}

function renderWalkthroughs(items) {
  return items.map((walkthrough, index) => `
    <article class="walkthrough">
      <header class="walkthrough-head">
        <h3>Walkthrough ${index + 1}: ${esc(walkthrough.title)}</h3>
        <p>${esc(walkthrough.intro)}</p>
      </header>
      <div class="walkthrough-body">
        <ol class="steps">
          ${walkthrough.steps.map((step) => `<li>${esc(step)}</li>`).join("")}
        </ol>
        <div class="verify-box"><strong>Kết quả cần kiểm chứng:</strong> ${esc(walkthrough.verify)}</div>
      </div>
    </article>`).join("");
}

function renderFigure(figure, rootPrefix = "./") {
  return `<figure class="doc-figure">
    <button class="doc-figure-trigger" type="button" data-image-zoom aria-label="Mở rộng: ${esc(figure.caption)}">
      <img src="${rootPrefix}${esc(figure.src)}" alt="${esc(figure.alt)}" loading="lazy" decoding="async">
    </button>
    <figcaption>${esc(figure.caption)}</figcaption>
  </figure>`;
}

function renderDetailItem(value) {
  const markdownLabel = value.match(/^\*\*(.+?)\*\*\s*(?:—|:|-)?\s*(.*)$/s);
  const dashLabel = value.match(/^([^.!?]{2,70})\s+—\s+(.+)$/s);
  const match = markdownLabel || dashLabel;
  if (!match) return esc(value);
  return `<strong>${esc(match[1])}</strong>${match[2] ? ` <span>${esc(match[2])}</span>` : ""}`;
}

function renderGuideBody(body) {
  if (!body) return "";
  const parts = body.split(/\s*\(\d+\)\s*/);
  if (parts.length < 2) return `<p>${esc(body)}</p>`;
  const intro = parts.shift().trim();
  return `${intro ? `<p>${esc(intro)}</p>` : ""}<ul class="detail-list">${parts.map((part) => `<li>${renderDetailItem(part.trim())}</li>`).join("")}</ul>`;
}

function renderGuideSections(items, rootPrefix = "./") {
  return items.map((section, sectionIndex) => `<section class="guide-section" id="${esc(section.id)}">
    <h2>${sectionIndex + 1}. ${esc(section.title)}</h2>
    ${section.intro ? `<p>${esc(section.intro)}</p>` : ""}
    ${(section.subsections || []).map((item) => `<section class="guide-subsection" id="${esc(item.id)}">
      <h3>${esc(item.title || item.heading)}</h3>
      ${renderGuideBody(item.body)}
      ${item.items?.length ? `<ul class="feature-list">${item.items.map((entry) => `<li><strong>${esc(entry.label)}:</strong> <span>${esc(entry.text)}</span></li>`).join("")}</ul>` : ""}
      ${item.steps ? `<ol class="steps">${item.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>` : ""}
      ${item.figures?.length ? `<div class="doc-figure-grid">${item.figures.map((figure) => renderFigure(figure, rootPrefix)).join("")}</div>` : ""}
    </section>`).join("")}
    ${section.figures?.length ? `<div class="doc-figure-grid">${section.figures.map((figure) => renderFigure(figure, rootPrefix)).join("")}</div>` : ""}
  </section>`).join("");
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
    <p><strong>Source ID kiểm soát:</strong> ${sourceIds.map((id) => `<code>${esc(id)}</code>`).join(", ")}</p>
    <ol>${items.map(([label, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`).join("")}</ol>
    <p class="source-note">Nguồn vendor/chuyên môn được truy cập ngày ${esc(sourceDate)}. Liên kết ngoài chỉ được mở khi người dùng chủ động chọn và có kết nối Internet phù hợp.</p>
  </div>`;
}

function renderPager(index) {
  const previous = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;
  return `<nav class="pager" aria-label="Chuyển chương">
    ${previous ? `<a href="./${esc(previous.slug)}"><small>← Chương trước</small><strong>${chapterNo(previous.id)}. ${esc(previous.navTitle)}</strong></a>` : '<a href="../index.html"><small>← Quay lại</small><strong>Trang chủ</strong></a>'}
    ${next ? `<a href="./${esc(next.slug)}"><small>Chương tiếp theo →</small><strong>${chapterNo(next.id)}. ${esc(next.navTitle)}</strong></a>` : '<a href="../index.html"><small>Hoàn tất →</small><strong>Trang chủ</strong></a>'}
  </nav>`;
}

function renderChapter(chapter, index) {
  const statusNoticeClass = chapter.kind === "reference" ? "status-notice reference" : "status-notice";
  const defaultTocItems = [
    ["muc-tieu", "Mục tiêu"],
    ["dieu-kien", "Điều kiện"],
    ["use-case", "Use case"],
    ["huong-dan", "Hướng dẫn"],
    ["kiem-soat", "Kiểm soát"],
    ["faq", "FAQ"],
    ["nguon", "Nguồn"]
  ];
  const tocItems = chapter.guideSections?.length ? [
    ["muc-tieu", "Mục tiêu"],
    ["dieu-kien", "Điều kiện"],
    ["use-case", "Use case"],
    ...chapter.guideSections.map((section) => [section.id, section.title]),
    ["huong-dan", "Hướng dẫn"],
    ["kiem-soat", "Kiểm soát"],
    ["faq", "FAQ"],
    ["nguon", "Nguồn"]
  ] : (chapter.toc || defaultTocItems);
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${esc(chapter.summary)}">
  <title>${chapterNo(chapter.id)}. ${esc(chapter.navTitle)} | Hướng dẫn NAB</title>
  <link rel="icon" href="../logo/NAB-logo.png" type="image/png">
  <link rel="stylesheet" href="../assets/css/style.css">
  <script src="../assets/js/site.js" defer></script>
</head>
<body>
${renderHeader(true, "../")}
  ${renderSidebarExpand()}
  <div class="site-layout" data-site-layout>
    ${renderSidebar(chapter.slug)}
    <main class="main" id="main-content" tabindex="-1">
      <article class="content-wrap">
        <nav class="breadcrumb" aria-label="Đường dẫn">
          <ol><li><a href="../index.html">Trang chủ</a></li><li>${esc(chapter.group)}</li><li aria-current="page">${chapterNo(chapter.id)}. ${esc(chapter.navTitle)}</li></ol>
        </nav>
        <header class="chapter-header">
          <div class="chapter-header-accent" aria-hidden="true"></div>
          <p class="eyebrow">${esc(chapter.eyebrow)}</p>
          <h1>${esc(chapter.title)}</h1>
          <p class="lead">${esc(chapter.summary)}</p>
          <div class="meta-row" aria-label="Thông tin tài liệu">
            <span class="tag ${statusClass(chapter.kind)}">${esc(chapter.statusLabel)}</span>
            <span class="tag">Dự thảo 0.9</span>
            <span class="tag">Kiểm chứng nguồn: ${esc(chapter.sourceDate)}</span>
            <span class="tag">Đối tượng: ${esc(chapter.audience)}</span>
            <span class="tag">Owner: ${esc(chapter.owner)}</span>
          </div>
        </header>
        <div class="${statusNoticeClass}">
          <strong>${esc(chapter.statusLabel)}</strong>
          <p>${esc(chapter.statusText)}</p>
        </div>
        <div class="mobile-page-toc">${renderPageToc(tocItems)}</div>

        <section id="muc-tieu">
          <h2>Mục tiêu</h2>
          ${renderList(chapter.objectives)}
        </section>

        <section id="dieu-kien">
          <h2>Đối tượng và điều kiện trước khi dùng</h2>
          <p><strong>Đối tượng:</strong> ${esc(chapter.audience)}</p>
          ${renderList(chapter.prerequisites)}
        </section>

        <section id="use-case">
          <h2>Use case và cách chọn phạm vi</h2>
          ${renderCards(chapter.useCases)}
        </section>

        ${chapter.guideSections ? renderGuideSections(chapter.guideSections, "../") : ""}

        ${chapter.promptTemplate ? `<section aria-labelledby="prompt-mau"><h2 id="prompt-mau">Prompt mẫu dùng chung</h2><pre class="prompt-template"><span class="prompt-label">Mẫu — thay nội dung trong ngoặc vuông</span>${esc(chapter.promptTemplate)}</pre></section>` : ""}

        <section id="huong-dan">
          <h2>Hướng dẫn từng bước</h2>
          ${renderWalkthroughs(chapter.walkthroughs)}
        </section>

        <section id="kiem-soat">
          <h2>Rủi ro và biện pháp kiểm soát</h2>
          <div class="callout warning"><strong>Nguyên tắc dừng</strong><p>Nếu không xác định được quyền dữ liệu, tính năng được phép, nguồn kiểm chứng hoặc người chịu trách nhiệm cuối, hãy dừng thao tác và liên hệ Khối CNTT/đơn vị kiểm soát.</p></div>
          ${renderList(chapter.controls, "risk-list")}
        </section>

        <section id="faq">
          <h2>Câu hỏi thường gặp</h2>
          <button class="home-link" type="button" data-expand-faq aria-pressed="false">Mở tất cả FAQ</button>
          ${renderFaqs(chapter.faqs)}
        </section>

        <section id="nguon">
          <h2>Nguồn chính thức và kiểm chứng</h2>
          ${renderSources(chapter.sources, chapter.sourceDate, sourceIdsByChapter[chapter.id])}
        </section>

        ${renderPager(index)}
        <footer class="chapter-footer">Bản dự thảo nội bộ · Chưa phát hành · Cập nhật nội dung: ${esc(chapter.sourceDate)}</footer>
      </article>
    </main>
    ${renderRightSidebar(tocItems)}
  </div>
  <div class="sidebar-scrim" data-sidebar-scrim></div>
  <button class="back-to-top" type="button" data-back-to-top aria-label="Quay về đầu trang">↑</button>
</body>
</html>
`;
}

function renderHomeCard(chapter, extraClass = "") {
  const search = `${chapter.navTitle} ${chapter.title} ${chapter.summary} ${chapter.group}`;
  return `<a class="card tool-card ${extraClass}" href="./chapters/${esc(chapter.slug)}" data-tool-card data-search="${esc(search)}">
    <div class="meta-row"><span class="tag ${statusClass(chapter.kind)}">${esc(chapter.statusLabel)}</span><span class="tag">Chương ${chapterNo(chapter.id)}</span></div>
    <h3>${esc(chapter.navTitle)}</h3>
    <p>${esc(chapter.summary)}</p>
  </a>`;
}

function renderHome() {
  const ms = chapters.filter((chapter) => chapter.id >= 4 && chapter.id <= 10);
  const quick = chapters.filter((chapter) => chapter.id >= 11 && chapter.id <= 15);
  const foundation = chapters.filter((chapter) => chapter.id <= 3 || chapter.id >= 22);
  const reference = chapters.filter((chapter) => chapter.id >= 16 && chapter.id <= 21);
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Cẩm nang nội bộ NAB về Microsoft 365, Amazon Quick và ứng dụng AI an toàn.">
  <title>Hướng dẫn ứng dụng công nghệ và AI tại NAB</title>
  <link rel="icon" href="./logo/NAB-logo.png" type="image/png">
  <link rel="stylesheet" href="./assets/css/style.css">
  <script src="./assets/js/site.js" defer></script>
</head>
<body>
${renderHeader(true)}
  ${renderSidebarExpand()}
  <div class="site-layout home-layout" data-site-layout>
  ${renderSidebar(null, "./chapters/")}
  <main class="home-main" id="main-content" tabindex="-1">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-inner">
        <p class="eyebrow">Sáng kiến nội bộ · Khối Công nghệ thông tin</p>
        <h1 id="hero-title">Ứng dụng công nghệ và AI an toàn, hiệu quả tại NAB</h1>
        <p class="lead">Cẩm nang thực hành dành cho Đơn vị kinh doanh, tập trung chuyên sâu vào Microsoft 365 và Amazon Quick — hai nền tảng đang được sử dụng tại NAB.</p>
        <div class="meta-row">
          <span class="tag tag-reference">Bản dự thảo nội bộ — chưa phát hành</span>
          <span class="tag">Phiên bản 0.9</span>
          <span class="tag">Cập nhật 19/08/2026</span>
        </div>
        <div class="hero-actions">
          <a class="button" href="./chapters/chapter-01-tong-quan.html">Bắt đầu đọc</a>
          <a class="button secondary" href="#cong-cu-trong-tam">Đến công cụ trọng tâm</a>
          <a class="button secondary" href="./chapters/chapter-23-ho-tro-va-faq.html">Yêu cầu hỗ trợ</a>
        </div>
      </div>
    </section>

    <section class="home-section" aria-labelledby="principles-title">
      <div class="section-heading">
        <p class="eyebrow">Trước khi sử dụng</p>
        <h2 id="principles-title">Năm nguyên tắc không được bỏ qua</h2>
      </div>
      <div class="grid grid-3">
        ${[
          ["1", "Đúng công cụ", "Chỉ dùng tài khoản, tenant và tính năng được NAB cho phép."],
          ["2", "Đúng dữ liệu", "Phân loại, tối thiểu hóa và không đưa dữ liệu cấm vào công cụ."],
          ["3", "Đúng quyền", "Rà quyền nguồn, người nhận, connector và link chia sẻ."],
          ["4", "Có kiểm chứng", "Mở nguồn, đối soát số liệu, logic, thời điểm và giả định."],
          ["5", "Con người chịu trách nhiệm", "AI tạo bản nháp; người dùng và cấp duyệt chịu trách nhiệm cuối."]
        ].map(([num, title, text]) => `<article class="card"><span class="card-number">${num}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}
      </div>
    </section>

    <section class="home-section" id="cong-cu-trong-tam" aria-labelledby="priority-title">
      <div class="section-heading">
        <p class="eyebrow">Đang sử dụng tại NAB</p>
        <h2 id="priority-title">Hai nhóm công cụ trọng tâm</h2>
        <p>Khoảng 70% nội dung và QA tập trung vào hai nền tảng này. Tính năng cụ thể vẫn phải được SME xác nhận trên tenant NAB.</p>
      </div>
      <div class="grid grid-2">
        <article class="priority-card">
          <span class="priority-icon">M365</span>
          <h3>Microsoft 365</h3>
          <p>Copilot, Teams, Outlook, Word, Excel và PowerPoint cho cộng tác, soạn thảo, phân tích và trình bày.</p>
          <p><a class="button" href="./chapters/chapter-04-ms365-tong-quan.html">Mở hướng dẫn Microsoft 365</a></p>
        </article>
        <article class="priority-card quick">
          <span class="priority-icon">AQ</span>
          <h3>Amazon Quick</h3>
          <p>Quick Sight, Research, Index, Flows, Automate và Apps cho phân tích, nghiên cứu và tự động hóa có kiểm soát.</p>
          <p><a class="button" href="./chapters/chapter-11-amazon-quick-tong-quan.html">Mở hướng dẫn Amazon Quick</a></p>
        </article>
      </div>
    </section>

    <section class="home-section" aria-labelledby="all-title">
      <div class="section-heading">
        <p class="eyebrow">Danh mục đầy đủ</p>
        <h2 id="all-title">Tra cứu 23 chương</h2>
        <p>Tìm theo tên công cụ hoặc nhu cầu. Ô tìm kiếm chỉ lọc nội dung đã có trong trang và không gửi dữ liệu ra ngoài.</p>
      </div>
      <div class="filter-bar"><label><span class="sr-only">Tìm chương</span><input type="search" data-tool-filter placeholder="Ví dụ: Excel, dashboard, dữ liệu, FAQ" aria-label="Tìm trong danh mục chương"></label></div>
      <div class="empty-state" data-empty-state role="status">Không tìm thấy chương phù hợp. Hãy thử từ khóa ngắn hơn.</div>

      <h3>Nền tảng, use case và hỗ trợ</h3>
      <div class="grid grid-3">${foundation.map((chapter) => renderHomeCard(chapter)).join("")}</div>
      <h3>Microsoft 365 — trọng tâm</h3>
      <div class="grid grid-3">${ms.map((chapter) => renderHomeCard(chapter)).join("")}</div>
      <h3>Amazon Quick — trọng tâm</h3>
      <div class="grid grid-3">${quick.map((chapter) => renderHomeCard(chapter)).join("")}</div>
      <h3>Công cụ tham khảo</h3>
      <div class="callout warning"><strong>Lưu ý bắt buộc</strong><p>Việc một công cụ xuất hiện trong cẩm nang không đồng nghĩa với việc NAB đã phê duyệt sử dụng. Không dùng tài khoản cá nhân hoặc dữ liệu NAB khi chưa có phê duyệt rõ ràng.</p></div>
      <div class="grid grid-3">${reference.map((chapter) => renderHomeCard(chapter)).join("")}</div>
    </section>

    <section class="home-section" aria-labelledby="it-title">
      <div class="grid grid-2">
        <div class="section-heading">
          <p class="eyebrow">Vai trò Khối CNTT</p>
          <h2 id="it-title">Đồng hành từ nhu cầu đến vận hành</h2>
          <p>Khối CNTT tư vấn lựa chọn công cụ, cấp quyền, đánh giá tích hợp, cấu hình kiểm soát, hỗ trợ đào tạo và xử lý sự cố. ĐVKD chịu trách nhiệm mục tiêu, dữ liệu, tính đúng nghiệp vụ và quyết định cuối.</p>
        </div>
        <div class="card">
          <h3>Chuẩn bị yêu cầu hỗ trợ</h3>
          <ul class="check-list"><li>Mục tiêu và kết quả mong muốn</li><li>Nhóm người dùng và data owner</li><li>Loại dữ liệu, nguồn và đích</li><li>Hành động đọc/ghi/chia sẻ/lên lịch</li><li>KPI thành công và người phê duyệt</li></ul>
          <p><a class="button" href="./chapters/chapter-23-ho-tro-va-faq.html">Xem quy trình hỗ trợ</a></p>
        </div>
      </div>
    </section>
    <footer class="home-footer">Bản dự thảo nội bộ · Chưa phát hành · Owner và kênh Service Desk phải được điền trước GO/NO-GO</footer>
  </main>
  </div>
  <div class="sidebar-scrim" data-sidebar-scrim></div>
  <button class="back-to-top" type="button" data-back-to-top aria-label="Quay về đầu trang">↑</button>
</body>
</html>
`;
}

assertContent();
fs.mkdirSync(chaptersDir, { recursive: true });
chapters.forEach((chapter, index) => {
  fs.writeFileSync(path.join(chaptersDir, chapter.slug), cleanOutput(renderChapter(chapter, index)), "utf8");
});
fs.writeFileSync(path.join(root, "index.html"), cleanOutput(renderHome()), "utf8");
process.stdout.write(`Generated index.html and ${chapters.length} chapter pages.\n`);
