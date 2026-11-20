/**
 * Đăng nhập Amazon Quick qua IAM Identity Center (username + mật khẩu + MFA TOTP).
 * Hai cách: "portal" (AWS access portal -> Applications -> Amazon Quick) và "direct" (link Quick).
 *
 * Nguyên tắc an toàn:
 *  - Không bao giờ in username/mật khẩu/mã TOTP.
 *  - Mỗi màn hình chỉ thao tác MỘT lần; gặp lỗi hoặc màn hình lạ -> dừng, không thử lại
 *    (tránh khoá tài khoản test).
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { authenticator } from "otplib";
import type { BrowserContext, Page } from "playwright";
import { LIVE, RAW_DIR, ensureDir, type CaptureConfig } from "./config";
import { addExtraMask, maskText, pushRulesToPage } from "./env-mask";

/**
 * Lấy tên hiển thị của tài khoản test ở header portal và thêm vào luật che bổ sung
 * (capture/raw/mask-extra.json, bị .gitignore). Không in ra log.
 */
export async function captureDisplayName(page: Page): Promise<void> {
  const button = page.locator("header [aria-haspopup], header button").filter({ hasText: /\S/ }).last();
  const text = (await button.innerText().catch(() => "")).trim();
  // Bỏ qua chữ đã qua bộ che (tránh tạo luật tự tham chiếu "Nhân viên Demo" -> "Nhân viên Demo")
  if (text && text.length >= 3 && text.length <= 60 && !/help|settings|account|nhân viên demo|\bdemo\b/i.test(text)) {
    addExtraMask(text, "Nhân viên Demo");
    await pushRulesToPage(page, [{ find: text, replace: "Nhân viên Demo" }]);
  }
}

export class LoginError extends Error {}

/** Quan sát trong lúc đăng nhập (đưa vào gap report). */
export const observations = new Set<string>();
export class SessionExpiredError extends Error {}

export const QUICK_HOST_RE = /(^|\.)quicksight\.aws\.amazon\.com$|(^|\.)quick\.aws\.amazon\.com$|(^|\.)quick\.aws$/;
const SIGNIN_HOST_RE = /signin\.aws$|signin\.aws\.amazon\.com$|awsapps\.com$|\.app\.aws$/;

export type LoginState =
  | "quick-account-name"
  | "idc-username"
  | "idc-password"
  | "idc-mfa"
  | "idc-mfa-register"
  | "portal"
  | "quick-app"
  | "error"
  | "unknown";

function host(page: Page): string {
  try {
    return new URL(page.url()).host;
  } catch {
    return "";
  }
}

async function visible(page: Page, selector: string): Promise<boolean> {
  return page.locator(selector).first().isVisible().catch(() => false);
}

export async function detectState(page: Page): Promise<LoginState> {
  const h = host(page);
  const url = page.url();
  const bodyText = (await page.locator("body").innerText().catch(() => "")).slice(0, 4000);
  if (QUICK_HOST_RE.test(h)) {
    if (await visible(page, "#account-name-input")) return "quick-account-name";
    if (/\/sn\/auth\/signin/.test(url)) return "unknown";
    return "quick-app";
  }
  if (/awsapps\.com$|\.app\.aws$/.test(h) && /\/start/.test(url) && !/\/login/.test(url)) {
    if (/Applications|AWS access portal/i.test(bodyText)) return "portal";
  }
  if (SIGNIN_HOST_RE.test(h)) {
    if (/register (an )?mfa|register device|đăng ký thiết bị/i.test(bodyText)) return "idc-mfa-register";
    if (await visible(page, "input[type=password]")) return "idc-password";
    if (/mfa|authenticator|verification code|one-time|mã xác thực/i.test(bodyText) && (await visible(page, "input:not([type=hidden])")))
      return "idc-mfa";
    if (/username/i.test(bodyText) && (await visible(page, "input[type=text], input:not([type])"))) return "idc-username";
    const alert = await page.locator("[role=alert], [data-testid*=error], .awsui-alert").first().innerText().catch(() => "");
    if (alert.trim()) return "error";
  }
  return "unknown";
}

async function readError(page: Page, config: CaptureConfig): Promise<string> {
  const texts = await page
    .locator("[role=alert], [data-testid*=error], [class*=error], [class*=Error]")
    .allInnerTexts()
    .catch(() => [] as string[]);
  return maskText(texts.map((t) => t.trim()).filter(Boolean).join(" | ").slice(0, 300), config);
}

/** Ảnh chụp chẩn đoán (đã qua bộ che) khi gặp lỗi — lưu trong capture/raw/ (bị .gitignore). */
export async function debugShot(page: Page, name: string): Promise<string> {
  const dir = ensureDir(path.join(RAW_DIR, "debug"));
  const file = path.join(dir, `${Date.now()}-${name}.png`);
  await page.screenshot({ path: file }).catch(() => undefined);
  return file;
}

/** Mã TOTP mới; nếu cửa sổ hiện tại sắp hết (< 6 giây) thì chờ sang cửa sổ kế tiếp. */
let lastTotpCounter = -10;

/**
 * Mã TOTP mới. Chờ nếu cửa sổ hiện tại sắp hết (< 6 giây) và luôn cách mã dùng lần trước
 * ít nhất 2 chu kỳ 30 giây (Identity Center từ chối mã dùng lại/mã liền kề).
 */
export async function freshTotp(config: CaptureConfig, page: Page, _lastUsed?: string): Promise<string> {
  if (!config.totpSecret) throw new LoginError("Thiếu QUICK_TOTP_SECRET.");
  authenticator.options = { step: 30, digits: 6 };
  const counter = () => Math.floor(Date.now() / 30_000);
  while (counter() < lastTotpCounter + 2 || authenticator.timeRemaining() < 6) {
    await page.waitForTimeout(1000);
  }
  lastTotpCounter = counter();
  return authenticator.generate(config.totpSecret);
}

export const MFA_CODE_FILE = path.join(RAW_DIR, "mfa.code");

/** Nhật ký chẩn đoán bước MFA (không chứa mã/mật khẩu). */
export const mfaDiag: string[] = [];

/**
 * Hỏi mã MFA người dùng tự nhập (chế độ prompt):
 *  - chạy trong terminal tương tác -> hỏi trực tiếp;
 *  - không có terminal -> chờ file capture/raw/mfa.code (tối đa 3 phút), đọc xong xoá ngay.
 */
export async function promptMfaCode(page: Page): Promise<string> {
  ensureDir(RAW_DIR);
  fs.rmSync(MFA_CODE_FILE, { force: true });
  if (process.stdin.isTTY) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const code = await new Promise<string>((resolve) => rl.question("Nhập mã MFA 6 số từ ứng dụng Authenticator: ", resolve));
    rl.close();
    return code.trim();
  }
  console.log(
    `ĐANG CHỜ MÃ MFA (3 phút): ghi mã 6 số vào ${path.relative(process.cwd(), MFA_CODE_FILE)}, vd: echo 123456 > capture/raw/mfa.code`,
  );
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    if (fs.existsSync(MFA_CODE_FILE)) {
      const code = fs.readFileSync(MFA_CODE_FILE, "utf8").trim();
      fs.rmSync(MFA_CODE_FILE, { force: true });
      if (code) return code;
    }
    await page.waitForTimeout(500);
  }
  throw new LoginError("Hết 3 phút chờ mã MFA — dừng.");
}

/** Lấy mã MFA theo chế độ cấu hình (totp tự sinh, hoặc prompt do người dùng nhập). */
export async function getMfaCode(config: CaptureConfig, page: Page): Promise<string> {
  const code = config.mfaMode === "prompt" ? await promptMfaCode(page) : await freshTotp(config, page);
  if (!/^\d{6}$/.test(code)) throw new LoginError("Mã MFA phải gồm đúng 6 chữ số — dừng, không gửi.");
  return code;
}

async function waitForChange(page: Page, from: LoginState, timeoutMs = 45_000): Promise<LoginState> {
  const deadline = Date.now() + timeoutMs;
  let state = from;
  while (Date.now() < deadline) {
    await page.waitForTimeout(800);
    state = await detectState(page);
    if (state !== from) return state;
  }
  return state;
}

export interface LoginHooks {
  /** Gọi trước mỗi thao tác — flow quay video dùng để chụp ảnh/khoanh phần tử. */
  beforeAction?: (state: LoginState, page: Page) => Promise<void>;
}

/**
 * Đăng nhập tới khi vào được giao diện Quick. Trả về page đang ở Quick (có thể là tab mới khi đi qua portal).
 */
export async function login(context: BrowserContext, page: Page, config: CaptureConfig, hooks: LoginHooks = {}): Promise<Page> {
  // --entry=generic: trang đăng nhập Quick chung -> nhập account name (trên POC đi tới directory của portal,
  // khác directory của link /sn/account/<account>/start).
  const generic = process.argv.includes("--entry=generic");
  const entry = generic ? "https://quicksight.aws.amazon.com/" : config.loginMethod === "portal" ? config.startUrl : config.appUrl;
  await page.goto(entry, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => undefined);

  const done = new Set<LoginState>();
  let reauthed = false;
  let lastTotp: string | undefined;
  let current = page;
  for (let guard = 0; guard < 12; guard += 1) {
    const state = await detectState(current);
    if (state === "quick-app") {
      await current.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);
      return current;
    }
    if (state === "error") {
      await debugShot(current, "login-error");
      throw new LoginError(`Đăng nhập lỗi: ${await readError(current, config)}`);
    }
    if (state === "idc-mfa-register") {
      await debugShot(current, "mfa-register");
      throw new LoginError("Identity Center yêu cầu ĐĂNG KÝ thiết bị MFA — tài khoản test chưa đăng ký TOTP. Dừng.");
    }
    if (state === "unknown") {
      // Trang có thể còn đang tải/chuyển hướng
      const next = await waitForChange(current, "unknown", 45_000);
      if (next === "unknown") {
        const shot = await debugShot(current, "unknown-state");
        throw new LoginError(
          `Không nhận diện được màn hình đăng nhập (URL: ${maskText(current.url(), config)}). Ảnh chẩn đoán: ${path.relative(process.cwd(), shot)}`,
        );
      }
      continue;
    }
    if (state === "idc-password" && done.has("idc-mfa")) {
      await debugShot(current, "password-after-mfa");
      throw new LoginError(
        `Sau khi gửi MFA, hệ thống quay về bước mật khẩu (Identity Center làm vậy khi mật khẩu/MFA sai). Dừng, KHÔNG nhập lại. ${await readError(current, config)}`,
      );
    }
    if (done.has(state) && state !== "idc-mfa") {
      await debugShot(current, `repeat-${state}`);
      throw new LoginError(`Màn hình "${state}" xuất hiện lại sau khi đã nhập — có thể sai thông tin. Dừng để tránh khoá tài khoản. ${await readError(current, config)}`);
    }
    if (state === "idc-mfa" && done.has("idc-mfa")) {
      await debugShot(current, "mfa-repeat");
      throw new LoginError(`Mã MFA bị từ chối. ${await readError(current, config)}`);
    }
    await hooks.beforeAction?.(state, current);
    if (reauthed && state.startsWith("idc-")) observations.add(`Sau khi bấm ứng dụng trên portal, Quick yêu cầu lại màn hình ${state}.`);
    done.add(state);

    if (state === "quick-account-name") {
      await current.locator("#account-name-input").fill(config.accountName);
      await current.locator("#account-name-submit-button").click();
    } else if (state === "idc-username") {
      const input = current.getByLabel(/username/i).first();
      await input.fill(config.username);
      await current.getByRole("button", { name: /^next$/i }).first().click();
    } else if (state === "idc-password") {
      await current.locator("input[type=password]").first().fill(config.password);
      await current.getByRole("button", { name: /sign in|next|đăng nhập/i }).first().click();
    } else if (state === "idc-mfa") {
      const input = current
        .getByLabel(/mfa code|verification code|authenticator code|mã xác thực/i)
        .or(current.getByPlaceholder(/enter code/i))
        .first();
      if (!(await input.isVisible().catch(() => false))) {
        await debugShot(current, "mfa-input-not-found");
        throw new LoginError("Không xác định chắc chắn ô MFA code — dừng, không gửi mã.");
      }
      lastTotp = await getMfaCode(config, current);
      await input.click();
      await input.pressSequentially(lastTotp, { delay: 60 });
      const filled = await input.inputValue();
      if (filled !== lastTotp) {
        await debugShot(current, "mfa-fill-mismatch");
        throw new LoginError(`Ô MFA không nhận đúng mã (độ dài hiện tại ${filled.length}) — dừng, không gửi.`);
      }
      // Chẩn đoán: ghi request/response xác thực MFA (không ghi giá trị mã/mật khẩu).
      const code = lastTotp;
      const onRequest = (req: import("playwright").Request) => {
        if (req.method() !== "POST" || !/signin\.aws|awsapps\.com|\.app\.aws/.test(req.url())) return;
        const body = req.postData() || "";
        let keys = "";
        try {
          keys = Object.keys(JSON.parse(body)).join(",");
        } catch {
          keys = body.includes("=") ? body.split("&").map((kv) => kv.split("=")[0]).join(",") : `(${body.length} bytes)`;
        }
        mfaDiag.push(`REQ ${maskText(new URL(req.url()).pathname, config)} keys=[${keys}] containsCode=${body.includes(code)}`);
      };
      const onResponse = async (res: import("playwright").Response) => {
        const req = res.request();
        if (req.method() !== "POST" || !/signin\.aws|awsapps\.com|\.app\.aws/.test(res.url())) return;
        const text = await res.text().catch(() => "");
        const errs = Array.from(text.matchAll(/"(?:errorCode|error|code|status|type|message|reason)"\s*:\s*"([^"]{0,80})"/g)).map((m) => m[0]);
        mfaDiag.push(`RES ${res.status()} ${maskText(new URL(res.url()).pathname, config)} ${maskText(errs.join(" ").replaceAll(code, "<code>"), config).slice(0, 300)}`);
      };
      if (process.argv.includes("--mfa-dry-run")) {
        // Ghi cấu trúc form MFA (không ghi giá trị mã/mật khẩu)
        const form = await current.evaluate((c) => {
          const out: string[] = [];
          document.querySelectorAll("input, select, textarea, button, [role=radio], [role=tab], [role=combobox]").forEach((n) => {
            const e = n as HTMLInputElement;
            const r = e.getBoundingClientRect();
            const label = (e.id && document.querySelector(`label[for="${e.id}"]`)?.textContent) || e.getAttribute("aria-label") || "";
            const val = e.value === c ? "<code>" : e.type === "hidden" ? `(hidden ${String(e.value).length} ký tự)` : (e.value || "").slice(0, 40);
            out.push(
              `${e.tagName.toLowerCase()} type=${e.type || ""} name=${e.name || ""} id=${e.id || ""} label="${label.trim().slice(0, 50)}" ` +
                `visible=${r.width > 0 && r.height > 0} checked=${(e as HTMLInputElement).checked ?? ""} value=${val} ` +
                `autocomplete=${e.getAttribute("autocomplete") || ""} inputmode=${e.getAttribute("inputmode") || ""} maxlength=${e.getAttribute("maxlength") || ""} text="${(e.innerText || "").trim().slice(0, 40)}"`,
            );
          });
          return out;
        }, code);
        form.forEach((line) => mfaDiag.push(`FORM ${maskText(line, config)}`));
        // Chặn request xác thực: ghi cấu trúc body (mã thay bằng <code>) rồi huỷ — không có lần nhập sai nào
        await current.route(/\/api\/execute/, async (route) => {
          const body = route.request().postData() || "";
          let shape = body;
          try {
            shape = JSON.stringify(JSON.parse(body), (k, v) =>
              typeof v === "string" && /handle|requestid/i.test(k) ? `<${k}>` : v,
            );
          } catch {
            /* giữ nguyên */
          }
          const sentUser = (body.match(/"username"\s*:\s*"([^"]*)"/) || [])[1] ?? "";
          mfaDiag.push(
            `USERNAME trong request MFA: trùng username thật=${sentUser === config.username} | là chuỗi minh hoạ "${LIVE.demoUsername}"=${sentUser === LIVE.demoUsername}`,
          );
          mfaDiag.push(`BODY ${maskText(shape.replaceAll(code, "<code>"), config).replace(/"fingerPrint":"[^"]*"/, '"fingerPrint":"<…>"').slice(0, 600)}`);
          await route.abort();
        });
        await current.getByRole("button", { name: /^\s*sign in\s*$/i }).first().click();
        await current.waitForTimeout(2500);
        throw new LoginError("Chạy thử khô: đã ghi cấu trúc form MFA và chặn request, không gửi mã.");
      }
      current.on("request", onRequest);
      current.on("response", onResponse);
      mfaDiag.push(`totp: còn ${authenticator.timeRemaining()}s trong chu kỳ lúc gửi (mode=${config.mfaMode})`);
      await current.getByRole("button", { name: /^\s*sign in\s*$/i }).first().click();
      await current.waitForTimeout(4000);
      current.off("request", onRequest);
      current.off("response", onResponse);
    } else if (state === "portal") {
      current = await openQuickFromPortal(context, current, config);
      // Quick có thể yêu cầu xác thực lại trên trang Identity Center theo directory ID -> cho phép một lượt mới.
      if (!reauthed) {
        reauthed = true;
        done.clear();
        done.add("portal");
      }
      continue;
    }
    await waitForChange(current, state);
  }
  throw new LoginError("Quá số bước đăng nhập cho phép — dừng.");
}

/** Trên AWS access portal: tab Applications -> ô ứng dụng Amazon Quick. Trả về tab Quick. */
export async function openQuickFromPortal(context: BrowserContext, page: Page, config: CaptureConfig): Promise<Page> {
  const tab = page.getByRole("tab", { name: /applications/i }).first();
  if (await tab.isVisible().catch(() => false)) await tab.click();
  await page.waitForTimeout(1500);
  // Trên POC, ô ứng dụng mang tên account (bộ che hiển thị thành opba-ai) -> tìm theo tên đã che.
  const name = new RegExp(`^\\s*(${LIVE.accountName}|amazon quick|quicksight|quick suite)\\b`, "i");
  await captureDisplayName(page);
  const app = page.getByRole("link", { name }).or(page.getByText(name)).first();
  if (!(await app.isVisible().catch(() => false))) {
    await debugShot(page, "portal-no-quick-app");
    throw new LoginError("Không thấy ứng dụng Amazon Quick trong tab Applications của portal.");
  }
  const popup = context.waitForEvent("page", { timeout: 15_000 }).catch(() => null);
  await app.click();
  const newPage = await popup;
  const target = newPage ?? page;
  await target.waitForLoadState("domcontentloaded").catch(() => undefined);
  await target.waitForURL((url) => QUICK_HOST_RE.test(url.host), { timeout: 60_000 }).catch(async () => {
    await debugShot(target, "portal-to-quick");
    throw new LoginError(`Bấm ứng dụng Quick nhưng không vào được Quick (URL: ${maskText(target.url(), config)}).`);
  });
  return target;
}

/** Kiểm tra phiên đã lưu (auth.json) còn hiệu lực: mở Quick, nếu bị đẩy về trang đăng nhập -> lỗi. */
/**
 * Màn hình "Choose your account" (Quick ghi nhớ nhiều phiên): bấm phiên của account opba-ai
 * (tên đã qua bộ che). Trả về true nếu đã chọn và vào được Quick.
 */
export async function chooseQuickAccount(page: Page): Promise<boolean> {
  const heading = page.getByText(/choose your account/i).first();
  if (!(await heading.isVisible().catch(() => false))) return false;
  const entry = page.getByText(new RegExp(`^\\s*${LIVE.accountName}\\s*$`)).first();
  if (!(await entry.isVisible().catch(() => false))) return false;
  observations.add('Mở Quick khi đã có phiên: hiện màn hình "Choose your account" liệt kê các phiên đang đăng nhập; chọn dòng opba-ai.');
  await entry.click();
  await page.waitForURL((u) => QUICK_HOST_RE.test(u.host) && !/\/sn\/auth\//.test(u.pathname), { timeout: 60_000 }).catch(() => undefined);
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);
  await page.waitForTimeout(2000);
  return true;
}

export async function ensureSession(page: Page, config: CaptureConfig, url?: string): Promise<void> {
  const target = url ?? `https://${config.region}.quicksight.aws.amazon.com/sn/account/${config.accountName}/start/home`;
  await page.goto(target, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);
  await page.waitForTimeout(1500);
  let state = await detectState(page);
  if (state === "unknown" && (await chooseQuickAccount(page))) state = await detectState(page);
  if (state !== "quick-app") {
    throw new SessionExpiredError(
      `Phiên đăng nhập không còn hiệu lực (đang ở màn hình "${state}"). Chạy lại \`npm run login\` rồi chạy lại flow. Dừng, không chụp/quay tiếp.`,
    );
  }
}
