/**
 * Trang đăng nhập Quick CHUNG (không có account trong link): phải nhập account name opba-ai.
 * Lỗi hay gặp: người dùng nhập username/email vào ô này. Flow dừng 2–3 giây ở bước nhập với phụ đề nhắc.
 * Không cần mật khẩu: dừng ở trang Username của Identity Center.
 */
import { LIVE } from "../lib/config";
import type { Flow } from "../lib/flow";

const flow: Flow = {
  name: "login-account-name",
  title: "Nhập account name opba-ai trên trang đăng nhập Amazon Quick chung",
  auth: "none",
  start: "https://quicksight.aws.amazon.com/",
  steps: [
    {
      id: "generic-signin",
      caption: "Nếu mở trang đăng nhập Amazon Quick chung (link không có account name), bạn sẽ thấy ô Quick account name.",
      action: "shot",
      target: "#account-name-input",
      label: "Ô Quick account name",
      holdMs: 1200,
    },
    {
      id: "type-account-name",
      caption: `Ô này nhập ${LIVE.accountName} — KHÔNG nhập username hay email của bạn. Username chỉ nhập ở bước sau, trên trang đăng nhập.`,
      action: "type",
      target: "#account-name-input",
      value: (ctx) => ctx.config.accountName,
      maskAs: "account",
      label: `Nhập: ${LIVE.accountName}`,
      banner: { text: `Ô này nhập ${LIVE.accountName} — KHÔNG nhập username hay email`, tone: "danger", position: "top" },
      holdMs: 2800,
    },
    {
      id: "account-next",
      caption: "Bấm Next. Bạn được chuyển sang trang đăng nhập (Identity Center).",
      action: "click",
      target: "#account-name-submit-button",
      label: "Next",
      waitAfter: { label: "Chuyển sang trang đăng nhập Identity Center", visible: { label: /^username$/i }, timeoutMs: 30_000 },
    },
    {
      id: "idc-username-page",
      caption: "Trang đăng nhập: bây giờ mới nhập username của bạn (xem các bước đăng nhập).",
      action: "shot",
      target: { label: /^username$/i },
      label: "Username nhập ở đây",
      holdMs: 1500,
    },
  ],
};

export default flow;
