/** 12.1 Hỏi đáp tài liệu trong Space (khung chat của Space + cách chọn Space từ ô chat chính). */
import type { Flow } from "../lib/flow";
import { createdUrl } from "./_created";
import { SPACE_NAME } from "./q12-2-tao-space";

const flow: Flow = {
  name: "q12-1-hoi-dap-space",
  title: "Hỏi đáp tài liệu trong Space",
  auth: "session",
  start: (ctx) => createdUrl("space", SPACE_NAME).replace("/account/opba-ai/", `/account/${ctx.config.accountName}/`),
  steps: [
    { id: "space", caption: "Mở Spaces và chọn Space cần tra cứu. Bên trái là danh sách tài liệu, bên phải là khung chat của Space.", action: "shot", target: { placeholder: /ask a question/i }, label: "Khung chat của Space" },
    {
      id: "ask",
      caption: "Nhập câu hỏi về nội dung tài liệu trong Space.",
      action: "type",
      target: { placeholder: /ask a question/i },
      value: "Theo Luật Các tổ chức tín dụng, tổ chức tín dụng gồm những loại hình nào? Trả lời ngắn gọn, nêu điều luật.",
      label: "Câu hỏi",
    },
    {
      id: "send",
      caption: "Bấm gửi và chờ Quick trả lời.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      label: "Gửi",
      waitAfter: { label: "Quick đang trả lời", visible: { role: "button", name: /^sources$/i }, timeoutMs: 300_000 },
    },
    { id: "answer", caption: "Câu trả lời dựa trên tài liệu trong Space, có trích dẫn tới đúng văn bản.", action: "shot", target: { role: "button", name: /^sources$/i }, label: "Trích dẫn tài liệu", holdMs: 1500 },
    { id: "sources", caption: "Bấm Sources.", action: "click", target: { role: "button", name: /^sources$/i }, label: "Sources", shot: false },
    { id: "sources-panel", caption: "Panel Sources liệt kê tài liệu nguồn; mở và đối chiếu điều luật trước khi dùng.", action: "shot", target: { text: /Sources powering the conversation/i }, label: "Tài liệu nguồn", holdMs: 1500 },
    {
      id: "home",
      caption: "Cách khác: từ ô chat ở trang chủ, chọn phạm vi dữ liệu.",
      action: "goto",
      value: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/home`,
      shot: false,
    },
    { id: "scope", caption: "Ở ô chat trang chủ, bấm All data → Specific data rồi chọn Space (hoặc chọn Space trong mục Recently viewed) để chỉ hỏi trên tài liệu của Space đó.", action: "click", target: { role: "button", name: /^all data$/i }, label: "Chọn Specific data / Space", shotWhen: "after", holdMs: 1500 },
  ],
};

export default flow;
