/**
 * Chạy một flow: chụp ảnh từng bước (khung đỏ + số bước), quay video 1920×1080,
 * ghi steps.json (chú thích, mốc thời gian, đoạn chờ xử lý để tua nhanh khi dựng video).
 *
 * Đầu ra: capture/out/<flow>/step-XX.png, raw.webm, steps.json
 * Lỗi phiên/đăng nhập/lộ thông tin -> dừng ngay, không chụp/quay tiếp; video dở dang để ở capture/raw/failed/.
 */
import fs from "node:fs";
import path from "node:path";
import type { Locator, Page } from "playwright";
import { LIVE, OUT_DIR, RAW_DIR, SAMPLES_DIR, ensureDir, type CaptureConfig } from "./config";
import { openSession, closeSession } from "./browser";
import { assertNoLeaks, blurSelectors, maskText } from "./env-mask";
import { annotate, banner, clearAnnotations } from "./annotate";
import { enableCursor, hideCursor, humanClick, humanType, moveTo, showCursor } from "./cursor";
import { ensureSession } from "./auth";
import { dismissAnnouncements } from "./popups";
import { describeTarget, resolveTarget, resolveValue, type Flow, type FlowContext, type Step } from "./flow";

interface StepRecord {
  index: number;
  id?: string;
  caption: string;
  action: Step["action"];
  target?: string;
  value?: string;
  label?: string;
  banner?: string;
  note?: string;
  screenshot?: string;
  skipped?: boolean;
  /** Mốc thời gian (ms) tính từ đầu video. */
  tStart: number;
  tEnd: number;
  /** Đoạn chờ hệ thống xử lý — có thể tua nhanh khi dựng video. */
  waits: { label: string; tStart: number; tEnd: number }[];
  url: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const CREATED_FILE = path.join(OUT_DIR, "created.json");

/** Ghi thêm một đối tượng do flow tạo trên POC (Space, agent, dataset…) — dùng để dọn đúng đối tượng sau này. */
export function recordCreated(flow: string, kind: string, name: string, url: string): void {
  ensureDir(OUT_DIR);
  const list = fs.existsSync(CREATED_FILE) ? JSON.parse(fs.readFileSync(CREATED_FILE, "utf8")) : [];
  list.push({ kind, name, url, flow, createdAt: new Date().toISOString() });
  fs.writeFileSync(CREATED_FILE, JSON.stringify(list, null, 2));
}

async function screenshot(page: Page, file: string, step: Step, locator: Locator | null): Promise<void> {
  if (step.clip && step.clip !== "viewport" && "rect" in step.clip) {
    await page.screenshot({ path: file, clip: step.clip.rect });
    return;
  }
  if (step.clip && step.clip !== "viewport") {
    const box = await resolveTarget(page, step.clip.target).boundingBox();
    if (box) {
      const p = step.clip.padding ?? 24;
      const vp = page.viewportSize()!;
      const x = Math.max(0, box.x - p);
      const y = Math.max(0, box.y - p);
      await page.screenshot({
        path: file,
        clip: { x, y, width: Math.min(vp.width - x, box.width + p * 2), height: Math.min(vp.height - y, box.height + p * 2) },
      });
      return;
    }
  }
  void locator;
  await page.screenshot({ path: file });
}

export async function runFlow(flow: Flow, config: CaptureConfig, opts: { video?: boolean } = {}): Promise<string> {
  const outDir = ensureDir(path.join(OUT_DIR, flow.name));
  for (const f of fs.readdirSync(outDir)) if (/^step-\d+\.png$|^raw\.webm$|^steps\.json$/.test(f)) fs.unlinkSync(path.join(outDir, f));
  const withVideo = opts.video !== false && !flow.noVideo;
  const videoTmp = withVideo ? ensureDir(path.join(RAW_DIR, "video-tmp", `${flow.name}-${Date.now()}`)) : undefined;

  const useAuth = flow.auth === "session" ? "main" : flow.auth === "reader-session" ? "reader" : false;
  const session = await openSession(config, { useAuth, videoDir: videoTmp });
  const ctx: FlowContext = {
    page: session.page,
    context: session.context,
    config,
    vars: {},
    recordCreated: (kind, name, url) => recordCreated(flow.name, kind, name, maskText(url, config)),
  };
  const t0 = session.startedAt;
  const now = () => Date.now() - t0;
  const records: StepRecord[] = [];
  let status: "ok" | "failed" = "ok";
  let failure: string | undefined;
  let shotNo = 0;

  try {
    const start = flow.start ? await resolveValue(flow.start, ctx) : undefined;
    if (flow.auth !== "none") await ensureSession(ctx.page, config, start);
    else if (start) await ctx.page.goto(start, { waitUntil: "domcontentloaded" });
    if (flow.blur?.length) await blurSelectors(ctx.page, flow.blur);
    await enableCursor(ctx.page);

    for (const [i, step] of flow.steps.entries()) {
      const page = ctx.page;
      const record: StepRecord = {
        index: i + 1,
        id: step.id,
        caption: step.caption,
        action: step.action,
        target: describeTarget(step.target),
        label: step.label,
        banner: step.banner?.text,
        note: step.note,
        tStart: now(),
        tEnd: 0,
        waits: [],
        url: "",
      };
      if (step.when && !(await step.when(ctx))) {
        record.skipped = true;
        record.tEnd = now();
        records.push(record);
        continue;
      }
      await dismissAnnouncements(page);
      const locator = step.target ? resolveTarget(page, step.target) : null;
      if (locator) await locator.waitFor({ state: "visible" });
      if (locator && step.noMask) await locator.evaluate((el) => el.setAttribute("data-capture-no-mask", ""));
      if (locator && step.maskAs) {
        const real = step.maskAs === "account" ? config.accountName : config.username;
        const display = step.maskAs === "account" ? LIVE.accountName : LIVE.demoUsername;
        await locator.evaluate((el, a) => (window as any).__captureMask?.markInput(el, a.real, a.display), { real, display });
      }
      const value = await resolveValue(step.value, ctx);
      if (!step.secret && value && step.action !== "goto") record.value = maskText(value, config);

      const shotWhen = step.shotWhen ?? (["type", "fill", "upload"].includes(step.action) ? "after" : "before");
      const takeShot = async () => {
        if (step.shot === false) return;
        await dismissAnnouncements(page); // popup có thể hiện trong lúc chờ (holdMs)
        shotNo += 1;
        const file = path.join(outDir, `step-${pad(shotNo)}.png`);
        await hideCursor(page);
        const bounds = step.clip && step.clip !== "viewport" && "rect" in step.clip ? step.clip.rect : undefined;
        if (locator && !step.noAnnotate) await annotate(page, locator, flow.badges ? shotNo : null, step.label, bounds);
        if (step.banner) await banner(page, step.banner.text, { ...step.banner, bounds });
        await page.waitForTimeout(150);
        await assertNoLeaks(page, session.needles, `bước ${i + 1} (${step.caption})`);
        await screenshot(page, file, step, locator);
        // Giữ chú thích trên video một lúc (dài hơn nếu có holdMs)
        await page.waitForTimeout(step.holdMs ?? 700);
        await clearAnnotations(page);
        await showCursor(page);
        record.screenshot = path.basename(file);
      };

      if (shotWhen === "before") await takeShot();

      switch (step.action) {
        case "goto":
          await page.goto(value, { waitUntil: "domcontentloaded" });
          await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);
          break;
        case "click":
          if (!locator) throw new Error(`Bước ${i + 1}: thiếu target`);
          if (step.sameTab) await locator.evaluate((el) => el.closest("a")?.removeAttribute("target"));
          await humanClick(page, locator);
          break;
        case "hover":
          if (!locator) throw new Error(`Bước ${i + 1}: thiếu target`);
          await moveTo(page, locator);
          break;
        case "type":
          if (!locator) throw new Error(`Bước ${i + 1}: thiếu target`);
          await humanType(page, locator, value, step.secret ? 40 : 70);
          break;
        case "fill":
          if (!locator) throw new Error(`Bước ${i + 1}: thiếu target`);
          await humanClick(page, locator);
          await locator.fill(value);
          break;
        case "press":
          await page.keyboard.press(value);
          break;
        case "upload": {
          if (!locator) throw new Error(`Bước ${i + 1}: thiếu target (nút mở hộp thoại chọn file)`);
          const files = (step.files ?? []).map((f) => path.join(SAMPLES_DIR, f));
          const chooser = page.waitForEvent("filechooser", { timeout: 15_000 });
          await humanClick(page, locator);
          await (await chooser).setFiles(files);
          record.note = [record.note, "Hộp thoại chọn file của hệ điều hành không hiện trong headless — tài liệu ghi bước 'chọn file từ máy'."]
            .filter(Boolean)
            .join(" ");
          break;
        }
        case "waitFor":
        case "hold":
          if (step.banner && shotWhen !== "before") await banner(page, step.banner.text, step.banner);
          if (step.holdMs) await page.waitForTimeout(step.holdMs);
          await clearAnnotations(page);
          break;
        case "shot":
          break;
        case "custom":
          if (step.run) await step.run(ctx);
          break;
      }

      if (step.waitAfter) {
        const w = step.waitAfter;
        const ws = now();
        const timeout = w.timeoutMs ?? 120_000;
        if (w.visible) await resolveTarget(page, w.visible).waitFor({ state: "visible", timeout });
        if (w.hidden) await resolveTarget(page, w.hidden).waitFor({ state: "hidden", timeout });
        if (w.url) await page.waitForURL(w.url, { timeout });
        if (w.until) {
          const deadline = Date.now() + timeout;
          while (!(await w.until(ctx))) {
            if (Date.now() > deadline) throw new Error(`Hết thời gian chờ: ${w.label}`);
            await page.waitForTimeout(2000);
          }
        }
        record.waits.push({ label: w.label, tStart: ws, tEnd: now() });
      }
      if (shotWhen === "after") await takeShot();
      record.url = maskText(page.url(), config);
      record.tEnd = now();
      records.push(record);
    }
  } catch (error) {
    status = "failed";
    failure = maskText(String((error as Error).message || error), config).slice(0, 500);
    // Ảnh chẩn đoán (đã qua bộ che) để sửa flow nhanh
    await ctx.page.screenshot({ path: path.join(ensureDir(path.join(RAW_DIR, "failed")), `${flow.name}-fail.png`) }).catch(() => undefined);
  }

  const meta = {
    flow: flow.name,
    title: flow.title,
    description: flow.description,
    status,
    failure,
    capturedAt: new Date().toISOString(),
    environment: "POC — hiển thị như LIVE (account name opba-ai) nhờ capture/lib/env-mask.ts",
    browser: `chromium (playwright) ${session.browser.version()}`,
    viewport: config.viewport,
    uiVersionNote: "Amazon Quick không hiển thị số phiên bản; dùng ngày chụp làm mốc phiên bản giao diện.",
    video: withVideo ? "raw.webm" : null,
    steps: records,
  };

  const finalVideo = withVideo
    ? status === "ok"
      ? path.join(outDir, "raw.webm")
      : path.join(ensureDir(path.join(RAW_DIR, "failed")), `${flow.name}-${Date.now()}.webm`)
    : undefined;
  await closeSession(session, finalVideo).catch(() => null);
  if (videoTmp) fs.rmSync(videoTmp, { recursive: true, force: true });
  fs.writeFileSync(path.join(outDir, "steps.json"), JSON.stringify(meta, null, 2));
  if (status === "failed") throw new Error(`Flow "${flow.name}" dừng: ${failure}`);
  return outDir;
}
