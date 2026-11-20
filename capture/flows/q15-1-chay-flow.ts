/** 15.1 Chạy flow có sẵn: 5-Why Root Cause Analysis (pre-built). */
import type { Flow, FlowContext } from "../lib/flow";

const INPUT = "Thời gian xử lý hồ sơ vay tiêu dùng tại một chi nhánh tăng từ 3 ngày lên 7 ngày trong quý vừa qua (tình huống minh hoạ). Hãy phân tích nguyên nhân gốc bằng 5-Why và trả lời bằng tiếng Việt.";

const finished = async (ctx: FlowContext) => ctx.page.getByRole("button", { name: /^start a new run$/i }).first().isVisible().catch(() => false);

const flow: Flow = {
  name: "q15-1-chay-flow",
  title: "Chạy flow có sẵn",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/flows`,
  steps: [
    { id: "settle", caption: "Chờ.", action: "hold", holdMs: 4000, shot: false },
    { id: "library", caption: "Mở Flows → Flow library: flow có nhãn Pre-built là flow mẫu dùng ngay được. Bấm vào flow cần chạy.", action: "click", target: { text: /^\s*5-Why Root Cause Analysis\s*$/ }, label: "Flow mẫu", shotWhen: "before", waitAfter: { label: "Mở flow", visible: { role: "button", name: /^start$/i }, timeoutMs: 60_000 } },
    { id: "coach", caption: "Đóng hướng dẫn nổi.", action: "custom", shot: false, run: async (ctx) => { await ctx.page.waitForTimeout(2500); const b = ctx.page.getByRole("button", { name: /^dismiss all$/i }).first(); if (await b.isVisible().catch(() => false)) await b.click({ force: true }); await ctx.page.waitForTimeout(800); } },
    { id: "form", caption: "Trang flow: ô nhập thông tin đầu vào, nút Start; New run, Create trigger (chạy theo lịch), lịch sử chạy.", action: "shot", target: { placeholder: /^Example:/ }, label: "Đầu vào", holdMs: 1000 },
    { id: "input", caption: "Nhập vấn đề cần phân tích (không đưa dữ liệu khách hàng thật).", action: "fill", target: { placeholder: /^Example:/ }, value: INPUT, label: "Vấn đề" },
    { id: "start", caption: "Bấm Start.", action: "click", target: { role: "button", name: /^start$/i }, label: "Start", shotWhen: "before", holdMs: 10_000, waitAfter: { label: "Flow đang chạy", until: finished, timeoutMs: 900_000 } },
    { id: "result", caption: "Flow chạy xong từng bước (dấu ✓): Root Cause Analysis, Implementation Roadmap; khung bên phải tóm tắt. Download để tải kết quả, Start a new run để chạy lại.", action: "shot", target: { role: "button", name: /^download$/i }, label: "Download", holdMs: 2000 },
    { id: "dump", caption: "In trạng thái.", action: "custom", shot: false, run: async (ctx) => console.log("TEXT:", (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 1500)) },
  ],
};

export default flow;
