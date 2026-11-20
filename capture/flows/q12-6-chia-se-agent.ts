/** 12.6 Chia sẻ chat agent tới toannk2_reader với quyền Can view (chưa chia sẻ Space — để kiểm chứng người nhận thấy gì). */
import type { Flow, Step } from "../lib/flow";

export const RECIPIENT = "toannk2_reader";
const ROW_MENU = 'tr:has-text("Trợ lý Quy định Ngân hàng") >> button >> nth=-1';

const openShare: Step[] = [
  { id: "actions", caption: "Trang Chat agents: bấm nút ⋮ ở cột Action của agent cần chia sẻ.", action: "click", target: ROW_MENU, label: "Action", shotWhen: "after", holdMs: 1200 },
  { id: "share", caption: "Chọn Share.", action: "click", target: { text: /^\s*Share\s*$/ }, label: "Share", shotWhen: "before" },
];

const flow: Flow = {
  name: "q12-6-chia-se-agent",
  title: "Chia sẻ chat agent",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/agents`,
  steps: [
    ...openShare,
    { id: "dialog", caption: "Hộp thoại Share agent: ô tìm người nhận, mức quyền, danh sách đã chia sẻ, Copy link và Copy embed code.", action: "shot", target: '[role="dialog"]', label: "Share agent", holdMs: 1200 },
    { id: "search", caption: `Gõ username, email hoặc tên nhóm của người nhận (ví dụ ${RECIPIENT}).`, action: "type", target: '[role="dialog"] input', value: RECIPIENT, noMask: true, label: "Người nhận" },
    { id: "pick", caption: "Chọn đúng người nhận trong danh sách gợi ý (kiểm tra cả email).", action: "click", target: { text: new RegExp(`^\\s*${RECIPIENT}\\s*$`) }, label: "Chọn người nhận" },
    { id: "level", caption: "Chọn mức quyền: Can view (chỉ dùng agent) — mặc định và nên dùng; Can manage chỉ cho người cùng quản lý agent.", action: "click", target: '[role="dialog"] button:has-text("Can view") >> nth=0', label: "Mức quyền", shotWhen: "after", holdMs: 1500 },
    { id: "close-level", caption: "Giữ Can view.", action: "press", value: "Escape", shot: false },
    {
      id: "submit",
      caption: "Bấm Share để chia sẻ.",
      action: "click",
      target: '[role="dialog"] button:text-is("Share")',
      label: "Share",
      waitAfter: { label: "Chia sẻ", hidden: '[role="dialog"]', timeoutMs: 30_000 },
    },
    {
      id: "record",
      caption: "Ghi việc chia sẻ (để thu hồi khi dọn dẹp).",
      action: "custom",
      shot: false,
      run: async (ctx) => ctx.recordCreated("share-agent", `Trợ lý Quy định Ngân hàng NAB -> ${RECIPIENT}`, ctx.page.url()),
    },
    ...openShare.map((s) => ({ ...s, id: `re-${s.id}`, shot: false })),
    { id: "shared-with", caption: "Mở lại Share để kiểm tra: người nhận đã có trong danh sách Shared with với đúng mức quyền.", action: "shot", target: { text: new RegExp(`^\\s*${RECIPIENT}\\s*$`) }, label: "Đã chia sẻ", holdMs: 1500 },
    { id: "cancel", caption: "Đóng hộp thoại.", action: "click", target: '[role="dialog"] button:text-is("Cancel")', shot: false },
  ],
};

export default flow;
