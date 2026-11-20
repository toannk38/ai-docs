/**
 * Chú thích trên ảnh: khung đỏ + số bước ①②③ quanh phần tử cần bấm, nhãn ngắn,
 * và banner chữ lớn (dùng cho cảnh báo trên ảnh / phụ đề khi quay). Gỡ sau khi chụp.
 */
import fs from "node:fs";
import path from "node:path";
import type { BrowserContext, Locator, Page } from "playwright";

const OVERLAY_SCRIPT = fs.readFileSync(path.join(__dirname, "browser", "overlay.js"), "utf8");

export async function installOverlay(context: BrowserContext): Promise<void> {
  await context.addInitScript({ content: OVERLAY_SCRIPT });
}

async function ensureOverlay(page: Page): Promise<void> {
  const ok = await page.evaluate(() => Boolean((window as any).__captureOverlay));
  if (!ok) await page.addScriptTag({ content: OVERLAY_SCRIPT });
}

export async function inViewport(locator: Locator, box: { x: number; y: number; width: number; height: number }): Promise<boolean> {
  const vp = locator.page().viewportSize();
  if (!vp) return true;
  return box.y >= 0 && box.x >= 0 && box.y + box.height <= vp.height && box.x + box.width <= vp.width;
}

/** Toạ độ phần tử tính theo viewport của trang chính (cộng offset nếu nằm trong iframe). */
async function viewportRect(locator: Locator) {
  // Trang Quick hay vẽ lại ngay sau khi tải: thử lại vài lần trước khi báo lỗi.
  let box = null;
  for (let attempt = 0; attempt < 4 && !box; attempt += 1) {
    await locator.waitFor({ state: "visible", timeout: 10_000 }).catch(() => undefined);
    box = await locator.boundingBox({ timeout: 5_000 }).catch(() => null);
    // Chỉ cuộn khi phần tử ngoài màn hình — cuộn làm popover/menu của Quick tự đóng.
    if (box && !(await inViewport(locator, box))) {
      await locator.scrollIntoViewIfNeeded({ timeout: 5_000 }).catch(() => undefined);
      box = await locator.boundingBox({ timeout: 5_000 }).catch(() => null);
    }
  }
  if (!box) throw new Error("Không xác định được vị trí phần tử để khoanh (phần tử bị ẩn?).");
  return box; // boundingBox đã quy về viewport trang chính, kể cả trong iframe
}

export type Bounds = { x: number; y: number; width: number; height: number };

/** bounds: vùng ảnh sẽ được cắt (clip) — chú thích phải nằm trong đó. */
export async function annotate(page: Page, locator: Locator, step: number | null, label?: string, bounds?: Bounds): Promise<void> {
  await ensureOverlay(page);
  const rect = await viewportRect(locator);
  await page.evaluate(
    (args) => (window as any).__captureOverlay.annotate(args.rect, args.step, args.label, args.bounds),
    { rect, step, label: label ?? "", bounds: bounds ?? null },
  );
}

export async function banner(
  page: Page,
  text: string,
  opts: { position?: "top" | "bottom"; tone?: "info" | "danger"; bounds?: Bounds } = {},
): Promise<void> {
  await ensureOverlay(page);
  await page.evaluate((args) => (window as any).__captureOverlay.banner(args.text, args.opts), { text, opts });
}

export async function clearAnnotations(page: Page): Promise<void> {
  await page.evaluate(() => (window as any).__captureOverlay?.clear()).catch(() => undefined);
}
