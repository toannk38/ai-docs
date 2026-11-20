/**
 * Chú thích trên ảnh không được che nút bấm khác, banner không tràn khỏi khung hình.
 *   npx tsx --test capture/tests/overlay.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium, type Browser, type Page } from "playwright";
import { annotate, banner } from "../lib/annotate";

let browser: Browser;
test.before(async () => { browser = await chromium.launch(); });
test.after(async () => { await browser.close(); });

async function pageWith(html: string, width = 800, height = 960): Promise<Page> {
  const page = await browser.newPage({ viewport: { width, height } });
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "overlay-")), "p.html");
  fs.writeFileSync(file, `<!doctype html><meta charset="utf-8"><body style="margin:0">${html}</body>`);
  await page.goto(pathToFileURL(file).href);
  return page;
}

type Box = { x: number; y: number; width: number; height: number };
const overlaps = (a: Box, b: Box) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

async function labelBox(page: Page, text: string): Promise<Box> {
  return page.evaluate((t) => {
    const node = Array.from(document.querySelectorAll("div")).find((d) => d.textContent === t && d.style.position === "fixed")!;
    const r = node.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  }, text);
}

test("label does not cover the button right below the highlighted input", async () => {
  const page = await pageWith(`
    <div style="position:absolute;left:230px;top:600px;width:340px">
      <input id="code" style="width:330px;height:30px">
      <button id="signin" style="display:block;margin-top:24px;width:330px;height:36px">Sign in</button>
    </div>`);
  await annotate(page, page.locator("#code"), null, "Mã 6 số từ ứng dụng Authenticator");
  const label = await labelBox(page, "Mã 6 số từ ứng dụng Authenticator");
  const button = (await page.locator("#signin").boundingBox())!;
  const input = (await page.locator("#code").boundingBox())!;
  assert.equal(overlaps(label, button), false, "nhãn che nút Sign in");
  assert.equal(overlaps(label, input), false, "nhãn che chính ô được khoanh");
  assert.ok(label.x >= 0 && label.y >= 0 && label.x + label.width <= 800 && label.y + label.height <= 960, "nhãn ra ngoài khung hình");
});

test("label stays below when nothing interactive is there", async () => {
  const page = await pageWith(`<input id="q" style="position:absolute;left:100px;top:100px;width:200px">`);
  await annotate(page, page.locator("#q"), null, "Ô tìm kiếm");
  const label = await labelBox(page, "Ô tìm kiếm");
  const input = (await page.locator("#q").boundingBox())!;
  assert.ok(label.y > input.y + input.height, "nhãn mặc định nằm dưới");
});

test("long URL banner wraps inside a narrow capture", async () => {
  const page = await pageWith("<p>x</p>");
  const url = "https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start";
  await banner(page, url, { position: "top" });
  const box = await labelBox(page, url);
  assert.ok(box.x >= 0 && box.x + box.width <= 800, `banner tràn ngang: ${JSON.stringify(box)}`);
  const fits = await page.evaluate((t) => {
    const node = Array.from(document.querySelectorAll("div")).find((d) => d.textContent === t)!;
    return node.scrollWidth <= node.clientWidth;
  }, url);
  assert.equal(fits, true, "chữ trong banner bị cắt");
});

const CLIP = { x: 560, y: 0, width: 800, height: 960 };
const inside = (b: Box, c: Box) => b.x >= c.x && b.y >= c.y && b.x + b.width <= c.x + c.width && b.y + b.height <= c.y + c.height;

test("banner stays inside the clipped region of a wide viewport", async () => {
  const page = await pageWith("<p>x</p>", 1920, 1080);
  const url = "https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start";
  await banner(page, url, { position: "top", bounds: CLIP });
  const box = await labelBox(page, url);
  assert.ok(inside(box, CLIP), `banner ra ngoài vùng cắt: ${JSON.stringify(box)}`);
});

test("label stays inside the clipped region", async () => {
  const page = await pageWith(`<input id="pw" style="position:absolute;left:795px;top:880px;width:330px;height:30px">`, 1920, 1080);
  await annotate(page, page.locator("#pw"), null, "Mật khẩu của bạn ở đây", CLIP);
  const box = await labelBox(page, "Mật khẩu của bạn ở đây");
  assert.ok(inside(box, CLIP), `nhãn ra ngoài vùng cắt: ${JSON.stringify(box)}`);
});

test("URL banner shrinks to one line instead of breaking at hyphens", async () => {
  const page = await pageWith("<p>x</p>", 1920, 1080);
  const url = "https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start";
  await banner(page, url, { position: "top", bounds: CLIP });
  const lines = await page.evaluate((t) => {
    const node = Array.from(document.querySelectorAll("div")).find((d) => d.textContent === t)!;
    const range = document.createRange();
    range.selectNodeContents(node);
    return new Set(Array.from(range.getClientRects()).map((r) => Math.round(r.top))).size;
  }, url);
  assert.equal(lines, 1, "URL phải nằm trên 1 dòng");
});

async function rects(page: Page, sel: string): Promise<Box[]> {
  return page.locator(sel).evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }));
}

test("label boxed in between input and button finds the nearest free slot", async () => {
  const page = await pageWith(`
    <div style="position:absolute;left:200px;top:480px;width:400px">
      <h2 style="margin:0 0 20px">Sign in</h2>
      <input id="acc" style="display:block;width:390px;height:28px" value="ten.dang.nhap@example.com">
      <div id="err" style="color:red;font-size:12px;height:16px">Invalid account name</div>
      <button style="display:block;margin-top:20px;width:400px;height:30px">Next</button>
      <p style="margin-top:12px">No account? <a href="#">Create account</a></p>
    </div>`);
  await annotate(page, page.locator("#err"), null, "Invalid account name (nhãn)");
  const label = await labelBox(page, "Invalid account name (nhãn)");
  for (const r of await rects(page, "input, button, a")) assert.equal(overlaps(label, r), false, `nhãn che ${JSON.stringify(r)}`);
});

test("label does not cover an open menu next to the highlighted button", async () => {
  const page = await pageWith(`
    <button id="acct" style="position:absolute;right:60px;top:4px;width:60px;height:20px">opba-ai</button>
    <div role="menu" style="position:absolute;right:40px;top:28px;width:160px;height:240px;background:#eee">
      <p>Account name</p><p>opba-ai</p><p>Username</p><p>nhanvien.demo</p>
    </div>`, 1920, 1080);
  await annotate(page, page.locator("#acct"), null, "Account name và Username");
  const label = await labelBox(page, "Account name và Username");
  const [menu] = await rects(page, "[role=menu]");
  assert.equal(overlaps(label, menu), false, "nhãn che menu");
  assert.ok(label.x >= 0 && label.x + label.width <= 1920 && label.y >= 0 && label.y + label.height <= 1080);
});
