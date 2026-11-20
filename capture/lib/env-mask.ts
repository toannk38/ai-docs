/**
 * Che/thay thông tin môi trường POC trên mọi ảnh và video.
 *
 * Tài liệu viết cho LIVE (account name `opba-ai`), nhưng tài khoản test chạy trên POC
 * (account name `nab-quick-poc`). Mọi chuỗi POC, URL portal POC, username test, AWS account ID
 * phải được thay bằng giá trị LIVE/minh hoạ trước khi chụp hoặc trong khi quay.
 */
import fs from "node:fs";
import path from "node:path";
import type { BrowserContext, Page } from "playwright";
import { LIVE, type CaptureConfig } from "./config";

export interface MaskRule {
  find: string;
  replace: string;
  regex?: boolean;
  flags?: string;
}

export interface Needle {
  label: string;
  value: string;
  /** Nếu có: so khớp bằng regex (không phân biệt hoa thường) thay vì chuỗi con. */
  regex?: string;
}

/** Regex khớp username theo ranh giới từ: che "toannk2," "toannk2@…" nhưng không che "toannk2_reader". */
export function usernamePattern(username: string): string {
  return `(?<![\\w.-])${escapeRe(username)}(?![\\w-])`;
}

/** Chuỗi POC cố định — luôn bị cấm trong html_docs/ và trên ảnh/video. */
export const POC_ACCOUNT_NAME = "nab-quick-poc";

function hostOf(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildMaskRules(config: Pick<CaptureConfig, "accountName" | "startUrl" | "appUrl" | "username">): {
  rules: MaskRule[];
  sensitive: { real: string; display: string }[];
  needles: Needle[];
} {
  const rules: MaskRule[] = [];
  const needles: Needle[] = [];
  const sensitive: { real: string; display: string }[] = [];

  // URL đầy đủ trước, rồi host, rồi chuỗi ngắn (thứ tự quan trọng).
  if (config.appUrl) rules.push({ find: config.appUrl.replace(/\/+$/, ""), replace: LIVE.quickDirectUrl });
  if (config.startUrl) rules.push({ find: config.startUrl.replace(/\/+$/, ""), replace: LIVE.portalUrl });
  const portalHost = hostOf(config.startUrl);
  if (portalHost && portalHost !== LIVE.portalHost) {
    rules.push({ find: portalHost, replace: LIVE.portalHost });
    needles.push({ label: "host portal POC", value: portalHost });
    const sub = portalHost.split(".")[0];
    if (sub && sub.length >= 4 && sub !== "nab-opba-ai") {
      rules.push({ find: `\\b${escapeRe(sub)}\\b`, regex: true, replace: "nab-opba-ai" });
    }
  }
  // ssoins-<16 hex> của POC (dualstack portal) -> instance LIVE
  rules.push({ find: "ssoins-(?!7223f5880341d54d)[0-9a-f]{16}", regex: true, replace: "ssoins-7223f5880341d54d" });

  for (const account of new Set([config.accountName, POC_ACCOUNT_NAME])) {
    if (!account) continue;
    rules.push({ find: account, replace: LIVE.accountName });
    sensitive.push({ real: account, display: LIVE.accountName });
    needles.push({ label: `account name POC (${account === POC_ACCOUNT_NAME ? POC_ACCOUNT_NAME : "QUICK_ACCOUNT_NAME"})`, value: account });
  }

  if (config.username) {
    rules.push({ find: usernamePattern(config.username), regex: true, flags: "gi", replace: LIVE.demoUsername });
    sensitive.push({ real: config.username, display: LIVE.demoUsername });
    needles.push({ label: "username tài khoản test", value: config.username, regex: usernamePattern(config.username) });
    const local = config.username.includes("@") ? config.username.split("@")[0] : "";
    if (local.length >= 4) {
      rules.push({ find: `\\b${escapeRe(local)}\\b`, regex: true, replace: LIVE.demoUsername });
      needles.push({ label: "phần trước @ của username test", value: local });
    }
  }

  // Identity Center directory ID (d-xxxxxxxxxx) và Identity Store / instance ARN
  rules.push({ find: "\\bd-[0-9a-f]{10}\\b", regex: true, flags: "g", replace: "d-xxxxxxxxxx" });
  rules.push({ find: "\\bssoins-[0-9a-f]{16}\\b(?=[^.])", regex: true, flags: "g", replace: "ssoins-xxxxxxxxxxxxxxxx" });

  // AWS account ID 12 chữ số (dạng liền hoặc 1234-5678-9012)
  rules.push({ find: "\\b\\d{4}-\\d{4}-\\d{4}\\b", regex: true, flags: "g", replace: "••••-••••-••••" });
  rules.push({ find: "(?<![\\d.,])\\d{12}(?![\\d.,])", regex: true, flags: "g", replace: "••••••••••••" });

  // Họ tên đầy đủ dài hơn tên ở header bị che hai lần ("Nhân viên Demo" + "Demo") -> gộp lại.
  // Chạy sau luật bổ sung (installEnvMask đặt luật bổ sung trước luật gốc).
  rules.push({ find: "Nhân viên Demo(?:\\s+Demo\\b)+", regex: true, flags: "g", replace: "Nhân viên Demo" });

  return { rules, sensitive, needles };
}

const MASK_SCRIPT = fs.readFileSync(path.join(__dirname, "browser", "mask.js"), "utf8");

/**
 * Luật che bổ sung phát hiện lúc chạy (vd tên hiển thị của tài khoản test).
 * Lưu ở capture/raw/mask-extra.json — thư mục raw/ bị .gitignore, không commit.
 */
const EXTRA_FILE = path.join(__dirname, "..", "raw", "mask-extra.json");

export function loadExtraMasks(): MaskRule[] {
  try {
    return JSON.parse(fs.readFileSync(EXTRA_FILE, "utf8")) as MaskRule[];
  } catch {
    return [];
  }
}

export function addExtraMask(find: string, replace: string): void {
  const extra = loadExtraMasks();
  if (extra.some((rule) => rule.find === find)) return;
  extra.push({ find, replace });
  fs.mkdirSync(path.dirname(EXTRA_FILE), { recursive: true });
  fs.writeFileSync(EXTRA_FILE, JSON.stringify(extra, null, 2));
}

/** Đẩy luật che mới vào mọi frame của trang đang mở. */
export async function pushRulesToPage(page: Page, extra: MaskRule[]): Promise<void> {
  for (const frame of page.frames()) {
    await frame.evaluate((r) => (window as any).__captureMask?.addRules(r), extra).catch(() => undefined);
  }
}

/** Gắn bộ che vào context: chạy ở mọi trang/frame, trước mọi script của trang. */
export async function installEnvMask(context: BrowserContext, config: CaptureConfig): Promise<Needle[]> {
  const { rules: baseRules, sensitive, needles: baseNeedles } = buildMaskRules(config);
  const extra = loadExtraMasks();
  const rules = [...extra, ...baseRules];
  const needles = [
    ...baseNeedles,
    ...extra.map((r) => ({ label: "luật che bổ sung (tên hiển thị…)", value: r.find, regex: r.regex ? r.find : undefined })),
  ];
  const prefix = `window.__CAPTURE_MASK__ = ${JSON.stringify({ rules, sensitive })};\n`;
  await context.addInitScript({ content: prefix + MASK_SCRIPT });
  return needles;
}

/** Đánh dấu ô sắp nhập chuỗi nhạy cảm để video chỉ hiện giá trị LIVE/minh hoạ khi đang gõ. */
export async function markSensitiveInput(page: Page, selector: string, real: string, display: string): Promise<void> {
  await page.locator(selector).first().evaluate(
    (el, args) => (window as any).__captureMask?.markInput(el, args.real, args.display),
    { real, display },
  );
}

export class LeakError extends Error {}

/** Kiểm tra mọi frame còn hiển thị chuỗi nhạy cảm không. Ném LeakError nếu có. */
export async function assertNoLeaks(page: Page, needles: Needle[], where: string): Promise<void> {
  const leaks = new Set<string>();
  for (const frame of page.frames()) {
    try {
      const found: string[] = await frame.evaluate(
        (n) => ((window as any).__captureMask ? (window as any).__captureMask.findLeaks(n) : ["bộ che chưa chạy trong frame"]),
        needles,
      );
      found.forEach((item) => leaks.add(item));
    } catch {
      // frame đã đóng/điều hướng — bỏ qua
    }
  }
  // URL của trang không hiện trên ảnh headless, nhưng không được lọt vào steps.json — xử lý ở runner.
  if (leaks.size) {
    throw new LeakError(`Phát hiện thông tin POC/nhạy cảm còn hiển thị tại ${where}: ${[...leaks].join(", ")}. Dừng chụp.`);
  }
}

/** Làm mờ vùng (avatar, tên người dùng…) mà bộ thay chữ không xử lý được (vd ảnh, canvas). */
export async function blurSelectors(page: Page, selectors: string[]): Promise<void> {
  if (!selectors.length) return;
  await page.addStyleTag({
    content: selectors.map((s) => `${s}{filter:blur(8px)!important}`).join("\n"),
  });
}

/** Che chuỗi trong văn bản ghi log/steps.json (URL trang, thông báo lỗi). */
export function maskText(value: string, config: CaptureConfig): string {
  const rules = [...loadExtraMasks(), ...buildMaskRules(config).rules];
  return rules.reduce((out, rule) => {
    const re = new RegExp(rule.regex ? rule.find : escapeRe(rule.find), rule.flags || "gi");
    return out.replace(re, rule.replace);
  }, value);
}
