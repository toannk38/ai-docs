/**
 * Các bước đăng nhập Identity Center dùng chung cho các flow đăng nhập.
 * Mỗi thông tin chỉ nhập MỘT lần. Nếu sai, Identity Center quay về bước mật khẩu ->
 * bước chờ kế tiếp hết hạn -> flow dừng, không nhập lại (tránh khoá tài khoản test).
 */
import { getMfaCode } from "../lib/auth";
import type { FlowContext, Step } from "../lib/flow";

const usernameVisible = async (ctx: FlowContext) =>
  ctx.page.getByLabel(/^username$/i).first().isVisible().catch(() => false);

/** Vùng cắt quanh khung đăng nhập (trang căn giữa ở viewport 1920×1080). */
export const LOGIN_CLIP = { rect: { x: 560, y: 0, width: 800, height: 960 } } as const;

const mfaVisible = async (ctx: FlowContext) =>
  ctx.page.getByPlaceholder(/enter code/i).first().isVisible().catch(() => false);

/**
 * @param mfa "auto": chỉ nhập MFA nếu màn hình MFA xuất hiện; "screenshot-only": chụp màn hình MFA rồi dừng, KHÔNG gửi mã.
 */
export function identityCenterSteps(
  opts: { prefix?: string; when?: (ctx: FlowContext) => Promise<boolean>; mfa?: "auto" | "screenshot-only" } = {},
): Step[] {
  const p = opts.prefix ?? "idc";
  const when = opts.when;
  const whenMfa = async (ctx: FlowContext) => (!when || (await when(ctx))) && (await mfaVisible(ctx));
  const mfaSteps: Step[] =
    opts.mfa === "screenshot-only"
      ? [
          {
            id: `${p}-mfa-screen`,
      clip: LOGIN_CLIP,
            caption: "Màn hình Additional verification required: mở ứng dụng Authenticator trên điện thoại, nhập mã 6 số vào ô MFA code rồi bấm Sign in.",
            action: "shot",
            target: { placeholder: /enter code/i },
            label: "Mã 6 số từ ứng dụng Authenticator",
            // Màn hình MFA có thể hiện chậm: chờ tối đa 20 giây
            when: async (ctx) =>
              (!when || (await when(ctx))) &&
              (await ctx.page
                .getByPlaceholder(/enter code/i)
                .first()
                .waitFor({ state: "visible", timeout: 20_000 })
                .then(() => true)
                .catch(() => false)),
          },
        ]
      : [
          {
            id: `${p}-mfa`,
      clip: LOGIN_CLIP,
            caption: "Mở ứng dụng xác thực (Authenticator) trên điện thoại và nhập mã 6 số vào ô MFA code.",
            action: "type",
            target: { placeholder: /enter code/i },
            value: (ctx) => getMfaCode(ctx.config, ctx.page),
            secret: true,
            label: "Mã 6 số từ ứng dụng Authenticator",
            when: whenMfa,
          },
          {
            id: `${p}-mfa-signin`,
      clip: LOGIN_CLIP,
            caption: "Bấm Sign in để hoàn tất đăng nhập.",
            action: "click",
            target: { role: "button", name: /^\s*sign in\s*$/i },
            when: whenMfa,
          },
        ];
  return [
    {
      id: `${p}-username`,
      clip: LOGIN_CLIP,
      caption: "Nhập username (tên đăng nhập cá nhân) của bạn.",
      action: "type",
      target: { label: /^username$/i },
      value: (ctx) => ctx.config.username,
      maskAs: "username",
      label: "Username của bạn",
      when,
    },
    {
      id: `${p}-username-next`,
      clip: LOGIN_CLIP,
      caption: "Bấm Next.",
      action: "click",
      target: { role: "button", name: /^next$/i },
      waitAfter: { label: "Chuyển sang trang nhập mật khẩu", visible: "input[type=password]", timeoutMs: 30_000 },
      when,
    },
    {
      id: `${p}-password`,
      clip: LOGIN_CLIP,
      caption: "Nhập mật khẩu.",
      action: "type",
      target: "input[type=password]",
      value: (ctx) => ctx.config.password,
      secret: true,
      label: "Mật khẩu",
      when,
    },
    {
      id: `${p}-password-signin`,
      clip: LOGIN_CLIP,
      caption: "Bấm Sign in.",
      action: "click",
      target: { role: "button", name: /^\s*sign in\s*$/i },
      // Sau Sign in: hoặc sang màn hình MFA, hoặc rời trang đăng nhập (MFA tắt) — chờ ô mật khẩu biến mất.
      waitAfter: { label: "Xác thực mật khẩu", hidden: "input[type=password]", timeoutMs: 30_000 },
      when,
    },
    ...mfaSteps,
  ];
}

export function waitForQuickHome(): Step {
  return {
    id: "quick-home",
    caption: "Đăng nhập thành công — màn hình trang chủ Amazon Quick.",
    action: "waitFor",
    noAnnotate: true,
    waitAfter: { label: "Đang tải Amazon Quick", url: /quicksight\.aws\.amazon\.com\/sn\/(?!auth)/, timeoutMs: 60_000 },
    shotWhen: "after",
    holdMs: 1500,
  };
}

export { usernameVisible };
