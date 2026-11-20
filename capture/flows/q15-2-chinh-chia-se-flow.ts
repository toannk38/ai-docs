/** 15.2 (phần 2) Xem flow vừa tạo → Publish → chạy thử (Run mode, tệp .docx) → chia sẻ tới toannk2_reader (Viewer). */
import type { Flow, FlowContext } from "../lib/flow";
import { createdUrl } from "./_created";
import { FLOW_NAME } from "./q15-2-tao-flow";
import { RECIPIENT } from "./q12-6-chia-se-agent";

const DOCX = "../raw/converted/57734_pl28tvqh_PHÁP LỆNH NGOẠI HỐI.docx";
const runDone = async (ctx: FlowContext) => ctx.page.getByRole("button", { name: /^start a new run$/i }).first().isVisible().catch(() => false);

const flow: Flow = {
  name: "q15-2-chinh-chia-se-flow",
  title: "Xem, chạy thử và chia sẻ flow",
  auth: "session",
  start: (ctx) => createdUrl("flow", FLOW_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "wait", caption: "Mở flow.", action: "waitFor", shot: false, waitAfter: { label: "Tải flow", visible: { role: "button", name: /^publish$/i }, timeoutMs: 120_000 }, holdMs: 3000 },
    { id: "coach", caption: "Đóng hướng dẫn nổi.", action: "custom", shot: false, run: async (ctx) => { await ctx.page.waitForTimeout(2000); const b = ctx.page.getByRole("button", { name: /^dismiss all$/i }).first(); if (await b.isVisible().catch(() => false)) await b.click({ force: true }); await ctx.page.waitForTimeout(800); } },
    { id: "editor", caption: "Chế độ Editor: các bước Quick dựng theo mô tả; bấm vào một bước để sửa ở khung bên trái; Add step để thêm bước. Flow đang ở trạng thái Draft, tự lưu.", action: "shot", target: { role: "button", name: /add step/i }, label: "Thêm / sửa bước", holdMs: 1500 },
    { id: "publish", when: async (ctx) => ctx.page.getByRole("button", { name: /^publish$/i }).first().isEnabled().catch(() => false), caption: "Kiểm tra xong, bấm Publish.", action: "click", target: { role: "button", name: /^publish$/i }, label: "Publish", shotWhen: "before", holdMs: 1500 },
    { id: "publish-dlg", when: async (ctx) => ctx.page.getByRole("button", { name: /^publish$/i }).first().isEnabled().catch(() => false), caption: "Hộp thoại Publish Changes: thay đổi có hiệu lực ngay với người được chia sẻ. Bấm Publish.", action: "shot", target: { text: /Changes will be available immediately/i }, label: "Publish Changes", holdMs: 800 },
    {
      id: "publish-ok",
      when: async (ctx) => ctx.page.getByRole("button", { name: /^publish$/i }).first().isEnabled().catch(() => false),
      caption: "Xác nhận Publish.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        const btns = ctx.page.getByRole("button", { name: /^publish$/i });
        const n = await btns.count();
        for (let i = n - 1; i >= 0; i--) if (await btns.nth(i).isVisible().catch(() => false)) { await btns.nth(i).click(); break; }
        await ctx.page.waitForTimeout(4000);
        if (await ctx.page.getByText(/Changes will be available immediately/i).first().isVisible().catch(() => false)) throw new Error("Chưa publish được");
      },
    },
    { id: "runmode", caption: "Chuyển sang Run mode để chạy thử.", action: "click", target: { text: /^\s*Run mode\s*$/ }, label: "Run mode", shotWhen: "before", holdMs: 4000 },
    {
      id: "upload",
      caption: "Ở bước tải tệp, chọn văn bản cần tóm tắt (Word .docx hoặc PDF; chỉ tài liệu được phép).",
      action: "upload",
      target: { text: /browse for files/i },
      files: [DOCX],
      label: "Chọn tệp",
      shotWhen: "before",
      waitAfter: { label: "Tải tệp", visible: { text: /PHÁP LỆNH NGOẠI HỐI/i }, timeoutMs: 120_000 },
      holdMs: 2000,
    },
    { id: "start", caption: "Bấm Start để chạy.", action: "click", target: { role: "button", name: /^start$/i }, label: "Start", shotWhen: "before", holdMs: 10_000, waitAfter: { label: "Flow đang chạy", until: runDone, timeoutMs: 900_000 } },
    { id: "result", caption: "Kết quả chạy thử: kiểm tra tóm tắt và các điểm lưu ý có đúng điều, khoản trong văn bản không.", action: "shot", noAnnotate: true, holdMs: 2000 },
    { id: "share", caption: "Bấm Share để chia sẻ flow.", action: "click", target: { role: "button", name: /^share$/i }, label: "Share", shotWhen: "before", holdMs: 2000 },
    { id: "search", caption: `Gõ username hoặc email người nhận (ví dụ ${RECIPIENT}); mức quyền Viewer = chỉ chạy flow.`, action: "type", target: '[role="dialog"] input >> nth=0', value: RECIPIENT, noMask: true, label: "Người nhận", holdMs: 2500 },
    { id: "pick", caption: "Chọn đúng người nhận trong gợi ý.", action: "click", target: { text: new RegExp(`^\\s*${RECIPIENT}\\s*$`) }, label: "Chọn người nhận", shotWhen: "before", holdMs: 1000 },
    { id: "submit", caption: "Bấm Share.", action: "click", target: '[role="dialog"] button:text-is("Share")', label: "Share", shotWhen: "before", holdMs: 3000 },
    { id: "record", caption: "Ghi chia sẻ.", action: "custom", shot: false, run: async (ctx) => ctx.recordCreated("share-flow", `${FLOW_NAME} -> ${RECIPIENT}`, ctx.page.url()) },
    { id: "shared", caption: "Người nhận có trong Shared with. Không bật Share with all (mọi người trong account) nếu chưa được duyệt.", action: "shot", target: `[role="dialog"] >> text=${RECIPIENT}`, label: "Đã chia sẻ", holdMs: 1500 },
    { id: "close", caption: "Đóng.", action: "press", value: "Escape", shot: false },
  ],
};

export default flow;
