/** 13.3* Phân tích với Scenarios (giới hạn user) — dùng scenario mở từ dashboard demo. */
import type { Flow, FlowContext } from "../lib/flow";
import { createdUrl } from "./_created";
import { DASHBOARD_NAME } from "./q13-6-analysis-dashboard";

export const SCENARIO_NAME = "Scenario từ dashboard Hiệu quả kinh doanh chi nhánh (probe)";
const PROBLEM = "Vùng nào có tỷ lệ duyệt hồ sơ vay thấp nhất? Nếu tỷ lệ duyệt của vùng đó tăng 5 điểm phần trăm thì số hồ sơ được duyệt tăng thêm bao nhiêu?";

const idle = async (ctx: FlowContext) => {
  const busy = await ctx.page.getByText(/analyzing|thinking|generating|running|in progress/i).first().isVisible().catch(() => false);
  const stop = await ctx.page.getByRole("button", { name: /^stop/i }).first().isVisible().catch(() => false);
  return !busy && !stop;
};

const flow: Flow = {
  name: "q13-3-scenarios",
  title: "Phân tích với Scenarios",
  auth: "session",
  start: (ctx) => createdUrl("dashboard", DASHBOARD_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "wait", caption: "Mở dashboard.", action: "waitFor", shot: false, waitAfter: { label: "Mở dashboard", visible: { text: /by Chi Nhánh/i }, timeoutMs: 90_000 } },
    { id: "entry", caption: "Trên dashboard, bấm Analyze this dashboard in a Scenario (hoặc More → Scenarios → Create scenario).", action: "shot", target: { text: /Analyze this dashboard in a Scenario/i }, label: "Mở Scenario", holdMs: 1500 },
    { id: "open", caption: "Mở scenario đã tạo từ dashboard.", action: "goto", value: (ctx) => createdUrl("scenario", SCENARIO_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`), shot: false, waitAfter: { label: "Nạp dữ liệu vào scenario", visible: { placeholder: /describe the problem/i }, timeoutMs: 120_000 } },
    { id: "canvas", caption: "Scenario: bên trái là dữ liệu (lấy từ dashboard; Find data, Upload file để thêm), giữa là ô mô tả vấn đề cần phân tích.", action: "shot", target: { placeholder: /describe the problem/i }, label: "Mô tả vấn đề", holdMs: 2000 },
    { id: "problem", caption: "Mô tả vấn đề và giả định cần phân tích (what-if).", action: "type", target: { placeholder: /describe the problem/i }, value: PROBLEM, label: "Vấn đề cần phân tích" },
    { id: "start", caption: "Bấm Start analysis.", action: "click", target: { role: "button", name: /^start analysis$/i }, label: "Start analysis", shotWhen: "before", holdMs: 20_000, waitAfter: { label: "Scenario đang phân tích", until: idle, timeoutMs: 600_000 } },
    { id: "result", caption: "Kết quả: các bước phân tích, bảng/biểu đồ và nhận định. Đọc kỹ giả định và kiểm tra số liệu.", action: "shot", noAnnotate: true, holdMs: 3000 },
  ],
};

export default flow;
