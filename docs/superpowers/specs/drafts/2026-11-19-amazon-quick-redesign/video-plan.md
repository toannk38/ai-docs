# Kế hoạch video — phần Amazon Quick (bản nháp)

## Quy ước chung cho mọi video
- Không tiếng; con trỏ giả + hiệu ứng click; khung đỏ + số bước khớp với ảnh trong trang; **phụ đề tiếng Việt burn-in** ở mỗi bước.
- Đoạn chờ hệ thống (AI trả lời, index tài liệu, Research chạy) được **tua nhanh ×4–×8**, có nhãn "⏩ Tua nhanh".
- Kết thúc bằng khung "kết quả đúng" giữ 2 giây.
- Chỉ dữ liệu giả lập/công khai: văn bản luật trong `demo_docs/tài chính ngân hàng/` (công khai), file giả trong `capture/samples/`. Mọi chuỗi POC hiện là `opba-ai`, user hiện là `nhanvien.demo`.
- Không gửi email, không chia sẻ ra ngoài, không bấm hành động ghi ra hệ thống khác.
- Câu trả lời của AI mỗi lần một khác → chọn lần quay có câu trả lời đúng tài liệu; trang mô tả *dạng* kết quả, không trích nguyên văn câu trả lời làm chuẩn.

## Danh sách (22 video; 11.3 và 12.7 không có video)

| Trang | Video demo | Dữ liệu demo | Điểm nhấn / dừng | Dự kiến |
|---|---|---|---|---|
| 11.1 Đăng nhập qua portal | Mở link portal (banner hiện link LIVE) → Username → mật khẩu → (bước MFA: chèn khung hình màn hình MFA, phụ đề "nhập mã 6 số từ app Authenticator") → tab Applications → chọn ô **opba-ai** → trang chủ Quick | — | Dừng ở ô ứng dụng opba-ai: phụ đề "Chọn đúng ô opba-ai, không chọn ứng dụng khác" | 45–60 s |
| 11.2 Đăng nhập bằng link / account name | (1) Nhập **email vào ô Account name → lỗi "Invalid account name"** (dừng 2 s, phụ đề ✗) → xoá → nhập **opba-ai** (dừng 2–3 s, phụ đề "Ô này nhập opba-ai — KHÔNG nhập username/email") → Next → Username → mật khẩu → trang chủ. (2) Đoạn ngắn: mở link bookmark có sẵn account → đi thẳng tới Username | — | Hai lần dừng: lỗi và nhập đúng | 60–75 s |
| 11.4 Chat với Quick | New chat → chọn phạm vi dữ liệu (General / All / Specific) → chọn Smart → đính kèm 1 văn bản luật → hỏi "Theo Luật Các tổ chức tín dụng, những hành vi nào bị cấm?" → câu trả lời (tua) → mở trích dẫn → bật/tắt Private mode | Luật Các TCTD | Dừng ở menu phạm vi dữ liệu và ở trích dẫn | 60–75 s |
| 11.5 Tạo tài liệu/slide/hình | Bấm Document → "Soạn bản tóm tắt 1 trang về Pháp lệnh ngoại hối" → chờ (tua) → xem → tải về; lướt nhanh Presentation/Visual | Pháp lệnh ngoại hối | Dừng ở bản tạo xong + nút tải | 60 s |
| **12.1 Hỏi đáp tài liệu trong Space** | Spaces → mở Space "Văn bản pháp luật ngân hàng (demo)" → khung chat bên phải → hỏi 1–2 câu → mở trích dẫn tới đúng tài liệu; cách khác: ô chat chính → Specific data → chọn Space | Space tạo ở 12.2 | Dừng ở trích dẫn: "Luôn mở nguồn để kiểm chứng" | 45–60 s |
| **12.2 Tạo Space và tải tài liệu** | Create space → tên + mô tả → Add → Upload files (chọn 3–4 văn bản luật; phụ đề "chọn file từ máy") → trạng thái Processing → **Ready** (tua) | 3–4 luật | Dừng ở trạng thái Ready | 60 s |
| **12.3 Chia sẻ Space** | Share → nhập người nhận → chọn quyền → (gửi hoặc Huỷ — chờ quyết định user test thứ 2) → xem danh sách người có quyền / thu hồi | Space demo | Dừng ở chọn quyền: "Chỉ cấp quyền tối thiểu cần thiết" | 40–50 s |
| **12.4 Dùng chat agent** | Ô chat → Quick ▾ → chọn agent → hỏi; hoặc trang Chat agents → mở agent → Chat | Agent tạo ở 12.5 | — | 40 s |
| **12.5 Tạo chat agent** | Create chat agent → mô tả "Trợ lý tra cứu quy định ngân hàng, trả lời có trích dẫn, giọng trang trọng" → xem persona/hướng dẫn được sinh → gắn Space demo → thử hỏi trong khung xem trước → lưu | Space demo | Dừng ở bước gắn Space | 75–90 s |
| **12.6 Chia sẻ chat agent** | Mở agent → Share → người nhận → quyền (dùng / chỉnh sửa) → lưu ý: agent gắn Space — người nhận có thấy tài liệu không (kiểm chứng khi quay) | Agent demo | Dừng ở chọn quyền + phụ đề lưu ý tài liệu gắn kèm | 40–50 s |
| 13.1 Xem và hỏi dashboard | Dashboards → mở "Hiệu quả kinh doanh chi nhánh (dữ liệu giả lập)" → lọc theo Vùng/Sản phẩm → Ask a question "Chi nhánh nào có tổng giá trị giao dịch cao nhất quý 3/2026?" → xem trả lời | Dashboard tạo ở 13.6 từ `demo_docs/aws-quick-demo-data.csv` | Dừng ở bộ lọc + câu trả lời | 45 s |
| 13.2 Hỏi đáp với dữ liệu | Data → dataset → Chat (hoặc ô chat → Specific data → dataset) → hỏi → câu trả lời + biểu đồ | Dataset từ 13.5 | — | 45 s |
| 13.3* Scenarios | More → Scenarios → Create scenario → chọn dataset → câu hỏi phân tích → xem gợi ý → "Review responses for accuracy" | Dataset từ CSV giả lập | — | 60 s |
| 13.4* Stories | More → Stories → Create story → chọn dashboard → chỉnh → xem | Dashboard từ CSV giả lập | — | 45 s |
| 13.5* Tạo dataset từ file | Data → Create dataset → tải CSV giả lập → xem trước, kiểm tra kiểu cột (Ngày, số) → lưu | `demo_docs/aws-quick-demo-data.csv` | — | 45 s |
| 13.6* Tạo analysis và xuất bản dashboard | Analyses → Generate analysis → thêm/chỉnh biểu đồ → Publish dashboard (tên, sheet) | Dataset từ CSV giả lập | Dừng ở hộp thoại Publish | 75 s |
| 14.1 Tạo nghiên cứu | Research → New research → mục tiêu "Tổng hợp quy định về an toàn hoạt động trong Luật Các TCTD" → nguồn: file tải lên (không web — chờ quy định NAB) → xem kế hoạch → bắt đầu → tiến độ (dừng quay khi đang chạy) | 2 văn bản luật | Dừng ở bước xem kế hoạch | 45–60 s |
| 14.2 Kiểm chứng và chia sẻ báo cáo | Mở báo cáo đã hoàn tất → bấm số trích dẫn → đối chiếu đoạn nguồn → Download PDF/Word → Add to space | Báo cáo hoàn tất (từ 14.1 khi chạy xong) | Dừng ở trích dẫn | 45 s |
| 15.1 Chạy flow có sẵn | Flows → Flow library → chọn flow pre-built (vd "5-Why Root Cause Analysis") → nhập thông tin → chạy → kết quả | Tình huống giả | — | 45 s |
| 15.2 Tạo và chia sẻ flow | Create flow → mô tả "Tóm tắt văn bản luật tải lên và liệt kê các điểm cần lưu ý" → xem các bước sinh ra → chạy thử → Share (như 12.3) | 1 văn bản luật | Dừng ở danh sách bước | 75–90 s |
| 15.3* Tạo app | Apps → mô tả ý tưởng (vd "theo dõi yêu cầu hỗ trợ của phòng") → xem app sinh ra → thử | — | — | 60 s |
| 15.4* Automations | More → Automations → Start building → xem mẫu → tổng quan dự án (không triển khai) | — | — | 45 s |

**Tổng:** ~22 video, mỗi video 40–90 giây (≈ 20 phút nội dung), ước 35–75 MB ở 720p hoặc 70–130 MB ở 1080p.

## Thứ tự quay (do phụ thuộc dữ liệu)
12.2 (tạo Space) → 12.1 → 12.5 (tạo agent) → 12.4 → 12.3/12.6 → 13.5 (dataset) → 13.6 (dashboard) → 13.1/13.2/13.3/13.4 → 14.1 → (chờ Research xong) → 14.2 → 15.x → 11.x quay cuối hoặc bất kỳ lúc nào.
Đối tượng tạo ra (Space, agent, dataset, dashboard, flow, app, research) ghi vào `capture/out/created.json`; sau khi duyệt xong có thể dọn bằng script, chỉ xoá đúng các đối tượng đó.
