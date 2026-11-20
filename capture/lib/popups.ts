/**
 * Đóng popup thông báo của Quick: "Your Reader users just got a lot more powerful" (admin) và
 * "AWS Quick just got a lot more powerful" (người dùng) — không phải nội dung hướng dẫn.
 */
import type { Page } from "playwright";

const ANNOUNCEMENT = /Your Reader users just got a lot more powerful|AWS Quick just got a lot more powerful/i;

export async function dismissAnnouncements(page: Page): Promise<boolean> {
  const dialog = page.getByRole("dialog").filter({ hasText: ANNOUNCEMENT }).first();
  if (!(await dialog.isVisible().catch(() => false))) return false;
  const ok = dialog.getByRole("button", { name: /^ok$/i }).first();
  const close = dialog.getByRole("button", { name: /^close$/i }).first();
  if (await ok.isVisible().catch(() => false)) await ok.click().catch(() => undefined);
  else await close.click().catch(() => undefined);
  await page.waitForTimeout(600);
  return true;
}
