/**
 * 11.2 Đăng nhập bằng link Amazon Quick / nhập account name opba-ai.
 * (a) Link có sẵn account -> thẳng trang Username. (b) Trang chung: nhập SAI (email giả) -> lỗi; nhập đúng -> đăng nhập.
 * (c) Menu tài khoản: Account name + Username. (Choose your account chỉ hiện khi trình duyệt có nhiều phiên — mô tả bằng chữ.)
 */
import { LIVE } from "../lib/config";
import type { Flow } from "../lib/flow";
import { identityCenterSteps, waitForQuickHome } from "./_login-steps";
import { LOGIN_CLIP } from "./_login-steps";

const GENERIC = "https://quicksight.aws.amazon.com/";
const WRONG = "ten.dang.nhap@example.com";

const flow: Flow = {
  name: "q11-2-link-quick",
  title: "Đăng nhập bằng link Amazon Quick và account name opba-ai",
  auth: "none",
  start: (ctx) => ctx.config.appUrl,
  steps: [
    {
      id: "bookmark-link",
      clip: LOGIN_CLIP,
      caption: `Mở link ${LIVE.quickDirectUrl} (đã chứa account name opba-ai): bạn được chuyển thẳng tới trang đăng nhập, không phải nhập account name.`,
      action: "shot",
      target: { label: /^username$/i },
      label: "Đi thẳng tới trang đăng nhập",
      banner: { text: LIVE.quickDirectUrl, position: "top" },
      holdMs: 1500,
    },
    { id: "open-generic", caption: "Mở trang đăng nhập Amazon Quick chung.", action: "goto", value: GENERIC, shot: false },
    {
      id: "clear-prefill",
      caption: "Trình duyệt có thể tự điền account name đã dùng lần trước — xoá để bắt đầu từ ô trống.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.locator("#account-name-input").waitFor();
        await ctx.page.locator("#account-name-input").fill("");
      },
    },
    {
      id: "generic-page",
      clip: LOGIN_CLIP,
      caption: "Trang đăng nhập Amazon Quick chung hỏi Quick account name.",
      action: "shot",
      target: "#account-name-input",
      label: "Ô Quick account name",
    },
    {
      id: "type-wrong",
      clip: LOGIN_CLIP,
      caption: "SAI: nhập email/username vào ô Quick account name.",
      action: "type",
      target: "#account-name-input",
      value: WRONG,
      label: "✗ Sai: đây là email",
      banner: { text: "✗ SAI — không nhập email/username vào ô này", tone: "danger", position: "top" },
      holdMs: 1200,
    },
    {
      id: "click-next-wrong",
      caption: "Bấm Next.",
      action: "click",
      target: "#account-name-submit-button",
      shot: false,
      waitAfter: { label: "Hiện lỗi", visible: { text: /invalid account name/i }, timeoutMs: 20_000 },
    },
    {
      id: "error",
      clip: LOGIN_CLIP,
      caption: "Thông báo Invalid account name: bạn đã nhập sai account name.",
      action: "shot",
      target: { text: /invalid account name/i },
      label: "Invalid account name",
      banner: { text: `Thấy lỗi này? Xoá và nhập ${LIVE.accountName}`, tone: "danger", position: "top" },
      holdMs: 2000,
    },
    {
      id: "clear",
      caption: "Xoá nội dung trong ô.",
      action: "custom",
      shot: false,
      run: async (ctx) => ctx.page.locator("#account-name-input").fill(""),
    },
    {
      id: "type-account",
      clip: LOGIN_CLIP,
      caption: `ĐÚNG: nhập ${LIVE.accountName}.`,
      action: "type",
      target: "#account-name-input",
      value: (ctx) => ctx.config.accountName,
      maskAs: "account",
      label: `✓ Nhập: ${LIVE.accountName}`,
      banner: { text: `Ô này nhập ${LIVE.accountName} — KHÔNG nhập username hay email`, tone: "danger", position: "top" },
      holdMs: 2800,
    },
    {
      id: "account-next",
      clip: LOGIN_CLIP,
      caption: "Bấm Next: bạn được chuyển sang trang đăng nhập.",
      action: "click",
      target: "#account-name-submit-button",
      label: "Next",
      waitAfter: { label: "Chuyển sang trang đăng nhập", visible: { label: /^username$/i }, timeoutMs: 30_000 },
    },
    ...identityCenterSteps(),
    waitForQuickHome(),
    {
      id: "account-menu",
      caption: "Bấm nút tài khoản ở góc phải trên: menu hiện Account name (opba-ai) và Username (tên đăng nhập của bạn).",
      action: "click",
      target: { text: /^\s*opba-ai\s*$/ },
      label: "Account name và Username",
      shotWhen: "after",
      holdMs: 1500,
    },
  ],
};

export default flow;
