"use strict";

/**
 * Nội dung phần Amazon Quick (chương 11–15): 5 trang nhóm + trang việc (11.1…15.4).
 * Spec: docs/superpowers/specs/2026-11-19-amazon-quick-redesign.md
 * - Viết tiếng Việt chuẩn ngay từ nguồn (skipNormalize: true — không qua bộ thay từ của build).
 * - Nhãn giao diện giữ nguyên tiếng Anh như trên màn hình, in đậm bằng **…**; `…` cho giá trị cần gõ.
 * - Account name trong tài liệu luôn là `opba-ai` (môi trường LIVE).
 */

const { DOCS, group } = require("./quick/common");

// ---------------------------------------------------------------------------
// Trang nhóm
// ---------------------------------------------------------------------------

const groups = [
  group({
    id: 11,
    slug: "chapter-11-amazon-quick-bat-dau.html",
    navTitle: "Bắt đầu với Amazon Quick",
    title: "Bắt đầu với Amazon Quick",
    summary: "Amazon Quick là không gian làm việc có AI của NAB: hỏi đáp, tra cứu tài liệu trong Space, dùng chat agent, nghiên cứu có trích dẫn, xem dashboard và tự động hoá công việc lặp lại.",
    statusText: "NAB đang sử dụng Amazon Quick. Hãy dùng đúng tài khoản, vai trò và các tính năng được cấp.",
    searchKeywords: ["amazon quick", "quick", "opba-ai", "account name", "bắt đầu"],
    topCallout: {
      tone: "danger",
      title: "Account name tại NAB là opba-ai",
      text: "Khi trang đăng nhập Amazon Quick hỏi **Quick account name**, mọi người tại NAB đều nhập `opba-ai`. Username và mật khẩu cá nhân chỉ nhập ở bước sau, trên trang đăng nhập.",
    },
    objectives: [
      "Biết Amazon Quick dùng để làm gì trong công việc tại NAB và nên bắt đầu từ trang nào.",
      "Đăng nhập đúng tài khoản NAB và nhận biết khi vào nhầm tài khoản hoặc thấy quyền bất thường.",
      "Nắm các nguyên tắc dữ liệu và kiểm chứng trước khi dùng bất kỳ tính năng nào.",
    ],
    prerequisites: [
      "Có tài khoản NAB đã được cấp quyền Amazon Quick (đăng nhập qua Identity Center, có MFA); không dùng tài khoản cá nhân, không tự tạo tài khoản Free/Plus, không dùng root user.",
      "Dùng link đăng nhập, account name `opba-ai` và kênh hỗ trợ do Khối CNTT công bố.",
      "Chỉ đưa vào Quick dữ liệu đã được phân loại; chỉ chọn Space, dashboard, dataset và kết nối được phép.",
    ],
    sections: [
      {
        id: "nguyen-tac-du-lieu",
        title: "Nguyên tắc dữ liệu khi dùng Amazon Quick",
        intro: "Áp dụng cho mọi việc trong chương 11–15:",
        items: [
          "Chỉ đưa vào chat, Space, chat agent, Research hoặc Flow dữ liệu đã được phân loại và được phép sử dụng.",
          "Tìm kiếm web, tải tệp lên và kết nối tới ứng dụng khác chỉ dùng khi tính năng đó đã được NAB cho phép cho tình huống của bạn.",
          "**Private mode**, lịch sử hội thoại và bộ nhớ của Quick không thay thế chính sách dữ liệu của NAB. Không tải tệp nếu chưa rõ dữ liệu được xử lý và lưu giữ thế nào.",
          "Quyền kỹ thuật nhìn thấy một tài nguyên (Space, dashboard, dataset) không thay thế phê duyệt mục đích sử dụng.",
          "Tách việc đọc/tra cứu khỏi hành động ghi dữ liệu; mọi hành động ghi cần phê duyệt và kiểm soát riêng.",
          "Kết quả do AI tạo chỉ là bản nháp: mở nguồn, đối chiếu số liệu và để người có trách nhiệm kiểm tra trước khi dùng.",
        ],
      },
      {
        id: "tinh-nang-gioi-han",
        title: "Tính năng theo loại user",
        intro: "Tại NAB có hai nhóm quyền chính. Các trang có dấu * là tính năng chỉ một số user được cấp.",
        tables: [
          {
            caption: "Phạm vi tính năng theo loại user",
            headers: ["Nhóm", "Tính năng", "Ghi chú"],
            rows: [
              ["Mọi user", "Chat, Spaces, Chat agents, Quick Research, Flows", "Dùng và tạo mới"],
              ["User Reader", "Dashboards, Data", "Chỉ xem"],
              ["Một số user (*)", "Analyses, tạo dataset/dashboard, Scenarios, Stories, Apps, Automations", "Liên hệ CNTT nếu công việc cần"],
            ],
          },
        ],
      },
    ],
    controls: [
      "Chỉ đăng nhập bằng tài khoản NAB; không tự tạo tài khoản Free/Plus hoặc dùng root user cho công việc thường ngày.",
      "Sau khi đăng nhập, kiểm tra account name `opba-ai`, username của bạn và các mục menu đang thấy. Nếu sai tài khoản, thiếu menu đã được cấp hoặc quyền rộng bất thường: dừng thao tác và gửi yêu cầu hỗ trợ kèm ảnh đã che dữ liệu nhạy cảm.",
      "Quyền kỹ thuật nhìn thấy tài nguyên không thay thế phê duyệt mục đích sử dụng.",
      "Tìm kiếm web, tải tệp và kết nối chỉ dùng khi đã được NAB cho phép.",
      "Tách việc đọc khỏi hành động ghi; mọi ghi dữ liệu cần phê duyệt và kiểm soát riêng.",
      "Lịch sử hội thoại, bộ nhớ và chế độ lưu giữ của Quick không thay thế chính sách dữ liệu NAB.",
    ],
    faqs: [
      ["Lần đầu dùng Amazon Quick cần làm gì?", "Kích hoạt tài khoản theo trang 11.1: nhận mã qua email, đặt mật khẩu mới, đăng ký xác thực 2 lớp và nhớ bấm Assign MFA."],
      ["Account name của NAB là gì?", "Account name là tên tài khoản Amazon Quick của ngân hàng, mọi người nhập giống nhau: opba-ai. Đây không phải username cá nhân của bạn."],
      ["Nên bắt đầu từ trang nào?", "Lần đầu dùng: kích hoạt tài khoản ở trang 11.1. Sau đó đăng nhập theo trang 11.2 (portal), 11.3 (link Quick) hoặc 11.4 (Add-in trên Word, Excel, PowerPoint), làm quen giao diện ở 11.5, rồi xem 11.6 Chat với Amazon Quick và chương 12 (Space, chat agent và chia sẻ) — đây là các việc tra cứu dùng nhiều nhất."],
      ["Vì sao tôi không thấy một số mục trong menu?", "Các mục hiển thị theo quyền được cấp cho tài khoản của bạn. Trang có dấu * là tính năng chỉ một số user được cấp. Nếu thiếu mục đã được cấp, gửi yêu cầu hỗ trợ tới Khối CNTT."],
      ["Private mode có thay chính sách dữ liệu của NAB không?", "Không. Private mode không dùng và không ghi bộ nhớ hội thoại, nhưng bạn vẫn phải tuân thủ phân loại dữ liệu và quyền truy cập của NAB."],
      ["Kết quả do Quick tạo có dùng ngay cho báo cáo được không?", "Không. Kết quả AI là bản nháp; cần mở nguồn, đối chiếu số liệu và có người kiểm tra chịu trách nhiệm trước khi dùng."],
    ],
    sources: [DOCS.whatIs, DOCS.howWorks, DOCS.signIn, DOCS.security],
  }),

  group({
    id: 12,
    slug: "chapter-12-amazon-quick-spaces-chat-agents.html",
    navTitle: "Spaces, Chat agents và chia sẻ",
    title: "Spaces, Chat agents và chia sẻ an toàn",
    summary: "Space là kho tài liệu dùng chung để chat hỏi đáp có căn cứ; chat agent là trợ lý có vai trò và nguồn tham chiếu riêng. Chương này hướng dẫn tra cứu, tạo mới và chia sẻ đúng quyền.",
    statusText: "NAB đang sử dụng Spaces và Chat agents. Chỉ thêm tài liệu đã được phép và chia sẻ theo quyền tối thiểu.",
    searchKeywords: ["space", "spaces", "chat agent", "agent", "chia sẻ", "share", "tài liệu"],
    objectives: [
      "Tra cứu tài liệu trong Space và dùng chat agent cho đúng việc.",
      "Tạo Space, tải tài liệu, tạo chat agent khi công việc cần.",
      "Chia sẻ Space và chat agent đúng người, đúng quyền, và biết người nhận sẽ thấy gì.",
    ],
    prerequisites: [
      "Mọi user Amazon Quick tại NAB được dùng và tạo Space, chat agent.",
      "Tài liệu đưa vào Space hoặc làm tài liệu tham chiếu của agent đã được phân loại và chủ sở hữu dữ liệu đồng ý.",
      "Kết nối hành động tới ứng dụng khác (nếu agent cần) phải được ATTT phê duyệt trước khi bật.",
    ],
    sections: [
      {
        id: "space-hay-agent",
        title: "Khi nào dùng Space, khi nào dùng chat agent",
        tables: [
          {
            caption: "Chọn Space hay chat agent",
            headers: ["Nhu cầu", "Nên dùng", "Ghi chú"],
            rows: [
              ["Hỏi đáp trên một bộ tài liệu của nhóm", "Space", "Mọi thành viên Space hỏi trên cùng nguồn"],
              ["Trợ lý có vai trò, giọng văn và cách trả lời cố định", "Chat agent", "Có thể gắn một hoặc nhiều Space làm nguồn"],
              ["Câu hỏi chung, không cần tài liệu nội bộ", "Chat với Quick", "Chọn phạm vi dữ liệu phù hợp (trang 11.6)"],
            ],
          },
        ],
      },
    ],
    controls: [
      "Chỉ thêm vào Space hoặc agent tài liệu đã được phân loại và chủ sở hữu dữ liệu phê duyệt; dọn tài liệu hết hiệu lực.",
      "Chỉ chia sẻ Space/agent với người thực sự cần — không chia sẻ công khai, không chia sẻ ra ngoài NAB, không chia sẻ \"phòng khi cần\".",
      "Cấp quyền thấp nhất đủ cho công việc; chỉ người quản lý nội dung mới có quyền sửa hoặc chia sẻ lại.",
      "Rà soát người được chia sẻ định kỳ (ít nhất mỗi quý) và thu hồi quyền của người không còn tham gia công việc.",
      "Ghi lại ai được cấp quyền, khi nào và vì sao để phục vụ kiểm tra.",
      "Space không bỏ qua phân quyền dữ liệu (RLS/CLS) của dataset, dashboard gốc.",
      "Agent có hành động ghi ra ứng dụng khác cần phê duyệt riêng của ATTT, kiểm thử trước khi dùng chính thức, theo dõi sử dụng và thu hồi ngay khi có hành vi bất thường.",
    ],
    faqs: [
      ["Space có bỏ qua quyền dữ liệu không?", "Không. Thành viên Space chỉ truy cập dataset, dashboard theo quyền của họ trên tài nguyên gốc."],
      ["Chat agent có được huấn luyện lại trên tài liệu tham chiếu không?", "Không. Agent tra cứu tài liệu tham chiếu mỗi lần trả lời, không huấn luyện lại mô hình."],
      ["Có chia sẻ Space hoặc agent ra ngoài NAB được không?", "Không. Chỉ chia sẻ với người dùng, nhóm nội bộ theo chính sách NAB."],
      ["Ai được tạo Space và chat agent?", "Mọi user Amazon Quick tại NAB. Nếu không thấy nút tạo mới, gửi yêu cầu hỗ trợ tới Khối CNTT."],
      ["Chia sẻ agent có chia sẻ luôn tài liệu trong Space gắn với agent không?", "Xem trang 12.7 Lưu ý khi chia sẻ — nội dung đã được kiểm tra trên tài khoản người nhận."],
    ],
    sources: [DOCS.spaces, DOCS.spacesSharing, DOCS.agents, DOCS.security],
  }),

  group({
    id: 13,
    slug: "chapter-13-amazon-quick-du-lieu-dashboard.html",
    navTitle: "Dashboard và dữ liệu",
    title: "Dashboard và dữ liệu trong Amazon Quick",
    summary: "Xem dashboard, lọc và hỏi dữ liệu bằng câu hỏi tự nhiên; với user được cấp thêm quyền: tạo dataset, analysis, dashboard và phân tích với Scenarios.",
    statusText: "NAB đang sử dụng Dashboards và Data trong Amazon Quick. User Reader: chỉ xem. Chỉ dùng nguồn dữ liệu và quyền được cấp.",
    readerViewOnly: true,
    searchKeywords: ["dashboard", "data", "dataset", "analysis", "scenarios", "stories", "báo cáo", "số liệu"],
    objectives: [
      "Xem, lọc và hỏi dữ liệu trên dashboard đúng cách, hiểu vì sao hai người có thể thấy số khác nhau.",
      "Kiểm chứng số liệu trước khi đưa vào báo cáo hoặc quyết định.",
      "Với user được cấp thêm quyền: tạo dataset, analysis và xuất bản dashboard có kiểm soát.",
    ],
    concepts: {
      intro: "Số liệu trong Amazon Quick đi qua một chuỗi bốn khâu. Người dùng thường (Reader) làm việc ở khâu cuối; một số user được cấp quyền làm ở các khâu trước.",
      chain: [
        { term: "Nguồn dữ liệu", note: "Tệp CSV/Excel, cơ sở dữ liệu" },
        { term: "Dataset", note: "Dữ liệu đã chuẩn bị, dùng chung (13.4)" },
        { term: "Analysis", note: "Tác giả dựng biểu đồ (13.5)" },
        { term: "Dashboard", note: "Bản chỉ-xem để chia sẻ (13.1)" },
      ],
      cards: [
        { term: "Dataset", what: "Bộ dữ liệu đã chọn cột, định kiểu, lọc, thêm trường tính toán; một lần chuẩn bị, mọi báo cáo dùng chung. Dữ liệu thường nạp vào **SPICE** (bản sao trong bộ nhớ để truy vấn nhanh)." },
        { term: "Analysis", what: "Bàn làm việc của tác giả: dựng, thử biểu đồ. Chỉ tác giả được chia sẻ mới thấy." },
        { term: "Dashboard", what: "Bản chỉ-xem của analysis, hiển thị dữ liệu hiện có mỗi lần mở; người xem lọc, hỏi, xuất theo quyền được cấp." },
        { term: "Scenario", what: "Không gian phân tích nhiều bước trên bản chụp dữ liệu, AI trình bày từng bước tính (13.3)." },
      ],
      tables: [
        {
          caption: "Bạn cần gì → dùng trang nào",
          headers: ["Bạn cần", "Dùng", "Trang"],
          rows: [
            ["Xem số liệu đã có báo cáo sẵn, hỏi nhanh một con số", "Dashboard", "13.1"],
            ["Hỏi chi tiết theo cột, theo kỳ trên một bộ dữ liệu", "Chat với dataset", "13.2"],
            ["Phân tích nhiều bước, đặt giả định", "Scenarios *", "13.3"],
            ["Đưa tệp số liệu mới vào Quick", "Tạo dataset *", "13.4"],
            ["Làm báo cáo cho người khác xem định kỳ", "Analysis và dashboard *", "13.5"],
          ],
        },
      ],
    },
    prerequisites: [
      "User Reader: chỉ xem dashboard và dữ liệu được chia sẻ, không tạo hoặc sửa.",
      "Các tính năng có dấu * (Analyses, tạo dataset/dashboard, Scenarios) chỉ một số user được cấp.",
      "Chủ sở hữu dữ liệu duyệt phạm vi dữ liệu; ATTT duyệt kết nối, xuất dữ liệu và nhúng dashboard.",
      "Có định nghĩa KPI, kỳ dữ liệu và số liệu đối soát đã được phê duyệt trước khi dùng số cho báo cáo.",
    ],
    sections: [
      {
        id: "so-lieu-khac-nhau",
        title: "Vì sao hai người thấy số khác nhau",
        items: [
          "Phân quyền theo dòng/cột (RLS/CLS) cho mỗi người một phạm vi dữ liệu khác nhau.",
          "Khác nhóm người dùng, khác bộ lọc đang áp dụng hoặc khác thời điểm dữ liệu được làm mới.",
          "Ghi lại đủ bốn yếu tố trên và báo chủ sở hữu dashboard nếu vẫn chưa giải thích được.",
        ],
      },
    ],
    controls: [
      "Không suy ra định nghĩa KPI chỉ từ tiêu đề biểu đồ; dùng tài liệu định nghĩa đã được nghiệp vụ duyệt.",
      "Sai mức chi tiết dữ liệu, cách nối bảng hoặc trường tính toán có thể làm số tổng hợp sai; đối chiếu với từ điển dữ liệu và số liệu đối soát.",
      "Giải thích do AI tạo không thay thế kiểm tra nghiệp vụ; người kiểm tra vẫn chịu trách nhiệm về định nghĩa và số liệu.",
      "Không chia sẻ dashboard công khai; chỉ chia sẻ nội bộ NAB với người dùng, nhóm được phê duyệt.",
      "File xuất từ dashboard (PDF, CSV, Excel) là bản sao dữ liệu mới: lưu vào kho NAB được phép, gắn nhãn phân loại, không gửi email cá nhân, không dùng liên kết công khai; lưu ý rủi ro công thức trong CSV.",
      "Nếu nút xuất dữ liệu, bộ lọc hoặc drill-down bị khoá thì đó là kiểm soát của chủ sở hữu; không tìm cách vượt qua, hãy đề nghị người chịu trách nhiệm cấp quyền.",
      "Không tạo bản sao dữ liệu để chia sẻ rộng hơn quyền của nguồn gốc.",
    ],
    faqs: [
      ["User Reader làm được gì với dashboard?", "Xem, lọc, hỏi dữ liệu và xuất dữ liệu nếu chủ sở hữu cho phép; không tạo hoặc sửa dataset, analysis, dashboard."],
      ["Vì sao số của tôi khác đồng nghiệp?", "Thường do phân quyền dữ liệu (RLS/CLS), nhóm người dùng, bộ lọc hoặc thời điểm làm mới dữ liệu. Kiểm tra đủ bốn yếu tố rồi báo chủ sở hữu dashboard."],
      ["Có gửi file xuất từ dashboard qua email cá nhân được không?", "Không. Chỉ dùng kênh và người nhận được NAB phê duyệt; file xuất cần nhãn phân loại và dấu vết kiểm tra."],
      ["Câu trả lời khi hỏi dữ liệu có đủ để chốt số liệu không?", "Không. Câu trả lời giúp tra cứu nhanh; trước khi dùng cho báo cáo phải đối chiếu định nghĩa KPI và số liệu đối soát."],
    ],
    sources: [DOCS.dashboards, DOCS.dataSources, DOCS.analyses, DOCS.rls, DOCS.scenarios],
  }),

  group({
    id: 14,
    slug: "chapter-14-amazon-quick-research.html",
    navTitle: "Nghiên cứu với Quick Research",
    title: "Nghiên cứu có trích dẫn với Quick Research",
    summary: "Quick Research tổng hợp báo cáo nghiên cứu từ các nguồn bạn chọn và gắn trích dẫn cho từng nhận định. Báo cáo chỉ là bản nháp cho tới khi được kiểm chứng.",
    statusText: "NAB đang sử dụng Quick Research. Chỉ dùng nguồn, tệp tải lên và tìm kiếm web được phép.",
    searchKeywords: ["research", "nghiên cứu", "trích dẫn", "citation", "báo cáo"],
    objectives: [
      "Tạo nghiên cứu với mục tiêu rõ ràng và nguồn tối thiểu cần thiết.",
      "Kiểm tra kế hoạch nghiên cứu trước khi chạy.",
      "Kiểm chứng trích dẫn và chia sẻ báo cáo đúng quyền.",
    ],
    prerequisites: [
      "Mọi user Amazon Quick tại NAB được dùng Quick Research.",
      "Chỉ dùng nguồn được phép: tệp đã phân loại, Space và dashboard bạn có quyền; tìm kiếm web chỉ dùng khi được NAB cho phép.",
      "Không kết hợp nguồn web với dữ liệu nội bộ nếu việc kết hợp chưa được ATTT và chủ sở hữu dữ liệu duyệt.",
    ],
    sections: [
      {
        id: "truoc-khi-dung-ket-qua",
        title: "Trước khi dùng kết quả nghiên cứu",
        items: [
          "Mục tiêu nghiên cứu có rõ ràng không?",
          "Nguồn có chính thống và còn cập nhật không?",
          "Trích dẫn có thực sự hỗ trợ nhận định không?",
          "Nhận định quan trọng đã đối chiếu với ít nhất hai nguồn độc lập chưa?",
          "Báo cáo đã ghi mốc thời gian dữ liệu, phạm vi và giới hạn chưa?",
          "Đã có người kiểm tra chịu trách nhiệm nội dung chưa?",
        ],
      },
    ],
    controls: [
      "Chọn nguồn tối thiểu cần thiết — không chọn toàn bộ Space và dashboard cho tiện.",
      "Không đưa dữ liệu nhạy cảm của NAB vào mục tiêu nghiên cứu hoặc từ khoá tìm kiếm web.",
      "Kiểm tra và điều chỉnh kế hoạch nghiên cứu trước khi chạy; kế hoạch quá rộng hoặc có nguồn chưa duyệt thì sửa mục tiêu.",
      "Trích dẫn không bảo đảm nhận định đúng: mở nguồn, đọc đủ ngữ cảnh, đối chiếu ít nhất hai nguồn độc lập; loại bỏ nhận định không kiểm chứng được.",
      "Báo cáo nghiên cứu là dữ liệu mới: lưu vào kho NAB được phép, gắn nhãn phân loại theo nguồn nhạy cảm nhất, chia sẻ đúng người, ghi ai tạo, ai kiểm tra, ai nhận.",
      "Không gửi nguyên văn kết quả AI cho các bên liên quan khi chưa có người kiểm tra.",
    ],
    faqs: [
      ["Trích dẫn có bảo đảm nhận định đúng không?", "Không. Trích dẫn có thể chỉ khớp một phần hoặc bị diễn giải sai; luôn mở nguồn, đọc bối cảnh và đối chiếu chéo."],
      ["Kế hoạch nghiên cứu quá rộng — có bỏ qua bước kiểm tra được không?", "Không. Điều chỉnh mục tiêu và nguồn trước khi chạy; kế hoạch rộng tốn thời gian và có thể lấy dữ liệu ngoài phạm vi."],
      ["Có dùng kết quả nghiên cứu trực tiếp cho quyết định được không?", "Không. Người kiểm tra phải kiểm chứng, biên tập, thêm giới hạn và xác nhận trước khi dùng."],
      ["Có chia sẻ báo cáo qua email cá nhân được không?", "Không. Lưu báo cáo vào kho NAB, gắn nhãn phân loại và chia sẻ với đúng người dùng, nhóm trong môi trường được phép."],
    ],
    sources: [DOCS.research, DOCS.howWorks, DOCS.security],
  }),

  group({
    id: 15,
    slug: "chapter-15-amazon-quick-flows-tu-dong-hoa.html",
    navTitle: "Flows và tự động hoá",
    title: "Flows và tự động hoá có kiểm soát",
    summary: "Flows tự động hoá các việc lặp lại bằng mô tả tự nhiên; Apps và Automations dành cho một số user được cấp. Mọi kết quả do AI tạo là bản nháp và mọi hành động ghi cần phê duyệt.",
    statusText: "NAB đang sử dụng Flows. Apps và Automations chỉ dành cho một số user được cấp. Chỉ dùng quyền tạo, chạy, chia sẻ và lịch chạy được phép.",
    searchKeywords: ["flow", "flows", "tự động", "automation", "automations", "apps", "app", "trigger"],
    objectives: [
      "Chạy flow có sẵn và tạo flow cho việc lặp lại của mình.",
      "Phân biệt Flow, App và Automation; biết khi nào cần Khối CNTT tham gia.",
      "Giữ bước xác nhận của con người cho mọi hành động ghi dữ liệu hoặc chạy theo lịch.",
    ],
    concepts: {
      intro: "Chương này có ba công cụ tự động hoá, từ nhỏ đến lớn. Chọn đúng công cụ trước khi bắt đầu.",
      cards: [
        { term: "Flow", what: "Chuỗi bước định nghĩa một lần, chạy lại khi cần: nhập đầu vào → các bước AI xử lý → kết quả. Dành cho việc lặp lại của cá nhân, nhóm.", example: "Tóm tắt văn bản luật mới và liệt kê điểm cần lưu ý (15.1, 15.2)." },
        { term: "App *", what: "Ứng dụng web nhỏ do AI viết từ mô tả, có giao diện và nơi lưu dữ liệu. Là bản mẫu cho nhóm (15.3).", example: "Checklist hồ sơ vay tiêu dùng." },
        { term: "Automation *", what: "Quy trình tập trung, dài, nhiều hệ thống, chạy độc lập với từng người; có con người duyệt và theo dõi vận hành (15.4).", example: "Xử lý hồ sơ vay, hoá đơn ở quy mô lớn." },
      ],
    },
    prerequisites: [
      "Mọi user Amazon Quick tại NAB được dùng và tạo Flow.",
      "Apps và Automations (dấu *) chỉ một số user được cấp.",
      "Tình huống tự động hoá có người chịu trách nhiệm quy trình, chủ sở hữu dữ liệu, mức độ rủi ro và dữ liệu kiểm thử.",
      "Tách thông tin đăng nhập giữa môi trường kiểm thử và môi trường chính thức; không nhúng mật khẩu hoặc khoá bí mật vào prompt, tài liệu hay flow.",
    ],
    sections: [
      {
        id: "flow-app-automation",
        title: "Flow, App và Automation khác nhau thế nào",
        tables: [
          {
            caption: "So sánh Flow, App và Automation",
            headers: ["Loại", "Dùng khi", "Ai được dùng"],
            rows: [
              ["Flow", "Việc lặp lại vài bước: tóm tắt, soạn nháp, phân tích nhanh theo mẫu", "Mọi user"],
              ["App (*)", "Ứng dụng nhỏ cho nhóm (vd theo dõi yêu cầu); là bản mẫu, không mặc nhiên là hệ thống chính thức", "Một số user"],
              ["Automation (*)", "Quy trình nhiều bước, nhiều hệ thống, cần giám sát vận hành", "Một số user, có Khối CNTT tham gia"],
            ],
          },
        ],
      },
    ],
    controls: [
      "Flow, App hoặc Automation do AI sinh chỉ là bản nháp; người chịu trách nhiệm phải kiểm tra, kiểm thử và phê duyệt.",
      "Tách việc đọc khỏi hành động ghi; mọi hành động ghi phải được người dùng xem và xác nhận (form hành động của flow; không bật **Run with no confirmation** khi đặt lịch) trừ khi có phê duyệt rủi ro riêng.",
      "Không bật lịch chạy (**Triggers**) khi chưa kiểm thử: chạy lại không tạo bản ghi trùng, múi giờ, dữ liệu đầu vào và cấu hình xác nhận đã đúng.",
      "Không ghi vào môi trường chính thức trong giai đoạn kiểm thử; dùng dữ liệu và đích kiểm thử.",
      "Quy trình ghi vào hệ thống nhạy cảm cần UAT với người chịu trách nhiệm quy trình và phê duyệt của bộ phận rủi ro/ATTT.",
      "Khi có lỗi: dừng lịch chạy, cô lập tác động ngoài dự kiến, tìm nguyên nhân rồi khôi phục theo hướng dẫn vận hành; không thử lại vô hạn.",
      "Không dùng chung thông tin đăng nhập giữa môi trường kiểm thử và môi trường chính thức; tài khoản dịch vụ chỉ có quyền tối thiểu và có người chịu trách nhiệm.",
      "Apps là bản mẫu ứng dụng, không mặc nhiên là hệ thống chính thức.",
    ],
    faqs: [
      ["Flow khác Automation thế nào?", "Flow dành cho việc lặp lại vài bước của cá nhân hoặc nhóm; Automation dành cho quy trình nhiều bước, nhiều hệ thống, cần giám sát vận hành và có Khối CNTT tham gia."],
      ["Flow có tự ghi dữ liệu vào hệ thống khác được không?", "Chỉ khi đã kiểm tra hợp lệ, phê duyệt và UAT; NAB mặc định giữ bước xác nhận cho mọi hành động ghi."],
      ["Có kiểm thử flow trực tiếp trên dữ liệu thật được không?", "Không. Kiểm thử bằng dữ liệu giả lập và đích kiểm thử trước."],
      ["Lịch chạy bị dừng — làm gì?", "Kiểm tra kết nối, phiên bản, quyền chia sẻ và lịch sử chạy; không tự đổi thông tin đăng nhập của môi trường chính thức, báo người chịu trách nhiệm."],
    ],
    sources: [DOCS.flows, DOCS.schedules, DOCS.automate, DOCS.security],
  }),
];

// Trang việc theo từng chương.
const tasks = [...require("./quick/ch11"), ...require("./quick/ch12"), ...require("./quick/ch13"), ...require("./quick/ch14"), ...require("./quick/ch15")];

module.exports = [...groups, ...tasks];
