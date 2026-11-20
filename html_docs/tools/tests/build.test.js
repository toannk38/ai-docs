"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const build = require("../build-site");
const { page, quickSet } = require("./helpers");

test("chapterNo pads numbers and keeps sub-page ids", () => {
  assert.equal(build.chapterNo(4), "04");
  assert.equal(build.chapterNo(11), "11");
  assert.equal(build.chapterNo("11.1"), "11.1");
});

test("loadPages skips copy normalisation for skipNormalize pages", () => {
  const [kept, changed] = build.loadPages([
    page({ id: 12, slug: "a.html", summary: "documentation", skipNormalize: true }),
    page({ id: 13, slug: "b.html", summary: "documentation" }),
  ]);
  assert.equal(kept.summary, "documentation");
  assert.equal(changed.summary, "tài liệu");
});

test("loadPages orders sub-pages after their group page", () => {
  const raw = quickSet().reverse();
  const ids = build.loadPages(raw).map((p) => String(p.id));
  assert.deepEqual(ids, ["10", "11", "11.1", "11.2", "12", "12.1", "12.2", "16"]);
});

test("pager follows reading order across groups and sub-pages", () => {
  const pages = build.loadPages(quickSet());
  const at = (id) => pages.findIndex((p) => String(p.id) === id);
  const pager = (id) => build.renderPager(at(id), pages);
  assert.match(pager("11.2"), /chapter-11-1-dang-nhap-qua-portal\.html/);
  assert.match(pager("11.2"), /chapter-12-amazon-quick-spaces-chat-agents\.html/);
  assert.match(pager("10"), /chapter-11-amazon-quick-bat-dau\.html"><small>Chương tiếp theo/);
  assert.match(pager("16"), /chapter-12-2-tao-space-tai-tai-lieu\.html"><small>← Chương trước/);
});

test("renderNav nests Quick sub-pages and marks limited pages", () => {
  const pages = build.loadPages(quickSet());
  const nav = build.renderNav("chapter-12-1-hoi-dap-tai-lieu-trong-space.html", "./", pages);
  assert.match(nav, /<ol class="subchapter-nav"[^>]*>[\s\S]*chapter-11-1-dang-nhap-qua-portal\.html/);
  assert.match(nav, /chapter-12-2-tao-space-tai-tai-lieu\.html"[^>]*>[\s\S]*?<span class="limited-star"[^>]*>\*<\/span>/);
  assert.doesNotMatch(nav, /chapter-12-1-hoi-dap-tai-lieu-trong-space\.html"[^>]*>[^<]*<span class="nav-num">12\.1<\/span><span class="nav-label"><span>Hỏi đáp trong Space<\/span><span class="limited-star"/);
  assert.match(nav, /data-search="[^"]*portal applications/);
  assert.equal((nav.match(/aria-current="page"/g) || []).length, 1);
});

test("renderNav collapses Quick sub-page lists except the one holding the current page", () => {
  const pages = build.loadPages(quickSet());
  const toggle = (id, expanded) => new RegExp(`<button class="subnav-toggle"[^>]*aria-expanded="${expanded}"[^>]*aria-controls="subnav-${id}"[^>]*>[\\s\\S]*?</button>\\s*<ol class="subchapter-nav" id="subnav-${id}"`);
  const onTask = build.renderNav("chapter-12-1-hoi-dap-tai-lieu-trong-space.html", "./", pages);
  assert.match(onTask, toggle(11, false));
  assert.match(onTask, toggle(12, true));
  const onGroup = build.renderNav("chapter-11-amazon-quick-bat-dau.html", "./", pages);
  assert.match(onGroup, toggle(11, true));
  assert.match(onGroup, toggle(12, false));
  assert.match(build.renderNav("", "./", pages), toggle(11, false));
});

test("renderHome lists Quick sub-pages on group cards and links to login guide", () => {
  const pages = build.loadPages(quickSet());
  const home = build.renderHome(pages);
  assert.match(home, /chapter-11-2-dang-nhap-bang-link-quick\.html/);
  assert.match(home, /Tạo Space<span class="limited-star"[^>]*>\*<\/span>/);
});

test("Quick page summaries carry no links (they render inside group-page card links)", () => {
  const pages = [...require("../content-quick").groups || [], ...require("../quick/ch11"), ...require("../quick/ch12"), ...require("../quick/ch13"), ...require("../quick/ch14"), ...require("../quick/ch15")];
  const withLinks = pages.filter((p) => /\]\(/.test(p.summary)).map((p) => p.id);
  assert.deepEqual(withLinks, []);
});
