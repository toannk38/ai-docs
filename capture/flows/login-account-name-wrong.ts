/**
 * Màn hình lỗi khi nhập SAI account name (thử bằng một email giả) — để tài liệu giải thích:
 * "Nếu thấy màn hình này -> bạn đã nhập sai account name, quay lại nhập opba-ai".
 * Không gửi thông tin đăng nhập nào.
 */
import { LIVE } from "../lib/config";
import type { Flow } from "../lib/flow";

export const WRONG_ACCOUNT_SAMPLE = "ten.dang.nhap@example.com";

const flow: Flow = {
  name: "login-account-name-wrong",
  title: "Lỗi khi nhập username/email vào ô Quick account name",
  auth: "none",
  start: "https://quicksight.aws.amazon.com/",
  steps: [
    {
      id: "type-wrong",
      caption: "SAI: nhập email/username vào ô Quick account name.",
      action: "type",
      target: "#account-name-input",
      value: WRONG_ACCOUNT_SAMPLE,
      label: "✗ Sai: đây là email, không phải account name",
      banner: { text: "✗ SAI — không nhập email/username vào ô này", tone: "danger", position: "top" },
      holdMs: 1500,
    },
    {
      id: "click-next",
      caption: "Bấm Next.",
      action: "click",
      target: "#account-name-submit-button",
      shot: false,
      waitAfter: { label: "Hiện lỗi", visible: { text: /invalid account name/i }, timeoutMs: 20_000 },
    },
    {
      id: "error",
      caption: `Nếu thấy thông báo "Invalid account name" -> bạn đã nhập sai account name. Xoá nội dung trong ô và nhập ${LIVE.accountName}.`,
      action: "shot",
      target: { text: /invalid account name/i },
      label: "Thông báo lỗi Invalid account name",
      banner: { text: `Thấy lỗi này? Quay lại nhập ${LIVE.accountName}`, tone: "danger", position: "top" },
      holdMs: 3000,
    },
  ],
};

export default flow;
