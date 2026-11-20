/** 11.5 Tạo tài liệu từ chat: Document -> mô tả -> bản .docx (View / Download / Open in Word). */
import type { Flow } from "../lib/flow";

const flow: Flow = {
  name: "q11-5-tao-tai-lieu",
  title: "Tạo tài liệu, slide và hình từ chat",
  auth: "session",
  steps: [
    { id: "buttons", caption: "Dưới ô chat có các nút tạo nhanh: Research, Document, Presentation, Visual.", action: "shot", target: { text: /^\s*Document\s*$/ }, label: "Nút tạo nhanh", holdMs: 1000 },
    { id: "document", caption: "Bấm Document.", action: "click", target: { text: /^\s*Document\s*$/ }, label: "Document", shotWhen: "after", holdMs: 1200 },
    {
      id: "describe",
      caption: "Mô tả tài liệu cần tạo: mục đích, người đọc, độ dài, các ý chính.",
      action: "type",
      target: { placeholder: /ask|describe|document/i },
      value: "Soạn bản tóm tắt một trang về Pháp lệnh ngoại hối của Việt Nam cho nhân viên mới: phạm vi, các loại giao dịch, nguyên tắc sử dụng ngoại hối.",
      label: "Mô tả tài liệu",
    },
    {
      id: "send",
      caption: "Gửi yêu cầu và chờ Quick tạo tài liệu (có thể mất vài phút).",
      action: "click",
      target: { role: "button", name: /^send$/i },
      label: "Gửi",
      shotWhen: "before",
      waitAfter: { label: "Quick đang tạo tài liệu", visible: { role: "button", name: /^\s*Download\s*$/ }, timeoutMs: 420_000 },
    },
    { id: "result", caption: "Tài liệu tạo xong: View để xem, Download để tải tệp .docx, Open in Word để mở bằng Word. Kiểm tra lại nội dung trước khi dùng.", action: "shot", target: { role: "button", name: /^\s*Download\s*$/ }, label: "Tải tài liệu", holdMs: 1500 },
  ],
};

export default flow;
