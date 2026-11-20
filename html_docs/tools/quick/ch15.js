"use strict";

/** Chương 15 — trang việc: Flows, Apps, Automations. */
const { DOCS, task, fig } = require("./common");

const CAPTURED = { capturedAt: "2026-11-19" };

const flowControls = [
  "Kết quả flow do AI tạo là bản nháp: đọc, kiểm tra, sửa trước khi dùng.",
  "Không đưa dữ liệu khách hàng thật hoặc dữ liệu chưa được phép vào đầu vào của flow.",
  "Flow có bước hành động ghi ra hệ thống khác phải được phê duyệt; khi chạy, người dùng xem và xác nhận form hành động. Lịch chạy không bật **Run with no confirmation**.",
];

// ---------------------------------------------------------------------------
// "Hiểu nhanh" — khái niệm, theo tài liệu AWS (đối chiếu 20/11/2026).
// ---------------------------------------------------------------------------

const CONCEPTS_RUN_FLOW = {
  intro: "Flow giúp làm lại một việc nhiều bước chỉ bằng một lần bấm, với kết quả theo cùng một khuôn.",
  chain: [
    { term: "Đầu vào", note: "Bạn nhập chữ hoặc tải tệp" },
    { term: "Các bước", note: "AI xử lý lần lượt theo thứ tự đã định" },
    { term: "Kết quả", note: "Văn bản, bảng, tệp tải về" },
  ],
  cards: [
    {
      term: "Flow là gì?",
      what: "Một **chuỗi bước được định nghĩa một lần và chạy lại bất cứ khi nào cần**. Mỗi bước làm một việc: tìm kiếm, tóm tắt, phân tích, soạn văn bản… và chuyển kết quả cho bước sau.",
      use: "Việc lặp lại có khuôn mẫu: tóm tắt văn bản, soạn nháp, phân tích nguyên nhân theo mẫu.",
      example: "Flow “5-Why Root Cause Analysis”: nhập một vấn đề, flow hỏi “Tại sao” 5 lần và lập kế hoạch hành động.",
    },
    {
      term: "Flow mẫu và flow được chia sẻ",
      what: "**Flow library** có flow mẫu (nhãn **Pre-built**) chạy được ngay, và các flow đồng nghiệp chia sẻ cho bạn. Với flow được chia sẻ quyền **Viewer**, bạn chạy được bản đã xuất bản (Published) nhưng không sửa.",
    },
    {
      term: "Lần chạy (run)",
      what: "Mỗi lần bấm **Start** là một lần chạy riêng, có lịch sử. **Start a new run** để chạy lại với đầu vào khác; kết quả cũ vẫn xem lại được.",
    },
    {
      term: "Đầu vào",
      what: "Bước nhập của người dùng: **chữ** hoặc **tệp** (mỗi bước nhận một tệp). Đầu vào càng rõ (phạm vi, ngôn ngữ, độ dài mong muốn), kết quả càng sát.",
    },
    {
      term: "Lịch chạy",
      what: "Nút **Create trigger** đặt flow chạy tự động hằng ngày, hằng tuần hoặc hằng tháng với đầu vào mặc định. Lịch chạy là riêng của bạn; lịch sử chạy giữ 30 ngày.",
      use: "Báo cáo định kỳ sau khi flow đã chạy thử ổn định.",
    },
  ],
  callout: { tone: "warning", text: "Khi đặt lịch cho flow có bước hành động (ghi vào ứng dụng khác), **không bật Run with no confirmation**: để tắt, mỗi hành động sẽ chờ bạn xem và xác nhận." },
};

const CONCEPTS_BUILD_FLOW = {
  intro: "Trước khi tạo flow, nên biết flow được ghép từ những loại bước nào và vòng đời của một flow.",
  cards: [
    {
      term: "Bước AI trả lời",
      what: "**Chat agent** (trợ lý trả lời một lượt), **Research** (chạy Quick Research), **Web search**, **General knowledge** (kiến thức chung của mô hình AI), **Create image** (tạo hình), **UI agent** (thao tác trang web công khai, bản thử nghiệm).",
    },
    {
      term: "Bước dữ liệu",
      what: "**Quick data** lấy từ Space, kho tri thức; **Dashboards and topics** lấy số liệu từ dashboard, topic bạn có quyền.",
    },
    {
      term: "Bước nhập của người dùng",
      what: "**Text** (ô nhập chữ) hoặc **Files** (tải một tệp mỗi bước).",
    },
    {
      term: "Bước hành động",
      what: "**Application actions** đọc hoặc **ghi** vào ứng dụng đã kết nối (ví dụ tạo phiếu, gửi tin). Khi chạy, hành động hiện form để người dùng xem và xác nhận.",
      use: "Chỉ dùng khi kết nối đã được NAB phê duyệt; kiểm thử với đích kiểm thử.",
    },
    {
      term: "Reasoning group",
      what: "Nhóm bước có logic: điều kiện, lặp, kiểm tra kết quả, thứ tự xử lý.",
      use: "Ví dụ: “nếu văn bản là thông tư thì tóm tắt theo mẫu A, ngược lại mẫu B”.",
    },
    {
      term: "Editor và Run mode",
      what: "**Editor**: dựng, sửa các bước. **Run mode**: chạy thử như người dùng, có khung chat bên phải.",
    },
    {
      term: "Phiên bản: Draft và Published",
      what: "**Draft** là bản đang sửa, tự lưu, người khác không thấy. **Publish** thay bản đang chạy cho **mọi người được chia sẻ** ngay lập tức. Nếu tổ chức bật duyệt chia sẻ, có thêm trạng thái **Pending Approval** (chờ duyệt).",
    },
    {
      term: "Quyền chia sẻ",
      what: "**Viewer**: chạy flow, chỉ thấy bản Published. **Co-owner**: sửa, chia sẻ, xoá, xuất bản; mỗi lúc chỉ một người sửa.",
    },
  ],
  tables: [
    {
      caption: "Giới hạn chính (theo tài liệu AWS)",
      headers: ["Mục", "Giới hạn"],
      rows: [
        ["Số bước trong một flow", "Tối đa 35"],
        ["Số flow mỗi người", "Tối đa 100"],
        ["Lịch chạy mỗi người", "Tối đa 20"],
        ["Một flow phải có", "Ít nhất một bước tạo kết quả hoặc một bước hành động"],
      ],
    },
  ],
  callout: { tone: "info", text: "Mô tả flow tốt gồm: tên, **đầu vào** (người dùng đưa gì vào), **các bước** theo thứ tự, **đầu ra** (định dạng, độ dài) và **ngôn ngữ** trả lời." },
};

const CONCEPTS_APPS = {
  intro: "App là ứng dụng web nhỏ do AI viết từ mô tả của bạn — có giao diện, nút bấm, nơi lưu dữ liệu.",
  cards: [
    {
      term: "App là gì?",
      what: "Ứng dụng web tương tác được tạo bằng cách **mô tả bằng lời**: AI viết mã và hiện bản xem trước; bạn chỉnh tiếp bằng chat.",
      use: "Công cụ nhỏ cho nhóm: checklist, form ghi nhận, bảng theo dõi yêu cầu.",
      example: "App “Checklist hồ sơ vay tiêu dùng”: nhập mã hồ sơ, tick các giấy tờ đã đủ.",
    },
    {
      term: "Dữ liệu của app",
      what: "App có kho lưu trữ riêng hoặc dùng chung trong app; có thể nhúng tối đa 8 biểu đồ Quick Sight, đọc dataset (vẫn áp dụng phân quyền dòng/cột) và Space.",
    },
    {
      term: "Chia sẻ app không chia sẻ dữ liệu",
      what: "Người dùng app phải **tự có quyền đọc** từng dataset app dùng. Khi app dùng AI để ghi dữ liệu, mọi thao tác ghi phải được người dùng xem và duyệt.",
    },
    {
      term: "Phiên bản và Publish",
      what: "Mỗi lần sửa tự tạo một phiên bản. **Publish** tạo link cho người dùng; sửa sau đó không ảnh hưởng người dùng cho tới khi Publish lại.",
    },
    {
      term: "Quyền",
      what: "**Co-owner** (sửa, chia sẻ) và **Viewer** (dùng app). Phạm vi chia sẻ: người cụ thể (**Limited**) hoặc cả tài khoản (**Account**).",
    },
  ],
  items: [
    "**Nên dùng App** khi nhóm cần một công cụ nhỏ có giao diện, dùng nội bộ, dữ liệu minh hoạ hoặc dữ liệu đã được phép.",
    "**Không dùng App** thay hệ thống nghiệp vụ chính thức, cho dữ liệu khách hàng chưa được phê duyệt, hoặc khi cần tích hợp với Flow (App chưa tích hợp trực tiếp với Flow, không xuất được mã nguồn).",
  ],
};

const CONCEPTS_AUTOMATE = {
  intro: "Automations (Quick Automate) dành cho quy trình lớn, chạy tập trung cho cả đơn vị — khác với Flow là công cụ năng suất cá nhân, nhóm.",
  cards: [
    {
      term: "Automation là gì?",
      what: "Quy trình tự động nhiều bước, nhiều hệ thống, tạo bằng mô tả hoặc tải tài liệu quy trình; có xử lý ngoại lệ, quản lý hồ sơ (case) và theo dõi vận hành.",
      example: "AWS nêu ví dụ: xử lý hồ sơ vay, xử lý hoá đơn, kiểm tra tuân thủ nhà cung cấp mới.",
    },
    {
      term: "Project và Group",
      what: "**Project** chứa toàn bộ vòng đời một automation: dựng, phiên bản, triển khai, theo dõi. **Automation group** quản lý quyền và kết nối dùng chung.",
    },
    {
      term: "Agent",
      what: "**UI agent** thao tác trên trang web như người (bấm, gõ, đọc dữ liệu). **Custom agent** dùng các kết nối hệ thống làm công cụ.",
    },
    {
      term: "Con người duyệt (Task Center)",
      what: "Người duyệt được chỉ định khi triển khai; các việc cần con người (chat, form) vào **Task Center** kèm mức độ ưu tiên và hạn xử lý.",
    },
    {
      term: "Triggers và theo dõi",
      what: "Chạy theo lịch hoặc khi có lời gọi API. Màn **Analytics** theo dõi tỷ lệ thành công, thời gian tiết kiệm, lỗi nghiệp vụ và lỗi hệ thống.",
    },
  ],
  tables: [
    {
      caption: "Chọn Flow hay Automation (theo hướng dẫn của AWS)",
      headers: ["", "Flow", "Automation"],
      rows: [
        ["Dành cho", "Năng suất cá nhân và nhóm, do từng người chạy", "Tự động hoá tập trung cho cả tổ chức, chạy độc lập với từng người"],
        ["Loại việc", "Ngắn: lập báo cáo, soạn nội dung, trả lời yêu cầu", "Dài, khối lượng lớn: hồ sơ vay, hoá đơn, kiểm tra tuân thủ"],
        ["Cách dựng", "Khối dựng sẵn, không cần lập trình", "Thêm logic điều khiển, quản lý hồ sơ, xử lý lỗi, mã tuỳ chỉnh"],
        ["Tại NAB", "Mọi user", "Một số user, có Khối CNTT, ATTT tham gia"],
      ],
    },
  ],
};

module.exports = [
  // -------------------------------------------------------------------------
  task({
    id: "15.1",
    parentId: 15,
    slug: "chapter-15-1-chay-flow-co-san.html",
    navTitle: "Chạy flow có sẵn",
    title: "Chạy flow có sẵn",
    summary: "Chọn flow mẫu (Pre-built) hoặc flow được chia sẻ, nhập đầu vào, bấm Start và đọc kết quả từng bước.",
    statusText: "Mọi user Amazon Quick tại NAB được chạy flow.",
    searchKeywords: ["flow", "flows", "chạy flow", "pre-built", "flow library", "5-why", "start"],
    capture: { flow: "q15-1-chay-flow", ...CAPTURED },
    objectives: ["Chạy flow mẫu với đầu vào của mình.", "Đọc, kiểm tra và tải kết quả."],
    prerequisites: ["Flow mẫu (Pre-built) hoặc flow được chia sẻ cho bạn.", "Đầu vào chỉ chứa dữ liệu được phép (ví dụ dùng tình huống minh hoạ)."],
    concepts: CONCEPTS_RUN_FLOW,
    walkthroughs: [
      {
        title: "Chạy flow 5-Why Root Cause Analysis",
        intro: "Flow mẫu phân tích nguyên nhân gốc bằng 5 câu hỏi Tại sao và lập lộ trình hành động.",
        steps: [
          { text: "Mở **Flows** → **Flow library**: flow có nhãn **Pre-built** là flow mẫu. Bấm vào flow cần chạy.", figure: fig("15-1", 1, "Flow library với flow 5-Why Root Cause Analysis", "Chọn flow mẫu") },
          { text: "Trang flow: các bước bên trái, ô nhập đầu vào, nút **Start**; phía trên có **New run**, **Create trigger** (chạy theo lịch), lịch sử chạy; khung chat bên phải.", figure: fig("15-1", 2, "Trang flow với ô đầu vào và nút Start", "Trang flow") },
          { text: "Nhập vấn đề cần phân tích (tình huống minh hoạ, không dữ liệu khách hàng thật).", figure: fig("15-1", 3, "Ô đầu vào đã nhập vấn đề thời gian xử lý hồ sơ vay", "Nhập đầu vào") },
          { text: "Bấm **Start**. Flow chạy lần lượt từng bước.", figure: fig("15-1", 4, "Nút Start được khoanh đỏ", "Start") },
          { text: "Khi xong, mỗi bước có dấu ✓ (Root Cause Analysis, Implementation Roadmap); khung bên phải tóm tắt. **Download** để tải kết quả, **Start a new run** để chạy lại.", figure: fig("15-1", 5, "Kết quả flow với phân tích 5-Why và kế hoạch hành động", "Kết quả flow") },
        ],
        verify: "Các bước đều có dấu ✓ và bạn đã đọc, kiểm tra nội dung trước khi dùng.",
      },
    ],
    troubleshooting: [
      { symptom: "Flow chạy lâu", cause: "Nhiều bước AI nối tiếp", action: "Chờ đến khi có nút Start a new run; có thể xem tiến độ ở danh sách bước bên trái." },
      { symptom: "Kết quả bằng tiếng Anh", cause: "Flow mẫu cấu hình tiếng Anh", action: "Ghi rõ “trả lời bằng tiếng Việt” trong đầu vào." },
    ],
    faqs: [
      ["Flow mẫu có sửa được không?", "Flow mẫu dùng để chạy ngay; muốn đổi các bước hãy tạo flow mới (15.2)."],
      ["Create trigger dùng khi nào?", "Khi cần chạy theo lịch (hằng ngày, tuần, tháng). Chỉ tạo sau khi flow đã kiểm thử và được phép chạy tự động; không bật Run with no confirmation cho flow có bước hành động."],
    ],
    controls: flowControls,
    sources: [DOCS.flows, DOCS.flowTerms, DOCS.schedules],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "15.2",
    parentId: 15,
    slug: "chapter-15-2-tao-flow.html",
    navTitle: "Tạo flow",
    title: "Tạo, chạy thử và chia sẻ flow",
    summary: "Mô tả flow bằng lời, để Quick dựng các bước, kiểm tra ở chế độ Editor, Publish, chạy thử ở Run mode rồi chia sẻ quyền Viewer.",
    statusText: "Mọi user Amazon Quick tại NAB được tạo flow.",
    searchKeywords: ["tạo flow", "create flow", "generate", "editor", "run mode", "publish", "chia sẻ flow", "share flow"],
    capture: { flow: "q15-2-tao-flow, q15-2-publish-shots, q15-2-run-shots", ...CAPTURED },
    objectives: ["Tạo flow cho việc lặp lại của mình.", "Chạy thử trước khi chia sẻ.", "Chia sẻ đúng người."],
    prerequisites: ["Việc cần tự động hoá có đầu vào, các bước và đầu ra rõ ràng.", "Có tệp/đầu vào minh hoạ để chạy thử."],
    concepts: CONCEPTS_BUILD_FLOW,
    walkthroughs: [
      {
        title: "Tạo flow bằng mô tả",
        intro: "Ví dụ: flow “Tóm tắt văn bản luật và liệt kê điểm cần lưu ý”.",
        steps: [
          { text: "Mở **Flows**, bấm **Create flow**.", figure: fig("15-2", 1, "Nút Create flow trên trang Flows", "Create flow") },
          { text: "Mô tả flow: tên, đầu vào, các bước, đầu ra, ngôn ngữ. Có thể chọn mẫu gợi ý hoặc **Create a blank flow** để tự dựng.", figure: fig("15-2", 2, "Ô mô tả flow đã nhập yêu cầu tiếng Việt", "Mô tả flow") },
          { text: "Bấm **Generate**: Quick phân tích mô tả và dựng các bước (mất khoảng 1–2 phút).", figure: fig("15-2", 3, "Nút Generate", "Generate") },
          { text: "Chế độ **Editor**: các bước Quick dựng (tải tệp → tóm tắt → điểm cần lưu ý); bấm vào một bước để sửa ở khung bên trái, **Add step** để thêm bước. Flow ở trạng thái **Draft**, tự lưu.", figure: fig("15-2", 4, "Editor với ba bước của flow và Add step", "Kiểm tra các bước") },
          { text: "Kiểm tra xong, bấm **Publish**.", figure: fig("15-2", 5, "Nút Publish", "Publish") },
          { text: "Hộp thoại **Publish Changes**: thay đổi có hiệu lực ngay với người được chia sẻ. Bấm **Publish**.", figure: fig("15-2", 6, "Hộp thoại Publish Changes", "Xác nhận Publish") },
        ],
        verify: "Flow có nhãn Published.",
      },
      {
        title: "Chạy thử và chia sẻ",
        intro: "Chạy thử với tài liệu minh hoạ trước khi chia sẻ.",
        steps: [
          { text: "Chuyển sang **Run mode** (sau khi Publish, flow có nhãn **Published**): bước đầu chờ bạn tải tệp.", figure: fig("15-2", 7, "Nút Run mode", "Run mode") },
          { text: "Ở bước tải tệp, bấm **browse for files** chọn văn bản (Word .docx hoặc PDF).", figure: fig("15-2", 8, "Ô tải tệp của bước đầu", "Tải tệp") },
          { text: "Bấm **Start**.", figure: fig("15-2", 9, "Nút Start sau khi tải tệp", "Start") },
          { text: "Đọc kết quả từng bước (ví dụ: tóm tắt Pháp lệnh Ngoại hối và các điểm cần lưu ý kèm số điều, khoản); đối chiếu với văn bản gốc. **Download** để tải, **Start a new run** để chạy lại.", figure: fig("15-2", 10, "Kết quả chạy thử flow với tóm tắt và điểm cần lưu ý", "Kết quả chạy thử") },
          { text: "Bấm **Share**: hộp thoại **Share your flow** — ô tìm người nhận, mức quyền **Viewer** (chạy flow), **Shared with**, **Share with all** (mọi người trong account), **Copy link**.", figure: fig("15-2", 11, "Hộp thoại Share your flow", "Share") },
          { text: "Gõ tên hoặc username người nhận rồi chọn trong gợi ý, bấm **Share**. Nếu ô báo **No options** (không tìm thấy người nhận), liên hệ Khối CNTT; không chia sẻ cho người khác thay thế.", figure: fig("15-2", 12, "Ô tìm người nhận trong hộp thoại Share của flow báo No options", "Tìm người nhận") },
        ],
        verify: "Kết quả chạy thử đúng; người nhận đúng, quyền Viewer; không bật Share with all nếu chưa được duyệt.",
      },
    ],
    troubleshooting: [
      { symptom: "Bước tải tệp không nhận tệp .doc", cause: "Định dạng cũ", action: "Dùng .docx hoặc PDF." },
      { symptom: "Ô tìm người nhận báo No options", cause: "Chưa xác định (có thể do quyền của tài khoản người nhận)", action: "Liên hệ Khối CNTT kiểm tra quyền; không chia sẻ thay cho người khác." },
      { symptom: "Người nhận chạy được flow nhưng kết quả khác", cause: "Đầu vào khác hoặc flow đã sửa sau khi chia sẻ", action: "Publish lại sau mỗi lần sửa và ghi chú thay đổi." },
    ],
    faqs: [
      ["Sửa flow xong người được chia sẻ có thấy ngay không?", "Có, sau khi bạn Publish thay đổi."],
      ["Viewer làm được gì?", "Chạy flow, chỉ thấy bản đã Publish; không sửa các bước. Người cần sửa cùng phải được cấp Co-owner."],
      ["Share with all có nên bật không?", "Không, trừ khi flow đã được duyệt dùng chung toàn account."],
    ],
    controls: [...flowControls, "Chia sẻ đúng người, quyền Viewer; ghi lại ai được chia sẻ và vì sao."],
    sources: [DOCS.flows, DOCS.flowTerms, DOCS.flowVersions, DOCS.flowSharing, DOCS.schedules],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "15.3",
    parentId: 15,
    limitedUser: true,
    slug: "chapter-15-3-tao-app.html",
    navTitle: "Tạo app",
    title: "Tạo app từ mô tả",
    summary: "App là ứng dụng web nhỏ do AI viết từ mô tả của bạn. Mô tả ý tưởng, xem trước và chỉnh bằng chat, rồi Publish/Share. App là bản mẫu, không mặc nhiên là hệ thống chính thức.",
    statusText: "Apps chỉ dành cho một số user được cấp quyền.",
    searchKeywords: ["apps", "app", "tạo app", "ứng dụng"],
    capture: { flow: "q15-3-tao-app, q15-3-app-ket-qua", ...CAPTURED },
    objectives: ["Tạo bản mẫu app từ mô tả.", "Biết giới hạn khi dùng và chia sẻ app."],
    prerequisites: ["Bạn được cấp quyền Apps.", "Chỉ dùng dữ liệu minh hoạ khi thử."],
    concepts: CONCEPTS_APPS,
    walkthroughs: [
      {
        title: "Tạo app",
        intro: "Ví dụ: checklist hồ sơ vay tiêu dùng (dữ liệu minh hoạ).",
        steps: [
          { text: "Mở **Apps**: mô tả ý tưởng hoặc chọn ví dụ; các tab **Recent**, **Library**, **My apps**.", figure: fig("15-3", 1, "Trang Apps với ô mô tả và ví dụ", "Trang Apps") },
          { text: "Mô tả app: mục đích, dữ liệu nhập, kết quả hiển thị, ngôn ngữ giao diện; bấm gửi. Quick dựng app trong vài phút — giữ trang mở đến khi xong.", figure: fig("15-3", 2, "Ô mô tả app đã nhập yêu cầu tiếng Việt, nút gửi", "Mô tả app") },
          { text: "App đã tạo nằm trong **Recent / My apps** kèm ảnh xem trước; nhãn **Private** = chưa chia sẻ. Bấm vào app để mở.", figure: fig("15-3", 3, "Thẻ app Checklist Hồ Sơ Vay Tiêu Dùng trong danh sách", "App trong danh sách") },
          { text: "Bản xem trước bên trái; khung chat **Ask Apps to make changes** bên phải để yêu cầu chỉnh sửa; **Version**, **Publish**, **Share** ở phía trên.", figure: fig("15-3", 4, "App checklist hồ sơ vay với ô mã hồ sơ và nút Tra cứu", "App vừa tạo") },
        ],
        verify: "App hoạt động đúng với dữ liệu minh hoạ.",
      },
    ],
    troubleshooting: [
      { symptom: "Không thấy mục Apps hoặc không tạo được", cause: "Chưa được cấp quyền", action: "Gửi yêu cầu theo quy trình NAB." },
      { symptom: "App trống (Untitled App, No preview available)", cause: "Rời trang khi app đang dựng", action: "Mở lại app và yêu cầu dựng lại trong khung chat, hoặc tạo lại và giữ trang mở đến khi xong." },
    ],
    faqs: [
      ["App có thay thế hệ thống chính thức không?", "Không. App là bản mẫu cho nhóm; quy trình chính thức cần Khối CNTT."],
      ["Chia sẻ app thì người dùng có xem được dữ liệu không?", "Không tự động. Chia sẻ app không chia sẻ dữ liệu; mỗi người dùng phải có quyền đọc các dataset app dùng."],
      ["Có nhập dữ liệu khách hàng vào app được không?", "Không, trừ khi app đã được phê duyệt cho loại dữ liệu đó."],
    ],
    controls: ["Apps là bản mẫu ứng dụng, không mặc nhiên là hệ thống chính thức.", "Chỉ chia sẻ app cho nhóm cần dùng, quyền tối thiểu."],
    sources: [DOCS.apps, DOCS.appsData, DOCS.security],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "15.4",
    parentId: 15,
    limitedUser: true,
    slug: "chapter-15-4-automations.html",
    navTitle: "Automations",
    title: "Automations",
    summary: "Automations tự động hoá quy trình nhiều bước, nhiều hệ thống, có AI agent thao tác ứng dụng và theo dõi vận hành. Chỉ dùng khi được Khối CNTT, ATTT phê duyệt.",
    statusText: "Automations chỉ dành cho một số user được cấp quyền, có Khối CNTT tham gia.",
    searchKeywords: ["automations", "automation", "tự động hoá", "automate", "start building"],
    capture: { flow: "q15-4-automations (chỉ tổng quan)", ...CAPTURED },
    objectives: ["Biết Automations làm gì và khác Flow thế nào.", "Biết điều kiện trước khi xây automation."],
    prerequisites: ["Bạn được cấp quyền Automations.", "Quy trình có người chịu trách nhiệm, đánh giá rủi ro, dữ liệu kiểm thử và phê duyệt của Khối CNTT, ATTT."],
    concepts: CONCEPTS_AUTOMATE,
    walkthroughs: [
      {
        title: "Tổng quan Automations",
        intro: "Tài liệu này chỉ giới thiệu; không hướng dẫn tạo và triển khai automation.",
        steps: [
          { text: "Mở **More → Automations**: tạo automation bằng AI (mô tả hoặc tải tài liệu quy trình), AI agent thao tác ứng dụng, triển khai và theo dõi tập trung.", figure: fig("15-4", 1, "Trang Automations với giới thiệu tính năng", "Trang Automations") },
          { text: "Danh sách **Projects / Groups**, **Triggers**, **Analytics** và nút **Start building** — chỉ dùng khi đã được phê duyệt.", figure: fig("15-4", 2, "Nút Start building và danh sách Projects", "Bắt đầu xây automation") },
        ],
        verify: "Bạn đã có phê duyệt trước khi bấm Start building.",
      },
    ],
    troubleshooting: [{ symptom: "Không thấy Automations trong More", cause: "Chưa được cấp quyền", action: "Liên hệ Khối CNTT." }],
    faqs: [
      ["Automation khác Flow thế nào?", "Theo AWS: Flow cho năng suất cá nhân, nhóm, việc ngắn (báo cáo, soạn nội dung); Automation cho quy trình tập trung, dài, khối lượng lớn (ví dụ hồ sơ vay, hoá đơn), chạy độc lập với từng người. Tại NAB, Automation cần Khối CNTT tham gia."],
      ["Tôi có tự triển khai automation được không?", "Không, khi chưa có phê duyệt và UAT với người chịu trách nhiệm quy trình."],
    ],
    controls: [
      "Mọi hành động ghi cần bước xác nhận của con người; kiểm thử với dữ liệu, đích kiểm thử.",
      "Tách thông tin đăng nhập kiểm thử và chính thức; tài khoản dịch vụ quyền tối thiểu.",
      "Khi lỗi: dừng lịch chạy, cô lập tác động, khôi phục theo hướng dẫn vận hành.",
    ],
    sources: [DOCS.automate, DOCS.automateVsFlows, DOCS.automateHitl, DOCS.security],
  }),
];
