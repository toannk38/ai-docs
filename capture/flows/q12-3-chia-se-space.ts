/** 12.3 Chia sẻ Space tới toannk2_reader (Can view). */
import type { Flow } from "../lib/flow";
import { createdUrl } from "./_created";
import { SPACE_NAME } from "./q12-2-tao-space";
import { RECIPIENT } from "./q12-6-chia-se-agent";

const flow: Flow = {
  name: "q12-3-chia-se-space",
  title: "Chia sẻ Space",
  auth: "session",
  start: (ctx) => createdUrl("space", SPACE_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "share", caption: "Mở Space cần chia sẻ, bấm Share ở góc phải.", action: "click", target: { role: "button", name: /^share$/i }, label: "Share", shotWhen: "before" },
    { id: "dialog", caption: "Hộp thoại Share space: ô tìm người nhận, mức quyền, danh sách đã chia sẻ, Copy link.", action: "shot", target: '[role="dialog"]', label: "Share space", holdMs: 1200 },
    { id: "search", caption: `Gõ username, email hoặc tên nhóm của người nhận (ví dụ ${RECIPIENT}).`, action: "type", target: '[role="dialog"] input', value: RECIPIENT, noMask: true, label: "Người nhận" },
    { id: "pick", caption: "Chọn đúng người nhận trong danh sách gợi ý (kiểm tra cả email).", action: "click", target: { text: new RegExp(`^\\s*${RECIPIENT}\\s*$`) }, label: "Chọn người nhận" },
    { id: "level", caption: "Chọn mức quyền: Can view (xem và hỏi đáp) hoặc Can manage (thêm/xoá tài liệu, chia sẻ tiếp) — chỉ cấp Can manage cho người cùng quản lý Space.", action: "click", target: '[role="dialog"] button:has-text("Can view") >> nth=0', label: "Mức quyền", shotWhen: "after", holdMs: 1500 },
    { id: "close-level", caption: "Giữ Can view.", action: "press", value: "Escape", shot: false },
    {
      id: "submit",
      caption: "Bấm Share để chia sẻ.",
      action: "click",
      target: '[role="dialog"] button:text-is("Share")',
      label: "Share",
      waitAfter: { label: "Chia sẻ", hidden: '[role="dialog"]', timeoutMs: 30_000 },
    },
    { id: "record", caption: "Ghi việc chia sẻ.", action: "custom", shot: false, run: async (ctx) => ctx.recordCreated("share-space", `${SPACE_NAME} -> ${RECIPIENT}`, ctx.page.url()) },
    { id: "reopen", caption: "Mở lại Share để kiểm tra.", action: "click", target: { role: "button", name: /^share$/i }, shot: false },
    { id: "shared-with", caption: "Người nhận đã có trong Shared with với đúng mức quyền. Thu hồi: đổi mức quyền hoặc xoá người nhận ngay tại đây.", action: "shot", target: { text: new RegExp(`^\\s*${RECIPIENT}\\s*$`) }, label: "Đã chia sẻ", holdMs: 1500 },
    { id: "cancel", caption: "Đóng hộp thoại.", action: "click", target: '[role="dialog"] button:text-is("Cancel")', shot: false },
  ],
};

export default flow;
