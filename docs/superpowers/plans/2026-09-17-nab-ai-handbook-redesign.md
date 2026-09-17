# NAB AI Handbook Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cập nhật website thành “Cẩm nang ứng dụng AI và công nghệ trong công việc tại NAB”, giữ nguyên toàn bộ nội dung Amazon Quick và giới hạn các chương AI tham khảo ở dữ liệu công khai.

**Architecture:** Tiếp tục dùng các module nội dung trong `tools/` làm nguồn dữ liệu và `tools/build-site.js` để sinh `index.html` cùng 23 trang chương. Bổ sung renderer cho bảng/callout, thay nội dung các chương nền tảng và AI tham khảo, rồi mở rộng release checker để khóa cấu trúc, cảnh báo dữ liệu công khai và checksum Amazon Quick.

**Tech Stack:** HTML5, CSS3, JavaScript ES2021 chạy bằng Node.js CommonJS, Python 3 standard library, Firefox headless.

**Spec:** `docs/superpowers/specs/2026-09-17-nab-ai-handbook-redesign.md`

## Global Constraints

- Website phải tiếp tục hoạt động khi mở trực tiếp bằng `file://`; không dùng CDN, `fetch`, ES module, service worker hoặc dependency mới.
- Phải có đúng 23 chương, đánh số liên tục từ 01 đến 23.
- Không sửa `tools/content-quick.js`; SHA-256 phải luôn là `47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278`.
- Giữ nguyên tên, thứ tự và toàn bộ nội dung năm chương Amazon Quick 11-15.
- Không sửa nội dung nghiệp vụ trong `tools/content-ms365.js`; nhãn giao diện được suy ra trong renderer.
- Các chương 16-21 chỉ dùng dữ liệu công khai và phải hiển thị nguyên văn: “Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.”
- Giữ phong cách NAB, bố cục desktop ba cột, sidebar, tìm kiếm, FAQ, lightbox và responsive hiện tại.
- Mọi tệp HTML trong `index.html` và `chapters/` phải được sinh từ `tools/build-site.js`, không sửa tay.
- Nội dung hiển thị ưu tiên tiếng Việt; giữ tên sản phẩm và thuật ngữ quen thuộc như AI, Prompt, API, Dashboard, Workflow và Automation.

## File Structure

- Create `tools/content-glossary.js`: dữ liệu thuật ngữ dùng duy nhất cho Chương 23.
- Modify `tools/build-site.js`: nhóm menu mới, nhãn trạng thái, renderer bảng/callout, trang chủ mới, dọn HTML sinh thừa và ánh xạ Source ID.
- Modify `tools/content-general.js`: Chương 01-03 và 22-23.
- Modify `tools/content-reference.js`: Chương 16-21 và cảnh báo chỉ dùng dữ liệu công khai.
- Modify `assets/css/style.css`: bảng responsive, callout bảo mật, nhãn menu và trạng thái nâng cao.
- Modify `qa/check-release.py`: tên chương chính xác, cảnh báo bắt buộc, cấu trúc bảng/callout và checksum Amazon Quick.
- Modify `qa/source-register.md`: ánh xạ nguồn cho cấu trúc chương mới, giữ đúng ma trận Amazon Quick hiện tại.
- Modify `qa/release-checklist.md`: tiêu chí dữ liệu công khai và bảo toàn Amazon Quick.
- Modify `qa/technical-test-report.md`: chỉ ghi kết quả thực tế sau khi chạy kiểm thử.
- Generate `index.html` and `chapters/*.html`: đầu ra từ build script.
- Preserve unchanged `tools/content-quick.js`, `tools/content-ms365.js`, `assets/js/site.js`.

---

### Task 1: Add Structured Content Rendering And Navigation Labels

**Files:**
- Modify: `tools/build-site.js:16-534`
- Modify: `assets/css/style.css:1-360`
- Test: `tools/build-site.js` syntax and generated markup smoke checks

**Interfaces:**
- Consumes: optional `chapter.featureSections`, where each section has `{ id, title, intro?, blocks }`.
- Produces: `renderContentBlock(block)` and `renderFeatureSections(sections)` supporting `table` and `callout` blocks.
- Preserves: existing `chapter.guideSections` rendering used by Amazon Quick.

- [ ] **Step 1: Record the Amazon Quick checksum before edits**

Run:

```bash
sha256sum tools/content-quick.js
```

Expected:

```text
47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278  tools/content-quick.js
```

- [ ] **Step 2: Run a failing renderer contract check**

Run:

```bash
node -e 'const fs=require("fs"); const s=fs.readFileSync("tools/build-site.js","utf8"); if(!s.includes("function renderFeatureSections")) process.exit(1)'
```

Expected: exit code `1` because structured feature sections are not implemented yet.

- [ ] **Step 3: Add table, callout and feature-section renderers**

Add after `renderCards()` in `tools/build-site.js`:

```js
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

function renderContentBlock(block) {
  if (block.type === "table") return renderTable(block);
  if (block.type === "callout") {
    const items = block.items?.length ? renderList(block.items, "callout-list") : "";
    return `<div class="callout ${esc(block.tone || "info")}">
      <strong>${esc(block.title)}</strong>
      ${block.text ? `<p>${esc(block.text)}</p>` : ""}
      ${items}
    </div>`;
  }
  throw new Error(`Unsupported content block: ${block.type}`);
}

function renderFeatureSections(sections = []) {
  return sections.map((section) => `<section id="${esc(section.id)}" class="feature-section">
    <h2>${esc(section.title)}</h2>
    ${section.intro ? `<p>${esc(section.intro)}</p>` : ""}
    ${(section.blocks || []).map(renderContentBlock).join("")}
  </section>`).join("");
}
```

Also update the chapter notice class so every public-AI page uses the strongest warning treatment:

```js
const statusNoticeClass = chapter.publicDataOnly
  ? "status-notice danger public-data-warning"
  : chapter.kind === "reference"
    ? "status-notice reference"
    : "status-notice";
```

In `renderChapter()`:

```js
const tocItems = chapter.guideSections?.length ? [
  ["muc-tieu", "Mục tiêu"],
  ["dieu-kien", "Điều kiện"],
  ["use-case", "Use case"],
  ...chapter.guideSections.map((section) => [section.id, section.title]),
  ["huong-dan", "Hướng dẫn"],
  ["kiem-soat", "Kiểm soát"],
  ["faq", "FAQ"],
  ["nguon", "Nguồn"]
] : (chapter.toc || [
  ["muc-tieu", "Mục tiêu"],
  ["dieu-kien", "Điều kiện"],
  ["use-case", "Use case"],
  ...(chapter.featureSections || []).map((section) => [section.id, section.title]),
  ["huong-dan", "Hướng dẫn"],
  ["kiem-soat", "Kiểm soát"],
  ["faq", "FAQ"],
  ["nguon", "Nguồn"]
]);
```

Render `${renderFeatureSections(chapter.featureSections)}` immediately after the `use-case` section and before existing `guideSections`. This conditional structure deliberately leaves Amazon Quick TOC/rendering behavior unchanged.

- [ ] **Step 4: Update grouped navigation without editing Quick content data**

Replace `groupChapters()` with:

```js
function groupChapters() {
  return [
    ["AI trong công việc", chapters.filter((chapter) => chapter.id <= 3)],
    ["Microsoft 365 — TRỌNG TÂM", chapters.filter((chapter) => chapter.id >= 4 && chapter.id <= 10)],
    ["Amazon Quick — TRỌNG TÂM", chapters.filter((chapter) => chapter.id >= 11 && chapter.id <= 15)],
    ["AI phổ biến — THAM KHẢO", chapters.filter((chapter) => chapter.id >= 16 && chapter.id <= 21)],
    ["Phụ lục", chapters.filter((chapter) => chapter.id >= 22)]
  ];
}

function navBadge(chapter) {
  if (chapter.id >= 4 && chapter.id <= 15) return ["TRỌNG TÂM", "focus"];
  if (chapter.id === 21) return ["NÂNG CAO", "advanced"];
  if (chapter.id >= 16 && chapter.id <= 20) return ["THAM KHẢO", "reference"];
  return null;
}
```

In `renderNav()`, set non-current groups collapsed on chapter pages while keeping all groups open on the home page:

```js
const expanded = currentSlug ? isCurrentGroup : true;
```

Use `aria-expanded="${expanded}"` and render the badge as text beside `chapter.navTitle`. Do not modify `tools/content-quick.js` to add badge fields.

- [ ] **Step 5: Add structured component styles**

Add to `assets/css/style.css` near the existing content components:

```css
.nav-label { display: flex; min-width: 0; align-items: center; justify-content: space-between; gap: 7px; }
.nav-badge { flex: 0 0 auto; padding: 2px 5px; border-radius: 999px; font-size: .54rem; font-weight: 850; letter-spacing: .04em; }
.nav-badge.focus { background: #fff7dc; color: #815400; }
.nav-badge.reference { background: var(--slate-100); color: var(--slate-500); }
.nav-badge.advanced { background: #e8f1fb; color: var(--nab-blue-dark); }
.chapter-nav a[aria-current="page"] .nav-badge { background: rgb(255 255 255 / 18%); color: #fff; }
.table-wrap { width: 100%; margin: 16px 0; overflow-x: auto; border: 1px solid var(--slate-200); border-radius: 12px; }
.content-table { width: 100%; min-width: 620px; border-collapse: collapse; background: #fff; font-size: .84rem; }
.content-table caption { padding: 12px 14px; background: var(--slate-50); color: var(--slate-700); font-weight: 750; text-align: left; }
.content-table th, .content-table td { padding: 11px 13px; border-bottom: 1px solid var(--slate-200); text-align: left; vertical-align: top; }
.content-table th { background: var(--nab-blue-light); color: var(--nab-blue-dark); font-size: .76rem; }
.content-table tr:last-child td { border-bottom: 0; }
.callout-list { margin: 8px 0 0; padding-left: 20px; }
.callout-list li { margin: 5px 0; }
.public-data-warning { border-width: 2px; box-shadow: 0 8px 22px rgb(180 35 24 / 10%); }
```

Change the existing `.callout.danger` selector to:

```css
.status-notice.danger, .callout.danger { border-color: #fecdd3; border-left-color: var(--danger); background: var(--danger-bg); color: #881337; }
```

- [ ] **Step 6: Update the home-page copy and navigation targets**

In `renderHome()`:

- Change the title/H1 to “Cẩm nang ứng dụng AI và công nghệ trong công việc tại NAB”.
- Keep Microsoft 365 and Amazon Quick as the two prominent cards.
- Keep Amazon Quick’s five current chapter names when listing its cards.
- Replace the obsolete “Yêu cầu hỗ trợ” link to Chương 23 with an in-page link `#vai-tro-cntt`.
- Rename the catalog headings to match the five groups in `groupChapters()`.
- Place the exact public-data warning immediately before the cards for chapters 16-21.

- [ ] **Step 7: Add stale generated-page cleanup**

Before writing chapter files, add:

```js
const expectedChapterFiles = new Set(chapters.map((chapter) => chapter.slug));
for (const filename of fs.readdirSync(chaptersDir)) {
  if (/^chapter-\d{2}-.*\.html$/.test(filename) && !expectedChapterFiles.has(filename)) {
    fs.unlinkSync(path.join(chaptersDir, filename));
  }
}
```

This removes only stale generated chapter HTML and does not touch assets or source files.

- [ ] **Step 8: Verify renderer syntax and Quick preservation**

Run:

```bash
node --check tools/build-site.js
node -e 'const fs=require("fs"); const s=fs.readFileSync("tools/build-site.js","utf8"); for (const name of ["renderFeatureSections","renderContentBlock","navBadge"]) if(!s.includes(`function ${name}`)) process.exit(1)'
test "$(sha256sum tools/content-quick.js | cut -d" " -f1)" = "47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278"
```

Expected: all commands exit `0`.

- [ ] **Step 9: Commit the renderer and styling changes**

```bash
git add tools/build-site.js assets/css/style.css
git commit -m "feat: add structured handbook components"
```

---

### Task 2: Restructure Foundations And Appendices

**Files:**
- Create: `tools/content-glossary.js`
- Modify: `tools/content-general.js:1-342`
- Test: direct CommonJS content assertions

**Interfaces:**
- Produces chapter IDs `1`, `2`, `3`, `22`, `23` with unique slugs and `featureSections` consumed by Task 1.
- Produces glossary rows as arrays of `[term, Vietnamese name, explanation]`.

- [ ] **Step 1: Run a failing slug contract**

```bash
node - <<'NODE'
const chapters = require("./tools/content-general");
const expected = new Map([
  [1, "chapter-01-tong-quan.html"],
  [2, "chapter-02-nguyen-tac-su-dung-ai-an-toan.html"],
  [3, "chapter-03-ky-thuat-viet-prompt.html"],
  [22, "chapter-22-du-lieu-duoc-phep-khong-duoc-phep.html"],
  [23, "chapter-23-giai-thich-thuat-ngu.html"]
]);
for (const chapter of chapters) {
  if (expected.get(chapter.id) !== chapter.slug) process.exit(1);
}
NODE
```

Expected: exit code `1` because the current slugs do not match.

- [ ] **Step 2: Create the glossary data module**

Create `tools/content-glossary.js` with at least these exact rows:

```js
"use strict";

module.exports = [
  ["AI", "Trí tuệ nhân tạo", "Công nghệ giúp máy tính thực hiện một số tác vụ thường cần khả năng nhận biết, phân tích hoặc tạo nội dung của con người."],
  ["Generative AI", "AI tạo sinh", "Loại AI tạo nội dung mới như văn bản, hình ảnh, âm thanh, video hoặc mã lập trình dựa trên yêu cầu của người dùng."],
  ["LLM", "Mô hình ngôn ngữ lớn", "Mô hình AI được huấn luyện trên lượng lớn văn bản để hiểu và tạo ngôn ngữ tự nhiên."],
  ["Prompt", "Yêu cầu gửi cho AI", "Câu lệnh hoặc phần mô tả người dùng cung cấp để AI biết nhiệm vụ, bối cảnh, ràng buộc và định dạng đầu ra."],
  ["AI Agent", "Tác nhân AI", "Hệ thống AI có thể lập kế hoạch, dùng công cụ và thực hiện nhiều bước để hoàn thành một mục tiêu."],
  ["Deepfake", "Nội dung giả mạo bằng AI", "Hình ảnh, âm thanh hoặc video được tạo hay chỉnh sửa để khiến một người có vẻ đã nói hoặc làm điều không có thật."],
  ["API", "Giao diện lập trình ứng dụng", "Cách để hai hệ thống trao đổi dữ liệu hoặc yêu cầu chức năng theo một quy ước kỹ thuật."],
  ["Workflow", "Quy trình công việc", "Chuỗi bước, điều kiện và người chịu trách nhiệm để hoàn thành một công việc."],
  ["Automation", "Tự động hóa", "Việc để hệ thống tự thực hiện một hoặc nhiều bước theo điều kiện đã cấu hình."],
  ["Hallucination", "Thông tin AI tạo ra nhưng không có căn cứ", "Hiện tượng AI trả lời nghe hợp lý nhưng sai, thiếu nguồn hoặc tự tạo dữ kiện."],
  ["Multimodal", "Đa phương thức", "Khả năng xử lý nhiều loại đầu vào hoặc đầu ra như văn bản, hình ảnh, âm thanh và video."]
];
```

- [ ] **Step 3: Rewrite chapters 01-03 and 22-23 while reusing valuable current copy**

In `tools/content-general.js`:

- Import `./content-glossary`.
- Define `dataClassificationRows` once and reuse it in Chương 02 and Chương 22.
- Define the exact security warning once:

```js
const securityWarning = "Không nhập, sao chép hoặc tải dữ liệu khách hàng, dữ liệu giao dịch, tài liệu mật, thông tin xác thực hoặc dữ liệu nội bộ nhạy cảm lên các dịch vụ AI công cộng khi chưa được phê duyệt.";
```

- Chương 01: title `Cẩm nang ứng dụng AI và công nghệ trong công việc tại NAB`; add a three-row responsibility table for Đơn vị nghiệp vụ, Khối CNTT and Đơn vị kiểm soát; fold the useful support-request checklist from the old Chương 23 into its walkthrough/FAQ.
- Chương 02: use the new slug/title, add the three-row classification table and a `danger` callout containing `securityWarning`; retain the current 60-second data gate and incident-response walkthrough.
- Chương 03: use the new slug/title, keep the current prompt template and add a six-component prompt table: Vai trò, Nhiệm vụ, Bối cảnh, Ràng buộc, Định dạng, Kiểm tra.
- Chương 22: convert the old business-scenario slot into the data appendix using the same classification table and warning; retain practical examples about screenshots, credentials and re-identification from the current risk chapter.
- Chương 23: convert the old support/FAQ slot into the glossary appendix and render the glossary through a `table` block.
- Preserve at least one walkthrough and at least three FAQs for every chapter.

- [ ] **Step 4: Verify the new content objects**

```bash
node - <<'NODE'
const chapters = require("./tools/content-general");
const byId = new Map(chapters.map((chapter) => [chapter.id, chapter]));
const expected = new Map([
  [1, "chapter-01-tong-quan.html"],
  [2, "chapter-02-nguyen-tac-su-dung-ai-an-toan.html"],
  [3, "chapter-03-ky-thuat-viet-prompt.html"],
  [22, "chapter-22-du-lieu-duoc-phep-khong-duoc-phep.html"],
  [23, "chapter-23-giai-thich-thuat-ngu.html"]
]);
for (const [id, slug] of expected) {
  const chapter = byId.get(id);
  if (!chapter || chapter.slug !== slug || !chapter.featureSections?.length) process.exit(1);
}
const warning = "Không nhập, sao chép hoặc tải dữ liệu khách hàng, dữ liệu giao dịch, tài liệu mật, thông tin xác thực hoặc dữ liệu nội bộ nhạy cảm lên các dịch vụ AI công cộng khi chưa được phê duyệt.";
for (const id of [2, 22]) {
  if (!JSON.stringify(byId.get(id)).includes(warning)) process.exit(1);
}
if (require("./tools/content-glossary").length < 11) process.exit(1);
NODE
test "$(sha256sum tools/content-quick.js | cut -d" " -f1)" = "47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278"
```

Expected: all commands exit `0`.

- [ ] **Step 5: Commit foundations and appendices**

```bash
git add tools/content-general.js tools/content-glossary.js
git commit -m "feat: restructure handbook foundations and appendices"
```

---

### Task 3: Consolidate Public AI Reference Guidance

**Files:**
- Modify: `tools/content-reference.js:1-175`
- Test: direct CommonJS content and warning assertions

**Interfaces:**
- Produces chapter IDs `16-21` with exact new slugs.
- Every chapter inherits `kind: "reference"`, `group: "AI phổ biến — THAM KHẢO"` and the exact public-data-only warning.

- [ ] **Step 1: Run a failing public-data boundary check**

```bash
node - <<'NODE'
const chapters = require("./tools/content-reference");
const warning = "Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.";
if (chapters.length !== 6) process.exit(1);
if (chapters.some((chapter) => chapter.statusText !== warning)) process.exit(1);
NODE
```

Expected: exit code `1` because the current status text is less restrictive.

- [ ] **Step 2: Replace the shared reference defaults**

Use:

```js
const sourceDate = "19/08/2026";
const publicDataWarning = "Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.";
const commonControls = [
  "Chỉ sử dụng dữ liệu công khai; không nhập, tải lên hoặc kết nối dữ liệu của Nam A Bank.",
  "Không sử dụng tài khoản cá nhân hoặc địa chỉ thư điện tử NAB để tự đăng ký công cụ.",
  "Không cài tiện ích, ứng dụng hoặc connector để kết nối tới hệ thống hay dữ liệu nội bộ.",
  "Luôn mở nguồn, kiểm tra ngày, biên tập kết quả và chịu trách nhiệm về nội dung cuối."
];

function referenceChapter(config) {
  return Object.assign({
    group: "AI phổ biến — THAM KHẢO",
    eyebrow: "Tham khảo — chỉ dùng dữ liệu công khai",
    kind: "reference",
    statusLabel: "THAM KHẢO",
    statusText: publicDataWarning,
    publicDataOnly: true,
    audience: "Nhân sự NAB tìm hiểu công cụ bằng dữ liệu công khai",
    owner: "Khối CNTT và chuyên gia nghiệp vụ liên quan",
    controls: commonControls,
    sourceDate
  }, config);
}
```

- [ ] **Step 3: Implement the six reference chapters**

Use these exact IDs, slugs and menu titles:

| ID | Slug | Menu title |
|---|---|---|
| 16 | `chapter-16-chon-ai-theo-nhu-cau.html` | Chọn AI theo nhu cầu |
| 17 | `chapter-17-ai-hoi-thoai-tro-ly-da-nang.html` | AI hội thoại và trợ lý đa năng |
| 18 | `chapter-18-notebooklm-lam-viec-voi-tai-lieu.html` | NotebookLM — Làm việc với tài liệu |
| 19 | `chapter-19-ai-thiet-ke-trinh-bay.html` | AI thiết kế và trình bày |
| 20 | `chapter-20-ai-tao-hinh-anh-video.html` | AI tạo hình ảnh và video |
| 21 | `chapter-21-ai-agent-tu-dong-hoa.html` | AI Agent và tự động hóa |

Required structured content:

- Chương 16: table columns `Nhu cầu`, `Ưu tiên tại NAB`, `Lựa chọn tham khảo`; public AI choices must explicitly say “chỉ với dữ liệu công khai”.
- Chương 17: include the exact five-tool comparison and the exact six-row “Chọn nhanh theo nhu cầu” table from the user request. Use the note: “Đây là gợi ý theo thế mạnh phổ biến, không phải bảng xếp hạng cố định. Năng lực các nền tảng AI thay đổi theo thời gian; nên đối chiếu thông tin từ nguồn chính thức và các cộng đồng chuyên môn đáng tin cậy.”
- Chương 18: explain NotebookLM as source-grounded document work and include a `danger` callout repeating `publicDataWarning`.
- Chương 19: compare Canva AI, Gamma, Napkin AI and Microsoft Designer for slide, infographic, diagram, banner and visual content made from public information.
- Chương 20: compare ChatGPT Image, Adobe Firefly, Midjourney, Sora, Google Veo, Runway and Kling AI; include a `danger` callout with all four image/video safety bullets from the user request plus the public-data-only boundary.
- Chương 21: set `statusLabel: "NÂNG CAO"`; compare OpenClaw, n8n AI and Microsoft Copilot Studio, with Dify/Flowise as technical references; include a `danger` callout forbidding connections to Nam A Bank systems, accounts or data.
- Every walkthrough and example uses only named public sources such as vendor documentation, public announcements or public web pages.
- Keep one walkthrough and three to five FAQs per chapter.

- [ ] **Step 4: Verify slugs, tables and mandatory warning**

```bash
node - <<'NODE'
const chapters = require("./tools/content-reference");
const warning = "Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.";
const expected = [
  "chapter-16-chon-ai-theo-nhu-cau.html",
  "chapter-17-ai-hoi-thoai-tro-ly-da-nang.html",
  "chapter-18-notebooklm-lam-viec-voi-tai-lieu.html",
  "chapter-19-ai-thiet-ke-trinh-bay.html",
  "chapter-20-ai-tao-hinh-anh-video.html",
  "chapter-21-ai-agent-tu-dong-hoa.html"
];
if (chapters.length !== 6) process.exit(1);
chapters.forEach((chapter, index) => {
  if (chapter.slug !== expected[index]) process.exit(1);
  if (chapter.statusText !== warning) process.exit(1);
  if (!chapter.featureSections?.length) process.exit(1);
  if (JSON.stringify(chapter).includes("dữ liệu giả lập")) process.exit(1);
});
if (chapters.find((chapter) => chapter.id === 21).statusLabel !== "NÂNG CAO") process.exit(1);
NODE
test "$(sha256sum tools/content-quick.js | cut -d" " -f1)" = "47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278"
```

Expected: all commands exit `0`.

- [ ] **Step 5: Commit reference content**

```bash
git add tools/content-reference.js
git commit -m "feat: consolidate public AI reference guidance"
```

---

### Task 4: Update Release Contracts And Source Governance

**Files:**
- Modify: `tools/build-site.js:16-40`
- Modify: `qa/check-release.py:1-346`
- Modify: `qa/source-register.md:34-104`
- Modify: `qa/release-checklist.md:16-105`
- Test: `python3 qa/check-release.py`

**Interfaces:**
- Consumes: final chapter metadata from Tasks 2-3.
- Produces: exact chapter-name contract, public-data warning enforcement and Amazon Quick checksum enforcement.

- [ ] **Step 1: Update Source ID mappings in the build script**

Keep IDs `1-15` unchanged. Use these mappings for the new chapters:

```js
16: ["NAB-POL-002", "VEN-MS-001", "VEN-AQ-001"],
17: ["NAB-OTH-001", "VEN-OAI-001", "VEN-ANT-001", "VEN-GGL-001", "VEN-PPLX-001", "VEN-XAI-001"],
18: ["NAB-OTH-001", "VEN-GGL-001"],
19: ["NAB-OTH-001", "VEN-CANVA-001", "VEN-DESIGN-001"],
20: ["NAB-OTH-001", "VEN-MEDIA-001"],
21: ["NAB-OTH-001", "VEN-AUTO-001", "VEN-MS-001"],
22: ["NAB-POL-001", "NAB-POL-002"],
23: ["NAB-POL-001", "VEN-MS-001", "VEN-AQ-001"]
```

- [ ] **Step 2: Make the exact chapter list explicit in the release checker**

Add `hashlib` and replace glob-based chapter discovery with:

```python
EXPECTED_SLUGS = [
    "chapter-01-tong-quan.html",
    "chapter-02-nguyen-tac-su-dung-ai-an-toan.html",
    "chapter-03-ky-thuat-viet-prompt.html",
    "chapter-04-ms365-tong-quan.html",
    "chapter-05-ms365-copilot.html",
    "chapter-06-ms365-teams.html",
    "chapter-07-ms365-outlook.html",
    "chapter-08-ms365-word.html",
    "chapter-09-ms365-excel.html",
    "chapter-10-ms365-powerpoint.html",
    "chapter-11-amazon-quick-tong-quan.html",
    "chapter-12-amazon-quick-sight.html",
    "chapter-13-amazon-quick-research-index.html",
    "chapter-14-amazon-quick-flows-automate.html",
    "chapter-15-amazon-quick-apps.html",
    "chapter-16-chon-ai-theo-nhu-cau.html",
    "chapter-17-ai-hoi-thoai-tro-ly-da-nang.html",
    "chapter-18-notebooklm-lam-viec-voi-tai-lieu.html",
    "chapter-19-ai-thiet-ke-trinh-bay.html",
    "chapter-20-ai-tao-hinh-anh-video.html",
    "chapter-21-ai-agent-tu-dong-hoa.html",
    "chapter-22-du-lieu-duoc-phep-khong-duoc-phep.html",
    "chapter-23-giai-thich-thuat-ngu.html",
]
EXPECTED_CHAPTERS = [CHAPTERS_DIR / slug for slug in EXPECTED_SLUGS]
PUBLIC_DATA_WARNING = "Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào."
QUICK_CONTENT_SHA256 = "47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278"
```

Note: the Amazon Quick filenames remain unchanged even though their current menu titles are “Spaces và Chat Agents”, “Dữ liệu, Analyses và Dashboards”, “Scenarios và Quick Research” and “Quick Flows & Automate”.

- [ ] **Step 3: Add mandatory contract checks**

In `run()`:

```python
quick_content = (ROOT / "tools" / "content-quick.js").read_bytes()
if hashlib.sha256(quick_content).hexdigest() != QUICK_CONTENT_SHA256:
    errors.append("tools/content-quick.js changed; Amazon Quick content must remain unchanged")

for number in range(16, 22):
    text = EXPECTED_CHAPTERS[number - 1].read_text(encoding="utf-8")
    if PUBLIC_DATA_WARNING not in text:
        errors.append(f"{EXPECTED_CHAPTERS[number - 1].name}: missing public-data-only warning")
```

Extend `DocumentParser` with `table_count` and `danger_callout_count`; require:

- at least one table in chapters 02, 03, 16, 17, 19, 20, 21, 22 and 23;
- at least one danger warning in chapters 02, 16-22;
- exactly one current navigation item on chapter pages;
- no stale or unexpected chapter HTML.

Keep the existing accessibility, local-link, Source ID and no-network checks. Validate notice DOCX/PDF only when the `documents/` directory exists, because the current website workspace does not contain release-notice artifacts.

- [ ] **Step 4: Correct source-register mappings**

In `qa/source-register.md`:

- Keep Amazon Quick rows aligned to the current chapters: 11 interface, 12 Spaces/Chat Agents, 13 datasets/analyses/dashboards, 14 Scenarios/Research, 15 Flows/Automate.
- Remove Quick Index and Quick Apps claims from the Amazon Quick feature matrix.
- Change `NAB-OTH-001` from an approval-list description to the internal public-data-only guidance that governs chapters 16-21.
- Map public AI sources to the new chapters 16-21.
- Add source rows `VEN-XAI-001`, `VEN-DESIGN-001`, `VEN-MEDIA-001` and `VEN-AUTO-001`, each explicitly limited to public product capabilities and public-data-only examples.
- Replace the old reference disclaimer gate with the exact `PUBLIC_DATA_WARNING` text.

- [ ] **Step 5: Update the release checklist**

In `qa/release-checklist.md`:

- Require six of six reference pages to show the exact public-data warning.
- Require `tools/content-quick.js` to match `QUICK_CONTENT_SHA256`.
- Require the five Amazon Quick menu titles to remain unchanged.
- Keep existing link, accessibility, `file://`, source and reviewer gates.

- [ ] **Step 6: Run the checker before regeneration**

```bash
python3 qa/check-release.py
```

Expected: FAIL because the old generated chapter filenames and content are still present. The failure should mention missing new chapter slugs or the public-data warning, not a Python exception.

- [ ] **Step 7: Regenerate the site and make the new contract pass**

```bash
node tools/build-site.js
python3 qa/check-release.py
```

Expected: the build prints `Generated index.html and 23 chapter pages.` and the checker prints `PASS: static release checks completed`.

- [ ] **Step 8: Commit release contracts and generated pages**

```bash
git add tools/build-site.js qa/check-release.py qa/source-register.md qa/release-checklist.md index.html chapters
git commit -m "test: define updated handbook release contract"
```

---

### Task 5: Generate The Site And Verify The Release Candidate

**Files:**
- Generate: `index.html`
- Generate: `chapters/*.html`
- Modify: `qa/technical-test-report.md`
- Test: build, static release checker, Firefox screenshots, spelling/terminology scans

**Interfaces:**
- Consumes: all content modules, renderer and QA contract from Tasks 1-4.
- Produces: one home page and exactly 23 chapter pages.

- [ ] **Step 1: Regenerate all HTML pages to verify determinism**

```bash
node tools/build-site.js
```

Expected:

```text
Generated index.html and 23 chapter pages.
```

- [ ] **Step 2: Verify generated filenames and Quick source immutability**

```bash
find chapters -maxdepth 1 -type f -name 'chapter-*.html' | sort
test "$(find chapters -maxdepth 1 -type f -name 'chapter-*.html' | wc -l)" -eq 23
test "$(sha256sum tools/content-quick.js | cut -d" " -f1)" = "47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278"
git diff 7b9d54a -- tools/content-quick.js
```

Expected: 23 chapter paths, checksum match, and no diff output for `tools/content-quick.js`.

- [ ] **Step 3: Run syntax and release checks**

```bash
node --check tools/build-site.js
node --check tools/content-general.js
node --check tools/content-ms365.js
node --check tools/content-quick.js
node --check tools/content-reference.js
node --check tools/content-glossary.js
node --check assets/js/site.js
python3 qa/check-release.py
```

Expected: all Node commands exit `0`; release checker prints `PASS: static release checks completed`.

- [ ] **Step 4: Scan for stale names, duplicate sections and unsafe reference wording**

```bash
rg -n 'chapter-02-quan-tri-rui-ro|chapter-03-quy-trinh-va-prompt|chapter-16-chatgpt|chapter-17-notebooklm|chapter-18-claude|chapter-19-gemini|chapter-20-perplexity|chapter-21-canva-ai|chapter-22-tinh-huong-nghiep-vu|chapter-23-ho-tro-va-faq' index.html chapters tools/build-site.js tools/content-general.js tools/content-reference.js
rg -n 'dữ liệu giả lập|dữ liệu NAB khi chưa|tài liệu nội bộ khi chưa' chapters/chapter-1[6-9]-*.html chapters/chapter-2[0-1]-*.html
rg -n 'cihnsh|chính sác|Nam A bank|Chat GPT|NoteBookLM' index.html chapters tools
```

Expected: no output. The first scan proves stale chapter links are gone; the second proves chapters 16-21 do not soften the public-data-only boundary; the third catches known spelling/terminology errors.

- [ ] **Step 5: Verify required tables, warnings and labels**

```bash
rg -l 'Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai' chapters/chapter-1[6-9]-*.html chapters/chapter-2[0-1]-*.html | wc -l
rg -l 'class="content-table' chapters/chapter-02-*.html chapters/chapter-03-*.html chapters/chapter-1[6-9]-*.html chapters/chapter-2[0-3]-*.html
rg -n 'TRỌNG TÂM|THAM KHẢO|NÂNG CAO' index.html chapters/chapter-01-tong-quan.html chapters/chapter-21-ai-agent-tu-dong-hoa.html
```

Expected: warning count `6`; tables appear in all intended pages; all three labels are present.

- [ ] **Step 6: Capture desktop and narrow-viewport screenshots**

```bash
preview_dir=$(mktemp -d)
firefox --headless --window-size 1366,768 --screenshot "$preview_dir/home-desktop.png" "file://$PWD/index.html"
firefox --headless --window-size 1366,768 --screenshot "$preview_dir/reference-desktop.png" "file://$PWD/chapters/chapter-17-ai-hoi-thoai-tro-ly-da-nang.html"
firefox --headless --window-size 390,844 --screenshot "$preview_dir/reference-mobile.png" "file://$PWD/chapters/chapter-20-ai-tao-hinh-anh-video.html"
printf '%s\n' "$preview_dir"
```

Inspect all three images with the local image viewer. Confirm no horizontal page overflow on desktop, tables scroll within their wrapper on the narrow viewport, sidebar does not cover content, security warnings are visually prominent and the current navigation item is clearly highlighted.

- [ ] **Step 7: Rebuild and prove deterministic output**

```bash
before=$(find index.html chapters -type f -name '*.html' -print0 | sort -z | xargs -0 sha256sum | sha256sum | cut -d" " -f1)
node tools/build-site.js
after=$(find index.html chapters -type f -name '*.html' -print0 | sort -z | xargs -0 sha256sum | sha256sum | cut -d" " -f1)
test "$before" = "$after"
```

Expected: exit code `0` and identical aggregate hashes.

- [ ] **Step 8: Record only verified results**

Update `qa/technical-test-report.md` with the commands actually run, PASS results, screenshot viewport sizes and remaining manual gates. Do not claim Edge/Chrome, Windows, UNC, tenant walkthrough, ATTT review or business pilot unless those checks were actually performed.

- [ ] **Step 9: Commit verification evidence**

```bash
git add qa/technical-test-report.md
git commit -m "docs: record handbook verification evidence"
```

- [ ] **Step 10: Final repository review**

```bash
git status --short
git diff 7b9d54a --stat
git diff 7b9d54a -- tools/content-quick.js tools/content-ms365.js assets/js/site.js
python3 qa/check-release.py
```

Expected: clean worktree; final diff contains no changes to the three preserved files; release checker passes.
