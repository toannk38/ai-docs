/**
 * 11.1 / 11.2 — ảnh màn hình MFA. Dùng link /sn/account/<account>/start của POC (thư mục Identity Center còn bật MFA):
 * nhập username + mật khẩu tới màn hình MFA rồi DỪNG, không gửi mã.
 */
import type { Flow } from "../lib/flow";
import { identityCenterSteps } from "./_login-steps";

const flow: Flow = {
  name: "q11-1-mfa-screen",
  title: "Màn hình xác thực MFA",
  auth: "none",
  start: (ctx) => ctx.config.appUrl,
  steps: identityCenterSteps({ mfa: "screenshot-only" }),
};

export default flow;
