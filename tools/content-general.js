"use strict";

const glossaryRows = require("./content-glossary");

const sourceDate = "19/08/2026";
const securityWarning = "Không nhập, sao chép hoặc tải dữ liệu khách hàng, dữ liệu giao dịch, tài liệu mật, thông tin xác thực hoặc dữ liệu nội bộ nhạy cảm lên các dịch vụ AI công cộng khi chưa được phê duyệt.";
const dataClassificationRows = [
  ["Được phép", "Nội dung công khai; văn bản mẫu không có dữ liệu thật", "Có thể sử dụng trong công cụ đã được NAB cho phép; vẫn cần kiểm tra nguồn và bản quyền"],
  ["Cần thận trọng", "Nội dung công việc nội bộ nhưng không có dữ liệu nhạy cảm", "Thực hiện theo quy định nội bộ và chỉ trong môi trường, tài khoản, tính năng đã được phê duyệt"],
  ["Nghiêm cấm", "Dữ liệu khách hàng, giao dịch, tài khoản, CCCD, mật khẩu, khóa API, dữ liệu mật, mã nguồn nhạy cảm, cấu hình hệ thống", "Không được đưa lên dịch vụ AI công cộng khi chưa được phê duyệt"]
];

module.exports = [
  {
    id: 1,
    slug: "chapter-01-tong-quan.html",
    navTitle: "Tổng quan",
    title: "Cẩm nang ứng dụng AI và công nghệ trong công việc tại NAB",
    group: "AI trong công việc",
    eyebrow: "Bắt đầu tại đây",
    kind: "policy",
    statusLabel: "Hướng dẫn nội bộ",
    statusText: "Tài liệu định hướng chung; các quy định hiện hành của NAB luôn có thứ tự ưu tiên cao hơn nội dung hướng dẫn này.",
    summary: "Cẩm nang giúp người dùng chọn đúng công cụ, bảo vệ dữ liệu, kiểm chứng kết quả và phối hợp với Khối CNTT khi đưa công nghệ vào công việc.",
    audience: "Toàn thể cán bộ nhân viên NAB",
    owner: "Chủ biên / Khối CNTT (chờ phê duyệt)",
    objectives: [
      "Hiểu phạm vi cẩm nang và cách bắt đầu từ nhu cầu công việc thực tế.",
      "Ưu tiên Microsoft 365 và Amazon Quick trong phạm vi tính năng, tài khoản và quyền đã được NAB cấp.",
      "Biết trách nhiệm của Đơn vị nghiệp vụ, Khối CNTT và các đơn vị kiểm soát."
    ],
    prerequisites: [
      "Đọc Chương 02 trước khi đưa bất kỳ dữ liệu nào vào công cụ AI.",
      "Sử dụng tài khoản do NAB cấp và tuân thủ quyền truy cập hiện có.",
      "Đối chiếu chính sách, quy trình nghiệp vụ và hướng dẫn ATTT đang có hiệu lực."
    ],
    useCases: [
      { title: "Microsoft 365", text: "Email, họp, soạn thảo, bảng tính và trình bày trong môi trường làm việc NAB." },
      { title: "Amazon Quick", text: "Không gian cộng tác, Chat Agents, dữ liệu, Dashboard, nghiên cứu và tự động hóa theo quyền được cấp." },
      { title: "AI tham khảo", text: "Chỉ tìm hiểu bằng dữ liệu công khai; không sử dụng dữ liệu của Nam A Bank hoặc dữ liệu nội bộ." }
    ],
    featureSections: [{
      id: "vai-tro-va-trach-nhiem",
      title: "Vai trò và trách nhiệm",
      intro: "Ứng dụng công nghệ hiệu quả cần mục tiêu nghiệp vụ rõ ràng, nền tảng phù hợp và kiểm soát đúng mức.",
      blocks: [{
        type: "table",
        headers: ["Đơn vị", "Trách nhiệm chính", "Khi cần phối hợp"],
        rows: [
          ["Đơn vị nghiệp vụ", "Xác định mục tiêu, dữ liệu, tiêu chí đúng và chịu trách nhiệm về quyết định cuối", "Cần tư vấn công cụ, cấp quyền, tích hợp hoặc xử lý sự cố"],
          ["Khối CNTT", "Tư vấn nền tảng, quyền, cấu hình, tích hợp, vận hành và hỗ trợ kỹ thuật", "Cần data owner, SME hoặc cấp phê duyệt xác nhận nghiệp vụ"],
          ["Đơn vị kiểm soát", "Đánh giá theo chức năng về ATTT, dữ liệu, tuân thủ, pháp chế hoặc rủi ro", "Use case có dữ liệu nhạy cảm, kết nối hệ thống hoặc tác động cao"]
        ]
      }]
    }],
    walkthroughs: [{
      title: "Từ nhu cầu đến yêu cầu hỗ trợ",
      intro: "Chuẩn bị đủ thông tin để Đơn vị nghiệp vụ và Khối CNTT cùng đánh giá giải pháp.",
      steps: [
        "Mô tả vấn đề hiện tại, đầu ra mong muốn và giá trị cần đo lường.",
        "Liệt kê nhóm người dùng, data owner, loại dữ liệu, nguồn và đích.",
        "Phân loại hành động: đọc, soạn nháp, ghi, chia sẻ, lên lịch hoặc thực thi.",
        "Ưu tiên Microsoft 365 hoặc Amazon Quick khi phù hợp và đã được cấp quyền.",
        "Nêu người chịu trách nhiệm, KPI thành công và cấp phê duyệt trong yêu cầu gửi Khối CNTT."
      ],
      verify: "Yêu cầu có đủ mục tiêu, người dùng, dữ liệu, hành động, owner, KPI và phê duyệt cần thiết."
    }],
    controls: [
      "AI chỉ hỗ trợ; người dùng và đơn vị nghiệp vụ chịu trách nhiệm về quyết định cuối cùng.",
      "Không cấp thêm quyền dữ liệu chỉ để công cụ tạo được câu trả lời.",
      "Không gửi thẳng đầu ra AI ra bên ngoài khi chưa kiểm chứng và phê duyệt.",
      "Mọi sự cố nhập nhầm dữ liệu phải được báo cáo theo kênh hiện hành."
    ],
    faqs: [
      ["Hai nhóm công cụ nào là trọng tâm?", "Microsoft 365 và Amazon Quick. Phạm vi tính năng thực tế phụ thuộc license, cấu hình và quyền của từng người dùng."],
      ["Khối CNTT hỗ trợ những gì?", "Khối CNTT tư vấn lựa chọn công cụ, cấp quyền, cấu hình kiểm soát, đánh giá tích hợp, hỗ trợ đào tạo, vận hành và xử lý sự cố."],
      ["Cần chuẩn bị gì khi gửi yêu cầu?", "Nêu mục tiêu, người dùng, data owner, loại dữ liệu, nguồn/đích, hành động, KPI thành công và người phê duyệt."],
      ["Tài liệu này có thay thế chính sách không?", "Không. Chính sách, quy trình nghiệp vụ, ATTT, pháp chế và phê duyệt hiện hành vẫn là nguồn bắt buộc."],
      ["Ai chịu trách nhiệm về đầu ra AI?", "Người sử dụng và cấp phê duyệt nghiệp vụ chịu trách nhiệm kiểm tra tính đúng, phù hợp và phạm vi sử dụng."]
    ],
    sources: [["Microsoft 365 Copilot documentation", "https://learn.microsoft.com/en-us/copilot/microsoft-365/"], ["Amazon Quick User Guide", "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"]],
    sourceDate
  },
  {
    id: 2,
    slug: "chapter-02-nguyen-tac-su-dung-ai-an-toan.html",
    navTitle: "Nguyên tắc sử dụng AI an toàn",
    title: "Nguyên tắc sử dụng AI an toàn",
    group: "AI trong công việc",
    eyebrow: "Nguyên tắc bắt buộc",
    kind: "policy",
    statusLabel: "Kiểm soát bắt buộc",
    statusText: "Chỉ đưa dữ liệu vào công cụ sau khi đã xác định đúng cấp phân loại và môi trường được NAB cho phép.",
    summary: "Bảo vệ dữ liệu, tài khoản và uy tín của NAB trước khi quan tâm đến tốc độ hoặc sự tiện lợi của AI.",
    audience: "Mọi người dùng công nghệ và AI tại NAB",
    owner: "Chủ biên + ATTT/Tuân thủ (chờ phê duyệt)",
    objectives: ["Nhận biết dữ liệu được phép, cần thận trọng và nghiêm cấm.", "Thực hiện cổng kiểm tra dữ liệu trước khi nhập, tải lên hoặc kết nối nguồn.", "Biết hành động ban đầu khi xảy ra sự cố."],
    prerequisites: ["Có danh mục phân loại dữ liệu NAB hiện hành để đối chiếu.", "Biết kênh Service Desk và kênh báo cáo sự cố ATTT.", "Đã xác nhận công cụ, tài khoản và tính năng được phép."],
    useCases: [{ title: "Nội dung công khai", text: "Kiểm tra nguồn, bản quyền và độ mới trước khi dùng." }, { title: "Nội dung nội bộ", text: "Thực hiện theo quy định nội bộ và chỉ dùng môi trường đã được phê duyệt." }, { title: "Dữ liệu nhạy cảm", text: "Không đưa lên dịch vụ AI công cộng khi chưa được phê duyệt." }],
    featureSections: [{
      id: "phan-loai-du-lieu",
      title: "Phân loại dữ liệu trước khi sử dụng AI",
      blocks: [
        { type: "table", headers: ["Phân loại", "Ví dụ", "AI công cộng"], rows: dataClassificationRows },
        { type: "callout", tone: "danger", title: "Cảnh báo bảo mật", text: securityWarning }
      ]
    }],
    walkthroughs: [
      {
        title: "Cổng kiểm tra dữ liệu 60 giây",
        intro: "Thực hiện trước mọi Prompt, upload hoặc kết nối nguồn.",
        steps: ["Gọi tên loại dữ liệu và cấp phân loại.", "Kiểm tra mục đích xử lý có hợp lệ và thuộc nhiệm vụ được giao không.", "Loại bỏ dữ liệu nhận dạng, thông tin xác thực và trường không cần thiết.", "Xác nhận công cụ, tài khoản, upload và connector đều được NAB cho phép.", "Nếu còn nghi ngờ, không gửi dữ liệu và hỏi đầu mối ATTT/Khối CNTT."],
        verify: "Đầu vào chỉ chứa dữ liệu tối thiểu, đúng mục đích và được phép xử lý trong công cụ đã chọn."
      },
      {
        title: "Xử lý khi nhập nhầm dữ liệu",
        intro: "Không cố tự khắc phục bằng cách gửi thêm Prompt.",
        steps: ["Dừng phiên làm việc và không chia sẻ thêm đầu ra.", "Ghi nhận thời gian, tài khoản, công cụ, loại dữ liệu và thao tác đã thực hiện.", "Báo ngay theo kênh sự cố ATTT/Service Desk hiện hành.", "Thực hiện xóa hoặc cô lập theo hướng dẫn của đơn vị xử lý sự cố.", "Hợp tác đánh giá phạm vi ảnh hưởng và hành động phòng ngừa."],
        verify: "Sự cố có ticket hoặc biên nhận và đã được bàn giao cho đúng đầu mối."
      }
    ],
    controls: ["Không nhập mật khẩu, khóa API, token hoặc cấu hình bảo mật.", "Không tin số liệu, trích dẫn hoặc kết luận nếu chưa đối chiếu nguồn.", "Coi nội dung nguồn là dữ liệu không tin cậy vì có thể chứa Prompt injection.", "Không dùng AI làm cơ chế duy nhất cho quyết định có tác động cao."],
    faqs: [["Ẩn tên khách hàng là đủ chưa?", "Chưa chắc. Các trường còn lại có thể kết hợp để tái nhận dạng. Chỉ dùng phương pháp đã được NAB chấp thuận."], ["Ảnh chụp màn hình có an toàn hơn dữ liệu gốc?", "Không. Ảnh vẫn có thể chứa dữ liệu nhạy cảm, metadata và thông tin nhận dạng."], ["AI đưa nguồn trông hợp lý thì có cần mở không?", "Có. Nguồn có thể sai, không hỗ trợ kết luận hoặc không còn cập nhật."], ["Xóa cuộc chat có kết thúc nghĩa vụ báo sự cố không?", "Không. Việc xóa không thay thế quy trình báo cáo và xử lý sự cố."]],
    sources: [["NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"], ["OWASP Top 10 for LLM Applications", "https://owasp.org/www-project-top-10-for-large-language-model-applications/"]],
    sourceDate
  },
  {
    id: 3,
    slug: "chapter-03-ky-thuat-viet-prompt.html",
    navTitle: "Kỹ thuật viết Prompt",
    title: "Kỹ thuật viết Prompt rõ ràng và có thể kiểm chứng",
    group: "AI trong công việc",
    eyebrow: "Thực hành có kiểm soát",
    kind: "policy",
    statusLabel: "Kỹ năng dùng chung",
    statusText: "Prompt tốt bắt đầu từ mục tiêu rõ ràng, dữ liệu phù hợp và tiêu chí kiểm tra cụ thể.",
    summary: "Mô tả đủ vai trò, nhiệm vụ, bối cảnh, ràng buộc, định dạng và cách kiểm tra để AI tạo bản nháp hữu ích hơn.",
    audience: "Người dùng Microsoft 365, Amazon Quick và các công cụ AI được phép",
    owner: "Chủ biên / Khối CNTT (chờ phê duyệt)",
    objectives: ["Viết Prompt có sáu thành phần cốt lõi.", "Chia nhỏ nhiệm vụ và đặt điểm kiểm tra.", "Nhận biết đầu ra cần đối chiếu trước khi sử dụng."],
    prerequisites: ["Đã đọc Chương 02.", "Đã chọn công cụ và môi trường được NAB cho phép.", "Có người chịu trách nhiệm nghiệp vụ đối với đầu ra."],
    useCases: [{ title: "Soạn thảo", text: "Nêu đối tượng đọc, giọng văn, độ dài và cấu trúc." }, { title: "Phân tích", text: "Nêu định nghĩa chỉ tiêu, phạm vi và phép đối soát." }, { title: "Nghiên cứu", text: "Giới hạn nguồn, thời gian và yêu cầu trích dẫn." }],
    featureSections: [{
      id: "sau-thanh-phan-prompt",
      title: "Sáu thành phần của một Prompt hữu ích",
      blocks: [{
        type: "table",
        headers: ["Thành phần", "Câu hỏi cần trả lời", "Ví dụ ngắn"],
        rows: [
          ["Vai trò", "AI đang hỗ trợ theo góc nhìn nào?", "Trợ lý biên tập nội dung"],
          ["Nhiệm vụ", "Đầu ra cụ thể là gì?", "Tạo dàn ý 5 phần"],
          ["Bối cảnh", "Thông tin tối thiểu nào cần biết?", "Đối tượng đọc là nhân viên mới"],
          ["Ràng buộc", "Điều gì không được làm?", "Không tự tạo số liệu"],
          ["Định dạng", "Kết quả cần trình bày ra sao?", "Bảng gồm 3 cột"],
          ["Kiểm tra", "Người dùng cần xác minh điều gì?", "Liệt kê giả định và điểm thiếu nguồn"]
        ]
      }]
    }],
    promptTemplate: "Vai trò: Bạn là trợ lý hỗ trợ [nghiệp vụ].\nNhiệm vụ: [đầu ra cần tạo].\nBối cảnh: [thông tin tối thiểu được phép sử dụng].\nRàng buộc: Không suy đoán; đánh dấu điểm thiếu dữ liệu; không tạo số liệu.\nĐịnh dạng: [bảng/danh sách/email/dàn ý], tối đa [độ dài].\nKiểm tra: Liệt kê giả định, nguồn và các điểm cần người dùng xác minh.",
    walkthroughs: [{
      title: "Cải tiến một Prompt yếu",
      intro: "Bắt đầu từ yêu cầu mơ hồ và bổ sung từng thành phần cần thiết.",
      steps: ["Thay 'viết báo cáo' bằng đầu ra, đối tượng và mục đích cụ thể.", "Thêm bối cảnh tối thiểu và định nghĩa thuật ngữ cần thiết.", "Nêu điều AI không được làm.", "Yêu cầu cấu trúc kết quả và giới hạn độ dài.", "Yêu cầu liệt kê giả định, nguồn và mục cần xác minh."],
      verify: "Một đồng nghiệp đọc Prompt có thể hiểu đầu ra mong muốn và cách đánh giá đạt hay chưa đạt."
    }],
    controls: ["Không đặt thông tin nhạy cảm trong Prompt hoặc mẫu dùng chung.", "Không yêu cầu AI đóng vai người phê duyệt.", "Tách tác vụ soạn nháp khỏi tác vụ gửi, xuất bản hoặc thay đổi hệ thống.", "Giữ lại nguồn và phiên bản tài liệu dùng để kiểm chứng."],
    faqs: [["Prompt càng dài càng tốt?", "Không. Prompt cần đủ rõ nhưng chỉ chứa thông tin tối thiểu cần thiết."], ["Có thể yêu cầu AI tự kiểm tra câu trả lời không?", "Có thể dùng như một lớp hỗ trợ, nhưng không thay thế kiểm tra độc lập của con người."], ["Có nên lưu Prompt tốt để tái sử dụng?", "Có, nếu không chứa dữ liệu nhạy cảm và được lưu trong kho NAB với phạm vi dùng rõ ràng."], ["Khi nào phải dừng?", "Dừng khi không xác định được quyền dữ liệu, công cụ được phép, nguồn kiểm chứng hoặc người chịu trách nhiệm cuối."]],
    sources: [["Microsoft guidance for writing effective prompts", "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5"], ["AWS Prompt Engineering Guidelines", "https://docs.aws.amazon.com/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/introduction.html"]],
    sourceDate
  },
  {
    id: 22,
    slug: "chapter-22-du-lieu-duoc-phep-khong-duoc-phep.html",
    navTitle: "Dữ liệu được phép và không được phép",
    title: "Dữ liệu được phép và không được phép khi sử dụng AI công cộng",
    group: "Phụ lục",
    eyebrow: "Phụ lục dữ liệu",
    kind: "policy",
    statusLabel: "Tra cứu nhanh",
    statusText: securityWarning,
    summary: "Bảng tra cứu nhanh giúp nhận biết ranh giới dữ liệu trước khi nhập nội dung, tải tệp, dùng ảnh hoặc kết nối nguồn với AI.",
    audience: "Mọi người dùng công nghệ và AI tại NAB",
    owner: "Chủ biên + ATTT/Tuân thủ (chờ phê duyệt)",
    objectives: ["Tra cứu nhanh ba mức phân loại.", "Nhận biết dữ liệu nhạy cảm ẩn trong ảnh, tệp và thông tin xác thực.", "Biết dừng và hỏi đúng đầu mối khi chưa chắc chắn."],
    prerequisites: ["Đối chiếu quy định NAB đang có hiệu lực.", "Xác định nguồn, chủ sở hữu và mục đích xử lý dữ liệu.", "Không tự suy diễn rằng dữ liệu được phép chỉ vì đã xóa tên."],
    useCases: [{ title: "Văn bản", text: "Kiểm tra dữ liệu thật, tên riêng, số tài khoản và nội dung nội bộ." }, { title: "Ảnh và màn hình", text: "Kiểm tra thông tin nhận dạng, metadata và chi tiết hệ thống." }, { title: "Tệp và kết nối", text: "Kiểm tra quyền, dữ liệu ẩn, khóa API, token và phạm vi connector." }],
    featureSections: [{
      id: "bang-phan-loai",
      title: "Bảng phân loại dữ liệu",
      blocks: [
        { type: "table", headers: ["Phân loại", "Ví dụ", "AI công cộng"], rows: dataClassificationRows },
        { type: "callout", tone: "danger", title: "Cảnh báo bảo mật", text: securityWarning }
      ]
    }],
    walkthroughs: [{
      title: "Kiểm tra đầu vào trước khi gửi",
      intro: "Áp dụng cho văn bản, ảnh, tệp đính kèm và kết nối dữ liệu.",
      steps: ["Xác định dữ liệu có thuộc Nam A Bank, khách hàng hoặc đối tác không.", "Kiểm tra ảnh chụp màn hình và metadata có làm lộ hệ thống hoặc danh tính không.", "Loại bỏ mật khẩu, token, khóa API, cấu hình và mã nguồn nhạy cảm.", "Đánh giá khả năng tái nhận dạng khi kết hợp nhiều trường dữ liệu.", "Nếu chưa chắc chắn, không gửi và hỏi data owner, ATTT hoặc Khối CNTT."],
      verify: "Không còn dữ liệu cấm, thông tin xác thực, chi tiết hệ thống hoặc khả năng tái nhận dạng chưa được xử lý."
    }],
    controls: ["Ảnh chụp màn hình chịu cùng quy tắc như dữ liệu gốc.", "Xóa tên chưa chắc đã ngăn tái nhận dạng.", "Không đưa mật khẩu, token, khóa API hoặc cấu hình hệ thống vào Prompt.", "Không tự tạo thêm ngoại lệ ngoài chính sách hiện hành."],
    faqs: [["Ảnh chụp màn hình có được xem là dữ liệu công khai?", "Không. Ảnh có thể chứa dữ liệu khách hàng, giao dịch, thông tin hệ thống và metadata."], ["Xóa tên và số tài khoản là đủ chưa?", "Chưa chắc. Các trường khác có thể kết hợp để nhận ra cá nhân hoặc tổ chức."], ["Có thể tải tệp đã đặt mật khẩu lên AI không?", "Không. Việc đặt mật khẩu không thay đổi phân loại hoặc quyền được phép xử lý."], ["Không chắc dữ liệu thuộc mức nào thì làm gì?", "Không nhập hoặc tải lên; hỏi data owner, ATTT, Tuân thủ hoặc Khối CNTT theo kênh hiện hành."]],
    sources: [["NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"], ["OWASP Top 10 for LLM Applications", "https://owasp.org/www-project-top-10-for-large-language-model-applications/"]],
    sourceDate
  },
  {
    id: 23,
    slug: "chapter-23-giai-thich-thuat-ngu.html",
    navTitle: "Giải thích thuật ngữ",
    title: "Giải thích thuật ngữ công nghệ và AI",
    group: "Phụ lục",
    eyebrow: "Phụ lục thuật ngữ",
    kind: "policy",
    statusLabel: "Tra cứu nhanh",
    statusText: "Giải thích ngắn gọn theo ngữ cảnh của cẩm nang; thuật ngữ chuyên môn có thể có định nghĩa chi tiết hơn trong tài liệu kỹ thuật.",
    summary: "Các thuật ngữ thường gặp được giải thích bằng tiếng Việt đơn giản để người dùng không chuyên CNTT dễ tra cứu.",
    audience: "Toàn thể cán bộ nhân viên NAB",
    owner: "Chủ biên / Khối CNTT (chờ phê duyệt)",
    objectives: ["Hiểu các thuật ngữ cốt lõi trong cẩm nang.", "Phân biệt chatbot, AI Agent, Workflow và Automation.", "Nhận biết Hallucination, Deepfake và nhu cầu kiểm chứng."],
    prerequisites: ["Không yêu cầu kiến thức kỹ thuật chuyên sâu.", "Đọc thuật ngữ trong bối cảnh của từng chương.", "Hỏi Khối CNTT khi thuật ngữ liên quan đến cấu hình hoặc tích hợp thực tế."],
    useCases: [{ title: "Đọc hướng dẫn", text: "Tra nhanh thuật ngữ xuất hiện trong các chương." }, { title: "Trao đổi use case", text: "Dùng từ thống nhất khi mô tả nhu cầu với Khối CNTT." }, { title: "Kiểm soát rủi ro", text: "Nhận biết Hallucination, Deepfake và AI Agent." }],
    featureSections: [{
      id: "bang-thuat-ngu",
      title: "Bảng thuật ngữ",
      blocks: [{ type: "table", headers: ["Thuật ngữ", "Tên tiếng Việt", "Giải thích đơn giản"], rows: glossaryRows }]
    }],
    walkthroughs: [{
      title: "Tra cứu một thuật ngữ",
      intro: "Dùng định nghĩa ngắn để hiểu tài liệu trước khi xem hướng dẫn kỹ thuật chi tiết.",
      steps: ["Tìm thuật ngữ theo tên tiếng Anh hoặc chữ viết tắt.", "Đọc tên tiếng Việt và phần giải thích đơn giản.", "Quay lại chương đang đọc để đặt thuật ngữ vào đúng bối cảnh.", "Nếu liên quan quyền, dữ liệu hoặc tích hợp, hỏi Khối CNTT trước khi thao tác."],
      verify: "Bạn có thể giải thích thuật ngữ bằng một câu và biết khi nào cần hỏi thêm chuyên gia."
    }],
    controls: ["Không coi định nghĩa ngắn là hướng dẫn cấu hình kỹ thuật.", "Không suy diễn quyền sử dụng công cụ từ việc thuật ngữ xuất hiện trong cẩm nang.", "Các yêu cầu về dữ liệu và phê duyệt vẫn áp dụng đầy đủ."],
    faqs: [["AI và Generative AI có giống nhau không?", "Generative AI là một nhóm trong AI, tập trung vào việc tạo nội dung mới."], ["Chatbot và AI Agent khác nhau thế nào?", "Chatbot chủ yếu trả lời theo lượt; AI Agent có thể lập kế hoạch, dùng công cụ và thực hiện nhiều bước."], ["Hallucination có nghĩa là AI cố ý nói dối?", "Không. Đây là hiện tượng mô hình tạo thông tin nghe hợp lý nhưng không có căn cứ hoặc không chính xác."], ["Multimodal là gì?", "Là khả năng xử lý nhiều loại dữ liệu như văn bản, hình ảnh, âm thanh và video."]],
    sources: [["Microsoft 365 Copilot documentation", "https://learn.microsoft.com/en-us/copilot/microsoft-365/"], ["Amazon Quick User Guide", "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"]],
    sourceDate
  }
];
