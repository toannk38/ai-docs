/** 14.2 Đọc, kiểm chứng (mở trích dẫn) và chia sẻ báo cáo Research. */
import type { Flow } from "../lib/flow";

const TITLE = /^So sánh quy định về loại hình tổ chức tín dụng/;

const flow: Flow = {
  name: "q14-2-kiem-chung-research",
  title: "Đọc, kiểm chứng và chia sẻ báo cáo",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/research`,
  steps: [
    { id: "settle", caption: "Chờ.", action: "hold", holdMs: 4000, shot: false },
    { id: "list", caption: "Mở Research: research đã xong có trạng thái Investigation complete. Bấm tên để mở báo cáo.", action: "click", target: { text: TITLE }, label: "Báo cáo", shotWhen: "before", waitAfter: { label: "Mở báo cáo", visible: { role: "button", name: /^summarize$/i }, timeoutMs: 90_000 }, holdMs: 4000 },
    { id: "report", caption: "Báo cáo: mục lục bên trái (Executive Summary, các phần), nội dung có trích dẫn; Version, Share, Summarize ở góc phải.", action: "shot", target: { text: /^\s*Executive Summary\s*$/ }, label: "Mục lục", holdMs: 1500 },
    { id: "cite", caption: "Bấm vào trích dẫn (số nhỏ cạnh câu) để mở nguồn.", action: "click", target: 'button[aria-label="Open citation"]:visible >> nth=0', label: "Trích dẫn", shotWhen: "after", holdMs: 3000 },
    { id: "cite-close", caption: "Đóng.", action: "press", value: "Escape", shot: false, holdMs: 800 },
    { id: "materials", caption: "Tab Materials: các nguồn đã dùng (Space được chọn).", action: "click", target: { text: /^\s*Materials\s*$/ }, label: "Materials", shotWhen: "after", holdMs: 2000 },
    { id: "share", caption: "Bấm Share để chia sẻ hoặc xuất báo cáo.", action: "click", target: { role: "button", name: /^share$/i }, label: "Share", shotWhen: "before", holdMs: 2000 },
    { id: "share-menu", caption: "Menu Share: Share research (chia sẻ trong Quick), Download PDF / Download Word (tải về), Add to space (lưu báo cáo vào Space).", action: "shot", target: { text: /^\s*Download PDF\s*$/ }, label: "Tải về / lưu vào Space", holdMs: 800 },
    { id: "share-dlg", caption: "Chọn Share research: hộp thoại chia sẻ — chọn người nhận và mức quyền như khi chia sẻ Space.", action: "click", target: { text: /^\s*Share research\s*$/ }, label: "Share research", shot: false, holdMs: 2500 },
    { id: "share-dlg-shot", caption: "Hộp thoại chia sẻ research.", action: "shot", noAnnotate: true },
    { id: "probe", caption: "dò", action: "custom", shot: false, run: async (ctx) => { const t = (await ctx.page.locator('[role="dialog"]:visible').allInnerTexts()).join(" || ").replace(/\s+/g, " "); console.log("DLG:", t.slice(0, 800)); } },
    { id: "close", caption: "Đóng hộp thoại (không chia sẻ trong bản demo).", action: "press", value: "Escape", shot: false },
  ],
};

export default flow;
