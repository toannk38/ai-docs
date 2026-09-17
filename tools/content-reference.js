"use strict";

const sourceDate = "19/08/2026";
const publicDataWarning = "Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.";
const commonControls = [
  "Chỉ sử dụng dữ liệu công khai; không nhập, tải lên hoặc kết nối dữ liệu của Nam A Bank.",
  "Không sử dụng tài khoản cá nhân hoặc địa chỉ thư điện tử NAB để tự đăng ký công cụ.",
  "Không cài tiện ích, ứng dụng hoặc connector để kết nối tới hệ thống hay dữ liệu nội bộ.",
  "Luôn mở nguồn, kiểm tra ngày, biên tập kết quả và chịu trách nhiệm về nội dung cuối."
];

function referenceChapter(config) {
  return Object.assign({
    group: "AI phổ biến — THAM KHẢO",
    eyebrow: "Tham khảo — chỉ dùng dữ liệu công khai",
    kind: "reference",
    statusLabel: "THAM KHẢO",
    statusText: publicDataWarning,
    publicDataOnly: true,
    audience: "Nhân sự NAB tìm hiểu công cụ bằng dữ liệu công khai",
    owner: "Khối CNTT và chuyên gia nghiệp vụ liên quan",
    controls: commonControls,
    sourceDate
  }, config);
}

module.exports = [
  referenceChapter({
    id: 16,
    slug: "chapter-16-chon-ai-theo-nhu-cau.html",
    navTitle: "Chọn AI theo nhu cầu",
    title: "Chọn công cụ AI theo nhu cầu công việc",
    summary: "Bắt đầu từ đầu ra cần hoàn thành, ưu tiên nền tảng đang dùng tại NAB và chỉ tham khảo AI công cộng với dữ liệu công khai.",
    objectives: ["Chọn công cụ theo công việc thay vì theo xu hướng.", "Ưu tiên Microsoft 365 và Amazon Quick khi phù hợp.", "Giữ ranh giới chỉ dùng dữ liệu công khai với AI tham khảo."],
    prerequisites: ["Đã đọc Chương 02.", "Xác định đầu ra và tiêu chí kiểm tra.", "Chỉ chuẩn bị nguồn công khai cho công cụ AI tham khảo."],
    useCases: [{ title: "Soạn thảo và cộng tác", text: "Ưu tiên Microsoft 365." }, { title: "Phân tích và nghiên cứu", text: "Ưu tiên Amazon Quick khi phù hợp." }, { title: "Tìm hiểu lựa chọn khác", text: "Chỉ dùng dữ liệu công khai." }],
    featureSections: [{
      id: "bang-chon-cong-cu",
      title: "Bảng chọn nhanh",
      blocks: [{
        type: "table",
        headers: ["Nhu cầu", "Ưu tiên tại NAB", "Lựa chọn tham khảo"],
        rows: [
          ["Viết, tóm tắt, soạn thảo", "Microsoft 365 Copilot, Word, Outlook", "ChatGPT, Claude hoặc Gemini — chỉ với dữ liệu công khai"],
          ["Họp và phối hợp", "Teams và Microsoft 365 Copilot", "Không cần dùng công cụ công cộng"],
          ["Phân tích dữ liệu, Dashboard", "Excel và Amazon Quick", "Chỉ tham khảo tài liệu công khai về phương pháp"],
          ["Nghiên cứu có nguồn", "Quick Research trong phạm vi được cấp", "Perplexity, Gemini hoặc Grok — chỉ với dữ liệu công khai"],
          ["Slide và nội dung trực quan", "PowerPoint và công cụ đã được NAB cho phép", "Canva AI, Gamma, Napkin AI, Microsoft Designer — chỉ với dữ liệu công khai"],
          ["Tự động hóa nhiều bước", "Nền tảng NAB đã được thẩm định", "Công cụ AI Agent chỉ để tìm hiểu kỹ thuật bằng dữ liệu công khai"]
        ]
      }]
    }],
    walkthroughs: [{
      title: "Chọn công cụ cho một thông cáo công khai",
      intro: "Ví dụ dùng thông cáo và tài liệu hướng dẫn công khai của nhà cung cấp.",
      steps: ["Xác định cần tóm tắt, so sánh hay tạo slide.", "Ưu tiên Microsoft 365 nếu tài khoản và tính năng phù hợp.", "Nếu tham khảo AI công cộng, chỉ dùng URL hoặc nội dung đã công khai.", "Yêu cầu nêu nguồn, ngày và điểm chưa chắc chắn.", "Mở nguồn và biên tập bản cuối."],
      verify: "Không có dữ liệu NAB trong đầu vào và mọi kết luận quan trọng đều được đối chiếu nguồn."
    }],
    faqs: [["Công cụ xuất hiện ở đây có nghĩa đã được NAB phê duyệt?", "Không. Danh sách chỉ giúp nhận biết lựa chọn theo nhu cầu."], ["Khi nào ưu tiên Microsoft 365?", "Khi công việc thuộc email, họp, soạn thảo, bảng tính hoặc trình bày và tính năng đã được cấp."], ["Khi nào ưu tiên Amazon Quick?", "Khi làm việc với Spaces, Chat Agents, dữ liệu, Analyses, Dashboards, Scenarios, Quick Research, Flows hoặc Automate theo quyền được cấp."], ["AI tham khảo được dùng dữ liệu nào?", publicDataWarning]],
    sources: [["Microsoft 365 Copilot documentation", "https://learn.microsoft.com/en-us/copilot/microsoft-365/"], ["Amazon Quick User Guide", "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"]]
  }),
  referenceChapter({
    id: 17,
    slug: "chapter-17-ai-hoi-thoai-tro-ly-da-nang.html",
    navTitle: "AI hội thoại và trợ lý đa năng",
    title: "AI hội thoại và trợ lý đa năng",
    summary: "Nhóm công cụ nhận yêu cầu bằng ngôn ngữ tự nhiên để hỗ trợ viết, phân tích, tìm hiểu và xử lý nhiều loại tác vụ với dữ liệu công khai.",
    objectives: ["Hiểu AI hội thoại và trợ lý đa năng là gì.", "So sánh công cụ theo thế mạnh, không xếp hạng.", "Chọn công cụ tham khảo theo nhu cầu."],
    prerequisites: ["Chỉ dùng nội dung công khai.", "Không đăng ký bằng địa chỉ thư điện tử NAB.", "Sẵn sàng kiểm tra nguồn và đầu ra."],
    useCases: [{ title: "Soạn thảo", text: "Tạo dàn ý hoặc biên tập nội dung công khai." }, { title: "Đọc tài liệu", text: "Tóm tắt tài liệu công khai dài." }, { title: "Tra cứu", text: "Tổng hợp thông tin Internet có nguồn." }],
    featureSections: [
      {
        id: "so-sanh-cong-cu",
        title: "So sánh theo thế mạnh",
        intro: "Không có công cụ tốt nhất cho mọi tình huống; lựa chọn phụ thuộc đầu ra và cách kiểm chứng.",
        blocks: [{
          type: "table",
          headers: ["Công cụ", "Thế mạnh chính", "Phù hợp khi"],
          rows: [
            ["ChatGPT", "Đa năng, viết, phân tích, lập trình, xử lý nhiều loại tác vụ", "Công việc tổng hợp"],
            ["Claude", "Đọc, phân tích và biên tập tài liệu dài", "Làm việc với nội dung, tài liệu"],
            ["Gemini", "Đa phương thức, tích hợp hệ sinh thái Google", "Tìm kiếm, tài liệu, hình ảnh"],
            ["Perplexity", "Tra cứu Internet, tổng hợp thông tin có nguồn", "Nghiên cứu và kiểm tra thông tin"],
            ["Grok", "AI hội thoại, tra cứu thông tin trực tuyến, nội dung cập nhật", "Theo dõi chủ đề mới, trao đổi và tìm hiểu thông tin trên Internet"]
          ]
        }]
      },
      {
        id: "chon-nhanh-theo-nhu-cau",
        title: "Chọn nhanh theo nhu cầu",
        blocks: [
          {
            type: "table",
            headers: ["Nhu cầu", "Công cụ tham khảo"],
            rows: [
              ["Viết, tóm tắt, soạn thảo", "ChatGPT, Claude, Gemini"],
              ["Đọc và phân tích tài liệu dài", "Claude, ChatGPT"],
              ["Tìm kiếm thông tin trên Internet", "Perplexity, Gemini, Grok"],
              ["Lập trình", "ChatGPT, Claude, Gemini"],
              ["Tổng hợp thông tin có nguồn", "Perplexity"],
              ["Theo dõi chủ đề mới / thông tin trực tuyến", "Grok, Perplexity, Gemini"]
            ]
          },
          { type: "callout", tone: "info", title: "Lưu ý", text: "Đây là gợi ý theo thế mạnh phổ biến, không phải bảng xếp hạng cố định. Năng lực các nền tảng AI thay đổi theo thời gian; nên đối chiếu thông tin từ nguồn chính thức và các cộng đồng chuyên môn đáng tin cậy." }
        ]
      }
    ],
    walkthroughs: [{
      title: "So sánh một chủ đề công khai",
      intro: "Dùng trang sản phẩm và tài liệu công khai của nhà cung cấp.",
      steps: ["Viết câu hỏi có phạm vi và ngày chốt thông tin.", "Chọn công cụ theo nhu cầu viết, đọc dài hoặc tra cứu web.", "Chỉ cung cấp nguồn công khai.", "Yêu cầu phân biệt dữ kiện, suy luận và điểm chưa chắc chắn.", "Mở nguồn chính thức và đối chiếu trước khi dùng."],
      verify: "Kết quả không chứa dữ liệu NAB và không trình bày suy luận như sự thật."
    }],
    faqs: [["Công cụ nào tốt nhất?", "Không có xếp hạng cố định; hãy chọn theo nhu cầu, nguồn và cách kiểm chứng."], ["Có thể tải tài liệu nội bộ lên để so sánh không?", "Không. Nhóm AI tham khảo chỉ được dùng với dữ liệu công khai."], ["Có nguồn trích dẫn thì đã đủ tin cậy chưa?", "Chưa. Cần mở nguồn, kiểm tra ngày, phạm vi và nội dung hỗ trợ kết luận."], ["Có thể dùng tài khoản cá nhân cho công việc NAB không?", "Không sử dụng tài khoản cá nhân hoặc địa chỉ thư điện tử NAB để tự đăng ký công cụ."]],
    sources: [["OpenAI product documentation", "https://help.openai.com/"], ["Anthropic Help Center", "https://support.anthropic.com/"], ["Google Gemini overview", "https://gemini.google.com/"], ["Perplexity Help Center", "https://www.perplexity.ai/help-center"], ["xAI Grok", "https://x.ai/grok"]]
  }),
  referenceChapter({
    id: 18,
    slug: "chapter-18-notebooklm-lam-viec-voi-tai-lieu.html",
    navTitle: "NotebookLM — Làm việc với tài liệu",
    title: "NotebookLM — Làm việc với tập tài liệu công khai",
    summary: "NotebookLM hỗ trợ hỏi đáp, tóm tắt, tổng hợp, tạo FAQ và ghi chú dựa trên tập nguồn người dùng cung cấp.",
    objectives: ["Hiểu điểm khác biệt giữa NotebookLM và chatbot thông thường.", "Làm việc có căn cứ trên tập nguồn công khai.", "Mở trích dẫn và kiểm tra tài liệu gốc."],
    prerequisites: ["Chỉ chuẩn bị tài liệu công khai.", "Kiểm tra quyền tác giả và quyền sử dụng nguồn.", "Không dùng tài khoản NAB nếu chưa được phê duyệt."],
    useCases: [{ title: "Hỏi đáp", text: "Đặt câu hỏi dựa trên bộ nguồn công khai." }, { title: "Tổng hợp", text: "Tạo tóm tắt, FAQ hoặc ghi chú." }, { title: "Truy vết", text: "Mở trích dẫn để kiểm tra đoạn nguồn." }],
    featureSections: [{
      id: "notebooklm-la-gi",
      title: "NotebookLM phù hợp khi nào?",
      intro: "Công cụ phù hợp khi người dùng có một tập tài liệu công khai và muốn AI hỗ trợ làm việc dựa trên chính tập nguồn đó.",
      blocks: [
        { type: "table", headers: ["Nhu cầu", "Cách dùng tham khảo", "Điểm phải kiểm tra"], rows: [["Hỏi đáp", "Hỏi theo phạm vi bộ nguồn", "Câu trả lời có bám đúng đoạn trích không"], ["Tóm tắt", "Rút ý chính từ nhiều nguồn", "Có bỏ mất ngoại lệ hoặc điều kiện không"], ["FAQ và ghi chú", "Tổ chức lại nội dung để dễ đọc", "Câu chữ có làm thay đổi nghĩa nguồn không"]] },
        { type: "callout", tone: "danger", title: "Cảnh báo bảo mật", text: publicDataWarning }
      ]
    }],
    walkthroughs: [{
      title: "Tạo FAQ từ tài liệu công khai",
      intro: "Dùng hướng dẫn sản phẩm công khai từ trang hỗ trợ chính thức.",
      steps: ["Chọn các nguồn công khai và ghi ngày truy cập.", "Tạo notebook và thêm đúng các nguồn đã chọn.", "Yêu cầu FAQ theo nhóm chủ đề và đối tượng đọc.", "Mở từng trích dẫn để kiểm tra câu trả lời.", "Biên tập lại và ghi danh mục nguồn."],
      verify: "Mỗi câu trả lời quan trọng truy được về nguồn và không vượt quá nội dung tài liệu."
    }],
    faqs: [["NotebookLM khác chatbot thông thường thế nào?", "NotebookLM tập trung làm việc dựa trên tập nguồn người dùng cung cấp."], ["Có thể tải mọi tài liệu nội bộ lên không?", "Không. Chương này chỉ hướng dẫn dùng tài liệu công khai."], ["Trích dẫn có bảo đảm câu trả lời đúng không?", "Không. Cần mở đoạn nguồn và kiểm tra bối cảnh."], ["Có thể chia sẻ notebook công khai không?", "Chỉ chia sẻ nội dung công khai và vẫn phải kiểm tra quyền tác giả, quyền sử dụng."]],
    sources: [["Google NotebookLM Help", "https://support.google.com/notebooklm/"]]
  }),
  referenceChapter({
    id: 19,
    slug: "chapter-19-ai-thiet-ke-trinh-bay.html",
    navTitle: "AI thiết kế và trình bày",
    title: "AI hỗ trợ thiết kế và trình bày",
    summary: "Các công cụ tham khảo có thể tạo bản nháp slide, infographic, sơ đồ, banner và nội dung trực quan từ thông tin công khai.",
    objectives: ["Chọn công cụ theo loại đầu ra.", "Tạo bản nháp trực quan từ dữ liệu công khai.", "Kiểm tra thương hiệu, bản quyền và khả năng tiếp cận."],
    prerequisites: ["Chỉ dùng nội dung và tài sản công khai có quyền sử dụng.", "Không tải template hoặc tài sản nội bộ NAB.", "Có người kiểm tra bản cuối."],
    useCases: [{ title: "Slide", text: "Tạo cấu trúc và bố cục ban đầu." }, { title: "Infographic và sơ đồ", text: "Chuyển ý công khai thành hình trực quan." }, { title: "Banner", text: "Tạo bản nháp không dùng tài sản nội bộ." }],
    featureSections: [{
      id: "cong-cu-tham-khao",
      title: "Công cụ và tình huống phù hợp",
      blocks: [{
        type: "table",
        headers: ["Công cụ", "Thế mạnh tham khảo", "Phù hợp khi"],
        rows: [["Canva AI", "Mẫu thiết kế và nội dung trực quan", "Slide, banner, infographic"], ["Gamma", "Tạo cấu trúc và bản nháp trình bày", "Slide và tài liệu dạng trang"], ["Napkin AI", "Chuyển văn bản thành sơ đồ", "Sơ đồ và minh họa ý"], ["Microsoft Designer", "Thiết kế nhanh từ mô tả", "Banner và nội dung trực quan"]]
      }]
    }],
    walkthroughs: [{
      title: "Tạo infographic từ báo cáo công khai",
      intro: "Dùng số liệu đã công bố trên một trang nguồn chính thức.",
      steps: ["Chọn ba thông điệp và số liệu công khai.", "Ghi rõ nguồn và ngày truy cập.", "Chọn công cụ theo loại đầu ra.", "Tạo bản nháp không dùng logo hoặc tài sản NAB.", "Kiểm tra số liệu, bản quyền, tương phản và khả năng đọc."],
      verify: "Mọi số liệu đúng nguồn; hình ảnh có quyền sử dụng; bản nháp không bị hiểu là ấn phẩm chính thức của NAB."
    }],
    faqs: [["Có thể tải template NAB lên công cụ tham khảo không?", "Không. Không sử dụng tài sản hoặc dữ liệu nội bộ NAB."], ["AI tạo thiết kế có dùng ngay được không?", "Không. Cần kiểm tra nội dung, thương hiệu, bản quyền và accessibility."], ["Công cụ nào phù hợp nhất cho sơ đồ?", "Napkin AI là một lựa chọn tham khảo; PowerPoint cũng có thể phù hợp nếu dùng trong môi trường NAB."], ["Có thể dùng ảnh tìm thấy trên Internet không?", "Chỉ khi quyền sử dụng cho phép; nội dung công khai không đồng nghĩa được tự do sao chép."]],
    sources: [["Canva AI Help", "https://www.canva.com/help/canva-ai/"], ["Gamma", "https://gamma.app/"], ["Napkin AI", "https://www.napkin.ai/"], ["Microsoft Designer", "https://designer.microsoft.com/"]]
  }),
  referenceChapter({
    id: 20,
    slug: "chapter-20-ai-tao-hinh-anh-video.html",
    navTitle: "AI tạo hình ảnh và video",
    title: "AI tạo hình ảnh và video",
    summary: "Công cụ tạo sinh có thể hỗ trợ hình minh họa, poster, banner, video đào tạo, truyền thông và minh họa ý tưởng bằng dữ liệu công khai.",
    objectives: ["Nhận biết nhóm công cụ hình ảnh và video.", "Chọn công cụ theo loại đầu ra.", "Phòng tránh lộ dữ liệu, vi phạm quyền hình ảnh và Deepfake."],
    prerequisites: ["Chỉ dùng Prompt, ảnh và video công khai có quyền sử dụng.", "Không dùng hình ảnh khách hàng, nhân viên hoặc hệ thống NAB.", "Có quy trình kiểm tra trước khi sử dụng chính thức."],
    useCases: [{ title: "Hình minh họa", text: "Tạo hình khái niệm hoặc poster." }, { title: "Video đào tạo", text: "Minh họa nội dung công khai." }, { title: "Video ý tưởng", text: "Tạo bản thử nghiệm không mô phỏng người thật." }],
    featureSections: [{
      id: "nhom-cong-cu",
      title: "Nhóm công cụ tiêu biểu",
      blocks: [
        { type: "table", headers: ["Nhóm", "Công cụ tham khảo", "Tình huống"], rows: [["Hình ảnh", "ChatGPT Image, Adobe Firefly, Midjourney", "Hình minh họa, poster, banner"], ["Video", "Sora, Google Veo, Runway, Kling AI", "Video đào tạo, truyền thông, minh họa ý tưởng"]] },
        { type: "callout", tone: "danger", title: "Cảnh báo hình ảnh và video", text: publicDataWarning, items: ["Không dùng hình ảnh khách hàng thật làm đầu vào cho AI công cộng.", "Không tải ảnh màn hình hệ thống nội bộ, tài liệu mật hoặc dữ liệu nhạy cảm.", "Không tạo hình ảnh hoặc video giả mạo lãnh đạo, nhân viên hoặc khách hàng.", "Nội dung AI tạo ra phải được kiểm tra trước khi sử dụng chính thức."] }
      ]
    }],
    walkthroughs: [{
      title: "Tạo hình minh họa cho chủ đề công khai",
      intro: "Ví dụ dùng một khái niệm giáo dục phổ biến và không dùng người thật.",
      steps: ["Xác định thông điệp, khán giả và định dạng.", "Viết Prompt không chứa dữ liệu hoặc tài sản NAB.", "Yêu cầu hình không mô phỏng cá nhân có thật.", "Kiểm tra chi tiết sai, nội dung gây hiểu nhầm và quyền sử dụng.", "Gắn nhãn nội dung tổng hợp khi quy định yêu cầu."],
      verify: "Đầu vào hoàn toàn công khai; đầu ra không giả mạo người thật và đã được người chịu trách nhiệm kiểm tra."
    }],
    faqs: [["Có thể dùng ảnh khách hàng thật làm đầu vào không?", "Không."], ["Có thể tải ảnh chụp màn hình hệ thống lên không?", "Không. Ảnh có thể làm lộ dữ liệu và cấu hình nội bộ."], ["Có thể tạo video lãnh đạo phát biểu không?", "Không tạo nội dung giả mạo lãnh đạo, nhân viên hoặc khách hàng."], ["Nội dung AI tạo ra có dùng chính thức ngay không?", "Không. Phải kiểm tra tính đúng, bản quyền, nguy cơ gây hiểu nhầm và quy trình phê duyệt."]],
    sources: [["OpenAI image generation", "https://openai.com/index/image-generation-api/"], ["Adobe Firefly", "https://www.adobe.com/products/firefly.html"], ["Google Veo", "https://deepmind.google/models/veo/"], ["Runway", "https://runwayml.com/"]]
  }),
  referenceChapter({
    id: 21,
    slug: "chapter-21-ai-agent-tu-dong-hoa.html",
    navTitle: "AI Agent và tự động hóa",
    title: "AI Agent và tự động hóa",
    statusLabel: "NÂNG CAO",
    summary: "AI Agent có thể lập kế hoạch, dùng công cụ và thực hiện nhiều bước; vì vậy rủi ro quyền truy cập và hành động cao hơn chatbot thông thường.",
    audience: "Người dùng nâng cao và Khối CNTT tìm hiểu bằng dữ liệu công khai",
    objectives: ["Hiểu AI Agent khác chatbot thông thường.", "Nhận biết khả năng kết nối và thực hiện nhiều bước.", "Không tự triển khai hoặc kết nối hệ thống NAB."],
    prerequisites: ["Có kiến thức về Workflow, API và phân quyền.", "Chỉ dùng tài liệu và dịch vụ công khai để tìm hiểu.", "Không có tài khoản, khóa hoặc kết nối tới hệ thống NAB."],
    useCases: [{ title: "Tìm hiểu kiến trúc", text: "Đọc tài liệu công khai và so sánh khái niệm." }, { title: "Mô hình Workflow", text: "Vẽ luồng khái niệm không dùng dữ liệu NAB." }, { title: "Đánh giá kỹ thuật", text: "Thực hiện bởi CNTT trong phạm vi được phê duyệt." }],
    featureSections: [{
      id: "agent-va-chatbot",
      title: "AI Agent khác chatbot như thế nào?",
      intro: "Chatbot thường trả lời theo từng lượt; AI Agent có thể lập kế hoạch, gọi công cụ, ghi nhớ trạng thái và thực hiện chuỗi hành động.",
      blocks: [
        { type: "table", headers: ["Công cụ", "Vai trò tham khảo", "Lưu ý"], rows: [["OpenClaw", "Tìm hiểu mô hình Agent và thao tác công cụ", "Chỉ nghiên cứu tài liệu công khai"], ["n8n AI", "Workflow có bước AI và tích hợp", "Không kết nối tài khoản hoặc hệ thống NAB"], ["Microsoft Copilot Studio", "Xây dựng copilot/agent trong hệ sinh thái Microsoft", "Chỉ triển khai khi CNTT phê duyệt cấu hình và nguồn"], ["Dify / Flowise", "Tham khảo kỹ thuật về xây dựng ứng dụng LLM", "Dành cho đánh giá kỹ thuật có kiểm soát"]] },
        { type: "callout", tone: "danger", title: "Dành cho người dùng nâng cao / CNTT", text: "Không tự triển khai, cấp khóa, kết nối tài khoản, hệ thống hoặc dữ liệu của Nam A Bank cho công cụ AI Agent khi chưa được Khối CNTT phê duyệt." }
      ]
    }],
    walkthroughs: [{
      title: "Phân tích một Workflow công khai trên giấy",
      intro: "Chỉ dùng tài liệu nhà cung cấp và một quy trình minh họa công khai.",
      steps: ["Xác định mục tiêu và các bước của Workflow.", "Đánh dấu bước AI đọc, suy luận hoặc tạo nội dung.", "Đánh dấu mọi điểm có thể gọi API hoặc thực hiện hành động.", "Đề xuất điểm phê duyệt của con người và cơ chế dừng.", "Không nhập khóa, tài khoản hoặc kết nối hệ thống thật."],
      verify: "Bản phân tích nêu rõ quyền, hành động, điểm phê duyệt và không chứa thông tin hệ thống NAB."
    }],
    faqs: [["AI Agent khác chatbot thế nào?", "AI Agent có thể lập kế hoạch, dùng công cụ và thực hiện nhiều bước thay vì chỉ trả lời theo lượt."], ["Người dùng phổ thông có nên tự triển khai không?", "Không tự triển khai công cụ có khả năng truy cập hệ thống hoặc dữ liệu nội bộ khi chưa được CNTT phê duyệt."], ["Có thể kết nối thử tài khoản NAB không?", "Không."], ["Dify và Flowise có được hướng dẫn triển khai không?", "Không. Chúng chỉ được nhắc ở mức tham khảo kỹ thuật."]],
    sources: [["n8n AI documentation", "https://docs.n8n.io/advanced-ai/"], ["Microsoft Copilot Studio documentation", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/"], ["Dify documentation", "https://docs.dify.ai/"], ["Flowise documentation", "https://docs.flowiseai.com/"]]
  })
];
