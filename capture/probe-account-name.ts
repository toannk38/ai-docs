/**
 * Thăm dò ô "Quick account name" trên trang đăng nhập Quick chung (KHÔNG dùng mật khẩu):
 *  1) nhập giá trị SAI giả (dạng email) -> chụp màn hình lỗi
 *  2) nhập account name POC (hiển thị là opba-ai) -> xem được chuyển tới đâu
 *   npx tsx capture/probe-account-name.ts
 */
import fs from "node:fs";
import path from "node:path";
import { loadConfig, RAW_DIR, ensureDir } from "./lib/config";
import { openSession, closeSession } from "./lib/browser";
import { maskText, assertNoLeaks } from "./lib/env-mask";

const WRONG_VALUE = "ten.dang.nhap@example.com";

async function main() {
  const config = loadConfig(false);
  const outDir = ensureDir(path.join(RAW_DIR, "probe"));
  const report: Record<string, unknown>[] = [];
  for (const [name, value] of [["wrong-account", WRONG_VALUE], ["correct-account", config.accountName]] as const) {
    const session = await openSession(config);
    const { page } = session;
    const entry: Record<string, unknown> = { name };
    try {
      await page.goto("https://quicksight.aws.amazon.com/", { waitUntil: "domcontentloaded" });
      const input = page.locator("#account-name-input");
      await input.waitFor();
      await input.fill(value);
      await page.waitForTimeout(500);
      await assertNoLeaks(page, session.needles, `${name}/filled`);
      await page.screenshot({ path: path.join(outDir, `${name}-filled.png`) });
      await page.locator("#account-name-submit-button").click();
      await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => undefined);
      await page.waitForTimeout(3000);
      entry.finalUrl = maskText(page.url(), config);
      entry.title = maskText(await page.title(), config);
      entry.visibleText = maskText((await page.locator("body").innerText()).slice(0, 1200), config);
      await assertNoLeaks(page, session.needles, `${name}/after-next`);
      await page.screenshot({ path: path.join(outDir, `${name}-after-next.png`) });
    } catch (error) {
      entry.error = maskText(String((error as Error).message), config).slice(0, 400);
    }
    report.push(entry);
    await closeSession(session);
  }
  fs.writeFileSync(path.join(outDir, "probe-account-name.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(String(error?.message || error));
  process.exit(1);
});
