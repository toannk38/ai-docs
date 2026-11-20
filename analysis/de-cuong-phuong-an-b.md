# Đề cương phần Amazon Quick — Phương án B (bản nháp để duyệt)

- Ngày: 19/11/2026 · Dựa trên khảo sát POC (`analysis/survey/`) và `analysis/gap-report.md`
- Phạm vi: **không** gồm phần quản trị (Manage account), **không** gồm Connectors; **Extensions** chỉ có 1 dòng trỏ tới hướng dẫn dùng Quick trên Office (sẽ viết sau).
- Cấu trúc: 5 chương nhóm (11–15) giữ đúng số cũ + trang con theo việc (`NN.x`). Chương 01–10, 16–23 không đổi.
- Trang đánh dấu **[cần SME]** chỉ giữ nếu NAB xác nhận người dùng được dùng tính năng đó.
- Mọi ảnh/video dùng `opba-ai`, username minh hoạ `nhanvien.demo`, dữ liệu giả (`capture/samples/`).

Ký hiệu trong mỗi trang: 📷 ảnh từng bước (khoanh đỏ), 🎬 video, ⚠ lỗi thường gặp, ❓ FAQ, 🔒 kiểm soát NAB.

---

## 11. Bắt đầu với Amazon Quick — `chapter-11-amazon-quick-bat-dau.html` (trang nhóm)

- Amazon Quick là gì, dùng để làm gì tại NAB (ví dụ tình huống công việc).
- **Khối cảnh báo nổi bật: "Account name tại NAB là `opba-ai`"**.
- Ai được dùng, cách xin quyền, kênh hỗ trợ CNTT.
- 🔒 Nguyên tắc chung (giữ từ nội dung cũ): đúng tài khoản/tenant, dữ liệu được phép, Private mode không thay chính sách NAB, không chia sẻ ra ngoài/email cá nhân, kiểm chứng kết quả AI, **nguyên tắc dừng**.
- Danh sách việc trong nhóm (liên kết 11.1–11.5).
- ❓ FAQ chung (Amazon Quick khác Copilot thế nào, dữ liệu nào được đưa vào…).

### 11.1 Đăng nhập qua AWS access portal — `chapter-11-1-dang-nhap-qua-portal.html`
- Link chính `https://nab-opba-ai.awsapps.com/start` + link dự phòng dualstack (bấm được + chữ để copy).
- 📷 Bước: mở link → Username → Next → mật khẩu → Sign in → mã MFA → tab **Applications** → chọn ô **opba-ai** (biểu tượng Quick) → trang chủ Quick. *(Nếu SME xác nhận LIVE phải đăng nhập lại sau khi bấm ứng dụng: thêm bước.)*
- 🎬 Video cả luồng.
- ⚠ Vào nhầm ứng dụng; link portal không mở được → dùng link dự phòng; sai mật khẩu.
- ❓ Không mở được link portal? · Vào nhầm ứng dụng trên portal? · Quên/mất thiết bị MFA?

### 11.2 Đăng nhập bằng link Amazon Quick — `chapter-11-2-dang-nhap-bang-link-quick.html`
- (a) **Khuyến nghị**: lưu bookmark `https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start` → đi thẳng tới trang đăng nhập, không phải nhập account name. 📷🎬
- (b) Gặp trang đăng nhập Quick chung → phải nhập account name:
  - Cảnh báo **trước ảnh**: "Ô này nhập `opba-ai` — KHÔNG nhập username hay email của bạn. Username chỉ nhập ở bước sau, trên trang đăng nhập."
  - 📷 Ảnh khoanh ô Account name + chú thích lớn (đã có).
  - Khối **Sai / Đúng**: email ✗ vs `opba-ai` ✓.
  - 📷 Ảnh lỗi **"Invalid account name"** + "Thấy màn hình này → quay lại nhập `opba-ai`" (đã có).
  - 🎬 Video dừng 2–3 giây ở bước này, phụ đề nhắc (đã có bản thô).
- Màn hình **"Choose your account"** (khi trình duyệt còn phiên cũ) → chọn dòng `opba-ai`.
- Bảng **Account name vs Username** + 📷 menu tài khoản hiển thị cả hai.
- ❓ **(1) "Tôi nhập tên đăng nhập vào ô Account name và bị báo lỗi?"** · Màn hình Choose your account là gì? · Quên/mất thiết bị MFA?

### 11.3 Làm quen giao diện — `chapter-11-3-lam-quen-giao-dien.html`
- 📷 Trang chủ: thanh trên (account, Help), Private mode, ô chat, nút tạo nhanh.
- 📷 Sidebar: New chat, Search, My stuff, Spaces, Research, Chat agents, Apps, Flows, Analyses, Dashboards, Data, My/Shared folders, More (giải thích ngắn từng mục, liên kết tới trang việc).
- My stuff (Recents/Favorites), tìm hội thoại cũ, Customize navigation.
- Menu tài khoản: kiểm tra account name/username, ngôn ngữ, Region, Preferences, **Sign out**.
- Ghi chú: "Dùng Quick ngay trong Word/Outlook/Excel/PowerPoint — xem hướng dẫn Office (sẽ bổ sung)".

### 11.4 Chat với Amazon Quick — `chapter-11-4-chat-voi-quick.html`
- 📷 Bước: New chat → nhập câu hỏi → chọn **phạm vi dữ liệu** (General knowledge / All data / Specific data) → chọn **chế độ** (Fast / Smart / Advanced) → gửi → đọc trả lời, mở nguồn trích dẫn.
- 📷 Đính kèm file (nút +) — ghi "chọn file từ máy" (hộp thoại hệ điều hành).
- 📷 Private mode: bật/tắt, khi nào dùng.
- 🎬 Video hỏi đáp với file mẫu giả.
- 🔒 Dữ liệu được phép đưa vào chat; kiểm chứng trước khi dùng.
- ❓ Nên chọn All data hay Specific data? · Smart/Advanced khác gì? · Private mode có thay chính sách dữ liệu NAB? · Giới hạn file đính kèm?

### 11.5 Tạo tài liệu, slide và hình từ chat — `chapter-11-5-tao-tai-lieu-slide-hinh.html`
- 📷 Document / Presentation / Visual: bấm nút → mô tả yêu cầu → xem bản tạo → chỉnh sửa → tải về.
- 🎬 Video 1 ví dụ (Document).
- 🔒 Rà soát nội dung, không dùng nguyên văn cho quyết định.

---

## 12. Spaces và Chat agents — `chapter-12-amazon-quick-spaces-chat-agents.html` (trang nhóm)

- Space là gì (kho tài liệu dùng chung cho chat), chat agent là gì; khi nào dùng cái nào.
- 🔒 Tài liệu đưa vào Space/agent cần Data Owner đồng ý; least-privilege khi chia sẻ; rà quyền định kỳ.

### 12.1 Hỏi đáp tài liệu trong Space — `chapter-12-1-hoi-dap-tai-lieu-trong-space.html`
- 📷 Spaces → mở Space → khung chat bên phải (gắn với Space) → đặt câu hỏi → xem trích dẫn tài liệu. Cách khác: ô chat chính → Specific data → chọn Space.
- 🎬 Video hỏi đáp với quy định giả lập (PDF mẫu).
- ⚠ Trả lời không đúng tài liệu → kiểm tra Space đã chọn, tài liệu đã "Ready".
- ❓ Vì sao Quick trả lời ngoài tài liệu? · Ai thấy câu hỏi của tôi?

### 12.2 Tạo Space và tải tài liệu lên — `chapter-12-2-tao-space-tai-tai-lieu.html` [cần SME: ai được tạo]
- 📷 Create space → tên, mô tả → **Add → Upload files / Upload folder** (chọn file từ máy) → chờ trạng thái **Ready** → (Create folder) → xoá/đổi tài liệu.
- 🎬 Video (đoạn chờ xử lý tua nhanh).
- Định dạng hỗ trợ, giới hạn (theo UI/SME).
- 🔒 Chỉ tài liệu được phép; ghi nguồn/phiên bản; dọn tài liệu hết hiệu lực.

### 12.3 Chia sẻ Space — `chapter-12-3-chia-se-space.html`
- 📷 Share → thêm người/nhóm → quyền → gửi; xem/thu hồi quyền.
- 🔒 Least-privilege, không chia sẻ ngoài NAB, rà soát định kỳ.

### 12.4 Dùng chat agent — `chapter-12-4-dung-chat-agent.html`
- 📷 Chọn agent ở ô chat (Quick ▾) hoặc trang Chat agents → Chat; template có sẵn.
- ❓ Agent khác chat thường thế nào?

### 12.5 Tạo chat agent — `chapter-12-5-tao-chat-agent.html` [cần SME: ai được tạo]
- 📷 Create chat agent → mô tả bằng lời → persona/hướng dẫn → tài liệu tham chiếu (giới hạn theo UI) → liên kết Space → thử → lưu/chia sẻ.
- 🎬 Video.
- 🔒 Không đưa dữ liệu ngoài phạm vi; kiểm thử trước khi chia sẻ.

---

## 13. Dữ liệu và Dashboard — `chapter-13-amazon-quick-du-lieu-dashboard.html` (trang nhóm)

- Dashboard, dataset, analysis, Scenarios, Stories là gì; ai xem, ai tạo.
- 🔒 RLS/CLS (hai người thấy số khác nhau là bình thường), định nghĩa KPI được nghiệp vụ duyệt, export chỉ tới nơi lưu trữ được phép, không email cá nhân.

### 13.1 Xem và hỏi dữ liệu trên dashboard — `chapter-13-1-xem-hoi-dashboard.html`
- 📷 Dashboards → mở dashboard → lọc → **Ask a question** → (tóm tắt/executive summary nếu bật) → export an toàn.
- 🎬 Video.
- ❓ Vì sao số khác đồng nghiệp? · Dashboard có real-time không? · Export được không?

### 13.2 Hỏi đáp với dữ liệu — `chapter-13-2-hoi-dap-du-lieu.html` [cần SME]
- 📷 Data → Datasets/Topics → "Chat with datasets"; hoặc ô chat → Specific data → chọn dataset/dashboard.
- 🔒 Kiểm chứng con số với dashboard/nguồn gốc.

### 13.3 Phân tích với Scenarios — `chapter-13-3-scenarios.html` [cần SME]
- 📷 More → Scenarios → Create scenario → chọn dữ liệu → đặt câu hỏi phân tích → đọc gợi ý → "Review responses for accuracy".
- 🎬 Video (XLSX mẫu giả).

### 13.4 Kể chuyện dữ liệu với Stories — `chapter-13-4-stories.html` [cần SME]
- 📷 More → Stories → Create story → chọn nguồn → chỉnh → chia sẻ.

### 13.5 Tạo dataset từ file — `chapter-13-5-tao-dataset.html` [cần SME: quyền author]
- 📷 Data → Create dataset → tải XLSX mẫu giả → chuẩn bị dữ liệu (đổi kiểu, lọc) → lưu (SPICE).
- 🔒 Data Owner, không tải dữ liệu thật ngoài phạm vi.

### 13.6 Tạo analysis và xuất bản dashboard — `chapter-13-6-tao-analysis-dashboard.html` [cần SME: quyền author]
- 📷 Analyses → Generate/Create analysis → thêm biểu đồ → Publish dashboard (tên, sheet, tuỳ chọn AI) → chia sẻ.
- 🎬 Video.

---

## 14. Nghiên cứu với Quick Research — `chapter-14-amazon-quick-research.html` (trang nhóm)

- Research làm gì, mất bao lâu (theo UI), khác chat thế nào.
- 🔒 Nguồn web/nội bộ được phép, kiểm chứng trích dẫn, không dùng nguyên văn cho quyết định.

### 14.1 Tạo một nghiên cứu — `chapter-14-1-tao-research.html`
- 📷 Research → New research → mục tiêu → chế độ → nguồn (web, file, tài sản Quick) → xem kế hoạch → bắt đầu → theo dõi tiến độ.
- 🎬 Video (đoạn chạy 5–10 phút tua nhanh).

### 14.2 Đọc, kiểm chứng và chia sẻ báo cáo — `chapter-14-2-kiem-chung-chia-se-research.html`
- 📷 Mở báo cáo → bấm trích dẫn → đối chiếu nguồn → Download PDF/Word → Share / Add to space.
- ⚠ Trích dẫn không khớp nội dung.
- ❓ Trích dẫn có đảm bảo đúng? · Được chia sẻ ra ngoài?

---

## 15. Tự động hoá với Flows — `chapter-15-amazon-quick-tu-dong-hoa.html` (trang nhóm)

- Flow, App, Automation là gì; khác nhau thế nào; khi nào cần CNTT.
- 🔒 Tách đọc/ghi, xác nhận của con người trước khi ghi, phê duyệt (tab Pending approval), test với dữ liệu giả, rollback, người chịu trách nhiệm.

### 15.1 Chạy flow có sẵn — `chapter-15-1-chay-flow-co-san.html`
- 📷 Flows → Flow library → chọn flow pre-built → nhập thông tin → chạy → xem kết quả.
- 🎬 Video.

### 15.2 Tạo flow — `chapter-15-2-tao-flow.html` [cần SME: ai được tạo]
- 📷 Create flow → mô tả → xem các bước được tạo → chỉnh → chạy thử → chia sẻ; Triggers (lịch), Pending approval.
- 🎬 Video.

### 15.3 Tạo app — `chapter-15-3-tao-app.html` [cần SME]
- 📷 Apps → mô tả ý tưởng / chọn ví dụ → xem app → chia sẻ.

### 15.4 Automations — `chapter-15-4-automations.html` [cần SME]
- Chỉ giới thiệu + điều kiện phê duyệt nếu NAB không cho người dùng tự tạo; hướng dẫn chi tiết nếu cho phép.

---

**Tổng:** 5 trang nhóm + 22 trang việc = 27 trang (tối đa). Trang [cần SME] bị loại → giảm tương ứng.
**Video dự kiến:** ~18 video × 2–6 MB (1080p) ≈ 40–110 MB.
