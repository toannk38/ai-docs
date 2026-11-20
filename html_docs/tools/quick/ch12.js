"use strict";

/** Chương 12 — trang việc: Space, chat agent và chia sẻ (trọng tâm tra cứu). */
const { DOCS, task, fig } = require("./common");

const CAPTURED = { capturedAt: "2026-11-19" };

const shareControls = [
  "Chỉ chia sẻ với người thực sự cần cho công việc — không chia sẻ công khai, không chia sẻ ra ngoài NAB, không chia sẻ \"phòng khi cần\".",
  "Mặc định cấp **Can view**; chỉ cấp **Can manage** cho người cùng quản lý nội dung.",
  "Rà soát danh sách Shared with định kỳ (ít nhất mỗi quý) và thu hồi quyền của người không còn tham gia công việc.",
  "Ghi lại ai được cấp quyền, khi nào và vì sao để phục vụ kiểm tra.",
  "Không dùng **Copy link** hoặc **Copy embed code** để đưa nội dung ra kênh không được phép.",
];

const dataControls = [
  "Chỉ thêm tài liệu đã được phân loại và chủ sở hữu dữ liệu phê duyệt; dọn tài liệu hết hiệu lực.",
  "Space không bỏ qua phân quyền dữ liệu (RLS/CLS) của dataset, dashboard gốc.",
];

module.exports = [
  // -------------------------------------------------------------------------
  task({
    id: "12.1",
    parentId: 12,
    slug: "chapter-12-1-hoi-dap-tai-lieu-trong-space.html",
    navTitle: "Hỏi đáp tài liệu trong Space",
    title: "Hỏi đáp tài liệu trong Space",
    summary: "Mở Space và hỏi ngay trong khung chat của Space, hoặc chọn Space làm phạm vi dữ liệu ở ô chat chính. Câu trả lời trích dẫn đúng tài liệu trong Space.",
    statusText: "Hỏi đáp trong Space dùng được cho mọi user có quyền xem Space.",
    searchKeywords: ["space", "hỏi đáp", "tra cứu", "tài liệu", "sources", "trích dẫn", "specific data"],
    capture: { flow: "q12-1-hoi-dap-space", ...CAPTURED },
    objectives: ["Tra cứu nhanh nội dung trong bộ tài liệu của Space.", "Kiểm tra nguồn trích dẫn trước khi dùng câu trả lời."],
    prerequisites: ["Bạn là chủ Space hoặc được chia sẻ Space (Can view hoặc Can manage).", "Tài liệu trong Space đã ở trạng thái **Ready** hoặc **Text Ready**."],
    walkthroughs: [
      {
        title: "Hỏi trong khung chat của Space",
        intro: "Ví dụ: Space chứa các văn bản pháp luật công khai về ngân hàng.",
        steps: [
          { text: "Mở **Spaces** và chọn Space cần tra cứu. Bên trái là danh sách tài liệu, bên phải là khung chat của Space.", figure: fig("12-1", 1, "Trang Space với danh sách tài liệu và khung chat bên phải", "Khung chat của Space") },
          { text: "Nhập câu hỏi về nội dung tài liệu; nêu rõ văn bản hoặc chủ đề cần tra.", figure: fig("12-1", 2, "Khung chat của Space đã nhập câu hỏi về Luật Các tổ chức tín dụng", "Nhập câu hỏi") },
          { text: "Bấm gửi và chờ Quick trả lời.", figure: fig("12-1", 3, "Nút gửi câu hỏi được khoanh đỏ", "Gửi câu hỏi") },
          { text: "Câu trả lời dựa trên tài liệu trong Space, có chip trích dẫn tới đúng văn bản.", figure: fig("12-1", 4, "Câu trả lời có trích dẫn văn bản luật và nút Sources", "Câu trả lời có trích dẫn") },
          { text: "Bấm **Sources** để xem tài liệu nguồn; mở và đối chiếu điều luật trước khi dùng.", figure: fig("12-1", 5, "Panel Sources liệt kê văn bản nguồn", "Kiểm tra tài liệu nguồn") },
        ],
        verify: "Câu trả lời trích dẫn đúng văn bản trong Space và bạn đã đối chiếu điều luật được dẫn.",
      },
      {
        title: "Cách khác: chọn Space từ ô chat ở trang chủ",
        intro: "Dùng khi muốn hỏi từ trang chủ nhưng chỉ dựa trên tài liệu của một Space.",
        steps: [
          { text: "Ở ô chat trang chủ, bấm **All data** → **Specific data** rồi chọn Space (hoặc chọn Space trong **Recently viewed**).", figure: fig("12-1", 6, "Menu phạm vi dữ liệu với Specific data và Space trong Recently viewed", "Chọn Space làm phạm vi dữ liệu") },
        ],
        verify: "Phạm vi dữ liệu hiển thị tên Space đã chọn trước khi gửi câu hỏi.",
      },
    ],
    troubleshooting: [
      { symptom: "Quick trả lời ngoài nội dung tài liệu", cause: "Đang hỏi ở ô chat chính với phạm vi All data hoặc có Web search", action: "Hỏi trong khung chat của Space, hoặc chọn **Specific data** → Space; tắt Web search nếu không cần." },
      { symptom: "Quick báo không tìm thấy thông tin", cause: "Tài liệu chưa xử lý xong, hoặc bạn chưa có quyền với Space", action: "Kiểm tra trạng thái **Ready**; nếu không thấy Space, đề nghị chủ Space chia sẻ." },
    ],
    faqs: [
      ["Vì sao Quick trả lời ngoài tài liệu của Space?", "Bạn có thể đang hỏi với phạm vi All data hoặc Web search đang bật. Hỏi trong khung chat của Space hoặc chọn Specific data để giới hạn nguồn."],
      ["Cuộc trò chuyện trong Space được lưu ở đâu?", "Trong lịch sử hội thoại (Recents) của tài khoản bạn. Khi kiểm tra trên tài khoản người được chia sẻ Space, mục Recents của họ chỉ có cuộc trò chuyện của chính họ. Vẫn không đưa dữ liệu không được phép vào câu hỏi."],
      ["Trích dẫn đúng văn bản rồi thì dùng ngay được không?", "Chưa. Mở văn bản nguồn và đối chiếu điều, khoản được dẫn trước khi dùng cho công việc."],
    ],
    controls: [
      ...dataControls,
      "Câu trả lời là bản nháp: mở nguồn, đối chiếu và chịu trách nhiệm nội dung trước khi dùng.",
    ],
    sources: [DOCS.spaces],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "12.2",
    parentId: 12,
    slug: "chapter-12-2-tao-space-tai-tai-lieu.html",
    navTitle: "Tạo Space và tải tài liệu",
    title: "Tạo Space và tải tài liệu lên",
    summary: "Tạo Space cho một bộ tài liệu dùng chung, tải tệp lên và chờ Quick xử lý xong trước khi hỏi đáp.",
    statusText: "Mọi user Amazon Quick tại NAB được tạo Space.",
    searchKeywords: ["tạo space", "create space", "upload", "tải lên", "tài liệu", "ready", "add knowledge"],
    capture: { flow: "q12-2-tao-space", ...CAPTURED },
    objectives: ["Tạo Space có tên và mô tả rõ mục đích.", "Tải tài liệu lên và biết khi nào tài liệu sẵn sàng để hỏi đáp."],
    prerequisites: [
      "Tài liệu đưa vào Space đã được phân loại và chủ sở hữu dữ liệu đồng ý.",
      "Đặt tên Space thể hiện mục đích và phạm vi, tránh trùng với Space có sẵn.",
    ],
    walkthroughs: [
      {
        title: "Tạo Space",
        intro: "Ví dụ: Space chứa văn bản pháp luật công khai về ngân hàng.",
        steps: [
          { text: "Mở **Spaces**, bấm **Create space**.", figure: fig("12-2", 1, "Trang Spaces với nút Create space được khoanh đỏ", "Create space") },
          { text: "Hộp thoại **Create your space**: nhập tên Space (What are you working on?).", figure: fig("12-2", 2, "Hộp thoại Create your space với ô tên Space", "Đặt tên Space") },
          { text: "Nhập mô tả mục tiêu (What are you trying to achieve?) — giúp Quick trả lời đúng ngữ cảnh — rồi bấm **Create**.", figure: fig("12-2", 3, "Ô mô tả Space đã nhập mục tiêu tra cứu văn bản pháp luật", "Mô tả mục tiêu") },
        ],
        verify: "Trang Space mới mở ra với tên và mô tả bạn vừa nhập.",
      },
      {
        title: "Tải tài liệu lên Space",
        intro: "Có thể tải nhiều tệp cùng lúc; định dạng Word (.doc, .docx), PDF… được hỗ trợ.",
        steps: [
          { text: "Trong Space, bấm **Add**: **Create folder**, **Add knowledge**, **Upload files**, **Upload folder**.", figure: fig("12-2", 4, "Menu Add trong Space", "Menu Add") },
          { text: "Chọn **Upload files** rồi chọn các tệp từ máy tính (cửa sổ chọn tệp của Windows hiện ra).", figure: fig("12-2", 5, "Mục Upload files được khoanh đỏ", "Upload files") },
          { text: "Tài liệu đang được xử lý: chờ đến khi cột **Status** chuyển sang **Ready** (hoặc **Text Ready**).", figure: fig("12-2", 6, "Danh sách tài liệu đang xử lý", "Đang xử lý") },
          { text: "Tất cả tài liệu ở trạng thái **Ready**: Space sẵn sàng để hỏi đáp (trang 12.1).", figure: fig("12-2", 7, "Danh sách tài liệu ở trạng thái Ready", "Tài liệu sẵn sàng") },
        ],
        verify: "Mọi tài liệu trong Space ở trạng thái Ready hoặc Text Ready.",
      },
    ],
    troubleshooting: [
      { symptom: "Tài liệu ở trạng thái xử lý lâu", cause: "Tệp lớn hoặc nhiều tệp cùng lúc", action: "Chờ thêm; tải lại tệp nếu báo lỗi." },
      { symptom: "Không tải được tệp", cause: "Định dạng hoặc dung lượng không được hỗ trợ", action: "Xem thông báo trên màn hình; chuyển sang định dạng phổ biến (PDF, Word)." },
    ],
    faqs: [
      ["Ai được tạo Space?", "Mọi user Amazon Quick tại NAB. Nếu không thấy nút Create space, gửi yêu cầu hỗ trợ tới Khối CNTT."],
      ["Tài liệu nào được đưa vào Space?", "Chỉ tài liệu đã được phân loại và chủ sở hữu dữ liệu đồng ý cho mục đích của Space. Không đưa dữ liệu khách hàng hoặc dữ liệu mật nếu chưa được phép."],
      ["Cập nhật tài liệu mới thì làm sao?", "Tải phiên bản mới lên và xoá phiên bản hết hiệu lực trong Space để tránh Quick trả lời theo văn bản cũ."],
    ],
    controls: [...dataControls, "Đặt tên, mô tả Space rõ ràng; ghi nguồn và phiên bản tài liệu."],
    sources: [DOCS.spaces],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "12.3",
    parentId: 12,
    slug: "chapter-12-3-chia-se-space.html",
    navTitle: "Chia sẻ Space",
    title: "Chia sẻ Space đúng người, đúng quyền",
    summary: "Chia sẻ Space cho đồng nghiệp với mức quyền **Can view** hoặc **Can manage**, kiểm tra danh sách người được chia sẻ và thu hồi khi không còn cần.",
    statusText: "Chia sẻ Space dùng được cho chủ Space và người có quyền Can manage.",
    searchKeywords: ["chia sẻ", "share", "space", "quyền", "can view", "can manage", "thu hồi"],
    capture: { flow: "q12-3-chia-se-space", ...CAPTURED },
    objectives: ["Chia sẻ Space cho đúng người với quyền tối thiểu.", "Kiểm tra và thu hồi quyền khi cần."],
    prerequisites: ["Bạn là chủ Space hoặc có quyền **Can manage**.", "Người nhận là user hoặc nhóm nội bộ NAB có nhu cầu công việc."],
    tables: [
      {
        caption: "Mức quyền khi chia sẻ Space",
        headers: ["Mức quyền", "Người nhận làm được", "Khi nào cấp"],
        rows: [
          ["Can view", "Xem tài liệu, hỏi đáp trong Space", "Mặc định cho người dùng tài liệu"],
          ["Can manage", "Thêm/xoá tài liệu, sửa Space, chia sẻ tiếp", "Chỉ người cùng quản lý Space"],
        ],
      },
    ],
    walkthroughs: [
      {
        title: "Chia sẻ Space",
        intro: "Người nhận chỉ thấy Space sau khi bạn bấm Share.",
        steps: [
          { text: "Mở Space, bấm **Share** ở góc phải.", figure: fig("12-3", 1, "Nút Share trong trang Space được khoanh đỏ", "Share") },
          { text: "Hộp thoại **Share space**: ô tìm người nhận, mức quyền, danh sách **Shared with**, **Copy link**.", figure: fig("12-3", 2, "Hộp thoại Share space", "Hộp thoại chia sẻ") },
          { text: "Gõ username, email hoặc tên nhóm của người nhận.", figure: fig("12-3", 3, "Ô tìm người nhận đã nhập toannk2_reader", "Tìm người nhận") },
          { text: "Chọn đúng người nhận trong danh sách gợi ý (kiểm tra cả email); giữ mức quyền **Can view** trừ khi người nhận cần quản lý Space.", figure: fig("12-3", 4, "Danh sách gợi ý người nhận", "Chọn người nhận") },
          { text: "Bấm **Share**. Quick báo đã cấp quyền.", figure: fig("12-3", 5, "Nút Share trong hộp thoại được khoanh đỏ", "Bấm Share") },
          { text: "Mở lại **Share** để kiểm tra người nhận đã có trong **Shared with** với đúng mức quyền. Muốn thu hồi: đổi mức quyền hoặc xoá người nhận ngay tại đây.", figure: fig("12-3", 6, "Danh sách Shared with có người nhận với quyền Can view", "Kiểm tra người được chia sẻ") },
        ],
        verify: "Người nhận có trong Shared with với quyền Can view (hoặc Can manage nếu đã được duyệt).",
      },
    ],
    troubleshooting: [
      { symptom: "Không tìm thấy người nhận", cause: "Gõ sai tên/email hoặc người nhận chưa có tài khoản Amazon Quick", action: "Kiểm tra lại; nếu người nhận chưa có quyền Quick, đề nghị họ xin cấp quyền." },
      { symptom: "Người nhận báo không thấy Space", cause: "Họ đang xem bộ lọc mặc định", action: "Hướng dẫn mở Spaces → **Shared with me**." },
    ],
    faqs: [
      ["Can view và Can manage khác nhau thế nào?", "Can view: xem tài liệu và hỏi đáp. Can manage: thêm/xoá tài liệu, sửa và chia sẻ tiếp Space — chỉ cấp cho người cùng quản lý."],
      ["Người nhận tìm Space ở đâu?", "Spaces → bộ lọc Shared with me."],
      ["Có chia sẻ ra ngoài NAB được không?", "Không. Chỉ chia sẻ cho user, nhóm nội bộ NAB theo nhu cầu công việc."],
      ["Copy link có cấp quyền cho người nhận link không?", "Không nên coi link là cách cấp quyền. Chỉ gửi link cho người đã có trong Shared with, qua kênh nội bộ được phép."],
    ],
    controls: shareControls,
    sources: [DOCS.spacesSharing, DOCS.spaces],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "12.4",
    parentId: 12,
    slug: "chapter-12-4-dung-chat-agent.html",
    navTitle: "Dùng chat agent",
    title: "Dùng chat agent",
    summary: "Chọn chat agent ở ô chat (nút **Quick ▾**) hoặc từ trang **Chat agents** để hỏi theo vai trò và nguồn kiến thức đã cấu hình sẵn.",
    statusText: "Dùng chat agent được cho mọi user có quyền với agent.",
    searchKeywords: ["agent", "chat agent", "trợ lý", "chọn agent"],
    capture: { flow: "q12-4-dung-agent", ...CAPTURED },
    objectives: ["Chọn đúng agent cho việc cần làm.", "Hỏi agent và kiểm tra nguồn câu trả lời."],
    prerequisites: ["Agent do bạn tạo hoặc được chia sẻ cho bạn.", "Để agent trả lời từ tài liệu trong Space, bạn cũng cần quyền xem Space đó (xem trang 12.7)."],
    walkthroughs: [
      {
        title: "Chọn agent ở ô chat",
        intro: "Agent mặc định là Quick.",
        steps: [
          { text: "Ở ô chat, bấm **Quick ▾** để mở danh sách agent.", figure: fig("12-4", 1, "Danh sách agent mở từ nút Quick ở ô chat", "Mở danh sách agent") },
          { text: "Chọn agent cần dùng.", figure: fig("12-4", 2, "Agent tra cứu quy định được khoanh đỏ trong danh sách", "Chọn agent") },
          { text: "Đặt câu hỏi và gửi.", figure: fig("12-4", 3, "Ô chat đã nhập câu hỏi cho agent", "Hỏi agent") },
          { text: "Agent trả lời theo vai trò đã cấu hình, có trích dẫn tài liệu; bấm **Sources** để kiểm tra.", figure: fig("12-4", 4, "Câu trả lời của agent có trích dẫn và nút Sources", "Câu trả lời của agent") },
        ],
        verify: "Câu trả lời đến từ agent đã chọn (tên agent hiện trên câu trả lời) và có nguồn kiểm chứng được.",
      },
      {
        title: "Cách khác: từ trang Chat agents",
        intro: "Trang Chat agents liệt kê agent bạn tạo hoặc được chia sẻ.",
        steps: [
          { text: "Mở **Chat agents**, bấm **Chat** ở dòng agent cần dùng. Dùng bộ lọc **Show** → **Shared with me** để xem agent người khác chia sẻ.", figure: fig("12-4", 5, "Dòng agent trong trang Chat agents với nút Chat", "Bấm Chat") },
        ],
        verify: "Khung chat mở với agent đã chọn.",
      },
    ],
    troubleshooting: [
      { symptom: "Agent trả lời không tìm thấy thông tin trong tài liệu", cause: "Bạn chưa có quyền xem Space mà agent dùng làm nguồn", action: "Đề nghị chủ Space chia sẻ Space cho bạn (trang 12.7)." },
      { symptom: "Không thấy agent được chia sẻ", cause: "Bộ lọc mặc định là Recently used", action: "Chọn **Show** → **Shared with me**." },
    ],
    faqs: [
      ["Agent khác chat thường thế nào?", "Agent có sẵn vai trò, cách trả lời và nguồn kiến thức (Space) được cấu hình trước, nên phù hợp cho một loại việc lặp lại như tra cứu quy định."],
      ["Vì sao agent được chia sẻ trả lời không tìm thấy thông tin?", "Agent chỉ đọc được tài liệu mà chính bạn có quyền. Đề nghị chủ Space chia sẻ Space cho bạn."],
    ],
    controls: ["Câu trả lời của agent là bản nháp: mở nguồn và đối chiếu trước khi dùng.", "Không đưa dữ liệu không được phép vào câu hỏi."],
    sources: [DOCS.agents],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "12.5",
    parentId: 12,
    slug: "chapter-12-5-tao-chat-agent.html",
    navTitle: "Tạo chat agent",
    title: "Tạo chat agent",
    summary: "Mô tả agent bằng lời, để Quick soạn sẵn lời hướng dẫn và nguồn kiến thức, kiểm tra trong khung xem trước rồi **Launch chat agent**.",
    statusText: "Mọi user Amazon Quick tại NAB được tạo chat agent.",
    searchKeywords: ["tạo agent", "create chat agent", "generate", "persona", "instructions", "knowledge sources", "launch"],
    capture: { flow: "q12-5-tao-agent", ...CAPTURED },
    objectives: ["Tạo agent cho một việc tra cứu cụ thể, dùng Space làm nguồn kiến thức.", "Kiểm thử agent trước khi dùng và chia sẻ."],
    prerequisites: [
      "Đã có Space chứa tài liệu được phép (trang 12.2).",
      "Tài liệu tham chiếu (Reference documents) đã được phân loại và chủ sở hữu dữ liệu đồng ý.",
      "Kết nối hành động (**Actions**) tới ứng dụng khác chỉ bật khi đã được ATTT phê duyệt.",
    ],
    walkthroughs: [
      {
        title: "Tạo agent bằng mô tả",
        intro: "Ví dụ: trợ lý tra cứu quy định ngân hàng dựa trên Space văn bản pháp luật.",
        steps: [
          { text: "Mở **Chat agents**, bấm **Create chat agent**.", figure: fig("12-5", 1, "Nút Create chat agent được khoanh đỏ", "Create chat agent") },
          { text: "Mô tả agent bằng lời: làm gì, cho ai, dùng nguồn kiến thức nào, giọng văn ra sao.", figure: fig("12-5", 2, "Ô mô tả agent đã nhập yêu cầu trợ lý tra cứu quy định", "Mô tả agent") },
          { text: "Bấm **Generate**: Quick soạn sẵn tên, lời hướng dẫn và gợi ý nguồn kiến thức.", figure: fig("12-5", 3, "Nút Generate được khoanh đỏ", "Generate") },
          { text: "**Agent persona** — kiểm tra và sửa lời hướng dẫn (Instructions) cho đúng phạm vi; có thể bấm **Refine** để Quick viết lại.", figure: fig("12-5", 4, "Mục Agent persona với lời hướng dẫn tiếng Việt", "Lời hướng dẫn agent") },
          { text: "**Reference documents** — tài liệu hướng dẫn cách trả lời (mẫu câu trả lời, quy trình). Giới hạn theo thông báo trên màn hình (tối đa 10 tài liệu; trích tối đa 100k ký tự).", figure: fig("12-5", 5, "Mục Reference documents với giới hạn số tài liệu", "Tài liệu tham chiếu") },
          { text: "**Knowledge sources** — Space làm nguồn kiến thức; bấm **Link spaces** để gắn thêm hoặc bỏ Space. **Actions** chỉ dùng khi được phê duyệt.", figure: fig("12-5", 6, "Mục Knowledge sources có Space văn bản pháp luật", "Space làm nguồn kiến thức") },
          { text: "Thử agent trong khung xem trước bên phải: câu trả lời phải dẫn điều luật và trích dẫn tài liệu trong Space.", figure: fig("12-5", 7, "Khung xem trước với câu trả lời của agent", "Thử agent") },
          { text: "Bấm **Launch chat agent** để lưu và đưa agent vào sử dụng.", figure: fig("12-5", 8, "Nút Launch chat agent được khoanh đỏ", "Launch chat agent") },
        ],
        verify: "Agent xuất hiện trong Chat agents → My chat agents và trả lời đúng vai trò, có trích dẫn tài liệu.",
      },
    ],
    troubleshooting: [
      { symptom: "Agent trả lời lan man hoặc ngoài phạm vi", cause: "Lời hướng dẫn chưa giới hạn rõ", action: "Sửa Instructions: chỉ trả lời dựa trên Space, nói rõ khi không có thông tin; bấm **Update preview** để thử lại." },
      { symptom: "Agent không trích dẫn tài liệu", cause: "Chưa gắn Space hoặc tài liệu chưa Ready", action: "Kiểm tra Knowledge sources và trạng thái tài liệu trong Space." },
    ],
    faqs: [
      ["Agent có được huấn luyện lại trên tài liệu không?", "Không. Agent tra cứu tài liệu mỗi lần trả lời, không huấn luyện lại mô hình."],
      ["Khi nào dùng Reference documents, khi nào dùng Space?", "Space là kho kiến thức để tra cứu nội dung; Reference documents là tài liệu hướng dẫn cách trả lời (mẫu, quy trình)."],
      ["Agent chưa Launch thì có được lưu không?", "Không. Thoát trang trước khi bấm Launch chat agent thì bản nháp không được giữ lại."],
    ],
    controls: [
      "Chỉ gắn Space và tài liệu tham chiếu đã được phép; agent không bỏ qua quyền dữ liệu của người dùng.",
      "Kiểm thử agent bằng câu hỏi mẫu, đối chiếu nguồn trước khi dùng hoặc chia sẻ.",
      "Agent có hành động ghi ra ứng dụng khác (Actions) cần ATTT phê duyệt riêng, kiểm thử trước, theo dõi sử dụng và thu hồi ngay khi bất thường.",
    ],
    sources: [DOCS.agents, DOCS.security],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "12.6",
    parentId: 12,
    slug: "chapter-12-6-chia-se-chat-agent.html",
    navTitle: "Chia sẻ chat agent",
    title: "Chia sẻ chat agent",
    summary: "Chia sẻ agent cho đồng nghiệp với quyền **Can view** (chỉ dùng) hoặc **Can manage** (cùng quản lý). Lưu ý: chia sẻ agent không chia sẻ Space làm nguồn của agent.",
    statusText: "Chia sẻ agent dùng được cho chủ agent và người có quyền Can manage.",
    searchKeywords: ["chia sẻ agent", "share agent", "can view", "can manage", "embed"],
    capture: { flow: "q12-6-chia-se-agent", ...CAPTURED },
    objectives: ["Chia sẻ agent đúng người, đúng quyền.", "Bảo đảm người nhận dùng được agent với tài liệu nguồn."],
    prerequisites: ["Bạn là chủ agent hoặc có quyền Can manage.", "Nếu agent dùng Space làm nguồn, người nhận cũng cần được chia sẻ Space (trang 12.3, 12.7)."],
    walkthroughs: [
      {
        title: "Chia sẻ agent",
        intro: "Thực hiện từ trang Chat agents.",
        steps: [
          { text: "Mở **Chat agents**, bấm nút **⋮** ở cột **Action** của agent: **View chat agent details**, **Edit chat agent**, **Duplicate**, **Make default**, **Share**…", figure: fig("12-6", 1, "Menu Action của agent", "Menu Action") },
          { text: "Chọn **Share**.", figure: fig("12-6", 2, "Mục Share trong menu Action được khoanh đỏ", "Share") },
          { text: "Hộp thoại **Share agent**: gõ username, email hoặc tên nhóm người nhận.", figure: fig("12-6", 3, "Ô tìm người nhận trong hộp thoại Share agent", "Tìm người nhận") },
          { text: "Chọn đúng người nhận trong gợi ý (kiểm tra cả email); giữ quyền **Can view** trừ khi người nhận cần cùng sửa agent.", figure: fig("12-6", 4, "Danh sách gợi ý người nhận", "Chọn người nhận") },
          { text: "Bấm **Share**.", figure: fig("12-6", 5, "Nút Share trong hộp thoại được khoanh đỏ", "Bấm Share") },
          { text: "Mở lại **Share** để kiểm tra người nhận đã có trong **Shared with**.", figure: fig("12-6", 6, "Danh sách Shared with có người nhận", "Kiểm tra người được chia sẻ") },
        ],
        verify: "Người nhận có trong Shared with với quyền Can view; nếu agent dùng Space, người nhận cũng đã được chia sẻ Space.",
      },
    ],
    troubleshooting: [
      { symptom: "Người nhận dùng agent nhưng agent báo không tìm thấy thông tin", cause: "Người nhận chưa có quyền với Space làm nguồn của agent", action: "Chia sẻ Space cho người nhận (Can view)." },
      { symptom: "Người nhận không thấy agent", cause: "Bộ lọc mặc định Recently used", action: "Hướng dẫn chọn **Show** → **Shared with me**." },
    ],
    faqs: [
      ["Chia sẻ agent có chia sẻ luôn tài liệu trong Space không?", "Không. Đã kiểm tra trên tài khoản người nhận: chỉ chia sẻ agent thì agent trả lời không tìm thấy thông tin; phải chia sẻ thêm Space."],
      ["Can view và Can manage khác nhau thế nào?", "Can view: dùng agent. Can manage: sửa cấu hình, chia sẻ tiếp agent — chỉ cấp cho người cùng quản lý."],
      ["Copy embed code dùng làm gì?", "Để nhúng agent vào trang khác. Không dùng nếu chưa được Khối CNTT/ATTT cho phép."],
    ],
    controls: shareControls,
    sources: [DOCS.agents, DOCS.security],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "12.7",
    parentId: 12,
    slug: "chapter-12-7-luu-y-khi-chia-se.html",
    navTitle: "Lưu ý khi chia sẻ",
    title: "Lưu ý khi chia sẻ Space, agent, flow và báo cáo",
    summary: "Người nhận thấy gì khi được chia sẻ, vì sao chia sẻ agent phải đi kèm chia sẻ Space, và các nguyên tắc chia sẻ an toàn tại NAB.",
    statusText: "Áp dụng cho mọi thao tác chia sẻ trong Amazon Quick.",
    searchKeywords: ["chia sẻ", "share", "lưu ý", "quyền", "người nhận", "shared with me", "thu hồi", "an toàn"],
    capture: { flow: "q12-reader-agent + q12-reader-space", ...CAPTURED },
    objectives: ["Biết chính xác người nhận thấy và dùng được gì sau khi chia sẻ.", "Chia sẻ an toàn: đúng người, quyền tối thiểu, có thu hồi."],
    prerequisites: ["Đọc trước 12.3 Chia sẻ Space và 12.6 Chia sẻ chat agent."],
    tables: [
      {
        caption: "Người nhận thấy gì (kiểm tra trên tài khoản người nhận, 19/11/2026)",
        headers: ["Bạn chia sẻ", "Người nhận thấy", "Agent trả lời từ tài liệu Space?"],
        rows: [
          ["Chỉ agent", "Agent trong Chat agents → Shared with me; không thấy Space", "Không — báo không tìm thấy thông tin"],
          ["Agent + Space", "Agent và Space (Spaces → Shared with me)", "Có — có trích dẫn tài liệu"],
          ["Chỉ Space", "Space; hỏi đáp trong Space", "Không áp dụng"],
        ],
      },
      {
        caption: "Chia sẻ đúng và chưa đúng",
        headers: ["Nên", "Không nên"],
        rows: [
          ["Chia sẻ cho người/nhóm có nhu cầu công việc", "Chia sẻ cho cả phòng \"phòng khi cần\""],
          ["Can view mặc định", "Can manage cho người chỉ cần dùng"],
          ["Chia sẻ agent kèm Space nguồn", "Chia sẻ agent rồi gửi tài liệu qua email để bù"],
          ["Rà soát và thu hồi định kỳ", "Để quyền tồn tại sau khi người nhận chuyển việc"],
        ],
      },
    ],
    walkthroughs: [
      {
        title: "Người nhận thấy gì",
        intro: "Ảnh chụp trên tài khoản người nhận được chia sẻ với quyền Can view.",
        steps: [
          { text: "Người nhận mở **Chat agents** → **Show: Shared with me**: thấy agent; cột **Owner permission** là **No** (chỉ dùng, không sửa).", figure: fig("12-7", 1, "Danh sách agent được chia sẻ ở tài khoản người nhận", "Agent được chia sẻ") },
          {
            text: "So sánh khi chỉ chia sẻ agent và khi chia sẻ thêm Space:",
            compare: {
              wrong: { label: "✗ Chỉ chia sẻ agent", text: "Agent báo không tìm thấy thông tin trong các văn bản được cung cấp.", figure: fig("12-7", 2, "Agent trả lời không tìm thấy thông tin khi người nhận chưa có quyền Space", "Chỉ chia sẻ agent") },
              right: { label: "✓ Chia sẻ agent + Space", text: "Agent trả lời từ tài liệu trong Space, có trích dẫn và nút Sources.", figure: fig("12-7", 6, "Agent trả lời có trích dẫn khi người nhận đã có quyền Space", "Chia sẻ agent kèm Space") },
            },
          },
          { text: "Khi chưa được chia sẻ Space, người nhận không thấy Space trong danh sách.", figure: fig("12-7", 3, "Danh sách Spaces của người nhận khi chưa được chia sẻ", "Chưa thấy Space") },
          { text: "Sau khi được chia sẻ, người nhận thấy Space ở **Spaces** → **Shared with me**.", figure: fig("12-7", 4, "Spaces → Shared with me của người nhận", "Space được chia sẻ") },
          { text: "Người nhận (Can view) mở Space, xem danh sách tài liệu và hỏi đáp; không thêm/xoá tài liệu hay chia sẻ tiếp.", figure: fig("12-7", 5, "Người nhận xem Space được chia sẻ", "Người nhận xem Space") },
        ],
        verify: "Mỗi lần chia sẻ agent, bạn đã chia sẻ kèm Space nguồn cho đúng người nhận với quyền Can view.",
      },
    ],
    troubleshooting: [
      { symptom: "Người nhận báo agent không trả lời được", cause: "Chưa chia sẻ Space nguồn", action: "Chia sẻ Space (Can view) cho người nhận." },
      { symptom: "Người nhận không thấy nội dung được chia sẻ", cause: "Bộ lọc mặc định", action: "Hướng dẫn dùng **Shared with me** ở Chat agents và Spaces." },
    ],
    faqs: [
      ["Chia sẻ agent có đủ để đồng nghiệp tra cứu tài liệu không?", "Không. Phải chia sẻ cả Space làm nguồn của agent; agent chỉ đọc được tài liệu mà người dùng có quyền."],
      ["Chia sẻ flow, báo cáo nghiên cứu có lưu ý gì?", "Áp dụng cùng nguyên tắc: đúng người, quyền tối thiểu, không ra ngoài NAB. Báo cáo nghiên cứu và tệp xuất là dữ liệu mới, cần nhãn phân loại; xem chương 14 và 15."],
      ["Lịch sử hội thoại của tôi có được chia sẻ theo không?", "Khi kiểm tra trên tài khoản người nhận, mục Recents của họ chỉ có cuộc trò chuyện của chính họ — không thấy cuộc trò chuyện của người chia sẻ."],
      ["Khi nào phải thu hồi quyền?", "Khi người nhận chuyển việc, dự án kết thúc hoặc khi rà soát định kỳ thấy không còn nhu cầu."],
    ],
    controls: [...shareControls, "Space không bỏ qua phân quyền dữ liệu (RLS/CLS); không tạo bản sao dữ liệu để chia sẻ rộng hơn quyền của nguồn gốc."],
    sources: [DOCS.spacesSharing, DOCS.agents, DOCS.security],
  }),
];
