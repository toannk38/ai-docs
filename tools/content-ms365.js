"use strict";

const sourceDate = "19/08/2026";
const owner = "Khối CNTT NAB / SME Microsoft 365";
const tenantWarning = "Khả năng hiển thị phụ thuộc license, phiên bản ứng dụng và chính sách tenant NAB. Nếu giao diện khác hướng dẫn, dừng thao tác và liên hệ CNTT; không dùng tài khoản cá nhân để thay thế.";

function msChapter(config) {
  return Object.assign({
    group: "Microsoft 365 — trọng tâm",
    eyebrow: "Đang sử dụng tại NAB",
    kind: "live",
    statusLabel: "Đang sử dụng tại NAB",
    statusText: tenantWarning,
    audience: "Nhân sự NAB sử dụng Microsoft 365",
    owner,
    sourceDate
  }, config);
}

module.exports = [
  msChapter({
    id: 4,
    slug: "chapter-04-ms365-tong-quan.html",
    navTitle: "Microsoft 365 tổng quan",
    title: "Microsoft 365 tại NAB: tổng quan và lựa chọn đúng ứng dụng",
    summary: "Microsoft 365 là môi trường cộng tác chính; Copilot bổ sung khả năng AI nhưng phạm vi truy cập, grounding và tính năng phụ thuộc license, quyền dữ liệu và chính sách tenant.",
    objectives: [
      "Phân biệt Microsoft 365 chuẩn với khả năng Copilot phụ thuộc license.",
      "Chọn đúng ứng dụng cho họp, email, tài liệu, bảng tính và trình bày.",
      "Hiểu rằng quyền dữ liệu quá rộng vẫn là rủi ro ngay cả khi Copilot chỉ làm việc theo quyền người dùng."
    ],
    prerequisites: [
      "Tài khoản Microsoft Entra của NAB và license Microsoft 365 hợp lệ.",
      "Ứng dụng do CNTT triển khai; mailbox chính trên Exchange Online cho Outlook; tài liệu grounding nằm trong OneDrive/SharePoint NAB.",
      "SME xác nhận Copilot Chat/add-on, web search, Work IQ/Graph grounding, Purview/DLP và tính năng đang bật."
    ],
    useCases: [
      { title: "Teams", text: "Họp, chat/channel, recap và action items." },
      { title: "Outlook", text: "Chuỗi thư, bản nháp, phản hồi và coaching trước gửi." },
      { title: "Word", text: "Văn bản dài, tóm tắt, biên tập và review phiên bản." },
      { title: "Excel", text: "Dữ liệu có cấu trúc, công thức, insight, PivotTable và biểu đồ." },
      { title: "PowerPoint", text: "Dàn ý, slide, summary và speaker notes theo template NAB." },
      { title: "Copilot Chat", text: "Hỏi đáp/tổng hợp từ web hoặc dữ liệu công việc khi license và policy cho phép." }
    ],
    walkthroughs: [
      {
        title: "Kiểm tra phiên làm việc",
        intro: "Xác nhận đúng tenant trước khi mở dữ liệu.",
        steps: [
          "Mở portal/ứng dụng Microsoft 365 do NAB cung cấp.",
          "Kiểm tra avatar và domain của tài khoản NAB.",
          "Trong Copilot, kiểm tra nhãn/license hiển thị nếu có.",
          "Xác nhận ứng dụng và nút Copilot đúng với feature matrix.",
          "Nếu thiếu, gửi Service Desk ảnh đã che dữ liệu nhạy cảm; không đăng nhập tài khoản cá nhân."
        ],
        verify: "Đúng tenant, tài khoản và ứng dụng do NAB quản trị; không có phiên cá nhân đang hoạt động."
      },
      {
        title: "Chuẩn bị nguồn an toàn",
        intro: "Rà quyền trước khi dùng nguồn để grounding.",
        steps: [
          "Xác định mục đích và phân loại dữ liệu.",
          "Loại bỏ trường không cần thiết.",
          "Lưu file vào đúng OneDrive/SharePoint/team site NAB.",
          "Áp nhãn nhạy cảm và quyền tối thiểu.",
          "Mở Manage access, kiểm tra user/group/link rồi mới chọn nguồn cho Copilot."
        ],
        verify: "Nguồn đúng phiên bản, đúng nhãn và không được chia sẻ rộng hơn nhu cầu."
      },
      {
        title: "Chọn ứng dụng và nghiệm thu đầu ra",
        intro: "Chọn theo công việc, không chọn theo tính năng đang gây chú ý.",
        steps: [
          "Chọn ứng dụng theo ma trận use case.",
          "Prompt nêu đầu ra, nguồn, ràng buộc và tiêu chí kiểm tra.",
          "Yêu cầu citation hoặc chỉ rõ phạm vi nguồn khi tính năng hỗ trợ.",
          "Đối chiếu tên, số, ngày, điều khoản và nguồn gốc.",
          "Người có thẩm quyền duyệt; lưu đầu ra vào kho NAB với nhãn/quyền phù hợp."
        ],
        verify: "Có bằng chứng nguồn, kiểm chứng và phê duyệt; citation đã được mở chứ không chỉ nhìn thấy biểu tượng."
      }
    ],
    controls: [
      "Rà quyền SharePoint/OneDrive để tránh oversharing qua quyền hiện hữu.",
      "Không hạ nhãn/IRM chỉ để một tính năng Copilot hoạt động.",
      "Web grounding có thể đưa nguồn công khai vào kết quả; kiểm tra URL và ngày.",
      "Prompt/response có thể chịu logging, audit và retention; không nhập dữ liệu cấm.",
      "Người dùng và người phê duyệt nghiệp vụ chịu trách nhiệm đầu ra."
    ],
    faqs: [
      ["Có Microsoft 365 là có đủ Copilot?", "Không; trải nghiệm phụ thuộc subscription, add-on, ứng dụng và chính sách tenant."],
      ["Copilot có nhìn thấy toàn tenant?", "Không; Microsoft nêu truy cập theo quyền người đăng nhập. Tuy nhiên quyền thừa vẫn là rủi ro cần xử lý."],
      ["Prompt/response có dùng để train foundation model?", "Microsoft nêu trải nghiệm doanh nghiệp có cam kết bảo vệ dữ liệu; vẫn phải tuân thủ phân loại, logging, retention và hợp đồng NAB."],
      ["Có dùng tài khoản Microsoft cá nhân?", "Không cho công việc NAB."],
      ["Nút Copilot không xuất hiện?", "Kiểm tra đúng tài khoản/app rồi liên hệ CNTT; không tự thay policy hoặc cài add-in ngoài."],
      ["Có thể tải mọi tài liệu lên?", "Không; chỉ nguồn được phép, tối thiểu hóa và đúng kho/nhãn/quyền."],
      ["Citation có bảo đảm đúng?", "Không; phải mở nguồn và đối chiếu đoạn, ô hoặc slide liên quan."],
      ["Ai chịu trách nhiệm đầu ra?", "Người sử dụng và người phê duyệt nghiệp vụ, không phải Copilot."]
    ],
    sources: [
      ["Microsoft 365 Copilot requirements", "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-requirements"],
      ["Microsoft 365 Copilot architecture", "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture"],
      ["Privacy and protections", "https://learn.microsoft.com/en-us/copilot/privacy-and-protections"],
      ["Which Copilot for your organization", "https://learn.microsoft.com/en-us/microsoft-365/copilot/which-copilot-for-your-organization"]
    ]
  }),
  msChapter({
    id: 5,
    slug: "chapter-05-ms365-copilot.html",
    navTitle: "Microsoft Copilot",
    title: "Microsoft Copilot Chat: hỏi đáp và grounding có kiểm chứng",
    summary: "Copilot Chat có thể dùng web, file hoặc dữ liệu công việc theo license/policy; người dùng phải kiểm soát nguồn được bật và mở từng citation trước khi chấp nhận kết quả.",
    objectives: ["Tạo câu trả lời có nguồn từ web/tệp/dữ liệu công việc được phép.", "Biết kiểm soát nguồn khi UI hỗ trợ.", "Nhận biết quyền quá rộng và prompt injection."],
    prerequisites: [
      "Đăng nhập tài khoản NAB với subscription phù hợp.",
      "SME xác nhận Copilot add-on/Work IQ, web search, file upload và Change data sources.",
      "File có đúng nhãn/quyền; lưu ý file upload có thể được lưu trong OneDrive for Business theo cấu hình."
    ],
    useCases: [
      { title: "Nguồn web", text: "Tìm thông tin công khai có thời điểm và nguồn chính thức." },
      { title: "Một tệp cụ thể", text: "Hỏi đáp trong phạm vi file được phép và yêu cầu chỉ rõ mục/trang." },
      { title: "Dữ liệu công việc", text: "Tổng hợp email, file, chat, meeting khi Work IQ/license/policy được xác nhận." }
    ],
    walkthroughs: [
      {
        title: "Hỏi đáp web có kiểm chứng",
        intro: "Không đưa bí mật NAB vào truy vấn web.",
        steps: [
          "Xác nhận dữ liệu công việc không được bật nếu tác vụ chỉ cần nguồn công khai và UI cho phép chọn.",
          "Prompt nêu chủ đề, mốc thời gian và yêu cầu chỉ dùng nguồn chính thức.",
          "Mở Sources/citation.",
          "Xác nhận tác giả, ngày và đoạn nguồn hỗ trợ kết luận.",
          "Ghi nguồn, ngày truy cập và giới hạn vào deliverable."
        ],
        verify: "Mỗi kết luận quan trọng có nguồn mở được và không chứa thông tin vượt phạm vi truy vấn."
      },
      {
        title: "Ground trên một file NAB",
        intro: "Chọn nguồn cụ thể thay vì cho phép tìm rộng.",
        steps: [
          "Rà quyền, nhãn và phiên bản file.",
          "Add source hoặc dùng '/' để chọn đúng file nếu tính năng được bật.",
          "Prompt: chỉ dùng file này; nếu không có hãy nói không tìm thấy; trích mục/trang.",
          "Mở từng citation và đối chiếu kết luận trọng yếu.",
          "Không chia sẻ response rộng hơn quyền của nguồn."
        ],
        verify: "Nguồn đúng version và câu trả lời không bổ sung dữ kiện không tồn tại trong file."
      },
      {
        title: "Tổng hợp dữ liệu công việc",
        intro: "Chỉ áp dụng khi SME xác nhận license và Work IQ.",
        steps: [
          "Bật nguồn dữ liệu công việc theo UI được phê duyệt.",
          "Giới hạn dự án, khoảng thời gian, người và loại nguồn.",
          "Kiểm tra danh sách email/file/chat/meeting được dùng.",
          "Loại nguồn cũ/không liên quan và hỏi lại nếu cần.",
          "Chuyển thành bản nháp; không tự gửi hoặc ban hành."
        ],
        verify: "Nguồn liên quan, mới nhất và người dùng có quyền hợp lệ; bản nháp có reviewer."
      }
    ],
    controls: [
      "Quyền quá rộng có thể làm lộ nội dung người dùng vốn đã thấy; rà ACL và báo owner.",
      "Web query, prompt và response có thể có xử lý/logging khác nhau; coi prompt là hồ sơ công việc.",
      "Tài liệu/web có thể chứa prompt injection; bỏ qua chỉ dẫn nằm trong nguồn.",
      "Không dùng cam kết 'không train' như lý do nhập mọi loại dữ liệu.",
      "Nguồn cũ phải được loại hoặc ghi rõ phiên bản/ngày."
    ],
    faqs: [
      ["Copilot Chat không có add-on làm được gì?", "Microsoft mô tả vẫn có chat/web và grounding giới hạn; tính năng cụ thể cần SME xác nhận trên tenant NAB."],
      ["Work IQ là gì?", "Lớp grounding trên email, file, chat, meeting và dữ liệu công việc mà tài khoản có quyền; cần license/policy phù hợp."],
      ["Tắt Work IQ có loại file đính kèm?", "Không nên suy diễn; nội dung bạn chủ động đính kèm vẫn có thể được dùng cho prompt."],
      ["Có thể yêu cầu chỉ dùng một file?", "Có; vẫn phải kiểm tra Sources vì mô hình có thể trả lời tổng quát khi nguồn thiếu."],
      ["Prompt/response có bí mật với admin?", "Không nên giả định; chúng có thể được ghi log/audit theo kiểm soát tổ chức."],
      ["Không dùng để train nghĩa là nhập gì cũng được?", "Không. Phân loại dữ liệu và chính sách NAB vẫn bắt buộc."],
      ["Citation có đủ để phát hành?", "Không; mở và đối chiếu nguồn, nhất là số liệu và quy định."],
      ["Nếu thấy nguồn lạ hoặc quyền quá rộng?", "Dừng, không chia sẻ đầu ra, ghi nhận tên nguồn và báo CNTT/data owner."]
    ],
    sources: [
      ["Data protection in Copilot Chat", "https://support.microsoft.com/en-us/privacy/data-protection-when-using-microsoft-365-copilot-chat-for-work-or-school"],
      ["What information Copilot uses", "https://support.microsoft.com/en-us/Microsoft-365-Copilot/what-information-does-copilot-use-to-answer-my-prompt"],
      ["Control and review sources in Copilot Chat", "https://support.microsoft.com/en-us/Microsoft-365-Copilot/control-review-sources-copilot-chat"],
      ["Copilot Chat with and without a license", "https://support.microsoft.com/en-us/Microsoft-365-Copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license"]
    ]
  }),
  msChapter({
    id: 6,
    slug: "chapter-06-ms365-teams.html",
    navTitle: "Microsoft Teams",
    title: "Microsoft Teams và Copilot: họp, recap và action items",
    audience: "Người tổ chức/chủ trì, người ghi biên bản và thành viên chat/channel",
    summary: "Copilot hỗ trợ bắt kịp cuộc họp, chat và channel; recap không phải biên bản đã duyệt và chế độ transcript phải được chọn theo mục đích, chính sách và người tham dự.",
    objectives: ["Chọn đúng chế độ Copilot cho cuộc họp.", "Tạo recap/action items có kiểm chứng.", "Bắt kịp chat/channel trong khoảng thời gian rõ ràng."],
    prerequisites: [
      "Teams/Copilot license và policy tenant phù hợp; meeting do tổ chức NAB host cho kịch bản được hướng dẫn.",
      "SME xác nhận transcription/recording, sensitivity template, export và khả năng dùng sau họp.",
      "Không dùng Copilot cho end-to-end encrypted meeting khi tính năng không hỗ trợ."
    ],
    useCases: [
      { title: "Trong cuộc họp", text: "Tóm tắt điểm đã thảo luận, bất đồng và câu hỏi còn mở." },
      { title: "Sau cuộc họp", text: "Recap/action items dựa trên transcript khi policy cho phép." },
      { title: "Chat/channel", text: "Tóm tắt thread theo mốc thời gian và mở message nguồn." }
    ],
    walkthroughs: [
      {
        title: "Thiết lập trước cuộc họp",
        intro: "Chọn mức lưu giữ phù hợp với mục đích.",
        steps: [
          "Mở Calendar, meeting, Options và phần Copilot/AI.",
          "Chọn 'Only during' nếu không cần nội dung thoại sau họp hoặc 'During and after' khi cần recap và transcript được phép.",
          "Kiểm tra sensitivity, attendee, external guest và recording/transcription policy.",
          "Thông báo rõ cho người tham dự.",
          "Nếu không thấy lựa chọn, liên hệ CNTT; không hạ nhãn hoặc đổi policy."
        ],
        verify: "Cấu hình phù hợp mục đích, người tham dự đã được thông báo và policy cho phép."
      },
      {
        title: "Tạo biên bản và action items",
        intro: "Copilot tạo bản nháp; chủ trì xác nhận bản chính thức.",
        steps: [
          "Bật transcription nếu cần dùng nội dung sau họp và được policy cho phép.",
          "Yêu cầu tóm tắt quyết định, việc cần làm, owner, deadline và mục còn thiếu.",
          "Hỏi lại điểm bất đồng/rủi ro.",
          "Sau họp, mở Chat/Recap và citation/transcript; đối chiếu tên, ngày, nội dung.",
          "Chủ trì sửa và gửi biên bản theo quy trình NAB."
        ],
        verify: "Mọi quyết định, owner và deadline có căn cứ trong transcript/ghi chú và được chủ trì xác nhận."
      },
      {
        title: "Bắt kịp chat hoặc channel",
        intro: "Luôn chỉ rõ khoảng thời gian.",
        steps: [
          "Mở đúng chat hoặc thread.",
          "Mở Copilot/Summarize và nêu khoảng ngày cụ thể.",
          "Yêu cầu quyết định, action và link nguồn.",
          "Mở Sources để tới message gốc.",
          "Xác nhận với owner; mở file/ảnh/Loop riêng vì tóm tắt thread có thể không đọc được chúng."
        ],
        verify: "Tóm tắt có timestamp, link nguồn và phân biệt đề xuất với quyết định."
      }
    ],
    controls: [
      "Speech-to-text/attribution có thể sai; đối chiếu transcript và người tham dự.",
      "'Only during' không đồng nghĩa không lưu gì; prompt/response có thể chịu retention/eDiscovery.",
      "Transcript/recording chứa dữ liệu nhạy cảm phải có nhãn, quyền và retention phù hợp.",
      "Không bypass khi export bị sensitivity/anti-copy policy chặn.",
      "Recap không thay biên bản đã phê duyệt."
    ],
    faqs: [
      ["Có bắt buộc ghi âm?", "Không. Chế độ trong họp có thể dùng speech-to-text tạm thời nếu policy cho phép; hỏi sau họp về lời nói thường cần transcript."],
      ["Tắt transcript thì prompt/response biến mất?", "Không được khẳng định; Purview có thể giữ theo retention policy."],
      ["Organizer không có Copilot license có đặt option?", "Microsoft mô tả organizer vẫn kiểm soát một số tùy chọn; chỉ người có license phù hợp mới tương tác. SME phải UAT."],
      ["Người ngoài NAB dùng được Copilot trong meeting NAB?", "Có giới hạn theo host/participant và license; cần SME/UAT trước khi cam kết."],
      ["Copilot chat đọc file/ảnh/Loop đã share?", "Không mặc định trong chức năng tóm tắt thread; mở nguồn bằng ứng dụng phù hợp."],
      ["Vì sao hai lần hỏi khác nhau?", "Nội dung thay đổi và mô hình có tính biến thiên; luôn dùng citation/timestamp."],
      ["Có thể xuất sang Word/Excel?", "Nếu feature và sensitivity policy cho phép; không bypass khi bị chặn."],
      ["Ai duyệt action items?", "Chủ trì và owner nghiệp vụ; Copilot không tự giao việc có hiệu lực."]
    ],
    sources: [
      ["Catch up on meetings with Copilot", "https://support.microsoft.com/en-US/teams/copilot/catch-up-on-meetings-with-microsoft-365-copilot-in-teams"],
      ["Use Copilot in Teams chats and channels", "https://support.microsoft.com/en-US/teams/copilot/how-to-use-microsoft-365-copilot-in-teams-chats-and-channels"],
      ["Use Copilot without recording", "https://support.microsoft.com/en-US/teams/copilot/use-copilot-without-transcribing-or-recording-a-teams-meeting-or-call"],
      ["Copilot and transcription policies", "https://learn.microsoft.com/en-us/microsoftteams/copilot-teams-transcription"],
      ["FAQ about Copilot in Microsoft Teams", "https://support.microsoft.com/en-us/teams/platform/frequently-asked-questions-about-copilot-in-microsoft-teams"]
    ]
  }),
  msChapter({
    id: 7,
    slug: "chapter-07-ms365-outlook.html",
    navTitle: "Microsoft Outlook",
    title: "Microsoft Outlook và Copilot: tóm tắt, soạn và kiểm tra trước gửi",
    audience: "Nhân sự xử lý chuỗi thư, soạn/phản hồi email và lịch làm việc",
    summary: "Copilot có thể tóm tắt thread và tạo bản nháp, nhưng người dùng vẫn phải kiểm tra thư nguồn, người nhận, tệp, link, nhãn và ý nghĩa nghiệp vụ trước khi bấm Send.",
    objectives: ["Tóm tắt thread có dẫn chiếu.", "Tạo draft đúng mục đích và giọng văn.", "Dùng Coaching mà không làm đổi nghĩa."],
    prerequisites: [
      "Mailbox chính trên Exchange Online, đúng tài khoản NAB, client và license phù hợp.",
      "SME xác nhận shared/delegated mailbox, encryption/IRM/MIP, mobile và Chat in Outlook.",
      "Không sao chép thư sang mailbox khác để né giới hạn tính năng."
    ],
    useCases: [
      { title: "Tóm tắt thread", text: "Nắm key points rồi mở từng email nguồn để kiểm tra." },
      { title: "Draft/Reply", text: "Tạo bản nháp có tone, CTA và deadline rõ ràng; người dùng tự gửi." },
      { title: "Coaching", text: "Phản hồi về tone/clarity trước gửi; kiểm tra ý nghĩa sau khi áp dụng." }
    ],
    walkthroughs: [
      {
        title: "Tóm tắt chuỗi thư",
        intro: "Summary chỉ là lối vào để đọc thread.",
        steps: [
          "Mở đúng conversation và chọn Summary/Summarize.",
          "Đọc key points và mở từng citation về email gốc.",
          "Xác nhận ai yêu cầu gì, deadline, tệp và thay đổi mới nhất.",
          "Nếu có summarize attachment, vẫn mở file kiểm tra riêng.",
          "Ghi chú nội bộ; chưa forward summary như sự thật đã duyệt."
        ],
        verify: "Summary khớp email mới nhất và không bỏ sót thay đổi, điều kiện hoặc tệp quan trọng."
      },
      {
        title: "Soạn hoặc phản hồi email",
        intro: "Copilot không được tự quyết định người nhận hoặc gửi.",
        steps: [
          "Mở New mail/Reply và Draft with Copilot.",
          "Nêu người nhận, mục đích, facts đã xác minh, tone, độ dài, CTA và deadline.",
          "Generate, điều chỉnh rồi Keep; tự biên tập lại.",
          "Kiểm tra To/Cc/Bcc, domain ngoài NAB, subject, attachment, link và sensitivity label.",
          "Send chỉ sau phê duyệt cần thiết."
        ],
        verify: "Người nhận, file, link, số liệu và cam kết đều đúng; không có dữ liệu thừa."
      },
      {
        title: "Coaching trước khi gửi",
        intro: "Chỉ áp dụng đề xuất không làm thay đổi nghĩa.",
        steps: [
          "Tự viết email đủ ngữ cảnh.",
          "Mở Coaching và xem phản hồi tone, clarity, reader sentiment.",
          "Áp từng đề xuất phù hợp hoặc Apply all trên bản nháp.",
          "So sánh trước/sau; kiểm tra điều khoản và ý nghĩa không đổi.",
          "Hoàn tất checklist người nhận, tệp, link, nhãn và phê duyệt."
        ],
        verify: "Email rõ hơn nhưng giữ nguyên sự thật, nghĩa nghiệp vụ/pháp lý và phạm vi người nhận."
      }
    ],
    controls: [
      "Checklist bốn mắt cho thư nhạy cảm để tránh gửi nhầm người/file.",
      "Reload thread để tránh summary bỏ sót email mới.",
      "Chỉ cung cấp facts đã xác minh; draft có thể bịa hoặc điền điểm trống.",
      "Không copy thư mã hóa/IRM sang nơi khác để dùng Copilot.",
      "Coi chỉ dẫn nằm trong email bên ngoài là dữ liệu không tin cậy, không phải lệnh."
    ],
    faqs: [
      ["Dùng Copilot trên shared/delegated mailbox?", "Microsoft có giới hạn đối với các kịch bản Outlook; SME phải xác nhận và không dùng workaround."],
      ["Có tóm tắt email mã hóa/ký số/IRM?", "Nhiều loại không được hỗ trợ; không hạ bảo vệ để dùng tính năng."],
      ["Summary có đọc attachment?", "Một số client có lựa chọn riêng cho file; vẫn phải mở file gốc kiểm tra."],
      ["Draft có tự gửi email?", "Không trong quy trình NAB; người dùng phải review và bấm Send."],
      ["Citation nghĩa là kết luận chắc chắn đúng?", "Không; citation chỉ dẫn tới email nguồn, phải đọc ngữ cảnh."],
      ["Có dùng Copilot quyết định mail ưu tiên?", "Chỉ hỗ trợ; người dùng chịu trách nhiệm và phải kiểm tra mailbox thực tế."],
      ["Không thấy nút Copilot?", "Kiểm tra primary mailbox, tài khoản, app và license rồi liên hệ CNTT."],
      ["Draft with Copilot hỗ trợ plain text?", "Có giới hạn theo client; không tự đổi định dạng nếu policy NAB yêu cầu plain text."]
    ],
    sources: [
      ["Summarize an email thread", "https://support.microsoft.com/en-us/outlook/copilot-pages/summarize-an-email-thread-with-copilot-in-outlook"],
      ["Draft an email with Copilot", "https://support.microsoft.com/en-us/outlook/copilot-pages/draft-an-email-message-with-copilot-in-outlook"],
      ["Get email coaching", "https://support.microsoft.com/en-us/outlook/copilot-pages/get-email-coaching-with-copilot-in-outlook"],
      ["FAQ about Copilot in Outlook", "https://support.microsoft.com/en-us/outlook/frequently-asked-questions-about-copilot-in-outlook"]
    ]
  }),
  msChapter({
    id: 8,
    slug: "chapter-08-ms365-word.html",
    navTitle: "Microsoft Word",
    title: "Microsoft Word và Copilot: soạn thảo, viết lại và tóm tắt",
    audience: "Người soạn thông báo, tờ trình, hướng dẫn, biên bản và tài liệu nghiệp vụ",
    summary: "Bắt đầu từ template NAB và nguồn được phép; mọi nội dung AI tạo phải được so sánh với nguồn, review phiên bản và phê duyệt trước ban hành.",
    objectives: ["Tạo bản nháp từ nguồn được phép.", "Viết lại không làm đổi nghĩa.", "Tóm tắt/hỏi đáp có dẫn chiếu và bảo toàn phiên bản."],
    prerequisites: [
      "Word/client, license và tenant feature được NAB hỗ trợ.",
      "Nguồn trên OneDrive/SharePoint NAB có quyền phù hợp.",
      "SME xác nhận reference file/email/meeting, automatic summary và Connected Experiences; lưu version gốc trước sửa."
    ],
    useCases: [
      { title: "Draft từ nguồn", text: "Tạo dàn ý/bản nháp theo template và tập nguồn nhỏ, liên quan." },
      { title: "Rewrite", text: "Chỉnh tone/độ dài, dùng Compare/Track Changes để thấy khác biệt." },
      { title: "Summary/Q&A", text: "Tìm mục tiêu, nghĩa vụ, owner và deadline; mở đoạn nguồn." }
    ],
    walkthroughs: [
      {
        title: "Tạo bản nháp có nguồn",
        intro: "Mở template NAB trước khi sinh nội dung.",
        steps: [
          "Xác định audience, mục đích và cấu trúc.",
          "Trong Copilot, chọn đúng file/email/meeting bằng '/' nếu được bật; dùng tập nguồn nhỏ và mới nhất.",
          "Generate và kiểm tra outline trước.",
          "Keep/Regenerate/Discard theo kết quả; đối chiếu từng fact với nguồn.",
          "Chuyển bản đã biên tập vào luồng review chính thức."
        ],
        verify: "Template, nguồn, phiên bản, số liệu, điều khoản và reviewer đều rõ."
      },
      {
        title: "Viết lại có kiểm soát",
        intro: "Không để cải thiện câu chữ làm đổi nghĩa.",
        steps: [
          "Lưu version trước khi sửa.",
          "Chọn đúng đoạn và nêu tone/độ dài/điều không được đổi.",
          "So sánh các phương án.",
          "Replace/Insert below sau khi kiểm tra; với Visualize as Table, kiểm tra ngoại lệ/chú thích.",
          "Dùng Track Changes/Compare để người duyệt thấy khác biệt."
        ],
        verify: "Ý nghĩa, nghĩa vụ, phạm vi và ngoại lệ không đổi ngoài chủ đích đã duyệt."
      },
      {
        title: "Tóm tắt và hỏi đáp tài liệu",
        intro: "Citation không thay việc đọc phần trọng yếu.",
        steps: [
          "Mở tài liệu và Summary/Copilot chat.",
          "Yêu cầu mục tiêu, nghĩa vụ, owner, deadline và mục tương ứng.",
          "Mở citation/reference trong document.",
          "Đọc nguyên đoạn và điều khoản liên quan trước/sau.",
          "Ghi rõ đầu ra là bản tóm tắt, không phải văn bản gốc."
        ],
        verify: "Tóm tắt không bỏ sót ngoại lệ hoặc nghĩa vụ quan trọng và trỏ được về nội dung gốc."
      }
    ],
    controls: [
      "Draft có thể thêm fact không có nguồn; đối chiếu từng thông tin quan trọng.",
      "Rewrite có thể đổi nghĩa pháp lý; dùng Compare và review bốn mắt.",
      "Chọn file cụ thể và rà ACL để tránh nguồn cũ/quyền rộng.",
      "Kiểm tra style/template, spelling, accessibility, comment và metadata trước phát hành.",
      "Không tham chiếu nguồn ngoài phạm vi dữ liệu được phép."
    ],
    faqs: [
      ["Có thể tạo tài liệu từ file/email/meeting?", "Nếu license/tenant hỗ trợ và người dùng có quyền; chọn nguồn cụ thể bằng giao diện được cấp."],
      ["Copilot có thay phê duyệt văn bản?", "Không."],
      ["Vì sao không thấy automatic summary?", "Phụ thuộc license/settings/vị trí lưu; dùng chat summary hoặc liên hệ CNTT."],
      ["Summary có citation đầy đủ?", "Không bảo đảm; phải đọc phần trọng yếu và nội dung về sau của tài liệu."],
      ["Rewrite có giữ nguyên nghĩa?", "Không bảo đảm; luôn so sánh."],
      ["Có thể biến đoạn thành bảng?", "Nếu UI hỗ trợ; phải kiểm tra dữ liệu, ngoại lệ và chú thích."],
      ["Nhiều nguồn hơn luôn tốt hơn?", "Không; chỉ chọn nguồn cần thiết, mới nhất và nhất quán."],
      ["Có ban hành ngay văn bản Copilot tạo?", "Không; phải fact-check, review nghiệp vụ/tuân thủ và phê duyệt."]
    ],
    sources: [
      ["Draft and add content with Copilot in Word", "https://support.microsoft.com/en-us/word/copilot/draft-and-add-content-with-copilot-in-word"],
      ["Rewrite text with Copilot in Word", "https://support.microsoft.com/en-us/word/copilot/rewrite-text-with-copilot-in-word"],
      ["Create a summary with Copilot in Word", "https://support.microsoft.com/en-us/word/copilot/create-a-summary-of-your-document-with-copilot-in-word"],
      ["Chat with Copilot about a Word document", "https://support.microsoft.com/en-us/word/copilot/chat-with-copilot-about-your-word-document"]
    ]
  }),
  msChapter({
    id: 9,
    slug: "chapter-09-ms365-excel.html",
    navTitle: "Microsoft Excel",
    title: "Microsoft Excel và Copilot: phân tích có thể đối soát",
    audience: "ĐVKD và analyst lập báo cáo, theo dõi KPI hoặc phân tích dữ liệu",
    summary: "Copilot có thể hỗ trợ làm sạch, công thức, insight và biểu đồ; mọi thay đổi phải có bản sao/version, control total, sample test và người duyệt nghiệp vụ.",
    objectives: ["Chuẩn hóa dữ liệu trước phân tích.", "Tạo/giải thích công thức có kiểm chứng.", "Tạo insight/PivotTable/chart có thể truy vết."],
    prerequisites: [
      "Workbook trong kho được phép, đúng nhãn/quyền và có bản sao hoặc version history.",
      "Dữ liệu có header duy nhất, kiểu dữ liệu nhất quán, không merged cell hoặc blank row chia cắt.",
      "SME xác nhận UI Edit/Plan/Chat, web import, skills/model và direct-edit đang được bật."
    ],
    useCases: [
      { title: "Chuẩn hóa", text: "Kiểm tra header, loại dữ liệu, missing value và control total." },
      { title: "Công thức", text: "Đề xuất và giải thích tham chiếu; test case biên trước fill toàn cột." },
      { title: "Pivot/chart", text: "Chốt metric, aggregation, dimension, time grain, filter và trục." }
    ],
    walkthroughs: [
      {
        title: "Chuẩn hóa và tìm insight",
        intro: "Làm việc trên bản sao và ghi control total trước khi thay đổi.",
        steps: [
          "Mở bản sao, ghi row count và control total.",
          "Định dạng Table khi phù hợp; sửa header, kiểu ngày/số và đánh dấu missing values.",
          "Chọn Chat/Plan thay direct Edit nếu chỉ muốn phân tích và UI cho phép.",
          "Prompt nêu sheet, column/range và câu hỏi; yêu cầu trend/outlier cùng bảng nguồn.",
          "Đối chiếu row/filter và ít nhất ba mẫu."
        ],
        verify: "Row count, control total và mẫu nguồn không thay đổi ngoài chủ đích đã ghi."
      },
      {
        title: "Tạo công thức có kiểm soát",
        intro: "Yêu cầu giải thích trước khi ghi vào workbook.",
        steps: [
          "Chọn vùng/cột mục tiêu.",
          "Yêu cầu đề xuất công thức, giải thích từng tham chiếu và chưa ghi khi chưa xác nhận.",
          "Kiểm tra relative/absolute reference, blank, error, zero, divide-by-zero và locale.",
          "Áp trên bản sao; tính thủ công 3–5 dòng cùng control total.",
          "Với lookup, kiểm tra key trùng/thiếu và kiểu join trước fill toàn cột."
        ],
        verify: "Đầu, giữa, cuối và các case ngoại lệ đều khớp tính thủ công/nguồn chuẩn."
      },
      {
        title: "Tạo PivotTable hoặc biểu đồ",
        intro: "Nêu phép tổng hợp và trục để tránh biểu diễn sai.",
        steps: [
          "Prompt nêu metric, aggregation, dimension, time grain và filter.",
          "Tạo/đề xuất PivotTable hoặc chart theo tính năng được cấp.",
          "Kiểm tra source range, Sum/Average/Count, filter, date grouping, axis, unit/currency và refresh.",
          "Đối chiếu tổng với nguồn.",
          "Ghi kỳ dữ liệu, nguồn và giới hạn trên chart trước khi sử dụng."
        ],
        verify: "Biểu đồ không che filter, cắt trục gây hiểu sai hoặc dùng sai mẫu số/đơn vị."
      }
    ],
    controls: [
      "Direct Edit có thể sửa workbook; dùng bản sao/version/Undo và review change history.",
      "Công thức cần sample test và control total; không tin giải thích mà không tính lại.",
      "Garbage-in, garbage-out: data quality gate trước AI.",
      "Trend phụ thuộc filter/time grain; ghi kỳ và phạm vi.",
      "Cấm dùng insight AI làm quyết định tín dụng, phê duyệt hoặc kết luận cuối."
    ],
    faqs: [
      ["Dữ liệu bắt buộc là Table?", "Không phải mọi trải nghiệm đều bắt buộc, nhưng Table là chuẩn khuyến nghị để phạm vi rõ và dễ kiểm chứng."],
      ["Có cần AutoSave?", "Khả năng phụ thuộc client; NAB vẫn yêu cầu bản sao/version history trước direct edit."],
      ["Công thức Copilot tạo có đáng tin tuyệt đối?", "Không; kiểm tra tham chiếu, case biên và control total."],
      ["Có thể tạo PivotTable/chart?", "Nếu feature được cấp; phải kiểm tra aggregation, filter và axis."],
      ["Copilot có sửa trực tiếp workbook?", "Một số chế độ có thể sửa trực tiếp; dùng Plan/Chat hoặc bản sao để giảm rủi ro."],
      ["Có đưa dữ liệu khách hàng vào?", "Chỉ khi chính sách, nhãn, quyền và môi trường cho phép; tối thiểu hóa dữ liệu."],
      ["Có dùng insight để phê duyệt tín dụng?", "Không; chỉ hỗ trợ phân tích, quyết định thuộc người có thẩm quyền."],
      ["Kết quả không đúng thì làm gì?", "Kiểm tra header, kiểu dữ liệu, ô trống, filter, range và prompt; nếu vẫn sai, dừng và xử lý thủ công/Service Desk."]
    ],
    sources: [
      ["Get started with Copilot in Excel", "https://support.microsoft.com/en-us/excel/copilot/get-started-with-copilot-in-excel"],
      ["Data insights with Copilot in Excel", "https://support.microsoft.com/en-us/excel/copilot/data-insights-with-copilot-in-excel"],
      ["Visualize data with Copilot in Excel", "https://support.microsoft.com/en-us/excel/copilot/visualize-your-data-with-copilot-in-excel"],
      ["Copilot in Excel tips", "https://support.microsoft.com/en-us/excel/copilot/copilot-in-excel-tips"]
    ]
  }),
  msChapter({
    id: 10,
    slug: "chapter-10-ms365-powerpoint.html",
    navTitle: "Microsoft PowerPoint",
    title: "Microsoft PowerPoint và Copilot: trình bày đúng nguồn, đúng thương hiệu",
    audience: "Người tạo báo cáo, đề xuất, đào tạo và thuyết trình nội bộ",
    summary: "Copilot hỗ trợ outline, slide, summary và speaker notes; template NAB, nguồn, hình ảnh, accessibility và phê duyệt vẫn do con người kiểm soát.",
    objectives: ["Sinh outline/deck theo template NAB.", "Thêm slide từ nguồn được phép.", "Kiểm soát facts, brand, hình ảnh và accessibility."],
    prerequisites: [
      "PowerPoint/client NAB, license/tenant phù hợp và file nguồn đúng quyền.",
      "Template/Brand Kit NAB đã được Brand owner duyệt.",
      "SME xác nhận Designer, Brand Kit, Agent/Edit mode, file reference và rollout."
    ],
    useCases: [
      { title: "Deck từ outline", text: "Mở template NAB, review outline rồi mới tạo slide." },
      { title: "Slide từ nguồn", text: "Chỉ rõ mục/section nguồn, kiểm tra số liệu và thêm citation." },
      { title: "Summary/notes", text: "Dùng để chuẩn bị, không thay việc đọc slide và tập dượt." }
    ],
    walkthroughs: [
      {
        title: "Tạo deck từ outline",
        intro: "Template NAB phải được mở trước.",
        steps: [
          "Mở template NAB đã duyệt.",
          "Prompt nêu audience, mục tiêu, số phần, tone, CTA và nguồn.",
          "Nếu Reference a file hiển thị, chọn file mới nhất được phép.",
          "Review/refine outline trước khi Generate.",
          "Kiểm tra layout/template và chỉnh thủ công; chưa phát hành."
        ],
        verify: "Deck bám đúng mục tiêu, template và nguồn; không thêm claim không có căn cứ."
      },
      {
        title: "Thêm slide từ nguồn",
        intro: "Chỉ rõ section để hạn chế suy diễn.",
        steps: [
          "Đặt con trỏ đúng vị trí và mô tả slide cần thêm.",
          "Reference file hoặc dùng '/' theo UI được bật.",
          "Chỉ rõ mục/section cần dùng.",
          "Đối chiếu slide với đoạn nguồn, số liệu và ngữ cảnh.",
          "Sửa title/visual/footnote và thêm citation theo chuẩn NAB."
        ],
        verify: "Mọi số liệu và thông điệp truy được về phiên bản nguồn cụ thể."
      },
      {
        title: "Summary và speaker notes",
        intro: "Người thuyết trình phải duyệt từng note.",
        steps: [
          "Yêu cầu summary, key slides hoặc action items.",
          "Mở reference về slide và đối chiếu.",
          "Nếu Generate speaker notes được bật, tạo cho slide hiện tại hoặc toàn deck.",
          "Review từng note, loại claim/cam kết không có nguồn.",
          "Tập dượt và cập nhật bản cuối."
        ],
        verify: "Notes không thêm thông tin chưa duyệt và thống nhất với nội dung hiển thị trên slide."
      }
    ],
    controls: [
      "Mở template NAB trước và bắt buộc Brand review để tránh output generic/off-brand.",
      "Reference file cụ thể, đúng phiên bản; kiểm tra số liệu và chart.",
      "Ảnh AI/asset phải kiểm tra bản quyền, provenance, tính phù hợp và nguy cơ gây hiểu nhầm.",
      "Kiểm tra alt text, reading order, contrast, font và mật độ nội dung.",
      "Speaker notes có thể sai hoặc thêm cam kết; người trình bày chịu trách nhiệm."
    ],
    faqs: [
      ["Vì sao phải mở template NAB trước?", "Copilot có thể dùng template/layout để giữ theme; đây là bước bắt buộc về brand."],
      ["Có tạo deck từ file?", "Khi feature/reference được bật và người dùng có quyền; phải review toàn bộ output."],
      ["Có thêm một slide từ file?", "Có nếu được bật; chỉ rõ section/topic để hạn chế suy diễn."],
      ["Summary có thay việc đọc deck?", "Không; dùng để định hướng rồi mở slide nguồn."],
      ["Speaker notes dùng cho mọi deck?", "Feature/license phụ thuộc tenant và deck lớn cần kiểm tra kỹ; SME xác nhận."],
      ["Có cần Designer license?", "Một số chức năng có thể cần; SME xác nhận license NAB."],
      ["Hình do Copilot chọn/tạo dùng ngay?", "Không; kiểm tra bản quyền, brand, phù hợp và provenance."],
      ["Có phát hành ngay sau Generate?", "Không; phải fact-check, brand/accessibility review và approval."]
    ],
    sources: [
      ["Create a presentation with Copilot", "https://support.microsoft.com/en-us/powerpoint/copilot/create-a-new-presentation-with-copilot-in-powerpoint"],
      ["Add a slide from a file", "https://support.microsoft.com/en-US/PowerPoint/copilot/add-a-slide-from-a-file-with-copilot-in-powerpoint"],
      ["Summarize a presentation", "https://support.microsoft.com/en-US/PowerPoint/copilot/summarize-your-presentation-with-copilot-in-powerpoint"],
      ["Add speaker notes using Copilot", "https://support.microsoft.com/en-us/powerpoint/copilot/add-speaker-notes-to-your-presentations-using-copilot"],
      ["FAQ about Copilot in PowerPoint", "https://support.microsoft.com/en-US/PowerPoint/frequently-asked-questions-about-copilot-in-powerpoint"],
      ["Keep your presentation on brand", "https://support.microsoft.com/en-US/PowerPoint/copilot/keep-your-presentation-on-brand-with-copilot"]
    ]
  })
];
