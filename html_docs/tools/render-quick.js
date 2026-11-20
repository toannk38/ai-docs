"use strict";

/**
 * Renderer cho trang Amazon Quick: trang nhóm (11–15) và trang việc (11.1…15.4).
 * Trả về { main, toc } — phần nội dung bên trong <article class="content-wrap">, chưa gồm pager.
 */
const { esc, renderList, renderFigure, renderFaqs, renderSources, chapterNo } = require("./render-common");

const QUICK_SOURCE_IDS = ["NAB-AQ-001", "NAB-AQ-002", "NAB-AQ-003", "VEN-AQ-001"];
const LIMITED_TEXT = "* Tính năng này giới hạn user — chỉ một số user được cấp quyền; liên hệ CNTT nếu cần.";
const STAR = '<span class="limited-star" title="Tính năng giới hạn user">*</span>';
const STOP_RULE =
  '<div class="callout warning"><strong>Nguyên tắc dừng</strong><p>Nếu không xác định được quyền dữ liệu, tính năng được phép, nguồn kiểm chứng hoặc người chịu trách nhiệm cuối, hãy dừng thao tác và liên hệ Khối CNTT/đơn vị kiểm soát.</p></div>';

/** Escape rồi cho phép **đậm**, *nghiêng*, `mã` và [link](url) trong câu chữ. */
function inline(text) {
  const codes = [];
  const out = esc(text)
    .replace(/`(.+?)`/g, (_, code) => `\u0000${codes.push(code) - 1}\u0000`)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // *nghiêng*: sau dấu * mở và trước dấu * đóng không có khoảng trắng — "dấu * là" giữ nguyên.
    .replace(/(^|[^*\w])\*([^\s*](?:[^*]*?[^\s*])?)\*(?![*\w])/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) =>
      /^https?:/.test(href) ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>` : `<a href="${href}">${label}</a>`,
    );
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[Number(i)]}</code>`);
}

/** Bảng của trang Quick: ô cho phép định dạng như câu chữ (đậm, mã, link). */
function renderQuickTable(block) {
  const caption = block.caption ? `<caption>${esc(block.caption)}</caption>` : "";
  return `<div class="table-wrap">
    <table class="content-table">
      ${caption}
      <thead><tr>${block.headers.map((header) => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead>
      <tbody>${block.rows.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;
}

/** Khối lưu ý trong bước/mục: có tone -> callout; không tone -> đoạn văn thường. */
function renderNote(note) {
  if (!note.tone) return `<p class="step-note">${inline(note.text)}</p>`;
  return `<div class="callout ${esc(note.tone)}${note.critical ? " callout-critical" : ""} step-note"><p>${inline(note.text)}</p></div>`;
}

/** Mục "Hiểu nhanh": chuỗi khái niệm (sơ đồ), thẻ khái niệm (là gì / dùng để / ví dụ), bảng, ghi chú. */
function renderConcepts(c) {
  const chain = c.chain?.length
    ? `<ol class="concept-chain" aria-label="Quan hệ giữa các khái niệm">${c.chain
        .map((n) => `<li><strong>${esc(n.term)}</strong>${n.note ? `<span>${esc(n.note)}</span>` : ""}</li>`)
        .join("")}</ol>`
    : "";
  const cards = c.cards?.length
    ? `<div class="concept-grid">${c.cards
        .map(
          (k) =>
            `<article class="concept-card"><h3>${esc(k.term)}</h3><p>${inline(k.what)}</p>${k.use ? `<p><b>Dùng để:</b> ${inline(k.use)}</p>` : ""}${k.example ? `<p><b>Ví dụ:</b> ${inline(k.example)}</p>` : ""}</article>`,
        )
        .join("")}</div>`
    : "";
  return `${c.intro ? `<p>${inline(c.intro)}</p>` : ""}${chain}${cards}${c.items ? inlineList(c.items) : ""}${renderTables(c.tables)}${c.callout ? renderNote(c.callout) : ""}`;
}

function renderExtraSection(extra) {
  return `${extra.intro ? `<p>${inline(extra.intro)}</p>` : ""}${extra.items ? inlineList(extra.items, extra.listClass || "check-list") : ""}${extra.callout ? renderNote(extra.callout) : ""}${renderTables(extra.tables)}`;
}

function inlineList(items, className = "check-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`;
}

function renderCallout(callout) {
  if (!callout) return "";
  const tone = callout.tone || "info";
  return `<div class="status-notice ${esc(tone)}">
          <strong>${inline(callout.title)}</strong>
          ${callout.text ? `<p>${inline(callout.text)}</p>` : ""}
          ${callout.items?.length ? inlineList(callout.items, "callout-list") : ""}
        </div>`;
}

function renderCompare(compare, rootPrefix) {
  if (!compare) return "";
  const card = (kind, side) => `<div class="card compare-card compare-${kind}">
      <span class="compare-badge ${kind}">${inline(side.label)}</span>
      <p>${inline(side.text)}</p>
      ${side.figure ? renderFigure(side.figure, rootPrefix) : ""}
    </div>`;
  return `<div class="grid grid-2 compare-grid">${card("wrong", compare.wrong)}${card("right", compare.right)}</div>`;
}

function renderFiguredSteps(steps, rootPrefix) {
  return `<ol class="steps steps-figured">${steps
    .map((step) => {
      if (typeof step === "string") return `<li>${inline(step)}</li>`;
      return `<li class="step-item">
        <div class="step-text">${inline(step.text)}</div>
        ${step.list?.length ? `<ol class="step-sublist">${step.list.map((item) => `<li>${inline(item)}</li>`).join("")}</ol>` : ""}
        ${step.preWarning ? `<div class="callout danger step-pre-warning"><p>${inline(step.preWarning)}</p></div>` : ""}
        ${renderCompare(step.compare, rootPrefix)}
        ${step.figure ? renderFigure(step.figure, rootPrefix) : ""}
        ${(step.notes || []).map(renderNote).join("")}
      </li>`;
    })
    .join("")}</ol>`;
}

function renderLinkBoxes(boxes) {
  if (!boxes?.length) return "";
  return `<div class="link-box-list">${boxes
    .map(
      (box) => `<div class="link-box">
      <strong>${inline(box.label)}</strong>
      <a href="${esc(box.url)}" target="_blank" rel="noopener noreferrer">${esc(box.url)}</a>
      <code class="link-box-copy">${esc(box.url)}</code>
      ${box.note ? `<p>${inline(box.note)}</p>` : ""}
    </div>`,
    )
    .join("")}</div>`;
}

function renderTroubleshooting(rows, rootPrefix) {
  if (!rows?.length) return "";
  return `<div class="table-wrap">
    <table class="content-table troubleshooting">
      <thead><tr><th scope="col">Thấy gì</th><th scope="col">Vì sao</th><th scope="col">Làm gì</th></tr></thead>
      <tbody>${rows
        .map(
          (row) => `<tr><td>${inline(row.symptom)}${row.figure ? renderFigure(row.figure, rootPrefix) : ""}</td><td>${inline(row.cause)}</td><td>${inline(row.action)}</td></tr>`,
        )
        .join("")}</tbody>
    </table>
  </div>`;
}

function renderVideo(video, rootPrefix) {
  if (!video) return "";
  const src = `${rootPrefix}${esc(video.src)}`;
  return `<figure class="video-figure">
      <video controls preload="metadata" playsinline poster="${rootPrefix}${esc(video.poster)}" src="${src}"></video>
      <figcaption>${inline(video.caption)}${video.durationText ? ` (${esc(video.durationText)})` : ""} · <a href="${src}" download>Tải video</a></figcaption>
    </figure>`;
}

function renderLimitedNotice(page) {
  return page.limitedUser ? `<p class="limited-user-notice">${esc(LIMITED_TEXT)}</p>` : "";
}

function renderHeader(page) {
  return `<header class="chapter-header">
          <div class="chapter-header-accent" aria-hidden="true"></div>
          <p class="eyebrow">${esc(page.eyebrow)}</p>
          <h1>${esc(page.title)}${page.limitedUser ? ` ${STAR}` : ""}</h1>
          <p class="lead">${inline(page.summary)}</p>
        </header>`;
}

function renderBreadcrumb(page, pages) {
  const crumbs = ['<li><a href="../index.html">Trang chủ</a></li>', "<li>Amazon Quick</li>"];
  if (page.pageType === "task") {
    const parent = pages.find((p) => p.id === page.parentId);
    if (parent) crumbs.push(`<li><a href="./${esc(parent.slug)}">${chapterNo(parent.id)}. ${esc(parent.navTitle)}</a></li>`);
  }
  crumbs.push(`<li aria-current="page">${chapterNo(page.id)}. ${esc(page.navTitle)}</li>`);
  return `<nav class="breadcrumb" aria-label="Đường dẫn"><ol>${crumbs.join("")}</ol></nav>`;
}

function renderControls(page) {
  return `<section id="kiem-soat">
          <h2>Kiểm soát tại NAB</h2>
          ${STOP_RULE}
          ${inlineList(page.controls || [], "risk-list")}
        </section>`;
}

function renderFaqSection(page) {
  return `<section id="faq">
          <h2>Câu hỏi thường gặp</h2>
          <button class="home-link" type="button" data-expand-faq aria-pressed="false">Mở tất cả câu hỏi</button>
          ${renderFaqs(page.faqs)}
        </section>`;
}

function renderSourceSection(page) {
  return `<section id="nguon">
          <h2>Nguồn chính thức và kiểm chứng</h2>
          ${renderSources(page.sources, page.sourceDate, page.sourceIds || QUICK_SOURCE_IDS)}
        </section>`;
}

function renderTables(tables) {
  return (tables || []).map((table) => renderQuickTable(table)).join("");
}

function section(id, title, inner) {
  return `<section id="${id}">
          <h2>${esc(title)}</h2>
          ${inner}
        </section>`;
}

function renderQuickTask(page, ctx) {
  const rootPrefix = ctx.rootPrefix;
  const toc = [];
  const parts = [];
  const add = (id, title, inner) => {
    toc.push([id, title]);
    parts.push(section(id, title, inner));
  };
  add("muc-tieu", "Mục tiêu", inlineList(page.objectives || []));
  add("dieu-kien", "Điều kiện và quyền tại NAB", inlineList(page.prerequisites || []));
  if (page.concepts) add("hieu-nhanh", "Hiểu nhanh", renderConcepts(page.concepts));
  if (page.linkBoxes?.length || page.tables?.length) add("thong-tin", "Thông tin cần dùng", renderLinkBoxes(page.linkBoxes) + renderTables(page.tables));
  add(
    "cac-buoc",
    "Các bước thực hiện",
    (page.walkthroughs || [])
      .map(
        (w) => `<article class="walkthrough">
        <header class="walkthrough-head"><h3>${inline(w.title)}</h3>${w.intro ? `<p>${inline(w.intro)}</p>` : ""}</header>
        <div class="walkthrough-body">
          ${renderFiguredSteps(w.steps, rootPrefix)}
          ${w.verify ? `<div class="verify-box"><strong>Kết quả cần kiểm chứng:</strong> ${inline(w.verify)}</div>` : ""}
        </div>
      </article>`,
      )
      .join(""),
  );
  for (const extra of page.sections || []) add(extra.id, extra.title, renderExtraSection(extra));
  if (page.video) add("video", "Video hướng dẫn", renderVideo(page.video, rootPrefix));
  if (page.troubleshooting?.length) add("loi-thuong-gap", "Lỗi thường gặp", renderTroubleshooting(page.troubleshooting, rootPrefix));
  toc.push(["faq", "Câu hỏi thường gặp"], ["kiem-soat", "Kiểm soát tại NAB"], ["nguon", "Nguồn"]);
  const main = `${renderBreadcrumb(page, ctx.pages)}
        ${renderHeader(page)}
        ${renderLimitedNotice(page)}
        <div class="status-notice">
          <strong>${esc(page.statusLabel)}</strong>
          <p>${inline(page.statusText)}</p>
        </div>
        ${renderCallout(page.topCallout)}
        <div class="mobile-page-toc">${ctx.renderPageToc(toc)}</div>
        ${parts.join("\n        ")}
        ${renderFaqSection(page)}
        ${renderControls(page)}
        ${renderSourceSection(page)}`;
  return { main, toc };
}

function renderQuickGroup(page, ctx) {
  const children = ctx.pages.filter((p) => p.pageType === "task" && p.parentId === page.id);
  const toc = [];
  const parts = [];
  const add = (id, title, inner) => {
    toc.push([id, title]);
    parts.push(section(id, title, inner));
  };
  add("muc-tieu", "Mục tiêu", inlineList(page.objectives || []));
  if (page.concepts) add("hieu-nhanh", "Hiểu nhanh", renderConcepts(page.concepts));
  add(
    "cac-viec",
    "Các việc trong nhóm",
    `<div class="grid grid-3">${children
      .map(
        (child) => `<a class="card tool-card" href="./${esc(child.slug)}">
      <div class="meta-row"><span class="tag">${chapterNo(child.id)}</span></div>
      <h3>${esc(child.navTitle)}${child.limitedUser ? STAR : ""}</h3>
      <p>${inline(child.summary)}</p>
    </a>`,
      )
      .join("")}</div>${children.some((c) => c.limitedUser) ? `<p class="limited-user-notice">${esc(LIMITED_TEXT)}</p>` : ""}`,
  );
  if (page.prerequisites?.length) add("dieu-kien", "Điều kiện và quyền tại NAB", inlineList(page.prerequisites));
  for (const extra of page.sections || []) {
    add(extra.id, extra.title, renderExtraSection(extra));
  }
  toc.push(["faq", "Câu hỏi thường gặp"], ["kiem-soat", "Kiểm soát tại NAB"], ["nguon", "Nguồn"]);
  const main = `${renderBreadcrumb(page, ctx.pages)}
        ${renderHeader(page)}
        <div class="status-notice">
          <strong>${esc(page.statusLabel)}</strong>
          <p>${inline(page.statusText)}</p>
        </div>
        ${renderCallout(page.topCallout)}
        <div class="mobile-page-toc">${ctx.renderPageToc(toc)}</div>
        ${parts.join("\n        ")}
        ${renderFaqSection(page)}
        ${renderControls(page)}
        ${renderSourceSection(page)}`;
  return { main, toc };
}

module.exports = {
  QUICK_SOURCE_IDS,
  STAR,
  inline,
  renderCompare,
  renderFiguredSteps,
  renderLinkBoxes,
  renderTroubleshooting,
  renderVideo,
  renderLimitedNotice,
  renderQuickTask,
  renderQuickGroup,
};
