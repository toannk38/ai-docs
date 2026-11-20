/** 13.6* (phần 1) Chụp các bước dựng biểu đồ trên một sheet trống tạm; xoá sheet tạm sau khi chụp. */
import type { Flow } from "../lib/flow";
import { createdUrl } from "./_created";
import { DATASET_NAME } from "./q13-5-tao-dataset";

const BY_BRANCH = /Sum of Tổng Giá Trị \(Vnd\) by Chi Nhánh/i;
const BY_DATE = /Sum of Tổng Giá Trị \(Vnd\) by Ngày/i;

const flow: Flow = {
  name: "q13-6-dung-bieu-do",
  title: "Dựng biểu đồ trong analysis",
  auth: "session",
  start: (ctx) => createdUrl("analysis", `${DATASET_NAME} analysis`).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "wait", caption: "Mở analysis.", action: "waitFor", shot: false, waitAfter: { label: "Mở analysis", visible: { text: BY_BRANCH }, timeoutMs: 90_000 } },
    {
      id: "new-sheet",
      caption: "Tạo sheet tạm (bắt buộc là sheet mới — không được sửa Sheet 1).",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        const p = ctx.page;
        const plus = p.locator('[role="tablist"][aria-label="Sheets"]').locator("xpath=following::button[1]");
        const btn = (await p.getByRole("button", { name: /create new sheet/i }).first().isVisible().catch(() => false)) ? p.getByRole("button", { name: /create new sheet/i }).first() : plus;
        await btn.click();
        await p.waitForTimeout(2000);
        const create = p.getByRole("dialog").getByRole("button", { name: /^(create|add)$/i }).first();
        if (await create.isVisible().catch(() => false)) await create.click();
        await p.getByRole("tab", { name: /^Sheet 2/ }).first().waitFor({ timeout: 20_000 });
        await p.getByRole("tab", { name: /^Sheet 2/ }).first().click();
        await p.waitForTimeout(2500);
        if (await p.getByText(/by Chi Nhánh/i).first().isVisible().catch(() => false)) throw new Error("Vẫn đang ở Sheet 1 — dừng để không sửa analysis.");
      },
    },
    { id: "editor", caption: "Màn hình analysis: khung Data (trường dữ liệu), khung Visuals (loại biểu đồ), bên phải là trang vẽ.", action: "shot", noAnnotate: true, holdMs: 1500 },
    { id: "f1", caption: "Bấm trường Chi nhánh.", action: "click", target: { text: /^\s*Chi nhánh\s*$/ }, label: "Chi nhánh", shotWhen: "before" },
    { id: "f2", caption: "Bấm thêm Tổng giá trị (VND): Quick tự chọn biểu đồ phù hợp (AutoGraph).", action: "click", target: { text: /^\s*Tổng giá trị \(VND\)\s*$/ }, label: "Tổng giá trị", shotWhen: "after", waitAfter: { label: "Vẽ biểu đồ", visible: { text: BY_BRANCH }, timeoutMs: 60_000 }, holdMs: 2500 },
    { id: "add", caption: "Bấm + Add (khung Visuals) để thêm biểu đồ khác.", action: "click", target: { role: "button", name: /^\+?\s*add$/i }, label: "Add", shotWhen: "before", holdMs: 1500 },
    { id: "f3", caption: "Bấm Ngày.", action: "click", target: { text: /^\s*Ngày\s*$/ }, shot: false },
    { id: "f4", caption: "Bấm Tổng giá trị (VND): biểu đồ đường theo thời gian.", action: "click", target: { text: /^\s*Tổng giá trị \(VND\)\s*$/ }, label: "Tổng giá trị", shotWhen: "after", waitAfter: { label: "Vẽ biểu đồ", visible: { text: BY_DATE }, timeoutMs: 60_000 }, holdMs: 2500 },
    {
      id: "cleanup",
      caption: "Xoá sheet tạm.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.getByRole("button", { name: /^Sheet 2 - Edit$/ }).click();
        await ctx.page.waitForTimeout(1000);
        const items = (await ctx.page.locator('[role="menu"], [role="menuitem"], [role="option"], [role="listbox"]').allInnerTexts()).join(" | ").replace(/\s+/g, " ");
        console.log("SHEETMENU:", items.slice(0, 300));
        await ctx.page.getByText(/^\s*Delete\s*$/).first().click();
        await ctx.page.waitForTimeout(800);
        const ok = ctx.page.getByRole("dialog").getByRole("button", { name: /delete|yes|ok/i }).first();
        if (await ok.isVisible().catch(() => false)) await ok.click();
        await ctx.page.waitForTimeout(2000);
        if (await ctx.page.getByRole("tab", { name: /^Sheet 2/ }).first().isVisible().catch(() => false)) throw new Error("Chưa xoá được Sheet 2 — xoá tay trong analysis.");
      },
    },
  ],
};

export default flow;
