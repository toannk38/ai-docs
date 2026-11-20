/** 12.4 Dùng chat agent: chọn agent ở ô chat (Quick ▾) hoặc từ trang Chat agents. */
import type { Flow } from "../lib/flow";

const AGENT = /Trợ lý Quy định Ngân hàng/i;

const flow: Flow = {
  name: "q12-4-dung-agent",
  title: "Dùng chat agent",
  auth: "session",
  steps: [
    { id: "picker", caption: "Ở ô chat, bấm Quick ▾ (chọn agent).", action: "click", target: { role: "button", name: /select agent/i }, label: "Chọn agent", shotWhen: "after", holdMs: 1500 },
    { id: "choose", caption: "Chọn agent cần dùng trong danh sách.", action: "click", target: { text: AGENT }, label: "Agent tra cứu quy định", shotWhen: "before" },
    { id: "ask", caption: "Đặt câu hỏi; agent trả lời theo vai trò và nguồn kiến thức đã cấu hình.", action: "type", target: { placeholder: /ask a question/i }, value: "Ngân hàng Nhà nước có những nhiệm vụ, quyền hạn chính nào?", label: "Câu hỏi" },
    {
      id: "send",
      caption: "Gửi câu hỏi.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      shot: false,
      waitAfter: { label: "Agent đang trả lời", visible: { role: "button", name: /^sources$/i }, timeoutMs: 300_000 },
    },
    { id: "answer", caption: "Câu trả lời của agent có dẫn điều luật và trích dẫn tài liệu.", action: "shot", target: { role: "button", name: /^sources$/i }, label: "Trả lời của agent", holdMs: 1500 },
    {
      id: "list",
      caption: "Cách khác: mở Chat agents, bấm Chat ở dòng agent cần dùng.",
      action: "goto",
      value: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/agents`,
      shot: false,
    },
    { id: "list-chat", caption: "Trang Chat agents: danh sách agent bạn tạo hoặc được chia sẻ; bấm Chat để trò chuyện với agent.", action: "shot", target: { role: "row", name: AGENT }, label: "Bấm Chat", holdMs: 1200 },
  ],
};

export default flow;
