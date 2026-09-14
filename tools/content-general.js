"use strict";

const sourceDate = "19/08/2026";

module.exports = [
  {
    id: 1,
    slug: "chapter-01-tong-quan.html",
    navTitle: "Tổng quan sáng kiến",
    title: "Tổng quan hướng dẫn ứng dụng công nghệ và AI tại NAB",
    group: "Nền tảng chung",
    eyebrow: "Bắt đầu tại đây",
    kind: "policy",
    statusLabel: "Hướng dẫn nội bộ",
    statusText: "Tài liệu định hướng chung; các quy định hiện hành của NAB luôn có thứ tự ưu tiên cao hơn nội dung hướng dẫn này.",
    summary: "Bộ hướng dẫn giúp Đơn vị kinh doanh lựa chọn đúng công cụ, làm việc hiệu quả và phối hợp với Khối CNTT để triển khai các nhu cầu công nghệ an toàn.",
    audience: "Toàn thể cán bộ nhân viên NAB",
    owner: "Chủ biên / Khối CNTT (chờ phê duyệt)",
    objectives: [
      "Hiểu phạm vi, cách tra cứu và trách nhiệm của từng bên khi sử dụng công nghệ/AI.",
      "Phân biệt Microsoft 365 và Amazon Quick đang được sử dụng tại NAB với các công cụ chỉ mang tính tham khảo.",
      "Biết khi nào cần dừng thao tác và liên hệ Khối CNTT hoặc đơn vị kiểm soát."
    ],
    prerequisites: [
      "Đọc chương Quản trị rủi ro trước khi đưa bất kỳ dữ liệu nào vào công cụ AI.",
      "Sử dụng tài khoản do NAB cấp và tuân thủ quyền truy cập hiện có.",
      "Đối chiếu chính sách, quy trình nghiệp vụ và hướng dẫn ATTT đang có hiệu lực."
    ],
    useCases: [
      { title: "Microsoft 365", text: "Ưu tiên cho email, họp, soạn thảo, bảng tính và trình bày trong môi trường làm việc NAB." },
      { title: "Amazon Quick", text: "Ưu tiên cho phân tích, dashboard, nghiên cứu có căn cứ, tự động hóa và prototype theo quyền được cấp." },
      { title: "Công cụ tham khảo", text: "Chỉ dùng sau khi có phê duyệt rõ ràng; việc xuất hiện trong tài liệu không phải là quyền sử dụng." }
    ],
    walkthroughs: [
      {
        title: "Chọn đúng lối vào theo nhu cầu",
        intro: "Dùng quy trình ngắn này trước khi mở một công cụ.",
        steps: [
          "Xác định đầu ra cần tạo: email, tài liệu, bảng phân tích, dashboard hay nghiên cứu.",
          "Xác định dữ liệu đầu vào và cấp phân loại theo chính sách NAB.",
          "Ưu tiên Microsoft 365 hoặc Amazon Quick nếu use case phù hợp và tài khoản đã được cấp quyền.",
          "Nếu cần công cụ khác, dừng lại và gửi yêu cầu thẩm định cho Khối CNTT.",
          "Ghi nhận người chịu trách nhiệm kiểm tra và phê duyệt đầu ra trước khi sử dụng."
        ],
        verify: "Bạn phải trả lời được ba câu hỏi: dùng dữ liệu gì, công cụ có được phép không, ai kiểm tra kết quả."
      }
    ],
    controls: [
      "AI chỉ hỗ trợ; người dùng và đơn vị nghiệp vụ chịu trách nhiệm về quyết định cuối cùng.",
      "Không cấp thêm quyền dữ liệu chỉ để công cụ AI tạo được câu trả lời.",
      "Không gửi thẳng đầu ra AI cho khách hàng hoặc cơ quan bên ngoài khi chưa kiểm chứng và phê duyệt.",
      "Mọi sự cố nhập nhầm dữ liệu phải được báo cáo, không tự ý che giấu hoặc tiếp tục thử nghiệm."
    ],
    faqs: [
      ["Hai công cụ nào đang được ưu tiên tại NAB?", "Microsoft 365 và Amazon Quick. Phạm vi tính năng cụ thể vẫn phụ thuộc license, cấu hình tenant và quyền của từng người dùng."],
      ["Có thể dùng một công cụ khác vì thấy tiện hơn không?", "Không tự ý sử dụng với dữ liệu NAB. Hãy gửi use case cho Khối CNTT để đánh giá dữ liệu, hợp đồng, bảo mật và khả năng tích hợp."],
      ["Tài liệu này có thay thế quy trình nghiệp vụ không?", "Không. Quy trình nghiệp vụ, chính sách dữ liệu, ATTT, pháp chế và phê duyệt hiện hành vẫn là nguồn bắt buộc."],
      ["Ai chịu trách nhiệm về đầu ra AI?", "Người sử dụng và cấp phê duyệt nghiệp vụ chịu trách nhiệm kiểm tra tính đúng, phù hợp và phạm vi sử dụng."],
      ["Nội dung sẽ được cập nhật thế nào?", "Content owner rà soát định kỳ và cập nhật khi có thay đổi tenant, tính năng, chính sách hoặc phản hồi từ ĐVKD."]
    ],
    sources: [
      ["Microsoft 365 Copilot documentation", "https://learn.microsoft.com/en-us/copilot/microsoft-365/"],
      ["Amazon Quick User Guide", "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"]
    ],
    sourceDate
  },
  {
    id: 2,
    slug: "chapter-02-quan-tri-rui-ro.html",
    navTitle: "Quản trị rủi ro dữ liệu",
    title: "Quản trị rủi ro khi sử dụng công nghệ và AI",
    group: "Nền tảng chung",
    eyebrow: "Nguyên tắc bắt buộc",
    kind: "policy",
    statusLabel: "Kiểm soát bắt buộc",
    statusText: "Chỉ đưa dữ liệu vào công cụ sau khi đã xác định đúng cấp phân loại và môi trường được NAB cho phép.",
    summary: "Một câu trả lời nhanh không đáng để đánh đổi bí mật ngân hàng, dữ liệu cá nhân, quyền sở hữu trí tuệ hoặc uy tín của NAB.",
    audience: "Mọi người dùng công nghệ/AI tại NAB",
    owner: "Chủ biên + ATTT/Tuân thủ (chờ phê duyệt)",
    objectives: [
      "Nhận biết dữ liệu cần bảo vệ và các tình huống không được nhập vào công cụ.",
      "Kiểm soát hallucination, thiên lệch, prompt injection và chia sẻ quá quyền.",
      "Thực hiện đúng hành động ban đầu khi xảy ra sự cố."
    ],
    prerequisites: [
      "Có danh mục phân loại dữ liệu NAB hiện hành để đối chiếu.",
      "Biết kênh Service Desk và kênh báo cáo sự cố ATTT.",
      "Đã xác nhận công cụ, tài khoản, vùng lưu trữ và tính năng được phép."
    ],
    useCases: [
      { title: "Dữ liệu công khai", text: "Có thể dùng trong công cụ được phép nhưng vẫn kiểm tra bản quyền, độ mới và nguồn." },
      { title: "Dữ liệu nội bộ", text: "Chỉ dùng trong môi trường NAB đã được phê duyệt, đúng mục đích và tối thiểu cần thiết." },
      { title: "Dữ liệu hạn chế/nhạy cảm", text: "Không nhập nếu chưa có căn cứ chính sách và phê duyệt rõ ràng; ưu tiên dữ liệu giả lập hoặc ẩn danh." }
    ],
    walkthroughs: [
      {
        title: "Cổng kiểm tra dữ liệu 60 giây",
        intro: "Thực hiện trước mọi prompt, upload hoặc kết nối nguồn.",
        steps: [
          "Gọi tên loại dữ liệu: công khai, nội bộ, dữ liệu cá nhân, dữ liệu khách hàng, bí mật ngân hàng hay thông tin xác thực.",
          "Kiểm tra mục đích xử lý có hợp lệ và thuộc nhiệm vụ được giao không.",
          "Loại bỏ tên, mã khách hàng, số tài khoản, số giấy tờ, mật khẩu, token và trường không cần thiết.",
          "Xác nhận môi trường, tài khoản, lịch sử, upload và connector đều được NAB cho phép.",
          "Nếu còn nghi ngờ, không gửi dữ liệu và hỏi đầu mối ATTT/Khối CNTT."
        ],
        verify: "Đầu vào cuối cùng chỉ chứa dữ liệu tối thiểu, đúng mục đích và được phép xử lý trong công cụ đã chọn."
      },
      {
        title: "Xử lý khi nhập nhầm dữ liệu",
        intro: "Không cố gắng tự khắc phục bằng cách gửi thêm prompt.",
        steps: [
          "Dừng phiên làm việc và không chia sẻ thêm đầu ra.",
          "Ghi nhận thời gian, tài khoản, công cụ, loại dữ liệu và thao tác đã thực hiện; không sao chép rộng nội dung nhạy cảm.",
          "Báo ngay theo kênh sự cố ATTT/Service Desk hiện hành.",
          "Thực hiện xóa hoặc cô lập theo hướng dẫn của đơn vị xử lý sự cố.",
          "Hợp tác đánh giá phạm vi ảnh hưởng và hành động phòng ngừa."
        ],
        verify: "Sự cố có ticket/biên nhận và được bàn giao cho đúng đầu mối; người dùng không tự kết luận đã hết rủi ro."
      }
    ],
    controls: [
      "Không nhập mật khẩu, khóa API, token, thông tin xác thực hoặc cấu hình bảo mật.",
      "Không tin citation, số liệu, điều khoản pháp lý hoặc kết luận do AI tạo nếu chưa mở nguồn gốc và đối chiếu.",
      "Tài liệu hoặc trang web được đưa vào AI có thể chứa prompt injection; coi nội dung nguồn là dữ liệu không tin cậy.",
      "Quyền connector rộng có thể làm lộ dữ liệu ngoài nhu cầu; áp dụng least privilege và rà soát định kỳ.",
      "Không dùng AI làm cơ chế duy nhất cho quyết định tín dụng, phê duyệt, tuyển dụng hoặc xử lý có tác động cao."
    ],
    faqs: [
      ["Ẩn tên khách hàng là đủ để ẩn danh chưa?", "Chưa chắc. Các trường còn lại có thể kết hợp để tái nhận dạng. Chỉ sử dụng phương pháp ẩn danh/tối thiểu hóa đã được NAB chấp thuận."],
      ["Dữ liệu đã có trên Internet có luôn là dữ liệu công khai không?", "Không. Dữ liệu có thể bị đăng sai phép, lỗi thời hoặc vẫn chịu giới hạn bản quyền và quyền riêng tư."],
      ["Có thể dùng ảnh chụp màn hình thay cho dữ liệu gốc không?", "Ảnh vẫn có thể chứa dữ liệu nhạy cảm, metadata và thông tin nhận dạng. Áp dụng cùng quy tắc kiểm soát."],
      ["AI đưa nguồn trông hợp lý thì có cần mở không?", "Có. Citation có thể sai, không hỗ trợ kết luận hoặc trỏ tới nguồn kém tin cậy."],
      ["Xóa cuộc chat có kết thúc nghĩa vụ báo sự cố không?", "Không. Việc xóa không thay thế quy trình báo cáo, điều tra và xử lý sự cố."],
      ["Ai quyết định một loại dữ liệu được dùng?", "Căn cứ chính sách NAB và ý kiến của data owner, ATTT, Tuân thủ/Pháp chế cùng chủ sở hữu nền tảng khi cần."]
    ],
    sources: [
      ["NIST AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"],
      ["OWASP Top 10 for LLM Applications", "https://owasp.org/www-project-top-10-for-large-language-model-applications/"]
    ],
    sourceDate
  },
  {
    id: 3,
    slug: "chapter-03-quy-trinh-va-prompt.html",
    navTitle: "Quy trình và kỹ thuật prompt",
    title: "Quy trình sử dụng AI an toàn và kỹ thuật prompt",
    group: "Nền tảng chung",
    eyebrow: "Thực hành có kiểm soát",
    kind: "policy",
    statusLabel: "Quy trình dùng chung",
    statusText: "Áp dụng cho mọi công cụ; bước phân loại dữ liệu và kiểm chứng không được bỏ qua.",
    summary: "Prompt tốt bắt đầu từ mục tiêu rõ ràng, dữ liệu phù hợp và tiêu chí kiểm chứng — không phải từ việc đưa càng nhiều dữ liệu càng tốt.",
    audience: "Người dùng Microsoft 365, Amazon Quick và các công cụ AI được phép",
    owner: "Chủ biên / Khối CNTT (chờ phê duyệt)",
    objectives: [
      "Thực hiện quy trình chín bước từ xác định nhu cầu đến lưu trữ kết quả.",
      "Viết prompt có vai trò, nhiệm vụ, bối cảnh, ràng buộc, định dạng và nguồn.",
      "Xây dựng tiêu chí kiểm tra trước khi chấp nhận đầu ra."
    ],
    prerequisites: [
      "Đã đọc chương Quản trị rủi ro.",
      "Đã chọn công cụ và môi trường được NAB cho phép.",
      "Có người chịu trách nhiệm nghiệp vụ đối với đầu ra."
    ],
    useCases: [
      { title: "Soạn thảo", text: "Yêu cầu dàn ý, giọng văn, độ dài và đối tượng đọc; người dùng chịu trách nhiệm bản cuối." },
      { title: "Phân tích", text: "Nêu định nghĩa chỉ tiêu, phạm vi dữ liệu và phép đối soát mong muốn." },
      { title: "Nghiên cứu", text: "Giới hạn nguồn/thời gian, yêu cầu citation và mở từng nguồn gốc trước khi trích dẫn." }
    ],
    promptTemplate: "Vai trò: Bạn là trợ lý hỗ trợ [nghiệp vụ].\nNhiệm vụ: [đầu ra cần tạo].\nBối cảnh: [dữ liệu đã làm sạch và thông tin tối thiểu].\nRàng buộc: Không suy đoán; đánh dấu điểm thiếu dữ liệu; không tạo số liệu.\nĐịnh dạng: [bảng/danh sách/email/dàn ý], tối đa [độ dài].\nNguồn: Chỉ dựa trên [nguồn được phép]; gắn nguồn cho từng kết luận.\nKiểm tra: Liệt kê giả định và các điểm cần người dùng xác minh.",
    walkthroughs: [
      {
        title: "Quy trình chín bước",
        intro: "Dùng như checklist trước, trong và sau khi làm việc với AI.",
        steps: [
          "Xác định mục đích, đầu ra và người chịu trách nhiệm.",
          "Phân loại dữ liệu và chọn dữ liệu tối thiểu.",
          "Chọn công cụ, tài khoản và tính năng đã được phép.",
          "Làm sạch, ẩn danh hoặc thay bằng dữ liệu giả lập khi phù hợp.",
          "Viết prompt có ràng buộc và định dạng rõ ràng.",
          "Chia nhỏ tác vụ; không giao một lần cả quy trình có tác động cao.",
          "Kiểm tra nguồn, số liệu, logic, ngôn ngữ và thiên lệch.",
          "Xin phê duyệt của con người theo quy trình nghiệp vụ.",
          "Lưu trữ, áp nhãn, chia sẻ và ghi nhận sự cố đúng quy định."
        ],
        verify: "Có bằng chứng kiểm tra đủ cho mọi số liệu, tên riêng, cam kết, nguồn và quyết định quan trọng."
      },
      {
        title: "Cải tiến một prompt yếu",
        intro: "Ví dụ dùng dữ liệu giả lập, không dùng thông tin khách hàng.",
        steps: [
          "Thay yêu cầu mơ hồ 'viết báo cáo' bằng đầu ra, đối tượng và mục đích cụ thể.",
          "Thêm bối cảnh tối thiểu và định nghĩa thuật ngữ nghiệp vụ.",
          "Nêu điều AI không được làm: không bịa số liệu, không tự điền điểm còn thiếu.",
          "Yêu cầu cấu trúc kết quả và giới hạn độ dài.",
          "Yêu cầu liệt kê giả định, nguồn và mục cần người dùng xác minh."
        ],
        verify: "Một đồng nghiệp đọc prompt có thể hiểu đầu ra mong muốn và cách đánh giá đạt/chưa đạt."
      }
    ],
    controls: [
      "Không đặt thông tin nhạy cảm trong ví dụ prompt hoặc prompt mẫu dùng chung.",
      "Không yêu cầu AI đóng vai người phê duyệt hoặc che giấu điểm không chắc chắn.",
      "Tách tác vụ đọc/soạn thảo khỏi tác vụ ghi, gửi, xuất bản hoặc thay đổi hệ thống.",
      "Giữ lại nguồn gốc và phiên bản tài liệu được dùng để kiểm chứng."
    ],
    faqs: [
      ["Prompt càng dài càng tốt?", "Không. Prompt cần đủ rõ nhưng chỉ chứa dữ liệu tối thiểu cần thiết. Tách tác vụ lớn thành nhiều bước có điểm kiểm tra."],
      ["Có thể yêu cầu AI tự kiểm tra câu trả lời không?", "Có thể dùng như một lớp hỗ trợ, nhưng không thay thế việc mở nguồn và kiểm tra độc lập của con người."],
      ["Temperature hoặc chọn model nào là tốt nhất?", "Tài liệu này không cố định model. Hãy dùng cấu hình được quản trị viên NAB cung cấp và tập trung vào tiêu chí đầu ra."],
      ["Có nên lưu prompt tốt để tái sử dụng?", "Có, nếu prompt không chứa dữ liệu nhạy cảm và được lưu trong kho NAB với owner, phiên bản và phạm vi dùng rõ ràng."],
      ["Khi nào phải dừng?", "Dừng khi không xác định được quyền dữ liệu, công cụ được phép, nguồn kiểm chứng hoặc người chịu trách nhiệm cuối."]
    ],
    sources: [
      ["Microsoft guidance for writing effective prompts", "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5"],
      ["AWS Prompt Engineering Guidelines", "https://docs.aws.amazon.com/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/introduction.html"]
    ],
    sourceDate
  },
  {
    id: 22,
    slug: "chapter-22-tinh-huong-nghiep-vu.html",
    navTitle: "Tình huống nghiệp vụ",
    title: "Tình huống ứng dụng cho Đơn vị kinh doanh",
    group: "Ứng dụng và hỗ trợ",
    eyebrow: "Tra cứu theo công việc",
    kind: "policy",
    statusLabel: "Ưu tiên công cụ NAB",
    statusText: "Các tình huống dưới đây ưu tiên Microsoft 365 hoặc Amazon Quick và vẫn cần kiểm tra quyền/tính năng thực tế.",
    summary: "Bắt đầu từ nhu cầu nghiệp vụ rồi chọn công cụ phù hợp; không bắt đầu từ một tính năng AI chỉ vì nó đang có sẵn.",
    audience: "ĐVKD, quản lý và chuyên viên phân tích",
    owner: "Chủ biên + đại diện ĐVKD (chờ phê duyệt)",
    objectives: [
      "Ánh xạ công việc phổ biến sang Microsoft 365 hoặc Amazon Quick.",
      "Nhận biết đầu vào, người kiểm tra và hành vi cấm trong từng tình huống.",
      "Chuẩn bị yêu cầu rõ ràng khi cần Khối CNTT hỗ trợ."
    ],
    prerequisites: ["Đã phân loại dữ liệu.", "Có quyền truy cập công cụ và nguồn dữ liệu.", "Có tiêu chí nghiệp vụ để kiểm chứng đầu ra."],
    useCases: [
      { title: "Email và văn bản", text: "Outlook/Word: tạo bản nháp, biên tập; người dùng kiểm tra người nhận, số liệu, điều khoản và tệp đính kèm." },
      { title: "Họp và hành động", text: "Teams: transcript/tóm tắt nếu được phép; chủ trì xác nhận quyết định, owner và deadline." },
      { title: "Bảng tính và KPI", text: "Excel/Quick Sight: làm sạch, phân tích, dashboard; analyst đối soát nguồn, công thức và định nghĩa KPI." },
      { title: "Nghiên cứu", text: "Quick Research/Index: tổng hợp nguồn được phép; người dùng mở citation và đối chiếu nguồn độc lập." },
      { title: "Tự động hóa", text: "Quick Flows/Automate: bắt đầu read-only, thử nghiệm có kiểm soát; hành động ghi cần approval, UAT và rollback." },
      { title: "Trình bày", text: "PowerPoint/Canva AI được duyệt: tạo dàn ý/bản nháp; áp template NAB, nguồn, bản quyền và accessibility." }
    ],
    walkthroughs: [
      {
        title: "Từ biên bản họp đến danh sách hành động",
        intro: "Ưu tiên Teams và Word trong tenant NAB.",
        steps: [
          "Xác nhận việc ghi âm/transcript được phép và người tham dự đã được thông báo.",
          "Tạo tóm tắt theo cấu trúc: quyết định, hành động, owner, deadline và điểm còn mở.",
          "Đối chiếu transcript hoặc ghi chú gốc; không xem bản tóm tắt AI là biên bản đã duyệt.",
          "Chủ trì cuộc họp xác nhận nội dung và phạm vi người nhận.",
          "Lưu bản cuối vào kho NAB và áp quyền chia sẻ phù hợp."
        ],
        verify: "Mọi quyết định, owner và deadline đều có căn cứ trong cuộc họp và được người có thẩm quyền xác nhận."
      },
      {
        title: "Từ dữ liệu đến dashboard",
        intro: "Dùng Excel để chuẩn hóa và Amazon Quick Sight để phân phối insight khi phù hợp.",
        steps: [
          "Chốt định nghĩa KPI, nguồn, kỳ dữ liệu và data owner.",
          "Làm sạch dữ liệu; đối soát tổng và mẫu ngẫu nhiên.",
          "Tạo phân tích/dashboard, ghi rõ filter mặc định và thời điểm refresh.",
          "Kiểm thử row-level access bằng các vai trò đại diện.",
          "Phê duyệt nghiệp vụ trước khi chia sẻ rộng."
        ],
        verify: "Người xem hiểu KPI, phạm vi dữ liệu, thời điểm cập nhật và giới hạn của dashboard."
      }
    ],
    controls: [
      "Không tự động gửi email, xuất bản, phê duyệt hoặc cập nhật hệ thống từ bản nháp AI.",
      "Mỗi use case phải có người chịu trách nhiệm, data owner và tiêu chí thành công.",
      "Use case có tác động cao cần review ATTT/Tuân thủ và UAT riêng."
    ],
    faqs: [
      ["Nên chọn Microsoft 365 hay Amazon Quick?", "Microsoft 365 phù hợp công việc cộng tác và nội dung văn phòng; Amazon Quick phù hợp phân tích, nghiên cứu có căn cứ, workflow và ứng dụng theo quyền được cấp."],
      ["Có thể kết hợp hai công cụ?", "Có nếu luồng dữ liệu và quyền đã được phê duyệt. Không copy dữ liệu thủ công giữa hệ thống để né kiểm soát."],
      ["Use case nhỏ có cần review không?", "Vẫn phải qua cổng dữ liệu và quyền. Mức review sâu hơn phụ thuộc loại dữ liệu, hành động và phạm vi người dùng."],
      ["Làm sao đề xuất use case mới?", "Mô tả mục tiêu, người dùng, dữ liệu, hệ thống nguồn/đích, hành động, KPI thành công và rủi ro dự kiến trong ticket gửi Khối CNTT."],
      ["Ai xác nhận hiệu quả?", "ĐVKD xác nhận giá trị và tính đúng nghiệp vụ; Khối CNTT xác nhận nền tảng, tích hợp và kiểm soát kỹ thuật."]
    ],
    sources: [["Microsoft Adoption — Scenario Library", "https://adoption.microsoft.com/en-us/scenario-library/"], ["Amazon Quick User Guide", "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"]],
    sourceDate
  },
  {
    id: 23,
    slug: "chapter-23-ho-tro-va-faq.html",
    navTitle: "Hỗ trợ CNTT và FAQ",
    title: "Hỗ trợ của Khối CNTT và câu hỏi thường gặp",
    group: "Ứng dụng và hỗ trợ",
    eyebrow: "Đồng hành cùng ĐVKD",
    kind: "policy",
    statusLabel: "Đầu mối hỗ trợ",
    statusText: "Kênh, SLA và tên đầu mối cụ thể phải được điền và phê duyệt trước khi phát hành chính thức.",
    summary: "Khối CNTT hỗ trợ biến nhu cầu nghiệp vụ thành giải pháp có kiểm soát — từ tư vấn công cụ, cấp quyền, tích hợp đến vận hành và cải tiến.",
    audience: "ĐVKD, quản lý, SME và chủ sở hữu hệ thống",
    owner: "Khối CNTT (chờ xác nhận đầu mối)",
    objectives: ["Biết chọn đúng loại yêu cầu hỗ trợ.", "Chuẩn bị đủ thông tin để yêu cầu được xử lý nhanh.", "Hiểu ranh giới trách nhiệm giữa ĐVKD, CNTT và đơn vị kiểm soát."],
    prerequisites: ["Có tài khoản định danh NAB.", "Biết data owner và quản lý phê duyệt use case.", "Không gửi dữ liệu nhạy cảm trực tiếp trong phần mô tả ticket nếu chưa được hướng dẫn."],
    useCases: [
      { title: "Cấp quyền", text: "Nêu công cụ, vai trò, nguồn dữ liệu, thời hạn và phê duyệt của quản lý/data owner." },
      { title: "Thẩm định use case", text: "Nêu mục tiêu, dữ liệu, hành động, người dùng, lợi ích đo lường và rủi ro." },
      { title: "Sự cố", text: "Dùng kênh sự cố ưu tiên; cung cấp thời gian, tài khoản, triệu chứng và phạm vi ảnh hưởng." },
      { title: "Đào tạo", text: "Đăng ký theo vai trò và use case; ưu tiên thực hành trên dữ liệu giả lập." }
    ],
    walkthroughs: [
      {
        title: "Gửi yêu cầu thẩm định use case",
        intro: "Chuẩn bị thông tin đủ để CNTT và đơn vị kiểm soát đánh giá một lần.",
        steps: [
          "Mô tả vấn đề hiện tại và kết quả mong muốn, không chỉ nêu tên công cụ.",
          "Liệt kê nhóm người dùng, loại dữ liệu, nguồn/đích và tần suất.",
          "Phân loại hành động: đọc, soạn nháp, ghi, chia sẻ, lên lịch hoặc thực thi.",
          "Nêu người chịu trách nhiệm, data owner, phê duyệt nghiệp vụ và KPI thành công.",
          "Gửi qua Service Desk NAB theo kênh hiện hành và theo dõi mã ticket."
        ],
        verify: "Ticket đủ mục tiêu, dữ liệu, quyền, hành động, owner, KPI và phê duyệt cần thiết."
      }
    ],
    controls: [
      "CNTT quản lý nền tảng, IAM, DLP, cấu hình, tích hợp và vận hành; không thay ĐVKD phê duyệt nội dung nghiệp vụ.",
      "ĐVKD chịu trách nhiệm mục đích, dữ liệu đầu vào, tính đúng đầu ra và quyết định cuối.",
      "ATTT/Tuân thủ/Pháp chế/Data owner tham gia theo loại dữ liệu và tác động.",
      "Không tự cài extension, connector hoặc đăng ký tài khoản bằng email NAB khi chưa được phép."
    ],
    faqs: [
      ["Xin quyền Microsoft 365 Copilot hoặc Amazon Quick ở đâu?", "Gửi yêu cầu qua kênh Service Desk NAB, kèm vai trò, use case, nguồn dữ liệu, thời hạn và phê duyệt quản lý/data owner."],
      ["Không thấy một tính năng được mô tả trong tài liệu?", "License, vùng, vai trò hoặc chính sách tenant có thể khác. Không tìm cách né giới hạn; hãy gửi ticket cho quản trị viên nền tảng."],
      ["Có được tự kết nối một nguồn dữ liệu mới?", "Không. Connector có thể mở rộng đáng kể quyền dữ liệu và hành động, nên phải qua quy trình thẩm định và cấp quyền."],
      ["Báo lỗi nội dung ở đâu?", "Gửi link/tên chương, đoạn cần sửa, bằng chứng và mức ảnh hưởng qua kênh quản lý nội dung do Khối CNTT công bố."],
      ["Khi nào gọi kênh sự cố thay vì ticket thường?", "Khi có nguy cơ lộ dữ liệu, truy cập trái phép, hành động ngoài ý muốn hoặc ảnh hưởng hoạt động; dùng kênh sự cố ưu tiên hiện hành."],
      ["Có được dùng tài khoản cá nhân để xử lý nhanh?", "Không dùng tài khoản cá nhân với dữ liệu hoặc công việc NAB."],
      ["Ai phê duyệt phát hành đầu ra cho khách hàng?", "Theo quy trình nghiệp vụ và truyền thông hiện hành; AI và CNTT không thay thế cấp phê duyệt có thẩm quyền."],
      ["Tài liệu được rà soát bao lâu một lần?", "Khuyến nghị hàng quý và ngay khi có thay đổi đáng kể về chính sách, tenant, license hoặc tính năng."]
    ],
    sources: [["Microsoft 365 admin center help", "https://learn.microsoft.com/en-us/microsoft-365/admin/"], ["Amazon Quick administration", "https://docs.aws.amazon.com/quick/latest/userguide/administering-quicksight.html"]],
    sourceDate
  }
];
