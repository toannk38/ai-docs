/** 13.1 Xem và hỏi dữ liệu trên dashboard — chụp bằng tài khoản Reader (toannk2_reader) được chia sẻ quyền Viewer. */
import type { Flow, FlowContext } from "../lib/flow";
import { DASHBOARD_NAME } from "./q13-6-analysis-dashboard";

const base = (ctx: FlowContext) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start`;
export const DASH_QUESTION = "Chi nhánh nào có tổng giá trị giao dịch cao nhất quý 3/2026?";

const flow: Flow = {
  name: "q13-1-xem-dashboard",
  title: "Xem và hỏi dữ liệu trên dashboard",
  auth: "reader-session",
  start: (ctx) => `${base(ctx)}/dashboards`,
  steps: [
    { id: "list", caption: "Mở Dashboards trên thanh điều hướng, chọn dashboard cần xem.", action: "click", target: { text: DASHBOARD_NAME }, label: "Dashboard", shotWhen: "before", holdMs: 1500, waitAfter: { label: "Mở dashboard", visible: { text: /by Chi Nhánh/i }, timeoutMs: 90_000 } },
    { id: "view", caption: "Dashboard mở cùng khung chat bên phải: hỏi đáp ngay trên dữ liệu của dashboard.", action: "shot", target: { placeholder: /ask a question/i }, label: "Hỏi về dashboard", holdMs: 3000 },
    { id: "ask", caption: "Nhập câu hỏi về số liệu.", action: "type", target: { placeholder: /ask a question/i }, value: DASH_QUESTION, label: "Câu hỏi" },
    {
      id: "send",
      caption: "Gửi.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      shot: false,
      waitAfter: { label: "Quick đang phân tích", until: async (ctx) => !(await ctx.page.getByRole("button", { name: /stop/i }).first().isVisible().catch(() => false)) && (await ctx.page.getByRole("button", { name: /copy/i }).first().isVisible().catch(() => false)), timeoutMs: 300_000 },
    },
    { id: "answer", caption: "Câu trả lời dựa trên dữ liệu dashboard; đối chiếu lại với biểu đồ trước khi dùng.", action: "shot", noAnnotate: true, holdMs: 2000 },
    { id: "close-chat", caption: "Đóng khung chat để xem toàn bộ dashboard.", action: "click", target: { role: "button", name: /^close chat$/i }, shot: false, holdMs: 1500 },
    { id: "hover", caption: "Di chuột lên biểu đồ.", action: "hover", target: { text: /by Chi Nhánh/i }, shot: false },
    { id: "menu", caption: "Bấm ⋮ (Menu options) ở góc biểu đồ: View summary data, Export to CSV…", action: "click", target: 'button[aria-label*="Menu options"]:visible >> nth=0', label: "Menu biểu đồ", shotWhen: "after", holdMs: 1500 },
    { id: "menu-close", caption: "Đóng menu.", action: "press", value: "Escape", shot: false },
    { id: "export", caption: "Biểu tượng Export trên thanh công cụ: tải dashboard dạng PDF. Chỉ lưu tệp vào nơi được phép.", action: "click", target: 'button[aria-label="Export"]:visible >> nth=0', label: "Export", shotWhen: "after", holdMs: 1500 },
    { id: "export-close", caption: "Đóng.", action: "press", value: "Escape", shot: false },
  ],
};

export default flow;
