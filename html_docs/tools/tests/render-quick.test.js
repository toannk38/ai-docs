"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const build = require("../build-site");
const rq = require("../render-quick");
const { quickSet } = require("./helpers");

function render(id, overrides = {}) {
  const pages = build.loadPages(quickSet()).map((p) => (String(p.id) === id ? { ...p, ...overrides } : p));
  const index = pages.findIndex((p) => String(p.id) === id);
  return build.renderChapter(pages[index], index, pages);
}

const VIDEO = { src: "assets/videos/quick/12-1.mp4", poster: "assets/videos/quick/12-1.jpg", caption: "Hỏi đáp", durationText: "45 giây" };

test("task page without video renders no video block or download link", () => {
  const html = render("12.1");
  assert.doesNotMatch(html, /<video/);
  assert.doesNotMatch(html, /download/);
});

test("task page with video uses metadata preload, poster and no track", () => {
  const html = render("12.1", { video: VIDEO });
  assert.match(html, /<video controls preload="metadata" playsinline poster="\.\.\/assets\/videos\/quick\/12-1\.jpg" src="\.\.\/assets\/videos\/quick\/12-1\.mp4">/);
  assert.match(html, /<a href="\.\.\/assets\/videos\/quick\/12-1\.mp4" download>/);
  assert.doesNotMatch(html, /<track/);
});

test("limited page shows star in h1 and the limited-user notice", () => {
  const html = render("12.2");
  assert.match(html, /<h1>Tiêu đề <span class="limited-star"[^>]*>\*<\/span><\/h1>/);
  assert.match(html, /Tính năng này giới hạn user/);
});

test("unlimited task page has no star in h1", () => {
  assert.match(render("12.1"), /<h1>Tiêu đề<\/h1>/);
});

test("pre-warning renders before the step figure", () => {
  const html = rq.renderFiguredSteps(
    [{ text: "Nhập **opba-ai**", preWarning: "Ô này nhập `opba-ai`", figure: { src: "assets/a.png", alt: "Ô account", caption: "Bước 2" } }],
    "../",
  );
  assert.ok(html.indexOf("step-pre-warning") < html.indexOf("<figure"));
  assert.match(html, /Nhập <strong>opba-ai<\/strong>/);
  assert.match(html, /<code>opba-ai<\/code>/);
});

test("compare block renders wrong and right cards", () => {
  const html = rq.renderCompare({ wrong: { label: "✗ Sai", text: "Nhập email" }, right: { label: "✓ Đúng", text: "Nhập opba-ai" } }, "../");
  assert.match(html, /compare-wrong[\s\S]*Nhập email[\s\S]*compare-right[\s\S]*Nhập opba-ai/);
});

test("link boxes show clickable link and copyable text", () => {
  const html = rq.renderLinkBoxes([{ label: "Link chính", url: "https://nab-opba-ai.awsapps.com/start" }]);
  assert.match(html, /<a href="https:\/\/nab-opba-ai\.awsapps\.com\/start"[^>]*>/);
  assert.match(html, /<code[^>]*>https:\/\/nab-opba-ai\.awsapps\.com\/start<\/code>/);
});

test("troubleshooting table has see/why/do columns", () => {
  const html = rq.renderTroubleshooting([{ symptom: "Invalid account name", cause: "Nhập email", action: "Nhập opba-ai" }], "../");
  assert.match(html, /<th scope="col">Thấy gì<\/th><th scope="col">Vì sao<\/th><th scope="col">Làm gì<\/th>/);
});

test("sub-page breadcrumb links to its group page", () => {
  const html = render("12.1");
  assert.match(html, /<li>Amazon Quick<\/li><li><a href="\.\/chapter-12-amazon-quick-spaces-chat-agents\.html">12\. Spaces và Chat agents<\/a><\/li><li aria-current="page">12\.1\. Hỏi đáp trong Space<\/li>/);
});

test("group page links every child task page", () => {
  const html = render("12");
  assert.match(html, /href="\.\/chapter-12-1-hoi-dap-tai-lieu-trong-space\.html"/);
  assert.match(html, /href="\.\/chapter-12-2-tao-space-tai-tai-lieu\.html"/);
});

test("quick pages keep required control labels", () => {
  for (const id of ["11", "12.1"]) {
    const html = render(id);
    assert.match(html, /Nguyên tắc dừng/);
    assert.match(html, /Mã nguồn kiểm soát:/);
    assert.match(html, /NAB-AQ-003/);
  }
});

test("inline renders markdown links, external ones open in a new tab", () => {
  assert.equal(rq.inline("Vào [portal](https://nab-opba-ai.awsapps.com/start)"), 'Vào <a href="https://nab-opba-ai.awsapps.com/start" target="_blank" rel="noopener noreferrer">portal</a>');
  assert.equal(rq.inline("Xem [**11.2** Portal](./chapter-11-2-dang-nhap-qua-portal.html)"), 'Xem <a href="./chapter-11-2-dang-nhap-qua-portal.html"><strong>11.2</strong> Portal</a>');
});

test("inline renders *italic* but leaves a lone star alone", () => {
  assert.equal(rq.inline("Không chọn *Security key*."), "Không chọn <em>Security key</em>.");
  assert.equal(rq.inline("Các trang có dấu * là giới hạn; dấu * khác"), "Các trang có dấu * là giới hạn; dấu * khác");
  assert.equal(rq.inline("Đậm **A** và `user_demo`"), "Đậm <strong>A</strong> và <code>user_demo</code>");
});

test("figured step renders sub-list before its figure and notes after it", () => {
  const html = rq.renderFiguredSteps(
    [{
      text: "**Mục 3**",
      list: ["Nhập mã", "Bấm **Assign MFA**"],
      figure: { src: "assets/a.png", alt: "Ảnh", caption: "Ảnh" },
      notes: [{ tone: "info", text: "Lưu mã QR" }, { tone: "warning", critical: true, text: "**QUAN TRỌNG**" }, { text: "Đoạn thường" }],
    }],
    "../",
  );
  assert.match(html, /<ol class="step-sublist"><li>Nhập mã<\/li><li>Bấm <strong>Assign MFA<\/strong><\/li><\/ol>/);
  assert.ok(html.indexOf("step-sublist") < html.indexOf("<figure"));
  assert.ok(html.indexOf("<figure") < html.indexOf("Lưu mã QR"));
  assert.match(html, /<div class="callout info step-note"><p>Lưu mã QR<\/p><\/div>/);
  assert.match(html, /<div class="callout warning callout-critical step-note"><p><strong>QUAN TRỌNG<\/strong><\/p><\/div>/);
  assert.match(html, /<p class="step-note">Đoạn thường<\/p>/);
});

test("task page renders extra sections after the steps and skips empty verify", () => {
  const html = render("12.1", {
    walkthroughs: [{ title: "Làm", steps: ["Bước 1"] }],
    sections: [{ id: "buoc-tiep-theo", title: "Bước tiếp theo", intro: "Chọn:", items: ["[11.2](./a.html)"], callout: { tone: "info", text: "Ghi chú" }, tables: [{ caption: "Lỗi", headers: ["Tình huống", "Cách xử lý"], rows: [["Sai mã", "Bấm **Assign MFA**"]] }] }],
    troubleshooting: [{ symptom: "x", cause: "y", action: "z" }],
  });
  assert.doesNotMatch(html, /Kết quả cần kiểm chứng:<\/strong> undefined/);
  assert.match(html, /<section id="buoc-tiep-theo">[\s\S]*<a href="\.\/a\.html">11\.2<\/a>[\s\S]*callout info[\s\S]*<td>Bấm <strong>Assign MFA<\/strong><\/td>/);
  assert.ok(html.indexOf('id="cac-buoc"') < html.indexOf('id="buoc-tiep-theo"'));
  assert.ok(html.indexOf('id="buoc-tiep-theo"') < html.indexOf('id="loi-thuong-gap"'));
  assert.match(html, /href="#buoc-tiep-theo"/);
});

const CONCEPTS = {
  intro: "Đọc trước khi làm.",
  chain: [{ term: "Nguồn dữ liệu", note: "tệp, CSDL" }, { term: "Dataset", note: "dữ liệu đã chuẩn bị" }, { term: "Dashboard" }],
  cards: [{ term: "Dataset", what: "Bộ dữ liệu **đã chuẩn bị**.", use: "Làm nguồn cho analysis.", example: "Tệp giao dịch chi nhánh." }],
  tables: [{ caption: "So sánh", headers: ["A", "B"], rows: [["SPICE", "**nhanh**"]] }],
  callout: { tone: "info", text: "Ghi nhớ" },
};

test("task page renders the concepts section before the steps", () => {
  const html = render("12.1", { concepts: CONCEPTS });
  const at = (s) => html.indexOf(s);
  assert.ok(at('id="hieu-nhanh"') > 0 && at('id="hieu-nhanh"') > at('id="dieu-kien"') && at('id="hieu-nhanh"') < at('id="cac-buoc"'));
  assert.match(html, /<h2>Hiểu nhanh<\/h2>/);
  assert.match(html, /href="#hieu-nhanh"/);
  assert.match(html, /<ol class="concept-chain"[^>]*><li><strong>Nguồn dữ liệu<\/strong><span>tệp, CSDL<\/span><\/li><li><strong>Dataset<\/strong><span>dữ liệu đã chuẩn bị<\/span><\/li><li><strong>Dashboard<\/strong><\/li><\/ol>/);
  assert.match(html, /<article class="concept-card"><h3>Dataset<\/h3><p>Bộ dữ liệu <strong>đã chuẩn bị<\/strong>\.<\/p><p><b>Dùng để:<\/b> Làm nguồn cho analysis\.<\/p><p><b>Ví dụ:<\/b> Tệp giao dịch chi nhánh\.<\/p><\/article>/);
  assert.match(html, /<td><strong>nhanh<\/strong><\/td>/);
});

test("group page renders the concepts section right after objectives", () => {
  const html = render("12", { concepts: CONCEPTS });
  const at = (s) => html.indexOf(s);
  assert.ok(at('id="muc-tieu"') < at('id="hieu-nhanh"') && at('id="hieu-nhanh"') < at('id="cac-viec"'));
});

test("pages without concepts have no concepts section", () => {
  assert.doesNotMatch(render("12.1"), /hieu-nhanh/);
});
