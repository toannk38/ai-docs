/** 13.3* (phần 2) Mở lại scenario: Start analysis → Start a thread (chọn gợi ý what-if) → kết quả. */
import type { Flow, FlowContext } from "../lib/flow";
import { createdUrl } from "./_created";
import { SCENARIO_NAME } from "./q13-3-scenarios";

const bodyLen = async (ctx: FlowContext) => (await ctx.page.locator("body").innerText().catch(() => "")).length;

const flow: Flow = {
  name: "q13-3-scenarios-ket-qua",
  title: "Kết quả Scenario",
  auth: "session",
  start: (ctx) => createdUrl("scenario", SCENARIO_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "load", caption: "Chờ scenario tải.", action: "hold", holdMs: 15_000, shot: false },
    { id: "start", caption: "Bấm Start analysis bên dưới mô tả vấn đề.", action: "click", target: { role: "button", name: /^start analysis$/i }, label: "Start analysis", shotWhen: "before", when: async (ctx) => ctx.page.getByRole("button", { name: /^start analysis$/i }).first().isVisible().catch(() => false), waitAfter: { label: "Chuẩn bị dữ liệu", visible: { text: /Start a thread/i }, timeoutMs: 600_000 } },
    { id: "thread", caption: "Start a thread: chọn một gợi ý phân tích hoặc tự mô tả (Describe what you want to analyze next) rồi Submit.", action: "shot", target: { text: /Choose one of these suggestions/i }, label: "Gợi ý phân tích", holdMs: 1500 },
    { id: "mark", caption: "Ghi độ dài trang.", action: "custom", shot: false, run: async (ctx) => { ctx.vars.len0 = String(await bodyLen(ctx)); } },
    { id: "pick", caption: "Chọn gợi ý what-if: nếu chi nhánh thấp nhất tăng 5% thì tổng giá trị tăng bao nhiêu.", action: "click", target: { text: /^\s*Nếu chi nhánh có tổng giá trị thấp nhất/ }, label: "What-if", shotWhen: "before", holdMs: 3000 },
    { id: "submit", caption: "Bấm Submit (nếu gợi ý chưa tự gửi).", action: "click", target: { role: "button", name: /^submit$/i }, shot: false, when: async (ctx) => (await ctx.page.getByRole("button", { name: /^submit$/i }).first().isEnabled().catch(() => false)) && (await ctx.page.locator("textarea:visible, input:visible").evaluateAll((els) => els.some((e) => (e as HTMLInputElement).value?.length > 0)).catch(() => false)), holdMs: 3000 },
    {
      id: "wait",
      caption: "Chờ phân tích xong.",
      action: "waitFor",
      shot: false,
      waitAfter: { label: "Scenario đang phân tích", until: async (ctx) => { const t = await ctx.page.locator("body").innerText().catch(() => ""); return t.length > Number(ctx.vars.len0) + 600 && !/Analyzing|Thinking|Generating|Running|Preparing/i.test(t); }, timeoutMs: 900_000 },
      holdMs: 5000,
    },
    { id: "result", caption: "Kết quả: Quick tính toán, trình bày bảng/biểu đồ và nhận định. Kiểm tra giả định và số liệu (Review responses for accuracy).", action: "shot", noAnnotate: true, holdMs: 2000 },
    { id: "dump", caption: "In nội dung.", action: "custom", shot: false, run: async (ctx) => console.log("TEXT:", (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ").slice(-2000)) },
  ],
};

export default flow;
