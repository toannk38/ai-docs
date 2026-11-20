/** 13.6* (phần 2) Chia sẻ dashboard tới toannk2_reader (chỉ xem). */
import type { Flow } from "../lib/flow";
import { createdUrl } from "./_created";
import { DASHBOARD_NAME } from "./q13-6-analysis-dashboard";
import { RECIPIENT } from "./q12-6-chia-se-agent";


const flow: Flow = {
  name: "q13-6-chia-se-dashboard",
  title: "Chia sẻ dashboard",
  auth: "session",
  start: (ctx) => createdUrl("dashboard", DASHBOARD_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "wait", caption: "Mở dashboard.", action: "waitFor", shot: false, waitAfter: { label: "Mở dashboard", visible: { text: /by Chi Nhánh/i }, timeoutMs: 90_000 } },
    { id: "dashboard", caption: "Dashboard đã xuất bản.", action: "shot", noAnnotate: true, holdMs: 3000 },
    { id: "share", caption: "Bấm biểu tượng Share ở thanh công cụ.", action: "click", target: { role: "button", name: /^share$/i }, shot: false },
    { id: "share-menu", caption: "Chọn Share dashboard (Share this view chỉ chia sẻ góc nhìn đang lọc).", action: "click", target: { text: /^\s*Share dashboard\s*$/ }, label: "Share dashboard", shotWhen: "before", holdMs: 3000 },
    { id: "share-page", caption: "Trang Share dashboard: bên trái mời người dùng/nhóm, bên phải Manage permissions (danh sách đang có quyền), Copy link, Copy embed code.", action: "shot", target: { placeholder: /search by user email or group name/i }, label: "Mời người dùng", holdMs: 2000, waitAfter: { label: "Tải danh sách quyền", hidden: '[class*="skeleton"], [class*="loading"]', timeoutMs: 20_000 } },
    {
      id: "reset",
      caption: "Nếu lần chạy trước đã chia sẻ thì thu hồi để chụp lại từ đầu (chỉ đối tượng do script tạo).",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.waitForTimeout(3000);
        const row = ctx.page.locator("tr, [role=row], li, div").filter({ hasText: /^\s*toannk2_reader\s*toannk2_reader@\S+\s*Viewer/ }).last();
        if (!(await row.isVisible().catch(() => false))) return;
        await row.locator("button").last().click();
        await ctx.page.waitForTimeout(1500);
        const confirm = ctx.page.getByRole("dialog").getByRole("button", { name: /revoke|remove|delete|confirm|yes/i }).first();
        if (await confirm.isVisible().catch(() => false)) await confirm.click();
        await ctx.page.waitForTimeout(3000);
        console.log("RESET: đã thu hồi quyền cũ");
      },
    },
    { id: "search", caption: `Gõ username hoặc email người nhận (ví dụ ${RECIPIENT}).`, action: "type", target: { placeholder: /search by user email or group name/i }, value: RECIPIENT, noMask: true, label: "Người nhận", holdMs: 3000 },
    { id: "enter", caption: "Nhấn Enter để tìm.", action: "press", value: "Enter", shot: false, holdMs: 3000 },
    { id: "add", caption: "Bấm Add cạnh đúng người nhận (kiểm tra email): danh sách mức quyền hiện ra.", action: "click", target: { role: "button", name: /^add$/i }, label: "Add", shotWhen: "after", holdMs: 1500 },
    {
      id: "viewer",
      caption: "Chọn Viewer (xem, xuất, in). User Reader chỉ có mức Viewer.",
      action: "click",
      target: { text: /^\s*Viewer\s*$/ },
      label: "Viewer",
      shotWhen: "before",
      waitAfter: { label: "Cấp quyền", visible: { text: /Not available for readers/i }, timeoutMs: 30_000 },
      holdMs: 2000,
    },
    { id: "record", caption: "Ghi chia sẻ.", action: "custom", shot: false, run: async (ctx) => ctx.recordCreated("share-dashboard", `${DASHBOARD_NAME} -> ${RECIPIENT}`, ctx.page.url()) },
    { id: "granted", caption: "Người nhận có trong Manage permissions với quyền Viewer. Thu hồi bằng biểu tượng thùng rác cuối dòng.", action: "shot", target: { text: /Not available for readers/ }, label: "Viewer — đã chia sẻ", holdMs: 1500 },
  ],
};

export default flow;
