/**
 * Smoke test gói phát hành: copy index.html + chapters/ + assets/ + logo/ vào thư mục tạm
 * có dấu và khoảng trắng, mở qua file://.
 *   npx tsx --test capture/tests/release-smoke.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium, type Browser, type Page } from "playwright";

const SRC = path.resolve(__dirname, "..", "..", "html_docs");
const PACKAGE = ["index.html", "chapters", "assets", "logo"];

function makePackage(): string {
  const dir = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "release-")), "Cẩm nang AI test");
  fs.mkdirSync(dir);
  for (const item of PACKAGE) fs.cpSync(path.join(SRC, item), path.join(dir, item), { recursive: true });
  return dir;
}

const PAGES = [
  "index.html",
  "chapters/chapter-11-1-kich-hoat-tai-khoan.html",
  "chapters/chapter-11-3-dang-nhap-bang-link-quick.html",
  "chapters/chapter-12-3-chia-se-space.html",
  "chapters/chapter-13-5-tao-analysis-dashboard.html", // trang * (giới hạn user)
];

const SEARCHES: Array<[string, string[]]> = [
  ["đăng nhập", ["chapter-11-2-dang-nhap-qua-portal.html", "chapter-11-3-dang-nhap-bang-link-quick.html", "chapter-11-4-dang-nhap-tren-microsoft-office.html"]],
  ["opba-ai", ["chapter-11-3-dang-nhap-bang-link-quick.html"]],
  ["kích hoạt", ["chapter-11-1-kich-hoat-tai-khoan.html"]],
  ["add-in", ["chapter-11-4-dang-nhap-tren-microsoft-office.html"]],
  ["chia sẻ", ["chapter-12-3-chia-se-space.html", "chapter-12-6-chia-se-chat-agent.html"]],
  ["agent", ["chapter-12-4-dung-chat-agent.html", "chapter-12-5-tao-chat-agent.html"]],
  ["flow", ["chapter-15-1-chay-flow-co-san.html", "chapter-15-2-tao-flow.html"]],
];

async function openChecked(browser: Browser, url: string, width: number): Promise<{ page: Page; errors: string[]; foreign: string[] }> {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors: string[] = [];
  const foreign: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("request", (r) => { if (!r.url().startsWith("file:") && !r.url().startsWith("data:")) foreign.push(r.url()); });
  await page.goto(url, { waitUntil: "load" });
  await page.waitForFunction(() => document.documentElement.classList.contains("js"));
  return { page, errors, foreign };
}

test("release package works over file:// from a Vietnamese path with spaces", async () => {
  const dir = makePackage();
  const browser = await chromium.launch();
  try {
    for (const rel of PAGES) {
      for (const width of [375, 768, 1440]) {
        const { page, errors, foreign } = await openChecked(browser, pathToFileURL(path.join(dir, rel)).href, width);
        // ảnh lazy: cuộn tới từng ảnh để tải
        const broken = await page.evaluate(async () => {
          // bỏ ảnh khung phóng to (src rỗng cho tới khi bấm vào ảnh)
          const imgs = Array.from(document.images).filter((i) => !i.closest(".image-modal"));
          for (const img of imgs) {
            img.loading = "eager";
            img.scrollIntoView();
            if (!img.complete) await new Promise((r) => { img.onload = img.onerror = r; });
          }
          return imgs.filter((i) => i.naturalWidth === 0).map((i) => i.getAttribute("src"));
        });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert.deepEqual(errors, [], `${rel}@${width}: lỗi console`);
        assert.deepEqual(foreign, [], `${rel}@${width}: request ngoài file://`);
        assert.deepEqual(broken, [], `${rel}@${width}: ảnh hỏng`);
        assert.ok(overflow <= 0, `${rel}@${width}: tràn ngang ${overflow}px`);
        await page.close();
      }
    }

    const { page } = await openChecked(browser, pathToFileURL(path.join(dir, PAGES[1])).href, 1440);
    for (const [query, slugs] of SEARCHES) {
      await page.keyboard.press("Control+k");
      assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute("data-portal-search")), true, "Ctrl+K phải focus ô tìm");
      await page.keyboard.type(query);
      for (const slug of slugs) {
        const shown = await page.locator(`a[data-nav-link][href$="${slug}"]`).first()
          .evaluate((a) => !a.closest("li")!.hidden && !(a.closest(".nav-group") as HTMLElement | null)?.hidden);
        assert.equal(shown, true, `"${query}" phải hiện ${slug}`);
      }
      await page.keyboard.press("Escape");
    }
  } finally {
    await browser.close();
    fs.rmSync(path.dirname(dir), { recursive: true, force: true });
  }
});
