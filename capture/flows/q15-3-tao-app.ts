/** 15.3* Tạo app từ mô tả (giới hạn user). */
import type { Flow } from "../lib/flow";

export const APP_DESC =
  "Ứng dụng checklist hồ sơ vay tiêu dùng (dữ liệu minh hoạ): nhập mã hồ sơ, đánh dấu các giấy tờ đã nhận (CCCD, hợp đồng lao động, sao kê lương, giấy xác nhận cư trú), hiển thị phần trăm hoàn thành và danh sách giấy tờ còn thiếu. Giao diện tiếng Việt.";

const flow: Flow = {
  name: "q15-3-tao-app",
  title: "Tạo app",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/apps`,
  steps: [
    { id: "settle", caption: "Chờ.", action: "hold", holdMs: 6000, shot: false },
    { id: "page", caption: "Mở Apps: mô tả ý tưởng app hoặc chọn ví dụ; các tab Recent, Library, My apps.", action: "shot", target: "textarea >> nth=0", label: "Mô tả app", holdMs: 1000 },
    { id: "describe", caption: "Mô tả app: mục đích, dữ liệu nhập, kết quả hiển thị. Chỉ dùng dữ liệu minh hoạ.", action: "fill", target: "textarea >> nth=0", value: APP_DESC, label: "Mô tả" },
    { id: "generate", caption: "Bấm Generate.", action: "click", target: { role: "button", name: /^generate$/i }, label: "Generate", shotWhen: "before", holdMs: 20_000 },
    { id: "record", caption: "Ghi app.", action: "custom", shot: false, run: async (ctx) => ctx.recordCreated("app", "Checklist hồ sơ vay tiêu dùng (demo)", ctx.page.url()) },
    { id: "progress", caption: "Quick đang dựng app: các bước hiện ở khung chat bên trái.", action: "shot", noAnnotate: true },
    {
      id: "wait",
      caption: "Chờ app dựng xong (trong cùng phiên).",
      action: "waitFor",
      shot: false,
      waitAfter: { label: "Quick đang dựng app", until: async (ctx) => { const t = await ctx.page.locator("body").innerText().catch(() => ""); return ctx.page.frames().length > 1 && !/Generating|Building|Thinking|Working on|Creating|Writing code/i.test(t); }, timeoutMs: 1_200_000 },
      holdMs: 8000,
    },
    { id: "preview", caption: "App vừa tạo: xem trước và yêu cầu chỉnh sửa bằng chat.", action: "shot", noAnnotate: true, holdMs: 3000 },
    { id: "probe", caption: "dò", action: "custom", shot: false, run: async (ctx) => { console.log("URL:", ctx.page.url().replace(/account\/[^/]+/, "account/X")); const c = await ctx.page.locator("button:visible").evaluateAll((els) => els.map((e) => (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 30)).filter(Boolean)); console.log("BTNS:", [...new Set(c)].join(" | ").slice(0, 800)); } },
  ],
};

export default flow;
