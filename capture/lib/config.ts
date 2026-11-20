/**
 * Đọc cấu hình từ .env (qua dotenv). Không bao giờ in giá trị bí mật ra log.
 */
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

export const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
export const CAPTURE_DIR = path.join(PROJECT_ROOT, "capture");
export const OUT_DIR = path.join(CAPTURE_DIR, "out");
export const RAW_DIR = path.join(CAPTURE_DIR, "raw");
export const SAMPLES_DIR = path.join(CAPTURE_DIR, "samples");
export const AUTH_FILE = path.join(PROJECT_ROOT, "auth.json");
/** Phiên của user nhận chia sẻ (toannk2_reader) — để chụp "người nhận thấy gì". */
export const READER_AUTH_FILE = path.join(PROJECT_ROOT, "auth-reader.json");

dotenv.config({ path: path.join(PROJECT_ROOT, ".env"), quiet: true } as dotenv.DotenvConfigOptions);

/** Môi trường LIVE — giá trị dùng trong tài liệu phát hành. */
export const LIVE = {
  accountName: "opba-ai",
  portalUrl: "https://nab-opba-ai.awsapps.com/start",
  portalHost: "nab-opba-ai.awsapps.com",
  portalDualstackUrl: "https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws",
  quickDirectUrl: "https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start",
  /** Tên đăng nhập minh hoạ hiển thị thay cho username thật của tài khoản test. */
  demoUsername: "nhanvien.demo",
};

export type LoginMethod = "portal" | "direct";

export interface CaptureConfig {
  startUrl: string;
  appUrl: string;
  accountName: string;
  loginMethod: LoginMethod;
  region: string;
  username: string;
  password: string;
  totpSecret: string;
  /** totp: script tự sinh mã từ QUICK_TOTP_SECRET; prompt: người dùng tự nhập mã từ app Authenticator. */
  mfaMode: "totp" | "prompt";
  /** User nhận chia sẻ (QUICK_READER_USERNAME / QUICK_READER_PASSWORD; không MFA). Rỗng nếu chưa cấu hình. */
  readerUsername: string;
  readerPassword: string;
  headless: boolean;
  slowMo: number;
  viewport: { width: number; height: number };
}

export class ConfigError extends Error {}

/** Chế độ MFA: --mfa=prompt|totp trên dòng lệnh > QUICK_MFA_MODE > (có QUICK_TOTP_SECRET ? totp : prompt). */
function mfaModeFrom(env: NodeJS.ProcessEnv): "totp" | "prompt" {
  const arg = process.argv.find((a) => a.startsWith("--mfa="))?.slice(6);
  const value = (arg || env.QUICK_MFA_MODE || (env.QUICK_TOTP_SECRET ? "totp" : "prompt")).trim().toLowerCase();
  return value === "prompt" ? "prompt" : "totp";
}

function bool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === "") return fallback;
  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
}

function int(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * @param needCredentials false khi chỉ cần URL (vd khảo sát trang đăng nhập, không đăng nhập).
 * @param as "reader": bắt buộc thông tin đăng nhập của user nhận chia sẻ.
 */
export function loadConfig(needCredentials = true, as: "main" | "reader" = "main"): CaptureConfig {
  const env = process.env;
  const required = ["QUICK_START_URL", "QUICK_APP_URL", "QUICK_ACCOUNT_NAME", "AWS_REGION"];
  if (needCredentials) required.push("QUICK_USERNAME", "QUICK_PASSWORD");
  if (needCredentials && mfaModeFrom(env) === "totp") required.push("QUICK_TOTP_SECRET");
  if (as === "reader") required.push("QUICK_READER_USERNAME", "QUICK_READER_PASSWORD");
  const missing = required.filter((key) => !env[key]?.trim());
  if (missing.length) {
    throw new ConfigError(
      `Thiếu biến môi trường trong .env: ${missing.join(", ")}. Xem .env.example (chỉ in tên biến, không in giá trị).`,
    );
  }
  const method = (env.QUICK_LOGIN_METHOD || "portal").trim().toLowerCase();
  if (method !== "portal" && method !== "direct") {
    throw new ConfigError(`QUICK_LOGIN_METHOD phải là "portal" hoặc "direct" (đang là giá trị khác).`);
  }
  const accountName = env.QUICK_ACCOUNT_NAME!.trim();
  if (accountName === LIVE.accountName) {
    throw new ConfigError("QUICK_ACCOUNT_NAME đang trỏ vào LIVE (opba-ai). Script chỉ được chạy trên POC.");
  }
  return {
    startUrl: env.QUICK_START_URL!.trim(),
    appUrl: env.QUICK_APP_URL!.trim(),
    accountName,
    loginMethod: method,
    region: env.AWS_REGION!.trim(),
    username: (env.QUICK_USERNAME || "").trim(),
    password: env.QUICK_PASSWORD || "",
    totpSecret: (env.QUICK_TOTP_SECRET || "").replace(/\s+/g, ""),
    mfaMode: mfaModeFrom(env),
    readerUsername: (env.QUICK_READER_USERNAME || "").trim(),
    readerPassword: env.QUICK_READER_PASSWORD || "",
    headless: bool(env.HEADLESS, true),
    slowMo: int(env.SLOW_MO, 150),
    viewport: { width: int(env.VIEWPORT_WIDTH, 1920), height: int(env.VIEWPORT_HEIGHT, 1080) },
  };
}

export function ensureDir(dir: string): string {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
