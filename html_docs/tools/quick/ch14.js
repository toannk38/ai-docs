"use strict";

/** Chương 14 — trang việc: Quick Research. */
const { DOCS, task, fig } = require("./common");

const CAPTURED = { capturedAt: "2026-11-19" };

module.exports = [
  // -------------------------------------------------------------------------
  task({
    id: "14.1",
    parentId: 14,
    slug: "chapter-14-1-tao-research.html",
    navTitle: "Tạo một nghiên cứu",
    title: "Tạo một nghiên cứu",
    summary: "Viết mục tiêu cụ thể, chọn chế độ, chọn nguồn tối thiểu (ví dụ một Space), xem kế hoạch rồi bắt đầu. Chế độ Fast mất khoảng 5–10 phút.",
    statusText: "Mọi user Amazon Quick tại NAB được dùng Quick Research.",
    searchKeywords: ["research", "new research", "nghiên cứu", "research mode", "fast", "deep", "web search", "quick assets", "plan"],
    capture: { flow: "q14-1-tao-research", ...CAPTURED },
    objectives: ["Tạo nghiên cứu với mục tiêu rõ và nguồn được phép.", "Kiểm tra kế hoạch trước khi chạy."],
    prerequisites: [
      "Tài liệu nguồn đã có trong Space hoặc là tệp được phép (File uploads nhận .csv, .docx, .pdf, .xls, .xlsx; tối đa 20 tệp).",
      "Tìm kiếm web chỉ bật khi được phép dùng nguồn web cho việc này.",
    ],
    tables: [
      {
        caption: "Chế độ nghiên cứu (theo giao diện, 19/11/2026)",
        headers: ["Chế độ", "Thời gian ước tính", "Dùng khi"],
        rows: [
          ["Fast", "5–10 phút", "Câu hỏi rõ, nguồn ít"],
          ["Deep", "20–30 phút", "Cần phân tích sâu, kết quả dài; tệp PowerPoint/Excel làm lâu hơn"],
        ],
      },
    ],
    walkthroughs: [
      {
        title: "Tạo nghiên cứu với nguồn là Space",
        intro: "Ví dụ: so sánh quy định về loại hình tổ chức tín dụng giữa các văn bản trong Space văn bản pháp luật.",
        steps: [
          { text: "Mở **Research** trên thanh điều hướng, bấm **New research**.", figure: fig("14-1", 1, "Trang Research với nút New research", "New research") },
          { text: "**Research objective**: viết mục tiêu cụ thể — câu hỏi, phạm vi, nguồn được dùng, cách trình bày (ví dụ có bảng so sánh, trích số điều).", figure: fig("14-1", 2, "Ô Research objective đã nhập mục tiêu tiếng Việt", "Mục tiêu nghiên cứu") },
          { text: "Bấm **Research mode** để chọn **Fast** hoặc **Deep**.", figure: fig("14-1", 3, "Menu Research mode: Fast 5–10 phút, Deep 20–30 phút", "Chế độ nghiên cứu") },
          { text: "**Web search**: tắt khi chỉ được dùng tài liệu nội bộ đã chọn.", figure: fig("14-1", 4, "Công tắc Web search đã tắt", "Tắt Web search") },
          { text: "Bật **Quick assets** để dùng tài liệu đã có trong Quick (Space, dashboard…).", figure: fig("14-1", 5, "Công tắc Quick assets đã bật", "Bật Quick assets") },
          { text: "Chọn **Select data and apps** (chỉ dùng nguồn bạn chọn), bấm **Browse**.", figure: fig("14-1", 6, "Hộp thoại Add Quick assets mở từ Browse", "Browse") },
          { text: "Tab **Spaces**: tích chọn Space cần dùng, bấm **Add**.", figure: fig("14-1", 7, "Space văn bản pháp luật được tích chọn, nút Add", "Chọn Space") },
          { text: "Space đã được thêm (**Spaces (1)**); **Review plan** và **Start researching** sáng lên.", figure: fig("14-1", 8, "Quick assets hiển thị Spaces (1)", "Nguồn đã chọn") },
          { text: "Bấm **Review plan** để xem kế hoạch trước khi chạy.", figure: fig("14-1", 9, "Nút Review plan", "Review plan") },
          { text: "Kế hoạch: **Topics to explore** (các mục sẽ nghiên cứu); khung **Research** bên phải nêu điểm cần làm rõ, ô **What can I do to make it better?** và **Revise plan** để chỉnh. Kế hoạch ổn thì bấm **Start researching**.", figure: fig("14-1", 10, "Kế hoạch nghiên cứu với Topics to explore và nút Start researching", "Kiểm tra kế hoạch") },
        ],
        verify: "Research xuất hiện trong danh sách với trạng thái đang chạy (Investigating topics), sau đó Investigation complete.",
      },
    ],
    troubleshooting: [
      { symptom: "Review plan, Start researching bị mờ", cause: "Chưa bật nguồn nào", action: "Bật ít nhất một nguồn (Web search, File uploads hoặc Quick assets)." },
      { symptom: "Tải tệp báo invalid characters / không nhận tệp", cause: "Định dạng không hỗ trợ (ví dụ .doc)", action: "Dùng .docx/.pdf, hoặc đưa tài liệu vào Space rồi chọn Space ở Quick assets." },
      { symptom: "Kế hoạch quá rộng hoặc lạc đề", cause: "Mục tiêu chưa cụ thể", action: "Sửa mục tiêu hoặc dùng Revise plan trước khi chạy." },
    ],
    faqs: [
      ["Research mất bao lâu?", "Theo giao diện: Fast khoảng 5–10 phút, Deep khoảng 20–30 phút. Có thể rời trang và quay lại mục Research."],
      ["Nên chọn cả All data and apps cho tiện không?", "Không. Chọn nguồn tối thiểu cần thiết (Select data and apps) để kết quả đúng phạm vi và không lấy dữ liệu ngoài nhu cầu."],
      ["Có bật Web search được không?", "Chỉ khi việc nghiên cứu được phép dùng nguồn web; không đưa dữ liệu nội bộ nhạy cảm vào mục tiêu khi bật web."],
    ],
    controls: [
      "Chọn nguồn tối thiểu cần thiết; không kết hợp web với dữ liệu nội bộ khi chưa được duyệt.",
      "Kiểm tra kế hoạch trước khi chạy; kế hoạch có nguồn chưa duyệt thì sửa lại.",
    ],
    sources: [DOCS.research, DOCS.security],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "14.2",
    parentId: 14,
    slug: "chapter-14-2-kiem-chung-chia-se-research.html",
    navTitle: "Đọc, kiểm chứng và chia sẻ báo cáo",
    title: "Đọc, kiểm chứng và chia sẻ báo cáo nghiên cứu",
    summary: "Mở báo cáo khi research xong, bấm trích dẫn để đối chiếu nguồn, kiểm tra tab Materials, rồi tải về hoặc chia sẻ đúng người.",
    statusText: "Mọi user Amazon Quick tại NAB được dùng Quick Research.",
    searchKeywords: ["research", "báo cáo", "trích dẫn", "citation", "materials", "download pdf", "download word", "add to space", "share research"],
    capture: { flow: "q14-2-kiem-chung-research", ...CAPTURED },
    objectives: ["Đọc báo cáo và kiểm chứng trích dẫn.", "Tải về hoặc chia sẻ báo cáo đúng quy định."],
    prerequisites: ["Research đã ở trạng thái **Investigation complete**."],
    walkthroughs: [
      {
        title: "Đọc và kiểm chứng",
        intro: "Báo cáo ví dụ so sánh Luật sửa đổi 2004 (20/2004/QH11) với Luật Các TCTD 2010 (47/2010/QH12) từ Space văn bản pháp luật.",
        steps: [
          { text: "Mở **Research**, bấm tên research có trạng thái **Investigation complete**.", figure: fig("14-2", 1, "Danh sách Research với trạng thái Investigation complete", "Mở báo cáo") },
          { text: "Báo cáo: mục lục bên trái (Executive Summary, các phần), nội dung có số trích dẫn; góc phải có **Version**, **Share**, **Summarize**; khung **Comments** để góp ý cho phiên bản sau.", figure: fig("14-2", 2, "Báo cáo nghiên cứu với mục lục và bảng so sánh", "Báo cáo") },
          { text: "Bấm số trích dẫn để xem đoạn nguồn và tên tệp; mở tài liệu gốc đối chiếu điều, khoản.", figure: fig("14-2", 3, "Popup trích dẫn hiện tên văn bản và đoạn nguồn", "Mở trích dẫn") },
          { text: "Tab **Materials**: kiểm tra nguồn đã dùng (Web search tắt, Quick assets: Spaces (1)).", figure: fig("14-2", 4, "Tab Materials liệt kê nguồn nghiên cứu", "Kiểm tra nguồn") },
        ],
        verify: "Các nhận định quan trọng đã được đối chiếu với văn bản gốc; nguồn đúng phạm vi.",
      },
      {
        title: "Tải về và chia sẻ",
        intro: "Báo cáo là dữ liệu mới — quản lý như tài liệu nội bộ.",
        steps: [
          { text: "Bấm **Share**: **Share research**, **Download PDF**, **Download Word**, **Add to space**.", figure: fig("14-2", 5, "Menu Share với Download PDF, Download Word, Add to space", "Menu Share") },
          { text: "**Share research**: tìm người nhận, chọn mức quyền, bấm Share; danh sách **Shared with** và **Copy link** như khi chia sẻ Space (12.3).", figure: fig("14-2", 6, "Hộp thoại Share của research", "Chia sẻ research") },
        ],
        verify: "Tệp tải về được lưu đúng nơi và gắn nhãn; người nhận đúng và đã được duyệt.",
      },
    ],
    troubleshooting: [
      { symptom: "Trích dẫn không khớp nội dung nhận định", cause: "AI diễn giải sai hoặc trích một phần", action: "Loại bỏ hoặc sửa nhận định; ghi chú vào Comments để tạo phiên bản sau." },
      { symptom: "Báo cáo dùng nguồn ngoài dự kiến", cause: "Bật Web search hoặc All data and apps", action: "Tạo lại research chỉ với nguồn được phép." },
    ],
    faqs: [
      ["Trích dẫn có bảo đảm nhận định đúng?", "Không. Mở nguồn, đọc đủ ngữ cảnh và đối chiếu văn bản gốc."],
      ["Có chia sẻ báo cáo ra ngoài NAB được không?", "Không. Chỉ chia sẻ nội bộ với người cần; tệp PDF/Word lưu vào kho NAB được phép."],
      ["Add to space để làm gì?", "Lưu báo cáo vào Space để đồng nghiệp có quyền Space tra cứu cùng tài liệu gốc."],
    ],
    controls: [
      "Báo cáo nghiên cứu là dữ liệu mới: gắn nhãn phân loại theo nguồn nhạy cảm nhất, ghi ai tạo, ai kiểm tra.",
      "Không gửi nguyên văn báo cáo AI cho bên liên quan khi chưa kiểm chứng.",
      "Chia sẻ đúng người, quyền tối thiểu, không ra ngoài NAB.",
    ],
    sources: [DOCS.research, DOCS.security],
  }),
];
