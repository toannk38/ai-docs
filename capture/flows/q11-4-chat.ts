/** 11.4 Chat với Amazon Quick: phạm vi dữ liệu, chế độ, đính kèm tệp, hỏi, xem nguồn, Private mode. */
import type { Flow } from "../lib/flow";

const LAW = "../../demo_docs/tài chính ngân hàng/57734_pl28tvqh_PHÁP LỆNH NGOẠI HỐI.doc";

const flow: Flow = {
  name: "q11-4-chat",
  title: "Chat với Amazon Quick",
  auth: "session",
  steps: [
    { id: "new-chat", caption: "Bấm New chat để bắt đầu cuộc trò chuyện mới.", action: "click", target: { text: /^\s*New chat\s*$/ }, label: "New chat" },
    { id: "private", caption: "Nút Private mode (góc phải trên): bật khi thảo luận nội dung không muốn lưu vào bộ nhớ hội thoại. Private mode không thay thế chính sách dữ liệu NAB.", action: "shot", target: { text: /^\s*Private mode\s*$/ }, label: "Private mode" },
    { id: "scope", caption: "Bấm All data để chọn phạm vi dữ liệu: General knowledge (kiến thức chung), All data (thêm dữ liệu bạn có quyền), Specific data (chỉ Space/dashboard/tệp bạn chọn).", action: "click", target: { role: "button", name: /^all data$/i }, label: "Phạm vi dữ liệu", shotWhen: "after", holdMs: 1500 },
    { id: "close-scope", caption: "Đóng menu.", action: "press", value: "Escape", shot: false },
    { id: "mode", caption: "Bấm Smart để chọn chế độ: Fast (nhanh), Smart (cân bằng — mặc định), Advanced (suy luận kỹ cho câu hỏi phức tạp).", action: "click", target: { role: "button", name: /^smart$/i }, label: "Chế độ trả lời", shotWhen: "after", holdMs: 1500 },
    { id: "close-mode", caption: "Đóng menu.", action: "press", value: "Escape", shot: false },
    { id: "plus", caption: "Bấm nút + để đính kèm tệp (File upload) hoặc dùng công cụ khác.", action: "click", target: { role: "button", name: /^more actions$/i }, label: "Nút +", shotWhen: "after", holdMs: 1200 },
    {
      id: "upload",
      caption: "Chọn File upload rồi chọn tệp từ máy tính (cửa sổ chọn tệp của Windows hiện ra). Chỉ đính kèm tệp được phép theo phân loại dữ liệu NAB.",
      action: "upload",
      target: { text: /^\s*File upload\s*$/ },
      files: [LAW],
      label: "File upload",
      shotWhen: "before",
      waitAfter: { label: "Tải tệp lên", visible: { text: /PHÁP LỆNH NGOẠI HỐI/i }, timeoutMs: 90_000 },
    },
    { id: "attached", caption: "Tệp đã đính kèm hiện ngay trong ô chat.", action: "shot", target: { text: /PHÁP LỆNH NGOẠI HỐI/i }, label: "Tệp đính kèm" },
    {
      id: "ask",
      caption: "Nhập câu hỏi rõ ràng: nêu phạm vi, yêu cầu trả lời ngắn và dựa trên tài liệu.",
      action: "type",
      target: { placeholder: /ask a question/i },
      value: "Theo tài liệu đính kèm, Pháp lệnh ngoại hối quy định những nội dung chính nào? Trả lời ngắn gọn, có dẫn nguồn.",
      label: "Câu hỏi",
    },
    {
      id: "send",
      caption: "Bấm gửi và chờ Quick trả lời xong.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      label: "Gửi",
      shotWhen: "before",
      waitAfter: { label: "Quick đang trả lời", visible: { role: "button", name: /^sources$/i }, timeoutMs: 300_000 },
    },
    { id: "answer", caption: "Câu trả lời có trích dẫn nguồn ngay trong nội dung và nút Sources bên dưới.", action: "shot", target: { role: "button", name: /^sources$/i }, label: "Sources", holdMs: 1500 },
    { id: "sources", caption: "Bấm Sources để xem các nguồn Quick đã dùng; mở nguồn để kiểm chứng trước khi dùng câu trả lời.", action: "click", target: { role: "button", name: /^sources$/i }, label: "Nguồn trả lời", shotWhen: "after", holdMs: 1500 },
  ],
};

export default flow;
