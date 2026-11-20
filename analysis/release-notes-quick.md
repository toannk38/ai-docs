# Ghi chú phát hành — phần Amazon Quick (đợt 1)

## Nội dung cũ bị loại hoặc chờ kiểm chứng trên giao diện

| Nội dung cũ | Lý do | Xử lý |
|---|---|---|
| "Tính năng hiển thị theo gói Quick Pro/Enterprise…" (ch15) | Câu vendor chung chung, không có bằng chứng NAB | Loại; thay bằng phân quyền NAB (mọi user / Reader / một số user) |
| "Admin vào QuickSight settings → SPICE capacity… usage > 80%…" (ch13) | Phần quản trị — ngoài phạm vi tài liệu | Loại |
| Vòng đời Automate kiểu staging/production, case management (ch15) | Vendor chung chung | Chỉ giữ phần kiểm soát (UAT, phê duyệt, dừng khi lỗi); chi tiết ở 15.4 nếu UI có |
| Vai trò Space "Viewer/Contributor/Owner" | Chưa thấy trên giao diện | Ghi theo tên quyền trên hộp thoại Share khi chụp (12.3) |
| "20 files/cuộc trò chuyện, 50 MB/file, 100 files/Space, 10 reference files/50 MB" | Mâu thuẫn với UI (UI ghi 10 tài liệu, 100k ký tự cho agent) | Ghi đúng thông báo trên màn hình khi chụp |
| "Recents lưu 30 ngày" | Chưa thấy trên UI | Không ghi số |
| "Research mất 7–10 phút" | UI ghi "about 5-10 minutes" | Ghi theo UI |
| Xuất Research "Markdown" | UI chỉ có Download PDF / Word | Ghi theo UI |
| "Không tách thông tin xác thực kiểm thử/prod chung" | Câu lỗi nghĩa | Sửa: "Không dùng chung thông tin đăng nhập giữa môi trường kiểm thử và môi trường chính thức" |
| Nhãn dịch sai ("All dữ liệu", "New phân tích", "Đồng sở hữu") | Do bộ thay từ của build | Trang Quick tắt bộ thay từ (`skipNormalize`), giữ nhãn UI tiếng Anh |

## Trang có dấu * chưa phát hành
| Trang dự kiến | Lý do | Xử lý |
|---|---|---|
| 13.4* Kể chuyện dữ liệu với Stories | Trên POC (19/11/2026): Dashboard → Create → Story mở `stories/new` rồi báo "We cannot open that story"; nút Create story ở trang Stories không phản hồi | Không phát hành; các trang sau đánh số lại (13.4 = tạo dataset, 13.5 = analysis/dashboard). Chụp lại khi tính năng được bật |

## Đối tượng demo đã tạo trên POC (để dọn sau)
Xem `capture/out/created.json`: Space văn bản pháp luật (demo), agent "Trợ lý Quy định Ngân hàng NAB", dataset `aws-quick-demo-data.csv`, analysis, dashboard "Hiệu quả kinh doanh chi nhánh (dữ liệu giả lập)", scenario từ dashboard, research "So sánh quy định về loại hình TCTD", flow "Tóm tắt văn bản luật và liệt kê điểm cần lưu ý", app "Checklist Hồ Sơ Vay Tiêu Dùng" và một app trống "Untitled App" (lần tạo đầu bị ngắt); các chia sẻ tới `toannk2_reader` (agent, Space, dashboard). Flow **chưa** chia sẻ được: ô tìm người nhận báo "No options" với `toannk2_reader` (chờ quyết định).

## Phát hiện từ ảnh chụp đưa vào tài liệu
- Research File uploads nhận .csv/.docx/.pdf/.xls/.xlsx (tối đa 20 tệp); tệp `.doc` bị báo "invalid characters" → hướng dẫn dùng Space làm nguồn (Quick assets).
- Chạy thử flow 15.2 dùng bản `.docx` chuyển từ Pháp lệnh ngoại hối (`capture/raw/converted/`, không nằm trong gói phát hành).
- Câu hỏi "quý 3/2026" trên dashboard không có bộ lọc quý: Quick nêu giới hạn và trả số toàn kỳ (đưa vào 13.1 làm ví dụ kiểm chứng).

## Duyệt ảnh
Mỗi trang: mở trang trên Edge, đối chiếu từng ảnh với chú thích; kiểm tra không lộ `nab-quick-poc`, URL POC, email/tên ngoài `toannk2_reader`; ô highlight đúng nút được nhắc. Ký tên vào cột "Người duyệt".

| Trang | Flow | Ngày chụp | Số ảnh | Người duyệt | Ghi chú |
|---|---|---|---|---|---|
| 11.1 | (ảnh do NAB cung cấp, `11-1/11-1-0N-*.png/jpg`) | 20/11/2026 | 6 | | Mã xác minh đã che, QR đã làm mờ; ảnh 05 có username thật (`lynm`) — người dùng đồng ý giữ |
| 11.2 | `q11-1-portal+q11-1-mfa-screen` | 19/11/2026 | 6 | | Đổi số từ 11.1 cũ (thư mục `11-2`) |
| 11.3 | `q11-2-link-quick+q11-2-link-banner` | 19/11/2026 | 6/9 | | Đổi số từ 11.2 cũ (thư mục `11-3`); dùng ảnh 2–5, 8, 9 + `11-1/11-1-01-sign-in.png`; ảnh 1, 6, 7 không còn dùng |
| 11.4 | (ảnh do NAB cung cấp, `11-4/11-4-0N-*.png`) | 20/11/2026 | 3 | | Ảnh 02 chụp trên tài khoản thử nghiệm, đã sửa chữ account thành `opba-ai` |
| 11.5 | `q11-3-giao-dien` | 19/11/2026 | 6 | | Đổi số từ 11.3 cũ |
| 11.6 | `q11-4-chat` | 19/11/2026 | 8 | | Đổi số từ 11.4 cũ |
| 11.7 | `q11-5-tao-tai-lieu` | 19/11/2026 | 4 | | Đổi số từ 11.5 cũ |
| 12.1 | `q12-1-hoi-dap-space` | 19/11/2026 | 6 | |  |
| 12.2 | `q12-2-tao-space` | 19/11/2026 | 7 | |  |
| 12.3 | `q12-3-chia-se-space` | 19/11/2026 | 6 | | Hiện tên `toannk2_reader` (được phép) |
| 12.4 | `q12-4-dung-agent` | 19/11/2026 | 5 | |  |
| 12.5 | `q12-5-tao-agent` | 19/11/2026 | 8 | |  |
| 12.6 | `q12-6-chia-se-agent` | 19/11/2026 | 6 | | Hiện tên `toannk2_reader` (được phép) |
| 12.7 | `q12-reader-agent+q12-reader-space+q12-7-agents-list` | 19/11/2026 | 6 | | Chụp bằng tài khoản Reader. Ảnh 2 còn "Nhân viên Demo Demo" và lời chào "nhanvien.demo" (chụp lúc chưa chia sẻ Space; chụp lại phải thu hồi chia sẻ Space) |
| 13.1 | `q13-1-xem-dashboard` | 19/11/2026 | 6 | | Chụp bằng tài khoản Reader |
| 13.2 | `q13-2-hoi-dap-du-lieu+q13-reader-view` | 19/11/2026 | 5 | | Ảnh cuối: Reader |
| 13.3 | `q13-3-scenarios+q13-3-scenarios-ket-qua` | 19/11/2026 | 7 | |  |
| 13.4 | `q13-5-tao-dataset` | 19/11/2026 | 4 | |  |
| 13.5 | `q13-6-dung-bieu-do+q13-6-analysis-dashboard+q13-6-chia-se-dashboard+q13-5-share-page` | 19/11/2026 | 14 | | Hiện tên `toannk2_reader`; ảnh 12 chụp lại sau khi danh sách quyền tải xong |
| 14.1 | `q14-1-tao-research` | 19/11/2026 | 10 | |  |
| 14.2 | `q14-2-kiem-chung-research` | 19/11/2026 | 6 | |  |
| 15.1 | `q15-1-chay-flow` | 19/11/2026 | 5 | |  |
| 15.2 | `q15-2-tao-flow+q15-2-publish-shots+q15-2-run-shots+q15-2-share-search` | 19/11/2026 | 12 | | Ảnh ghép từ 2 bộ cứu lại; ảnh 12 chụp lại (hiện "No options"); chưa chia sẻ được |
| 15.3 | `q15-3-tao-app+q15-3-app-ket-qua` | 19/11/2026 | 4 | |  |
| 15.4 | `q15-4-automations` | 19/11/2026 | 2 | |  |
