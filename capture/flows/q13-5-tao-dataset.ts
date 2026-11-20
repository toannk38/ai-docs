/** 13.5* Tạo dataset từ tệp CSV giả lập (demo_docs/aws-quick-demo-data.csv). */
import type { Flow } from "../lib/flow";

export const DATASET_NAME = "aws-quick-demo-data";
const CSV = "../../demo_docs/aws-quick-demo-data.csv";

const flow: Flow = {
  name: "q13-5-tao-dataset",
  title: "Tạo dataset từ tệp",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/data?tab=dataset`,
  steps: [
    {
      id: "guard",
      caption: "Kiểm tra chưa có dataset demo.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.waitForTimeout(3000);
        if (await ctx.page.getByText(new RegExp(DATASET_NAME)).first().isVisible().catch(() => false)) {
          throw new Error(`Dataset ${DATASET_NAME} đã tồn tại — dùng lại, không tạo trùng.`);
        }
      },
    },
    { id: "data", caption: "Mở Data, tab Datasets, bấm Create dataset.", action: "click", target: { role: "button", name: /^create dataset$/i }, label: "Create dataset", shotWhen: "before", waitAfter: { label: "Mở nguồn dữ liệu", visible: { role: "button", name: /^upload file$/i }, timeoutMs: 60_000 } },
    { id: "sources", caption: "Hộp thoại Create dataset: chọn nguồn dữ liệu có sẵn hoặc bấm Upload file để tải tệp từ máy tính.", action: "shot", target: { role: "button", name: /^upload file$/i }, label: "Upload file" },
    {
      id: "upload",
      caption: "Chọn tệp CSV/Excel từ máy tính (cửa sổ chọn tệp của Windows hiện ra). Chỉ dùng dữ liệu được phép.",
      action: "upload",
      target: { role: "button", name: /^upload file$/i },
      files: [CSV],
      label: "Upload",
      shot: false,
      waitAfter: { label: "Tải và đọc tệp", visible: { text: /Chi nhánh|Ngày/ }, timeoutMs: 180_000 },
    },
    { id: "preview", caption: "Hộp thoại Confirm file upload settings: kiểm tra tên cột tiếng Việt hiển thị đúng, rồi bấm Next.", action: "shot", target: { role: "button", name: /^next$/i }, label: "Next", holdMs: 1500 },
    { id: "next", caption: "Bấm Next.", action: "click", target: { role: "button", name: /^next$/i }, shot: false, waitAfter: { label: "Tạo dataset", until: async (ctx) => !(await ctx.page.getByText(/Confirm file upload settings/i).first().isVisible().catch(() => false)), timeoutMs: 120_000 } },
    { id: "details", caption: "Hộp thoại Data source details: dữ liệu được nạp vào SPICE. Bấm Visualize để tạo phân tích, hoặc Edit/Preview data để chỉnh cột trước.", action: "shot", target: { role: "button", name: /^visualize$/i }, label: "Visualize", holdMs: 1200 },
    { id: "visualize", caption: "Bấm Visualize.", action: "click", target: { role: "button", name: /^visualize$/i }, shot: false, waitAfter: { label: "Tạo phân tích", url: /analyses|analysis/i, timeoutMs: 120_000 } },
    { id: "record", caption: "Ghi dataset + analysis.", action: "custom", shot: false, run: async (ctx) => { ctx.recordCreated("dataset", DATASET_NAME, ctx.page.url()); ctx.recordCreated("analysis", DATASET_NAME + " analysis", ctx.page.url()); } },
    { id: "new-sheet", caption: "Phân tích mới.", action: "shot", noAnnotate: true, holdMs: 4000 },
    { id: "probe", caption: "dò", action: "custom", shot: false, run: async (ctx) => { const b = await ctx.page.locator('[role="dialog"] button, [role="dialog"] [role="radio"], [role="dialog"] label').allInnerTexts(); console.log("DIALOG:", b.map((x) => x.trim()).filter(Boolean).join(" | ")); console.log("URL:", ctx.page.url().replace(/account\/[^/]+/, "account/X")); } },
  ],
};

export default flow;
