/** 15.2 (phần 3) Chạy thử flow đã Publish với tệp .docx, rồi chia sẻ tới toannk2_reader (Viewer). */
import type { Flow, FlowContext } from "../lib/flow";
import { createdUrl } from "./_created";
import { FLOW_NAME } from "./q15-2-tao-flow";
import { RECIPIENT } from "./q12-6-chia-se-agent";

const DOCX = "../raw/converted/57734_pl28tvqh_PHÁP LỆNH NGOẠI HỐI.docx";
const runDone = async (ctx: FlowContext) => ctx.page.getByRole("button", { name: /^start a new run$/i }).first().isVisible().catch(() => false);
const dismiss = async (ctx: FlowContext) => { await ctx.page.waitForTimeout(1500); const b = ctx.page.getByRole("button", { name: /^dismiss all$/i }).first(); if (await b.isVisible().catch(() => false)) await b.click({ force: true }); await ctx.page.waitForTimeout(800); };

const flow: Flow = {
  name: "q15-2-chay-thu-chia-se",
  title: "Chạy thử và chia sẻ flow",
  auth: "session",
  start: (ctx) => createdUrl("flow", FLOW_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`).replace(/\/edit$/, ""),
  steps: [
    { id: "wait", caption: "Mở flow.", action: "waitFor", shot: false, waitAfter: { label: "Tải flow", visible: { role: "button", name: /^share$/i }, timeoutMs: 120_000 }, holdMs: 3000 },
    { id: "coach", caption: "Đóng hướng dẫn nổi.", action: "custom", shot: false, run: dismiss },
    { id: "runmode", caption: "Flow đã Publish (nhãn Published); ở Run mode, bước đầu chờ bạn tải tệp.", action: "shot", target: { text: /^\s*Published\s*$/ }, label: "Published", holdMs: 1000 },
    {
      id: "upload",
      caption: "Ở bước tải tệp, chọn văn bản cần tóm tắt (Word .docx hoặc PDF; chỉ tài liệu được phép).",
      action: "upload",
      target: { text: /browse for files/i },
      files: [DOCX],
      label: "Chọn tệp",
      shotWhen: "before",
      waitAfter: { label: "Tải tệp", visible: { text: /\.docx\s*$/ }, timeoutMs: 120_000 },
      holdMs: 2000,
    },
    { id: "coach2", caption: "Đóng hướng dẫn nổi.", action: "custom", shot: false, run: dismiss },
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
