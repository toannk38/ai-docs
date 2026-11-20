/**
 * Ctrl+K (lọc sidebar) phải giữ cây cha–con của phần Amazon Quick.
 *   npx tsx --test capture/tests/site-nav.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium, type Page } from "playwright";

const ROOT = path.resolve(__dirname, "..", "..");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const build = require(path.join(ROOT, "html_docs/tools/build-site.js"));
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { quickSet } = require(path.join(ROOT, "html_docs/tools/tests/helpers.js"));

function fixture(): string {
  const pages = build.loadPages(quickSet());
  const siteJs = pathToFileURL(path.join(ROOT, "html_docs/assets/js/site.js")).href;
  const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><script src="${siteJs}" defer></script></head><body>
    <input id="portal-search" type="search" data-portal-search>
    <aside class="sidebar" data-sidebar><div class="sidebar-inner">${build.renderNav("chapter-12-1-hoi-dap-tai-lieu-trong-space.html", "./", pages)}
    <p class="nav-empty" data-nav-empty>Không tìm thấy</p></div></aside></body></html>`;
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "nav-")), "nav.html");
  fs.writeFileSync(file, html);
  return pathToFileURL(file).href;
}

async function visible(page: Page, slug: string): Promise<boolean> {
  return page.locator(`a[href="./${slug}"]`).first().evaluate((a) => !a.closest("li")!.hidden && !a.closest("nav")!.hidden);
}

async function search(page: Page, query: string) {
  await page.fill("[data-portal-search]", query);
  await page.dispatchEvent("[data-portal-search]", "input");
}

const S = {
  g11: "chapter-11-amazon-quick-bat-dau.html",
  p111: "chapter-11-1-dang-nhap-qua-portal.html",
  p112: "chapter-11-2-dang-nhap-bang-link-quick.html",
  g12: "chapter-12-amazon-quick-spaces-chat-agents.html",
  p121: "chapter-12-1-hoi-dap-tai-lieu-trong-space.html",
  p122: "chapter-12-2-tao-space-tai-tai-lieu.html",
};

test("Ctrl+K keeps Quick parent/child tree visible", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto(fixture());
    await page.waitForFunction(() => document.documentElement.classList.contains("js"));

    await search(page, "portal");
    assert.equal(await visible(page, S.p111), true, "trang con khớp phải hiện");
    assert.equal(await visible(page, S.g11), true, "trang nhóm cha phải hiện khi con khớp");
    assert.equal(await visible(page, S.p112), false);
    assert.equal(await visible(page, S.g12), false);

    await search(page, "Spaces và Chat");
    assert.equal(await visible(page, S.g12), true);
    assert.equal(await visible(page, S.p121), true, "con của nhóm khớp phải hiện");
    assert.equal(await visible(page, S.p122), true);

    await search(page, "Tạo Space");
    assert.equal(await visible(page, S.p122), true, "trang giới hạn user vẫn tìm được");
    assert.equal(await visible(page, S.g12), true);

    await search(page, "");
    for (const slug of Object.values(S)) assert.equal(await visible(page, slug), true);
  } finally {
    await browser.close();
  }
});
