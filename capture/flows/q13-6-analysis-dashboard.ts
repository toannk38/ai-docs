/** 13.6* Tạo biểu đồ trong analysis và xuất bản dashboard; chia sẻ dashboard tới toannk2_reader (xem). */
import type { Flow, FlowContext } from "../lib/flow";
import { createdUrl } from "./_created";
import { DATASET_NAME } from "./q13-5-tao-dataset";

export const DASHBOARD_NAME = "Hiệu quả kinh doanh chi nhánh (dữ liệu giả lập)";

const hasChart = (re: RegExp) => async (ctx: FlowContext) => !(await ctx.page.getByText(re).first().isVisible().catch(() => false));
const BY_BRANCH = /Sum of Tổng Giá Trị \(Vnd\) by Chi Nhánh/i;
const BY_DATE = /Sum of Tổng Giá Trị \(Vnd\) by Ngày/i;

async function probe(ctx: FlowContext) {
  const b = await ctx.page.locator('[role="dialog"] button, [role="dialog"] input, [role="dialog"] label, [role="dialog"] h2').evaluateAll((els) =>
    els.map((e) => `${e.tagName}:${(e.getAttribute("aria-label") || (e as HTMLInputElement).placeholder || e.textContent || "").trim()}`).filter((x) => x.length > 4),
  );
  console.log("DIALOG:", b.join(" | ").slice(0, 1500));
}

const flow: Flow = {
  name: "q13-6-analysis-dashboard",
  title: "Tạo analysis và xuất bản dashboard",
  auth: "session",
  start: (ctx) => createdUrl("analysis", `${DATASET_NAME} analysis`).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "wait", caption: "Mở analysis.", action: "waitFor", shot: false, waitAfter: { label: "Mở analysis", visible: { text: /^\s*Chi nhánh\s*$/ }, timeoutMs: 90_000 } },
    { id: "editor", caption: "Màn hình analysis: bên trái là danh sách trường dữ liệu (Data), tiếp theo là các loại biểu đồ (Visuals), bên phải là trang vẽ.", action: "shot", noAnnotate: true, holdMs: 1500 },
    { id: "f1", caption: "Bấm trường Chi nhánh.", action: "click", target: { text: /^\s*Chi nhánh\s*$/ }, label: "Chi nhánh", shotWhen: "before", when: hasChart(BY_BRANCH) },
    { id: "f2", caption: "Bấm thêm trường Tổng giá trị (VND): Quick tự chọn biểu đồ phù hợp (AutoGraph).", action: "click", target: { text: /^\s*Tổng giá trị \(VND\)\s*$/ }, label: "Tổng giá trị", shotWhen: "after", when: hasChart(BY_BRANCH), waitAfter: { label: "Vẽ biểu đồ", visible: { text: BY_BRANCH }, timeoutMs: 60_000 }, holdMs: 2000 },
    { id: "add", caption: "Bấm + Add (khung Visuals) để thêm biểu đồ thứ hai.", action: "click", target: { role: "button", name: /^\+?\s*add$/i }, label: "Add", shotWhen: "before", when: hasChart(BY_DATE) },
    { id: "f3", caption: "Bấm trường Ngày.", action: "click", target: { text: /^\s*Ngày\s*$/ }, shot: false, when: hasChart(BY_DATE) },
    { id: "f4", caption: "Bấm Tổng giá trị (VND): biểu đồ đường theo thời gian.", action: "click", target: { text: /^\s*Tổng giá trị \(VND\)\s*$/ }, label: "Tổng giá trị", shotWhen: "after", when: hasChart(BY_DATE), waitAfter: { label: "Vẽ biểu đồ", visible: { text: BY_DATE }, timeoutMs: 60_000 }, holdMs: 2000 },
    {
      id: "wait-spice",
      caption: "Chờ dữ liệu nạp xong vào SPICE (khi đang nạp, Publish báo Some datasets are being refreshed).",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        for (let i = 0; i < 30; i++) {
          await ctx.page.getByRole("button", { name: /^publish$/i }).click();
          await ctx.page.waitForTimeout(2500);
          const busy = ctx.page.getByText(/Some datasets are being refreshed/i).first();
          if (!(await busy.isVisible().catch(() => false))) {
            await ctx.page.keyboard.press("Escape");
            await ctx.page.waitForTimeout(1500);
            return;
          }
          await ctx.page.getByRole("button", { name: /^close$/i }).last().click().catch(() => undefined);
          await ctx.page.waitForTimeout(20_000);
        }
        throw new Error("SPICE chưa nạp xong sau 10 phút");
      },
    },
    { id: "publish", caption: "Bấm Publish ở góc phải.", action: "click", target: { role: "button", name: /^publish$/i }, label: "Publish", shotWhen: "before", waitAfter: { label: "Mở hộp thoại Publish", visible: { text: /^\s*Dashboard name\s*$/ }, timeoutMs: 60_000 } },
    { id: "pdialog", caption: "Hộp thoại Publish dashboard: New dashboard hoặc Replace existing dashboard (cập nhật dashboard đã có).", action: "shot", target: { text: /^\s*New dashboard\s*$/ }, label: "New dashboard", holdMs: 1500 },
    { id: "name", caption: "Đặt tên dashboard.", action: "fill", target: '[role="dialog"] input[type="text"] >> nth=0', value: DASHBOARD_NAME, label: "Tên dashboard" },
    { id: "options", caption: "Tuỳ chọn: Allow executive summary (tóm tắt bằng AI), Allow sharing stories/scenarios. Chỉ bật khi đơn vị cho phép.", action: "shot", target: { text: /^\s*Allow executive summary\s*$/ }, label: "Tuỳ chọn", holdMs: 1200 },
    { id: "submit", caption: "Bấm Publish dashboard.", action: "click", target: { role: "button", name: /^publish dashboard$/i }, label: "Publish dashboard", waitAfter: { label: "Xuất bản", url: /\/dashboards\//, timeoutMs: 120_000 } },
    { id: "record", caption: "Ghi dashboard.", action: "custom", shot: false, run: async (ctx) => ctx.recordCreated("dashboard", DASHBOARD_NAME, ctx.page.url()) },
    { id: "dashboard", caption: "Dashboard đã xuất bản.", action: "shot", noAnnotate: true, holdMs: 5000 },
    { id: "probe", caption: "dò", action: "custom", shot: false, run: async (ctx) => { const b = await ctx.page.locator("button[aria-label], button").evaluateAll((els) => els.map((e) => (e.getAttribute("aria-label") || e.textContent || "").trim()).filter((x) => x && x.length < 40)); console.log("BTNS:", [...new Set(b)].join(" | ")); } },
  ],
};

export default flow;
