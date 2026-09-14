"use strict";

const sourceDate = "19/08/2026";
const commonStatus = "Không đồng nghĩa với việc được NAB phê duyệt sử dụng. Chỉ thao tác sau khi có phê duyệt rõ ràng về tài khoản, dữ liệu và tính năng.";
const commonControls = [
  "Không dùng tài khoản cá nhân hoặc tự đăng ký bằng email NAB.",
  "Không tải lên dữ liệu khách hàng, bí mật ngân hàng, thông tin xác thực hoặc tài liệu nội bộ khi chưa được phê duyệt.",
  "Không cài extension, app, connector hoặc bật link công khai để né quy trình cấp quyền.",
  "Luôn kiểm chứng đầu ra và áp dụng quy trình phê duyệt của con người."
];

function referenceChapter(config) {
  return Object.assign({
    group: "Công cụ tham khảo",
    eyebrow: "Tham khảo — chưa mặc định phê duyệt",
    kind: "reference",
    statusLabel: "Công cụ tham khảo",
    statusText: commonStatus,
    audience: "Nhân sự NAB tìm hiểu công cụ (chỉ dùng khi được phê duyệt)",
    owner: "Chủ biên / SME / ATTT",
    controls: commonControls,
    sourceDate
  }, config);
}

module.exports = [
  referenceChapter({
    id: 16,
    slug: "chapter-16-chatgpt.html",
    navTitle: "ChatGPT",
    title: "ChatGPT — hướng dẫn tham khảo an toàn",
    summary: "ChatGPT có thể hỗ trợ soạn thảo và tổng hợp, nhưng quyền truy cập, dữ liệu, retention, apps và hành động phụ thuộc gói cùng cấu hình workspace thực tế.",
    objectives: ["Nhận biết một use case ít rủi ro.", "Kiểm tra đúng workspace và tính năng được phép.", "Không nhầm cam kết của gói doanh nghiệp với tài khoản cá nhân."],
    prerequisites: ["Có văn bản phê duyệt use case và tài khoản/workspace.", "Admin xác nhận upload, browsing, memory, apps/connector và retention.", "Chỉ dùng dữ liệu giả lập hoặc công khai trong bài tập."],
    useCases: [{ title: "Bản nháp email nội bộ", text: "Tạo dàn ý và chỉnh giọng văn từ dữ liệu giả lập; người dùng tự kiểm tra và viết bản cuối." }],
    walkthroughs: [{
      title: "Tạo bản nháp từ dữ liệu giả lập",
      intro: "Không sử dụng dữ liệu hoặc tên khách hàng thật.",
      steps: [
        "Xác nhận đúng workspace/tài khoản đã được NAB phê duyệt; nếu không có, dừng thao tác.",
        "Tạo bối cảnh giả lập, không chứa dữ liệu nhận dạng hay bí mật nội bộ.",
        "Yêu cầu một bản nháp ngắn, nêu đối tượng, giọng văn, ràng buộc và định dạng.",
        "Kiểm tra mọi tên, số, cam kết, nguồn và câu có thể gây hiểu nhầm.",
        "Viết lại bằng chuyên môn nghiệp vụ và lưu bản cuối trong kho NAB được phép."
      ],
      verify: "Bản cuối không còn dữ liệu giả vô tình được trình bày như sự thật và có người chịu trách nhiệm nội dung."
    }],
    faqs: [
      ["Có được dùng tài khoản ChatGPT cá nhân?", "Không dùng cho dữ liệu hoặc công việc NAB nếu chưa có phê duyệt rõ ràng."],
      ["Dữ liệu có được dùng để huấn luyện không?", "Điều này phụ thuộc gói và cấu hình. OpenAI Docs nêu cam kết doanh nghiệp theo workspace; NAB phải xác nhận hợp đồng và cấu hình thực tế trước khi sử dụng."],
      ["Có thể upload tài liệu hoặc dùng app/connector?", "Chỉ khi từng tính năng đã được admin/ATTT phê duyệt. Connector vẫn tuân theo quyền hệ thống nguồn và có thể mở rộng phạm vi dữ liệu."],
      ["Câu trả lời có citation đã đủ tin cậy?", "Không. Phải mở nguồn gốc, kiểm tra phạm vi và đối chiếu độc lập."],
      ["Có thể gửi thẳng đầu ra cho khách hàng?", "Không. Đầu ra phải được biên tập, kiểm chứng và phê duyệt theo quy trình nghiệp vụ."
      ]
    ],
    sources: [["OpenAI Docs — ChatGPT Work admin FAQ", "https://learn.chatgpt.com/docs/enterprise/work-admin-faq"]]
  }),
  referenceChapter({
    id: 17,
    slug: "chapter-17-notebooklm.html",
    navTitle: "NotebookLM",
    title: "NotebookLM — hỏi đáp trên tập nguồn tham khảo",
    summary: "NotebookLM tập trung trả lời dựa trên nguồn người dùng cung cấp; citation hỗ trợ truy vết nhưng không tự biến nguồn thành đúng, hợp pháp hoặc được phép sử dụng.",
    objectives: ["Tạo notebook thử nghiệm bằng tài liệu công khai.", "Mở citation và kiểm tra đoạn nguồn.", "Quản lý chia sẻ và vòng đời notebook."],
    prerequisites: ["Tài khoản và phiên bản được NAB phê duyệt.", "Chỉ dùng tài liệu công khai/giả lập trong thử nghiệm.", "Xác nhận quyền tác giả và quyền chia sẻ nguồn."],
    useCases: [{ title: "Tóm tắt bộ văn bản công khai", text: "Tải nguồn chính thức, hỏi theo chủ đề, mở citation và lập bảng điểm cần xác minh." }],
    walkthroughs: [{
      title: "Tạo brief có căn cứ",
      intro: "Bài tập chỉ dùng ba tài liệu công khai từ nguồn chính thức.",
      steps: ["Tạo notebook trong tài khoản được phép.", "Thêm nguồn công khai và ghi ngày truy cập.", "Đặt câu hỏi có phạm vi, thời gian và định dạng rõ ràng.", "Mở từng citation để kiểm tra câu trích và bối cảnh.", "Biên tập brief, gắn danh mục nguồn và xóa notebook theo quy định."],
      verify: "Mỗi kết luận quan trọng truy được tới nguồn gốc và không vượt quá nội dung nguồn."
    }],
    faqs: [
      ["Citation có bảo đảm câu trả lời đúng không?", "Không; citation có thể không hỗ trợ đầy đủ diễn giải. Luôn đọc đoạn nguồn và bối cảnh."],
      ["Có thể tải tài liệu nội bộ?", "Chỉ khi tài khoản, loại dữ liệu, retention và chia sẻ đã được NAB phê duyệt."],
      ["Có thể chia sẻ notebook bằng link?", "Chỉ dùng phạm vi chia sẻ được phê duyệt; không bật public link cho nội dung NAB."],
      ["Audio overview có phải bản ghi chính thức?", "Không. Đây là đầu ra tạo sinh, cần kiểm tra như mọi nội dung AI."]
    ],
    sources: [["Google NotebookLM Help", "https://support.google.com/notebooklm/"]]
  }),
  referenceChapter({
    id: 18,
    slug: "chapter-18-claude.html",
    navTitle: "Claude",
    title: "Claude — hướng dẫn tham khảo an toàn",
    summary: "Claude có thể hỗ trợ phân tích và soạn thảo; Project, file, artifact, integration và link chia sẻ phải được đánh giá riêng trước khi dùng cho NAB.",
    objectives: ["Thực hiện tác vụ soạn thảo bằng dữ liệu giả lập.", "Nhận biết rủi ro file/project/integration.", "Kiểm chứng artifact trước khi lưu hoặc chia sẻ."],
    prerequisites: ["Tài khoản/gói được NAB phê duyệt.", "Admin xác nhận retention, training, file, integration và sharing.", "Bài tập không dùng dữ liệu NAB."],
    useCases: [{ title: "Tạo checklist", text: "Chuyển quy trình giả lập thành checklist; đối chiếu lại từng bước với nguồn ban đầu." }],
    walkthroughs: [{
      title: "Tạo checklist từ quy trình giả lập",
      intro: "Không dùng quy trình nội bộ chưa được phép.",
      steps: ["Xác nhận tài khoản được phép.", "Dùng một quy trình giả lập ngắn.", "Yêu cầu checklist có owner, input, output và tiêu chí hoàn tất.", "Đối chiếu từng mục với nguồn; đánh dấu phần AI tự suy diễn.", "Lưu bản đã duyệt vào kho NAB nếu use case được phê duyệt."],
      verify: "Không có bước, vai trò hoặc cam kết mới không tồn tại trong nguồn."
    }],
    faqs: [
      ["Có thể tạo Project cho dữ liệu NAB?", "Chỉ sau khi có phê duyệt về account, dữ liệu, thành viên và retention."],
      ["Artifact có phải đầu ra đã sẵn sàng phát hành?", "Không. Artifact vẫn là đầu ra AI và cần review nội dung, bảo mật, accessibility và bản quyền."],
      ["Có thể bật integration?", "Không tự bật. Mỗi integration cần đánh giá quyền nguồn, hành động và log."],
      ["Có thể dùng link public?", "Không dùng public link cho nội dung NAB."]
    ],
    sources: [["Anthropic Claude Help Center", "https://support.anthropic.com/"]]
  }),
  referenceChapter({
    id: 19,
    slug: "chapter-19-gemini.html",
    navTitle: "Gemini",
    title: "Gemini — phân biệt ứng dụng và tích hợp Workspace",
    summary: "Gemini app và Gemini trong Google Workspace có bề mặt, quyền và kiểm soát khác nhau; không giả định chính sách của một gói áp dụng cho tài khoản khác.",
    objectives: ["Nhận biết đúng tài khoản và bề mặt sử dụng.", "Kiểm tra extension/quyền Drive trước thao tác.", "Dùng dữ liệu công khai trong thử nghiệm."],
    prerequisites: ["NAB phê duyệt tài khoản và edition cụ thể.", "Admin xác nhận file, history, extension và retention.", "Không dùng tài khoản Google cá nhân cho công việc NAB."],
    useCases: [{ title: "Tóm tắt nội dung công khai", text: "Tóm tắt một thông cáo công khai, yêu cầu nêu nguồn và điểm chưa chắc chắn." }],
    walkthroughs: [{
      title: "Tóm tắt thông cáo công khai",
      intro: "Chỉ dùng URL/tài liệu công khai và không bật extension ngoài nhu cầu.",
      steps: ["Xác nhận đúng tài khoản và bề mặt đã được phép.", "Tắt/không chọn extension không cần thiết.", "Cung cấp nguồn công khai và yêu cầu tóm tắt theo cấu trúc.", "Mở nguồn, kiểm tra ngày, số liệu và trích dẫn.", "Lưu bản đã biên tập trong kho được phép."],
      verify: "Bản tóm tắt phân biệt rõ nội dung nguồn với diễn giải và ghi ngày truy cập."
    }],
    faqs: [
      ["Gemini app và Gemini trong Workspace có giống nhau?", "Không nhất thiết. Tính năng và kiểm soát phụ thuộc bề mặt, edition, tài khoản và admin settings."],
      ["Có thể cho Gemini truy cập Drive?", "Chỉ khi extension/quyền đã được NAB thẩm định và giới hạn đúng phạm vi."],
      ["Có thể upload file nội bộ?", "Không khi chưa có phê duyệt cho edition, retention và loại dữ liệu cụ thể."],
      ["Ảnh tạo sinh có dùng ngay được không?", "Không. Cần kiểm tra bản quyền, tính phù hợp, nhận diện thương hiệu và nguy cơ gây hiểu nhầm."]
    ],
    sources: [["Google Workspace with Gemini", "https://workspace.google.com/solutions/ai/"], ["Google Workspace privacy for AI", "https://workspace.google.com/security/ai-privacy/"]]
  }),
  referenceChapter({
    id: 20,
    slug: "chapter-20-perplexity.html",
    navTitle: "Perplexity",
    title: "Perplexity — nghiên cứu web có kiểm chứng nguồn",
    summary: "Liên kết nguồn giúp truy vết nhưng không bảo đảm nguồn đáng tin, cập nhật hoặc thực sự hỗ trợ kết luận; mọi nghiên cứu cần đối chiếu độc lập.",
    objectives: ["Đặt câu hỏi nghiên cứu có phạm vi.", "Đọc nguồn gốc thay vì chỉ đọc câu trả lời.", "Ghi ngày truy cập và giới hạn kết luận."],
    prerequisites: ["Tài khoản/gói được NAB phê duyệt.", "Chỉ nghiên cứu nguồn công khai trong bài tập.", "Không upload file hoặc tạo Space chứa dữ liệu NAB."],
    useCases: [{ title: "Research nguồn công khai", text: "Tìm bối cảnh thị trường từ nguồn công khai, ưu tiên nguồn sơ cấp và đối chiếu tối thiểu hai nguồn." }],
    walkthroughs: [{
      title: "Nghiên cứu nhanh nhưng có bằng chứng",
      intro: "Xác định câu hỏi, khoảng thời gian và loại nguồn trước khi tìm.",
      steps: ["Viết câu hỏi có phạm vi và ngày chốt thông tin.", "Yêu cầu ưu tiên nguồn chính thức/sơ cấp.", "Mở từng citation; loại nguồn không liên quan hoặc không hỗ trợ kết luận.", "Đối chiếu ít nhất hai nguồn độc lập cho điểm quan trọng.", "Ghi ngày truy cập, bất đồng và giới hạn vào workpaper."],
      verify: "Báo cáo phân biệt dữ kiện, suy luận và điểm chưa đủ bằng chứng."
    }],
    faqs: [
      ["Có citation nghĩa là đúng?", "Không. Citation có thể chỉ liên quan một phần, lỗi thời hoặc từ nguồn yếu."],
      ["Có thể tải tài liệu nội bộ lên?", "Không nếu NAB chưa phê duyệt gói, cấu hình, retention và loại dữ liệu."],
      ["Nên tin nguồn nào?", "Ưu tiên nguồn sơ cấp/chính thức, kiểm tra tác giả, ngày, phương pháp và đối chiếu nguồn độc lập."],
      ["Có thể dùng nguyên văn kết quả trong báo cáo?", "Không. Cần viết lại, trích nguồn đúng quy định và chịu trách nhiệm về kết luận."]
    ],
    sources: [["Perplexity Enterprise", "https://www.perplexity.ai/enterprise"]]
  }),
  referenceChapter({
    id: 21,
    slug: "chapter-21-canva-ai.html",
    navTitle: "Canva AI",
    title: "Canva AI — thiết kế có kiểm soát thương hiệu và bản quyền",
    summary: "AI có thể tạo bản nháp thiết kế, nhưng logo, Brand Kit, hình ảnh, quyền sử dụng và nội dung đối ngoại vẫn phải được kiểm tra và phê duyệt.",
    objectives: ["Tạo bản nháp bằng nội dung giả lập.", "Áp dụng Brand Kit/template được duyệt.", "Kiểm tra bản quyền, accessibility và public link."],
    prerequisites: ["NAB phê duyệt Team/gói và tính năng AI cụ thể.", "Có template, logo và Brand Kit chính thức.", "Có quy trình duyệt ấn phẩm nội bộ/đối ngoại."],
    useCases: [{ title: "Bản nháp poster nội bộ", text: "Dùng thông tin sự kiện giả lập, áp template/Brand Kit, sau đó review thủ công và không bật public link." }],
    walkthroughs: [{
      title: "Tạo bản nháp poster nội bộ",
      intro: "Không dùng ảnh khách hàng, khuôn mặt thật hoặc thông tin sự kiện chưa công bố.",
      steps: ["Vào đúng Team NAB đã được phê duyệt.", "Chọn template/Brand Kit chính thức.", "Dùng nội dung và ảnh giả lập/đã được cấp phép để tạo bản nháp.", "Kiểm tra chính tả, thông tin, màu, logo, tương phản, alt text và quyền asset.", "Xin phê duyệt Truyền thông/Brand trước export; chia sẻ cho đúng người, không public link."],
      verify: "Có bằng chứng về nguồn asset, phê duyệt nội dung và phạm vi phát hành."
    }],
    controls: commonControls.concat(["Không tạo nội dung mô phỏng cá nhân/sự kiện thật gây hiểu nhầm; gắn nhãn nội dung tổng hợp khi quy định yêu cầu."]),
    faqs: [
      ["AI tạo ảnh thì có mặc nhiên được dùng thương mại?", "Không. Cần kiểm tra điều khoản, nguồn asset, quyền bên thứ ba và yêu cầu pháp lý cho use case cụ thể."],
      ["Có thể dùng Team cá nhân?", "Không cho công việc NAB nếu chưa được phê duyệt."],
      ["Brand Kit có thay review thương hiệu?", "Không. Brand Kit hỗ trợ nhất quán nhưng nội dung và bố cục vẫn cần review."],
      ["Có thể gửi link công khai để duyệt nhanh?", "Không dùng public link cho nội dung NAB; chia sẻ theo nhóm/người cụ thể trong môi trường được phép."],
      ["Có thể dùng ảnh khách hàng làm đầu vào AI?", "Không nếu chưa có căn cứ, đồng ý và phê duyệt phù hợp về dữ liệu cá nhân/quyền hình ảnh."]
    ],
    sources: [["Canva AI Help", "https://www.canva.com/help/canva-ai/"], ["Using Magic Studio safely and legally", "https://www.canva.com/help/using-magic-studio-safely-and-legally/"]]
  })
];
