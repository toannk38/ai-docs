/**
 * Con trỏ chuột giả + hiệu ứng click cho video (headless không vẽ con trỏ thật).
 * Di chuyển chuột theo nhiều bước để video thấy rõ đường đi.
 */
import type { Locator, Page } from "playwright";
import { inViewport } from "./annotate";

const lastPos = new WeakMap<Page, { x: number; y: number }>();

export async function enableCursor(page: Page, on = true): Promise<void> {
  await page.evaluate((value) => (window as any).__captureOverlay?.enableCursor(value), on).catch(() => undefined);
}

/** Ẩn con trỏ khi chụp ảnh tĩnh (ảnh chỉ cần khung đỏ). */
export async function hideCursor(page: Page): Promise<void> {
  await page.evaluate(() => (window as any).__captureOverlay?.hideCursor()).catch(() => undefined);
}

export async function showCursor(page: Page): Promise<void> {
  await page.evaluate(() => (window as any).__captureOverlay?.showCursor()).catch(() => undefined);
}

export async function moveTo(page: Page, locator: Locator, steps = 28): Promise<{ x: number; y: number }> {
  let box = await locator.boundingBox();
  if (box && !(await inViewport(locator, box))) {
    await locator.scrollIntoViewIfNeeded().catch(() => undefined);
    box = await locator.boundingBox();
  }
  if (!box) throw new Error("Không xác định được vị trí phần tử để di chuột tới.");
  const target = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  const from = lastPos.get(page);
  if (!from) await page.mouse.move(target.x - 160, target.y + 120);
  await page.mouse.move(target.x, target.y, { steps });
  lastPos.set(page, target);
  return target;
}

export async function humanClick(page: Page, locator: Locator): Promise<void> {
  await moveTo(page, locator);
  await page.waitForTimeout(180);
  await page.mouse.down();
  await page.waitForTimeout(90);
  await page.mouse.up();
}

/** Gõ từng ký tự để video thấy thao tác nhập. */
export async function humanType(page: Page, locator: Locator, text: string, delayMs = 70): Promise<void> {
  await humanClick(page, locator);
  await locator.pressSequentially(text, { delay: delayMs });
}
