/** 15.2 Tạo flow bằng mô tả: "Tóm tắt văn bản luật và liệt kê điểm cần lưu ý"; chạy thử; chia sẻ tới toannk2_reader. */
import type { Flow } from "../lib/flow";

export const FLOW_NAME = "Tóm tắt văn bản luật và liệt kê điểm cần lưu ý";
const DESCRIBE =
  "Tạo flow tên \"Tóm tắt văn bản luật và liệt kê điểm cần lưu ý\". Bước 1: người dùng tải lên một văn bản pháp luật (Word hoặc PDF). Bước 2: tóm tắt văn bản trong tối đa 10 gạch đầu dòng, nêu phạm vi điều chỉnh và đối tượng áp dụng. Bước 3: liệt kê các điểm ngân hàng cần lưu ý, kèm số điều, khoản. Trả lời bằng tiếng Việt.";

const flow: Flow = {
  name: "q15-2-tao-flow",
  title: "Tạo flow",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/flows`,
  steps: [
    {
      id: "guard",
      caption: "Kiểm tra chưa có flow cùng tên.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.waitForTimeout(5000);
        if (await ctx.page.getByText(FLOW_NAME, { exact: true }).first().isVisible().catch(() => false)) throw new Error(`Flow "${FLOW_NAME}" đã tồn tại — không tạo trùng.`);
      },
    },
    { id: "create", caption: "Mở Flows, bấm Create flow.", action: "click", target: { role: "button", name: /^create flow$/i }, label: "Create flow", shotWhen: "before", waitAfter: { label: "Mở trang tạo flow", visible: { role: "button", name: /^generate$/i }, timeoutMs: 60_000 } },
    { id: "describe", caption: "Mô tả flow bằng lời: tên, đầu vào, các bước xử lý, đầu ra. Có thể chọn mẫu gợi ý hoặc Create a blank flow để tự dựng.", action: "fill", target: "textarea >> nth=0", value: DESCRIBE, label: "Mô tả flow" },
    { id: "generate", caption: "Bấm Generate: Quick dựng các bước của flow.", action: "click", target: { role: "button", name: /^generate$/i }, label: "Generate", shotWhen: "before", waitAfter: { label: "Quick đang dựng flow", url: /\/flows\/(view|edit)\/[0-9a-f-]{20,}/, timeoutMs: 400_000 }, holdMs: 8000 },
    { id: "record", caption: "Ghi flow.", action: "custom", shot: false, run: async (ctx) => ctx.recordCreated("flow", FLOW_NAME, ctx.page.url()) },
    { id: "coach", caption: "Đóng hướng dẫn nổi.", action: "custom", shot: false, run: async (ctx) => { const b = ctx.page.getByRole("button", { name: /^dismiss all$/i }).first(); if (await b.isVisible().catch(() => false)) await b.click({ force: true }); await ctx.page.waitForTimeout(800); } },
    { id: "editor", caption: "Flow vừa tạo.", action: "shot", noAnnotate: true },
    { id: "probe", caption: "dò", action: "custom", shot: false, run: async (ctx) => { const c = await ctx.page.locator("textarea:visible, input:visible, button:visible").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName}@${Math.round(r.x)},${Math.round(r.y)}:${(e.getAttribute("aria-label") || (e as HTMLInputElement).placeholder || e.textContent || "").trim().slice(0, 40)}`; })); console.log("CTRL:", c.join(" | ").slice(0, 2000)); console.log("URL:", ctx.page.url().replace(/account\/[^/]+/, "account/X")); } },
  ],
};

export default flow;
