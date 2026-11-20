# Kiểm kê nội dung hiện tại — Amazon Quick (chương 11–15)

- **Mục đích**: ảnh chụp nguyên trạng (read-only) toàn bộ nội dung Amazon Quick trên cẩm nang nội bộ Nam A Bank “Cẩm nang nội bộ — Ứng dụng công nghệ và AI”, làm đầu vào cho giai đoạn 2 (viết lại). Tài liệu chỉ mô tả, không đề xuất thay đổi; không có tệp nào trong `html_docs/` bị sửa.
- **Ngày lập**: 2026-11-19
- **Phạm vi**: `html_docs/tools/content-quick.js` (5 chương 11–15), các phần cố định do `html_docs/tools/build-site.js` chèn vào, ảnh `html_docs/quick-docs/Images/{HDSD,Homepage}/*.png`, hai tài liệu Word nguồn `html_docs/quick-docs/huong_dan_amazon_quick.docx` và `huong_dan_giaodien_amazon_quick.docx`, sổ nguồn `html_docs/qa/source-register.md`.

## 1. Cách nội dung được sinh ra

```
tools/content-quick.js  ──require──►  tools/build-site.js  ──ghi──►  chapters/chapter-11…15-*.html (+ index.html)
 (mảng 5 object chương)                 1) normalizeCopy(): 367 regex thay từ Anh → Việt
                                         2) sourceIdsByChapter: ch11–15 = NAB-AQ-001, NAB-AQ-002, VEN-AQ-001
                                         3) renderChapter(): khung trang + callout cố định “Nguyên tắc dừng”
```

- **Không sửa trực tiếp HTML**: các tệp `chapters/chapter-1[1-5]-*.html` là sản phẩm build (đã đối chiếu: HTML hiện tại khớp bản normalize của `content-quick.js`, ví dụ chuỗi “All dữ liệu”, “New phân tích” có trong HTML).
- **normalizeCopy** áp dụng cho mọi chuỗi trừ các trường `id, slug, src, type, tone, kind, className, wrapClassName` và mọi thứ dưới `sources`. Kết quả: 390 chuỗi của 5 chương Quick bị thay đổi khi build (gồm cả nhãn giao diện, xem mục 5).
- **Thứ tự render một chương** (`renderChapter`): breadcrumb → header (`eyebrow`, `title`, `summary`) → hộp trạng thái (`statusLabel` + `statusText`) → *Mục tiêu* (`objectives`) → *Điều kiện trước khi dùng* (`prerequisites`) → *Tình huống sử dụng* (`useCases`, dạng thẻ) → các `guideSections` (H2 đánh số 1., 2., … theo thứ tự mảng; H3 = `subsections[].title || heading`; `body` có “(1) (2)…” được tách thành danh sách) → *Hướng dẫn từng bước* (`walkthroughs`, mỗi cái có “Kết quả cần kiểm chứng”) → *Rủi ro và biện pháp kiểm soát* (callout “Nguyên tắc dừng” + `controls`) → *Câu hỏi thường gặp* (`faqs`) → *Nguồn chính thức và kiểm chứng* (Source IDs + `sources` + ghi chú ngày truy cập) → pager.
- **Mục lục trang** được sinh từ `guideSections` (trường `toc` trong dữ liệu **không được dùng** cho 5 chương này).
- **Source IDs** (theo `qa/source-register.md`):

| Source ID | Loại | Nội dung | Phạm vi | Trạng thái hiện tại |
|---|---|---|---|---|
| NAB-AQ-001 | Bằng chứng tenant | Feature/role/connector matrix Amazon Quick tại NAB | Chương 11–15 | **Cần bổ sung** (owner `[SME Amazon Quick]`, ngày/vị trí bằng chứng đều để trống) |
| NAB-AQ-002 | Bằng chứng walkthrough | Kết quả thao tác lại các hướng dẫn Amazon Quick tại NAB | Chương 11–15 | **Cần bổ sung** |
| VEN-AQ-001 | Tài liệu vendor | AWS — Amazon Quick User Guide (`https://docs.aws.amazon.com/quick/latest/userguide/what-is.html` và nguồn từng chương), truy cập 19/08/2026 | “Khả năng sản phẩm, không thay cho phê duyệt NAB” | **Chờ xác nhận** |

  Ma trận xác nhận tính năng (mục 4 của sổ nguồn) có 8 dòng cho ch11–15 (account/subscription/Region/role; Spaces; Chat Agents; Datasets/Analyses/Dashboards; SPICE/RLS/export; Scenarios; Quick Research; Quick Flows; Quick Automate) — **tất cả “Chờ xác nhận”**. Nhật ký thao tác lại walkthrough: “Chờ thao tác”. Theo quy tắc của chính sổ nguồn: “Chỉ mô tả một tính năng là **được phép tại NAB** khi có cả bằng chứng tenant/quyền sử dụng và xác nhận của owner nghiệp vụ hoặc owner nền tảng.”

- **Ràng buộc kiểm tra phát hành** (ảnh hưởng trực tiếp tới giai đoạn 2): `qa/check-release.py` khóa tên 5 file chương (dòng 28–32), khóa SHA-256 của `tools/content-quick.js` = `913eaafe…0bd5` (dòng 45, 337–339 — mọi chỉnh sửa content-quick.js sẽ làm check này fail), và yêu cầu chuỗi “Đang sử dụng tại NAB” xuất hiện trong chương 04–15 (dòng 341–344). `qa/release-checklist.md:19` ghi một SHA-256 khác (`47cc8811…3278`) → đã lỗi thời so với tệp hiện tại.

## 2. Kiểm kê từng chương (11–15)

> Văn bản dưới đây là bản **đã qua `normalizeCopy`** (đúng như hiển thị trên website). Chuỗi gốc trong `content-quick.js` có nhiều từ tiếng Anh hơn (390 chuỗi bị thay đổi khi build). Số thứ tự mục H2 trên trang là thứ tự mảng (1., 2., …), không dùng trường `number` (11.1, 12.3…) trong dữ liệu.

### Chương 11 — Tổng quan và giao diện Amazon Quick

- **File/slug**: `chapters/chapter-11-amazon-quick-tong-quan.html`
- **navTitle**: Tổng quan và giao diện Amazon Quick
- **title (H1)**: Amazon Quick: tổng quan, giao diện và truy cập an toàn
- **Nhận xét slug**: Khớp chủ đề: slug `tong-quan` ↔ nội dung tổng quan/giao diện. Lưu ý: chương **không có hình nào** dù có sẵn `Images/Homepage/1.png` (trang Home) và `2.png` (menu More).
- **eyebrow**: Đang sử dụng tại NAB · **kind**: `live` · **group**: Amazon Quick — trọng tâm
- **statusLabel**: Đang sử dụng tại NAB
- **statusText**: NAB đang sử dụng Amazon Quick. Hãy dùng đúng tài khoản, Region, role, subscription và các tính năng được cấp.
- **audience**: Người dùng NAB đã được cấp quyền Amazon Quick · **owner**: Chủ biên / SME Amazon Quick · **sourceDate**: 19/08/2026
- **summary**: Amazon Quick là nền tảng AI không gian làm việc toàn diện — kết nối ứng dụng, công cụ và nguồn dữ liệu tổ chức, giúp biến câu hỏi thành câu trả lời và hành động. Chương này hướng dẫn giao diện chính, Private Mode, điều hướng, chat controls và các kết quả shortcuts.
- **Source IDs (build-site.js)**: NAB-AQ-001, NAB-AQ-002, VEN-AQ-001
- **toc (dữ liệu)**: 10 mục — KHÔNG được dùng khi render (TOC được sinh từ guideSections)

**Mục tiêu (objectives)**
1. Đăng nhập đúng tài khoản/role NAB, xác nhận ngữ cảnh và phát hiện quyền bất thường.
2. Hiểu bố cục giao diện: header, sidebar điều hướng, khu vực chat chính và các controls.
3. Sử dụng Private Mode, attachment, phạm vi dữ liệu (All dữ liệu), Smart mode và kết quả shortcuts.
4. Truy cập các tính năng qua sidebar và menu More một cách hiệu quả.

**Điều kiện (prerequisites)**
1. Có tài khoản/SSO NAB, MFA và role/subscription được cấp; không dùng root user hoặc tài khoản cá nhân.
2. Dữ liệu đã phân loại; chỉ chọn dashboard, dataset, Space, kho kiến thức và kết nối được duyệt.
3. Sử dụng tài khoản name, Region, URL/SSO, vai trò và kênh hỗ trợ do CNTT cung cấp.

**Tình huống sử dụng (useCases — tiêu đề)**: Truy cập an toàn · Chat có kiểm soát · Private Mode · Output shortcuts · Điều hướng nhanh

**guideSections**

| # | id | Tiêu đề | Ý chính | Bước | Hình |
|---|---|---|---|---|---|
| **1** (11.1) | `dang-nhap-xac-nhan` | **Đăng nhập và xác nhận đúng ngữ cảnh** | Chỉ dùng portal/SSO do NAB công bố. | — | — |
| 1.1 (11.1.1) | `portal-sso` | Truy cập qua portal NAB | Các bước, bắt đầu: Mở portal/SSO NAB; không dùng link lạ hoặc màn hình tự đăng ký. | 5 | — |
| **2** (11.2) | `bo-cuc-trang-home` | **Bố cục trang Home** | Giao diện chính bao gồm: thanh header phía trên, sidebar điều hướng bên trái và khu vực chat chính. | — | — |
| 2.1 (11.2.1) | `thanh-header` | Thanh header | Hiển thị ở phía trên cùng, cung cấp thông tin nhận dạng tài khoản và quản lý trạng thái phiên làm việc. | 0 | — |
| 2.2 (11.2.2) | `sidebar-dieu-huong` | Sidebar điều hướng | Trung tâm điều hướng chính, cung cấp quyền truy cập nhanh đến tất cả các tính năng: New chat, Search, My stuff, Spaces, Research, Chat agents, Apps, Flows, Analyses, D… | 0 | — |
| 2.3 (11.2.3) | `khu-vuc-chat` | Khu vực chat chính | Chiếm phần lớn màn hình, nơi người dùng tương tác trực tiếp với trợ lý AI. | 0 | — |
| **3** (11.3) | `private-mode` | **Private Mode** | Tính năng quan trọng trên thanh header. | — | — |
| 3.1 (11.3.1) | `hanh-vi-private` | Hành vi Private Mode theo hướng dẫn giao diện | Danh sách: Không sử dụng bộ nhớ; Không truy xuất bộ nhớ đã lưu; Đảm bảo riêng tư toàn diện; Dấu hiệu nhận biết | 0 | — |
| 3.2 (11.3.2) | `xac-nhan-tenant` | Cách Private Mode xử lý dữ liệu | Khi sử dụng Private Mode, cần lưu ý các nội dung sau: [items: Conversation history; Training; Retention; Memory] | 0 | — |
| **4** (11.4) | `sidebar-map` | **Bản đồ sidebar điều hướng** | Sidebar bên trái cung cấp truy cập nhanh đến tất cả các năng lực chính. | — | — |
| 4.1 (11.4.1) | `cac-muc-chinh` | Các mục chính | Danh sách: New chat; Search; My stuff; Spaces; Research; Chat agents; Apps; Flows; Analyses; Dashboards; Data; My folders / Shared folders; More; Recents | 0 | — |
| **5** (11.5) | `chat-controls` | **Chat controls** | Thanh nhập câu hỏi bao gồm nhiều thành phần điều khiển giúp tương tác linh hoạt với AI. | — | — |
| 5.1 (11.5.1) | `cac-thanh-phan` | Các thành phần điều khiển | Danh sách: Dropdown 'Quick'; Ô nhập câu hỏi; Dropdown 'All dữ liệu'; Nút '+'; Dropdown 'Smart' | 0 | — |
| **6** (11.6) | `outputs` | **Output shortcuts** | Các nút tắt phía dưới ô nhập câu hỏi cho phép chọn định dạng đầu ra mong muốn trước khi gửi yêu cầu. | — | — |
| 6.1 (11.6.1) | `cac-output` | Các định dạng kết quả | Danh sách: Research; Document; Presentation; Visual; Phạm vi hỗ trợ | 0 | — |
| **7** (11.7) | `more-menu` | **Menu More** | Menu More nằm ở phía dưới thanh điều hướng bên trái, cung cấp quyền truy cập vào các tính năng nâng cao và mở rộng. | — | — |
| 7.1 (11.7.1) | `cac-tinh-nang-more` | Các tính năng trong More | Danh sách: Automations; Connectors; Knowledge; Extensions; Scenarios; Stories; Customize navigation; Phạm vi hiển thị | 0 | — |

**Hình trong chương**: không có.

**Walkthroughs (Hướng dẫn từng bước)**

1. **Kiểm chứng nguồn và phạm vi dữ liệu** — 5 bước. Intro: Chỉ thực hiện khi chat và nguồn tương ứng được tenant bật. — *Kết quả cần kiểm chứng*: Citation mở được, phép tính khớp định nghĩa KPI và không có hành động ghi ngoài ý muốn.
2. **Sử dụng Private Mode và kiểm tra upload limits** — 5 bước. Intro: Kiểm tra Private Mode và giới hạn tải tệp trước khi sử dụng. — *Kết quả cần kiểm chứng*: Private Mode được bật, tệp đúng định dạng và không có lỗi upload.

**Controls (Rủi ro và biện pháp kiểm soát)** — trang render thêm callout cố định "Nguyên tắc dừng" ở đầu mục này.

1. Chỉ đăng nhập qua tài khoản NAB; không tự tạo Free/Plus hoặc dùng root user cho công việc thường ngày.
2. Quyền kỹ thuật nhìn thấy asset không thay thế phê duyệt mục đích sử dụng.
3. Web, upload và kết nối mặc định không dùng cho đến khi feature matrix xác nhận.
4. Tách tác vụ đọc khỏi hành động ghi; mọi ghi dữ liệu cần phê duyệt và kiểm soát riêng.
5. Conversation/memory/retention không thay thế chính sách dữ liệu NAB.

**FAQs** (8)

1. **Private Mode có thật sự an toàn?** → Private Mode không sử dụng và không truy xuất bộ nhớ đã lưu.
2. **Upload file có giới hạn gì?** → Theo hướng dẫn: tối đa 20 files/cuộc trò chuyện, 50 MB/file; hỗ trợ Word, Excel, PowerPoint, PDF, JPEG, PNG, CSV, TXT, JSON, YAML, XML và HTML.
3. **Tại sao không thấy menu Automations?** → Các mục trong More (Automations, Connectors, Knowledge, Extensions, Scenarios, Stories) phụ thuộc vào role, subscription và region.
4. **Smart mode là gì?** → Chế độ xử lý AI điều chỉnh mức độ sâu của quá trình lý luận.
5. **Recents lưu bao lâu?** → Theo hướng dẫn: 30 ngày; nội dung vẫn phải tuân thủ chính sách dữ liệu NAB.
6. **Output formats nào được hỗ trợ?** → Quick hỗ trợ Research, Document (Word/DOCX, PDF), Presentation (PowerPoint/PPTX) và Visual (chart, graph) theo tính năng được cấp.
7. **Apps có phải là hệ thống chính thức?** → Không. Apps là prototype ứng dụng web tương tác, không mặc nhiên là hệ thống môi trường chính thức.
8. **Quick Research mất bao lâu?** → Theo hướng dẫn giao diện: khoảng 7–10 phút.

**Sources** (4)

1. What is Amazon Quick? — <https://docs.aws.amazon.com/quick/latest/userguide/what-is.html>
2. How Amazon Quick works — <https://docs.aws.amazon.com/quick/latest/userguide/how-quicksuite-works.html>
3. Signing in to Amazon Quick — <https://docs.aws.amazon.com/quick/latest/userguide/signing-in.html>
4. Agentic security in Amazon Quick — <https://docs.aws.amazon.com/quick/latest/userguide/sec-agentic-security.html>

---

### Chương 12 — Spaces và Chat Agents

- **File/slug**: `chapters/chapter-12-amazon-quick-sight.html`
- **navTitle**: Spaces và Chat Agents
- **title (H1)**: Amazon Quick: Spaces và Chat Agents
- **Nhận xét slug**: **LỆCH TÊN FILE**: slug `amazon-quick-sight` nhưng nội dung là **Spaces và Chat Agents** (không có nội dung QuickSight/BI nào trong chương này).
- **eyebrow**: Đang sử dụng tại NAB · **kind**: `live` · **group**: Amazon Quick — trọng tâm
- **statusLabel**: Đang sử dụng tại NAB
- **statusText**: NAB đang sử dụng Spaces và Chat Agents. Chỉ thêm dữ liệu đã được phê duyệt và chia sẻ theo quyền tối thiểu.
- **audience**: Người dùng NAB đã được cấp quyền Amazon Quick · **owner**: Chủ biên / SME Amazon Quick · **sourceDate**: 19/08/2026
- **summary**: Spaces là không gian cộng tác tập hợp files, dashboards, topics, datasets và integration actions. Chat Agents cho phép tạo AI agent tùy chỉnh với persona, tài liệu tham chiếu, spaces và hành động kết nối. Chương này hướng dẫn tạo và quản lý Spaces cùng custom Chat Agents theo nguyên tắc quyền tối thiểu.
- **Source IDs (build-site.js)**: NAB-AQ-001, NAB-AQ-002, VEN-AQ-001
- **toc (dữ liệu)**: 9 mục — KHÔNG được dùng khi render (TOC được sinh từ guideSections)

**Mục tiêu (objectives)**
1. Tạo và quản lý Space — thêm files, datasets, dashboards, topics và members.
2. Hiểu giới hạn Space: tối đa 100 files/Space theo hướng dẫn.
3. Tạo Custom Chat Agent: cấu hình persona, reference documents, Spaces và action kết nối.
4. Áp dụng quyền tối thiểu sharing — chỉ chia sẻ với người cần và permission tối thiểu.
5. Kiểm soát quyền truy cập agent và Space theo chính sách NAB.

**Điều kiện (prerequisites)**
1. Có tài khoản/role NAB với quyền tạo Space và Chat Agent.
2. Files, datasets, dashboards đã được phân loại và phê duyệt.
3. Reference documents cho custom agent đã được chủ sở hữu dữ liệu xác nhận.
4. Connector và integration actions đã được IT security phê duyệt (nếu agent cần thực hiện hành động bên ngoài).
5. Tuân thủ giới hạn files/Space, agent reference limits và sharing controls hiển thị trong Quick.

**Tình huống sử dụng (useCases — tiêu đề)**: Space cộng tác · Custom agent chuyên môn · Agent với hành động · Least privilege sharing

**guideSections**

| # | id | Tiêu đề | Ý chính | Bước | Hình |
|---|---|---|---|---|---|
| **1** (12.1) | `spaces-gioi-thieu` | **Spaces — giới thiệu** | Spaces là không gian cộng tác cho phép tập hợp files, dashboards, topics, datasets và integration actions vào một nơi. | — | — |
| 1.1 (12.1.1) | `spaces-muc-dich` | Mục đích và tình huống sử dụng | Spaces giúp team cộng tác hiệu quả: tập hợp tài liệu dự án, dashboard báo cáo, dataset phân tích và topics Q&A vào một không gian duy nhất. | 0 | — |
| **2** (12.2) | `tao-space` | **Tạo Space** | Tạo Space mới từ sidebar, đặt tên mô tả rõ ràng và thêm tài nguyên cần thiết. | — | — |
| 2.1 (12.2.1) | `buoc-tao-space` | Các bước tạo Space | Các bước, bắt đầu: Chọn 'Spaces' từ sidebar bên trái. | 5 | `2-1.png` |
| **3** (12.3) | `quan-ly-space` | **Quản lý files, datasets, dashboards, topics và members** | Sau khi tạo Space, thêm tài nguyên và members để xây dựng môi trường cộng tác. | — | — |
| 3.1 (12.3.1) | `them-files` | Thêm files | Upload files trực tiếp vào Space hoặc link files đã có trong My stuff. | 0 | `2-2.png` |
| 3.2 (12.3.2) | `them-datasets-dashboards` | Thêm datasets và dashboards | Link datasets và dashboards có sẵn vào Space. | 0 | `2-3.png` |
| 3.3 (12.3.3) | `them-topics-members` | Thêm topics và members | Topic là các kho kiến thức Q&A từ datasets. | 0 | `2-4.png` |
| **4** (12.4) | `chat-agents-gioi-thieu` | **Chat Agents — giới thiệu** | Chat Agents cho phép tạo AI agent tùy chỉnh với persona, kho kiến thức và khả năng thực hiện hành động. | — | — |
| 4.1 (12.4.1) | `agents-muc-dich` | Mục đích và tình huống sử dụng | Custom Chat Agents giúp: — 4 ý đánh số. | 0 | — |
| **5** (12.5) | `tao-custom-agent` | **Tạo Custom Agent** | Tạo agent mới từ sidebar Chat agents, cấu hình persona, reference nguồn và actions. | — | — |
| 5.1 (12.5.1) | `cau-hinh-persona` | Cấu hình persona và reference documents | Danh sách: Persona; Reference documents; Grounding; Phê duyệt dữ liệu | 0 | `8-1.png` |
| 5.2 (12.5.2) | `them-spaces-actions` | Thêm Spaces và action kết nối | Danh sách: Spaces; Action kết nối; Hành động; Least privilege | 0 | `8-2.png` |
| **6** (12.6) | `best-practices-sharing` | **Best practices và least-privilege sharing** | Kiểm soát quyền truy cập Space và agent theo nguyên tắc quyền tối thiểu. | — | — |
| 6.1 (12.6.1) | `nguyen-tac-chia-se` | Nguyên tắc chia sẻ an toàn | Các bước, bắt đầu: Chỉ chia sẻ Space/agent với người thực sự cần — không chia sẻ công khai hoặc 'just in case'. | 6 | — |

**Hình trong chương**

| src | Vị trí (id) | alt | caption |
|---|---|---|---|
| `quick-docs/Images/HDSD/2-1.png` | `buoc-tao-space` | Giao diện Spaces hiển thị danh sách spaces hiện có và nút Create Space | Hình 12.1: Danh sách Spaces và nút tạo Space mới |
| `quick-docs/Images/HDSD/2-2.png` | `them-files` | Giao diện thêm files vào Space với nút upload và danh sách files hiện có | Hình 12.2: Thêm files vào Space |
| `quick-docs/Images/HDSD/2-3.png` | `them-datasets-dashboards` | Giao diện quản lý datasets và dashboards trong Space | Hình 12.3: Datasets và Dashboards trong Space |
| `quick-docs/Images/HDSD/2-4.png` | `them-topics-members` | Giao diện quản lý members trong Space với danh sách members và quyền truy cập | Hình 12.4: Quản lý members và quyền trong Space |
| `quick-docs/Images/HDSD/8-1.png` | `cau-hinh-persona` | Giao diện tạo Custom Chat Agent với các trường cấu hình persona, name, description | Hình 12.5: Tạo Custom Chat Agent và cấu hình persona |
| `quick-docs/Images/HDSD/8-2.png` | `them-spaces-actions` | Giao diện cấu hình Spaces và Actions cho Custom Agent | Hình 12.6: Thêm Spaces và Actions cho Custom Agent |

**Walkthroughs (Hướng dẫn từng bước)**

1. **Tạo Space và thêm tài nguyên** — 6 bước. Intro: Workflow hoàn chỉnh từ tạo Space đến quản lý members. — *Kết quả cần kiểm chứng*: Space có tài nguyên đầy đủ, members có quyền phù hợp và access log được ghi nhận.
2. **Tạo Custom Chat Agent với persona và references** — 7 bước. Intro: Tạo agent chuyên môn với kho kiến thức riêng. — *Kết quả cần kiểm chứng*: Agent trả lời đúng persona, đối chiếu nguồn với references và không hallucinate.

**Controls (Rủi ro và biện pháp kiểm soát)** — trang render thêm callout cố định "Nguyên tắc dừng" ở đầu mục này.

1. Chỉ chia sẻ Space/agent với người thực sự cần — không chia sẻ công khai hoặc 'just in case'.
2. Cấp quyền tối thiểu: Viewer nếu chỉ cần đọc, Contributor nếu cần biên tập, Owner chỉ cho người quản trị.
3. Rà soát quyền truy cập định kỳ (ít nhất quarterly) — xóa members không còn làm việc trên dự án.
4. Reference documents trong agent: chỉ thêm documents được phân loại phù hợp và chủ sở hữu dữ liệu đã phê duyệt.
5. Custom agent có actions: phải có phê duyệt riêng từ IT security, kiểm thử kỹ trước môi trường chính thức, theo dõi usage.
6. Tuân thủ giới hạn theo hướng dẫn: 100 files/Space và 10 reference files, 50 MB/file cho agent.

**FAQs** (8)

1. **Space có giới hạn gì?** → Theo hướng dẫn: tối đa 100 files/Space.
2. **RLS/CLS có áp dụng trong Space?** → Có. Space không bỏ qua cơ chế kiểm soát quyền dữ liệu — members truy cập datasets/dashboards theo quyền của họ trên tài nguyên gốc.
3. **Custom agent có thể làm gì?** → Agent có thể: — 4 ý đánh số.
4. **Agent reference limits là gì?** → Theo hướng dẫn: tối đa 10 files, 50 MB/file cho reference documents.
5. **Làm sao biết agent có actions nguy hiểm?** → Kiểm tra kết nối được bật — nếu agent kết nối Salesforce, Jira, ServiceNow và có quyền ghi, cần phê duyệt và giám sát riêng.
6. **Ai có thể tạo Space/agent?** → Người có role và quyền tạo shared resources; gửi yêu cầu hỗ trợ nếu không thấy nút Create.
7. **Space có thể chia sẻ ra ngoài NAB?** → Không khuyến khích. Chỉ chia sẻ với internal người dùng/nhóm theo chính sách NAB.
8. **Custom agent có được training trên reference docs?** → Không. Agent đối chiếu nguồn/retrieval với documents mỗi lần trả lời, không fine-tune hay training lâu dài.

**Sources** (4)

1. Working with Spaces — <https://docs.aws.amazon.com/quick/latest/userguide/spaces-overview.html>
2. Creating custom Chat Agents — <https://docs.aws.amazon.com/quick/latest/userguide/chat-agents-create.html>
3. Managing Space members and permissions — <https://docs.aws.amazon.com/quick/latest/userguide/spaces-sharing.html>
4. Connecting actions to agents — <https://docs.aws.amazon.com/quick/latest/userguide/agents-actions.html>

---

### Chương 13 — Dữ liệu, Analyses và Dashboards

- **File/slug**: `chapters/chapter-13-amazon-quick-research-index.html`
- **navTitle**: Dữ liệu, Analyses và Dashboards
- **title (H1)**: Amazon Quick — tạo datasets, các bản phân tích và dashboards
- **Nhận xét slug**: **LỆCH TÊN FILE**: slug `research-index` nhưng nội dung là **Datasets / Analyses / Dashboards / SPICE** (không có Research hay Index).
- **eyebrow**: Đang sử dụng tại NAB · **kind**: `live` · **group**: Amazon Quick — trọng tâm
- **statusLabel**: Đang sử dụng tại NAB
- **statusText**: NAB đang sử dụng Amazon Quick cho dữ liệu, Analyses và Dashboards. Chỉ sử dụng nguồn, quyền truy cập và kết nối được cấp.
- **audience**: Người dùng NAB đã được cấp quyền Amazon Quick · **owner**: Chủ biên / SME Amazon Quick · **sourceDate**: 19/08/2026
- **summary**: Datasets chuẩn bị dữ liệu từ nguồn dữ liệu; Analyses tạo biểu đồ/bộ lọc/sheets; Dashboards xuất bản, chia sẻ và embed. SPICE cache trong bộ nhớ; Direct Query theo thời gian thực nhưng chậm hơn.
- **Source IDs (build-site.js)**: NAB-AQ-001, NAB-AQ-002, VEN-AQ-001
- **toc (dữ liệu)**: 10 mục — KHÔNG được dùng khi render (TOC được sinh từ guideSections)

**Mục tiêu (objectives)**
1. Tạo dataset với SPICE hoặc Direct Query.
2. Tạo Analysis với AutoGraph, biểu đồ, bộ lọc và sheets.
3. Xuất bản Dashboard, chia sẻ và quản lý SPICE capacity.

**Điều kiện (prerequisites)**
1. Bảo đảm nguồn dữ liệu, SPICE capacity, RLS/CLS và kết nối phù hợp với phạm vi được cấp.
2. Data Owner duyệt phạm vi dữ liệu; ATTT duyệt thông tin xác thực, kết nối, Region và embed/xuất dữ liệu settings.
3. Có định nghĩa KPI, metadata, grain và số liệu đối soát đã được phê duyệt.

**Tình huống sử dụng (useCases — tiêu đề)**: Dataset từ nguồn dữ liệu · Analysis với AutoGraph · Dashboard xuất bản

**guideSections**

| # | id | Tiêu đề | Ý chính | Bước | Hình |
|---|---|---|---|---|---|
| **1** (13.1) | `datasets-data-sources` | **Datasets và Data Sources** | Dataset là lớp chuẩn bị dữ liệu — kết nối nguồn dữ liệu, join tables, trường tính toán và dữ liệu types. | — | — |
| **2** (13.2) | `tao-chuan-bi-dataset` | **Tạo và chuẩn bị Dataset** | — | — | — |
| 2.1 (13.2.1) | `ket-noi-source` | Kết nối nguồn dữ liệu | Các bước, bắt đầu: Từ sidebar, chọn Data → New dataset. | 5 | `3-1.png` |
| 2.2 (13.2.2) | `chuan-bi-dataset` | Chuẩn bị Dataset — join, trường tính toán, bộ lọc | Sau khi kết nối, Dataset editor cho phép join tables, thêm trường tính toán, change dữ liệu types, apply bộ lọc và rename columns. | 5 | `3-2.png` |
| **3** (13.3) | `spice-vs-direct-query` | **SPICE versus Direct Query** | SPICE (Super-fast, Parallel, In-memory Calculation Engine) cache dữ liệu trong bộ nhớ — truy vấn nhanh nhưng cần refresh và chiếm capacity. | — | — |
| 3.1 (13.3.1) | `khi-nao-dung-spice` | Khi nào dùng SPICE | Interactive dashboards, scheduled refresh (hàng ngày/tuần), dữ liệu không đổi liên tục, cần tốc độ cao. | 0 | — |
| 3.2 (13.3.2) | `khi-nao-dung-direct-query` | Khi nào dùng Direct Query | Data thời gian thực (theo thời gian thực), không muốn cache, dữ liệu volume vượt SPICE capacity, hoặc nguồn dữ liệu đã optimized. | 0 | — |
| 3.3 (13.3.3) | `refresh-schedule` | Lịch cập nhật và cập nhật tăng dần | SPICE datasets cần refresh để cập nhật dữ liệu. | 0 | — |
| **4** (13.4) | `tao-analysis` | **Tạo Analysis — AutoGraph, biểu đồ, bộ lọc và sheets** | — | — | — |
| 4.1 (13.4.1) | `tao-analysis-autograph` | Tạo Analysis với AutoGraph | Các bước, bắt đầu: Từ sidebar, chọn Analyses → New phân tích. | 5 | `4-1.png` |
| 4.2 (13.4.2) | `visuals-sheets` | Visuals, trường tính toán và sheets | Analysis có thể chứa nhiều biểu đồ (charts, tables, KPIs, maps) và nhiều sheets. | 5 | `4-2.png` |
| **5** (13.5) | `chia-se-analysis` | **Chia sẻ Analysis** | Analysis có thể chia sẻ với đồng nghiệp để cùng biên tập hoặc xem. | — | — |
| 5.1 (13.5.1) | `share-analysis` | Share Analysis với đồng nghiệp | Các bước, bắt đầu: Mở Analysis → Share icon (góc trên bên phải). | 5 | `4-3.png` |
| **6** (13.6) | `xuat-ban-dashboard` | **Xuất bản và chia sẻ Dashboard** | Dashboard là published, chỉ đọc phiên bản của Analysis. | — | — |
| 6.1 (13.6.1) | `publish-dashboard` | Publish Dashboard | Các bước, bắt đầu: Mở Analysis → Publish dashboard button. | 5 | `5-1.png` |
| 6.2 (13.6.2) | `share-embed-dashboard` | Share, embed và email theo lịch | Dashboard có thể chia sẻ với người dùng/nhóm (viewer quyền), embed vào web app (iframe/SDK), hoặc lịch chạy email delivery (PDF/CSV attachments). | 4 | `5-2.png` |
| **7** (13.7) | `quan-ly-spice` | **Quản lý SPICE capacity và refresh** | SPICE capacity có giới hạn per tài khoản/region. | — | — |
| 7.1 (13.7.1) | `monitor-capacity` | Monitor SPICE capacity | Admin vào QuickSight settings → SPICE capacity → xem total capacity, used capacity và available capacity. | 0 | — |
| 7.2 (13.7.2) | `schedule-refresh` | Lập lịch cập nhật cho SPICE datasets | phần cài đặt Dataset → Lịch cập nhật → thêm lịch chạy (hourly, daily, weekly, monthly). | 0 | — |

**Hình trong chương**

| src | Vị trí (id) | alt | caption |
|---|---|---|---|
| `quick-docs/Images/HDSD/3-1.png` | `ket-noi-source` | Màn hình New dataset trong Amazon Quick với danh sách nguồn dữ liệu types: Athena, Redshift, S3, Upload file và các kết nối | Hình 13.1: Kết nối nguồn dữ liệu và chọn SPICE/Direct Query |
| `quick-docs/Images/HDSD/3-2.png` | `chuan-bi-dataset` | Dataset editor với các columns, trường tính toán, join relationships và dữ liệu type settings | Hình 13.2: Dataset editor — join, trường tính toán và dữ liệu types |
| `quick-docs/Images/HDSD/4-1.png` | `tao-analysis-autograph` | Analysis editor với AutoGraph gợi ý biểu đồ types, field wells, và bộ lọc panel | Hình 13.3: Tạo Analysis với AutoGraph và bộ lọc |
| `quick-docs/Images/HDSD/4-2.png` | `visuals-sheets` | Analysis với nhiều biểu đồ, sheets tabs và parameter controls | Hình 13.4: Analysis với biểu đồ, sheets và tham số |
| `quick-docs/Images/HDSD/4-3.png` | `share-analysis` | Share Analysis dialog với user list, permission dropdown (Owner/Đồng sở hữu/Viewer) và nút Send invitation | Hình 13.5: Chia sẻ Analysis với đồng nghiệp |
| `quick-docs/Images/HDSD/5-1.png` | `publish-dashboard` | Publish dashboard dialog với tên Dashboard, description, sheet selection và chia sẻ quyền | Hình 13.6: Xuất bản Dashboard từ Analysis |
| `quick-docs/Images/HDSD/5-2.png` | `share-embed-dashboard` | Dashboard với chia sẻ options: thêm người dùng/nhóm, embed code, và email theo lịch settings | Hình 13.7: Chia sẻ Dashboard — người dùng/nhóm, embed và email theo lịch |

**Walkthroughs (Hướng dẫn từng bước)**

1. **Kiểm chứng KPI definition** — 5 bước. Intro: Không suy ra định nghĩa KPI chỉ từ title của biểu đồ — cần tài liệu định nghĩa đã duyệt. — *Kết quả cần kiểm chứng*: Có hồ sơ làm việc chỉ ra nguồn, definition, control total và cách tái tạo con số.
2. **Export Dashboard an toàn** — 5 bước. Intro: File xuất dữ liệu là bản sao mới và cần được phân loại, label và kiểm soát như dữ liệu gốc. — *Kết quả cần kiểm chứng*: File/link có người chịu trách nhiệm, recipients, nhãn phân loại dữ liệu và dấu vết kiểm tra.

**Controls (Rủi ro và biện pháp kiểm soát)** — trang render thêm callout cố định "Nguyên tắc dừng" ở đầu mục này.

1. SPICE datasets có thể outdated nếu refresh fails; theo dõi refresh status và lịch chạy.
2. Hai người thấy số khác có thể do RLS/CLS, group membership, bộ lọc hoặc refresh timing.
3. Sai grain, logic kết nối dữ liệu hoặc calculated field definition có thể làm cách tổng hợp sai; kiểm chứng với dữ liệu dictionary và số liệu đối soát.
4. Không xuất dữ liệu hoặc chia sẻ Dashboard công khai; chỉ chia sẻ nội bộ NAB với người dùng/nhóm được phê duyệt.
5. Dashboard viewer controls (xuất dữ liệu, bộ lọc, drill-down) có thể bị restrict; không tìm cách bỏ qua cơ chế kiểm soát.
6. AI Explanation không thay thế business kiểm tra — người kiểm tra vẫn chịu trách nhiệm kiểm chứng định nghĩa và số liệu.

**FAQs** (8)

1. **Vì sao hai người thấy số khác nhau?** → Kiểm tra RLS/CLS rules, group membership, applied bộ lọc và SPICE refresh timing.
2. **SPICE vs Direct Query — chọn thế nào?** → SPICE: interactive dashboards, scheduled refresh, tốc độ cao.
3. **Dashboard có theo thời gian thực không?** → Không mặc định; phụ thuộc SPICE (cần refresh) hoặc Direct Query (theo thời gian thực).
4. **Có xuất dữ liệu toàn bộ Dashboard thành CSV?** → Dashboard thường xuất dữ liệu PDF.
5. **Vì sao không thấy Export/Filter button?** → Chủ sở hữu Dashboard hoặc quản trị viên có thể giới hạn các điều khiển của người xem.
6. **AI Explanation có đủ để kiểm chứng KPI?** → Không; Explanation làm rõ nguồn truy vấn, bộ lọc và calculation logic, nhưng người kiểm tra nghiệp vụ vẫn phải kiểm chứng definition, số liệu đối soát và hồ sơ làm việc.
7. **Có gửi Dashboard xuất dữ liệu qua email cá nhân?** → Không; chỉ dùng kênh và recipients được NAB phê duyệt.
8. **Refresh fail — phải làm gì?** → Kiểm tra Dataset refresh history, error logs và nguồn dữ liệu connectivity.

**Sources** (5)

1. Amazon QuickSight datasets and data sources — <https://docs.aws.amazon.com/quicksight/latest/user/working-with-data-sources.html>
2. SPICE capacity management — <https://docs.aws.amazon.com/quicksight/latest/user/managing-spice-capacity.html>
3. Creating analyses and visuals — <https://docs.aws.amazon.com/quicksight/latest/user/creating-an-analysis.html>
4. Publishing and sharing dashboards — <https://docs.aws.amazon.com/quicksight/latest/user/sharing-a-dashboard.html>
5. Row-level security (RLS) and column-level security (CLS) — <https://docs.aws.amazon.com/quicksight/latest/user/restrict-access-to-a-data-set-using-row-level-security.html>

---

### Chương 14 — Scenarios và Quick Research

- **File/slug**: `chapters/chapter-14-amazon-quick-flows-automate.html`
- **navTitle**: Scenarios và Quick Research
- **title (H1)**: Scenarios và Quick Research: phân tích có AI hỗ trợ và nghiên cứu có căn cứ
- **Nhận xét slug**: **LỆCH TÊN FILE**: slug `flows-automate` nhưng nội dung là **Scenarios và Quick Research**.
- **eyebrow**: Đang sử dụng tại NAB · **kind**: `live` · **group**: Amazon Quick — trọng tâm
- **statusLabel**: Đang sử dụng tại NAB
- **statusText**: NAB đang sử dụng Scenarios và Quick Research. Chỉ dùng nguồn, tìm kiếm web, upload, kho kiến thức và kết nối được cấp quyền.
- **audience**: Người dùng NAB đã được cấp quyền Amazon Quick · **owner**: Chủ biên / SME Amazon Quick · **sourceDate**: 19/08/2026
- **summary**: Scenarios cung cấp vùng phân tích có AI hỗ trợ để khám phá kết quả phân tích từ dữ liệu. Quick Research tạo báo cáo có nguồn từ web, Spaces, file đã tải lên hoặc dashboards. Cả hai đều yêu cầu trích dẫn kiểm chứng và kiểm soát nguồn.
- **Source IDs (build-site.js)**: NAB-AQ-001, NAB-AQ-002, VEN-AQ-001
- **toc (dữ liệu)**: 9 mục — KHÔNG được dùng khi render (TOC được sinh từ guideSections)

**Mục tiêu (objectives)**
1. Tạo Scenario và sử dụng gợi ý của AI để phân tích dữ liệu.
2. Tạo Research có mục tiêu rõ ràng và kiểm tra từng trích dẫn.
3. Phân biệt nguồn chính thống và tìm kiếm web bổ sung.
4. Ngăn prompt injection, nguồn cũ và phụ thuộc quá mức vào AI kết quả.

**Điều kiện (prerequisites)**
1. Chỉ sử dụng Scenarios, Research, tìm kiếm web, upload, Space/dashboard và kết nối được cấp quyền.
2. Data Owner duyệt phạm vi nguồn; ATTT duyệt kết nối, Region và mô hình ACL.
3. Chỉ dùng dữ liệu đã được phân loại và phê duyệt.
4. Action kết nối mặc định không dùng trong phân tích/nghiên cứu.

**Tình huống sử dụng (useCases — tiêu đề)**: Scenarios — Exploratory Analysis · Quick Research — Grounded Reports · Verification First

**guideSections**

| # | id | Tiêu đề | Ý chính | Bước | Hình |
|---|---|---|---|---|---|
| **1** (14.1) | `scenarios-gioi-thieu` | **Scenarios — mục đích và quyền truy cập** | Scenarios là vùng phân tích có AI hỗ trợ cho phép khám phá kết quả phân tích từ dữ liệu với gợi ý của AI. | — | — |
| 1.1 (14.1.1) | `scenarios-muc-dich` | Mục đích và tình huống sử dụng | Scenarios hỗ trợ: — 4 ý đánh số. | 0 | — |
| 1.2 (14.1.2) | `scenarios-access` | Truy cập Scenarios | Scenarios thường nằm trong More menu hoặc My stuff section. Điều kiện truy cập: — 3 ý đánh số. | 0 | — |
| **2** (14.2) | `tao-scenario` | **Tạo Scenario và phân tích có AI hỗ trợ** | Tạo Scenario mới, thêm nguồn dữ liệu (datasets/Spaces), mô tả mục tiêu phân tích và để AI đề xuất biểu đồ trực quan và kết quả phân tích. | — | — |
| 2.1 (14.2.1) | `tao-scenario-steps` | Các bước tạo Scenario | Các bước, bắt đầu: Mở More menu → My stuff → Scenarios (hoặc điểm truy cập tương đương theo phiên bản). | 5 | `6-1.png` |
| 2.2 (14.2.2) | `ai-suggestions-insights` | Sử dụng gợi ý của AI và kết quả phân tích | Sau khi AI đề xuất vùng phân tích, bạn có thể: — 4 ý đánh số. [note: Kết quả phân tích của AI không thay thế đánh giá nghiệp vụ — luôn kiểm chứng số liệu, định nghĩa và giả định.] | 5 | — |
| **3** (14.3) | `quick-research-gioi-thieu` | **Quick Research — nghiên cứu có căn cứ** | Quick Research tạo báo cáo tổng hợp từ nguồn được chỉ định: tìm kiếm web, Spaces, file đã tải lên, dashboards. | — | — |
| 3.1 (14.3.1) | `research-access-methods` | Truy cập và tình huống sử dụng | Quick Research thường có điểm truy cập trong sidebar, More menu hoặc menu ngữ cảnh của Spaces. Các tình huống sử dụng: — 3 ý đánh số. [note: Chỉ sử dụng các nguồn được cấp quyền như web, Spaces, file đã tải lên hoặc kết nối.] | 0 | — |
| **4** (14.4) | `tao-research` | **Tạo Research — chọn nguồn và mục tiêu** | Tạo Research mới, chọn nguồn (web/Spaces/file đã tải lên/dashboards), định nghĩa mục tiêu và bối cảnh, kiểm tra kế hoạch do AI đề xuất trước khi thực thi. | — | — |
| 4.1 (14.4.1) | `chon-nguon` | Chọn nguồn: Web, Spaces, Uploads, Dashboards | Research có thể dùng một hoặc nhiều nguồn (nếu giữa các phạm vi được duyệt): — 4 ý đánh số. | 5 | — |
| 4.2 (14.4.2) | `dinh-nghia-goal-context` | Định nghĩa mục tiêu và bối cảnh | Mục tiêu Research phải cụ thể: câu hỏi, phạm vi địa lý/thời gian, tiêu chí và định dạng kết quả. | 4 | — |
| **5** (14.5) | `review-research-output` | **Kiểm tra kế hoạch Research, phê duyệt và kiểm chứng trích dẫn** | Trước khi Research được thực thi, AI đề xuất kế hoạch (nguồn, các bước, kết quả dự kiến). | — | — |
| 5.1 (14.5.1) | `approve-plan` | Kiểm tra và phê duyệt kế hoạch | Kế hoạch do AI đề xuất nêu: — 3 ý đánh số. [note: Kiểm tra kế hoạch, sửa phạm vi và loại trừ nguồn không cần trước khi phê duyệt.] | 5 | `9-1.png` |
| 5.2 (14.5.2) | `verify-citations` | Kiểm tra trích dẫn và kiểm chứng căn cứ | kết quả Research có trích dẫn cho mỗi nhận định. Mở từng trích dẫn để: — 4 ý đánh số. [note: Citation không bảo đảm nhận định đúng — luôn kiểm chứng nguồn gốc.] | 5 | `9-2.png` |
| 5.3 (14.5.3) | `edit-export-research` | Biên tập và xuất Research | Sau kiểm chứng, biên tập kết quả: bổ sung lưu ý về giới hạn, sửa diễn giải sai, thêm giới hạn. | 5 | `9-3.png` |
| **6** (14.6) | `verification-safe-sharing` | **Cách kiểm chứng và chia sẻ an toàn** | Kết quả Research và Scenarios đều cần kiểm chứng: kiểm tra định nghĩa, số liệu đối soát, trích dẫn và giả định. | — | — |
| 6.1 (14.6.1) | `verification-checklist` | Danh sách kiểm tra | Trước khi dùng kết quả: — 6 ý đánh số. | 0 | — |
| 6.2 (14.6.2) | `safe-sharing` | Chia sẻ an toàn và kiểm soát xuất dữ liệu | Kết quả Research/Scenarios là dữ liệu mới và cần phân loại: — 5 ý đánh số. | 0 | — |

**Hình trong chương**

| src | Vị trí (id) | alt | caption |
|---|---|---|---|
| `quick-docs/Images/HDSD/6-1.png` | `tao-scenario-steps` | Giao diện Scenarios với nguồn dữ liệu selector, mục tiêu đầu vào box và vùng phân tích do AI đề xuất | Hình 14.1: Tạo Scenario với nguồn dữ liệu và mục tiêu phân tích |
| `quick-docs/Images/HDSD/9-1.png` | `approve-plan` | kế hoạch Research dialog với danh sách nguồn, các bước, thời gian dự kiến estimate và Approve/Reject buttons | Hình 14.2: Kiểm tra và phê duyệt kế hoạch Research |
| `quick-docs/Images/HDSD/9-2.png` | `verify-citations` | kết quả Research với inline trích dẫn, trích dẫn panel hiển thị nguồn URL, author, date và excerpt | Hình 14.3: Kiểm chứng trích dẫn — mở nguồn, check author/date/bối cảnh |
| `quick-docs/Images/HDSD/9-3.png` | `edit-export-research` | Research editor với biên tập controls, xuất dữ liệu options (PDF/Markdown/DOCX) và chia sẻ settings | Hình 14.4: Biên tập và xuất kết quả Research |

**Walkthroughs (Hướng dẫn từng bước)**

1. **Phân tích khám phá với Scenarios** — 5 bước. Intro: Khám phá dữ liệu mới với gợi ý của AI — nhưng vẫn kiểm chứng logic tổng hợp và số liệu đối soát. — *Kết quả cần kiểm chứng*: Scenario có tài liệu định nghĩa cho KPIs, số liệu đối soát khớp với nguồn và người kiểm tra xác nhận.
2. **Research nguồn công khai** — 5 bước. Intro: Tạo research báo cáo từ web — không đưa dữ liệu nhạy cảm NAB vào từ khóa tìm kiếm. — *Kết quả cần kiểm chứng*: Báo cáo có mục tiêu, danh mục nguồn, ngày truy cập, giới hạn và người kiểm tra.
3. **Research với asset nội bộ** — 5 bước. Intro: Tổng hợp từ Spaces/dashboards — chỉ dùng nguồn và đối tượng đọc đã được Data Owner phê duyệt. — *Kết quả cần kiểm chứng*: Mỗi nhận định truy ngược được nguồn/phiên bản; xuất dữ liệu không bỏ qua cơ chế kiểm soát ACL nguồn.

**Controls (Rủi ro và biện pháp kiểm soát)** — trang render thêm callout cố định "Nguyên tắc dừng" ở đầu mục này.

1. gợi ý của AI (Scenarios) và trích dẫn (Research) không thay thế kiểm chứng — người kiểm tra vẫn chịu trách nhiệm kiểm chứng định nghĩa, số liệu đối soát và nhận định.
2. kế hoạch Research có thể bao gồm nguồn ngoài phạm vi — kiểm tra và điều chỉnh trước phê duyệt.
3. Trích dẫn có thể chỉ khớp một phần hoặc bị diễn giải sai — luôn đọc đầy đủ ngữ cảnh và đối chiếu chéo.
4. Không kết hợp web với nội bộ nếu việc kết hợp dữ liệu giữa các phạm vi chưa được ATTT/Data Owner duyệt.
5. Kết quả Research/Scenarios là dữ liệu mới — cần nhãn phân loại dữ liệu, ACL và dấu vết kiểm tra.
6. Không bỏ qua cơ chế kiểm soát RLS/CLS bằng cách xuất dữ liệu rồi chia sẻ rộng hơn — xuất dữ liệu vẫn tuân theo nguồn ACL.

**FAQs** (8)

1. **Scenarios có replace Analysis?** → Không; Scenarios là vùng làm việc khám phá với gợi ý của AI.
2. **Research có theo thời gian thực không?** → Tùy nguồn: tìm kiếm web/Spaces có thể gần theo thời gian thực; dashboards phụ thuộc SPICE refresh.
3. **Citation có bảo đảm nhận định đúng?** → Không; trích dẫn có thể chỉ khớp một phần hoặc bị diễn giải sai.
4. **Có thể dùng kết quả Research trực tiếp cho quyết định?** → Không; kết quả cần người kiểm tra kiểm chứng, biên tập, thêm lưu ý về giới hạn và xác nhận trước khi dùng.
5. **kế hoạch Research quá rộng — có thể bỏ qua bước kiểm tra?** → Không; từ chối kế hoạch và điều chỉnh mục tiêu.
6. **Có chia sẻ Research qua email cá nhân?** → Không; xuất dữ liệu vào kho NAB, gắn nhãn phân loại dữ liệu và chia sẻ với đúng người dùng/nhóm trong môi trường được phép.
7. **Scenarios có bỏ qua cơ chế kiểm soát RLS/CLS?** → Không; Scenarios tuân theo quyền dữ liệu.
8. **Web search có được bật mặc định?** → Không mặc định cho mọi tài khoản; chỉ sử dụng khi giao diện cho phép và không đưa dữ liệu nội bộ vào truy vấn web.

**Sources** (3)

1. Amazon QuickSight Scenarios — <https://docs.aws.amazon.com/quicksight/latest/user/scenarios.html>
2. Amazon QuickSight Research — <https://docs.aws.amazon.com/quicksight/latest/user/quicksight-research.html>
3. Data source permissions and access control — <https://docs.aws.amazon.com/quicksight/latest/user/managing-permissions.html>

---

### Chương 15 — Quick Flows & Automate

- **File/slug**: `chapters/chapter-15-amazon-quick-apps.html`
- **navTitle**: Quick Flows & Automate
- **title (H1)**: Amazon Quick Flows và Quick Automate: tự động hóa có kiểm soát
- **Nhận xét slug**: **LỆCH TÊN FILE**: slug `amazon-quick-apps` nhưng nội dung là **Quick Flows và Quick Automate**; không có nội dung Apps nào (Apps chỉ được nhắc ở ch11).
- **eyebrow**: Đang sử dụng tại NAB · **kind**: `live` · **group**: Amazon Quick — trọng tâm
- **statusLabel**: Đang sử dụng tại NAB
- **statusText**: NAB đang sử dụng Quick Flows và Automate. Chỉ dùng quyền tạo, chạy, chia sẻ, kết nối và lịch chạy được cấp.
- **audience**: Người dùng NAB đã được cấp quyền Amazon Quick · **owner**: Chủ biên / SME Amazon Quick · **sourceDate**: 19/08/2026
- **summary**: Flow hoặc automation do AI sinh chỉ là bản nháp. Hành động ghi vào môi trường chính thức cần người chịu trách nhiệm, quyền tối thiểu, UAT, phê duyệt, logging và khôi phục.
- **Source IDs (build-site.js)**: NAB-AQ-001, NAB-AQ-002, VEN-AQ-001
- **toc (dữ liệu)**: không có trường toc

**Mục tiêu (objectives)**
1. Tạo Flow chỉ đọc có thể kiểm thử.
2. Thiết kế bước phê duyệt của con người cho ghi dữ liệu/lịch chạy.
3. Quản lý vòng đời Automate từ kiểm thử đến giám sát/khôi phục.

**Điều kiện (prerequisites)**
1. Tình huống sử dụng có người chịu trách nhiệm quy trình, người chịu trách nhiệm hệ thống, chủ sở hữu dữ liệu, mức độ rủi ro và kiểm thử dữ liệu.
2. Feature, role, Region, kết nối, phê duyệt/HITL đã được xác nhận.
3. Tách thông tin xác thực kiểm thử/prod, không nhúng secret trong prompt, tài liệu hoặc flow.

**Tình huống sử dụng (useCases — tiêu đề)**: Quick Flows · Quick Automate · Human gate

**guideSections**

| # | id | Tiêu đề | Ý chính | Bước | Hình |
|---|---|---|---|---|---|
| **1** (15.1) | `flows-muc-dich-quyen` | **Amazon Quick Flows — mục đích và quyền truy cập** | — | — | cấp section: `10-1.png` |
| 1.1 (—) | `flows-la-gi` | Flows là gì | Quick Flows tự động hóa tác vụ ngắn, lặp lại — trích xuất kết quả phân tích, chuẩn bị báo cáo, gửi tóm tắt hoặc cập nhật nguồn bên ngoài. | 0 | — |
| 1.2 (—) | `flows-truy-cap-va-quyen` | Truy cập và quyền | Quyền tạo, chạy và chia sẻ Flow phụ thuộc subscription, custom quyền và xác nhận của Admin NAB. | 0 | — |
| 1.3 (—) | `flows-canh-bao-pham-vi` | Cảnh báo phạm vi | Flow do AI sinh chỉ là bản nháp — nó không kiểm chứng dữ kiện, nguồn hoặc tác động tới bước sau. | 0 | — |
| **2** (15.2) | `tao-cau-hinh-flow` | **Tạo và cấu hình một Flow** | — | — | — |
| 2.1 (—) | `tao-flow` | Tạo từ mô tả hoặc blank | Mô tả ngắn gọn mục đích, đầu vào, xử lý và kết quả. | 0 | — |
| 2.2 (—) | `cau-hinh-input-output` | Cấu hình đầu vào và kết quả | Đặt tham số đầu vào (user prompt, khoảng thời gian, ID bộ lọc), chọn nguồn (dataset, dashboard, Space, kết nối) và định dạng kết quả (text, table, chart). | 0 | — |
| 2.3 (—) | `them-logic-actions` | Thêm logic và actions | Dùng AI response, dữ liệu kết quả phân tích, condition, loop và action ghi khi cần. | 0 | — |
| **3** (15.3) | `guided-conversational-chat` | **Guided, Conversational và chạy từ chat** | — | — | — |
| 3.1 (—) | `guided-execution` | Guided execution | Hệ thống thu thập đầu vào từng bước theo form; phù hợp Flow có ràng buộc chặt, nhiều tham số hoặc kiểm tra hợp lệ phức tạp. | 0 | — |
| 3.2 (—) | `conversational-execution` | Conversational execution | User tương tác qua chat: nhập prompt, nhận câu hỏi làm rõ, điều chỉnh yêu cầu và điều chỉnh kết quả trong một luồng liên tục. | 0 | — |
| 3.3 (—) | `chay-flow-tu-chat` | Chạy Flow từ sidebar chat | Gõ lệnh hoặc mention Flow name trong chat của Space; hệ thống nhận diện ý định, map tham số và chạy Flow tương ứng. | 0 | — |
| **4** (15.4) | `automate-muc-dich-quyen` | **Quick Automate — mục đích và quyền truy cập** | — | — | — |
| 4.1 (—) | `automate-la-gi` | Automate là gì | Quick Automate cho quy trình dài hơn, khối lượng lớn, cần exception handling, HITL gate, case management và giám sát. | 0 | — |
| 4.2 (—) | `automate-truy-cap-subscription` | Truy cập và subscription | Tính năng hiển thị theo gói Quick Pro/Enterprise và quyền được cấp. | 0 | — |
| 4.3 (—) | `automate-kiem-soat` | Kiểm soát bắt buộc | Owner rõ ràng (process, system, chủ sở hữu dữ liệu), mức độ rủi ro, kiểm thử dữ liệu, UAT, phiên bản, audit log, giám sát và tài liệu hướng dẫn khôi phục. | 0 | — |
| **5** (15.5) | `cau-hinh-trigger-actions-ai-notifications` | **Cấu hình trigger, actions, AI, thông báo** | — | — | — |
| 5.1 (—) | `schedule-event-trigger` | Schedule và event trigger | Lịch chạy theo cron (time-based) hoặc event trigger (record insert, field change, external webhook). | 0 | — |
| 5.2 (—) | `actions-connector` | Actions và kết nối | Lập danh mục kết nối trước: READ/WRITE capability, phạm vi thông tin xác thực, giới hạn tài nguyên, giới hạn tần suất và người chịu trách nhiệm. | 0 | — |
| 5.3 (—) | `ai-tasks-hitl` | AI tasks và HITL | AI có thể classify, extract, generate draft hoặc propose decision — nhưng không được tự động phê duyệt, gửi hoặc ghi dữ liệu trừ khi có bước phê duyệt rõ ràng. | 0 | — |
| 5.4 (—) | `notifications-alerting` | Notifications và cảnh báo | Thiết lập thông báo lỗi, thành công, HITL pending, timeout và thông tin xác thực expiry qua email/Slack/webhook. | 0 | — |
| **6** (15.6) | `test-approve-monitor-stop-rollback` | **Kiểm thử, phê duyệt, giám sát, dừng và khôi phục** | — | — | cấp section: `10-2.png` |
| 6.1 (—) | `test-day-du` | Test đầy đủ | Chạy tình huống hoạt động bình thường, đầu vào không hợp lệ, duplicate, timeout, bị từ chối quyền, hoàn thành một phần và recovery scenario. | 0 | — |
| 6.2 (—) | `uat-approval` | UAT và phê duyệt | Kiểm thử chấp nhận của người dùng bởi người chịu trách nhiệm quy trình và người dùng đại diện. | 0 | — |
| 6.3 (—) | `version-deployment` | Phiên bản và triển khai | Commit phiên bản ổn định, gắn tag/release note. | 0 | — |
| 6.4 (—) | `monitor-operational-control` | Giám sát và kiểm soát vận hành | Theo dõi case/task queue, run success/failure rate, duration, thông tin xác thực status và kết nối health. | 0 | — |
| 6.5 (—) | `rollback-recovery` | Khôi phục phiên bản và phục hồi | Runbook chứa: cách dừng automation, revert config, dọn dẹp phần dữ liệu đã ghi dở, khôi phục phiên bản trước và thông báo người dùng bị ảnh hưởng. | 0 | — |

**Hình trong chương**

| src | Vị trí (id) | alt | caption |
|---|---|---|---|
| `quick-docs/Images/HDSD/10-1.png` | `flows-muc-dich-quyen` | Giao diện tạo Quick Flow với options từ mô tả hoặc khung trống | Hình 15.1: Giao diện tạo Quick Flow từ mô tả hoặc khung trống |
| `quick-docs/Images/HDSD/10-2.png` | `test-approve-monitor-stop-rollback` | Dashboard giám sát Quick Automate hiển thị case count, task status, run history và thông tin xác thực expiry | Hình 15.2: Dashboard giám sát Quick Automate với metrics và alerts |

**Walkthroughs (Hướng dẫn từng bước)**

1. **Flow chỉ đọc với dữ liệu giả lập** — 5 bước. Intro: Mục tiêu là chứng minh luồng không có tác động ngoài dự kiến. — *Kết quả cần kiểm chứng*: Flow tái chạy được, không tạo tác động ngoài dự kiến và đạt cả tình huống bình thường và tình huống lỗi.
2. **Flow có action hoặc lịch chạy** — 5 bước. Intro: Mọi ghi dữ liệu phải có inventory, kiểm tra hợp lệ và phê duyệt. — *Kết quả cần kiểm chứng*: Mọi ghi dữ liệu có phê duyệt/audit và chạy lặp không tạo bản ghi trùng.
3. **Vòng đời Quick Automate** — 6 bước. Intro: Áp dụng SDLC rút gọn nhưng đầy đủ bằng chứng. — *Kết quả cần kiểm chứng*: Version, môi trường, người chịu trách nhiệm, kiểm thử/UAT, giám sát và khôi phục đều truy vết được; Critical/High bằng 0.

**Controls (Rủi ro và biện pháp kiểm soát)** — trang render thêm callout cố định "Nguyên tắc dừng" ở đầu mục này.

1. Tách đọc/ghi và dùng bước phê duyệt của con người với nội dung không tin cậy.
2. Service thông tin xác thực phải quyền tối thiểu, xoay vòng và có người chịu trách nhiệm.
3. Kiểm thử idempotency/dedup; retry có giới hạn và không nhân đôi tác động.
4. Không bật lịch chạy khi chưa xác nhận timezone, đầu vào, auth và cấu hình xác nhận.
5. Bắt buộc có run/case/task metrics, log, alert và correlation ID phù hợp.

**FAQs** (8)

1. **Flow khác Automate?** → Flow cho tác vụ ngắn cá nhân/nhóm; Automate cho quy trình enterprise tập trung và điều khiển nâng cao.
2. **Có thể ghi thẳng hệ thống từ kết quả AI?** → Không trước kiểm tra hợp lệ, phê duyệt và UAT; ghi dữ liệu cần kiểm soát riêng.
3. **Schedule có tự xác nhận action?** → Tùy cấu hình; NAB mặc định giữ confirmation cho ghi dữ liệu trừ khi có phê duyệt rủi ro riêng.
4. **Ai được chia sẻ/phê duyệt Flow?** → Người có subscription, custom quyền và vai trò phê duyệt phù hợp trong quy trình NAB.
5. **Có kiểm thử trực tiếp môi trường chính thức?** → Không. Dùng kiểm thử target/Môi trường kiểm thử trước UAT.
6. **Xử lý lỗi thế nào?** → Phân loại business/system exception, retry tạm thời có giới hạn, HITL/compensation và dừng khi cần.
7. **Vì sao lịch chạy dừng?** → Kiểm tra kết nối auth, phiên bản, chia sẻ/delete, Region và run history; không tự đổi thông tin xác thực prod.
8. **Go-live cần gì?** → Owner, risk kiểm tra, quyền tối thiểu, kiểm thử/UAT, phiên bản, giám sát, stop và tài liệu hướng dẫn khôi phục.

**Sources** (5)

1. Using Amazon Quick Flows — <https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-flows.html>
2. Schedules in Quick Flows — <https://docs.aws.amazon.com/quick/latest/userguide/schedules-in-quick-flows.html>
3. Using Amazon Quick Automate — <https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-automate.html>
4. Testing automations — <https://docs.aws.amazon.com/quick/latest/userguide/testing-automations.html>
5. Deploying automations — <https://docs.aws.amazon.com/quick/latest/userguide/deploying-automations.html>

---

## 3. Ảnh minh họa

### 3.1 Bảng ảnh

Kích thước lấy bằng `file` (không có `identify`). Cột “Nội dung thực tế” là mô tả sau khi mở từng ảnh; cột “Khớp?” so sánh với alt/caption trên web. Tên ảnh HDSD `x-y.png` tương ứng placeholder “Hình x.y” trong `huong_dan_amazon_quick.docx` (docx chỉ có ô “[ Chèn ảnh chụp màn hình tại đây ]”, ảnh được chụp riêng).

| Ảnh | Kích thước | Dùng ở (chương · section/subsection id) | Caption trên web | Alt trên web | Nội dung thực tế ảnh | Khớp? | Mô tả “Hình” trong docx |
|---|---|---|---|---|---|---|---|
| `Homepage/1.png` | 1919×916 | **UNUSED** (không được tham chiếu ở bất kỳ đâu) | — | — | Trang Home: sidebar, nút “Private mode” góc phải, “All set. Let's go.”, ô chat với dropdown Quick / All data / Smart, 4 nút Research/Document/Presentation/Visual. Thanh trạng thái lộ URL `us-east-1.quicksight.aws.amazon.com/sn/account/nab-quick-poc/start/home` | — | Bản lớn của “Hình 1: Giao diện chính (Home)” trong `huong_dan_giaodien_amazon_quick.docx` (docx nhúng bản 580×276) |
| `Homepage/2.png` | 312×280 | **UNUSED** | — | — | Menu More: Automations, Connectors, Knowledge, Extensions, Scenarios, Stories, Customize navigation | — | Cùng kích thước với “Hình 2: Menu More” nhúng trong docx giao diện (md5 khác nhau) |
| `HDSD/2-1.png` | 1919×1079 | ch12 · `buoc-tao-space` | Hình 12.1: Danh sách Spaces và nút tạo Space mới | Giao diện Spaces hiển thị danh sách spaces hiện có và nút Create Space | Trang Spaces trống (“Create your first space”), nút Create space, bộ lọc Recents/Created by me/Favorites/Shared with me/All | Có (nhưng danh sách trống) | 2.1 Trang Spaces |
| `HDSD/2-2.png` | 1590×901 | ch12 · `them-files` | Hình 12.2: Thêm files vào Space | Giao diện thêm files vào Space với nút upload và danh sách files hiện có | Hộp thoại **“Create your space”** (What are you working on? / What are you trying to achieve?) | **KHÔNG** — là form tạo Space, không phải thêm files | 2.2 Form Create Space |
| `HDSD/2-3.png` | 1639×712 | ch12 · `them-datasets-dashboards` | Hình 12.3: Datasets và Dashboards trong Space | Giao diện quản lý datasets và dashboards trong Space | “Test Space” trống, menu **Add**: Create folder / Add knowledge / Upload files / Upload folder; nút Share | **Một phần** — không thấy dataset/dashboard nào | 2.3 Bên trong Space (tab Files, Dashboards, Datasets, Members) |
| `HDSD/2-4.png` | 1587×476 | ch12 · `them-topics-members` | Hình 12.4: Quản lý members và quyền trong Space | Giao diện quản lý members trong Space với danh sách members và quyền truy cập | Danh sách **files** trong Space (return-policy.pdf, electronics_manual.pdf, Status “Processing”, Added by **[username test]**) | **KHÔNG** — là danh sách files, không có members/quyền; lộ username | 2.4 Tab Files trong Space |
| `HDSD/3-1.png` | 1919×1079 | ch13 · `ket-noi-source` | Hình 13.1: Kết nối nguồn dữ liệu và chọn SPICE/Direct Query | Màn hình New dataset … danh sách nguồn dữ liệu types: Athena, Redshift, S3, Upload file và các kết nối | Trang **Data** trống với tab Datasets / Topics / Data sources và nút “Create dataset”; lộ URL `…/account/nab-quick-poc/…` | **KHÔNG** — không có danh sách loại nguồn, không có SPICE/Direct Query | 3.1 Trang Create Dataset (danh sách loại nguồn) |
| `HDSD/3-2.png` | 1919×1079 | ch13 · `chuan-bi-dataset` | Hình 13.2: Dataset editor — join, trường tính toán và dữ liệu types | Dataset editor với các columns, trường tính toán, join relationships và dữ liệu type settings | Trình chuẩn bị dữ liệu dạng Steps (TRANSFORM/OUTPUT) cho `employee_data.csv`, bước “Change data type 1”, panel Add calculated columns/Join/Filter/Pivot… | Gần khớp (không thấy join đang dùng) | 3.2 Data Preparation |
| `HDSD/4-1.png` | 1919×1079 | ch13 · `tao-analysis-autograph` | Hình 13.3: Tạo Analysis với AutoGraph và bộ lọc | Analysis editor với AutoGraph gợi ý biểu đồ types, field wells, và bộ lọc panel | **Danh sách Analyses** (1 dòng “employee_data.csv analysis”), nút “Generate analysis” và “Create analysis” | **KHÔNG** — không phải editor | 4.1 New Analysis (chọn dataset) |
| `HDSD/4-2.png` | 1919×1079 | ch13 · `visuals-sheets` | Hình 13.4: Analysis với biểu đồ, sheets và tham số | Analysis với nhiều biểu đồ, sheets tabs và parameter controls | Analysis editor với hộp thoại **“New sheet”** (Interactive sheet / Pixel-Perfect report), panel Visuals, dữ liệu SPICE | **Một phần** — không có nhiều biểu đồ/tham số | 4.2 Analysis workspace + AutoGraph |
| `HDSD/4-3.png` | 1919×1079 | ch13 · `share-analysis` | Hình 13.5: Chia sẻ Analysis với đồng nghiệp | Share Analysis dialog với user list, permission dropdown (Owner/Đồng sở hữu/Viewer) và nút Send invitation | Analysis editor đã có “Employee Overview Dashboard” (KPI 5K, cột theo phòng ban, donut attrition); thấy thanh bookmark trình duyệt | **KHÔNG** — không có hộp thoại Share | 4.3 Filter pane |
| `HDSD/5-1.png` | 1919×1079 | ch13 · `publish-dashboard` | Hình 13.6: Xuất bản Dashboard từ Analysis | Publish dashboard dialog với tên Dashboard, description, sheet selection và chia sẻ quyền | Hộp thoại **Publish dashboard**: Dashboard name, Select sheets, Add notes, *Enable Quick actions* (cảnh báo “Actions are not applicable to any visuals based on datasets with RLS/CLS rules enabled”), *Allow executive summary*, *Allow data Q&A*, *Allow sharing stories/scenarios* | Khớp phần lớn — nhưng không có bước “chia sẻ quyền”; các tùy chọn AI không được web nhắc | 5.1 Publish Dashboard |
| `HDSD/5-2.png` | 1919×1079 | ch13 · `share-embed-dashboard` | Hình 13.7: Chia sẻ Dashboard — người dùng/nhóm, embed và email theo lịch | Dashboard với chia sẻ options: thêm người dùng/nhóm, embed code, và email theo lịch settings | Dashboard đã xuất bản “Employee Dashboard”, thanh công cụ (icon share/schedule/…), nút “Analyze this dashboard in a Scenario”, “Create” | **Một phần** — không mở menu share/embed/email | 5.2 Dashboard đã xuất bản |
| `HDSD/6-1.png` | 1919×1079 | ch14 · `tao-scenario-steps` | Hình 14.1: Tạo Scenario với nguồn dữ liệu và mục tiêu phân tích | Giao diện Scenarios với nguồn dữ liệu selector, mục tiêu đầu vào box và vùng phân tích do AI đề xuất | Scenario “Data to insights”: pane Data (Find Data / Upload File), prompt tiếng Việt về hiệu suất nhân viên, “Start a thread” với 5 gợi ý; “Review responses for accuracy” | Khớp | 6.1 Canvas Scenarios |
| `HDSD/8-1.png` | 1919×1079 | ch12 · `cau-hinh-persona` | Hình 12.5: Tạo Custom Chat Agent và cấu hình persona | Giao diện tạo Custom Chat Agent với các trường cấu hình persona, name, description | “Configure chat agent” — Agent persona/Instructions, Reference documents (“up to 10 documents of .pdf, .txt, .html, .md, .csv, .doc or .docx … up to 100k characters”), Knowledge sources + “Link spaces”, preview bên phải | Khớp | 8.2 Form Create Agent (Persona, Reference Documents, Spaces, Action Connectors) |
| `HDSD/8-2.png` | 1919×1079 | ch12 · `them-spaces-actions` | Hình 12.6: Thêm Spaces và Actions cho Custom Agent | Giao diện cấu hình Spaces và Actions cho Custom Agent | **Trang danh sách Chat agents** (template Incident Manager/Content Strategist/Team Coordinator/Research Analyst; agent “My Assistant Agent” và “Quick (Default)”) | **KHÔNG** — không có cấu hình Spaces/Actions | 8.1 Trang Chat Agents (danh sách) |
| `HDSD/9-1.png` | 1919×1079 | ch14 · `approve-plan` | Hình 14.2: Kiểm tra và phê duyệt kế hoạch Research | kế hoạch Research dialog với danh sách nguồn, các bước, thời gian dự kiến estimate và Approve/Reject buttons | Form **New research**: Research objective, Research mode: Fast, Web search (Preferred/Avoid websites), File uploads, Quick assets; nút “Review plan”/“Start researching”; lời chào “[lời chào kèm tên người dùng]” | **KHÔNG** — là form tạo, chưa có kế hoạch/Approve/Reject; lộ tên người dùng | 9.1 Trang tạo Research |
| `HDSD/9-2.png` | 1919×1079 | ch14 · `verify-citations` | Hình 14.3: Kiểm chứng trích dẫn — mở nguồn, check author/date/bối cảnh | kết quả Research với inline trích dẫn, trích dẫn panel hiển thị nguồn URL, author, date và excerpt | Research “AI Ethics in Banking…” **đang chạy 10%**, banner “will take about 5-10 minutes”, danh sách research tasks và website (cfainstitute, forbes, garp, eba, fsb, dbs) | **KHÔNG** — không có panel trích dẫn | 9.2 Research plan (Confirm/Edit) |
| `HDSD/9-3.png` | 1880×905 | ch14 · `edit-export-research` | Hình 14.4: Biên tập và xuất kết quả Research | Research editor với biên tập controls, xuất dữ liệu options (PDF/Markdown/DOCX) và chia sẻ settings | Báo cáo hoàn chỉnh (tiếng Việt) có trích dẫn số; menu Share: Share research / **Download PDF / Download Word** / Add to space; nút Summarize, Rate report, ô comment | Gần khớp — không có Markdown | 9.3 Báo cáo Research hoàn chỉnh + Export |
| `HDSD/10-1.png` | 1015×666 | ch15 · `flows-muc-dich-quyen` (cấp section) | Hình 15.1: Giao diện tạo Quick Flow từ mô tả hoặc khung trống | Giao diện tạo Quick Flow với options từ mô tả hoặc khung trống | “Create workflows for everyday tasks”: ô mô tả (0/10000), “Create a blank flow”, “Generate”, sample prompts (Jira, Slack, RFP…) | Khớp | 10.1 Trang Flows (danh sách) |
| `HDSD/10-2.png` | 1919×1079 | ch15 · `test-approve-monitor-stop-rollback` (cấp section) | Hình 15.2: Dashboard giám sát Quick Automate với metrics và alerts | Dashboard giám sát Quick Automate hiển thị case count, task status, run history và thông tin xác thực expiry | **Flow editor** “Báo Cáo Hàng Ngày Tự Động” (Draft), các bước text input, lỗi “Action connector required”, banner “enterprise guardrails” | **KHÔNG** — không phải Quick Automate, không phải dashboard giám sát | 10.2 Flow builder |

Tổng: 21 PNG; 19 ảnh HDSD đều được dùng đúng 1 lần; 2 ảnh Homepage **không dùng**. Ảnh khớp rõ: 2-1, 6-1, 8-1, 10-1 (+ 3-2, 5-1, 9-3 gần khớp). **Ảnh lệch caption/alt: 2-2, 2-4, 3-1, 4-1, 4-3, 8-2, 9-1, 9-2, 10-2** (lệch một phần: 2-3, 4-2, 5-2). Nhiều caption web lại trùng với mô tả của một ảnh *khác* trong docx (ví dụ caption của 9-1 thực ra là nội dung ảnh docx 9.2) → dấu hiệu gán ảnh bị lệch một bậc. Không có ảnh nào cho: ch11 (toàn chương), Private Mode, chat controls, Quick Automate, Hình 11.1 (Automation) của docx, members/permissions của Space, Share Analysis, Research plan.

### 3.2 Đối chiếu với hai tài liệu Word nguồn

Cả hai docx **không chứa bất kỳ nội dung đặc thù NAB nào** (0 lần xuất hiện “NAB”/“Nam A”); toàn bộ nội dung kiểm soát NAB trên website do người biên soạn bổ sung. `huong_dan_amazon_quick.docx` ghi “Phạm vi tài liệu: 12 tính năng chính … Dựa trên: Amazon QuickSight / Quick Platform”; mục lục đánh số không khớp thân bài (mục lục: 7. Scenarios, 9. Chat Agents, 10. Research, 11. Flows, 12. Automations, 13. SPICE, 14. Tổng kết; thân bài: 6, 8, 9, 10, 11, 12, 13). `huong_dan_giaodien_amazon_quick.docx` ghi “Phiên bản: 1.0 — 2025”.

**`huong_dan_amazon_quick.docx` (HDSD)**

| Mục docx | Nội dung chính | Website | Ghi chú thiếu/lệch |
|---|---|---|---|
| 1. Giới thiệu | Quick là AI workspace; 12 tính năng | ch11 `summary` | — |
| 2. Spaces (2.1 bảng; 2.2 tạo; 2.3 quản lý files) | 100 files/Space; định dạng Word, Excel, PowerPoint, PDF, CSV, TXT, RTF, JSON, YAML, XML, HTML, Outlook message; **không hỗ trợ tải ảnh lên Space**; agent truy vấn Space tại runtime; liên kết Space với custom agent | ch12 §12.1–12.3 | Web không nêu danh sách định dạng Space và quy tắc “không hỗ trợ ảnh” |
| 3. Datasets & Data Sources (3.1 bảng loại nguồn; 3.2 tạo; 3.3 SPICE vs DQ) | MySQL, PostgreSQL, SQL Server, Oracle, Redshift, S3, Athena, RDS, Aurora, Snowflake, CSV/Excel/JSON/TSV, SaaS (Salesforce, Jira, ServiceNow, HubSpot); đường dẫn “My stuff → Create dataset” | ch13 §13.1–13.3 | Web chỉ liệt kê Athena, Redshift, RDS, S3, Upload; web dùng “Data → New dataset” |
| 4. Analyses (4.1 bảng loại biểu đồ; 4.2 tạo; 4.3 chia sẻ) | Bar/Line/Pie/Scatter/Pivot/KPI; filter value, top/bottom N, relative dates; Co-author qua Share → Invite | ch13 §13.4–13.5 | Bảng loại biểu đồ và loại filter không có trên web |
| 5. Dashboards (5.1; 5.2) | Read-only, viewer lọc + **snapshots**; quyền chia sẻ “xem, xuất (export), chia sẻ lại” | ch13 §13.6 | Web thêm embed/email theo lịch (không có trong docx); thiếu snapshots, “chia sẻ lại” |
| 6. Scenarios (6.1; 6.2) | “More → My stuff → Scenarios”; panel gợi ý AI | ch14 §14.1–14.2 | Khớp |
| 8. Chat Agents (8.1 bảng thành phần; 8.2 tạo; 8.3 best practices) | Persona Instructions; Reference Documents “tối đa 10 files, **50 MB tổng**, giới hạn 100K ký tự”; Spaces; Action Connectors; bảng best practice Persona vs Reference vs Spaces | ch12 §12.4–12.5 | Web ghi “10 files, **50 MB/file**”, bỏ “100K ký tự”; bảng best practice không có |
| 9. Quick Research (9.1 bảng nguồn; 9.2 hướng dẫn; 9.3 use cases) | Web/Spaces/Files/Dashboards; 3 cách truy cập: sidebar Research, nút Research dưới ô chat, yêu cầu agent trong chat; 7–10 phút; use case “Đánh giá tuân thủ”, “Lập kế hoạch chiến lược” | ch14 §14.3–14.5 | Web nêu 3 cách khác (sidebar, More, menu ngữ cảnh Spaces); bảng use case không có |
| 10. Flows (10.1 bảng loại bước; 10.2 tạo; 10.3 use cases) | AI Responses / Flow Logic / Data Insights / Actions / User Input; “More → Flows → Create flow”; Guided vs Conversational; chạy từ chat footer; use cases RFP, onboarding, phê duyệt nội dung, leads | ch15 §15.1–15.3 | Bảng loại bước + use cases không có; mô tả Guided khác (docx: “từng bước có xác nhận”) |
| 11. Automations (11.1; 11.2) | “More → Flows → Create automation”; trigger lịch/sự kiện; chế độ test; Hình 11.1 | ch15 §15.4–15.6 (“Quick Automate”) | Web viết lại thành Quick Automate cấp enterprise (Pro/Enterprise, staging/prod, case management) — **không có trong docx**; không có ảnh 11-1 |
| 12. SPICE Engine (12.1–12.3) | “Manage Quick → SPICE capacity”; mua thêm hoặc chuyển Direct Query | ch13 §13.3, §13.7 | Web dùng “QuickSight settings → SPICE capacity”, thêm ngưỡng “usage > 80%” |
| 13. Tổng kết (13.1 bảng 12 tính năng; 13.2 lộ trình người dùng mới) | Gồm **ML Insights** (Analysis → Add insight) và **Stories** | — | **Không có trên web** (ML Insights hoàn toàn vắng; Stories chỉ nhắc 1 dòng ở ch11) |

**`huong_dan_giaodien_amazon_quick.docx` (Giao diện)**

| Mục docx | Website | Ghi chú |
|---|---|---|
| 1. Giới thiệu | ch11 `summary` | — |
| 2. Thanh Header; 2.1 Private Mode | ch11 §11.2.1, §11.3 | Docx: “có thể bật/tắt bất kỳ lúc nào trong cài đặt tài khoản”; web chỉ nói bật từ header. Web thêm §11.3.2 (Conversation history/Training/Retention/Memory) không có trong docx |
| 3. Thanh điều hướng bên trái (bảng 15 mục) | ch11 §11.4 | Web gộp My folders/Shared folders; mô tả Apps rút gọn |
| 4. Khu vực chính; 4.1 Chat Input Box | ch11 §11.2.3, §11.5 | Docx gọi “All data” là “Knowledge setting”; web hiển thị thành “All dữ liệu” |
| 5. Output Format Buttons | ch11 §11.6 | Khớp |
| 6. Menu More | ch11 §11.7 | Khớp; docx có thêm “ẩn/hiện các mục, sắp xếp lại” cho Customize navigation |
| Hình 1 (Home), Hình 2 (More) | **Không dùng** | Tương ứng `Homepage/1.png`, `Homepage/2.png` |

## 4. Nội dung đặc thù NAB — BẮT BUỘC GIỮ ở giai đoạn 2

> Trích nguyên văn theo **bản hiển thị trên website** (sau `normalizeCopy`). Đường dẫn trường theo cấu trúc `content-quick.js` (`chNN.<field>`); chuỗi gốc trong file nguồn có thể còn từ tiếng Anh (vd. `approval`, `write`, `data owner`) — tra cùng đường dẫn trong file nguồn để thấy chuỗi gốc. Mỗi trích dẫn đã được script kiểm tra là chuỗi con chính xác của trường tương ứng. “*(trích một phần)*” = chỉ lấy câu mang nội dung NAB từ một trường dài.

### 4.0 Nội dung cố định do build-site.js chèn (không nằm trong content-quick.js)

- Callout **“Nguyên tắc dừng”** (đầu mục “Rủi ro và biện pháp kiểm soát” của mọi chương, `tools/build-site.js:800`): “Nếu không xác định được quyền dữ liệu, tính năng được phép, nguồn kiểm chứng hoặc người chịu trách nhiệm cuối, hãy dừng thao tác và liên hệ Khối CNTT/đơn vị kiểm soát.”
- Dòng **Mã nguồn kiểm soát** (`renderSources`): “Mã nguồn kiểm soát: NAB-AQ-001, NAB-AQ-002, VEN-AQ-001” cho cả 5 chương 11–15 (`sourceIdsByChapter`, `tools/build-site.js:412–436`).
- Ghi chú nguồn (`renderSources`): “Nguồn của nhà cung cấp hoặc nguồn chuyên môn được truy cập ngày 19/08/2026. Liên kết ngoài chỉ được mở khi người dùng chủ động chọn và có kết nối Internet phù hợp.”
- Hộp trạng thái đầu trang hiển thị `statusLabel` + `statusText` (class `status-notice`, vì `kind: "live"`).
- Trang chủ (`renderHome`) — khối Amazon Quick: eyebrow “Đang sử dụng tại NAB”; mô tả “Tổng quan và giao diện, Spaces và Chat Agents, Dữ liệu/Analyses/Dashboards, Scenarios/Quick Research, Quick Flows & Automate.” và 5 nguyên tắc (“Đúng công cụ”, “Đúng dữ liệu”, “Đúng quyền”, “Có kiểm chứng”, “Con người chịu trách nhiệm”).
- Ràng buộc QA liên quan: `qa/check-release.py` bắt buộc chuỗi “Đang sử dụng tại NAB” có trong chương 04–15 (dòng 341–344) và khóa SHA-256 của `tools/content-quick.js` (dòng 45, 337–339: “Amazon Quick content must remain unchanged”); `qa/release-checklist.md:31` yêu cầu giữ nguyên 5 tên menu: “Tổng quan và giao diện Amazon Quick”, “Spaces và Chat Agents”, “Dữ liệu, Analyses và Dashboards”, “Scenarios và Quick Research”, “Quick Flows & Automate”.

### 4.1 Quyền & vai trò

- “Có tài khoản/SSO NAB, MFA và role/subscription được cấp; không dùng root user hoặc tài khoản cá nhân.” — `ch11.prerequisites[0]`
- “Sử dụng tài khoản name, Region, URL/SSO, vai trò và kênh hỗ trợ do CNTT cung cấp.” — `ch11.prerequisites[2]`
- “Đăng nhập đúng tài khoản/role NAB, xác nhận ngữ cảnh và phát hiện quyền bất thường.” — `ch11.objectives[0]`
- “Đăng nhập qua portal/SSO NAB, xác nhận đúng tài khoản/region/role và menu được cấp.” — `ch11.useCases[0].text`
- “Chỉ dùng portal/SSO do NAB công bố. Xác nhận tài khoản, Region, role và menu trước khi thao tác.” — `ch11.guideSections[0].intro`
- “Mở portal/SSO NAB; không dùng link lạ hoặc màn hình tự đăng ký.” — `ch11.guideSections[0].subsections[0].steps[0]`
- “Hoàn tất MFA và kiểm tra tài khoản, Region cùng hồ sơ người dùng.” — `ch11.guideSections[0].subsections[0].steps[1]`
- “Đối chiếu role và menu đang thấy với feature matrix đã phê duyệt.” — `ch11.guideSections[0].subsections[0].steps[2]`
- “Kiểm tra asset mặc định không nằm ngoài phạm vi công việc.” — `ch11.guideSections[0].subsections[0].steps[3]`
- “Nếu sai tài khoản, thiếu menu hoặc quyền quá rộng, dừng thao tác và gửi ticket kèm ảnh đã che dữ liệu nhạy cảm.” — `ch11.guideSections[0].subsections[0].steps[4]`
- “Các tính năng trong More hiển thị theo role, subscription và Region của người dùng.” — `ch11.guideSections[6].subsections[0].items[7].text`
- “Các định dạng đầu ra có thể khác theo phiên bản và subscription được cấp.” — `ch11.guideSections[5].subsections[0].items[4].text`
- “Chỉ đăng nhập qua tài khoản NAB; không tự tạo Free/Plus hoặc dùng root user cho công việc thường ngày.” — `ch11.controls[0]`
- “Quyền kỹ thuật nhìn thấy asset không thay thế phê duyệt mục đích sử dụng.” — `ch11.controls[1]`
- “Các mục trong More (Automations, Connectors, Knowledge, Extensions, Scenarios, Stories) phụ thuộc vào role, subscription và region. Gửi ticket nếu thiếu menu đã được phê duyệt.” — `ch11.faqs[2][1]`
- “Áp dụng quyền tối thiểu sharing — chỉ chia sẻ với người cần và permission tối thiểu.” — `ch12.objectives[3]`
- “Kiểm soát quyền truy cập agent và Space theo chính sách NAB.” — `ch12.objectives[4]`
- “Có tài khoản/role NAB với quyền tạo Space và Chat Agent.” — `ch12.prerequisites[0]`
- “Chỉ chia sẻ Space/agent với người cần, permission tối thiểu và kiểm tra access định kỳ.” — `ch12.useCases[3].text`
- “áp dụng quyền tối thiểu: chỉ mời người cần và chỉ cấp quyền tối thiểu (Viewer/Contributor/Owner). Rà soát quyền truy cập định kỳ và xóa members không còn cần.” *(trích một phần)* — `ch12.guideSections[2].subsections[2].body`
- “Chỉ bật actions cần thiết và chỉ cấp quyền tối thiểu trên kết nối.” — `ch12.guideSections[4].subsections[1].items[3].text`
- “Cấp quyền tối thiểu: Viewer nếu chỉ cần đọc, Contributor nếu cần biên tập, Owner chỉ cho người quản trị.” — `ch12.guideSections[5].subsections[0].steps[1]`
- “Rà soát quyền truy cập định kỳ (ít nhất quarterly) — xóa members không còn làm việc trên dự án.” — `ch12.guideSections[5].subsections[0].steps[2]`
- “Ghi log: ai được access, khi nào, lý do gì — lưu hồ sơ làm việc để audit.” — `ch12.guideSections[5].subsections[0].steps[3]`
- “Thêm thành viên: mời user/group, cấp quyền tối thiểu (Viewer/Contributor/Owner).” — `ch12.walkthroughs[0].steps[4]`
- “Ghi log: ai được access, khi nào, lý do gì — lưu hồ sơ làm việc.” — `ch12.walkthroughs[0].steps[5]`
- “Space có tài nguyên đầy đủ, members có quyền phù hợp và access log được ghi nhận.” — `ch12.walkthroughs[0].verify`
- “Cấp quyền tối thiểu: Viewer nếu chỉ cần đọc, Contributor nếu cần biên tập, Owner chỉ cho người quản trị.” — `ch12.controls[1]`
- “Rà soát quyền truy cập định kỳ (ít nhất quarterly) — xóa members không còn làm việc trên dự án.” — `ch12.controls[2]`
- “Người có role và quyền tạo shared resources; gửi yêu cầu hỗ trợ nếu không thấy nút Create.” — `ch12.faqs[5][1]`
- “NAB đang sử dụng Amazon Quick cho dữ liệu, Analyses và Dashboards. Chỉ sử dụng nguồn, quyền truy cập và kết nối được cấp.” — `ch13.statusText`
- “Bảo đảm nguồn dữ liệu, SPICE capacity, RLS/CLS và kết nối phù hợp với phạm vi được cấp.” — `ch13.prerequisites[0]`
- “Owner có thể revoke access bất kỳ lúc nào.” — `ch13.guideSections[4].subsections[0].steps[4]`
- “Chủ sở hữu Dashboard hoặc quản trị viên có thể giới hạn các điều khiển của người xem. Không tìm cách bỏ qua cơ chế kiểm soát — yêu cầu người chịu trách nhiệm cấp quyền nếu cần.” — `ch13.faqs[4][1]`
- “Dashboard viewer controls (xuất dữ liệu, bộ lọc, drill-down) có thể bị restrict; không tìm cách bỏ qua cơ chế kiểm soát.” — `ch13.controls[4]`
- “Admin theo dõi capacity usage, lịch chạy refresh và allocate capacity cho datasets ưu tiên.” *(trích một phần)* — `ch13.guideSections[6].intro`
- “Kiểm tra Dataset refresh history, error logs và nguồn dữ liệu connectivity. Notify admin/người chịu trách nhiệm; không tự retry hoặc thay đổi configuration.” — `ch13.faqs[7][1]`
- “Chỉ sử dụng Scenarios, Research, tìm kiếm web, upload, Space/dashboard và kết nối được cấp quyền.” — `ch14.prerequisites[0]`
- “Điều kiện truy cập: (1) User có quyền truy cập datasets/Spaces làm đầu vào. (2) Scenarios được bật cho tài khoản. (3) Không bỏ qua cơ chế kiểm soát RLS/CLS — Scenarios vẫn tuân theo quyền dữ liệu.” *(trích một phần)* — `ch14.guideSections[0].subsections[1].body`
- “Không; Scenarios tuân theo quyền dữ liệu. Nếu user không có quyền trên dataset, không tạo được Scenario từ dataset đó.” — `ch14.faqs[6][1]`
- “Không mặc định cho mọi tài khoản; chỉ sử dụng khi giao diện cho phép và không đưa dữ liệu nội bộ vào truy vấn web.” — `ch14.faqs[7][1]`
- “NAB đang sử dụng Quick Flows và Automate. Chỉ dùng quyền tạo, chạy, chia sẻ, kết nối và lịch chạy được cấp.” — `ch15.statusText`
- “Quyền tạo, chạy và chia sẻ Flow phụ thuộc subscription, custom quyền và xác nhận của Admin NAB. Least privilege: chỉ cấp quyền đọc trừ khi tình huống sử dụng yêu cầu ghi dữ liệu và đã có phê duyệt riêng. Connector bên thứ ba cần inventory về phạm vi, thông tin xác thực và giới hạn rate.” — `ch15.guideSections[0].subsections[1].body`
- “Tính năng hiển thị theo gói Quick Pro/Enterprise và quyền được cấp. Quy trình tự động hóa trong môi trường chính thức không được tự đăng ký kết nối hoặc tự phân quyền.” — `ch15.guideSections[3].subsections[1].body`
- “Người có subscription, custom quyền và vai trò phê duyệt phù hợp trong quy trình NAB.” — `ch15.faqs[3][1]`
- “Service thông tin xác thực phải quyền tối thiểu, xoay vòng và có người chịu trách nhiệm.” — `ch15.controls[1]`

### 4.2 Dữ liệu & phân loại (gồm Private Mode, bộ nhớ, lưu giữ)

- “Dữ liệu đã phân loại; chỉ chọn dashboard, dataset, Space, kho kiến thức và kết nối được duyệt.” — `ch11.prerequisites[1]`
- “Web, upload và kết nối mặc định không dùng cho đến khi feature matrix xác nhận.” — `ch11.controls[2]`
- “Conversation/memory/retention không thay thế chính sách dữ liệu NAB.” — `ch11.controls[4]`
- “Tắt ghi nhớ và truy xuất bộ nhớ khi thảo luận nội dung nhạy cảm.” — `ch11.useCases[2].text`
- “Trải nghiệm không có bộ nhớ, phù hợp khi thảo luận nội dung nhạy cảm.” — `ch11.guideSections[2].subsections[0].items[2].text`
- “Khi sử dụng Private Mode, cần lưu ý các nội dung sau:” — `ch11.guideSections[2].subsections[1].body`
- “Hệ thống có ghi lịch sử cuộc trò chuyện hay không.” — `ch11.guideSections[2].subsections[1].items[0].text`
- “Nội dung có được gửi để huấn luyện mô hình hay không.” — `ch11.guideSections[2].subsections[1].items[1].text`
- “Chính sách và thời gian lưu giữ dữ liệu được áp dụng như thế nào.” — `ch11.guideSections[2].subsections[1].items[2].text`
- “Không đọc và không ghi nội dung vào bộ nhớ hội thoại.” — `ch11.guideSections[2].subsections[1].items[3].text`
- “Kiểm tra trạng thái conversation history, training và memory được hiển thị trong Private Mode.” — `ch11.walkthroughs[1].steps[1]`
- “Không tải tệp nếu chưa rõ chế độ xử lý hoặc phạm vi lưu giữ dữ liệu.” — `ch11.walkthroughs[1].steps[4]`
- “Private Mode không sử dụng và không truy xuất bộ nhớ đã lưu. Người dùng vẫn phải tuân thủ phân loại dữ liệu và quyền truy cập.” — `ch11.faqs[0][1]`
- “Theo hướng dẫn: 30 ngày; nội dung vẫn phải tuân thủ chính sách dữ liệu NAB.” — `ch11.faqs[4][1]`
- “NAB đang sử dụng Spaces và Chat Agents. Chỉ thêm dữ liệu đã được phê duyệt và chia sẻ theo quyền tối thiểu.” — `ch12.statusText`
- “Files, datasets, dashboards đã được phân loại và phê duyệt.” — `ch12.prerequisites[1]`
- “Reference documents cho custom agent đã được chủ sở hữu dữ liệu xác nhận.” — `ch12.prerequisites[2]`
- “Chỉ thêm files đã được phân loại và chủ sở hữu dữ liệu phê duyệt.” *(trích một phần)* — `ch12.guideSections[2].subsections[0].body`
- “RLS/CLS vẫn áp dụng — Space không bỏ qua cơ chế kiểm soát quyền dữ liệu.” *(trích một phần)* — `ch12.guideSections[2].subsections[1].body`
- “Chỉ thêm tài liệu đã được chủ sở hữu dữ liệu phê duyệt.” — `ch12.guideSections[4].subsections[0].items[3].text`
- “Reference documents trong agent: chỉ thêm documents được phân loại phù hợp và chủ sở hữu dữ liệu đã phê duyệt.” — `ch12.guideSections[5].subsections[0].steps[5]`
- “Upload files hoặc link files từ My stuff — chỉ thêm files đã được phân loại và phê duyệt.” — `ch12.walkthroughs[0].steps[2]`
- “Link datasets và dashboards có sẵn — xác nhận RLS/CLS vẫn áp dụng.” — `ch12.walkthroughs[0].steps[3]`
- “Thêm reference documents (tối đa 10 files, 50 MB/file theo hướng dẫn) — chỉ thêm documents đã được chủ sở hữu dữ liệu phê duyệt.” — `ch12.walkthroughs[1].steps[3]`
- “Reference documents trong agent: chỉ thêm documents được phân loại phù hợp và chủ sở hữu dữ liệu đã phê duyệt.” — `ch12.controls[3]`
- “Có. Space không bỏ qua cơ chế kiểm soát quyền dữ liệu — members truy cập datasets/dashboards theo quyền của họ trên tài nguyên gốc.” — `ch12.faqs[1][1]`
- “Không. Agent đối chiếu nguồn/retrieval với documents mỗi lần trả lời, không fine-tune hay training lâu dài.” — `ch12.faqs[7][1]`
- “Data Owner duyệt phạm vi dữ liệu; ATTT duyệt thông tin xác thực, kết nối, Region và embed/xuất dữ liệu settings.” — `ch13.prerequisites[1]`
- “Có định nghĩa KPI, metadata, grain và số liệu đối soát đã được phê duyệt.” — `ch13.prerequisites[2]`
- “Hai người thấy số khác có thể do RLS/CLS, group membership, bộ lọc hoặc refresh timing.” — `ch13.controls[1]`
- “Data Owner duyệt phạm vi nguồn; ATTT duyệt kết nối, Region và mô hình ACL.” — `ch14.prerequisites[1]`
- “Chỉ dùng dữ liệu đã được phân loại và phê duyệt.” — `ch14.prerequisites[2]`
- “Nghiên cứu nguồn công khai hoặc nguồn nội bộ được duyệt, tạo báo cáo có trích dẫn và đối chiếu với nguồn.” — `ch14.useCases[1].text`
- “Thêm nguồn dữ liệu nếu cần phân tích giữa nhiều Dataset (tuân theo phê duyệt và ACL).” — `ch14.guideSections[1].subsections[1].steps[2]`
- “Chỉ sử dụng các nguồn được cấp quyền như web, Spaces, file đã tải lên hoặc kết nối.” *(trích một phần)* — `ch14.guideSections[2].subsections[0].note`
- “Research có thể dùng một hoặc nhiều nguồn (nếu giữa các phạm vi được duyệt): (1) **Web search** — web công khai, domain lọc, khoảng thời gian. Yêu cầu phê duyệt riêng vì outbound traffic và crawler footprint. (2) **Spaces** — kho kiến thức, files, topics đã lập chỉ mục. ACL áp dụng — Research chỉ truy cập được nguồn user có quyền. (3) **Uploads** — file do người dùng tải lên phát sinh. Files vẫn cần phân loại dữ liệu và không được chứa sensitive dữ liệu chưa duyệt. (4) **Dashboards** — Research có thể truy vấn dashboards để tổng hợp số liệu/xu hướng; tuân theo RLS/CLS.” — `ch14.guideSections[3].subsections[0].body`
- “Chỉ chọn các nguồn web, Spaces, file đã tải lên hoặc kết nối đã được cấp quyền.” — `ch14.guideSections[3].subsections[0].steps[0]`
- “Chọn nguồn tối thiểu cần thiết — không chọn toàn bộ Spaces và dashboards vì tiện.” — `ch14.guideSections[3].subsections[0].steps[1]`
- “Nếu kết hợp web với nội bộ, xác nhận việc kết hợp dữ liệu giữa các phạm vi đã được duyệt.” — `ch14.guideSections[3].subsections[0].steps[2]`
- “Tải file lên nơi lưu trữ đã được NAB phê duyệt trước khi dùng trong Research (không tải trực tiếp dữ liệu nhạy cảm).” — `ch14.guideSections[3].subsections[0].steps[4]`
- “Không đưa dữ liệu nhạy cảm NAB vào từ khóa tìm kiếm/mục tiêu.” — `ch14.guideSections[3].subsections[1].steps[2]`
- “Tạo research báo cáo từ web — không đưa dữ liệu nhạy cảm NAB vào từ khóa tìm kiếm.” — `ch14.walkthroughs[1].intro`
- “Chọn tìm kiếm web (nếu được duyệt); thêm domain ưu tiên/tránh nếu phù hợp.” — `ch14.walkthroughs[1].steps[1]`
- “Tổng hợp từ Spaces/dashboards — chỉ dùng nguồn và đối tượng đọc đã được Data Owner phê duyệt.” — `ch14.walkthroughs[2].intro`
- “Xác nhận Spaces/dashboards và người nhận kết quả với Data Owner.” — `ch14.walkthroughs[2].steps[0]`
- “Chọn tối thiểu nguồn cần thiết — không chọn toàn bộ Spaces vì tiện.” — `ch14.walkthroughs[2].steps[1]`
- “Không kết hợp web với nội bộ nếu giữa các phạm vi chưa duyệt.” — `ch14.walkthroughs[2].steps[2]`
- “Không kết hợp web với nội bộ nếu việc kết hợp dữ liệu giữa các phạm vi chưa được ATTT/Data Owner duyệt.” — `ch14.controls[3]`
- “Không mặc định cho mọi tài khoản; chỉ sử dụng khi giao diện cho phép và không đưa dữ liệu nội bộ vào truy vấn web.” — `ch14.faqs[7][1]`
- “Tình huống sử dụng có người chịu trách nhiệm quy trình, người chịu trách nhiệm hệ thống, chủ sở hữu dữ liệu, mức độ rủi ro và kiểm thử dữ liệu.” — `ch15.prerequisites[0]`
- “Tách thông tin xác thực kiểm thử/prod, không nhúng secret trong prompt, tài liệu hoặc flow.” — `ch15.prerequisites[2]`
- “Không tách thông tin xác thực kiểm thử/prod chung, không nhúng secret trong prompt hoặc tài liệu.” *(trích một phần)* — `ch15.guideSections[3].subsections[2].body`

### 4.3 Chia sẻ / Export

- “Chỉ chia sẻ Space/agent với người thực sự cần — không chia sẻ công khai hoặc 'just in case'.” — `ch12.guideSections[5].subsections[0].steps[0]`
- “Chỉ chia sẻ Space/agent với người thực sự cần — không chia sẻ công khai hoặc 'just in case'.” — `ch12.controls[0]`
- “Không khuyến khích. Chỉ chia sẻ với internal người dùng/nhóm theo chính sách NAB.” — `ch12.faqs[6][1]`
- “Chia sẻ agent với team nếu cần — áp dụng quyền tối thiểu.” — `ch12.walkthroughs[1].steps[6]`
- “Viewer không biên tập được — chỉ xem, bộ lọc và xuất dữ liệu (nếu được phép).” *(trích một phần)* — `ch13.guideSections[5].intro`
- “Không chia sẻ public — chỉ chia sẻ nội bộ NAB với users có quyền.” *(trích một phần)* — `ch13.guideSections[5].subsections[1].body`
- “Viewer controls: Dashboard viewers có thể bộ lọc, drill-down, xuất dữ liệu (nếu xuất dữ liệu được bật).” — `ch13.guideSections[5].subsections[1].steps[3]`
- “File xuất dữ liệu là bản sao mới và cần được phân loại, label và kiểm soát như dữ liệu gốc.” — `ch13.walkthroughs[1].intro`
- “Xác nhận người nhận, mục đích sử dụng, phân loại dữ liệu và quyền xuất dữ liệu.” — `ch13.walkthroughs[1].steps[0]`
- “Chọn format: PDF cho dashboard overview, CSV/Excel cho dữ liệu phân tích (nếu xuất dữ liệu được bật).” — `ch13.walkthroughs[1].steps[1]`
- “Kiểm tra đúng bộ lọc, sheets, kỳ, columns và không có fields thừa hoặc sensitive dữ liệu không được phép.” — `ch13.walkthroughs[1].steps[2]`
- “Không bật macro/external links; lưu ý CSV injection risk nếu dữ liệu chứa formulas.” — `ch13.walkthroughs[1].steps[3]`
- “Lưu vào kho NAB, gắn nhãn phân loại và chỉ chia sẻ với người dùng/nhóm được phép; không dùng liên kết công khai.” — `ch13.walkthroughs[1].steps[4]`
- “File/link có người chịu trách nhiệm, recipients, nhãn phân loại dữ liệu và dấu vết kiểm tra.” — `ch13.walkthroughs[1].verify`
- “Không xuất dữ liệu hoặc chia sẻ Dashboard công khai; chỉ chia sẻ nội bộ NAB với người dùng/nhóm được phê duyệt.” — `ch13.controls[3]`
- “Dashboard thường xuất dữ liệu PDF. CSV/Excel áp dụng cho individual biểu đồ nếu xuất dữ liệu được bật bởi người chịu trách nhiệm.” — `ch13.faqs[3][1]`
- “Không; chỉ dùng kênh và recipients được NAB phê duyệt. Export files cần nhãn phân loại dữ liệu và dấu vết kiểm tra.” — `ch13.faqs[6][1]`
- “Lưu Scenario; có thể chia sẻ với đồng nghiệp (Owner/Đồng sở hữu/Viewer quyền).” — `ch14.guideSections[1].subsections[1].steps[4]`
- “Xuất vào kho NAB được phép, gắn nhãn phân loại dữ liệu và cấp quyền đúng đối tượng đọc. Không gửi nguyên văn AI kết quả cho các bên liên quan — luôn có người kiểm tra kiểm chứng và chịu trách nhiệm nội dung.” *(trích một phần)* — `ch14.guideSections[4].subsections[2].body`
- “Lưu vào kho NAB, gắn nhãn phân loại dữ liệu.” — `ch14.guideSections[4].subsections[2].steps[3]`
- “Chia sẻ với đúng người dùng/nhóm — không liên kết công khai, không email cá nhân.” — `ch14.guideSections[4].subsections[2].steps[4]`
- “Kết quả Research/Scenarios là dữ liệu mới và cần phân loại: (1) Xuất vào kho NAB được phép, không lưu máy cá nhân/ổ lưu trữ cá nhân. (2) Gắn nhãn phân loại dữ liệu theo dữ liệu nguồn nhạy cảm nhất. (3) Chia sẻ với đúng người dùng/nhóm — không liên kết công khai. (4) Ghi dấu vết kiểm tra: ai tạo, ai kiểm tra, ai nhận, mục đích. (5) Không bỏ qua cơ chế kiểm soát ACL — không tạo bản sao bỏ quyền chỉ để chia sẻ rộng hơn.” — `ch14.guideSections[5].subsections[1].body`
- “Kiểm chứng trích dẫn, check phiên bản, quyền; xuất dữ liệu vào kho NAB, cấp quyền đúng đối tượng đọc (không rộng hơn nguồn).” — `ch14.walkthroughs[2].steps[4]`
- “Mỗi nhận định truy ngược được nguồn/phiên bản; xuất dữ liệu không bỏ qua cơ chế kiểm soát ACL nguồn.” — `ch14.walkthroughs[2].verify`
- “Kết quả Research/Scenarios là dữ liệu mới — cần nhãn phân loại dữ liệu, ACL và dấu vết kiểm tra.” — `ch14.controls[4]`
- “Không bỏ qua cơ chế kiểm soát RLS/CLS bằng cách xuất dữ liệu rồi chia sẻ rộng hơn — xuất dữ liệu vẫn tuân theo nguồn ACL.” — `ch14.controls[5]`
- “Không; xuất dữ liệu vào kho NAB, gắn nhãn phân loại dữ liệu và chia sẻ với đúng người dùng/nhóm trong môi trường được phép.” — `ch14.faqs[5][1]`
- “Lưu phiên bản ổn định; chỉ chia sẻ đúng user/group và qua kiểm tra nếu tenant yêu cầu.” — `ch15.walkthroughs[0].steps[4]`
- “đối chiếu chéo nhận định quan trọng với tối thiểu hai nguồn độc lập; biên tập kết quả, thêm lưu ý về giới hạn; xuất dữ liệu vào kho NAB.” — `ch14.walkthroughs[1].steps[4]`

### 4.4 Tự động hoá, Action & phê duyệt

- “không chạy Action ngoài ý muốn” *(trích một phần)* — `ch11.useCases[1].text`
- “Tách tác vụ đọc khỏi hành động ghi; mọi ghi dữ liệu cần phê duyệt và kiểm soát riêng.” — `ch11.controls[3]`
- “Chỉ thực hiện khi chat và nguồn tương ứng được tenant bật.” — `ch11.walkthroughs[0].intro`
- “Chọn đúng resource NAB; tắt tìm kiếm web nếu tình huống sử dụng không cần hoặc chưa được phép.” — `ch11.walkthroughs[0].steps[0]`
- “Chỉ đưa vào tài liệu sau khi người kiểm tra nghiệp vụ xác nhận; không chạy Action trong bước đọc.” — `ch11.walkthroughs[0].steps[4]`
- “Không. Apps là prototype ứng dụng web tương tác, không mặc nhiên là hệ thống môi trường chính thức. Apps chỉ xuất hiện trong bản đồ điều hướng; hướng dẫn chi tiết không chứa quy trình Apps.” — `ch11.faqs[6][1]`
- “Apps chỉ xuất hiện trong bản đồ điều hướng chương này; hướng dẫn chi tiết không chứa quy trình Apps.” *(trích một phần)* — `ch11.guideSections[3].subsections[0].items[6].text`
- “Connector và integration actions đã được IT security phê duyệt (nếu agent cần thực hiện hành động bên ngoài).” — `ch12.prerequisites[3]`
- “Kết nối agent với Salesforce, Jira, ServiceNow qua kết nối — agent có thể đọc và thực hiện hành động (cần phê duyệt và quyền tối thiểu).” — `ch12.useCases[2].text`
- “(3) Kết nối hành động — agent đọc/ghi Salesforce, Jira, ServiceNow qua kết nối (cần phê duyệt).” *(trích một phần)* — `ch12.guideSections[3].subsections[0].body`
- “Agent có thể đọc records, tạo tickets hoặc cập nhật trạng thái; cần IT Security phê duyệt trước khi bật.” — `ch12.guideSections[4].subsections[1].items[2].text`
- “Custom agent có actions: phải có phê duyệt riêng từ IT security, kiểm thử kỹ trước môi trường chính thức, theo dõi usage và revoke ngay khi phát hiện hành vi bất thường.” — `ch12.guideSections[5].subsections[0].steps[4]`
- “Custom agent có actions: phải có phê duyệt riêng từ IT security, kiểm thử kỹ trước môi trường chính thức, theo dõi usage.” — `ch12.controls[4]`
- “Kiểm tra kết nối được bật — nếu agent kết nối Salesforce, Jira, ServiceNow và có quyền ghi, cần phê duyệt và giám sát riêng.” — `ch12.faqs[4][1]`
- “Action kết nối mặc định không dùng trong phân tích/nghiên cứu.” — `ch14.prerequisites[3]`
- “Flow hoặc automation do AI sinh chỉ là bản nháp. Hành động ghi vào môi trường chính thức cần người chịu trách nhiệm, quyền tối thiểu, UAT, phê duyệt, logging và khôi phục.” — `ch15.summary`
- “Thiết kế bước phê duyệt của con người cho ghi dữ liệu/lịch chạy.” — `ch15.objectives[1]`
- “Feature, role, Region, kết nối, phê duyệt/HITL đã được xác nhận.” — `ch15.prerequisites[1]`
- “Tách Generate/Review khỏi Save/Send/Write; giữ phê duyệt trước hành động hệ quả.” — `ch15.useCases[2].text`
- “Flow do AI sinh chỉ là bản nháp — nó không kiểm chứng dữ kiện, nguồn hoặc tác động tới bước sau. Validation, testing và phê duyệt là nghĩa vụ của người chịu trách nhiệm. Không bật lịch chạy ghi dữ liệu hoặc chia sẻ rộng khi chưa qua kiểm soát.” — `ch15.guideSections[0].subsections[2].body`
- “Dùng AI response, dữ liệu kết quả phân tích, condition, loop và action ghi khi cần. Mọi ghi dữ liệu phải có kiểm tra hợp lệ trước, dùng kiểm thử target, và bật xác nhận của con người trừ khi có phê duyệt gate riêng. Flow chỉ đọc không cần confirmation; Flow có action hoặc lịch chạy bắt buộc kiểm tra.” — `ch15.guideSections[1].subsections[2].body`
- “Mọi action ghi dữ liệu vẫn cần confirmation/phê duyệt.” *(trích một phần)* — `ch15.guideSections[2].subsections[1].body`
- “không giả định AI luôn ánh xạ đúng đối tượng.” *(trích một phần)* — `ch15.guideSections[2].subsections[2].body`
- “Owner rõ ràng (process, system, chủ sở hữu dữ liệu), mức độ rủi ro, kiểm thử dữ liệu, UAT, phiên bản, audit log, giám sát và tài liệu hướng dẫn khôi phục.” *(trích một phần)* — `ch15.guideSections[3].subsections[2].body`
- “Lịch chạy theo cron (time-based) hoặc event trigger (record insert, field change, external webhook). Bắt buộc có timezone, đầu vào mặc định, người phụ trách dự phòng và kiểm tra thời hạn xác thực. Không bật lịch chạy khi chưa kiểm thử idempotency và cấu hình xác nhận.” — `ch15.guideSections[4].subsections[0].body`
- “Lập danh mục kết nối trước: READ/WRITE capability, phạm vi thông tin xác thực, giới hạn tài nguyên, giới hạn tần suất và người chịu trách nhiệm. Hành động ghi dữ liệu phải có kiểm tra hợp lệ, dùng đích kiểm thử, log đầy đủ và compensation/khôi phục nếu lỗi. Không gọi ghi dữ liệu vào môi trường chính thức trong giai đoạn kiểm thử.” — `ch15.guideSections[4].subsections[1].body`
- “AI có thể classify, extract, generate draft hoặc propose decision — nhưng không được tự động phê duyệt, gửi hoặc ghi dữ liệu trừ khi có bước phê duyệt rõ ràng. HITL (có người tham gia kiểm soát) cho High/Critical risk: AI draft, con người kiểm tra, phê duyệt rồi mới commit. Việc phân công tác vụ, escalation và timeout đều cần cấu hình rõ.” — `ch15.guideSections[4].subsections[2].body`
- “Chạy tình huống hoạt động bình thường, đầu vào không hợp lệ, duplicate, timeout, bị từ chối quyền, hoàn thành một phần và recovery scenario. Xác nhận retry không nhân đôi ghi dữ liệu, hết hạn xác thực được xử lý và lỗi cuối không để case/task treo. Môi trường kiểm thử tách, có dữ liệu đại diện và thông tin xác thực không dùng chung prod.” — `ch15.guideSections[5].subsections[0].body`
- “Kiểm thử chấp nhận của người dùng bởi người chịu trách nhiệm quy trình và người dùng đại diện. Xác nhận kết quả đúng, thông báo kịp thời, việc phân công HITL hoạt động đúng và khôi phục có thể thực thi. Cần bộ phận rủi ro hoặc ATTT phê duyệt nếu quy trình tự động hóa ghi vào hệ thống nhạy cảm hoặc môi trường chính thức.” — `ch15.guideSections[5].subsections[1].body`
- “Commit phiên bản ổn định, gắn tag/release note. Map prod config và thông tin xác thực (quyền tối thiểu, rotated). Deploy rồi mới bật trigger; không rollout ngầm. Có smoke kiểm thử ngay sau deploy.” — `ch15.guideSections[5].subsections[2].body`
- “Theo dõi case/task queue, run success/failure rate, duration, thông tin xác thực status và kết nối health. Khi lỗi: dừng trigger ngay, cô lập tác động ngoài dự kiến (ví dụ: đánh dấu case/task đã xử lý để tránh re-run), investigate nguyên nhân gốc và khôi phục theo tài liệu hướng dẫn vận hành. Không tự retry vô hạn hoặc tự restart khi chưa khắc phục lỗi.” — `ch15.guideSections[5].subsections[3].body`
- “Runbook chứa: cách dừng automation, revert config, dọn dẹp phần dữ liệu đã ghi dở, khôi phục phiên bản trước và thông báo người dùng bị ảnh hưởng. Test tài liệu hướng dẫn vận hành trong UAT; không để đến incident mới viết lần đầu.” — `ch15.guideSections[5].subsections[4].body`
- “Viết mục đích, đầu vào, xử lý, kết quả và tuyên bố không gọi action ghi.” — `ch15.walkthroughs[0].steps[0]`
- “Flow tái chạy được, không tạo tác động ngoài dự kiến và đạt cả tình huống bình thường và tình huống lỗi.” — `ch15.walkthroughs[0].verify`
- “Mọi ghi dữ liệu phải có inventory, kiểm tra hợp lệ và phê duyệt.” — `ch15.walkthroughs[1].intro`
- “Với lịch chạy, điền đầu vào mặc định và giữ confirmation cho ghi dữ liệu trừ khi có duyệt riêng.” — `ch15.walkthroughs[1].steps[3]`
- “Mọi ghi dữ liệu có phê duyệt/audit và chạy lặp không tạo bản ghi trùng.” — `ch15.walkthroughs[1].verify`
- “Commit phiên bản, UAT, map prod config/thông tin xác thực, deploy rồi mới bật trigger.” — `ch15.walkthroughs[2].steps[4]`
- “Monitor case/task/log; khi lỗi dừng trigger, cô lập tác động ngoài dự kiến và khôi phục theo tài liệu hướng dẫn vận hành.” — `ch15.walkthroughs[2].steps[5]`
- “Version, môi trường, người chịu trách nhiệm, kiểm thử/UAT, giám sát và khôi phục đều truy vết được; Critical/High bằng 0.” — `ch15.walkthroughs[2].verify`
- “Tách đọc/ghi và dùng bước phê duyệt của con người với nội dung không tin cậy.” — `ch15.controls[0]`
- “Kiểm thử idempotency/dedup; retry có giới hạn và không nhân đôi tác động.” — `ch15.controls[2]`
- “Không bật lịch chạy khi chưa xác nhận timezone, đầu vào, auth và cấu hình xác nhận.” — `ch15.controls[3]`
- “Bắt buộc có run/case/task metrics, log, alert và correlation ID phù hợp.” — `ch15.controls[4]`
- “Không trước kiểm tra hợp lệ, phê duyệt và UAT; ghi dữ liệu cần kiểm soát riêng.” — `ch15.faqs[1][1]`
- “Tùy cấu hình; NAB mặc định giữ confirmation cho ghi dữ liệu trừ khi có phê duyệt rủi ro riêng.” — `ch15.faqs[2][1]`
- “Không. Dùng kiểm thử target/Môi trường kiểm thử trước UAT.” — `ch15.faqs[4][1]`
- “Kiểm tra kết nối auth, phiên bản, chia sẻ/delete, Region và run history; không tự đổi thông tin xác thực prod.” — `ch15.faqs[6][1]`
- “Owner, risk kiểm tra, quyền tối thiểu, kiểm thử/UAT, phiên bản, giám sát, stop và tài liệu hướng dẫn khôi phục.” — `ch15.faqs[7][1]`
- “(4) Thực hiện hành động qua kết nối (cần phê duyệt).” *(trích một phần)* — `ch12.faqs[2][1]`

### 4.5 Kiểm chứng

- “Prompt nêu KPI, kỳ, đơn vị, bộ lọc và yêu cầu không suy đoán.” — `ch11.walkthroughs[0].steps[1]`
- “Mở Sources; nếu có Explanation, kiểm tra nguồn, bộ lọc, giả định, phép tính và SQL được tạo.” — `ch11.walkthroughs[0].steps[2]`
- “Đối chiếu ít nhất một tổng hoặc mẫu với dashboard/nguồn gốc.” — `ch11.walkthroughs[0].steps[3]`
- “Citation mở được, phép tính khớp định nghĩa KPI và không có hành động ghi ngoài ý muốn.” — `ch11.walkthroughs[0].verify`
- “Test agent với sample questions — xác nhận đối chiếu nguồn và trích dẫn đúng.” — `ch12.walkthroughs[1].steps[5]`
- “Agent trả lời đúng persona, đối chiếu nguồn với references và không hallucinate.” — `ch12.walkthroughs[1].verify`
- “Không suy ra định nghĩa KPI chỉ từ title của biểu đồ — cần tài liệu định nghĩa đã duyệt.” — `ch13.walkthroughs[0].intro`
- “Mở KPI definition đã được business người chịu trách nhiệm phê duyệt; ghi tử số, mẫu số, grain, timezone và exclusions.” — `ch13.walkthroughs[0].steps[0]`
- “Kiểm tra biểu đồ title, tooltip, bộ lọc, aggregation và số liệu đối soát; đối chiếu với nguồn mẫu.” — `ch13.walkthroughs[0].steps[1]`
- “Nếu có chat/Q&A, đặt câu hỏi với bộ lọc/kỳ cụ thể để kiểm chứng calculation.” — `ch13.walkthroughs[0].steps[2]`
- “Mở Explanation (nếu có) và kiểm tra nguồn truy vấn, bộ lọc, giả định và SQL/calculation logic.” — `ch13.walkthroughs[0].steps[3]`
- “Business người kiểm tra xác nhận number trước khi số liệu vào báo cáo hoặc quyết định.” — `ch13.walkthroughs[0].steps[4]`
- “Có hồ sơ làm việc chỉ ra nguồn, definition, control total và cách tái tạo con số.” — `ch13.walkthroughs[0].verify`
- “SPICE datasets có thể outdated nếu refresh fails; theo dõi refresh status và lịch chạy.” — `ch13.controls[0]`
- “Sai grain, logic kết nối dữ liệu hoặc calculated field definition có thể làm cách tổng hợp sai; kiểm chứng với dữ liệu dictionary và số liệu đối soát.” — `ch13.controls[2]`
- “AI Explanation không thay thế business kiểm tra — người kiểm tra vẫn chịu trách nhiệm kiểm chứng định nghĩa và số liệu.” — `ch13.controls[5]`
- “Kiểm tra RLS/CLS rules, group membership, applied bộ lọc và SPICE refresh timing. Ghi lại đủ bốn yếu tố và báo Dashboard người chịu trách nhiệm.” — `ch13.faqs[0][1]`
- “Không; Explanation làm rõ nguồn truy vấn, bộ lọc và calculation logic, nhưng người kiểm tra nghiệp vụ vẫn phải kiểm chứng definition, số liệu đối soát và hồ sơ làm việc.” — `ch13.faqs[5][1]`
- “Ngăn prompt injection, nguồn cũ và phụ thuộc quá mức vào AI kết quả.” — `ch14.objectives[3]`
- “Luôn mở nguồn gốc, kiểm tra phạm vi và đối chiếu độc lập — không chấp nhận kết quả AI khi chưa kiểm chứng.” — `ch14.useCases[2].text`
- “Kết quả phân tích của AI không thay thế đánh giá nghiệp vụ — luôn kiểm chứng số liệu, định nghĩa và giả định.” — `ch14.guideSections[1].subsections[1].note`
- “Kiểm tra kế hoạch, sửa phạm vi và loại trừ nguồn không cần trước khi phê duyệt. Nếu kế hoạch quá rộng hoặc bao gồm nguồn chưa duyệt, từ chối và điều chỉnh mục tiêu.” — `ch14.guideSections[4].subsections[0].note`
- “(4) đối chiếu chéo — đối chiếu kết luận quan trọng với tối thiểu hai nguồn độc lập.” *(trích một phần)* — `ch14.guideSections[4].subsections[1].body`
- “Citation không bảo đảm nhận định đúng — luôn kiểm chứng nguồn gốc.” — `ch14.guideSections[4].subsections[1].note`
- “Ghi ngày truy cập, bất đồng và giới hạn vào hồ sơ làm việc.” — `ch14.guideSections[4].subsections[1].steps[4]`
- “Kết quả Research và Scenarios đều cần kiểm chứng: kiểm tra định nghĩa, số liệu đối soát, trích dẫn và giả định. không chấp nhận kết quả AI khi chưa kiểm chứng.” — `ch14.guideSections[5].intro`
- “Trước khi dùng kết quả: (1) Có mục tiêu rõ ràng? (2) Nguồn có chính thống và còn cập nhật? (3) Trích dẫn có thực sự hỗ trợ nhận định? (4) Có đối chiếu chéo bằng nguồn độc lập? (5) Có lưu ý về giới hạn về phạm vi, mốc thời gian dữ liệu và giới hạn? (6) Có người kiểm tra chịu trách nhiệm kiểm chứng?” — `ch14.guideSections[5].subsections[0].body`
- “Iterate: điều chỉnh mục tiêu, thêm bộ lọc, drill-down — nhưng không chấp nhận số liệu mà chưa kiểm chứng.” — `ch14.walkthroughs[0].steps[3]`
- “Lưu Scenario; chia sẻ với người kiểm tra; họ kiểm chứng định nghĩa và số liệu đối soát trước khi dùng kết quả phân tích.” — `ch14.walkthroughs[0].steps[4]`
- “Scenario có tài liệu định nghĩa cho KPIs, số liệu đối soát khớp với nguồn và người kiểm tra xác nhận.” — `ch14.walkthroughs[0].verify`
- “Báo cáo có mục tiêu, danh mục nguồn, ngày truy cập, giới hạn và người kiểm tra.” — `ch14.walkthroughs[1].verify`
- “gợi ý của AI (Scenarios) và trích dẫn (Research) không thay thế kiểm chứng — người kiểm tra vẫn chịu trách nhiệm kiểm chứng định nghĩa, số liệu đối soát và nhận định.” — `ch14.controls[0]`
- “kế hoạch Research có thể bao gồm nguồn ngoài phạm vi — kiểm tra và điều chỉnh trước phê duyệt.” — `ch14.controls[1]`
- “Trích dẫn có thể chỉ khớp một phần hoặc bị diễn giải sai — luôn đọc đầy đủ ngữ cảnh và đối chiếu chéo.” — `ch14.controls[2]`
- “Không; trích dẫn có thể chỉ khớp một phần hoặc bị diễn giải sai. Luôn mở nguồn, đọc bối cảnh, kiểm tra độ tin cậy của nguồn và đối chiếu chéo độc lập.” — `ch14.faqs[2][1]`
- “Không; kết quả cần người kiểm tra kiểm chứng, biên tập, thêm lưu ý về giới hạn và xác nhận trước khi dùng.” — `ch14.faqs[3][1]`
- “Không; từ chối kế hoạch và điều chỉnh mục tiêu. Kế hoạch rộng tốn thời gian, nguồn và có thể bao gồm dữ liệu ngoài phạm vi.” — `ch14.faqs[4][1]`
- “Luôn ghi mốc thời gian dữ liệu trong báo cáo.” *(trích một phần)* — `ch14.faqs[1][1]`
- “Trước khi Research được thực thi, AI đề xuất kế hoạch (nguồn, các bước, kết quả dự kiến). sau khi hoàn tất, kiểm chứng từng trích dẫn và biên tập kết quả trước xuất dữ liệu.” — `ch14.guideSections[4].intro`
- “Loại bỏ các nhận định không kiểm chứng được hoặc từ nguồn yếu.” — `ch14.guideSections[4].subsections[2].steps[1]`

### 4.6 Khác (trạng thái, owner, ví dụ NAB, giới hạn)

- “Đang sử dụng tại NAB” — `ch11.statusLabel`
- “NAB đang sử dụng Amazon Quick. Hãy dùng đúng tài khoản, Region, role, subscription và các tính năng được cấp.” — `ch11.statusText`
- “Người dùng NAB đã được cấp quyền Amazon Quick” — `ch11.audience`
- “Chủ biên / SME Amazon Quick” — `ch11.owner`
- “NAB đang sử dụng Scenarios và Quick Research. Chỉ dùng nguồn, tìm kiếm web, upload, kho kiến thức và kết nối được cấp quyền.” — `ch14.statusText`
- “Mô tả vai trò, tone và hành vi mong muốn. Ví dụ: 'Bạn là chuyên viên phân tích tài chính cấp cao tại NAB. Hãy trả lời chính xác, dẫn nguồn và không suy đoán.'” — `ch12.guideSections[4].subsections[0].items[0].text`
- “Đặt tên agent mô tả vai trò (ví dụ: 'NAB Financial Policy Expert').” — `ch12.walkthroughs[1].steps[1]`
- “Tuân thủ giới hạn theo hướng dẫn: 100 files/Space và 10 reference files, 50 MB/file cho agent.” — `ch12.controls[5]`
- “Viết persona chi tiết: vai trò, tone, hành vi (ví dụ: 'Bạn là chuyên viên phân tích tài chính cấp cao tại NAB. Hãy trả lời chính xác, dẫn nguồn và không suy đoán.').” — `ch12.walkthroughs[1].steps[2]`
- “Admin vào QuickSight settings → SPICE capacity → xem total capacity, used capacity và available capacity. Nếu usage > 80%, cân nhắc xóa datasets không dùng, chuyển sang Direct Query, hoặc mua thêm capacity.” — `ch13.guideSections[6].subsections[0].body`
- Ghi chú: `eyebrow` = `statusLabel` = “Đang sử dụng tại NAB”, `audience` = “Người dùng NAB đã được cấp quyền Amazon Quick”, `owner` = “Chủ biên / SME Amazon Quick”, `kind` = `live`, `sourceDate` = “19/08/2026” — **giống hệt nhau ở cả 5 chương 11–15**.

## 5. Nhận xét nhanh

### 5.1 Cấu trúc và đặt tên

1. **Tên file lệch chủ đề ở 4/5 chương**: `chapter-12-amazon-quick-sight.html` = Spaces & Chat Agents; `chapter-13-amazon-quick-research-index.html` = Datasets/Analyses/Dashboards; `chapter-14-amazon-quick-flows-automate.html` = Scenarios & Quick Research; `chapter-15-amazon-quick-apps.html` = Quick Flows & Automate. Các slug này bị khóa trong `qa/check-release.py` (dòng 28–32) và được dùng cho pager/nav/index → đổi tên cần sửa đồng bộ.
2. **Không có nội dung Apps** dù có file `…-amazon-quick-apps.html`: Apps chỉ xuất hiện ở ch11 (`sidebar-map` và FAQ “Apps có phải là hệ thống chính thức?”), kèm câu tự thừa nhận “hướng dẫn chi tiết không chứa quy trình Apps”.
3. **Đăng nhập chỉ có khung chung**: ch11 §1 “Đăng nhập và xác nhận đúng ngữ cảnh” có 5 bước nhưng không có URL/portal thật, tên SSO, Region cụ thể, kênh ticket hay ảnh — toàn bộ là placeholder ngữ nghĩa (“portal/SSO NAB”, “kênh hỗ trợ do CNTT cung cấp”). Ảnh thực tế cho thấy account `nab-quick-poc` tại `us-east-1`.
4. Trường `toc` trong dữ liệu là “code chết” (TOC thật sinh từ `guideSections`) và còn bị `normalizeCopy` làm hỏng id (`kết quả`, `datasets-dữ liệu-nguồn`, `spice-vs-direct-truy vấn`…) vì regex loại trừ `/\.toc\.\d+\.0$/` không khớp đường dẫn bắt đầu bằng `toc.` (không có dấu chấm đầu). ch15 không có `toc`; subsections ch15 dùng `heading` thay vì `title` và không có `number`; ch13 §13.1 không có subsection.
5. Trường `number` (11.1, 12.3.2…) không được render; trang đánh số lại 1., 2., … trong khi caption ảnh dùng “Hình 12.x/13.x…”.

### 5.2 Ngôn ngữ (Anh/Việt lẫn lộn và lỗi do normalizeCopy)

6. **Nhãn giao diện bị dịch sai** do regex thay từ: “Dropdown 'All dữ liệu'” (UI thật: *All data*), “Analyses → New phân tích” (UI: *Create analysis*), “Đồng sở hữu” (UI/docx: *Co-author/Co-owner*), “Viewer quyền”, “dữ liệu warehouses”, “nguồn dữ liệu type”, “dữ liệu types”, “sensitive dữ liệu”, “tài khoản name”, “các kết quả shortcuts”, “AI kết quả”, “Data thời gian thực (theo thời gian thực)”. Người dùng sẽ không tìm thấy các nhãn này trên màn hình.
7. **Câu bắt đầu bằng chữ thường** sau khi thay: “kết quả Research có trích dẫn…”, “kế hoạch Research dialog…”, “sau khi hoàn tất, kiểm chứng…”, “không chấp nhận kết quả AI…”, “gợi ý của AI (Scenarios)…”, “đối chiếu chéo nhận định…”.
8. **Câu nửa Anh nửa Việt** còn rất nhiều: “Upload files trực tiếp vào Space hoặc link files…”, “Add trường tính toán”, “Change dữ liệu types”, “Apply row-level bộ lọc”, “Drag fields vào Dimensions/Measures/Filters”, “Send invitation; … revoke access”, “Iterate — … explore related chiều dữ liệu”, “Least privilege sharing”, “Best practices và least-privilege sharing”, “Chat controls”, “Output shortcuts”, “SPICE versus Direct Query”, “(ít nhất quarterly)”, “không hallucinate”, “exception handling, HITL gate, case management”.
9. **Lỗi nghĩa**: ch15 `guideSections[3].subsections[2].body` “Không tách thông tin xác thực kiểm thử/prod chung” (nguồn gốc: “Không tách credential test/prod chung”) — câu ngược/khó hiểu, ý định có lẽ là “không dùng chung thông tin xác thực kiểm thử/prod” (mâu thuẫn với `prerequisites[2]` “Tách thông tin xác thực kiểm thử/prod”). ch13 FAQ “Dashboard thường xuất dữ liệu PDF” cũng là câu lỗi do thay từ.

### 5.3 Ảnh chụp

10. **9/19 ảnh HDSD gán sai caption/alt** (2-2, 2-4, 3-1, 4-1, 4-3, 8-2, 9-1, 9-2, 10-2) và 3 ảnh khớp một phần (2-3, 4-2, 5-2) — xem 3.1. Nghiêm trọng nhất: `10-2.png` (Flow editor bản nháp) được chú thích là “Dashboard giám sát Quick Automate…”; `4-3.png` (editor dashboard) chú thích là hộp thoại Share; `2-4.png` (danh sách files) chú thích là quản lý members/quyền.
11. **Chương thiếu ảnh**: ch11 không có ảnh nào (2 ảnh `Homepage/*.png` đã có sẵn nhưng không dùng); ch15 chỉ 2 ảnh, phần Quick Automate (§15.4–15.6), trigger/HITL/notifications không có ảnh thật; ch13 §13.3, §13.7; ch14 §14.1, §14.3, §14.4, §14.6; ch12 §12.1, §12.4, §12.6.
12. **Dữ liệu nhận dạng trong ảnh** (trái quy tắc “che … email, ID…” của sổ nguồn): tên account `nab-quick-poc` ở mọi ảnh, URL đầy đủ `us-east-1.quicksight.aws.amazon.com/sn/account/nab-quick-poc/…` (`Homepage/1.png`, `3-1.png`), username `[username test]` (`2-4.png`), lời chào “[lời chào kèm tên người dùng]” (`9-1.png`), thanh bookmark trình duyệt (`4-3.png`). Dữ liệu mẫu `employee_data.csv` (lương, attrition) — cần xác nhận là dữ liệu giả lập.
13. Account trong ảnh là **POC** (`nab-quick-poc`), trong khi mọi chương ghi “Đang sử dụng tại NAB” → cần SME xác nhận ảnh có đại diện môi trường chính thức không.

### 5.4 Khẳng định chưa được NAB xác minh / giống văn bản vendor

14. Toàn bộ trạng thái “Đang sử dụng tại NAB” và các câu “NAB đang sử dụng …” dựa vào NAB-AQ-001/002 đang ở trạng thái **Cần bổ sung**, ma trận tính năng ch11–15 **Chờ xác nhận** — theo chính quy tắc sổ nguồn thì chưa đủ điều kiện ghi “được phép tại NAB”.
15. Số liệu giới hạn lấy từ tài liệu giao diện, ghi “theo hướng dẫn”, chưa xác minh trên tenant: 20 files/cuộc trò chuyện, 50 MB/file, 100 files/Space, Recents 30 ngày, Research 7–10 phút (ảnh `9-2.png` hiển thị “about 5-10 minutes”), reference docs “10 files, 50 MB/file” (docx: “50 MB tổng, 100K ký tự”; UI `8-1.png`: “up to 10 documents … up to 100k characters”, định dạng .pdf/.txt/.html/.md/.csv/.doc/.docx).
16. Nội dung mang tính vendor/generic, không có trong docx và không có bằng chứng NAB: “Quick Pro/Enterprise” (ch15 §15.4), triển khai qua staging/production, case management, dashboard vận hành Quick Automate; ngưỡng SPICE “usage > 80%” và đường dẫn “QuickSight settings → SPICE capacity” (docx: “Manage Quick → SPICE capacity”); vai trò Space “Viewer/Contributor/Owner” (ảnh chỉ thấy nút Share); embed iframe/SDK, email theo lịch PDF/CSV; xuất Research “markdown/docx” (UI chỉ có Download PDF/Word); “Custom agent … không fine-tune hay training lâu dài”; §11.3.2 “Cách Private Mode xử lý dữ liệu” chỉ liệt kê *câu hỏi* (Conversation history/Training/Retention có hay không) mà không có câu trả lời NAB (id `xac-nhan-tenant` cho thấy vốn là mục chờ xác nhận tenant).
17. Nguồn tham khảo: ch13 và ch14 trỏ về tài liệu **QuickSight cũ** (`docs.aws.amazon.com/quicksight/latest/user/…`, gồm `scenarios.html`, `quicksight-research.html`) trong khi ch11/12/15 dùng `docs.aws.amazon.com/quick/latest/userguide/…`; các URL chưa được kiểm tra còn sống (không truy cập mạng trong lần kiểm kê này).
18. Mô tả thao tác lệch giao diện thật: Publish dashboard (web: “Nhập tên Dashboard và description … Chọn Share quyền”; UI: name, sheets, notes, Quick actions, executive summary, data Q&A, sharing stories/scenarios — không có bước quyền); tạo dataset (web “Data → New dataset”, UI nút “Create dataset”, docx “My stuff → Create dataset”); truy cập Research (web: sidebar/More/menu Spaces; docx: sidebar/nút Research dưới ô chat/hỏi agent); Flows (docx “More → Flows”, ảnh Home cho thấy Flows nằm thẳng ở sidebar).

### 5.5 Tính năng được nhắc nhưng không có hướng dẫn/walkthrough

19. Apps (không có chương); Knowledge/Topics (chỉ định nghĩa); Connectors/Action connectors (không có cách kết nối, dù 10-2 cho thấy flow lỗi “Action connector required”); Extensions (Chrome, Slack, Outlook, Teams, Word); Stories; Customize navigation; Document/Presentation/Visual output (không có walkthrough); ML Insights (docx) và “Generate analysis”, Pixel-Perfect report, executive summary/data Q&A của dashboard, Research mode (Fast) — thấy trong ảnh nhưng không được nhắc; chat agent templates; Quick Automate (không có walkthrough thao tác thật, chỉ checklist vòng đời).
20. Cảnh báo NAB-liên quan có trong UI nhưng chưa khai thác: `5-1.png` “Actions are not applicable to any visuals based on datasets with RLS/CLS rules enabled”; “enterprise guardrails” ở Chat agent/Flow; “Review responses for accuracy” (Scenarios); “Usage is subject to AWS Responsible AI Policy”.

