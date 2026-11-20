/** 12.5 Tạo chat agent bằng mô tả (Generate), xem cấu hình, thử trong khung xem trước, Launch. Ghi agent vào created.json. */
import type { Flow, FlowContext } from "../lib/flow";

export const AGENT_PROMPT =
  "Trợ lý tra cứu quy định ngân hàng cho nhân viên NAB. Trả lời dựa trên các văn bản luật trong Space Văn bản pháp luật ngân hàng (demo), luôn dẫn điều luật, giọng trang trọng, ngắn gọn.";

const agentsUrl = (ctx: FlowContext) =>
  `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/agents`;

const flow: Flow = {
  name: "q12-5-tao-agent",
  title: "Tạo chat agent",
  auth: "session",
  start: agentsUrl,
  steps: [
    {
      id: "guard",
      caption: "Chỉ chạy khi chưa có agent demo (tránh tạo trùng).",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.waitForTimeout(2500);
        if (await ctx.page.getByText(/Quy định Ngân hàng/i).first().isVisible().catch(() => false)) {
          throw new Error("Đã có agent demo — xoá agent demo cũ trước khi chạy lại flow.");
        }
      },
    },
    { id: "create", caption: "Mở Chat agents, bấm Create chat agent.", action: "click", target: { role: "button", name: /^create chat agent$/i }, label: "Create chat agent" },
    { id: "describe", caption: "Mô tả agent bằng lời: làm gì, cho ai, dùng nguồn kiến thức nào, giọng văn ra sao.", action: "type", target: { placeholder: /I want a chat agent/i }, value: AGENT_PROMPT, label: "Mô tả agent" },
    {
      id: "generate",
      caption: "Bấm Generate: Quick soạn sẵn tên, lời hướng dẫn (persona) và gợi ý nguồn kiến thức.",
      action: "click",
      target: { role: "button", name: /^generate$/i },
      label: "Generate",
      waitAfter: { label: "Quick đang tạo cấu hình agent", visible: { text: /^\s*Configure chat agent\s*$/ }, timeoutMs: 300_000 },
    },
    { id: "persona", caption: "AGENT PERSONA: kiểm tra và sửa lời hướng dẫn (Instructions) cho đúng phạm vi công việc; có thể bấm Refine để Quick viết lại.", action: "shot", target: { text: /^\s*Agent persona\s*$/i }, label: "Lời hướng dẫn agent", holdMs: 1200 },
    { id: "reference", caption: "Reference documents: đính kèm tài liệu hướng dẫn cách trả lời (tối đa 10 tài liệu theo thông báo trên màn hình). Chỉ đính kèm tài liệu đã được phép.", action: "shot", target: { text: /^\s*Reference documents\s*$/ }, label: "Tài liệu tham chiếu" },
    { id: "knowledge", caption: "KNOWLEDGE SOURCES: Space làm nguồn kiến thức; bấm Link spaces để gắn thêm hoặc bỏ Space. ACTIONS: kết nối hành động — chỉ dùng khi được phê duyệt.", action: "shot", target: { text: /^\s*Knowledge sources/i }, label: "Space làm nguồn", holdMs: 1200 },
    {
      id: "preview-ask",
      caption: "Thử agent trong khung xem trước bên phải bằng một câu hỏi mẫu.",
      action: "type",
      target: { placeholder: /ask a question/i },
      value: "Ngân hàng thương mại được thực hiện những hoạt động nào theo Luật Các tổ chức tín dụng?",
      label: "Câu hỏi thử",
    },
    {
      id: "preview-send",
      caption: "Gửi câu hỏi thử và chờ trả lời.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      shot: false,
      waitAfter: { label: "Agent đang trả lời (xem trước)", visible: { role: "button", name: /^sources$/i }, timeoutMs: 300_000 },
    },
    { id: "preview-answer", caption: "Kiểm tra câu trả lời có dẫn điều luật và trích dẫn tài liệu trong Space.", action: "shot", target: { role: "button", name: /^sources$/i }, label: "Câu trả lời xem trước", holdMs: 1500 },
    {
      id: "launch",
      caption: "Bấm Launch chat agent để lưu và đưa agent vào sử dụng.",
      action: "click",
      target: { role: "button", name: /^launch chat agent$/i },
      label: "Launch chat agent",
      // Sau khi Launch, nút chuyển sang disabled (agent đã lưu).
      waitAfter: { label: "Lưu agent", until: async (ctx) => ctx.page.getByRole("button", { name: /^launch chat agent$/i }).first().isDisabled().catch(() => false), timeoutMs: 120_000 },
    },
    {
      id: "record",
      caption: "Ghi agent demo đã tạo.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.waitForTimeout(3000);
        // Tên agent do Quick sinh — lấy từ nút "Edit name" (tiêu đề trang cấu hình).
        const name = (await ctx.page.getByRole("button", { name: /^edit name$/i }).first().evaluate((b) => b.closest("div")?.textContent || "").catch(() => "")).trim() || "agent demo";
        ctx.vars.agentName = name;
        ctx.recordCreated("agent", name, ctx.page.url());
      },
    },
    { id: "launched", caption: "Agent đã được lưu và sẵn sàng dùng.", action: "shot", noAnnotate: true, holdMs: 1500 },
  ],
};

export default flow;
