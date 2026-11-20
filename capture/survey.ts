/**
 * Khảo sát giao diện Amazon Quick (CHỈ ĐỌC: điều hướng, mở menu; không tạo/sửa/xoá gì).
 * Dùng phiên auth.json. Ảnh (đã che) vào analysis/survey/, mô tả giao diện vào analysis/survey/<name>.json.
 *
 *   npx tsx capture/survey.ts home                         # trang chủ + liệt kê điều hướng
 *   npx tsx capture/survey.ts nav                          # bấm lần lượt từng mục điều hướng chính
 *   npx tsx capture/survey.ts visit <name> <url|/sn/path>  # mở một trang
 *   npx tsx capture/survey.ts click <name> "<text>" ["<text2>" ...]  # từ trang chủ bấm theo chuỗi chữ hiển thị
 */
import fs from "node:fs";
import path from "node:path";
import type { Page } from "playwright";
import { PROJECT_ROOT, ensureDir, loadConfig, type CaptureConfig } from "./lib/config";
import { openSession, closeSession, type Session } from "./lib/browser";
import { ensureSession, SessionExpiredError } from "./lib/auth";
import { assertNoLeaks, maskText } from "./lib/env-mask";

const SURVEY_DIR = ensureDir(path.join(PROJECT_ROOT, "analysis", "survey"));

async function settle(page: Page) {
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => undefined);
  await page.waitForTimeout(2000);
  // Đóng popup thông báo (vd "Your Reader users just got a lot more powerful") — chỉ là xác nhận đã đọc
  const ok = page.getByRole("dialog").getByRole("button", { name: /^(ok|got it|close|dismiss)$/i }).first();
  if (await ok.isVisible().catch(() => false)) {
    await ok.click().catch(() => undefined);
    await page.waitForTimeout(800);
  }
}

const MAIN_NAV = ["Search", "My stuff", "Spaces", "Research", "Chat agents", "Apps", "Flows", "Analyses", "Dashboards", "Data", "My folders", "Shared folders"];

async function describe(page: Page, config: CaptureConfig) {
  // Chuỗi JS thuần (tránh lỗi __name khi tsx biên dịch hàm con trong page.evaluate)
  const data = (await page.evaluate(`(() => {
    function vis(el) { var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"; }
    function txt(el) { return (el.innerText || el.getAttribute("aria-label") || "").trim().replace(/\\s+/g, " ").slice(0, 100); }
    function pick(sel) { return Array.from(document.querySelectorAll(sel)).filter(vis).map(txt).filter(Boolean); }
    var navs = Array.from(document.querySelectorAll("nav, [role=navigation], aside")).filter(vis);
    var main = document.querySelector("main, [role=main]");
    return {
      title: document.title,
      headings: pick("h1, h2, h3").slice(0, 40),
      nav: navs.map(function (n) { return Array.from(n.querySelectorAll("a, button, [role=menuitem], [role=tab], [role=treeitem]")).filter(vis).map(txt).filter(Boolean); }),
      buttons: Array.from(new Set(pick("main button, [role=main] button, button[aria-label]"))).slice(0, 80),
      tabs: pick("[role=tab]"),
      inputs: Array.from(document.querySelectorAll("input, textarea, [contenteditable=true]")).filter(vis)
        .map(function (e) { return e.getAttribute("placeholder") || e.getAttribute("aria-label") || e.getAttribute("name") || e.tagName.toLowerCase(); }),
      text: ((main && main.innerText) || document.body.innerText).slice(0, 3000)
    };
  })()`)) as Record<string, unknown>;
  return JSON.parse(maskText(JSON.stringify({ url: page.url(), ...data }), config));
}

async function snap(session: Session, config: CaptureConfig, name: string) {
  const { page } = session;
  const file = path.join(SURVEY_DIR, `${name}.png`);
  const info: Record<string, unknown> = await describe(page, config);
  try {
    await assertNoLeaks(page, session.needles, name);
    await page.screenshot({ path: file });
    info.screenshot = path.basename(file);
  } catch (error) {
    info.leak = String((error as Error).message);
  }
  info.surveyedAt = new Date().toISOString();
  fs.writeFileSync(path.join(SURVEY_DIR, `${name}.json`), JSON.stringify(info, null, 2));
  return info;
}

async function clickText(page: Page, text: string) {
  const re = new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i");
  const loc = page
    .getByRole("link", { name: re })
    .or(page.getByRole("button", { name: re }))
    .or(page.getByRole("menuitem", { name: re }))
    .or(page.getByRole("tab", { name: re }))
    .or(page.getByRole("treeitem", { name: re }))
    .or(page.getByText(re))
    .first();
  await loc.click({ timeout: 15_000 });
  await settle(page);
}

async function main() {
  const [mode, name, ...rest] = process.argv.slice(2);
  const config = loadConfig(false);
  const session = await openSession(config, { useAuth: true });
  const { page } = session;
  const home = `https://${config.region}.quicksight.aws.amazon.com/sn/account/${config.accountName}/start/home`;
  try {
    await ensureSession(page, config, home);
    await settle(page);
    if (mode === "home" || !mode) {
      const info = await snap(session, config, "00-home");
      console.log(JSON.stringify({ title: info.title, headings: info.headings, nav: info.nav, url: info.url }, null, 2));
    } else if (mode === "nav") {
      const items = name ? [name, ...rest] : MAIN_NAV;
      const results: Record<string, unknown>[] = [];
      for (const [i, item] of items.entries()) {
        try {
          await page.goto(home, { waitUntil: "domcontentloaded" });
          await settle(page);
          await clickText(page, item);
          const slug = item.toLowerCase().normalize("NFD").replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
          const r = await snap(session, config, `nav-${String(i + 1).padStart(2, "0")}-${slug}`);
          results.push({ item, url: r.url, headings: r.headings, leak: r.leak });
        } catch (error) {
          results.push({ item, error: maskText(String((error as Error).message), config).slice(0, 200) });
        }
      }
      console.log(JSON.stringify(results, null, 2));
    } else if (mode === "visit") {
      const target = rest[0].startsWith("http") ? rest[0] : `https://${config.region}.quicksight.aws.amazon.com${rest[0]}`;
      await page.goto(target, { waitUntil: "domcontentloaded" });
      await settle(page);
      const info = await snap(session, config, name);
      console.log(JSON.stringify({ url: info.url, headings: info.headings, tabs: info.tabs, buttons: info.buttons, leak: info.leak }, null, 2));
    } else if (mode === "click") {
      for (const text of rest) await clickText(page, text);
      const info = await snap(session, config, name);
      console.log(JSON.stringify({ url: info.url, headings: info.headings, tabs: info.tabs, buttons: info.buttons, inputs: info.inputs, leak: info.leak }, null, 2));
    }
  } finally {
    await closeSession(session);
  }
}

main().catch((error) => {
  console.error(error instanceof SessionExpiredError ? `PHIÊN HẾT HẠN: ${error.message}` : `LỖI: ${String(error?.message || error)}`);
  process.exit(2);
});
