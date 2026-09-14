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
    navTitle: "Amazon Quick tổng quan",
    title: "Amazon Quick: tổng quan và truy cập an toàn",
    statusText: "NAB đang sử dụng Amazon Quick. Account, Region, role, subscription, connector và menu cụ thể phải được SME xác nhận trước phát hành.",
    summary: "Amazon Quick tập hợp phân tích BI, nghiên cứu, lập chỉ mục, workflow, automation và tạo ứng dụng; người dùng cần chọn đúng năng lực và đúng quyền cho từng tác vụ.",
    objectives: [
      "Phân biệt Quick Sight, Quick Research, Quick Index, Quick Flows, Quick Automate và Apps.",
      "Đăng nhập đúng account/role NAB và phát hiện quyền bất thường.",
      "Kiểm chứng nguồn, phép tính và quyền trước khi dùng đầu ra."
    ],
    prerequisites: [
      "Có tài khoản/SSO NAB, MFA và role/subscription được cấp; không dùng root user hoặc tài khoản cá nhân.",
      "Dữ liệu đã phân loại; chỉ chọn dashboard, dataset, Space, knowledge base và connector được duyệt.",
      "Theo tài liệu AWS, Quick Sight và Quick Automate chỉ có trên account được provision qua AWS Management Console, không có trên Free/Plus; SME vẫn phải xác nhận account NAB.",
      "SME điền account name, Region, URL/SSO, vai trò, feature matrix và kênh hỗ trợ thực tế."
    ],
    useCases: [
      { title: "Quick Sight", text: "Dashboard, trực quan hóa, phân tích dữ liệu có cấu trúc và KPI." },
      { title: "Quick Research", text: "Tổng hợp nhiều nguồn thành báo cáo có citation; vẫn phải mở và kiểm tra nguồn." },
      { title: "Quick Index", text: "Lập chỉ mục nguồn được kết nối để grounding knowledge base/Space; chỉ owner/admin cấu hình." },
      { title: "Quick Flows", text: "Tác vụ ngắn, lặp lại cho cá nhân/nhóm; ưu tiên read-only và human review." },
      { title: "Quick Automate", text: "Quy trình end-to-end, dài hoặc khối lượng lớn; cần UAT, monitoring và rollback." },
      { title: "Apps", text: "Prototype ứng dụng web tương tác; không mặc nhiên là hệ thống production." }
    ],
    walkthroughs: [
      {
        title: "Đăng nhập và xác nhận đúng ngữ cảnh",
        intro: "Chỉ dùng portal/SSO do NAB công bố.",
        steps: [
          "Mở portal/SSO NAB; không dùng link lạ hoặc màn hình tự đăng ký.",
          "Hoàn tất MFA và kiểm tra account/tenant, Region cùng hồ sơ người dùng theo checklist SME.",
          "Đối chiếu role và menu đang thấy với feature matrix đã phê duyệt.",
          "Kiểm tra asset mặc định không nằm ngoài phạm vi công việc.",
          "Nếu sai account, thiếu menu hoặc quyền quá rộng, dừng thao tác và gửi ticket kèm ảnh đã che dữ liệu nhạy cảm."
        ],
        verify: "Đúng account NAB, đúng Region/role và chỉ thấy năng lực cần thiết cho nhiệm vụ."
      },
      {
        title: "Chọn đúng năng lực",
        intro: "Tách nhu cầu đọc, nghiên cứu, phân tích, ghi và tự động hóa.",
        steps: [
          "Viết mục tiêu, đầu vào, đầu ra, người phê duyệt và có/không hành động ghi.",
          "Phân loại dữ liệu và xác định data owner.",
          "Chọn Quick Sight cho KPI có cấu trúc, Research cho tổng hợp có nguồn, Flow cho tác vụ lặp ít rủi ro.",
          "Nếu cần connector, lịch chạy, app hoặc Automate, kiểm tra phê duyệt riêng.",
          "Ghi tên asset, owner và phiên bản vào workpaper."
        ],
        verify: "Use case có owner, năng lực Quick, nguồn dữ liệu và cổng phê duyệt rõ ràng."
      },
      {
        title: "Hỏi dữ liệu có kiểm chứng",
        intro: "Chỉ thực hiện khi chat và nguồn tương ứng được tenant bật.",
        steps: [
          "Chọn đúng resource NAB; tắt web search nếu use case không cần hoặc chưa được phép.",
          "Prompt nêu KPI, kỳ, đơn vị, filter và yêu cầu không suy đoán.",
          "Mở Sources; nếu có Explanation, kiểm tra nguồn, filter, giả định, phép tính và SQL được tạo.",
          "Đối chiếu ít nhất một tổng hoặc mẫu với dashboard/nguồn gốc.",
          "Chỉ đưa vào tài liệu sau khi reviewer nghiệp vụ xác nhận; không chạy Action trong bước đọc."
        ],
        verify: "Citation mở được, phép tính khớp định nghĩa KPI và không có hành động ghi ngoài ý muốn."
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
      ["Có thể tự tạo tài khoản Free/Plus?", "Không. Hướng dẫn NAB chỉ áp dụng account do NAB cấp và quản trị."],
      ["Vì sao không thấy một menu?", "Có thể do subscription, role, custom permission, Region hoặc rollout; gửi ticket, không tự mở dịch vụ."],
      ["Quick Sight có phải sản phẩm khác?", "Amazon QuickSight đã phát triển thành Amazon Quick; năng lực BI tiếp tục dưới tên Amazon Quick Sight."],
      ["Có dùng root user không?", "Không cho công việc thường ngày; dùng identity/role tổ chức được cấp."],
      ["Thấy asset nghĩa là được dùng mọi mục đích?", "Không. Quyền kỹ thuật không thay phân loại dữ liệu và phê duyệt nghiệp vụ."],
      ["Khi nào dùng Automate thay Flows?", "Automate cho quy trình tập trung, dài/khối lượng lớn; Flows cho tác vụ ngắn cá nhân/nhóm. Cả hai phải được tenant bật."],
      ["Có citation là đủ tin cậy?", "Chưa. Phải mở nguồn, kiểm tra phạm vi, thời điểm, phép tính và đối chiếu độc lập."]
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
    navTitle: "Amazon Quick Sight",
    title: "Amazon Quick Sight: đọc, kiểm chứng và chia sẻ dashboard",
    statusText: "NAB đang sử dụng Amazon Quick. Dashboard, KPI, lịch refresh, export, chat và RLS/CLS cụ thể phải được SME thao tác lại trên tenant.",
    summary: "Một con số trên dashboard chỉ có ý nghĩa khi đi kèm nguồn, kỳ dữ liệu, filter, đơn vị, định nghĩa KPI và quyền của người xem.",
    objectives: ["Đọc dashboard trong đúng ngữ cảnh dữ liệu và quyền.", "Kiểm chứng KPI, filter, phép tính và độ mới.", "Export/chia sẻ đúng phạm vi."],
    prerequisites: [
      "Có quyền Reader/Author phù hợp và link/dashboard do NAB công bố.",
      "Biết owner, data dictionary/KPI definition, kỳ dữ liệu và nơi báo lỗi.",
      "Tác giả xác nhận SPICE/Direct Query, refresh schedule, RLS/CLS và download options."
    ],
    useCases: [
      { title: "Xem dashboard", text: "Đọc visual, filter, drill và tooltip theo quyền Reader." },
      { title: "Kiểm chứng KPI", text: "Đối chiếu định nghĩa, nguồn, phép tổng hợp và control total." },
      { title: "Chia sẻ có kiểm soát", text: "Export đúng phạm vi, lưu kho NAB và chia sẻ cho user/group cụ thể." }
    ],
    walkthroughs: [
      {
        title: "Mở và lọc dashboard an toàn",
        intro: "Luôn bắt đầu từ trạng thái filter mặc định.",
        steps: [
          "Mở từ Library/link được duyệt; kiểm tra tên dashboard, owner và mục đích.",
          "Chọn đúng sheet và Reset filter về mặc định trước khi phân tích.",
          "Xác nhận kỳ báo cáo, đơn vị và thời điểm/chu kỳ cập nhật.",
          "Áp dụng từng filter; ghi lại giá trị và phạm vi tác động.",
          "Dùng drill/sort nếu được bật; Reset trước khi chụp evidence hoặc rời trang."
        ],
        verify: "Bạn giải thích được con số cùng dashboard, sheet, kỳ, filter, đơn vị và thời điểm cập nhật."
      },
      {
        title: "Kiểm chứng một KPI",
        intro: "Không suy ra định nghĩa KPI chỉ từ tiêu đề visual.",
        steps: [
          "Mở định nghĩa KPI đã duyệt; ghi tử số, mẫu số, grain và timezone.",
          "Kiểm tra title, tooltip, filter, tổng và ngoại lệ; đối chiếu control total hoặc mẫu nguồn.",
          "Nếu chat được bật, đặt câu hỏi có kỳ/filter cụ thể.",
          "Mở Explanation và kiểm tra source, filters, assumptions, calculation/SQL nếu có.",
          "Reviewer nghiệp vụ xác nhận trước khi số liệu đi vào báo cáo hoặc quyết định."
        ],
        verify: "Có workpaper chỉ ra nguồn, định nghĩa và cách tái tạo con số."
      },
      {
        title: "Export và chia sẻ có kiểm soát",
        intro: "File export là một bản sao mới và cần được phân loại lại.",
        steps: [
          "Xác nhận người nhận, mục đích, phân loại dữ liệu và quyền export.",
          "Chọn PDF cho dashboard hoặc CSV/Excel cho visual theo chức năng được bật.",
          "Kiểm tra đúng filter, sheet, kỳ, hàng/cột và không có trường thừa.",
          "Không bật macro/link; lưu ý dữ liệu có thể gây CSV injection.",
          "Lưu vào kho NAB, gắn nhãn và chỉ share user/group được phép; không dùng public link."
        ],
        verify: "File/link có owner, người nhận, nhãn dữ liệu và dấu vết phê duyệt."
      }
    ],
    controls: [
      "SPICE có thể cũ hoặc refresh lỗi; kiểm tra ingestion/refresh theo SLA.",
      "Hai người có thể thấy số khác do RLS/CLS, group, filter hoặc thời điểm refresh.",
      "Sai grain, join hoặc calculated field có thể làm tổng sai; đối chiếu data dictionary.",
      "AI explanation không thay kiểm tra nghiệp vụ.",
      "Không dùng 'anyone on the internet' hoặc gửi export qua kênh cá nhân."
    ],
    faqs: [
      ["Vì sao hai người thấy số khác?", "Kiểm tra RLS/CLS, group, filter và thời điểm refresh; ghi đủ bốn yếu tố rồi báo owner."],
      ["Reset có sửa dữ liệu người khác?", "Không. Reset đưa view của phiên hiện tại về mặc định, không sửa dataset."],
      ["Dashboard có phải realtime?", "Không mặc định; phụ thuộc SPICE/Direct Query và cấu hình refresh."],
      ["Có export cả dashboard thành CSV?", "Dashboard thường export PDF; CSV/Excel áp dụng cho visual phù hợp theo tùy chọn được bật."],
      ["Vì sao không thấy Download/Filter?", "Tác giả hoặc role có thể hạn chế; không tìm cách vượt quyền."],
      ["Explanation có thay kiểm tra nghiệp vụ?", "Không; nó làm rõ nguồn, filter, giả định và phép tính, nhưng reviewer vẫn chịu trách nhiệm."],
      ["Có gửi file qua email cá nhân?", "Không; chỉ kênh và người nhận được NAB cho phép."],
      ["Làm gì khi refresh thất bại?", "Dừng dùng số liệu bị ảnh hưởng, ghi dataset/kỳ/thời điểm và báo owner/Service Desk."]
    ],
    sources: [
      ["Amazon Quick BI", "https://docs.aws.amazon.com/quick/latest/userguide/quick-bi.html"],
      ["Exploring dashboards", "https://docs.aws.amazon.com/quick/latest/userguide/exploring-dashboards.html"],
      ["Export or print dashboard", "https://docs.aws.amazon.com/quick/latest/userguide/export-or-print-dashboard.html"],
      ["Row-level security", "https://docs.aws.amazon.com/quick/latest/userguide/row-level-security.html"],
      ["Chat explanations", "https://docs.aws.amazon.com/quick/latest/userguide/chat-explanations.html"]
    ]
  }),
  quickChapter({
    id: 13,
    slug: "chapter-13-amazon-quick-research-index.html",
    navTitle: "Quick Research & Index",
    title: "Amazon Quick Research và Quick Index: nghiên cứu có căn cứ",
    statusText: "NAB đang sử dụng Amazon Quick; Research, web search, upload, knowledge base, ACL và Region phải được SME/ATTT xác nhận.",
    summary: "Quick Research tạo báo cáo tổng hợp; Quick Index hỗ trợ lập chỉ mục cho knowledge base/Space. Hai năng lực có mục đích và ranh giới quyền khác nhau.",
    objectives: ["Tạo nghiên cứu có objective và kiểm tra từng evidence.", "Thiết kế knowledge base theo least privilege và ACL.", "Ngăn over-indexing, nguồn cũ và prompt injection."],
    prerequisites: [
      "SME xác nhận Research, web search, upload, Space/KB và connector nào được bật.",
      "Data Owner duyệt phạm vi nguồn; ATTT duyệt connector, Region và mô hình ACL.",
      "Action connector mặc định không dùng trong nghiên cứu."
    ],
    useCases: [
      { title: "Quick Research", text: "Nghiên cứu nguồn công khai hoặc nguồn nội bộ được duyệt, tạo báo cáo có citation." },
      { title: "Quick Index", text: "Lập chỉ mục nguồn có phạm vi, sync và ACL để dùng trong knowledge base/Space." },
      { title: "Không hạ ACL", text: "Không tạo bản sao bỏ ACL chỉ để đạt tương thích tính năng khi chưa được ATTT/Data Owner duyệt." }
    ],
    walkthroughs: [
      {
        title: "Nghiên cứu nguồn công khai",
        intro: "Không đưa dữ liệu nhạy cảm NAB vào search terms.",
        steps: [
          "Viết objective gồm câu hỏi, địa lý, khoảng thời gian, tiêu chí và định dạng.",
          "Chỉ bật web search khi được duyệt; thêm domain ưu tiên/tránh nếu phù hợp.",
          "Review plan, sửa phạm vi và loại trừ trước khi bắt đầu.",
          "Mở từng citation/evidence; kiểm tra tác giả, ngày và phạm vi.",
          "Đối chiếu kết luận quan trọng bằng tối thiểu hai nguồn độc lập/chính thống."
        ],
        verify: "Báo cáo có objective, source register, ngày truy cập, giới hạn và reviewer."
      },
      {
        title: "Nghiên cứu với asset nội bộ",
        intro: "Chỉ dùng nguồn và audience đã được Data Owner phê duyệt.",
        steps: [
          "Xác nhận tài liệu/Space/dashboard/KB và người nhận kết quả.",
          "Chọn tối thiểu nguồn cần thiết, không chọn toàn bộ vì tiện.",
          "Không kết hợp web với dữ liệu nội bộ nếu chưa duyệt cross-boundary.",
          "Trong plan, nêu nguồn nào authoritative và web chỉ bổ sung gì.",
          "Kiểm tra citation, phiên bản, quyền; export vào kho NAB và cấp quyền lại."
        ],
        verify: "Mỗi kết luận truy ngược được source/version; bản export không rộng quyền hơn nguồn."
      },
      {
        title: "Tạo và kiểm thử knowledge base",
        intro: "Chỉ owner/admin được ủy quyền thực hiện.",
        steps: [
          "Lập phiếu mục đích, owner, source, include/exclude, classification, retention, sync SLA, ACL và rollback.",
          "Quyết định ACL trước khi tạo; xác nhận connector có hỗ trợ document-level ACL.",
          "Tạo integration/knowledge base với scope hẹp và lịch sync; bật cảnh báo lỗi.",
          "Xem sync report, xử lý Failed/Skipped/Deleted và deletion safeguard.",
          "Kiểm thử user được phép và user bị cấm trên tài liệu đại diện; lưu evidence trước khi share/attach."
        ],
        verify: "Sync hoàn tất và negative permission test không làm lộ tài liệu."
      }
    ],
    controls: [
      "Citation không bảo chứng kết luận; đọc evidence và đối chiếu độc lập.",
      "Web/tài liệu có thể chứa prompt injection; không để cùng agent vừa đọc nguồn không tin cậy vừa thực hiện write.",
      "Scope folder/file/date tối thiểu để tránh over-indexing.",
      "Kiểm tra cả quyền knowledge base và ACL nguồn; share KB không thay source ACL.",
      "Thiết kế ACL từ đầu; không hạ ACL để lấy tính năng khác."
    ],
    faqs: [
      ["Research và Index khác gì?", "Research tạo báo cáo; Index lưu nội dung đã lập chỉ mục cho retrieval của knowledge base/Space."],
      ["Citation nghĩa là nội dung đúng?", "Không. Phải kiểm tra evidence, ngày và độ tin cậy nguồn."],
      ["Có bật web search cho mọi nghiên cứu?", "Không; chỉ bật theo use case được phê duyệt."],
      ["Có upload tài liệu khách hàng?", "Mặc định không; chỉ khi chính sách, feature matrix và Data Owner cho phép rõ ràng."],
      ["Vì sao không tìm thấy tài liệu?", "Kiểm tra quyền KB, source ACL, identity mapping, sync và scope filter; không mở rộng quyền vội."],
      ["Có thể bật ACL sau khi tạo KB?", "Theo tài liệu AWS hiện hành, cấu hình này cần được quyết định khi tạo; phải thiết kế trước."],
      ["KB có ACL dùng được với Research?", "AWS hiện nêu knowledge base bật document-level ACL không tương thích Quick Research; không tạo bản sao không ACL nếu chưa được ATTT duyệt."],
      ["Chia sẻ report có giữ quyền nguồn?", "Không nên giả định. Export là bản sao mới và phải phân loại/cấp quyền lại."]
    ],
    sources: [
      ["Using Amazon Quick Research", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-research.html"],
      ["Knowledge base integrations", "https://docs.aws.amazon.com/quick/latest/userguide/knowledge-base-integrations.html"],
      ["ACL best practices", "https://docs.aws.amazon.com/quick/latest/userguide/acl-best-practices-kb.html"],
      ["Sync reports and observability", "https://docs.aws.amazon.com/quick/latest/userguide/sync-reports-observability.html"]
    ]
  }),
  quickChapter({
    id: 14,
    slug: "chapter-14-amazon-quick-flows-automate.html",
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
  }),
  quickChapter({
    id: 15,
    slug: "chapter-15-amazon-quick-apps.html",
    navTitle: "Apps in Amazon Quick",
    title: "Apps in Amazon Quick: prototype ứng dụng nội bộ an toàn",
    statusText: "NAB đang sử dụng Amazon Quick; Apps, role, integration và quy trình SDLC/UAT cụ thể phải được SME/ATTT xác nhận.",
    summary: "Ứng dụng tạo bằng hội thoại vẫn là prototype. Không dùng dữ liệu thật ở vòng đầu, không publish Public và không bỏ qua threat review/UAT.",
    objectives: ["Tạo prototype bằng dữ liệu giả lập và version rõ ràng.", "Phê duyệt READ/WRITE cho từng asset/integration.", "UAT quyền, dữ liệu, hành vi và rollback trước publish."],
    prerequisites: [
      "Tenant bật Apps và role/subscription phù hợp.",
      "Có Product Owner, Data Owner và reviewer CNTT/ATTT.",
      "Service authentication, write, shared storage hoặc account-wide sharing có phê duyệt riêng."
    ],
    useCases: [
      { title: "Prototype", text: "Mô phỏng giao diện và luồng bằng synthetic data, không connector/write ở vòng đầu." },
      { title: "Integration", text: "Chỉ thêm Space, visual hoặc action khi data-flow và quyền READ/WRITE được duyệt." },
      { title: "Pilot nội bộ", text: "Publish Limited cho user/group pilot sau UAT; không dùng Public cho use case NAB." }
    ],
    walkthroughs: [
      {
        title: "Prototype không integration",
        intro: "Tạo ứng dụng bằng dữ liệu giả lập và yêu cầu không connector/AI/write.",
        steps: [
          "Prompt nêu purpose, audience, views, fields, validation, lỗi mong đợi và accessibility.",
          "Generate và kiểm tra live preview.",
          "Test navigation, keyboard, input rỗng/sai/quá dài và thông báo lỗi.",
          "Mỗi lượt chỉ đổi một điểm; ghi version sau mốc ổn định.",
          "Nếu hỏng, preview/restore version; lưu test evidence và giới hạn đã biết."
        ],
        verify: "Prototype hoạt động với synthetic data và Assets không có integration ngoài thiết kế."
      },
      {
        title: "Thêm dữ liệu/integration được duyệt",
        intro: "Mỗi nguồn/đích phải có data-flow và quyền rõ ràng.",
        steps: [
          "Chọn private storage cho trạng thái cá nhân; shared storage chỉ cho dữ liệu cộng tác đã duyệt.",
          "Thêm đúng Space/visual/action; kiểm tra tên asset và READ/WRITE khi consent.",
          "Đối chiếu toàn bộ Assets với data-flow.",
          "Test user được phép và user bị hạn chế để xác nhận RLS/CLS.",
          "Ưu tiên user auth; với service auth, review phạm vi quyền dùng chung.",
          "Tách bước AI Generate và nút Save/Submit để người dùng review từng write payload."
        ],
        verify: "Asset inventory khớp data-flow và negative permission tests pass."
      },
      {
        title: "UAT, publish và rollback nội bộ",
        intro: "Mặc định chia sẻ Limited cho nhóm pilot.",
        steps: [
          "Freeze version; UAT chức năng, quyền, validation, duplicate/timeout, recovery, accessibility và volume.",
          "Owner/ATTT ký; chọn Limited và user/group pilot, không dùng Public.",
          "Publish, kiểm thử URL bằng Viewer không phải tác giả.",
          "Xác nhận viewer không edit/share và chỉ thấy asset họ được phép.",
          "Mỗi lần republish phải regression; khi lỗi thu hồi share, restore stable version và publish lại/dừng app."
        ],
        verify: "URL chỉ mở cho audience duyệt; release/version, UAT và rollback evidence đầy đủ."
      }
    ],
    controls: [
      "Mặc định share Limited; NAB không dùng Public cho nội dung nội bộ.",
      "Shared storage có thể lộ dữ liệu cho mọi app user; dùng private cho trạng thái cá nhân.",
      "Ưu tiên user authentication; service credential cần scope/monitor/review riêng.",
      "AI inference có write phải được người dùng xem payload trước Save/Submit.",
      "Sandbox không ngăn logic sai; UAT/threat review vẫn bắt buộc.",
      "Ghi nhận giới hạn không export source code, owner phụ thuộc và exit plan."
    ],
    faqs: [
      ["Generate xong có thành hệ thống production?", "Không. Đây là bản tạo bằng AI cần SDLC rút gọn, security review và UAT."],
      ["Có dùng dữ liệu khách hàng để thử?", "Không ở prototype; dữ liệu thật chỉ khi Data Owner/ATTT cho phép và quyền đã test."],
      ["Private và shared storage khác gì?", "Private chỉ current user; shared cho người có quyền app. Không lưu secret trong cả hai."],
      ["Viewer app có vượt RLS dashboard?", "AWS thiết kế quyền nguồn vẫn áp dụng, nhưng NAB phải negative-test trên tenant."],
      ["Vì sao write do AI cần approve?", "Để người dùng xem payload trước khi lưu/gọi connector và chịu trách nhiệm hành động."],
      ["Có publish Public?", "Không cho use case NAB."],
      ["Có tải source code app để lưu?", "Theo giới hạn AWS hiện hành, không; cần version evidence, owner và exit plan."],
      ["App hỏng sau chỉnh sửa?", "Restore version ổn định, test, publish lại; nếu integration/auth lỗi thì dừng share và báo SME."]
    ],
    sources: [
      ["Using Apps in Amazon Quick", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-apps.html"],
      ["Connecting integrations", "https://docs.aws.amazon.com/quick/latest/userguide/connecting-integrations-apps.html"],
      ["Security sandbox", "https://docs.aws.amazon.com/quick/latest/userguide/security-sandbox-apps.html"],
      ["Apps limitations", "https://docs.aws.amazon.com/quick/latest/userguide/apps-limitations.html"],
      ["Apps troubleshooting", "https://docs.aws.amazon.com/quick/latest/userguide/apps-troubleshooting.html"]
    ]
  })
];
