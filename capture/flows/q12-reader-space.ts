/** 12.7 Kiểm chứng phía người nhận SAU KHI chia sẻ thêm Space: thấy Space, hỏi trong Space, agent trả lời từ tài liệu. */
import type { Flow } from "../lib/flow";

const base = (region: string, acct: string) => `https://${region}.quicksight.aws.amazon.com/sn/account/${acct}/start`;
const SPACE = "Văn bản pháp luật ngân hàng (demo)";

const flow: Flow = {
  name: "q12-reader-space",
  title: "Người nhận được chia sẻ cả Space",
  auth: "reader-session",
  start: (ctx) => `${base(ctx.config.region, ctx.config.accountName)}/spaces`,
  steps: [
    { id: "shared", caption: "Người nhận mở Spaces, chọn Shared with me.", action: "click", target: { text: /^\s*Shared with me\s*$/ }, label: "Shared with me", shotWhen: "after", holdMs: 1200 },
    { id: "open", caption: "Người nhận mở Space được chia sẻ.", action: "click", target: { text: SPACE }, label: "Space được chia sẻ", shotWhen: "before", waitAfter: { label: "Mở Space", visible: { text: /LUẬT CÁC TỔ CHỨC TÍN DỤNG/i }, timeoutMs: 60_000 } },
    { id: "space-view", caption: "Người nhận (Can view) thấy danh sách tài liệu; không có quyền thêm/xoá tài liệu hay chia sẻ tiếp.", action: "shot", noAnnotate: true, holdMs: 1200 },
    { id: "agents", caption: "Người nhận quay lại Chat agents.", action: "goto", value: (ctx) => `${base(ctx.config.region, ctx.config.accountName)}/agents`, shot: false },
    { id: "filter", caption: "Bộ lọc Show.", action: "click", target: { text: /^\s*Show:/ }, shot: false },
    { id: "shared-filter", caption: "Shared with me.", action: "click", target: { text: /^\s*Shared with me\s*$/ }, shot: false },
    { id: "chat", caption: "Chat với agent.", action: "click", target: 'tr:has-text("Trợ lý Quy định Ngân hàng") >> text=Chat', shot: false },
    { id: "ask", caption: "Hỏi lại cùng câu hỏi.", action: "type", target: { placeholder: /ask a question/i }, value: "Theo Luật Các tổ chức tín dụng, tổ chức tín dụng gồm những loại hình nào?", label: "Câu hỏi" },
    {
      id: "send",
      caption: "Gửi.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      shot: false,
      waitAfter: { label: "Agent đang trả lời", until: async (ctx) => !(await ctx.page.getByRole("button", { name: /stop/i }).first().isVisible().catch(() => false)) && (await ctx.page.getByRole("button", { name: /copy/i }).first().isVisible().catch(() => false)), timeoutMs: 300_000 },
    },
    { id: "answer", caption: "Khi người nhận đã được chia sẻ Space, agent trả lời từ tài liệu trong Space và có trích dẫn.", action: "shot", noAnnotate: true, holdMs: 1500 },
  ],
};

export default flow;
