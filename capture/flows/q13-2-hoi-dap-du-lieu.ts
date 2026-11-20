/** 13.2 Hỏi đáp với dữ liệu (chat với dataset) — tài khoản có quyền trên dataset. */
import type { Flow } from "../lib/flow";
import { DATASET_NAME } from "./q13-5-tao-dataset";

const flow: Flow = {
  name: "q13-2-hoi-dap-du-lieu",
  title: "Hỏi đáp với dữ liệu",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/data?tab=dataset`,
  steps: [
    { id: "settle", caption: "Chờ trang Data tải xong.", action: "hold", holdMs: 6000, shot: false },
    { id: "chat", caption: "Mở Data → Datasets, bấm Chat ở dòng dataset cần hỏi.", action: "click", target: `[role="row"]:has-text("${DATASET_NAME}") >> text=Chat`, label: "Chat", shotWhen: "before", holdMs: 3000 },
    { id: "panel", caption: "Khung chat mở với dataset đã chọn làm phạm vi dữ liệu.", action: "shot", target: { placeholder: /ask a question/i }, label: "Hỏi về dataset", holdMs: 1500 },
    { id: "ask", caption: "Đặt câu hỏi cụ thể: chỉ số, chiều phân tích, khoảng thời gian.", action: "type", target: { placeholder: /ask a question/i }, value: "Tổng giá trị giao dịch theo vùng trong quý 3/2026, sắp xếp giảm dần", label: "Câu hỏi" },
    {
      id: "send",
      caption: "Gửi.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      shot: false,
      waitAfter: { label: "Quick đang phân tích", until: async (ctx) => !(await ctx.page.getByRole("button", { name: /stop/i }).first().isVisible().catch(() => false)) && (await ctx.page.getByRole("button", { name: /copy/i }).first().isVisible().catch(() => false)), timeoutMs: 300_000 },
    },
    { id: "answer", caption: "Quick trả lời bằng bảng/biểu đồ từ dataset.", action: "shot", noAnnotate: true, holdMs: 2000 },
    { id: "explain", caption: "Bấm Explanation để xem Quick đã lọc, tính toán thế nào — đối chiếu trước khi dùng.", action: "click", target: { role: "button", name: /^explanation$/i }, label: "Explanation", shotWhen: "after", holdMs: 2000 },
  ],
};

export default flow;
