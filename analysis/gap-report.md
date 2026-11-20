# Gap report — phần Amazon Quick (chương 11–15)

- Ngày: 19/11/2026 · Giai đoạn 1 (thu thập & đề xuất) — **chưa sửa gì trong `html_docs/`**
- Nguồn: khảo sát giao diện POC (`analysis/survey/README.md` + 40 ảnh đã che), khảo sát trang đăng nhập (`capture/raw/probe/`, `capture/out/login-*`), kiểm kê nội dung cũ (`analysis/current-quick-content.md`), `html_docs/qa/check-release.py`, `html_docs/tools/build-site.js`.
- Tài khoản test là **admin** → thấy mọi tính năng. Người dùng thường tại NAB có thể thấy ít hơn (phụ thuộc Custom permissions — xem câu hỏi SME). **Phần quản trị (Manage account) không đưa vào tài liệu** (quyết định 19/11/2026).

---

## 1. Hiện trạng kỹ thuật cần biết

| Vấn đề | Thực tế | Hệ quả |
|---|---|---|
| Cách sinh HTML | `index.html` + 23 chương **sinh từ** `tools/build-site.js` + `tools/content-*.js` (build lại trùng khớp 100% HTML hiện có) | GĐ2 sửa `content-quick.js` + `build-site.js`, không sửa tay HTML |
| Khoá hash `content-quick.js` | File **tồn tại**, hash khớp; `.codex/plan.md` cũng tồn tại (là "required file") | Gỡ luật hash + hash cũ trong `qa/release-checklist.md` |
| Số chương cố định | Build đòi đúng 23 chương id 1–23; nhóm Quick = id 11–15; checker đòi đúng 23 file | Quick khác 5 chương sẽ đẩy số/tên file chương 16–23 → cần **trang con** (11.1…) nếu muốn nhiều trang |
| Tên file lệch nội dung | ch12 `amazon-quick-sight` = Spaces/Agents; ch13 `research-index` = dữ liệu; ch14 `flows-automate` = Scenarios/Research; ch15 `apps` = Flows/Automate | Đổi slug |
| Ctrl+K | Chỉ lọc **mục sidebar** (số + tên chương + nhóm), không tìm toàn văn | Mỗi việc nên là một mục sidebar, hoặc thêm từ khoá `data-search` |
| Liên kết chéo | Chỉ nút trang chủ → ch11; chương khác chỉ nhắc tên | Đổi slug ít ảnh hưởng |
| `file://` | Cấm fetch/XHR/SW/module/đường dẫn tuyệt đối | Video `<video src>` tĩnh; **`<track>` WebVTT không tải qua `file://`** → phụ đề burn-in |
| Checker & video | `RESOURCE_TAG_ATTRS` không có `video`/`poster` | Thêm để bắt file thiếu |
| Ảnh cũ | 9/19 ảnh lệch caption; ảnh lộ `nab-quick-poc`, URL POC, username, tên người | Thay toàn bộ bằng ảnh mới đã che |

## 2. Đăng nhập — kết quả khảo sát POC

| # | Quan sát | Hệ quả cho tài liệu LIVE |
|---|---|---|
| L1 | Link `/sn/account/<account>/start` đi **thẳng tới trang Username** của Identity Center, không hỏi account name | Khuyến nghị bookmark `https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start` — **SME xác nhận trên LIVE** |
| L2 | Trang Quick chung: "Sign in · **Quick account name**" + Next | Cách 2b: nhập `opba-ai` |
| L3 | Nhập sai → lỗi đỏ **"Invalid account name"** ngay dưới ô | Ảnh lỗi + "quay lại nhập opba-ai" (đã có ảnh + video) |
| L4 | Account name đúng → Identity Center: Username → Next → Password → Sign in (→ MFA nếu bật) | Các bước chung cho 2 cách |
| L5 | Portal: tab Accounts / **Applications**; ô Quick **mang tên account** (icon Quick) cạnh ứng dụng khác | FAQ "vào nhầm ứng dụng" — SME xác nhận tên ô trên LIVE |
| L6 | **Trên POC, link `/sn/account/…` và portal dùng 2 thư mục Identity Center khác nhau**; đi portal rồi bấm ứng dụng Quick bị yêu cầu đăng nhập lại | SME xác nhận cấu hình LIVE (có 1 hay 2 thư mục; có phải đăng nhập 2 lần?) |
| L7 | Đã có phiên: trang Quick chung hiện **"Choose your account"** | Bước/ảnh "chọn dòng opba-ai"; FAQ |
| L8 | Menu tài khoản hiện **Account name: opba-ai** và **Username** cạnh nhau | Ảnh minh hoạ bảng "Account name vs Username" + cách tự kiểm tra sau khi vào |
| L9 | MFA (khi bật): "Additional verification required", ô **MFA code** 6 số, link "Troubleshoot MFA" | FAQ quên/mất thiết bị MFA |

## 3. Bảng đối chiếu tính năng (khảo sát 19/11/2026)

| Tính năng (UI thật) | Có trong tài liệu? | Chương cũ | Khớp giao diện? | Cần làm gì |
|---|---|---|---|---|
| Đăng nhập (portal / link trực tiếp / account name) | Khung chung, không URL/ảnh | ch11 | Không | **Viết mới** đủ yêu cầu §5 |
| Trang chủ, sidebar, Recents, My stuff, Search, My/Shared folders | Có (bảng 15 mục) | ch11 | Gần khớp — thiếu Apps, Search, My stuff mới | Viết lại theo sidebar thật |
| Chat: agent **Quick** ▾, phạm vi **General knowledge / All data / Specific data**, **+** đính kèm, chế độ **Fast / Smart / Advanced** | Có một phần, nhãn sai ("All dữ liệu") | ch11 | Không (thiếu General/Specific data, Fast/Advanced) | Viết lại, ảnh từng menu (đã có ảnh khảo sát) |
| Nút **Research / Document / Presentation / Visual** | Liệt kê | ch11 | Có | Việc "Tạo tài liệu/slide/hình từ chat" có ảnh + video |
| Private mode | Có (chỉ câu hỏi chưa có trả lời NAB) | ch11 | Nút có | Ảnh bật/tắt + câu trả lời NAB (SME) |
| Menu tài khoản (ngôn ngữ, Region, Preferences, Add another account, Sign out) | Không | — | — | Mục ngắn trong chương bắt đầu (không gồm Manage account) |
| Customize navigation | Liệt kê | ch11 | Có | Mục ngắn |
| **Spaces**: danh sách, Create space, Add → Upload files/folder, Add knowledge, Create folder, trạng thái Ready, Share, chat gắn Space | Có (ảnh lệch) | ch12 | Có — UI hiện tại khớp docx | Tách: *Hỏi đáp tài liệu trong Space* (mọi người) / *Tạo Space & tải tài liệu* (người được phép) / *Chia sẻ Space* |
| **Chat agents**: template theo nhóm, agent mặc định Quick, tạo agent bằng mô tả | Có (giới hạn ghi sai) | ch12 | Một phần (UI tạo agent đổi sang mô tả tự nhiên) | Việc *Dùng agent* + *Tạo agent* |
| **Research**: danh sách, New research, báo cáo có trích dẫn | Có (ảnh lệch, thời gian/định dạng sai) | ch14 | Một phần | Việc *Tạo research & kiểm chứng trích dẫn* (video tua nhanh đoạn chạy) |
| **Dashboards**: xem, hỏi "Ask a question" | Có (thiên về tạo) | ch13 | Một phần | Việc *Xem & hỏi dữ liệu trên dashboard* (mọi người) |
| **Data**: Datasets / Topics / Data sources, "Chat with datasets" | Có (tạo dataset) | ch13 | Một phần | *Hỏi dữ liệu (chat with datasets)* + *Tạo dataset* (người được phép) |
| **Analyses**: Generate analysis / Create analysis | Có | ch13 | Có | Việc *Tạo analysis → publish dashboard* (author) |
| **Scenarios** | Có | ch14 | Có | Việc *Phân tích với Scenarios* |
| **Stories** | 1 dòng | — | Có (Create story) | Mục ngắn hoặc việc riêng — SME chọn |
| **Flows**: Flow library (pre-built), Triggers, Pending approval, tạo bằng mô tả | Có | ch15 | Có (thêm Triggers/Pending approval) | *Chạy flow có sẵn* + *Tạo flow*; giữ kiểm soát NAB |
| **Automations** (Projects, Groups, Triggers, Analytics, My tasks; multi-agent samples) | Có (vendor generic) | ch15 | Không khớp | *Giới thiệu & điều kiện* — hướng dẫn chi tiết chỉ nếu NAB cho phép |
| **Apps** (tạo app từ mô tả; Library / My apps) | **Không** | — | — | Việc mới *Tạo app* — nếu NAB cho phép |
| **Connectors** (Airtable, Asana, Box, Gmail…; Create for your team) | Không | — | — | Mục *Kết nối được phép tại NAB* (ATTT duyệt) |
| **Knowledge** (knowledge base, vd Amazon Bedrock) | Không | — | — | Có vẻ thiên quản trị → SME quyết định có đưa không |
| **Extensions** (Word/Outlook/Excel/PowerPoint add-in, Browser extension; admin phải bật) | Không | — | — | Mục ngắn *Dùng Quick trong Office* nếu NAB bật |
| SPICE capacity, Manage account, quyền, subscriptions | Có (ch13) | ch13 | — | **Bỏ** (quản trị) |

## 4. Nội dung đặc thù NAB phải giữ

Danh sách đầy đủ, trích nguyên văn: `analysis/current-quick-content.md` §4 (quyền & vai trò, dữ liệu & phân loại/Private mode, chia sẻ/export, tự động hoá & phê duyệt, kiểm chứng, nguyên tắc dừng, trạng thái "Đang sử dụng tại NAB"). Trong mọi phương án dưới đây: mỗi trang việc có mục **"Điều kiện / quyền tại NAB"** và **"Kiểm soát NAB"** chứa phần liên quan; kiểm soát chung (dữ liệu, chia sẻ, export, nguyên tắc dừng) nằm ở trang mở đầu nhóm. Các câu vendor generic chưa xác minh (Pro/Enterprise, staging/prod, SPICE >80%…) **bỏ** hoặc chuyển thành câu hỏi SME.

---

## 5. Phương án bố cục (dựa trên tính năng đã khảo sát)

### Khung một trang việc (dùng chung)

```
h1  [Tên việc]                       eyebrow: Amazon Quick · nhóm
[status-notice] Đang sử dụng tại NAB — ai được dùng
Mục tiêu (1–2 câu)
Điều kiện / quyền tại NAB
Các bước ① ② ③ — mỗi bước: chữ ngắn + ảnh khoanh đỏ (doc-figure)
[verify-box] Kết quả đúng trông như thế nào
Video 30–90 giây (phụ đề burn-in)
Lỗi thường gặp: Thấy gì → Vì sao → Làm gì
Câu hỏi thường gặp (3–6)
Kiểm soát NAB liên quan
Mã nguồn kiểm soát / Nguồn
```

### Phương án A — 5 chương, mỗi chương gom nhiều việc

| Số | File | Nội dung |
|---|---|---|
| 11 | `chapter-11-amazon-quick-bat-dau.html` | Đăng nhập 2 cách (đủ yêu cầu §6), Account name vs Username, giao diện, chat (agent, phạm vi dữ liệu, chế độ, đính kèm), Private mode, Document/Presentation/Visual, menu tài khoản, Customize navigation |
| 12 | `chapter-12-amazon-quick-spaces-chat-agents.html` | Hỏi đáp trong Space, tạo Space & tải tài liệu, chia sẻ Space, dùng/tạo chat agent |
| 13 | `chapter-13-amazon-quick-du-lieu-dashboard.html` | Xem & hỏi dashboard, chat with datasets, Scenarios, Stories; tạo dataset/analysis/publish |
| 14 | `chapter-14-amazon-quick-research.html` | Research có trích dẫn |
| 15 | `chapter-15-amazon-quick-tu-dong-hoa.html` | Flows (chạy có sẵn, tạo), Apps, Automations, Connectors, Extensions |

- **Ưu:** sửa build/checker ít nhất (chỉ slug + nới số walkthrough); số chương giữ nguyên.
- **Nhược:** ch11, ch12, ch13, ch15 rất dài (5–8 việc, mỗi việc 4–8 ảnh + 1 video) → trang nặng qua shared folder, khó tra; Ctrl+K chỉ ra 5 mục.

### Phương án B — 5 chương nhóm + trang con theo việc (khuyên chọn)

Chương nhóm 11–15 là trang mở đầu ngắn (việc trong nhóm + kiểm soát NAB chung); mỗi việc là trang con `NN.x` trong sidebar. Chương 16–23 giữ nguyên.

| Số | File | Trang |
|---|---|---|
| **11** | `chapter-11-amazon-quick-bat-dau.html` | Bắt đầu với Amazon Quick: là gì, ai được dùng, nguyên tắc dữ liệu NAB, **account name `opba-ai`** |
| 11.1 | `chapter-11-1-dang-nhap-qua-portal.html` | Đăng nhập qua AWS access portal |
| 11.2 | `chapter-11-2-dang-nhap-bang-link-quick.html` | Đăng nhập bằng link Quick / nhập account name (Sai/Đúng, lỗi Invalid account name, Choose your account) |
| 11.3 | `chapter-11-3-lam-quen-giao-dien.html` | Trang chủ, sidebar, My stuff, Search, menu tài khoản, Customize navigation |
| 11.4 | `chapter-11-4-chat-voi-quick.html` | Chat: agent, General/All/Specific data, Fast/Smart/Advanced, đính kèm file, Private mode |
| 11.5 | `chapter-11-5-tao-tai-lieu-slide-hinh.html` | Document / Presentation / Visual từ chat |
| **12** | `chapter-12-amazon-quick-spaces-chat-agents.html` | Spaces & chat agents (tổng quan + kiểm soát tài liệu) |
| 12.1 | `chapter-12-1-hoi-dap-tai-lieu-trong-space.html` | Hỏi đáp tài liệu trong Space |
| 12.2 | `chapter-12-2-tao-space-tai-tai-lieu.html` | Tạo Space & tải tài liệu (người được phép) |
| 12.3 | `chapter-12-3-chia-se-space.html` | Chia sẻ Space |
| 12.4 | `chapter-12-4-chat-agent.html` | Dùng & tạo chat agent |
| **13** | `chapter-13-amazon-quick-du-lieu-dashboard.html` | Dữ liệu & dashboard (tổng quan, RLS/CLS, export) |
| 13.1 | `chapter-13-1-xem-hoi-dashboard.html` | Xem & hỏi dữ liệu trên dashboard |
| 13.2 | `chapter-13-2-hoi-dap-du-lieu.html` | Chat with datasets / Topics |
| 13.3 | `chapter-13-3-scenarios.html` | Phân tích với Scenarios |
| 13.4 | `chapter-13-4-tao-analysis-dashboard.html` | Tạo dataset → analysis → publish (author) |
| **14** | `chapter-14-amazon-quick-research.html` | Research có trích dẫn (một trang) |
| **15** | `chapter-15-amazon-quick-flows-tu-dong-hoa.html` | Tự động hoá (tổng quan, phê duyệt, Connectors/Extensions được phép) |
| 15.1 | `chapter-15-1-chay-flow-co-san.html` | Chạy flow có sẵn |
| 15.2 | `chapter-15-2-tao-flow.html` | Tạo flow |
| 15.3 | `chapter-15-3-apps.html` | Tạo app (nếu NAB cho phép) |
| 15.4 | `chapter-15-4-automations.html` | Automations (nếu NAB cho phép) |

≈ 22 trang Quick (5 nhóm + ≈17 việc); trang con nào NAB không cho phép thì bỏ.

- **Ưu:** một trang = một việc = một bộ ảnh + một video → ngắn, tải nhanh, dễ cập nhật khi UI đổi; Ctrl+K tìm thẳng "đăng nhập", "Space", "dashboard"…; chương khác không đổi.
- **Nhược:** sửa `build-site.js` cho cấp trang con (id "11.1", nav lồng, pager, breadcrumb 3 cấp) và checker (bỏ "đúng 23 file"); nhiều trang hơn để bảo trì.

### Phương án C — theo vai trò

| Số | Trang | Nội dung |
|---|---|---|
| 11 | Bắt đầu | Đăng nhập 2 cách, giao diện, chat cơ bản |
| 12 | Dùng hằng ngày (mọi người) | Chat & tạo tài liệu, hỏi đáp Space, dùng agent, xem/hỏi dashboard, Research |
| 13 | Tạo nội dung (người được phép) | Tạo Space & tải tài liệu, tạo agent, dataset/analysis/dashboard, Scenarios, Stories |
| 14 | Tự động hoá | Flows, Apps, Automations |
| 15 | Kiểm soát tại NAB | Dữ liệu, chia sẻ/export, Connectors/Extensions được phép, nguyên tắc dừng, FAQ chung |

- **Ưu:** khớp phân quyền, người dùng thường chỉ cần 11–12.
- **Nhược:** một tính năng bị tách 2 nơi (Space: hỏi đáp ở 12, tạo ở 13); phụ thuộc NAB xác nhận vai trò (Custom permissions — chưa có); trang 12, 13 dài như A.

### Khuyến nghị

**Phương án B.** Mục tiêu là ảnh step-by-step + video ngắn cho mỗi thao tác — trang một việc là đơn vị tự nhiên cho ảnh/video, cho Ctrl+K (chỉ tìm theo mục sidebar) và cho cập nhật khi UI Quick đổi; vẫn giữ nguyên số/file chương khác. Danh sách trang con chốt cùng SME theo ma trận quyền NAB (bỏ trang NAB không cho phép). Phương án A là dự phòng nếu muốn sửa build ít nhất.

## 6. Chương đăng nhập — yêu cầu đã chốt (mọi phương án)

- Khối cảnh báo nổi bật: **"Account name tại NAB là `opba-ai`"**.
- Cách 1 portal: link chính `https://nab-opba-ai.awsapps.com/start`, dự phòng `https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws` (FAQ "Không mở được link portal?"), dạng bấm được + dạng chữ copy.
- Cách 2: khuyến nghị bookmark `https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start` (không hỏi account name — L1); trang Quick chung → nhập `opba-ai`, giữ toàn bộ cảnh báo "không nhập username".
- Cảnh báo trước ảnh bước account name; khối Sai/Đúng; ảnh khoanh ô + chú thích lớn (đã có `capture/out/login-account-name/step-02.png`); video dừng 2–3 giây có phụ đề (đã có, dừng 2,8 s); ảnh lỗi "Invalid account name" (đã có).
- Bảng Account name vs Username (+ ảnh menu tài khoản hiển thị cả hai).
- FAQ: (1) "Tôi nhập tên đăng nhập vào ô Account name và bị báo lỗi?" (2) Không mở được link portal? (3) Quên/mất thiết bị MFA (4) Vào nhầm ứng dụng trên portal (5) Màn hình "Choose your account" (6) Phải đăng nhập 2 lần khi đi qua portal? (nếu SME xác nhận L6).

## 7. Thay đổi kéo theo

| Hạng mục | A | B | C |
|---|---|---|---|
| `EXPECTED_SLUGS` | Đổi 5 slug Quick | Đổi 5 slug + ≈17 trang con; bỏ "đúng 23 file", thay bằng danh sách mong đợi | Đổi 5 slug |
| Luật Quick | "2–3 walkthrough" → "≥1 bộ bước có ảnh mỗi việc"; FAQ 5–8 → 3–8 | Trang nhóm: không đòi walkthrough; trang việc: ≥1 `doc-figure` + 1 `video` + `verify-box` + 2–6 FAQ | Như A |
| Luật giữ | "Đang sử dụng tại NAB", "Mã nguồn kiểm soát:", Source ID đã khai, mọi luật `file://` | Như A (cả trang con) | Như A |
| Luật mới (mọi PA) | Cấm `nab-quick-poc`, URL portal/Quick POC, directory ID `d-…`; `video`/`poster` tồn tại; giới hạn dung lượng video; trang đăng nhập có `opba-ai` + FAQ đầu đúng câu; cấm nhắc "Manage account"/trang admin; gỡ khoá hash | | |
| `build-site.js` | Slug/navTitle; walkthrough có ảnh; component video | + cấp trang con (id "11.1", `parent`), nav lồng, pager, breadcrumb | Như A |
| Nav 24 trang / `index.html` | Build lại tự động; sửa đoạn mô tả Amazon Quick + thẻ | + thẻ "Đăng nhập Amazon Quick" nổi bật trên trang chủ | Như A |
| Liên kết chéo | Chỉ nút trang chủ → ch11 | Như A | Như A |
| Ctrl+K | 5 mục | ≈22 mục | 5 mục |
| `source-register.md` | Thêm Source ID ảnh/video (vd `NAB-AQ-003` "Ảnh & video POC hiển thị như LIVE, chụp 2026-11-…"), cập nhật ma trận tính năng theo bảng §3 | Như A | Như A |

## 8. Component mới

1. **Bước có ảnh** — `<ol class="steps steps-figured">`, mỗi bước = chữ + `figure.doc-figure` (lightbox sẵn có). Dữ liệu: `steps: [{ text, image, alt, caption }]`.
2. **Khối video** — `<figure class="video-figure"><video controls preload="metadata" playsinline poster="../assets/videos/quick/<viec>.jpg" src="../assets/videos/quick/<viec>.mp4"></video><figcaption>…</figcaption></figure>`; chạy qua `file://`; phụ đề burn-in; kèm link tải file.
3. **Khối Sai/Đúng** — 2 cột ảnh, nhãn ✗/✓.
4. **Bảng "Thấy gì → Vì sao → Làm gì"** — `content-table` sẵn có.
5. **Cảnh báo account name** — `status-notice danger` sẵn có.

**Dung lượng:** H.264 1080p CRF ~28, faststart, 30–90 s, đoạn chờ tua ×4–×8 theo `steps.json` → 2–6 MB/video; ≈20–25 video → **80–150 MB** (720p: 40–70 MB). Ảnh cắt vùng/nén → ≈10–15 MB cho ~120 ảnh.

## 9. Hạ tầng chụp/quay — trạng thái

| Hạng mục | Trạng thái |
|---|---|
| Bảo mật: `.claude/settings.json`, `.gitignore`, `.env.example` | Xong (deny `.env.*` chặn cả `.env.example`; biến tuỳ chọn `QUICK_MFA_MODE` chưa ghi vào file mẫu) |
| `env-mask.ts` | Xong — `nab-quick-poc`→`opba-ai`, URL/host POC→LIVE, username→`nhanvien.demo`, tên→"Demo"/"Nhân viên Demo", directory ID, account ID; che cả lúc gõ dở; dừng chụp nếu lộ |
| `annotate.ts`, `cursor.ts`, `flow.ts`, `runner.ts`, `run.ts` | Xong |
| Đăng nhập | `capture/login.ts direct --entry=generic` **chạy được** (MFA tắt); đường `/sn/account/…` đi thư mục Identity Center khác (MFA bị từ chối khi còn bật) |
| Flow | `login-account-name`, `login-account-name-wrong`: có ảnh + video; `login-direct`, `login-portal`: cần chạy lại (sau khi chốt cấu hình đăng nhập POC) |
| Khảo sát | `capture/survey.ts` — 40 ảnh trong `analysis/survey/` |
| Mẫu giả | `capture/samples/` (PDF, DOCX, XLSX) |
| Checker rò rỉ | `capture/check_env_leaks.py` — PASS văn bản; ảnh cũ cần thay |

## 10. Câu hỏi cho SME Amazon Quick / ATTT

**Đăng nhập & LIVE**
1. LIVE: link `…/sn/account/opba-ai/start` có đi thẳng tới trang Username? Được khuyến nghị bookmark?
2. Tên ô ứng dụng Quick trên portal LIVE? Có ứng dụng khác dễ nhầm?
3. LIVE có 1 hay 2 thư mục Identity Center (POC có 2)? Đi qua portal có phải đăng nhập lại khi mở Quick?
4. Loại MFA trên LIVE, quy trình khi mất/đổi điện thoại, kênh CNTT hỗ trợ?
5. Region LIVE (POC: N. Virginia/us-east-1)? Khi nào dùng link dualstack?

**Phạm vi tính năng (Custom permissions)**
6. Người dùng thường tại NAB thấy mục nào: Spaces, Research, Chat agents, Apps, Flows, Analyses, Dashboards, Data, Automations, Connectors, Knowledge, Extensions, Scenarios, Stories?
7. Ai được tạo Space/tải tài liệu, tạo chat agent, tạo dataset/analysis/dashboard, tạo flow/app/automation?
8. Extensions (Word/Outlook/Excel/PowerPoint add-in, browser extension) có được bật tại NAB?
9. Connectors nào được ATTT duyệt?

**Dữ liệu & kiểm soát**
10. Dữ liệu được phép đưa vào chat (+ đính kèm), Space, agent, Research; cần nhãn phân loại?
11. Private mode: lịch sử, lưu giữ, huấn luyện — câu trả lời chính thức NAB.
12. Phạm vi "General knowledge / All data / Specific data": có khuyến nghị mặc định tại NAB?
13. Research có bật web search? Kết hợp web + nội bộ cần duyệt?
14. Export/chia sẻ (Space, dashboard, research, flow): được phép tới đâu?
15. Flow/Automation/App có hành động ghi ra hệ thống khác không, ai duyệt (tab "Pending approval")?

**Tài liệu**
16. Ảnh/video từ POC (đã che thành `opba-ai`) có được dùng minh hoạ LIVE, ghi "giao diện minh hoạ" + ngày chụp?
17. Ai xác nhận walkthrough (NAB-AQ-002) và cập nhật ma trận trong `source-register.md`?
18. Có cần tài khoản test **không phải admin** để chụp đúng giao diện người dùng thường?
