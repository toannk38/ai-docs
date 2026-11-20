/** 15.3* (phần 2) Mở app vừa tạo, chờ dựng xong, chụp bản xem trước và menu chia sẻ. */
import type { Flow } from "../lib/flow";

const flow: Flow = {
  name: "q15-3-app-ket-qua",
  title: "Xem app vừa tạo",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/apps`,
  steps: [
    { id: "settle", caption: "Chờ.", action: "hold", holdMs: 6000, shot: false },
    { id: "card", caption: "App đã tạo nằm trong My apps / Recent, kèm ảnh xem trước; nhãn Private = chưa chia sẻ. Bấm vào app để mở.", action: "click", target: { text: /^\s*Checklist Hồ Sơ Vay Tiêu Dùng\s*$/ }, label: "App đã tạo", shotWhen: "before", holdMs: 3000 },
    {
      id: "wait",
      caption: "Chờ app dựng xong.",
      action: "waitFor",
      shot: false,
      holdMs: 8000,
      waitAfter: { label: "Tải bản xem trước", until: async (ctx) => ctx.page.frames().length > 1 && !(await ctx.page.getByText(/Loading preview/i).first().isVisible().catch(() => false)), timeoutMs: 240_000 },
    },
    { id: "preview", caption: "App vừa tạo: bản xem trước bên trái; khung chat bên phải (Ask Apps to make changes) để yêu cầu chỉnh sửa; Publish, Share ở góc phải.", action: "shot", target: { text: /^\s*Publish\s*$/ }, label: "Publish / Share", holdMs: 6000 },
    { id: "probe", caption: "dò", action: "custom", shot: false, run: async (ctx) => { const c = await ctx.page.locator("button:visible, textarea:visible").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName}@${Math.round(r.x)},${Math.round(r.y)}:${(e.getAttribute("aria-label") || (e as HTMLInputElement).placeholder || e.textContent || "").trim().slice(0, 40)}`; })); console.log("CTRL:", c.join(" | ").slice(0, 1500)); console.log("TEXT:", (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 1000)); } },
  ],
};

export default flow;
