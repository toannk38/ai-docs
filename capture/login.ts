/**
 * Đăng nhập Amazon Quick (POC) bằng thông tin trong .env + TOTP, lưu phiên vào auth.json.
 *   npx tsx capture/login.ts            # theo QUICK_LOGIN_METHOD
 *   npx tsx capture/login.ts direct     # ép cách đăng nhập
 *   npx tsx capture/login.ts direct --entry=generic --as=reader   # user nhận chia sẻ -> auth-reader.json
 * Lỗi đăng nhập/phiên -> dừng với thông báo rõ ràng (exit code 2). Không in thông tin bí mật.
 */
import { AUTH_FILE, READER_AUTH_FILE, loadConfig, type LoginMethod } from "./lib/config";
import { openSession, closeSession } from "./lib/browser";
import { login, LoginError, debugShot, observations, mfaDiag } from "./lib/auth";
import { assertNoLeaks, maskText } from "./lib/env-mask";

async function main() {
  const asReader = process.argv.includes("--as=reader");
  // Bộ che dùng cấu hình chính (che username test chính); đăng nhập dùng thông tin của user được chọn.
  const config = loadConfig(!asReader, asReader ? "reader" : "main");
  const forced = process.argv[2] as LoginMethod | undefined;
  if (forced === "portal" || forced === "direct") config.loginMethod = forced;
  const loginConfig = asReader ? { ...config, username: config.readerUsername, password: config.readerPassword } : config;
  const authFile = asReader ? READER_AUTH_FILE : AUTH_FILE;
  const session = await openSession(config);
  try {
    const page = await login(session.context, session.page, loginConfig);
    await page.waitForTimeout(3000);
    await assertNoLeaks(page, session.needles, "trang chủ Quick sau đăng nhập").catch(async (error) => {
      await debugShot(page, "leak-home");
      console.warn(`CẢNH BÁO: ${error.message}`);
    });
    await session.context.storageState({ path: authFile });
    console.log(`OK: đăng nhập (${config.loginMethod}${asReader ? ", reader" : ""}) thành công, đã lưu phiên vào ${asReader ? "auth-reader.json" : "auth.json"}.`);
    console.log(`Trang hiện tại: ${maskText(page.url(), config)}`);
    for (const note of observations) console.log(`Quan sát: ${note}`);
    console.log(mfaDiag.length ? "Chẩn đoán MFA:\n  " + mfaDiag.join("\n  ") : "Không bị hỏi MFA trong lần đăng nhập này.");
  } finally {
    await closeSession(session);
  }
}

main().catch((error) => {
  const message = String(error?.message || error);
  console.error(error instanceof LoginError ? `LỖI ĐĂNG NHẬP: ${message}` : `LỖI: ${message}`);
  if (mfaDiag.length) console.error("Chẩn đoán MFA:\n  " + mfaDiag.join("\n  "));
  process.exit(2);
});
