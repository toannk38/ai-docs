/** 13.4* Kể chuyện dữ liệu với Stories — tạo story từ dashboard demo. */
import type { Flow } from "../lib/flow";
import { createdUrl } from "./_created";
import { DASHBOARD_NAME } from "./q13-6-analysis-dashboard";

const flow: Flow = {
  name: "q13-4-stories",
  title: "Kể chuyện dữ liệu với Stories",
  auth: "session",
  start: (ctx) => createdUrl("dashboard", DASHBOARD_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "wait", caption: "Mở dashboard.", action: "waitFor", shot: false, waitAfter: { label: "Mở dashboard", visible: { text: /by Chi Nhánh/i }, timeoutMs: 90_000 }, holdMs: 2000 },
    { id: "create", caption: "Trên dashboard, bấm Create (góc phải).", action: "click", target: { role: "button", name: /^create$/i }, label: "Create", shot: false, holdMs: 1200 },
    { id: "story", caption: "Menu Create: Executive summary, Story, Scenario. Chọn Story.", action: "click", target: { text: /^\s*Story\s*$/ }, label: "Story", shotWhen: "before", waitAfter: { label: "Mở trình tạo story", until: async (ctx) => (await ctx.page.locator("textarea:visible, [contenteditable=true]:visible").count()) > 0, timeoutMs: 120_000 }, holdMs: 3000 },
    { id: "after", caption: "Sau khi chọn Story.", action: "shot", noAnnotate: true },
    { id: "probe", caption: "dò", action: "custom", shot: false, run: async (ctx) => { console.log("URL:", ctx.page.url().replace(/account\/[^/]+/, "account/X")); const c = await ctx.page.locator("textarea:visible, input:visible, button:visible").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName}@${Math.round(r.x)},${Math.round(r.y)}:${(e.getAttribute("aria-label") || (e as HTMLInputElement).placeholder || e.textContent || "").trim().slice(0, 40)}`; })); console.log("CTRL:", c.join(" | ").slice(0, 2000)); } },
  ],
};

export default flow;
