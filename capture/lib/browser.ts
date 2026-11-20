/**
 * Khởi tạo trình duyệt/context với bộ che POC, lớp chú thích và (tuỳ chọn) quay video.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { AUTH_FILE, READER_AUTH_FILE, ensureDir, type CaptureConfig } from "./config";
import { installEnvMask, type Needle } from "./env-mask";
import { installOverlay } from "./annotate";

export interface Session {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  needles: Needle[];
  videoDir?: string;
  startedAt: number;
}

export async function openSession(
  config: CaptureConfig,
  opts: { useAuth?: boolean | "main" | "reader"; videoDir?: string; locale?: string } = {},
): Promise<Session> {
  const browser = await chromium.launch({ headless: config.headless, slowMo: config.slowMo });
  const authFile = opts.useAuth === "reader" ? READER_AUTH_FILE : AUTH_FILE;
  if (opts.useAuth && !fs.existsSync(authFile)) {
    await browser.close();
    throw new Error(
      opts.useAuth === "reader"
        ? "Chưa có auth-reader.json. Chạy `npx tsx capture/login.ts direct --entry=generic --as=reader` trước."
        : "Chưa có auth.json. Chạy `npm run login` trước.",
    );
  }
  const context = await browser.newContext({
    viewport: config.viewport,
    deviceScaleFactor: 1,
    locale: opts.locale ?? "en-US",
    timezoneId: "Asia/Ho_Chi_Minh",
    storageState: opts.useAuth ? authFile : undefined,
    recordVideo: opts.videoDir ? { dir: ensureDir(opts.videoDir), size: config.viewport } : undefined,
  });
  context.setDefaultTimeout(30_000);
  context.setDefaultNavigationTimeout(60_000);
  const needles = await installEnvMask(context, config);
  await installOverlay(context);
  const page = await context.newPage();
  return { browser, context, page, needles, videoDir: opts.videoDir, startedAt: Date.now() };
}

/** Đóng context (để Playwright ghi xong video) và trả về đường dẫn file video, nếu có. */
export async function closeSession(session: Session, videoTarget?: string): Promise<string | null> {
  const pages = session.context.pages();
  const video = pages[0]?.video() ?? null;
  await session.context.close();
  await session.browser.close();
  if (!video || !videoTarget) return null;
  const src = await video.path();
  ensureDir(path.dirname(videoTarget));
  fs.renameSync(src, videoTarget);
  return videoTarget;
}
