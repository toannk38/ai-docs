"use strict";

const sourceDate = "19/08/2026";
const owner = "Chủ biên / SME Amazon Quick";
const live = {
  group: "Amazon Quick — trọng tâm",
  eyebrow: "Đang sử dụng tại NAB",
  kind: "live",
  statusLabel: "Đang sử dụng tại NAB",
  audience: "Người dùng NAB đã được cấp quyền Amazon Quick",
  owner,
  sourceDate
};

function quickChapter(config) {
  return Object.assign({}, live, config);
}

module.exports = [
  quickChapter({
    id: 11,
    slug: "chapter-11-amazon-quick-tong-quan.html",
    navTitle: "Tổng quan và giao diện Amazon Quick",
    title: "Amazon Quick: tổng quan, giao diện và truy cập an toàn",
    statusText: "NAB đang sử dụng Amazon Quick. Account, Region, role, subscription, Private Mode, upload/file limits, output formats, connector và menu cụ thể phải được SME xác nhận trước phát hành.",
    summary: "Amazon Quick là nền tảng AI workspace toàn diện — kết nối ứng dụng, công cụ và nguồn dữ liệu tổ chức, giúp biến câu hỏi thành câu trả lời và hành động. Chương này hướng dẫn giao diện chính, Private Mode, điều hướng, chat controls và các output shortcuts.",
    objectives: [
      "Đăng nhập đúng account/role NAB, xác nhận ngữ cảnh và phát hiện quyền bất thường.",
      "Hiểu bố cục giao diện: header, sidebar điều hướng, khu vực chat chính và các controls.",
      "Sử dụng Private Mode, attachment, phạm vi dữ liệu (All data), Smart mode và output shortcuts.",
      "Truy cập các tính năng qua sidebar và menu More một cách hiệu quả."
    ],
    prerequisites: [
      "Có tài khoản/SSO NAB, MFA và role/subscription được cấp; không dùng root user hoặc tài khoản cá nhân.",
      "Dữ liệu đã phân loại; chỉ chọn dashboard, dataset, Space, knowledge base và connector được duyệt.",
      "SME điền account name, Region, URL/SSO, vai trò, feature matrix và kênh hỗ trợ thực tế."
    ],
    useCases: [
      { title: "Truy cập an toàn", text: "Đăng nhập qua portal/SSO NAB, xác nhận đúng account/region/role và menu được cấp." },
      { title: "Chat có kiểm soát", text: "Hỏi dữ liệu với phạm vi nguồn rõ ràng, kiểm chứng citation và không chạy Action ngoài ý muốn." },
      { title: "Private Mode", text: "Tắt ghi nhớ và truy xuất bộ nhớ khi thảo luận nội dung nhạy cảm (cần xác nhận hành vi trên tenant NAB)." },
      { title: "Output shortcuts", text: "Tạo Research/Document/Presentation/Visual trực tiếp từ chat thay vì chỉ nhận văn bản." },
      { title: "Điều hướng nhanh", text: "Truy cập Spaces, Chat Agents, Analyses, Dashboards, Data, Flows và More từ sidebar." }
    ],
    guideSections: [
      {
        number: "11.1",
        id: "dang-nhap-xac-nhan",
        title: "Đăng nhập và xác nhận đúng ngữ cảnh",
        intro: "Chỉ dùng portal/SSO do NAB công bố. Xác nhận account, Region, role và menu trước khi thao tác.",
        subsections: [
          {
            number: "11.1.1",
            id: "portal-sso",
            title: "Truy cập qua portal NAB",
            steps: [
              "Mở portal/SSO NAB; không dùng link lạ hoặc màn hình tự đăng ký.",
              "Hoàn tất MFA và kiểm tra account/tenant, Region cùng hồ sơ người dùng theo checklist SME.",
              "Đối chiếu role và menu đang thấy với feature matrix đã phê duyệt.",
              "Kiểm tra asset mặc định không nằm ngoài phạm vi công việc.",
              "Nếu sai account, thiếu menu hoặc quyền quá rộng, dừng thao tác và gửi ticket kèm ảnh đã che dữ liệu nhạy cảm."
            ]
          }
        ]
      },
      {
        number: "11.2",
        id: "bo-cuc-trang-home",
        title: "Bố cục trang Home",
        intro: "Giao diện chính bao gồm: thanh header phía trên, sidebar điều hướng bên trái và khu vực chat chính.",
        subsections: [
          {
            number: "11.2.1",
            id: "thanh-header",
            title: "Thanh header",
            body: "Hiển thị ở phía trên cùng, cung cấp thông tin nhận dạng tài khoản và quản lý trạng thái phiên làm việc."
          },
          {
            number: "11.2.2",
            id: "sidebar-dieu-huong",
            title: "Sidebar điều hướng",
            body: "Trung tâm điều hướng chính, cung cấp quyền truy cập nhanh đến tất cả các tính năng: New chat, Search, My stuff, Spaces, Research, Chat agents, Apps, Flows, Analyses, Dashboards, Data, folders, More và Recents."
          },
          {
            number: "11.2.3",
            id: "khu-vuc-chat",
            title: "Khu vực chat chính",
            body: "Chiếm phần lớn màn hình, nơi người dùng tương tác trực tiếp với trợ lý AI. Khi mới đăng nhập hiển thị thông điệp chào mừng 'All set. Let's go.'"
          }
        ]
      },
      {
        number: "11.3",
        id: "private-mode",
        title: "Private Mode",
        intro: "Tính năng quan trọng trên thanh header. Khi bật, Amazon Quick sẽ hoạt động với hành vi bảo mật tăng cường.",
        subsections: [
          {
            number: "11.3.1",
            id: "hanh-vi-private",
            title: "Hành vi Private Mode theo hướng dẫn giao diện",
            items: [
              { label: "Không sử dụng bộ nhớ", text: "Cuộc trò chuyện không được dùng để suy luận bộ nhớ mới." },
              { label: "Không truy xuất bộ nhớ đã lưu", text: "Hệ thống sẽ không đọc thông tin cá nhân đã ghi nhớ trước đó." },
              { label: "Đảm bảo riêng tư toàn diện", text: "Trải nghiệm không có bộ nhớ, phù hợp khi thảo luận nội dung nhạy cảm." },
              { label: "Dấu hiệu nhận biết", text: "Biểu tượng khóa xuất hiện trên thanh header khi chế độ này được bật." }
            ]
          },
          {
            number: "11.3.2",
            id: "xac-nhan-tenant",
            title: "Xác nhận hành vi trên tenant NAB",
            body: "Hành vi Private Mode có thể khác tùy phiên bản và cấu hình tenant. Trước khi phát hành, SME phải xác nhận:",
            items: [
              { label: "Conversation history", text: "Hệ thống có ghi lịch sử cuộc trò chuyện hay không." },
              { label: "Training", text: "Nội dung có được gửi để huấn luyện mô hình hay không." },
              { label: "Retention", text: "Chính sách và thời gian lưu giữ dữ liệu được áp dụng như thế nào." },
              { label: "Memory", text: "Private Mode có tương đương với không đọc và không ghi bộ nhớ trên tenant NAB hay không." }
            ]
          }
        ]
      },
      {
        number: "11.4",
        id: "sidebar-map",
        title: "Bản đồ sidebar điều hướng",
        intro: "Sidebar bên trái cung cấp truy cập nhanh đến tất cả các năng lực chính.",
        subsections: [
          {
            number: "11.4.1",
            id: "cac-muc-chinh",
            title: "Các mục chính",
            items: [
              { label: "New chat", text: "Bắt đầu cuộc trò chuyện mới." },
              { label: "Search", text: "Tìm kiếm toàn bộ tài nguyên." },
              { label: "My stuff", text: "Nội dung cá nhân gồm datasets, data sources, analyses, dashboards, mục yêu thích và thư mục." },
              { label: "Spaces", text: "Không gian cộng tác tập hợp files, Dashboards, Topics, Datasets và Integration Actions. Giới hạn tối đa 100 files/Space cần được xác nhận trên tenant NAB." },
              { label: "Research", text: "Nghiên cứu chuyên sâu bằng AI, tạo báo cáo dài và phân tích đa nguồn." },
              { label: "Chat agents", text: "Xây dựng và quản lý AI agent tùy chỉnh với persona, tài liệu tham chiếu, spaces và hành động kết nối." },
              { label: "Apps", text: "Biến ý tưởng thành ứng dụng web trong vài phút. Apps chỉ xuất hiện trong bản đồ điều hướng chương này; hướng dẫn chi tiết không chứa quy trình Apps." },
              { label: "Flows", text: "Tạo và chia sẻ quy trình tự động hóa thông minh." },
              { label: "Analyses", text: "Tạo trực quan hóa dữ liệu, xây dựng biểu đồ và sắp xếp trên các sheet." },
              { label: "Dashboards", text: "Phiên bản đã xuất bản của Analysis, được chia sẻ để xem báo cáo tương tác." },
              { label: "Data", text: "Quản lý kết nối nguồn dữ liệu như databases, data warehouses, cloud services và spreadsheets." },
              { label: "My folders / Shared folders", text: "Tổ chức analyses và dashboards." },
              { label: "More", text: "Truy cập các tính năng mở rộng." },
              { label: "Recents", text: "Các cuộc trò chuyện gần đây được lưu trong 30 ngày theo hướng dẫn; thời gian retention thực tế cần được xác nhận trên tenant NAB." }
            ]
          }
        ]
      },
      {
        number: "11.5",
        id: "chat-controls",
        title: "Chat controls",
        intro: "Thanh nhập câu hỏi bao gồm nhiều thành phần điều khiển giúp tương tác linh hoạt với AI.",
        subsections: [
          {
            number: "11.5.1",
            id: "cac-thanh-phan",
            title: "Các thành phần điều khiển",
            items: [
              { label: "Dropdown 'Quick'", text: "Chọn giữa các AI agent khác nhau và có thể chuyển đổi agent ngay trong cùng cuộc trò chuyện." },
              { label: "Ô nhập câu hỏi", text: "Nhập yêu cầu bằng ngôn ngữ tự nhiên; hỗ trợ tối đa 20 files/cuộc trò chuyện, 50 MB/file và các định dạng Word, Excel, PowerPoint, PDF, JPEG, PNG, CSV, TXT, JSON, YAML, XML, HTML. Giới hạn thực tế cần được xác nhận trên tenant NAB." },
              { label: "Dropdown 'All data'", text: "Thu hẹp phạm vi kiến thức của agent theo Dashboards, Spaces, Topics, Datasets hoặc Integrations." },
              { label: "Nút '+'", text: "Đính kèm files hoặc thêm nguồn dữ liệu bổ sung vào cuộc trò chuyện." },
              { label: "Dropdown 'Smart'", text: "Điều chỉnh chế độ xử lý AI và mức độ sâu của quá trình lý luận; hành vi cụ thể cần được xác nhận trên tenant NAB." }
            ]
          }
        ]
      },
      {
        number: "11.6",
        id: "outputs",
        title: "Output shortcuts",
        intro: "Các nút tắt phía dưới ô nhập câu hỏi cho phép chọn định dạng đầu ra mong muốn trước khi gửi yêu cầu.",
        subsections: [
          {
            number: "11.6.1",
            id: "cac-output",
            title: "Các định dạng output",
            items: [
              { label: "Research", text: "Khởi chạy Quick Research để tạo báo cáo dài và phân tích đa nguồn. Theo hướng dẫn giao diện, quá trình mất khoảng 7–10 phút; thời gian thực tế có thể khác." },
              { label: "Document", text: "Tạo tài liệu Word/DOCX hoặc PDF trực tiếp từ cuộc trò chuyện." },
              { label: "Presentation", text: "Tạo bài thuyết trình PowerPoint/PPTX trực tiếp từ cuộc trò chuyện." },
              { label: "Visual", text: "Tạo biểu đồ và hình ảnh trực quan hóa dữ liệu trực tiếp từ chat." },
              { label: "Phạm vi hỗ trợ", text: "Các định dạng đầu ra phụ thuộc vào phiên bản và subscription; SME cần xác nhận trên tenant NAB." }
            ]
          }
        ]
      },
      {
        number: "11.7",
        id: "more-menu",
        title: "Menu More",
        intro: "Menu More nằm ở phía dưới thanh điều hướng bên trái, cung cấp quyền truy cập vào các tính năng nâng cao và mở rộng.",
        subsections: [
          {
            number: "11.7.1",
            id: "cac-tinh-nang-more",
            title: "Các tính năng trong More",
            items: [
              { label: "Automations", text: "Tạo workflow đa bước kết hợp AI với dữ liệu và hành động." },
              { label: "Connectors", text: "Kết nối Salesforce, Jira, ServiceNow, Slack và các ứng dụng bên ngoài qua OAuth hoặc API key để thực hiện hành động từ Quick." },
              { label: "Knowledge", text: "Tạo Topics cho trải nghiệm hỏi đáp bằng ngôn ngữ tự nhiên từ datasets; hỗ trợ cấu hình synonyms, metadata và câu hỏi mẫu." },
              { label: "Extensions", text: "Đưa Quick vào Chrome, Slack, Outlook, Microsoft Teams và Word." },
              { label: "Scenarios", text: "Canvas phân tích dữ liệu với AI gợi ý dữ liệu liên quan và hỗ trợ khám phá insight theo kịch bản." },
              { label: "Stories", text: "Tạo câu chuyện dữ liệu kết hợp văn bản, biểu đồ và insight." },
              { label: "Customize navigation", text: "Tùy chỉnh thanh điều hướng theo nhu cầu cá nhân." },
              { label: "Phạm vi hiển thị", text: "Các tính năng trong More phụ thuộc vào role, subscription và region; SME cần xác nhận danh sách thực tế trên tenant NAB." }
            ]
          }
        ]
      }
    ],
    toc: [
      ["dang-nhap-xac-nhan", "11.1 Đăng nhập và xác nhận"],
      ["bo-cuc-trang-home", "11.2 Bố cục trang Home"],
      ["private-mode", "11.3 Private Mode"],
      ["sidebar-map", "11.4 Sidebar map"],
      ["chat-controls", "11.5 Chat controls"],
      ["outputs", "11.6 Output shortcuts"],
      ["more-menu", "11.7 Menu More"],
      ["kiem-soat", "Kiểm soát"],
      ["faq", "FAQ"],
      ["nguon", "Nguồn"]
    ],
    walkthroughs: [
      {
        title: "Kiểm chứng nguồn và phạm vi dữ liệu",
        intro: "Chỉ thực hiện khi chat và nguồn tương ứng được tenant bật.",
        steps: [
          "Chọn đúng resource NAB; tắt web search nếu use case không cần hoặc chưa được phép.",
          "Prompt nêu KPI, kỳ, đơn vị, filter và yêu cầu không suy đoán.",
          "Mở Sources; nếu có Explanation, kiểm tra nguồn, filter, giả định, phép tính và SQL được tạo.",
          "Đối chiếu ít nhất một tổng hoặc mẫu với dashboard/nguồn gốc.",
          "Chỉ đưa vào tài liệu sau khi reviewer nghiệp vụ xác nhận; không chạy Action trong bước đọc."
        ],
        verify: "Citation mở được, phép tính khớp định nghĩa KPI và không có hành động ghi ngoài ý muốn."
      },
      {
        title: "Sử dụng Private Mode và kiểm tra upload limits",
        intro: "Xác nhận giới hạn và hành vi theo tenant trước khi phát hành.",
        steps: [
          "Bật Private Mode từ thanh header — biểu tượng khoá xuất hiện.",
          "Xác nhận với SME: conversation history có được ghi không, có gửi nội dung training không, Private Mode có tương đương not-memory-read + not-memory-write không.",
          "Kiểm tra giới hạn upload: 20 files/cuộc trò chuyện, 50 MB/file, 100 files/Space theo hướng dẫn giao diện — giới hạn thực tế phụ thuộc tenant.",
          "Xác nhận danh sách định dạng file được hỗ trợ trên tenant NAB.",
          "Ghi giới hạn đã xác nhận vào tài liệu hướng dẫn NAB trước phát hành."
        ],
        verify: "Private Mode hoạt động như mong đợi, upload limits được SME xác nhận và không có lỗi upload."
      }
    ],
    controls: [
      "Chỉ đăng nhập qua tài khoản NAB; không tự tạo Free/Plus hoặc dùng root user cho công việc thường ngày.",
      "Quyền kỹ thuật nhìn thấy asset không thay thế phê duyệt mục đích sử dụng.",
      "Web, upload và connector mặc định không dùng cho đến khi feature matrix xác nhận.",
      "Tách tác vụ đọc khỏi hành động ghi; mọi write cần approval và kiểm soát riêng.",
      "Conversation/memory/retention không thay thế chính sách dữ liệu NAB."
    ],
    faqs: [
      ["Private Mode có thật sự an toàn?", "Private Mode theo hướng dẫn giao diện không sử dụng bộ nhớ và không truy xuất bộ nhớ đã lưu. Tuy nhiên, hành vi cụ thể phụ thuộc vào phiên bản và cấu hình tenant — SME phải xác nhận có ghi conversation history không, có gửi nội dung training không trên tenant NAB."],
      ["Upload file có giới hạn gì?", "Theo hướng dẫn giao diện: tối đa 20 files/cuộc trò chuyện, 50 MB/file, hỗ trợ Word, Excel, PowerPoint, PDF, JPEG, PNG, CSV, TXT, JSON, YAML, XML, HTML. Giới hạn thực tế và danh sách định dạng file cần SME xác nhận trên tenant NAB."],
      ["Tại sao không thấy menu Automations?", "Các mục trong More (Automations, Connectors, Knowledge, Extensions, Scenarios, Stories) phụ thuộc vào role, subscription và region. Gửi ticket nếu thiếu menu đã được phê duyệt."],
      ["Smart mode là gì?", "Chế độ xử lý AI điều chỉnh mức độ sâu của quá trình lý luận. Hành vi cụ thể cần SME xác nhận trên tenant NAB."],
      ["Recents lưu bao lâu?", "Theo hướng dẫn giao diện: 30 ngày. Thời gian retention thực tế cần SME xác nhận trên tenant NAB và không thay thế chính sách dữ liệu NAB."],
      ["Output formats nào được hỗ trợ?", "Theo hướng dẫn giao diện: Research, Document (Word/DOCX, PDF), Presentation (PowerPoint/PPTX), Visual (chart, graph). Danh sách output thực tế phụ thuộc phiên bản và subscription — SME xác nhận trên tenant NAB."],
      ["Apps có phải là production system?", "Không. Apps là prototype ứng dụng web tương tác, không mặc nhiên là hệ thống production. Apps chỉ xuất hiện trong bản đồ điều hướng; hướng dẫn chi tiết không chứa quy trình Apps."],
      ["Quick Research mất bao lâu?", "Theo hướng dẫn giao diện: khoảng 7–10 phút. Thời gian thực tế có thể khác tùy phức tạp và nguồn dữ liệu."]
    ],
    sources: [
      ["What is Amazon Quick?", "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"],
      ["How Amazon Quick works", "https://docs.aws.amazon.com/quick/latest/userguide/how-quicksuite-works.html"],
      ["Signing in to Amazon Quick", "https://docs.aws.amazon.com/quick/latest/userguide/signing-in.html"],
      ["Agentic security in Amazon Quick", "https://docs.aws.amazon.com/quick/latest/userguide/sec-agentic-security.html"]
    ]
  }),
  quickChapter({
    id: 12,
    slug: "chapter-12-amazon-quick-sight.html",
    navTitle: "Spaces và Chat Agents",
    title: "Amazon Quick: Spaces và Chat Agents",
    statusText: "NAB đang sử dụng Spaces và Chat Agents. Giới hạn files/Space, custom agent reference limits, connector availability và sharing controls phải được SME xác nhận trên tenant NAB trước phát hành.",
    summary: "Spaces là không gian cộng tác tập hợp files, dashboards, topics, datasets và integration actions. Chat Agents cho phép tạo AI agent tùy chỉnh với persona, tài liệu tham chiếu, spaces và hành động kết nối. Chương này hướng dẫn tạo và quản lý Spaces cùng custom Chat Agents theo nguyên tắc least privilege.",
    objectives: [
      "Tạo và quản lý Space — thêm files, datasets, dashboards, topics và members.",
      "Hiểu giới hạn Space: tối đa 100 files/Space theo hướng dẫn (cần xác nhận trên tenant NAB).",
      "Tạo Custom Chat Agent: cấu hình persona, reference documents, Spaces và action connectors.",
      "Áp dụng least privilege sharing — chỉ chia sẻ với người cần và permission tối thiểu.",
      "Kiểm soát quyền truy cập agent và Space theo chính sách NAB."
    ],
    prerequisites: [
      "Có tài khoản/role NAB với quyền tạo Space và Chat Agent.",
      "Files, datasets, dashboards đã được phân loại và phê duyệt.",
      "Reference documents cho custom agent đã được data owner xác nhận.",
      "Connector và integration actions đã được IT security phê duyệt (nếu agent cần thực hiện hành động bên ngoài).",
      "SME xác nhận giới hạn files/Space, agent reference limits (tối đa 10 files, 50 MB/file theo hướng dẫn) và sharing controls trên tenant NAB."
    ],
    useCases: [
      { title: "Space cộng tác", text: "Tập hợp files, dashboards, topics và datasets liên quan dự án vào một Space — team members truy cập tập trung." },
      { title: "Custom agent chuyên môn", text: "Tạo agent với persona và knowledge base chuyên ngành — tham chiếu tài liệu, policies, SOPs riêng." },
      { title: "Agent với hành động", text: "Kết nối agent với Salesforce, Jira, ServiceNow qua connectors — agent có thể đọc và thực hiện hành động (cần approval và least privilege)." },
      { title: "Least privilege sharing", text: "Chỉ chia sẻ Space/agent với người cần, permission tối thiểu và review access định kỳ." }
    ],
    guideSections: [
      {
        number: "12.1",
        id: "spaces-gioi-thieu",
        title: "Spaces — giới thiệu",
        intro: "Spaces là không gian cộng tác cho phép tập hợp files, dashboards, topics, datasets và integration actions vào một nơi. Members có quyền truy cập Space sẽ thấy tất cả tài nguyên bên trong.",
        subsections: [
          {
            number: "12.1.1",
            id: "spaces-muc-dich",
            title: "Mục đích và use case",
            body: "Spaces giúp team cộng tác hiệu quả: tập hợp tài liệu dự án, dashboard báo cáo, dataset phân tích và topics Q&A vào một không gian duy nhất. Thay vì chia sẻ từng file riêng lẻ, bạn thêm members vào Space và họ tự động truy cập được tất cả tài nguyên."
          }
        ]
      },
      {
        number: "12.2",
        id: "tao-space",
        title: "Tạo Space",
        intro: "Tạo Space mới từ sidebar, đặt tên mô tả rõ ràng và thêm tài nguyên cần thiết.",
        subsections: [
          {
            number: "12.2.1",
            id: "buoc-tao-space",
            title: "Các bước tạo Space",
            steps: [
              "Chọn 'Spaces' từ sidebar bên trái.",
              "Nhấn 'Create Space' hoặc nút tương đương.",
              "Đặt tên Space mô tả rõ mục đích và phạm vi (ví dụ: 'Q2 Sales Analysis', 'HR Policy Knowledge Base').",
              "Thêm mô tả (optional nhưng khuyến khích) — giải thích mục đích và ai nên dùng.",
              "Lưu Space — Space trống được tạo, sẵn sàng thêm tài nguyên."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/2-1.png", alt: "Giao diện Spaces hiển thị danh sách spaces hiện có và nút Create Space", caption: "Hình 12.1: Danh sách Spaces và nút tạo Space mới" }
            ]
          }
        ]
      },
      {
        number: "12.3",
        id: "quan-ly-space",
        title: "Quản lý files, datasets, dashboards, topics và members",
        intro: "Sau khi tạo Space, thêm tài nguyên và members để xây dựng môi trường cộng tác.",
        subsections: [
          {
            number: "12.3.1",
            id: "them-files",
            title: "Thêm files",
            body: "Upload files trực tiếp vào Space hoặc link files đã có trong My stuff. Giới hạn: tối đa 100 files/Space theo hướng dẫn giao diện — cần SME xác nhận giới hạn thực tế trên tenant NAB. Chỉ thêm files đã được phân loại và data owner phê duyệt.",
            figures: [
              { src: "quick-docs/Images/HDSD/2-2.png", alt: "Giao diện thêm files vào Space với nút upload và danh sách files hiện có", caption: "Hình 12.2: Thêm files vào Space" }
            ]
          },
          {
            number: "12.3.2",
            id: "them-datasets-dashboards",
            title: "Thêm datasets và dashboards",
            body: "Link datasets và dashboards có sẵn vào Space. Members sẽ truy cập được các tài nguyên này theo quyền của họ trên dataset/dashboard gốc. RLS/CLS vẫn áp dụng — Space không bypass data permissions.",
            figures: [
              { src: "quick-docs/Images/HDSD/2-3.png", alt: "Giao diện quản lý datasets và dashboards trong Space", caption: "Hình 12.3: Datasets và Dashboards trong Space" }
            ]
          },
          {
            number: "12.3.3",
            id: "them-topics-members",
            title: "Thêm topics và members",
            body: "Topics là knowledge bases Q&A từ datasets. Thêm topics vào Space để members hỏi đáp bằng ngôn ngữ tự nhiên. Thêm members bằng cách mời user hoặc group — áp dụng least privilege: chỉ mời người cần và chỉ cấp quyền tối thiểu (Viewer/Contributor/Owner). Review access định kỳ và xóa members không còn cần.",
            figures: [
              { src: "quick-docs/Images/HDSD/2-4.png", alt: "Giao diện quản lý members trong Space với danh sách members và quyền truy cập", caption: "Hình 12.4: Quản lý members và permissions trong Space" }
            ]
          }
        ]
      },
      {
        number: "12.4",
        id: "chat-agents-gioi-thieu",
        title: "Chat Agents — giới thiệu",
        intro: "Chat Agents cho phép tạo AI agent tùy chỉnh với persona, knowledge base và khả năng thực hiện hành động. Thay vì dùng agent mặc định 'Quick', bạn tạo custom agent chuyên biệt cho domain hoặc use case cụ thể.",
        subsections: [
          {
            number: "12.4.1",
            id: "agents-muc-dich",
            title: "Mục đích và use case",
            body: "Custom Chat Agents giúp: (1) Cá nhân hóa persona — agent trả lời theo tone, style và vai trò cụ thể. (2) Grounding với tài liệu chuyên môn — agent tham chiếu policies, SOPs, technical docs riêng của bạn. (3) Kết nối hành động — agent đọc/ghi Salesforce, Jira, ServiceNow qua connectors (cần approval). (4) Chia sẻ knowledge — publish agent cho team, họ dùng agent đã được config sẵn."
          }
        ]
      },
      {
        number: "12.5",
        id: "tao-custom-agent",
        title: "Tạo Custom Agent",
        intro: "Tạo agent mới từ sidebar Chat agents, cấu hình persona, reference sources và actions.",
        subsections: [
          {
            number: "12.5.1",
            id: "cau-hinh-persona",
            title: "Cấu hình persona và reference documents",
            items: [
              { label: "Persona", text: "Mô tả vai trò, tone và hành vi mong muốn. Ví dụ: 'You are a senior financial analyst at NAB. Be precise, cite sources, never speculate.'" },
              { label: "Reference documents", text: "Thêm tối đa 10 files, 50 MB/file theo hướng dẫn giao diện; giới hạn thực tế cần được SME xác nhận trên tenant NAB." },
              { label: "Grounding", text: "Agent sử dụng nội dung trong các files tham chiếu để tạo câu trả lời." },
              { label: "Phê duyệt dữ liệu", text: "Chỉ thêm tài liệu đã được data owner phê duyệt." }
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/8-1.png", alt: "Giao diện tạo Custom Chat Agent với các trường cấu hình persona, name, description", caption: "Hình 12.5: Tạo Custom Chat Agent và cấu hình persona" }
            ]
          },
          {
            number: "12.5.2",
            id: "them-spaces-actions",
            title: "Thêm Spaces và action connectors",
            items: [
              { label: "Spaces", text: "Chọn Space mà agent được phép truy cập. Agent sẽ thấy các files, datasets, dashboards và topics trong phạm vi đó." },
              { label: "Action connectors", text: "Kết nối Salesforce, Jira, ServiceNow và các hệ thống khác qua OAuth hoặc API key." },
              { label: "Hành động", text: "Agent có thể đọc records, tạo tickets hoặc cập nhật trạng thái; cần IT Security phê duyệt trước khi bật." },
              { label: "Least privilege", text: "Chỉ bật actions cần thiết và chỉ cấp quyền tối thiểu trên connector." }
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/8-2.png", alt: "Giao diện cấu hình Spaces và Actions cho Custom Agent", caption: "Hình 12.6: Thêm Spaces và Actions cho Custom Agent" }
            ]
          }
        ]
      },
      {
        number: "12.6",
        id: "best-practices-sharing",
        title: "Best practices và least-privilege sharing",
        intro: "Kiểm soát quyền truy cập Space và agent theo nguyên tắc least privilege.",
        subsections: [
          {
            number: "12.6.1",
            id: "nguyen-tac-chia-se",
            title: "Nguyên tắc chia sẻ an toàn",
            steps: [
              "Chỉ chia sẻ Space/agent với người thực sự cần — không share công khai hoặc 'just in case'.",
              "Cấp quyền tối thiểu: Viewer nếu chỉ cần đọc, Contributor nếu cần edit, Owner chỉ cho người quản trị.",
              "Review access định kỳ (ít nhất quarterly) — xóa members không còn làm việc trên dự án.",
              "Ghi log: ai được access, khi nào, lý do gì — lưu workpaper để audit.",
              "Custom agent có actions: phải có approval riêng từ IT security, test kỹ trước production, monitor usage và revoke ngay khi phát hiện hành vi bất thường.",
              "Reference documents trong agent: chỉ thêm documents được phân loại phù hợp và data owner đã approve."
            ]
          }
        ]
      }
    ],
    toc: [
      ["spaces-gioi-thieu", "12.1 Spaces — giới thiệu"],
      ["tao-space", "12.2 Tạo Space"],
      ["quan-ly-space", "12.3 Quản lý Space"],
      ["chat-agents-gioi-thieu", "12.4 Chat Agents — giới thiệu"],
      ["tao-custom-agent", "12.5 Tạo Custom Agent"],
      ["best-practices-sharing", "12.6 Best practices"],
      ["kiem-soat", "Kiểm soát"],
      ["faq", "FAQ"],
      ["nguon", "Nguồn"]
    ],
    walkthroughs: [
      {
        title: "Tạo Space và thêm tài nguyên",
        intro: "Workflow hoàn chỉnh từ tạo Space đến quản lý members.",
        steps: [
          "Chọn 'Spaces' từ sidebar → nhấn 'Create Space'.",
          "Đặt tên Space mô tả rõ ràng (ví dụ: 'Q2 Sales Analysis') và thêm mô tả mục đích.",
          "Upload files hoặc link files từ My stuff — chỉ thêm files đã được phân loại và phê duyệt.",
          "Link datasets và dashboards có sẵn — xác nhận RLS/CLS vẫn áp dụng.",
          "Thêm members: mời user/group, cấp quyền tối thiểu (Viewer/Contributor/Owner).",
          "Ghi log: ai được access, khi nào, lý do gì — lưu workpaper."
        ],
        verify: "Space có tài nguyên đầy đủ, members có quyền phù hợp và access log được ghi nhận."
      },
      {
        title: "Tạo Custom Chat Agent với persona và references",
        intro: "Tạo agent chuyên môn với knowledge base riêng.",
        steps: [
          "Chọn 'Chat agents' từ sidebar → nhấn 'Create Agent'.",
          "Đặt tên agent mô tả vai trò (ví dụ: 'NAB Financial Policy Expert').",
          "Viết persona chi tiết: vai trò, tone, hành vi (ví dụ: 'You are a senior financial analyst at NAB. Be precise, cite sources, never speculate.').",
          "Thêm reference documents (tối đa 10 files, 50 MB/file theo hướng dẫn — cần SME xác nhận giới hạn) — chỉ thêm documents đã được data owner phê duyệt.",
          "Chọn Spaces để agent truy cập (optional) — agent sẽ thấy tất cả tài nguyên trong Space.",
          "Test agent với sample questions — xác nhận grounding và citation đúng.",
          "Chia sẻ agent với team nếu cần — áp dụng least privilege."
        ],
        verify: "Agent trả lời đúng persona, grounding với references và không hallucinate."
      }
    ],
    controls: [
      "Chỉ chia sẻ Space/agent với người thực sự cần — không share công khai hoặc 'just in case'.",
      "Cấp quyền tối thiểu: Viewer nếu chỉ cần đọc, Contributor nếu cần edit, Owner chỉ cho người quản trị.",
      "Review access định kỳ (ít nhất quarterly) — xóa members không còn làm việc trên dự án.",
      "Reference documents trong agent: chỉ thêm documents được phân loại phù hợp và data owner đã approve.",
      "Custom agent có actions: phải có approval riêng từ IT security, test kỹ trước production, monitor usage.",
      "Giới hạn files/Space (100 files) và agent references (10 files, 50 MB/file) theo hướng dẫn — cần SME xác nhận trên tenant NAB."
    ],
    faqs: [
      ["Space có giới hạn gì?", "Theo hướng dẫn giao diện: tối đa 100 files/Space. Giới hạn thực tế cần SME xác nhận trên tenant NAB."],
      ["RLS/CLS có áp dụng trong Space?", "Có. Space không bypass data permissions — members truy cập datasets/dashboards theo quyền của họ trên tài nguyên gốc."],
      ["Custom agent có thể làm gì?", "Agent có thể: (1) Trả lời với persona tùy chỉnh. (2) Grounding với reference documents (tối đa 10 files, 50 MB/file theo hướng dẫn). (3) Truy cập Spaces. (4) Thực hiện hành động qua connectors (cần approval)."],
      ["Agent reference limits là gì?", "Theo hướng dẫn giao diện: tối đa 10 files, 50 MB/file cho reference documents. Giới hạn thực tế cần SME xác nhận trên tenant NAB."],
      ["Làm sao biết agent có actions nguy hiểm?", "Kiểm tra connectors được bật — nếu agent kết nối Salesforce, Jira, ServiceNow và có quyền ghi, cần approval và monitoring riêng."],
      ["Ai có thể tạo Space/agent?", "Phụ thuộc vào role và permissions trên tenant NAB. Thường cần role có quyền tạo shared resources — gửi ticket nếu không thấy nút Create."],
      ["Space có thể chia sẻ ra ngoài NAB?", "Không khuyến khích. Chỉ chia sẻ với internal users/groups theo chính sách NAB."],
      ["Custom agent có được training trên reference docs?", "Không. Agent grounding/retrieval với documents mỗi lần trả lời, không fine-tune hay training lâu dài."]
    ],
    sources: [
      ["Working with Spaces", "https://docs.aws.amazon.com/quick/latest/userguide/spaces-overview.html"],
      ["Creating custom Chat Agents", "https://docs.aws.amazon.com/quick/latest/userguide/chat-agents-create.html"],
      ["Managing Space members and permissions", "https://docs.aws.amazon.com/quick/latest/userguide/spaces-sharing.html"],
      ["Connecting actions to agents", "https://docs.aws.amazon.com/quick/latest/userguide/agents-actions.html"]
    ]
  }),
  quickChapter({
    id: 13,
    slug: "chapter-13-amazon-quick-research-index.html",
    navTitle: "Dữ liệu, Analyses và Dashboards",
    title: "Amazon Quick — tạo datasets, analyses và dashboards",
    statusText: "NAB đang sử dụng Amazon Quick; data sources, SPICE capacity, RLS/CLS, embed, scheduled email và connector phải được SME/Data Owner/ATTT xác nhận.",
    summary: "Datasets chuẩn bị dữ liệu từ data sources; Analyses tạo visuals/filters/sheets; Dashboards xuất bản, share và embed. SPICE cache trong bộ nhớ; Direct Query real-time nhưng chậm hơn.",
    objectives: ["Tạo dataset với SPICE hoặc Direct Query.", "Tạo Analysis với AutoGraph, visuals, filters và sheets.", "Xuất bản Dashboard, share và quản lý SPICE capacity."],
    prerequisites: [
      "SME xác nhận data sources, SPICE capacity available, RLS/CLS requirements và connector được phép.",
      "Data Owner duyệt phạm vi dữ liệu; ATTT duyệt credentials, connector, Region và embed/export settings.",
      "Có định nghĩa KPI, metadata, grain và control totals đã được approve."
    ],
    useCases: [
      { title: "Dataset từ data source", text: "Kết nối Athena, Redshift, S3, uploaded files; join tables, calculated fields, filters; chọn SPICE hoặc Direct Query." },
      { title: "Analysis với AutoGraph", text: "Tạo visuals (charts, tables, KPIs, maps), filters, sheets, parameters; share với colleagues (Co-owner/Viewer)." },
      { title: "Dashboard xuất bản", text: "Publish Analysis thành Dashboard read-only; share, embed vào web app, schedule email (PDF/CSV)." }
    ],
    guideSections: [
      {
        number: "13.1",
        id: "datasets-data-sources",
        title: "Datasets và Data Sources",
        intro: "Dataset là lớp chuẩn bị dữ liệu — kết nối data source, join tables, calculated fields và data types. Data source có thể là Athena, Redshift, RDS, S3, uploaded files hoặc connector."
      },
      {
        number: "13.2",
        id: "tao-chuan-bi-dataset",
        title: "Tạo và chuẩn bị Dataset",
        subsections: [
          {
            number: "13.2.1",
            id: "ket-noi-source",
            title: "Kết nối data source",
            steps: [
              "Từ sidebar, chọn Data → New dataset.",
              "Chọn data source type (Athena, Redshift, RDS, S3, Upload file).",
              "Cấu hình connection: tên, credentials (IAM role/user auth), region/endpoint.",
              "Test connection và chọn table/query hoặc upload file.",
              "Chọn SPICE hoặc Direct Query (xem 13.3)."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/3-1.png", alt: "Màn hình New dataset trong Amazon Quick với danh sách data source types: Athena, Redshift, S3, Upload file và các connector", caption: "Hình 13.1: Kết nối data source và chọn SPICE/Direct Query" }
            ]
          },
          {
            number: "13.2.2",
            id: "chuan-bi-dataset",
            title: "Chuẩn bị Dataset — join, calculated fields, filters",
            body: "Sau khi kết nối, Dataset editor cho phép join tables, add calculated fields, change data types, apply filters và rename columns.",
            steps: [
              "Join thêm tables nếu cần — chọn join type (inner, left, right, full) và join keys.",
              "Add calculated fields: functions, aggregations, date math, string manipulation.",
              "Change data types: date/datetime, number/decimal, string, boolean.",
              "Apply row-level filters để giảm data volume trước khi publish.",
              "Save dataset; có thể schedule refresh nếu dùng SPICE."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/3-2.png", alt: "Dataset editor với các columns, calculated fields, join relationships và data type settings", caption: "Hình 13.2: Dataset editor — join, calculated fields và data types" }
            ]
          }
        ]
      },
      {
        number: "13.3",
        id: "spice-vs-direct-query",
        title: "SPICE versus Direct Query",
        intro: "SPICE (Super-fast, Parallel, In-memory Calculation Engine) cache dữ liệu trong bộ nhớ — truy vấn nhanh nhưng cần refresh và chiếm capacity. Direct Query không cache — luôn real-time nhưng chậm hơn và phụ thuộc data source availability.",
        subsections: [
          {
            number: "13.3.1",
            id: "khi-nao-dung-spice",
            title: "Khi nào dùng SPICE",
            body: "Interactive dashboards, scheduled refresh (hàng ngày/tuần), data không đổi liên tục, cần tốc độ cao. Lưu ý capacity limits — SME xác nhận SPICE capacity available trên tenant NAB."
          },
          {
            number: "13.3.2",
            id: "khi-nao-dung-direct-query",
            title: "Khi nào dùng Direct Query",
            body: "Data thời gian thực (real-time), không muốn cache, data volume vượt SPICE capacity, hoặc data source đã optimized. Lưu ý latency cao hơn SPICE."
          },
          {
            number: "13.3.3",
            id: "refresh-schedule",
            title: "Refresh schedule và incremental refresh",
            body: "SPICE datasets cần refresh để cập nhật data. Full refresh tải lại toàn bộ; incremental refresh chỉ tải dữ liệu mới (cần cột timestamp/date). Schedule refresh qua Dataset settings — chọn frequency (hourly, daily, weekly) và timezone."
          }
        ]
      },
      {
        number: "13.4",
        id: "tao-analysis",
        title: "Tạo Analysis — AutoGraph, visuals, filters và sheets",
        subsections: [
          {
            number: "13.4.1",
            id: "tao-analysis-autograph",
            title: "Tạo Analysis với AutoGraph",
            steps: [
              "Từ sidebar, chọn Analyses → New analysis.",
              "Chọn Dataset đã chuẩn bị.",
              "AutoGraph tự động gợi ý visual type dựa trên fields được chọn.",
              "Drag fields vào Dimensions/Measures/Filters; chọn aggregation (sum, avg, count, min, max).",
              "Thêm filters (dataset-level, sheet-level, visual-level) để control data hiển thị."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/4-1.png", alt: "Analysis editor với AutoGraph gợi ý visual types, field wells, và filter panel", caption: "Hình 13.3: Tạo Analysis với AutoGraph và filters" }
            ]
          },
          {
            number: "13.4.2",
            id: "visuals-sheets",
            title: "Visuals, calculated fields và sheets",
            body: "Analysis có thể chứa nhiều visuals (charts, tables, KPIs, maps) và nhiều sheets. Calculated fields trong Analysis cho phép logic phức tạp: level-aware aggregations, window functions, conditional logic.",
            steps: [
              "Add visual: chọn visual type từ toolbar hoặc để AutoGraph chọn.",
              "Add calculated field: Analysis-level calculated fields áp dụng cho mọi visual trong Analysis.",
              "Add sheet: tổ chức visuals thành tabs — mỗi sheet có filters riêng.",
              "Format visual: titles, tooltips, colors, labels, conditional formatting.",
              "Add parameters: interactive controls (dropdown, slider, date picker) để user thay đổi filters/calculations."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/4-2.png", alt: "Analysis với nhiều visuals, sheets tabs và parameter controls", caption: "Hình 13.4: Analysis với visuals, sheets và parameters" }
            ]
          }
        ]
      },
      {
        number: "13.5",
        id: "chia-se-analysis",
        title: "Chia sẻ Analysis",
        intro: "Analysis có thể share với colleagues để cùng edit hoặc view. Permissions: Owner (full control), Co-owner (edit), Viewer (read-only).",
        subsections: [
          {
            number: "13.5.1",
            id: "share-analysis",
            title: "Share Analysis với colleagues",
            steps: [
              "Mở Analysis → Share icon (góc trên bên phải).",
              "Nhập email/username của colleagues.",
              "Chọn permission: Co-owner (có thể edit) hoặc Viewer (chỉ xem).",
              "Send invitation; colleagues nhận email notification.",
              "Owner có thể revoke access bất kỳ lúc nào."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/4-3.png", alt: "Share Analysis dialog với user list, permission dropdown (Owner/Co-owner/Viewer) và nút Send invitation", caption: "Hình 13.5: Chia sẻ Analysis với colleagues" }
            ]
          }
        ]
      },
      {
        number: "13.6",
        id: "xuat-ban-dashboard",
        title: "Xuất bản và chia sẻ Dashboard",
        intro: "Dashboard là published, read-only version của Analysis. Viewer không edit được — chỉ xem, filter và export (nếu được phép). Dashboard có thể embed vào web app hoặc schedule email.",
        subsections: [
          {
            number: "13.6.1",
            id: "publish-dashboard",
            title: "Publish Dashboard",
            steps: [
              "Mở Analysis → Publish dashboard button.",
              "Nhập tên Dashboard và description.",
              "Chọn sheets để publish (có thể publish một subset của Analysis).",
              "Chọn Share permissions: Owner chọn users/groups được xem Dashboard.",
              "Publish; Dashboard URL được tạo ra."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/5-1.png", alt: "Publish dashboard dialog với tên Dashboard, description, sheet selection và share permissions", caption: "Hình 13.6: Xuất bản Dashboard từ Analysis" }
            ]
          },
          {
            number: "13.6.2",
            id: "share-embed-dashboard",
            title: "Share, embed và scheduled email",
            body: "Dashboard có thể share với users/groups (viewer permissions), embed vào web app (iframe/SDK), hoặc schedule email delivery (PDF/CSV attachments). Không share public — chỉ share nội bộ NAB với users có quyền.",
            steps: [
              "Share: Dashboard → Share icon → add users/groups → choose permissions.",
              "Embed: Dashboard → Share icon → Embed code (yêu cầu SDK integration và authentication).",
              "Scheduled email: Dashboard → Schedule email → chọn recipients, frequency (daily/weekly/monthly), format (PDF/CSV).",
              "Viewer controls: Dashboard viewers có thể filter, drill-down, export (nếu export được bật)."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/5-2.png", alt: "Dashboard với share options: add users/groups, embed code, và scheduled email settings", caption: "Hình 13.7: Chia sẻ Dashboard — users/groups, embed và scheduled email" }
            ]
          }
        ]
      },
      {
        number: "13.7",
        id: "quan-ly-spice",
        title: "Quản lý SPICE capacity và refresh",
        intro: "SPICE capacity có giới hạn per account/region. Admin monitor capacity usage, schedule refresh và allocate capacity cho datasets ưu tiên. Khi capacity đầy, datasets mới không import được hoặc refresh fail.",
        subsections: [
          {
            number: "13.7.1",
            id: "monitor-capacity",
            title: "Monitor SPICE capacity",
            body: "Admin vào QuickSight settings → SPICE capacity → xem total capacity, used capacity và available capacity. Nếu usage > 80%, cân nhắc xóa datasets không dùng, chuyển sang Direct Query, hoặc mua thêm capacity."
          },
          {
            number: "13.7.2",
            id: "schedule-refresh",
            title: "Schedule refresh cho SPICE datasets",
            body: "Dataset settings → Refresh schedule → add schedule (hourly, daily, weekly, monthly). Chọn timezone và time window. Full refresh tải lại toàn bộ data; incremental refresh chỉ tải data mới (cần cột timestamp). Monitor refresh history để phát hiện failures."
          }
        ]
      }
    ],
    toc: [
      ["datasets-data-sources", "13.1 Datasets và Data Sources"],
      ["tao-chuan-bi-dataset", "13.2 Tạo và chuẩn bị Dataset"],
      ["spice-vs-direct-query", "13.3 SPICE vs Direct Query"],
      ["tao-analysis", "13.4 Tạo Analysis"],
      ["chia-se-analysis", "13.5 Chia sẻ Analysis"],
      ["xuat-ban-dashboard", "13.6 Xuất bản Dashboard"],
      ["quan-ly-spice", "13.7 Quản lý SPICE"],
      ["kiem-soat", "Kiểm soát"],
      ["faq", "FAQ"],
      ["nguon", "Nguồn"]
    ],
    walkthroughs: [
      {
        title: "Kiểm chứng KPI definition",
        intro: "Không suy ra định nghĩa KPI chỉ từ title của visual — cần definition document đã duyệt.",
        steps: [
          "Mở KPI definition đã được business owner approve; ghi tử số, mẫu số, grain, timezone và exclusions.",
          "Kiểm tra visual title, tooltip, filters, aggregation và control totals; đối chiếu với nguồn mẫu.",
          "Nếu có chat/Q&A, đặt câu hỏi với filter/kỳ cụ thể để verify calculation.",
          "Mở Explanation (nếu có) và kiểm tra source query, filters, assumptions và SQL/calculation logic.",
          "Business reviewer xác nhận number trước khi số liệu vào báo cáo hoặc quyết định."
        ],
        verify: "Có workpaper chỉ ra nguồn, definition, control total và cách tái tạo con số."
      },
      {
        title: "Export Dashboard an toàn",
        intro: "File export là bản sao mới và cần được phân loại, label và kiểm soát như dữ liệu gốc.",
        steps: [
          "Xác nhận người nhận, mục đích sử dụng, phân loại dữ liệu và quyền export.",
          "Chọn format: PDF cho dashboard overview, CSV/Excel cho data analysis (nếu export được bật).",
          "Kiểm tra đúng filters, sheets, kỳ, columns và không có fields thừa hoặc sensitive data không được phép.",
          "Không bật macro/external links; lưu ý CSV injection risk nếu data chứa formulas.",
          "Lưu vào kho NAB, gắn nhãn phân loại và chỉ share với users/groups được phép; không dùng public link."
        ],
        verify: "File/link có owner, recipients, data classification label và audit trail."
      }
    ],
    controls: [
      "SPICE datasets có thể outdated nếu refresh fails; monitor refresh status và schedule.",
      "Hai người thấy số khác có thể do RLS/CLS, group membership, filters hoặc refresh timing.",
      "Sai grain, join logic hoặc calculated field definition có thể làm aggregations sai; verify với data dictionary và control totals.",
      "Không export hoặc share Dashboard công khai; chỉ share nội bộ NAB với users/groups được phê duyệt.",
      "Dashboard viewer controls (export, filter, drill-down) có thể bị restrict; không tìm cách bypass.",
      "AI Explanation không thay thế business review — reviewer vẫn chịu trách nhiệm verify definitions và numbers."
    ],
    faqs: [
      ["Vì sao hai người thấy số khác nhau?", "Kiểm tra RLS/CLS rules, group membership, applied filters và SPICE refresh timing. Ghi lại đủ bốn yếu tố và báo Dashboard owner."],
      ["SPICE vs Direct Query — chọn thế nào?", "SPICE: interactive dashboards, scheduled refresh, tốc độ cao. Direct Query: real-time data, không cache, data volume lớn vượt SPICE capacity."],
      ["Dashboard có real-time không?", "Không mặc định; phụ thuộc SPICE (cần refresh) hoặc Direct Query (real-time). Kiểm tra Dataset settings để biết refresh schedule."],
      ["Có export toàn bộ Dashboard thành CSV?", "Dashboard thường export PDF. CSV/Excel áp dụng cho individual visuals nếu export được bật bởi owner."],
      ["Vì sao không thấy Export/Filter button?", "Dashboard owner hoặc admin có thể restrict viewer controls. Không tìm cách bypass — yêu cầu owner cấp quyền nếu cần."],
      ["AI Explanation có đủ để verify KPI?", "Không; Explanation làm rõ source query, filters và calculation logic, nhưng business reviewer vẫn phải verify definition, control totals và workpaper."],
      ["Có gửi Dashboard export qua email cá nhân?", "Không; chỉ dùng kênh và recipients được NAB approve. Export files cần data classification label và audit trail."],
      ["Refresh fail — phải làm gì?", "Kiểm tra Dataset refresh history, error logs và data source connectivity. Notify admin/owner; không tự retry hoặc thay đổi configuration."]
    ],
    sources: [
      ["Amazon QuickSight datasets and data sources", "https://docs.aws.amazon.com/quicksight/latest/user/working-with-data-sources.html"],
      ["SPICE capacity management", "https://docs.aws.amazon.com/quicksight/latest/user/managing-spice-capacity.html"],
      ["Creating analyses and visuals", "https://docs.aws.amazon.com/quicksight/latest/user/creating-an-analysis.html"],
      ["Publishing and sharing dashboards", "https://docs.aws.amazon.com/quicksight/latest/user/sharing-a-dashboard.html"],
      ["Row-level security (RLS) and column-level security (CLS)", "https://docs.aws.amazon.com/quicksight/latest/user/restrict-access-to-a-data-set-using-row-level-security.html"]
    ]
  }),
  quickChapter({
    id: 14,
    slug: "chapter-14-amazon-quick-flows-automate.html",
    navTitle: "Scenarios và Quick Research",
    title: "Scenarios và Quick Research: phân tích AI-assisted và nghiên cứu có căn cứ",
    statusText: "NAB đang sử dụng Amazon Quick; Scenarios, Research, web search, upload, knowledge base, ACL và Region phải được SME/ATTT xác nhận.",
    summary: "Scenarios cung cấp AI-assisted analysis canvas để khám phá insights từ data. Quick Research tạo báo cáo có nguồn từ web, Spaces, uploads hoặc dashboards. Cả hai đều yêu cầu citation verification và kiểm soát nguồn.",
    objectives: [
      "Tạo Scenario và sử dụng AI suggestions để phân tích data.",
      "Tạo Research có objective rõ ràng và kiểm tra từng citation.",
      "Phân biệt nguồn authoritative và web search bổ sung.",
      "Ngăn prompt injection, nguồn cũ và over-reliance vào AI output."
    ],
    prerequisites: [
      "SME xác nhận Scenarios, Research, web search, upload, Space/dashboard access và connector nào được bật.",
      "Data Owner duyệt phạm vi nguồn; ATTT duyệt connector, Region và mô hình ACL.",
      "Chỉ dùng dữ liệu đã được phân loại và phê duyệt.",
      "Action connector mặc định không dùng trong phân tích/nghiên cứu."
    ],
    useCases: [
      { title: "Scenarios — Exploratory Analysis", text: "Khám phá data insights với AI suggestions, phân tích what-if scenarios và tương tác với canvas AI-assisted." },
      { title: "Quick Research — Grounded Reports", text: "Nghiên cứu nguồn công khai hoặc nguồn nội bộ được duyệt, tạo báo cáo có citation và source grounding." },
      { title: "Verification First", text: "Luôn mở nguồn gốc, kiểm tra phạm vi và đối chiếu độc lập — không accept AI output blindly." }
    ],
    guideSections: [
      {
        number: "14.1",
        id: "scenarios-gioi-thieu",
        title: "Scenarios — mục đích và access",
        intro: "Scenarios là AI-assisted analysis canvas cho phép khám phá insights từ data với AI suggestions. Thay vì tự build visuals từ đầu, bạn mô tả mục tiêu và Scenarios đề xuất analyses, insights và visualizations.",
        subsections: [
          {
            number: "14.1.1",
            id: "scenarios-muc-dich",
            title: "Mục đích và use case",
            body: "Scenarios hỗ trợ: (1) Exploratory analysis — khám phá data mới, tìm patterns, outliers và trends. (2) What-if scenarios — thử các assumptions/parameters khác nhau. (3) AI-suggested insights — AI đề xuất dimensions, filters, aggregations based on your goal. (4) Collaborative analysis — share scenario canvas với colleagues, iterate trên cùng workspace."
          },
          {
            number: "14.1.2",
            id: "scenarios-access",
            title: "Truy cập Scenarios",
            body: "Scenarios thường nằm trong More menu hoặc My stuff section (tùy Quick version/configuration). SME xác nhận Scenarios có được bật trên tenant NAB và user nào có quyền. Access yêu cầu: (1) User có quyền truy cập datasets/Spaces làm input. (2) Admin đã bật Scenarios feature cho account. (3) Không bypass RLS/CLS — Scenarios vẫn tuân theo data permissions."
          }
        ]
      },
      {
        number: "14.2",
        id: "tao-scenario",
        title: "Tạo Scenario và AI-assisted analysis",
        intro: "Tạo Scenario mới, thêm data source (datasets/Spaces), mô tả mục tiêu analysis và để AI đề xuất visualizations và insights.",
        subsections: [
          {
            number: "14.2.1",
            id: "tao-scenario-steps",
            title: "Các bước tạo Scenario",
            steps: [
              "Mở More menu → My stuff → Scenarios (hoặc entry point tương đương theo version).",
              "Nhấn Create Scenario hoặc New scenario.",
              "Chọn data source: dataset đã có hoặc Space chứa data/dashboards.",
              "Mô tả analysis goal: \"Find top revenue drivers\", \"Identify churn risk segments\", \"Compare Q1 vs Q2 performance\".",
              "AI đề xuất initial visuals, dimensions và filters; review và adjust."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/6-1.png", alt: "Giao diện Scenarios với data source selector, goal input box và AI-suggested analysis canvas", caption: "Hình 14.1: Tạo Scenario với data source và analysis goal" }
            ]
          },
          {
            number: "14.2.2",
            id: "ai-suggestions-insights",
            title: "Sử dụng AI suggestions và insights",
            body: "Sau khi AI đề xuất analysis canvas, bạn có thể: (1) Accept suggestions — thêm visual/filter vào canvas. (2) Refine goal — adjust mô tả để AI đề xuất alternatives. (3) Inspect data — drill-down, add filters, change aggregations. (4) Iterate — ask follow-up questions, explore related dimensions. AI insights không thay thế business judgment — luôn verify numbers, definitions và assumptions.",
            steps: [
              "Review AI-suggested visuals: chart type, dimensions, measures, filters.",
              "Kiểm tra aggregation logic: sum/avg/count, grain, join keys và control totals.",
              "Add more data sources nếu cần cross-dataset analysis (tuân theo approval và ACL).",
              "Refine canvas: remove không cần, add calculated fields, format labels và titles.",
              "Save Scenario; có thể share với colleagues (Owner/Co-owner/Viewer permissions)."
            ]
          }
        ]
      },
      {
        number: "14.3",
        id: "quick-research-gioi-thieu",
        title: "Quick Research — nghiên cứu có căn cứ",
        intro: "Quick Research tạo báo cáo tổng hợp từ nguồn được chỉ định: web search, Spaces, uploads, dashboards. Mục tiêu là tạo output có citation để truy vết từng claim về nguồn.",
        subsections: [
          {
            number: "14.3.1",
            id: "research-access-methods",
            title: "Truy cập và use case",
            body: "Quick Research thường có entry point trong sidebar, More menu hoặc Spaces context menu. Use cases: (1) Market research từ nguồn công khai — competitor analysis, trend reports, policy summaries. (2) Internal research từ Spaces/dashboards — tổng hợp multi-source reports, cross-team insights. (3) Ad-hoc research từ uploads — analyze documents user upload. SME xác nhận Research có được bật, nguồn nào allowed (web/Spaces/uploads/connectors) và retention. Hướng dẫn này ước tính 7–10 phút hoàn thành một research cycle; thời gian thực tế có thể khác tùy scope và source count."
          }
        ]
      },
      {
        number: "14.4",
        id: "tao-research",
        title: "Tạo Research — chọn nguồn và goal",
        intro: "Tạo Research mới, chọn nguồn (web/Spaces/uploads/dashboards), định nghĩa goal và context, review AI plan trước khi execute.",
        subsections: [
          {
            number: "14.4.1",
            id: "chon-nguon",
            title: "Chọn nguồn: Web, Spaces, Uploads, Dashboards",
            body: "Research có thể dùng một hoặc nhiều nguồn (nếu cross-boundary được duyệt): (1) **Web search** — public web, domain filtering, date range. Yêu cầu approval riêng vì outbound traffic và crawler footprint. (2) **Spaces** — knowledge base, files, topics đã lập chỉ mục. ACL áp dụng — Research chỉ truy cập được nguồn user có quyền. (3) **Uploads** — user upload files ad-hoc. Files vẫn cần data classification và không được chứa sensitive data chưa duyệt. (4) **Dashboards** — Research có thể query dashboards để tổng hợp numbers/trends; tuân theo RLS/CLS.",
            steps: [
              "Xác nhận nguồn nào được phép: SME/ATTT confirm web/Spaces/uploads/connectors enabled.",
              "Chọn nguồn tối thiểu cần thiết — không chọn all Spaces/dashboards vì tiện.",
              "Nếu kết hợp web với nội bộ, xác nhận cross-boundary mixing đã được duyệt.",
              "Ghi domain ưu tiên/tránh cho web search (nếu applicable).",
              "Upload files vào NAB-approved storage trước khi dùng trong Research (không upload trực tiếp sensitive data)."
            ]
          },
          {
            number: "14.4.2",
            id: "dinh-nghia-goal-context",
            title: "Định nghĩa goal và context",
            body: "Research goal phải specific: câu hỏi, phạm vi địa lý/thời gian, tiêu chí và định dạng output. Context giúp AI hiểu audience, use case và constraints. Ví dụ goal: \"Summarize Q2 2026 fintech regulatory changes in APAC, focusing on crypto and payments. Output: 2-page executive summary with citations.\" Context: \"For risk team quarterly review; prioritize authoritative sources (regulators, official announcements).\"",
            steps: [
              "Viết goal: câu hỏi cụ thể, khoảng thời gian, địa lý, tiêu chí và định dạng.",
              "Thêm context: audience, use case, authoritative source preferences.",
              "Không đưa dữ liệu nhạy cảm NAB vào search terms/goal.",
              "Review goal/context với SME nếu scope rộng hoặc cross-boundary."
            ]
          }
        ]
      },
      {
        number: "14.5",
        id: "review-research-output",
        title: "Review Research plan, approve và verify citations",
        intro: "Trước khi Research execute, AI đề xuất plan (nguồn, steps, expected output). Sau khi complete, verify từng citation và edit output trước export.",
        subsections: [
          {
            number: "14.5.1",
            id: "approve-plan",
            title: "Review và approve plan",
            body: "AI plan nêu: (1) Nguồn nào sẽ được query. (2) Steps/subtasks để answer goal. (3) Expected format và timeline. Review plan, sửa phạm vi và loại trừ nguồn không cần trước khi approve. Nếu plan quá rộng hoặc bao gồm nguồn chưa duyệt, reject và refine goal.",
            steps: [
              "Đọc plan: nguồn, steps, expected timeline.",
              "Kiểm tra nguồn: có phải authoritative? Có nguồn nào out-of-scope?",
              "Adjust scope: remove nguồn không cần, add constraints/filters.",
              "Approve plan; Research bắt đầu processing.",
              "Monitor progress: Research có thể mất vài phút tùy scope và source count."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/9-1.png", alt: "Research plan dialog với danh sách sources, steps, timeline estimate và Approve/Reject buttons", caption: "Hình 14.2: Review và approve Research plan" }
            ]
          },
          {
            number: "14.5.2",
            id: "verify-citations",
            title: "Inspect citations và verify evidence",
            body: "Research output có citations cho mỗi claim. Mở từng citation để: (1) Kiểm tra tác giả, ngày publish, source type (official/blog/forum). (2) Đọc đoạn trích — citation có thực sự hỗ trợ claim? (3) Kiểm tra context — đoạn trích có bị cắt/diễn giải sai? (4) Cross-check — đối chiếu kết luận quan trọng với tối thiểu hai nguồn độc lập. Citation không bảo đảm claim đúng — luôn verify nguồn gốc.",
            steps: [
              "Mở từng citation link; ghi lại source type và date.",
              "Đọc full paragraph/section — không chỉ đọc highlighted snippet.",
              "Kiểm tra authoritative source: regulator announcement > news > blog > forum.",
              "Đối chiếu cross-source: ít nhất hai nguồn độc lập cho claims quan trọng.",
              "Ghi ngày truy cập, bất đồng và giới hạn vào workpaper."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/9-2.png", alt: "Research output với inline citations, citation panel hiển thị source URL, author, date và excerpt", caption: "Hình 14.3: Verify citations — mở source, check author/date/context" }
            ]
          },
          {
            number: "14.5.3",
            id: "edit-export-research",
            title: "Edit và export Research",
            body: "Sau verification, edit output: bổ sung disclaimers, sửa diễn giải sai, thêm limitations. Export vào kho NAB được phép, gắn data classification label và cấp quyền đúng audience. Không gửi nguyên văn AI output cho stakeholders — luôn có reviewer kiểm chứng và chịu trách nhiệm nội dung.",
            steps: [
              "Edit output: thêm limitations (\"data as of <date>\"), disclaimers, source notes.",
              "Remove claims không verify được hoặc từ nguồn yếu.",
              "Export format: PDF cho reports, markdown/docx nếu cần edit tiếp.",
              "Lưu vào kho NAB, gắn data classification label.",
              "Share với đúng users/groups — không public link, không email cá nhân."
            ],
            figures: [
              { src: "quick-docs/Images/HDSD/9-3.png", alt: "Research editor với edit controls, export options (PDF/Markdown/DOCX) và share settings", caption: "Hình 14.4: Edit và export Research output" }
            ]
          }
        ]
      },
      {
        number: "14.6",
        id: "verification-safe-sharing",
        title: "Verification best practices và safe sharing",
        intro: "Research và Scenarios output đều cần verification: kiểm tra định nghĩa, control totals, citations và assumptions. Không accept AI output blindly.",
        subsections: [
          {
            number: "14.6.1",
            id: "verification-checklist",
            title: "Verification checklist",
            body: "Trước khi dùng output: (1) Có objective/goal rõ ràng? (2) Nguồn có authoritative và current? (3) Citations có thực sự hỗ trợ claims? (4) Có cross-check bằng nguồn độc lập? (5) Có disclaimer về phạm vi, date cutoff và limitations? (6) Có reviewer chịu trách nhiệm verify?"
          },
          {
            number: "14.6.2",
            id: "safe-sharing",
            title: "Safe sharing và export controls",
            body: "Research/Scenarios output là dữ liệu mới và cần phân loại: (1) Export vào kho NAB được phép, không lưu local/personal drive. (2) Gắn data classification label theo dữ liệu nguồn nhạy cảm nhất. (3) Share với đúng users/groups — không public link. (4) Ghi audit trail: ai tạo, ai review, ai receive, purpose. (5) Không bypass ACL — không tạo bản sao bỏ quyền chỉ để chia sẻ rộng hơn."
          }
        ]
      }
    ],
    toc: [
      ["scenarios-gioi-thieu", "14.1 Scenarios — mục đích và access"],
      ["tao-scenario", "14.2 Tạo Scenario và AI-assisted analysis"],
      ["quick-research-gioi-thieu", "14.3 Quick Research — nghiên cứu có căn cứ"],
      ["tao-research", "14.4 Tạo Research — chọn nguồn và goal"],
      ["review-research-output", "14.5 Review Research plan, approve và verify citations"],
      ["verification-safe-sharing", "14.6 Verification và safe sharing"],
      ["kiem-soat", "Kiểm soát"],
      ["faq", "FAQ"],
      ["nguon", "Nguồn"]
    ],
    walkthroughs: [
      {
        title: "Exploratory analysis với Scenarios",
        intro: "Khám phá data mới với AI suggestions — nhưng vẫn verify aggregation logic và control totals.",
        steps: [
          "Chọn dataset/Space có quyền; mô tả goal cụ thể (dimensions, measures, filters).",
          "Review AI-suggested visuals: chart type, aggregations, grain có đúng?",
          "Kiểm tra calculated fields và join logic nếu AI đề xuất cross-dataset analysis.",
          "Iterate: refine goal, add filters, drill-down — nhưng không accept số liệu mà chưa verify.",
          "Save Scenario; share với reviewer; họ verify definitions và control totals trước khi dùng insights."
        ],
        verify: "Scenario có definition document cho KPIs, control totals match source và reviewer sign-off."
      },
      {
        title: "Research nguồn công khai",
        intro: "Tạo research report từ web — không đưa dữ liệu nhạy cảm NAB vào search terms.",
        steps: [
          "Viết goal: câu hỏi, địa lý, khoảng thời gian, tiêu chí và định dạng output.",
          "Chọn web search (nếu được duyệt); thêm domain ưu tiên/tránh nếu phù hợp.",
          "Review plan: nguồn, steps, timeline — adjust scope nếu quá rộng.",
          "Approve plan; sau khi complete, mở từng citation — check tác giả, ngày, context.",
          "Cross-check claims quan trọng với tối thiểu hai nguồn độc lập; edit output, thêm disclaimers; export vào kho NAB."
        ],
        verify: "Report có objective, source register, ngày truy cập, limitations và reviewer."
      },
      {
        title: "Research với asset nội bộ",
        intro: "Tổng hợp từ Spaces/dashboards — chỉ dùng nguồn và audience đã được Data Owner phê duyệt.",
        steps: [
          "Xác nhận Spaces/dashboards và người nhận kết quả với Data Owner.",
          "Chọn tối thiểu nguồn cần thiết — không chọn all Spaces vì tiện.",
          "Không kết hợp web với nội bộ nếu cross-boundary chưa duyệt.",
          "Review plan: nguồn nào authoritative, web chỉ bổ sung gì.",
          "Verify citations, check phiên bản, quyền; export vào kho NAB, cấp quyền đúng audience (không rộng hơn nguồn)."
        ],
        verify: "Mỗi claim truy ngược được source/version; export không bypass ACL nguồn."
      }
    ],
    controls: [
      "AI suggestions (Scenarios) và citations (Research) không thay thế verification — reviewer vẫn chịu trách nhiệm kiểm chứng definitions, control totals và claims.",
      "Research plan có thể bao gồm nguồn out-of-scope — review và adjust trước approve.",
      "Citations có thể partial match hoặc misinterpreted — luôn đọc full context và cross-check.",
      "Không kết hợp web với nội bộ nếu cross-boundary mixing chưa được ATTT/Data Owner duyệt.",
      "Research/Scenarios output là dữ liệu mới — cần data classification label, ACL và audit trail.",
      "Không bypass RLS/CLS bằng cách export rồi share rộng hơn — export vẫn tuân theo nguồn ACL."
    ],
    faqs: [
      ["Scenarios có replace Analysis?", "Không; Scenarios là exploratory canvas với AI suggestions. Analysis vẫn là nơi build production dashboards với full control."],
      ["Research có real-time không?", "Tùy nguồn: web search/Spaces có thể gần real-time; dashboards phụ thuộc SPICE refresh. Luôn ghi date cutoff trong report."],
      ["Citation có bảo đảm claim đúng?", "Không; citation có thể partial/misinterpreted. Luôn mở source, đọc context, check authoritative và cross-check độc lập."],
      ["Có thể dùng Research output trực tiếp cho quyết định?", "Không; output cần reviewer verify, edit, thêm disclaimers và sign-off trước khi dùng."],
      ["Research plan quá rộng — có thể skip review?", "Không; reject plan và refine goal. Plan rộng tốn thời gian, nguồn và có thể include out-of-scope data."],
      ["Có share Research qua email cá nhân?", "Không; export vào kho NAB, gắn data classification label và share với đúng users/groups trong môi trường được phép."],
      ["Scenarios có bypass RLS/CLS?", "Không; Scenarios tuân theo data permissions. Nếu user không có quyền trên dataset, không tạo được Scenario từ dataset đó."],
      ["Web search có được bật mặc định?", "Tùy tenant config; SME/ATTT xác nhận web search, domain filtering và outbound traffic có được phép."]
    ],
    sources: [
      ["Amazon QuickSight Scenarios", "https://docs.aws.amazon.com/quicksight/latest/user/scenarios.html"],
      ["Amazon QuickSight Research", "https://docs.aws.amazon.com/quicksight/latest/user/quicksight-research.html"],
      ["Data source permissions and access control", "https://docs.aws.amazon.com/quicksight/latest/user/managing-permissions.html"]
    ]
  }),
  quickChapter({
    id: 15,
    slug: "chapter-15-amazon-quick-apps.html",
    navTitle: "Quick Flows & Automate",
    title: "Amazon Quick Flows và Quick Automate: tự động hóa có kiểm soát",
    statusText: "NAB đang sử dụng Amazon Quick; quyền tạo/chạy/chia sẻ, connector, schedule, approval và HITL phải được SME/ATTT xác nhận.",
    summary: "Flow hoặc automation do AI sinh chỉ là bản nháp. Hành động ghi vào production cần owner, least privilege, UAT, approval, logging và rollback.",
    objectives: ["Tạo Flow read-only có thể kiểm thử.", "Thiết kế human gate cho write/schedule.", "Quản lý vòng đời Automate từ test đến monitoring/rollback."],
    prerequisites: [
      "Use case có process owner, system owner, data owner, risk rating và test data.",
      "Feature, role, Region, connector, approval/HITL đã được xác nhận.",
      "Tách credential test/prod, không nhúng secret trong prompt, tài liệu hoặc flow."
    ],
    useCases: [
      { title: "Quick Flows", text: "Tác vụ ngắn, lặp lại, cá nhân/nhóm; natural language hoặc visual editor." },
      { title: "Quick Automate", text: "Quy trình enterprise, dài/khối lượng lớn, có case, exception, HITL, deployment và monitoring." },
      { title: "Human gate", text: "Tách Generate/Review khỏi Save/Send/Write; giữ phê duyệt trước hành động hệ quả." }
    ],
    guideSections: [
      {
        id: "flows-muc-dich-quyen",
        number: "15.1",
        title: "Amazon Quick Flows — mục đích và quyền truy cập",
        subsections: [
          { id: "flows-la-gi", heading: "Flows là gì", body: "Quick Flows tự động hóa tác vụ ngắn, lặp lại — trích xuất insight, chuẩn bị báo cáo, gửi tóm tắt hoặc cập nhật nguồn bên ngoài. Được thiết kế cho analyst cá nhân và nhóm, không cần SDLC đầy đủ. AI sinh response, áp dụng logic, gọi dashboard/dataset và có thể thực hiện action ghi khi được cấu hình." },
          { id: "flows-truy-cap-va-quyen", heading: "Truy cập và quyền", body: "Quyền tạo, chạy và chia sẻ Flow phụ thuộc subscription, custom permissions và xác nhận của Admin NAB. Least privilege: chỉ cấp quyền đọc trừ khi use case yêu cầu write và đã có phê duyệt riêng. Connector bên thứ ba cần inventory về scope, credential và giới hạn rate." },
          { id: "flows-canh-bao-pham-vi", heading: "Cảnh báo phạm vi", body: "Flow do AI sinh chỉ là bản nháp — nó không kiểm chứng dữ kiện, nguồn hoặc downstream effect. Validation, testing và approval là nghĩa vụ của owner. Không bật schedule write hoặc chia sẻ rộng khi chưa qua kiểm soát." }
        ],
        figures: [
          { src: "quick-docs/Images/HDSD/10-1.png", alt: "Giao diện tạo Quick Flow với options từ mô tả hoặc blank canvas", caption: "Hình 15.1: Giao diện tạo Quick Flow từ mô tả hoặc blank canvas" }
        ]
      },
      {
        id: "tao-cau-hinh-flow",
        number: "15.2",
        title: "Tạo và cấu hình một Flow",
        subsections: [
          { id: "tao-flow", heading: "Tạo từ mô tả hoặc blank", body: "Mô tả ngắn gọn purpose, input, processing và output. AI sinh bản nháp Flow; analyst review từng step, nguồn trích xuất và response logic. Chuyển sang visual editor khi cần điều chỉnh chi tiết hoặc rẽ nhánh." },
          { id: "cau-hinh-input-output", heading: "Cấu hình input và output", body: "Đặt tham số input (user prompt, date range, ID filter), chọn nguồn (dataset, dashboard, Space, connector) và định dạng output (text, table, chart). Runtime cần handle missing/invalid input; không giả định dữ liệu luôn có sẵn." },
          { id: "them-logic-actions", heading: "Thêm logic và actions", body: "Dùng AI response, data insights, condition, loop và action ghi khi cần. Mọi write phải có validation trước, dùng test target, và bật human confirmation trừ khi có approval gate riêng. Flow read-only không cần confirmation; Flow có action hoặc schedule bắt buộc review." }
        ],
        figures: []
      },
      {
        id: "guided-conversational-chat",
        number: "15.3",
        title: "Guided, Conversational và chạy từ chat",
        subsections: [
          { id: "guided-execution", heading: "Guided execution", body: "Hệ thống thu thập input từng bước theo form; phù hợp Flow có ràng buộc chặt, nhiều tham số hoặc validation phức tạp. User điền đủ input rồi run một lần; không có cơ hội refine mid-execution." },
          { id: "conversational-execution", heading: "Conversational execution", body: "User tương tác qua chat: nhập prompt, nhận câu hỏi làm rõ, điều chỉnh yêu cầu và refine output trong một luồng liên tục. Phù hợp exploratory work và khi spec ban đầu không rõ ràng. Mọi action write vẫn cần confirmation/approval." },
          { id: "chay-flow-tu-chat", heading: "Chạy Flow từ sidebar chat", body: "Gõ lệnh hoặc mention Flow name trong chat của Space; hệ thống detect intent, map tham số và chạy Flow tương ứng. Cần thiết lập trigger và input default; không giả định AI luôn map đúng entity." }
        ],
        figures: []
      },
      {
        id: "automate-muc-dich-quyen",
        number: "15.4",
        title: "Quick Automate — mục đích và quyền truy cập",
        subsections: [
          { id: "automate-la-gi", heading: "Automate là gì", body: "Quick Automate cho quy trình dài hơn, khối lượng lớn, cần exception handling, HITL gate, case management và monitoring. Khác Flow: có staging/production deployment, version control, centralized schedule, và operational dashboard. Dành cho enterprise workflow yêu cầu kiểm soát và truy vết đầy đủ." },
          { id: "automate-truy-cap-subscription", heading: "Truy cập và subscription", body: "Tùy vào gói Quick Pro/Enterprise và NAB custom permissions. Feature, Region, connector, notification channel và approval workflow phải được Admin/SME xác nhận trước khi deploy. Production automation không được tự đăng ký connector hoặc tự phân quyền." },
          { id: "automate-kiem-soat", heading: "Kiểm soát bắt buộc", body: "Owner rõ ràng (process, system, data owner), risk rating, test data, UAT, version, audit log, monitoring và rollback runbook. Không tách credential test/prod chung, không nhúng secret trong prompt hoặc documentation artifact." }
        ],
        figures: []
      },
      {
        id: "cau-hinh-trigger-actions-ai-notifications",
        number: "15.5",
        title: "Cấu hình trigger, actions, AI, notifications",
        subsections: [
          { id: "schedule-event-trigger", heading: "Schedule và event trigger", body: "Lịch chạy theo cron (time-based) hoặc event trigger (record insert, field change, external webhook). Bắt buộc có timezone, input default, backup owner và auth expiry check. Không bật schedule khi chưa test idempotency và confirmation setting." },
          { id: "actions-connector", heading: "Actions và connector", body: "Lập inventory connector trước: READ/WRITE capability, credential scope, resource giới hạn, rate limit và owner. Write action phải có validation, use test target, log đầy đủ và compensation/rollback nếu lỗi. Không gọi production write trong test phase." },
          { id: "ai-tasks-hitl", heading: "AI tasks và HITL", body: "AI có thể classify, extract, generate draft hoặc propose decision — nhưng không autonomous approve/send/write trừ khi có explicit approval gate. HITL (human-in-the-loop) cho High/Critical risk: AI draft, human review, approval rồi mới commit. Task assignment, escalation và timeout đều cần cấu hình rõ." },
          { id: "notifications-alerting", heading: "Notifications và alerting", body: "Thiết lập thông báo lỗi, thành công, HITL pending, timeout và credential expiry qua email/Slack/webhook. Bao gồm correlation ID, case link, run timestamp và đủ context để responder action ngay. Không spam; dùng digest hoặc severity threshold." }
        ],
        figures: []
      },
      {
        id: "test-approve-monitor-stop-rollback",
        number: "15.6",
        title: "Test, approve, monitor, stop và rollback",
        subsections: [
          { id: "test-day-du", heading: "Test đầy đủ", body: "Chạy happy path, invalid input, duplicate, timeout, permission denied, partial completion và recovery scenario. Xác nhận retry không nhân đôi write, auth expiry được handle và lỗi cuối không để case/task treo. Test environment tách, có data representative và credential không dùng chung prod." },
          { id: "uat-approval", heading: "UAT và approval", body: "User acceptance test bởi process owner và representative end-user. Xác nhận output đúng, notification kịp thời, HITL assignment works và rollback có thể thực thi. Approval bởi risk/ATTT nếu automation ghi vào sensitive/production system." },
          { id: "version-deployment", heading: "Version và deployment", body: "Commit version ổn định, gắn tag/release note. Map prod config và credential (lease privilege, rotated). Deploy rồi mới bật trigger; không rollout ngầm. Có smoke test ngay sau deploy." },
          { id: "monitor-operational-control", heading: "Monitor và operational control", body: "Theo dõi case/task queue, run success/failure rate, duration, credential status và connector health. Khi lỗi: dừng trigger ngay, cô lập side effect (ví dụ: đánh dấu case/task đã xử lý để tránh re-run), investigate root cause và rollback theo runbook. Không tự retry vô hạn hoặc tự restart without fix." },
          { id: "rollback-recovery", heading: "Rollback và recovery", body: "Runbook chứa: cách dừng automation, revert config, clean up partial writes, restore previous version và thông báo impacted users. Test runbook trong UAT; không để đến incident mới viết lần đầu." }
        ],
        figures: [
          { src: "quick-docs/Images/HDSD/10-2.png", alt: "Dashboard monitoring Quick Automate hiển thị case count, task status, run history và credential expiry", caption: "Hình 15.2: Dashboard monitoring Quick Automate với metrics và alerts" }
        ]
      }
    ],
    walkthroughs: [
      {
        title: "Flow chỉ đọc với dữ liệu giả lập",
        intro: "Mục tiêu là chứng minh luồng không có side effect.",
        steps: [
          "Viết purpose, input, processing, output và tuyên bố không gọi action ghi.",
          "Tạo Flow từ mô tả hoặc blank flow; review từng step, nguồn và output.",
          "Chạy bằng dữ liệu giả lập; kiểm tra progress, output, lỗi và history.",
          "Test input rỗng, sai định dạng, quá dài và nguồn không tìm thấy.",
          "Lưu version ổn định; chỉ share đúng user/group và qua review nếu tenant yêu cầu."
        ],
        verify: "Flow tái chạy được, không tạo side effect và pass cả happy/negative cases."
      },
      {
        title: "Flow có action hoặc lịch chạy",
        intro: "Mọi write phải có inventory, validation và phê duyệt.",
        steps: [
          "Lập inventory connector: READ/WRITE, credential, resource scope và owner.",
          "Thêm validation và review trước action; dùng test target.",
          "Test lỗi auth, timeout, duplicate và partial failure; xác nhận compensation/rollback.",
          "Với schedule, điền input mặc định và giữ confirmation cho write trừ khi có duyệt riêng.",
          "Kiểm tra run history, thông báo, timezone, auth expiry và backup owner."
        ],
        verify: "Mọi write có approval/audit và chạy lặp không tạo bản ghi trùng."
      },
      {
        title: "Vòng đời Quick Automate",
        intro: "Áp dụng SDLC rút gọn nhưng đầy đủ bằng chứng.",
        steps: [
          "Tạo project với purpose, group, business case và tài liệu đã làm sạch.",
          "Review high-level plan trước khi sinh low-level actions.",
          "Cấu hình schema, runtime, credential test, validation, retry, exception và HITL.",
          "Test happy path, invalid input, duplicate, timeout, permission denied, partial completion và recovery.",
          "Commit version, UAT, map prod config/credential, deploy rồi mới bật trigger.",
          "Monitor case/task/log; khi lỗi dừng trigger, cô lập side effect và rollback theo runbook."
        ],
        verify: "Version, môi trường, owner, test/UAT, monitoring và rollback đều truy vết được; Critical/High bằng 0."
      }
    ],
    controls: [
      "Tách đọc/ghi và dùng human gate với nội dung không tin cậy.",
      "Service credential phải least privilege, xoay vòng và có owner.",
      "Kiểm thử idempotency/dedup; retry có giới hạn và không nhân đôi tác động.",
      "Không bật schedule khi chưa xác nhận timezone, input, auth và confirmation setting.",
      "Bắt buộc có run/case/task metrics, log, alert và correlation ID phù hợp."
    ],
    faqs: [
      ["Flow khác Automate?", "Flow cho tác vụ ngắn cá nhân/nhóm; Automate cho quy trình enterprise tập trung và điều khiển nâng cao."],
      ["Có thể ghi thẳng hệ thống từ output AI?", "Không trước validation, approval và UAT; write cần kiểm soát riêng."],
      ["Schedule có tự xác nhận action?", "Tùy cấu hình; NAB mặc định giữ confirmation cho write trừ khi có phê duyệt rủi ro riêng."],
      ["Ai được share/approve Flow?", "Phụ thuộc subscription/custom permissions và quy trình NAB; SME phải xác nhận."],
      ["Có test trực tiếp production?", "Không. Dùng test target/Test environment trước UAT."],
      ["Xử lý lỗi thế nào?", "Phân loại business/system exception, retry tạm thời có giới hạn, HITL/compensation và dừng khi cần."],
      ["Vì sao schedule dừng?", "Kiểm tra connector auth, version, share/delete, Region và run history; không tự đổi credential prod."],
      ["Go-live cần gì?", "Owner, risk review, least privilege, test/UAT, version, monitoring, stop và rollback runbook."]
    ],
    sources: [
      ["Using Amazon Quick Flows", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-flows.html"],
      ["Schedules in Quick Flows", "https://docs.aws.amazon.com/quick/latest/userguide/schedules-in-quick-flows.html"],
      ["Using Amazon Quick Automate", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-automate.html"],
      ["Testing automations", "https://docs.aws.amazon.com/quick/latest/userguide/testing-automations.html"],
      ["Deploying automations", "https://docs.aws.amazon.com/quick/latest/userguide/deploying-automations.html"]
    ]
  })
];
