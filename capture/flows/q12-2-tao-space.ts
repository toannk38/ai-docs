/**
 * 12.2 Tạo Space và tải tài liệu (văn bản luật công khai). Ghi Space vào capture/out/created.json.
 * Chạy lại: nếu Space cùng tên đã tồn tại -> dừng (tránh tạo trùng); xoá Space demo cũ trước khi chạy lại.
 */
import type { Flow, FlowContext } from "../lib/flow";

export const SPACE_NAME = "Văn bản pháp luật ngân hàng (demo)";
const LAW_DIR = "../../demo_docs/tài chính ngân hàng";
export const LAWS = [
  `${LAW_DIR}/100728_l47qh_LUẬT CÁC TỔ CHỨC TÍN DỤNG.doc`,
  `${LAW_DIR}/100694_l46qh_LUẬT NGÂN HÀNG NHÀ NƯỚC VIỆT NAM.doc`,
  `${LAW_DIR}/57734_pl28tvqh_PHÁP LỆNH NGOẠI HỐI.doc`,
  `${LAW_DIR}/97804_l20qh_LUẬT SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA LUẬT CÁC TỔ CHỨC TÍN DỤNG.doc`,
];

const spacesUrl = (ctx: FlowContext) =>
  `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/spaces`;

async function allReady(ctx: FlowContext): Promise<boolean> {
  const rows = ctx.page.locator("tbody tr");
  const total = await rows.count();
  if (total < LAWS.length) return false;
  const ready = await ctx.page.locator("tbody tr", { hasText: /Ready/ }).count();
  return ready >= LAWS.length;
}

const flow: Flow = {
  name: "q12-2-tao-space",
  title: "Tạo Space và tải tài liệu lên",
  auth: "session",
  start: spacesUrl,
  steps: [
    {
      id: "guard",
      caption: "Kiểm tra chưa có Space demo cùng tên.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.waitForTimeout(2500);
        if (await ctx.page.getByText(SPACE_NAME, { exact: true }).first().isVisible().catch(() => false)) {
          throw new Error(`Space "${SPACE_NAME}" đã tồn tại — xoá Space demo cũ trước khi chạy lại flow.`);
        }
      },
    },
    { id: "spaces", caption: "Mở Spaces trên thanh điều hướng, bấm Create space.", action: "click", target: { role: "button", name: /^create space$/i }, label: "Create space" },
    { id: "dialog", caption: "Hộp thoại Create your space hiện ra.", action: "shot", target: { placeholder: /name your space/i }, label: "Tên Space" },
    { id: "name", caption: "Đặt tên Space rõ mục đích.", action: "type", target: { placeholder: /name your space/i }, value: SPACE_NAME, label: "Tên Space" },
    {
      id: "description",
      caption: "Mô tả mục tiêu của Space (giúp Quick trả lời đúng ngữ cảnh).",
      action: "type",
      target: { placeholder: /describe your goals/i },
      value: "Tra cứu nhanh các văn bản pháp luật công khai về ngân hàng: Luật Các tổ chức tín dụng, Luật Ngân hàng Nhà nước, Pháp lệnh ngoại hối. Dữ liệu minh hoạ.",
      label: "Mô tả",
    },
    {
      id: "create",
      caption: "Bấm Create.",
      action: "click",
      target: { role: "button", name: /^create$/i },
      label: "Create",
      waitAfter: { label: "Tạo Space", url: /\/spaces\/[0-9a-f-]{20,}/, timeoutMs: 60_000 },
    },
    {
      id: "record",
      caption: "Ghi lại Space demo đã tạo.",
      action: "custom",
      shot: false,
      run: async (ctx) => ctx.recordCreated("space", SPACE_NAME, ctx.page.url()),
    },
    { id: "add", caption: "Trong Space, bấm Add để thêm nội dung: Create folder, Add knowledge, Upload files, Upload folder.", action: "click", target: { role: "button", name: /^add$/i }, label: "Add", shotWhen: "after", holdMs: 1200 },
    {
      id: "upload",
      caption: "Chọn Upload files rồi chọn các tệp từ máy tính (cửa sổ chọn tệp của Windows hiện ra). Chỉ tải tài liệu đã được phép.",
      action: "upload",
      target: { text: /^\s*Upload files\s*$/ },
      files: LAWS,
      label: "Upload files",
      shotWhen: "before",
      waitAfter: { label: "Tải tệp lên", visible: { text: /LUẬT CÁC TỔ CHỨC TÍN DỤNG/i }, timeoutMs: 120_000 },
    },
    { id: "processing", caption: "Tài liệu đang được xử lý (trạng thái chưa Ready). Chờ đến khi tất cả chuyển sang Ready.", action: "shot", target: "tbody", label: "Trạng thái xử lý" },
    {
      id: "wait-ready",
      caption: "Chờ Quick xử lý xong tài liệu.",
      action: "waitFor",
      shot: false,
      waitAfter: { label: "Quick đang xử lý tài liệu", until: allReady, timeoutMs: 900_000 },
    },
    { id: "ready", caption: "Tất cả tài liệu ở trạng thái Ready: Space sẵn sàng để hỏi đáp.", action: "shot", target: { text: /^\s*Ready\s*$/ }, label: "Ready", holdMs: 1500 },
  ],
};

export default flow;
