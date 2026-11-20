/**
 * Bộ che POC/username và ẩn mục quản trị trên trang (chạy trong Chromium thật).
 *   npx tsx --test capture/tests/env-mask.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium, type Browser, type Page } from "playwright";
import { installEnvMask, buildMaskRules, type Needle } from "../lib/env-mask";
import type { CaptureConfig } from "../lib/config";

const CONFIG = {
  startUrl: "https://d-0000000000.awsapps.com/start",
  appUrl: "https://us-east-1.quicksight.aws.amazon.com/sn/account/nab-quick-poc/start",
  accountName: "nab-quick-poc",
  loginMethod: "direct",
  region: "us-east-1",
  username: "toannk2",
  password: "x",
  totpSecret: "",
  mfaMode: "prompt",
  headless: true,
  slowMo: 0,
  viewport: { width: 1280, height: 800 },
} as unknown as CaptureConfig;

let browser: Browser;
test.before(async () => {
  browser = await chromium.launch();
});
test.after(async () => {
  await browser.close();
});

async function pageWith(html: string): Promise<{ page: Page; needles: Needle[] }> {
  const context = await browser.newContext();
  const needles = await installEnvMask(context, CONFIG);
  const page = await context.newPage();
  // Điều hướng thật (init script chỉ chạy khi điều hướng, không chạy với setContent)
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "mask-")), "p.html");
  fs.writeFileSync(file, `<!doctype html><meta charset="utf-8"><body>${html}</body>`);
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(80);
  return { page, needles };
}

const leaks = (page: Page, needles: Needle[]) => page.evaluate((n) => (window as any).__captureMask.findLeaks(n), needles);

test("username is masked next to punctuation and in emails", async () => {
  const { page, needles } = await pageWith("<p id='t'>Owner: toannk2, toannk2@example.com</p>");
  assert.equal(await page.textContent("#t"), "Owner: nhanvien.demo, nhanvien.demo@example.com");
  assert.deepEqual(await leaks(page, needles), []);
});

test("reader recipient name toannk2_reader stays visible and is not a leak", async () => {
  const { page, needles } = await pageWith("<p id='t'>Shared with toannk2_reader</p>");
  assert.equal(await page.textContent("#t"), "Shared with toannk2_reader");
  assert.deepEqual(await leaks(page, needles), []);
});

test("bare username still counts as a leak when unmasked text appears", async () => {
  const { needles } = await pageWith("<p></p>");
  const rules = buildMaskRules(CONFIG);
  const usernameNeedle = needles.find((n) => n.label.includes("username"));
  assert.ok(usernameNeedle?.regex, "username needle phải dùng regex ranh giới từ");
  assert.ok(new RegExp(usernameNeedle!.regex!, "i").test("Owner toannk2"));
  assert.ok(!new RegExp(usernameNeedle!.regex!, "i").test("toannk2_reader"));
  assert.ok(rules.rules.length > 0);
});

test("Manage account menu item is hidden, other items stay", async () => {
  const { page } = await pageWith(
    "<ul role='menu'><li role='menuitem'><a href='#'>Manage account</a></li><li role='menuitem' id='so'><a href='#'>Sign out</a></li></ul>",
  );
  assert.equal(await page.getByText("Manage account").isVisible(), false);
  assert.equal(await page.locator("#so").isVisible(), true);
});

test("POC account name is replaced by opba-ai", async () => {
  const { page } = await pageWith("<p id='t'>Account name nab-quick-poc</p>");
  assert.equal(await page.textContent("#t"), "Account name opba-ai");
});

test("input marked no-mask shows typed prefix of recipient name as is", async () => {
  const { page } = await pageWith("<input id='i' data-capture-no-mask value='toa'>");
  await page.waitForTimeout(100);
  assert.equal(await page.locator("[data-capture-mask-overlay]").count(), 0);
});

test("display name masked in two parts collapses to a single 'Nhân viên Demo'", async () => {
  const { page } = await pageWith("<p id='t'>Created by Nhân viên Demo Demo</p><p id='u'>Nhân viên Demo  Demo, Demo</p>");
  assert.equal(await page.textContent("#t"), "Created by Nhân viên Demo");
  assert.equal(await page.textContent("#u"), "Nhân viên Demo, Demo");
});
