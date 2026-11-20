"use strict";

/** Chương 13 — trang việc: dashboard, hỏi đáp dữ liệu, Scenarios, tạo dataset, analysis/dashboard. */
const { DOCS, task, fig } = require("./common");

const CAPTURED = { capturedAt: "2026-11-19" };
const DEMO_NOTE = "Ảnh minh hoạ dùng tệp dữ liệu giả lập (chi nhánh, giao dịch, hồ sơ vay) — không phải số liệu thật của NAB.";

const exportControls = [
  "Tệp xuất (CSV, PDF) là bản sao dữ liệu mới: lưu vào kho NAB được phép, gắn nhãn phân loại, không gửi email cá nhân.",
  "Không tạo bản sao dữ liệu để chia sẻ rộng hơn quyền của nguồn gốc.",
];

// ---------------------------------------------------------------------------
// "Hiểu nhanh" — khái niệm, theo tài liệu AWS (đối chiếu 20/11/2026).
// ---------------------------------------------------------------------------

const DATA_CHAIN = [
  { term: "Nguồn dữ liệu", note: "Tệp CSV/Excel, cơ sở dữ liệu…" },
  { term: "Dataset", note: "Dữ liệu đã chọn cột, đổi kiểu, lọc, tính toán" },
  { term: "Analysis", note: "Nơi tác giả dựng biểu đồ (chỉ tác giả thấy)" },
  { term: "Dashboard", note: "Bản chỉ-xem để chia sẻ cho người dùng" },
];

const CONCEPTS_DASHBOARD = {
  intro: "Dashboard là đầu cuối của chuỗi dữ liệu trong Amazon Quick. Biết dashboard được tạo ra thế nào giúp bạn hiểu mình đang xem số liệu gì và được làm gì với nó.",
  chain: DATA_CHAIN,
  cards: [
    {
      term: "Dashboard",
      what: "Bản **chỉ-xem** của một analysis, do tác giả xuất bản (Publish) để chia sẻ. Dashboard giữ bộ lọc, tham số, cách sắp xếp mà tác giả đã đặt, nhưng **không lưu sẵn số liệu**: mỗi lần mở, dashboard hiển thị dữ liệu hiện có của dataset.",
      use: "Theo dõi chỉ tiêu, báo cáo định kỳ mà không phải tự dựng biểu đồ.",
      example: "Dashboard “Hiệu quả kinh doanh chi nhánh” cập nhật sau mỗi lần dữ liệu được làm mới.",
    },
    {
      term: "Visual và Sheet",
      what: "**Visual** là một biểu đồ hoặc bảng. **Sheet** là một trang gồm nhiều visual xem cùng nhau; một dashboard có thể có nhiều sheet (các tab phía trên).",
      use: "Đọc từng chỉ số; chuyển tab để xem nhóm báo cáo khác.",
    },
    {
      term: "Bộ lọc khi xem",
      what: "Bạn có thể lọc, sắp xếp để xem phần dữ liệu cần thiết. Thay đổi của người xem **không được lưu** và không ảnh hưởng người khác.",
      use: "Xem riêng một vùng, một kỳ mà không làm hỏng dashboard.",
    },
    {
      term: "Hỏi đáp trên dashboard",
      what: "Khung chat bên phải trả lời câu hỏi về dữ liệu của dashboard (khi tác giả bật **Allow data Q&A**). Theo AWS, hỏi đáp truy vấn **toàn bộ dòng và cột** của dataset gắn với dashboard, không chỉ phần đang thấy trên biểu đồ; phân quyền dữ liệu (RLS/CLS) vẫn được áp dụng.",
      use: "Tra cứu nhanh một con số thay vì dò biểu đồ.",
    },
    {
      term: "Quyền Viewer",
      what: "Người được chia sẻ quyền **Viewer** được xem, lọc, sắp xếp, xuất và in. Không sửa được dashboard. Người sửa được là **Co-owner** (chỉ dành cho tác giả).",
    },
    {
      term: "Làm mới dữ liệu",
      what: "Dữ liệu cập nhật theo lịch làm mới của dataset (hằng ngày, hằng tuần…) do chủ dữ liệu đặt, hoặc lấy trực tiếp khi mở nếu dataset dùng truy vấn trực tiếp. Dashboard không nhất thiết là số liệu tức thời.",
    },
  ],
  tables: [
    {
      caption: "Xuất dữ liệu từ dashboard",
      headers: ["Cách xuất", "Lấy được gì"],
      rows: [
        ["**Export to CSV** trên menu một biểu đồ", "Dữ liệu của riêng biểu đồ đó, theo phần đang hiển thị"],
        ["Bảng / bảng pivot", "CSV hoặc Excel; chọn chỉ cột đang hiện hoặc mọi cột"],
        ["**Generate PDF**", "Tệp PDF của dashboard; link tải hết hạn sau 5 phút"],
        ["Cả dashboard ra một tệp CSV", "Không hỗ trợ"],
      ],
    },
  ],
};

const CONCEPTS_ASK_DATA = {
  intro: "Ngoài dashboard, bạn có thể hỏi thẳng trên **dataset** — bộ dữ liệu gốc mà dashboard dùng.",
  cards: [
    {
      term: "Dataset",
      what: "Bộ dữ liệu **đã được chuẩn bị** từ một nguồn (tệp, cơ sở dữ liệu): đã chọn cột, đặt tên, định kiểu (số, ngày, chuỗi), lọc và thêm trường tính toán. Một dataset dùng lại được cho nhiều analysis, dashboard và cho chat.",
      use: "Làm “nguồn sự thật” chung để mọi báo cáo cùng một cách tính.",
      example: "Dataset “Giao dịch chi nhánh” gồm cột Ngày, Chi nhánh, Vùng, Số giao dịch, Tổng giá trị (VND).",
    },
    {
      term: "Hỏi dataset hay hỏi dashboard?",
      what: "Hỏi dashboard: phạm vi là các dataset của dashboard đó, trong ngữ cảnh báo cáo tác giả đã dựng. Hỏi dataset: bạn chọn đúng một bộ dữ liệu làm phạm vi, hợp với câu hỏi chi tiết theo cột cụ thể.",
      use: "Câu hỏi bám báo cáo → hỏi dashboard (13.1). Câu hỏi chi tiết theo cột, theo kỳ → hỏi dataset.",
    },
    {
      term: "SPICE và truy vấn trực tiếp",
      what: "Dataset **SPICE** là bản sao dữ liệu nằm trong bộ nhớ tính toán nhanh của Quick, cập nhật theo lịch làm mới. Dataset **truy vấn trực tiếp** (Direct query) lấy dữ liệu từ nguồn mỗi lần dùng.",
      use: "Biết số liệu “tươi” đến thời điểm nào trước khi trả lời người khác.",
    },
    {
      term: "Topic",
      what: "Lớp ngữ nghĩa gom nhiều dataset (tối đa 12) cùng quan hệ giữa chúng và mô tả nghiệp vụ, để chat hiểu đúng cách gọi trong ngân hàng. Topic do người có quyền tạo; người được chia sẻ quyền Viewer chỉ hỏi được, không sửa.",
      use: "Hỏi bằng thuật ngữ nghiệp vụ (ví dụ “dư nợ”, “huy động”) trên nhiều bảng cùng lúc.",
    },
  ],
  callout: { tone: "info", text: "Chat chỉ trả lời trong phạm vi dữ liệu bạn có quyền. Hai người hỏi cùng câu có thể nhận số khác nhau nếu phân quyền dữ liệu (RLS/CLS) khác nhau." },
};

const CONCEPTS_SCENARIOS = {
  intro: "Scenarios dành cho câu hỏi cần **phân tích nhiều bước**, không chỉ tra một con số.",
  cards: [
    {
      term: "Scenario",
      what: "Không gian phân tích: bạn mô tả vấn đề nghiệp vụ bằng lời, thêm dữ liệu (từ dashboard, tệp tải lên hoặc để Quick tìm dữ liệu phù hợp). AI chia việc thành các bước, trả về nhận định, biểu đồ và gợi ý bước phân tích tiếp theo.",
      use: "Tìm nguyên nhân biến động, so sánh phương án, ước tính tác động của một giả định.",
      example: "“Nếu chi nhánh có tổng giá trị thấp nhất tăng 5% thì tổng toàn hệ thống tăng bao nhiêu?”",
    },
    {
      term: "Dữ liệu trong scenario là bản chụp",
      what: "Dữ liệu đưa vào scenario là **bản chụp (snapshot)** tại lúc thêm: không tự cập nhật khi dashboard đổi số. Có thể lọc, sắp xếp, chọn cột trước khi phân tích.",
      use: "Ghi lại thời điểm lấy dữ liệu khi chia sẻ kết quả.",
    },
    {
      term: "Thread và block",
      what: "Mỗi hướng phân tích là một **thread**; mỗi bước trong thread là một **block** (Step 1, Step 2…) có bảng số liệu và kết luận riêng.",
      use: "Kiểm tra từng bước tính thay vì chỉ đọc kết luận cuối.",
    },
  ],
  tables: [
    {
      caption: "Hỏi đáp dashboard hay Scenario?",
      headers: ["", "Hỏi đáp trên dashboard (13.1)", "Scenario"],
      rows: [
        ["Kiểu câu hỏi", "Một câu, cần một con số hoặc bảng nhanh", "Vấn đề cần nhiều bước, có giả định"],
        ["Dữ liệu", "Dữ liệu hiện tại của dashboard", "Bản chụp từ dashboard, tệp tải lên"],
        ["Kết quả", "Câu trả lời ngắn", "Chuỗi bước phân tích, biểu đồ, kết luận"],
      ],
    },
    {
      caption: "Giới hạn chính (theo tài liệu AWS)",
      headers: ["Mục", "Giới hạn"],
      rows: [
        ["Scenario đang hoạt động", "3 mỗi người dùng"],
        ["Tệp tải lên", ".xlsx hoặc .csv, tối đa 1 GB"],
        ["Nguồn dữ liệu trong một scenario", "Tối đa 10"],
      ],
    },
  ],
};

const CONCEPTS_DATASET = {
  intro: "Dataset là nền của mọi báo cáo trong Amazon Quick: chuẩn bị đúng một lần, mọi analysis, dashboard và câu hỏi dùng chung.",
  chain: DATA_CHAIN,
  cards: [
    {
      term: "Nguồn dữ liệu (data source)",
      what: "Nơi dữ liệu đang nằm và thông tin kết nối tới đó (cơ sở dữ liệu, kho dữ liệu…). Với tệp tải lên (CSV, Excel), Quick không lưu kết nối — chính tệp là nguồn.",
    },
    {
      term: "Dataset là gì?",
      what: "Bộ dữ liệu **đã chuẩn bị** lấy từ nguồn: chọn cột cần dùng, đặt lại tên cột, định kiểu (số, ngày, chuỗi), lọc bớt dòng, thêm **trường tính toán**, nối bảng. Các bước chuẩn bị được lưu cùng dataset.",
      use: "Chuẩn bị một lần, dùng lại cho nhiều analysis, dashboard, chat và Scenario; mọi báo cáo cùng một cách tính.",
      example: "Từ tệp giao dịch thô, tạo dataset chỉ giữ 6 cột cần báo cáo, đổi cột Ngày sang kiểu ngày, thêm trường “Giá trị bình quân/giao dịch”.",
    },
    {
      term: "Sửa dataset ảnh hưởng ai?",
      what: "Sửa dataset (đổi tên cột, đổi kiểu, thêm lọc) sẽ thay đổi **mọi analysis và dashboard đang dùng nó**.",
      use: "Báo người dùng báo cáo trước khi sửa dataset dùng chung.",
    },
    {
      term: "SPICE",
      what: "Bộ máy tính toán trong bộ nhớ của Quick. Dữ liệu nạp vào SPICE là **bản sao** để truy vấn nhanh; dung lượng SPICE dùng chung cho cả tài khoản ngân hàng. Tệp tải lên luôn được nạp vào SPICE.",
      use: "Dashboard mở nhanh, không phải chờ truy vấn nguồn.",
    },
    {
      term: "Cập nhật dữ liệu",
      what: "Dataset từ tệp tải lên **không tự làm mới**. Khi có số liệu kỳ mới, dùng **Update file** với tệp có **cùng các cột, cùng thứ tự** như tệp cũ (khác cột sẽ báo lỗi). Dataset từ cơ sở dữ liệu có thể đặt lịch làm mới.",
    },
    {
      term: "Quyền trên dataset",
      what: "Dataset mới tạo chỉ chủ sở hữu thấy. Khi chia sẻ dataset: **User** được tạo analysis từ dataset; **Owner** được thêm làm mới, sửa, xoá, chia sẻ lại.",
    },
  ],
  tables: [
    {
      caption: "Tệp được phép tải lên (theo tài liệu AWS)",
      headers: ["Mục", "Quy định"],
      rows: [
        ["Định dạng", "CSV/TSV, Excel (.xlsx), JSON"],
        ["Dung lượng", "Tối đa 1 GB mỗi tệp"],
        ["Mã ký tự", "UTF-8 (không dùng UTF-8 có BOM) — tránh lỗi font tiếng Việt"],
        ["Số cột", "Tối đa 2.000 cột mỗi tệp"],
      ],
    },
  ],
  callout: { tone: "warning", text: "Dữ liệu trong SPICE là **bản sao dữ liệu mới**: quản lý như dữ liệu gốc (phân loại, chủ sở hữu, thời hạn lưu) và xoá khi không còn dùng." },
};

const CONCEPTS_ANALYSIS = {
  intro: "Analysis là “bàn làm việc” của tác giả; dashboard là bản xuất bản để người khác xem.",
  chain: DATA_CHAIN,
  cards: [
    {
      term: "Analysis",
      what: "Nơi dựng biểu đồ từ một hoặc nhiều dataset. Giống dashboard nhưng **chỉ tác giả được chia sẻ mới mở được**; sửa analysis **không** làm dashboard đổi cho đến khi Publish lại.",
      use: "Thử, chỉnh biểu đồ an toàn trước khi đưa cho người dùng.",
    },
    {
      term: "AutoGraph",
      what: "Không phải một loại biểu đồ: Quick **tự chọn loại biểu đồ** phù hợp với số trường và kiểu dữ liệu bạn chọn (ví dụ chọn Ngày + Giá trị → biểu đồ đường).",
      use: "Dựng nhanh; sau đó đổi loại biểu đồ ở khung Visuals nếu cần.",
    },
    {
      term: "Bộ lọc, tham số, trường tính toán",
      what: "**Bộ lọc** thu hẹp dữ liệu; **tham số** là biến người xem chọn qua ô điều khiển (ví dụ chọn vùng); **trường tính toán** tạo cột mới bằng công thức. Đặt ở dataset thì mọi analysis dùng được; đặt trong analysis thì chỉ analysis đó có.",
    },
    {
      term: "Publish và Replace",
      what: "**Publish** tạo dashboard từ analysis. Muốn cập nhật dashboard đã có, Publish lại và chọn **Replace existing dashboard** — giữ nguyên quyền chia sẻ.",
    },
    {
      term: "Viewer và Co-owner",
      what: "**Viewer**: xem, lọc, xuất, in. **Co-owner** (chỉ tác giả): thêm sửa, chia sẻ, xoá dashboard. Nhóm người dùng chỉ được cấp Viewer.",
    },
    {
      term: "Người xem thấy dữ liệu gì?",
      what: "Theo AWS, người có quyền xem dashboard **xem được dữ liệu dùng trong analysis gắn với dashboard**. Nếu bật hỏi đáp (Allow data Q&A), câu hỏi có thể truy vấn mọi dòng, cột của dataset — không chỉ phần thể hiện trên biểu đồ.",
      use: "Chỉ chia sẻ cho người được phép xem toàn bộ dữ liệu đó, hoặc nhờ chủ dữ liệu cấu hình phân quyền dòng/cột (RLS/CLS).",
    },
  ],
};

module.exports = [
  // -------------------------------------------------------------------------
  task({
    id: "13.1",
    parentId: 13,
    slug: "chapter-13-1-xem-hoi-dashboard.html",
    navTitle: "Xem và hỏi dữ liệu trên dashboard",
    title: "Xem và hỏi dữ liệu trên dashboard",
    summary: "Mở dashboard được chia sẻ, hỏi số liệu ngay trong khung chat của dashboard, xem menu của biểu đồ và xuất dữ liệu đúng quy định.",
    statusText: "Mọi user được xem dashboard được chia sẻ. User Reader: chỉ xem (xem, hỏi đáp, xuất, in) — không sửa dashboard.",
    searchKeywords: ["dashboard", "xem dashboard", "hỏi dữ liệu", "export", "xuất", "pdf", "csv", "reader"],
    capture: { flow: "q13-1-xem-dashboard (tài khoản Reader)", ...CAPTURED },
    objectives: ["Mở và đọc dashboard được chia sẻ.", "Hỏi nhanh số liệu và biết giới hạn của câu trả lời.", "Xuất dữ liệu đúng quy định."],
    prerequisites: ["Dashboard đã được chia sẻ cho bạn (quyền Viewer).", DEMO_NOTE],
    concepts: CONCEPTS_DASHBOARD,
    walkthroughs: [
      {
        title: "Mở dashboard và hỏi số liệu",
        intro: "Ảnh chụp bằng tài khoản Reader được chia sẻ quyền Viewer.",
        steps: [
          { text: "Mở **Dashboards** trên thanh điều hướng, bấm tên dashboard cần xem.", figure: fig("13-1", 1, "Danh sách Dashboards với dashboard được chia sẻ", "Mở dashboard") },
          { text: "Dashboard mở cùng khung chat bên phải; gợi ý sẵn như tóm tắt thay đổi hoặc tạo executive summary một trang.", figure: fig("13-1", 2, "Dashboard với khung chat Ask a question bên phải", "Khung chat của dashboard") },
          { text: "Nhập câu hỏi về số liệu: nêu chỉ số, chiều phân tích và khoảng thời gian.", figure: fig("13-1", 3, "Câu hỏi về chi nhánh có tổng giá trị giao dịch cao nhất quý 3/2026", "Đặt câu hỏi") },
          { text: "Đọc câu trả lời **cùng phần giải thích giới hạn**. Ví dụ: dashboard không có bộ lọc theo quý nên Quick nói rõ không xác định được riêng quý 3 và đưa số của toàn kỳ — không dùng con số đó như số quý 3.", figure: fig("13-1", 4, "Câu trả lời nêu giới hạn dữ liệu và bảng top chi nhánh toàn kỳ", "Câu trả lời và giới hạn") },
        ],
        verify: "Bạn đã đối chiếu câu trả lời với biểu đồ trên dashboard và hiểu phạm vi thời gian của con số.",
      },
      {
        title: "Menu biểu đồ và xuất dữ liệu",
        intro: "Chỉ xuất khi thật cần và lưu đúng nơi quy định.",
        steps: [
          { text: "Di chuột lên biểu đồ, bấm **⋮** (Menu options): **View summary data**, **Export to CSV**.", figure: fig("13-1", 5, "Menu của biểu đồ với View summary data và Export to CSV", "Menu biểu đồ") },
          { text: "Biểu tượng **Export** trên thanh công cụ: **Print**, **Generate PDF**, **View exports**.", figure: fig("13-1", 6, "Menu Export với Print, Generate PDF, View exports", "Xuất dashboard") },
        ],
        verify: "Tệp xuất (nếu có) được lưu vào kho NAB được phép và gắn nhãn phân loại.",
      },
    ],
    troubleshooting: [
      { symptom: "Không thấy dashboard", cause: "Chưa được chia sẻ", action: "Đề nghị chủ dashboard chia sẻ (quyền Viewer)." },
      { symptom: "Số khác đồng nghiệp", cause: "Phân quyền dữ liệu (RLS/CLS), bộ lọc hoặc thời điểm làm mới khác nhau", action: "Ghi lại bộ lọc, thời điểm; báo chủ dashboard nếu chưa giải thích được." },
      { symptom: "Câu trả lời nói không xác định được kỳ dữ liệu", cause: "Dashboard không có trường/bộ lọc phù hợp", action: "Không tự suy diễn; hỏi chủ dashboard hoặc dùng nguồn dữ liệu có đủ trường." },
    ],
    faqs: [
      ["User Reader làm được gì với dashboard?", "Xem, hỏi đáp, xuất CSV/PDF và in (quyền Viewer: Can view, export and print). Không sửa, không tạo analysis."],
      ["Dashboard có cập nhật theo thời gian thực không?", "Không nhất thiết. Dữ liệu cập nhật theo lịch làm mới do chủ dashboard cấu hình; xem thời điểm dữ liệu trước khi dùng."],
      ["Câu trả lời của khung chat có dùng để chốt số được không?", "Không. Dùng để tra cứu nhanh; đối chiếu biểu đồ, định nghĩa KPI và số liệu đối soát trước khi dùng."],
    ],
    controls: [
      "Đọc phần giới hạn trong câu trả lời; không dùng số của kỳ khác thay cho kỳ được hỏi.",
      ...exportControls,
    ],
    sources: [DOCS.dashboardWork, DOCS.dashboardQa, DOCS.dashboardAccess, DOCS.exportDashboard, DOCS.rls],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "13.2",
    parentId: 13,
    slug: "chapter-13-2-hoi-dap-du-lieu.html",
    navTitle: "Hỏi đáp với dữ liệu",
    title: "Hỏi đáp với dữ liệu (dataset)",
    summary: "Chat trực tiếp với dataset bạn có quyền: Quick trả lời bằng bảng và nhận xét nhanh. User Reader chỉ thấy dataset được chia sẻ.",
    statusText: "Hỏi đáp với dataset dùng được khi bạn có quyền trên dataset. User Reader: chỉ xem dữ liệu được chia sẻ, không tạo dataset.",
    searchKeywords: ["data", "dataset", "chat with datasets", "hỏi dữ liệu", "topics", "reader"],
    capture: { flow: "q13-2-hoi-dap-du-lieu, q13-reader-view", ...CAPTURED },
    objectives: ["Hỏi số liệu trực tiếp trên dataset.", "Kiểm chứng câu trả lời trước khi dùng."],
    prerequisites: ["Bạn có quyền trên dataset (do bạn tạo hoặc được chia sẻ).", DEMO_NOTE],
    concepts: CONCEPTS_ASK_DATA,
    walkthroughs: [
      {
        title: "Chat với dataset",
        intro: "Từ trang Data.",
        steps: [
          { text: "Mở **Data** → tab **Datasets**, bấm **Chat** ở dòng dataset cần hỏi.", figure: fig("13-2", 1, "Trang Data với nút Chat ở dòng dataset", "Chat với dataset") },
          { text: "Khung chat mở với dataset đã chọn làm phạm vi dữ liệu.", figure: fig("13-2", 2, "Khung chat với ô Ask a question", "Khung chat") },
          { text: "Đặt câu hỏi cụ thể: chỉ số, chiều phân tích, khoảng thời gian, cách sắp xếp.", figure: fig("13-2", 3, "Câu hỏi tổng giá trị giao dịch theo vùng quý 3/2026", "Đặt câu hỏi") },
          { text: "Quick trả lời bằng bảng kèm nhận xét nhanh và gợi ý phân tích tiếp. Kiểm tra kỳ dữ liệu (ví dụ 01/07–30/09/2026) và tổng có khớp nguồn không.", figure: fig("13-2", 4, "Bảng tổng giá trị giao dịch theo vùng quý 3/2026 và nhận xét", "Câu trả lời dạng bảng") },
        ],
        verify: "Kỳ dữ liệu, bộ lọc và con số trong câu trả lời khớp với nguồn đối soát.",
      },
      {
        title: "User Reader thấy gì ở trang Data",
        intro: "Kiểm tra trên tài khoản Reader.",
        steps: [
          { text: "User Reader chỉ thấy dataset được chia sẻ cho mình, **không có nút Create dataset**; thanh điều hướng không có mục **Analyses**.", figure: fig("13-2", 5, "Trang Data của user Reader: No datasets, không có Create dataset", "Trang Data của Reader") },
        ],
        verify: "Nếu cần hỏi trên dataset, đề nghị chủ dữ liệu chia sẻ hoặc dùng dashboard được chia sẻ (13.1).",
      },
    ],
    troubleshooting: [
      { symptom: "Không thấy dataset", cause: "Chưa được chia sẻ", action: "Đề nghị chủ dữ liệu chia sẻ, hoặc hỏi trên dashboard được chia sẻ." },
      { symptom: "Câu trả lời sai kỳ hoặc sai chỉ số", cause: "Câu hỏi chưa rõ hoặc tên cột khác cách gọi nghiệp vụ", action: "Hỏi lại với tên cột chính xác và kỳ dữ liệu cụ thể." },
    ],
    faqs: [
      ["User Reader có tạo dataset được không?", "Không. Reader chỉ xem dữ liệu được chia sẻ."],
      ["Hỏi dataset khác hỏi dashboard thế nào?", "Hỏi dashboard: phạm vi là các dataset của dashboard, trong ngữ cảnh báo cáo. Hỏi dataset: bạn chọn đúng một bộ dữ liệu làm phạm vi, hợp với câu hỏi chi tiết theo cột, theo kỳ."],
      ["Có dùng câu trả lời để báo cáo được không?", "Chỉ sau khi đối chiếu định nghĩa KPI và số liệu đối soát."],
    ],
    controls: ["Kiểm chứng con số với dashboard hoặc nguồn gốc trước khi dùng.", ...exportControls],
    sources: [DOCS.prepareData, DOCS.spice, DOCS.topics, DOCS.rls],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "13.3",
    parentId: 13,
    limitedUser: true,
    slug: "chapter-13-3-scenarios.html",
    navTitle: "Phân tích với Scenarios",
    title: "Phân tích với Scenarios",
    summary: "Scenarios phân tích sâu nhiều bước theo câu hỏi nghiệp vụ, kể cả câu hỏi giả định: mô tả vấn đề, Quick chuẩn bị dữ liệu, gợi ý hướng phân tích và trình bày từng bước tính.",
    statusText: "Scenarios chỉ dành cho một số user được cấp quyền.",
    searchKeywords: ["scenarios", "scenario", "what-if", "giả định", "phân tích", "thread", "snapshot"],
    capture: { flow: "q13-3-scenarios, q13-3-scenarios-ket-qua", ...CAPTURED },
    objectives: ["Mở Scenario từ dashboard.", "Đặt vấn đề, chọn hướng phân tích và kiểm tra từng bước tính."],
    prerequisites: ["Bạn được cấp quyền Scenarios.", DEMO_NOTE],
    concepts: CONCEPTS_SCENARIOS,
    walkthroughs: [
      {
        title: "Tạo scenario từ dashboard",
        intro: "Có thể mở từ dashboard hoặc từ More → Scenarios → Create scenario.",
        steps: [
          { text: "Trên dashboard, bấm **Analyze this dashboard in a Scenario**.", figure: fig("13-3", 1, "Nút Analyze this dashboard in a Scenario trên dashboard", "Mở Scenario") },
          { text: "Scenario mở với dữ liệu lấy từ dashboard (khung Data bên trái; **Find data**, **Upload file** để thêm). Ô giữa: mô tả vấn đề.", figure: fig("13-3", 2, "Scenario với ô Describe the problem", "Mô tả vấn đề") },
          { text: "Mô tả vấn đề và giả định cần phân tích.", figure: fig("13-3", 3, "Ô vấn đề đã nhập câu hỏi what-if", "Vấn đề cần phân tích") },
          { text: "Bấm **Start analysis**: Quick chuẩn bị dữ liệu.", figure: fig("13-3", 4, "Nút Start analysis", "Start analysis") },
          { text: "**Start a thread**: chọn một gợi ý phân tích hoặc tự mô tả rồi **Submit**. Lưu ý dòng **Review responses for accuracy**.", figure: fig("13-3", 5, "Start a thread với các gợi ý phân tích tiếng Việt", "Chọn hướng phân tích") },
          { text: "Ví dụ chọn gợi ý what-if: nếu chi nhánh có tổng giá trị thấp nhất tăng 5% thì tổng giá trị tăng bao nhiêu.", figure: fig("13-3", 6, "Gợi ý what-if được khoanh đỏ", "Gợi ý what-if") },
          { text: "Kết quả trình bày theo bước (Step 1, Step 2…), có bảng số liệu và kết luận. Kiểm tra từng bước tính trước khi dùng.", figure: fig("13-3", 7, "Kết quả scenario với bảng tổng giá trị theo chi nhánh và phần tăng 5%", "Kết quả từng bước") },
        ],
        verify: "Bạn đã kiểm tra dữ liệu đầu vào, giả định và phép tính ở từng bước.",
      },
    ],
    troubleshooting: [
      { symptom: "Gợi ý phân tích không bám câu hỏi ban đầu", cause: "Dữ liệu từ dashboard chỉ có các trường đã dùng trong biểu đồ", action: "Thêm dữ liệu (Find data) hoặc tự mô tả hướng phân tích ở ô Describe what you want to analyze next." },
      { symptom: "Không có nút Create scenario / Analyze in a Scenario", cause: "Chưa được cấp quyền", action: "Gửi yêu cầu cấp quyền theo quy trình NAB." },
    ],
    faqs: [
      ["Scenario khác hỏi đáp trên dashboard thế nào?", "Scenario phân tích nhiều bước trên bản chụp dữ liệu, trình bày phép tính từng bước; hỏi đáp dashboard trả lời nhanh một câu trên dữ liệu hiện tại."],
      ["Kết quả scenario có dùng để ra quyết định được không?", "Chỉ là bản nháp phân tích; người phụ trách phải kiểm tra giả định, dữ liệu và phép tính."],
    ],
    controls: ["Ghi rõ giả định khi chia sẻ kết quả scenario.", "Chỉ thêm dữ liệu được phép; Upload file là bản sao dữ liệu mới.", ...exportControls],
    sources: [DOCS.scenarios, DOCS.scenariosData],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "13.4",
    parentId: 13,
    limitedUser: true,
    slug: "chapter-13-4-tao-dataset.html",
    navTitle: "Tạo dataset từ tệp",
    title: "Tạo dataset từ tệp",
    summary: "Dataset là bộ dữ liệu đã chuẩn bị, dùng chung cho mọi báo cáo. Trang này giải thích dataset, SPICE và hướng dẫn tải tệp CSV/Excel, kiểm tra cột, nạp vào SPICE rồi tạo phân tích.",
    statusText: "Tạo dataset chỉ dành cho một số user được cấp quyền.",
    searchKeywords: ["dataset", "create dataset", "upload file", "csv", "excel", "spice", "data source", "nguồn dữ liệu", "update file", "làm mới", "refresh"],
    capture: { flow: "q13-5-tao-dataset", ...CAPTURED },
    objectives: ["Tạo dataset từ tệp được phép.", "Kiểm tra dữ liệu trước khi dùng."],
    prerequisites: ["Bạn được cấp quyền tạo dataset.", "Tệp đã được chủ sở hữu dữ liệu đồng ý; không tải dữ liệu thật ngoài phạm vi.", DEMO_NOTE],
    concepts: CONCEPTS_DATASET,
    walkthroughs: [
      {
        title: "Tải tệp và tạo dataset",
        intro: "Ví dụ tệp CSV dữ liệu giả lập hiệu quả kinh doanh chi nhánh.",
        steps: [
          { text: "Mở **Data** → tab **Datasets**, bấm **Create dataset**.", figure: fig("13-4", 1, "Nút Create dataset trên trang Data", "Create dataset") },
          { text: "Hộp thoại **Create dataset**: chọn nguồn dữ liệu có sẵn hoặc bấm **Upload file** để tải tệp từ máy tính.", figure: fig("13-4", 2, "Hộp thoại Create dataset với nút Upload file", "Upload file") },
          { text: "**Confirm file upload settings**: kiểm tra tên cột tiếng Việt hiển thị đúng, rồi bấm **Next** (hoặc **Edit settings and prepare data** để đổi kiểu dữ liệu, lọc cột).", figure: fig("13-4", 3, "Hộp thoại Confirm file upload settings với cột Ngày, Chi nhánh, Vùng", "Kiểm tra cột") },
          { text: "**Data source details**: dữ liệu nạp vào **SPICE**. Bấm **Visualize** để tạo phân tích (trang 13.5) hoặc **Edit/Preview data** để chỉnh trước.", figure: fig("13-4", 4, "Hộp thoại Data source details với Import to SPICE, Visualize", "Nạp vào SPICE") },
        ],
        verify: "Dataset mới có trong Data → Datasets, nhãn SPICE; tên cột và số dòng đúng với tệp nguồn.",
      },
    ],
    troubleshooting: [
      { symptom: "Publish báo Some datasets are being refreshed", cause: "Dữ liệu đang nạp vào SPICE", action: "Chờ nạp xong rồi thử lại." },
      { symptom: "Cột ngày bị nhận là chuỗi (String)", cause: "Định dạng ngày trong tệp", action: "Dùng Edit settings and prepare data để đổi kiểu dữ liệu." },
    ],
    faqs: [
      ["SPICE là gì?", "Bộ máy tính toán trong bộ nhớ của Quick. Dữ liệu nạp vào SPICE là bản sao để truy vấn nhanh, dung lượng dùng chung cả tài khoản; cần quản lý như dữ liệu gốc."],
      ["Có số liệu kỳ mới thì cập nhật thế nào?", "Dùng Update file với tệp có cùng các cột, cùng thứ tự như tệp cũ. Dataset từ tệp tải lên không tự làm mới."],
      ["Ai được xem dataset tôi tạo?", "Chỉ bạn, cho đến khi bạn chia sẻ dataset (quyền User hoặc Owner). Lưu ý: người xem dashboard dựng từ dataset vẫn xem được dữ liệu dùng trong dashboard đó."],
    ],
    controls: ["Ghi nguồn, kỳ dữ liệu và chủ sở hữu của tệp tải lên.", "Dọn dataset thử nghiệm khi không còn dùng.", ...exportControls],
    sources: [DOCS.dataSources, DOCS.prepareData, DOCS.spice, DOCS.refresh, DOCS.datasetSharing],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "13.5",
    parentId: 13,
    limitedUser: true,
    slug: "chapter-13-5-tao-analysis-dashboard.html",
    navTitle: "Tạo analysis và xuất bản dashboard",
    title: "Tạo analysis, xuất bản và chia sẻ dashboard",
    summary: "Analysis là nơi tác giả dựng biểu đồ; dashboard là bản chỉ-xem để chia sẻ. Dựng biểu đồ bằng AutoGraph, xuất bản dashboard với tuỳ chọn AI phù hợp và chia sẻ quyền Viewer.",
    statusText: "Tạo analysis và dashboard chỉ dành cho một số user được cấp quyền.",
    searchKeywords: ["analysis", "analyses", "dashboard", "publish", "autograph", "biểu đồ", "chia sẻ dashboard", "viewer"],
    capture: { flow: "q13-6-dung-bieu-do, q13-6-analysis-dashboard, q13-6-chia-se-dashboard", ...CAPTURED },
    objectives: ["Dựng biểu đồ từ dataset.", "Xuất bản dashboard với tuỳ chọn phù hợp.", "Chia sẻ dashboard đúng người, quyền Viewer."],
    prerequisites: ["Bạn được cấp quyền tạo analysis/dashboard.", "Định nghĩa chỉ số đã được nghiệp vụ duyệt.", DEMO_NOTE],
    concepts: CONCEPTS_ANALYSIS,
    walkthroughs: [
      {
        title: "Dựng biểu đồ",
        intro: "Sau khi bấm Visualize ở trang 13.4, analysis mới mở ra.",
        steps: [
          { text: "Màn hình analysis: khung **Data** (trường dữ liệu), khung **Visuals** (loại biểu đồ), bên phải là trang vẽ.", figure: fig("13-5", 1, "Màn hình analysis trống với khung Data và Visuals", "Màn hình analysis") },
          { text: "Bấm trường **Chi nhánh**.", figure: fig("13-5", 2, "Trường Chi nhánh được khoanh đỏ", "Chọn trường") },
          { text: "Bấm thêm **Tổng giá trị (VND)**: Quick tự chọn loại biểu đồ (AutoGraph).", figure: fig("13-5", 3, "Biểu đồ cột tổng giá trị theo chi nhánh", "AutoGraph") },
          { text: "Bấm **+ Add** (khung Visuals) để thêm biểu đồ khác.", figure: fig("13-5", 4, "Nút Add trong khung Visuals", "Thêm biểu đồ") },
          { text: "Chọn **Ngày** rồi **Tổng giá trị (VND)**: biểu đồ đường theo thời gian.", figure: fig("13-5", 5, "Biểu đồ đường tổng giá trị theo ngày", "Biểu đồ theo thời gian") },
        ],
        verify: "Tiêu đề biểu đồ, phép tổng hợp (Sum) và trục đúng với chỉ số cần trình bày.",
      },
      {
        title: "Xuất bản dashboard",
        intro: "Dashboard là bản chỉ-xem của analysis để chia sẻ.",
        steps: [
          { text: "Bấm **Publish** ở góc phải.", figure: fig("13-5", 6, "Nút Publish trên analysis", "Publish") },
          { text: "Hộp thoại **Publish dashboard**: **New dashboard** (hoặc **Replace existing dashboard** để cập nhật), đặt tên dashboard.", figure: fig("13-5", 7, "Ô Dashboard name trong hộp thoại Publish dashboard", "Đặt tên dashboard") },
          { text: "Tuỳ chọn: **Allow executive summary** (tóm tắt bằng AI), **Allow sharing stories/scenarios**, **Enable Quick actions**. Chỉ bật khi đơn vị cho phép.", figure: fig("13-5", 8, "Các tuỳ chọn Generative capabilities và Data snapshot", "Tuỳ chọn dashboard") },
          { text: "Bấm **Publish dashboard**.", figure: fig("13-5", 9, "Nút Publish dashboard", "Xuất bản") },
        ],
        verify: "Dashboard mở ra với đúng tên và các biểu đồ.",
      },
      {
        title: "Chia sẻ dashboard",
        intro: "Chia sẻ quyền Viewer cho người cần xem.",
        steps: [
          { text: "Dashboard đã xuất bản.", figure: fig("13-5", 10, "Dashboard đã xuất bản với hai biểu đồ", "Dashboard") },
          { text: "Bấm biểu tượng **Share** → **Share dashboard** (**Share this view** chỉ chia sẻ góc nhìn đang lọc).", figure: fig("13-5", 11, "Menu Share với Share dashboard và Share this view", "Share dashboard") },
          { text: "Trang **Share dashboard**: bên trái mời người dùng/nhóm, bên phải **Manage permissions**; có **Copy link**, **Copy embed code**.", figure: fig("13-5", 12, "Trang Share dashboard", "Trang chia sẻ") },
          { text: "Tìm người nhận (Enter), bấm **Add** và chọn **Viewer** (xem, xuất, in).", figure: fig("13-5", 13, "Danh sách mức quyền Viewer khi Add người nhận", "Chọn Viewer") },
          { text: "Người nhận có trong **Manage permissions** với quyền Viewer. Thu hồi bằng biểu tượng thùng rác cuối dòng.", figure: fig("13-5", 14, "Người nhận với quyền Viewer trong Manage permissions", "Đã chia sẻ") },
        ],
        verify: "Người nhận đúng, quyền Viewer; không bật Everyone in this account nếu chưa được duyệt.",
      },
    ],
    troubleshooting: [
      { symptom: "Publish báo Some datasets are being refreshed", cause: "SPICE chưa nạp xong", action: "Chờ rồi Publish lại." },
      { symptom: "Người nhận báo không thấy dashboard", cause: "Chưa Add đủ quyền hoặc tìm sai người", action: "Mở lại Share dashboard kiểm tra Manage permissions." },
    ],
    faqs: [
      ["Sửa analysis thì dashboard có tự đổi không?", "Không. Phải Publish lại và chọn Replace existing dashboard."],
      ["Chia sẻ dashboard có chia sẻ dataset không?", "Không cấp quyền User/Owner trên dataset (nút Share datasets là thao tác riêng). Nhưng người xem dashboard xem được dữ liệu dùng trong dashboard, và nếu bật hỏi đáp thì có thể hỏi trên mọi dòng, cột của dataset — chỉ chia sẻ cho người được phép xem dữ liệu đó."],
      ["Có bật Everyone in this account được không?", "Không, trừ khi đã được phê duyệt chia sẻ toàn bộ account."],
    ],
    controls: [
      "Chỉ chia sẻ nội bộ NAB, quyền Viewer mặc định; không dùng Copy embed code khi chưa được ATTT duyệt.",
      "Không bật tuỳ chọn AI hoặc Quick actions khi đơn vị chưa cho phép.",
      ...exportControls,
    ],
    sources: [DOCS.analysisWork, DOCS.analyses, DOCS.dashboards, DOCS.dashboardAccess, DOCS.dashboardQa],
  }),
];
