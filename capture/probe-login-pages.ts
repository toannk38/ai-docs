/**
 * Thăm dò các trang đăng nhập KHÔNG dùng thông tin đăng nhập:
 * mở link portal, link Quick trực tiếp, trang đăng nhập Quick chung, link có account trong đường dẫn;
 * ghi lại URL (đã che), các ô nhập và nút đang hiển thị, chụp ảnh đã che vào capture/raw/probe/.
 *   npx tsx capture/probe-login-pages.ts
 */
import fs from "node:fs";
import path from "node:path";
import { loadConfig, RAW_DIR, ensureDir } from "./lib/config";
import { openSession, closeSession } from "./lib/browser";
import { maskText } from "./lib/env-mask";

async function main() {
  const config = loadConfig(false);
  const outDir = ensureDir(path.join(RAW_DIR, "probe"));
  const targets: [string, string][] = [
    ["portal", config.startUrl],
    ["app-url", config.appUrl],
    ["quick-generic", "https://quicksight.aws.amazon.com/"],
    ["quick-account-path", `https://${config.region}.quicksight.aws.amazon.com/sn/account/${config.accountName}/start`],
  ];
  const report: unknown[] = [];
  for (const [name, url] of targets) {
    const session = await openSession(config);
    const { page } = session;
    const entry: Record<string, unknown> = { name, requested: maskText(url, config) };
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => undefined);
      await page.waitForTimeout(2500);
      entry.finalUrl = maskText(page.url(), config);
      entry.title = maskText(await page.title(), config);
      const frames = page.frames();
      entry.frames = frames.length;
      const controls: unknown[] = [];
      for (const frame of frames) {
        const items = await frame
          .evaluate(() => {
            const out: Record<string, string>[] = [];
            document.querySelectorAll("input, button, a[role=button], [role=tab], select, h1, h2").forEach((node) => {
              const e = node as HTMLInputElement;
              const r = e.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) return;
              const labelEl = e.id ? document.querySelector(`label[for="${e.id}"]`) : null;
              out.push({
                tag: e.tagName.toLowerCase(),
                type: e.getAttribute("type") || "",
                name: e.getAttribute("name") || "",
                id: e.id || "",
                label: (labelEl?.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 80),
                placeholder: e.getAttribute("placeholder") || "",
                text: (e.innerText || "").trim().slice(0, 80),
                testid: e.getAttribute("data-testid") || "",
              });
            });
            return out;
          })
          .catch(() => []);
        controls.push(...items.map((item) => JSON.parse(maskText(JSON.stringify(item), config))));
      }
      entry.controls = controls;
      await page.screenshot({ path: path.join(outDir, `${name}.png`) });
    } catch (error) {
      entry.error = maskText(String((error as Error).message), config).slice(0, 300);
    }
    report.push(entry);
    await closeSession(session);
  }
  fs.writeFileSync(path.join(outDir, "probe.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(String(error?.message || error));
  process.exit(1);
});
