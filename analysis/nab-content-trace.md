# Truy vết nội dung đặc thù NAB — bản cũ → phần Amazon Quick mới

Nguồn: `analysis/current-quick-content.md` §4 (trích nguyên văn bản cũ). Cột "Trang mới" = nơi nội dung được viết lại. "Loại" = câu vendor chung chung/chưa xác minh, liệt kê trong `analysis/release-notes-quick.md`.
Cập nhật: 19/11/2026 (Task 8 — trang nhóm). Trang việc bổ sung ở Task 9–11 (13.4 Stories không phát hành — xem release notes; 13.4 = tạo dataset, 13.5 = analysis/dashboard).

## 4.0 Nội dung cố định
| Nội dung | Trang mới |
|---|---|
| Callout "Nguyên tắc dừng" | Mọi trang Quick (mục Kiểm soát tại NAB) — `render-quick.js` |
| "Mã nguồn kiểm soát: NAB-AQ-001, NAB-AQ-002, VEN-AQ-001" | Mọi trang Quick, thêm NAB-AQ-003 |
| Ghi chú nguồn + ngày truy cập | Mọi trang Quick (`renderSources`, ngày 19/11/2026) |
| Hộp trạng thái "Đang sử dụng tại NAB" | Mọi trang Quick |
| Trang chủ: khối Amazon Quick | `index.html` (mô tả mới + nút "Hướng dẫn đăng nhập (opba-ai)") |

## 4.1 Quyền & vai trò
| Nội dung cũ (rút gọn) | Trang mới |
|---|---|
| Tài khoản/SSO NAB, MFA; không root user, không tài khoản cá nhân, không Free/Plus (ch11.prerequisites[0], controls[0]) | 11 (Điều kiện, Kiểm soát) |
| Dùng account name, URL/SSO, kênh hỗ trợ do CNTT cung cấp (ch11.prerequisites[2]) | 11 (Điều kiện) |
| Kiểm tra tài khoản/vai trò/menu; sai tài khoản, thiếu menu, quyền rộng → dừng, gửi yêu cầu kèm ảnh đã che (ch11.guideSections[0]) | 11 (Kiểm soát); chi tiết thao tác: 11.1, 11.2, 11.3 |
| Quyền kỹ thuật thấy tài nguyên ≠ phê duyệt mục đích (ch11.controls[1]) | 11 (Nguyên tắc dữ liệu, Kiểm soát) |
| Mục More hiển thị theo quyền; thiếu mục đã cấp → gửi yêu cầu (ch11.faqs[2]) | 11 (FAQ) |
| Quyền tối thiểu khi chia sẻ Space/agent; rà soát định kỳ (ít nhất mỗi quý); ghi ai được cấp quyền, khi nào, vì sao (ch12.objectives, guideSections[5], controls[1–2], walkthroughs[0]) | 12 (Kiểm soát); chi tiết: 12.3, 12.6, 12.7 |
| Ai được tạo Space/agent (ch12.faqs[5]) | 12 (FAQ — cập nhật: mọi user) |
| Chủ sở hữu dashboard có thể giới hạn điều khiển người xem; không vượt kiểm soát (ch13.faqs[4], controls[4]) | 13 (Kiểm soát) |
| Owner có thể thu hồi quyền (ch13.guideSections[4]) | 13.5 (thu hồi trong Manage permissions) |
| Refresh lỗi: báo admin/người chịu trách nhiệm, không tự đổi cấu hình (ch13.faqs[7]) | 13.1 (Lỗi thường gặp) |
| Scenarios tuân theo quyền dữ liệu (ch14.guideSections[0], faqs[6]) | 13.3 (Kiểm soát) |
| Tìm kiếm web không mặc định; không đưa dữ liệu nội bộ vào truy vấn web (ch14.faqs[7]) | 14 (Điều kiện, Kiểm soát) |
| Quyền tạo/chạy/chia sẻ Flow theo quyền được cấp; quyền đọc trừ khi có phê duyệt ghi (ch15.guideSections[0]) | 15 (Kiểm soát); 15.2 (chia sẻ Viewer) |
| Tài khoản dịch vụ quyền tối thiểu, xoay vòng, có người chịu trách nhiệm (ch15.controls[1]) | 15 (Kiểm soát) |
| "Quick Pro/Enterprise", "Admin vào QuickSight settings → SPICE capacity" | Loại (vendor/quản trị) |

## 4.2 Dữ liệu & phân loại
| Nội dung cũ (rút gọn) | Trang mới |
|---|---|
| Dữ liệu đã phân loại; chỉ chọn nguồn được duyệt (ch11.prerequisites[1]) | 11 (Điều kiện, Nguyên tắc dữ liệu) |
| Web/upload/kết nối chỉ dùng khi được cho phép (ch11.controls[2]) | 11 (Nguyên tắc dữ liệu, Kiểm soát) |
| Hội thoại/bộ nhớ/lưu giữ không thay chính sách NAB (ch11.controls[4]) | 11 (Nguyên tắc dữ liệu, Kiểm soát, FAQ) |
| Private mode: không dùng/ghi bộ nhớ; vẫn tuân thủ phân loại (ch11.guideSections[2], faqs[0]) | 11 (FAQ); chi tiết: 11.4 (Task 9) |
| Không tải tệp nếu chưa rõ xử lý/lưu giữ (ch11.walkthroughs[1]) | 11 (Nguyên tắc dữ liệu); 11.4 |
| Recents 30 ngày (ch11.faqs[4]) | Kiểm chứng trên UI ở 11.3 — chưa thấy → không ghi số |
| Tài liệu Space/agent đã phân loại, chủ sở hữu dữ liệu duyệt (ch12.prerequisites, guideSections[2], controls[3]) | 12 (Điều kiện, Kiểm soát); 12.2, 12.5 |
| Space không bỏ qua RLS/CLS (ch12.guideSections[2], faqs[1]) | 12 (Kiểm soát, FAQ) |
| Agent không huấn luyện lại trên tài liệu (ch12.faqs[7]) | 12 (FAQ) |
| Chủ sở hữu dữ liệu duyệt phạm vi; ATTT duyệt kết nối, xuất dữ liệu, nhúng (ch13.prerequisites) | 13 (Điều kiện) |
| Định nghĩa KPI, số liệu đối soát đã duyệt (ch13.prerequisites[2]) | 13 (Điều kiện, Kiểm soát) |
| Hai người thấy số khác (ch13.controls[1]) | 13 (mục riêng, FAQ) |
| Research: nguồn tối thiểu, không đưa dữ liệu nhạy cảm vào từ khoá, không kết hợp web + nội bộ khi chưa duyệt (ch14.guideSections[3], walkthroughs, controls[3]) | 14 (Điều kiện, Kiểm soát); 14.1 |
| Tự động hoá: người chịu trách nhiệm, chủ sở hữu dữ liệu, dữ liệu kiểm thử; tách thông tin đăng nhập test/prod; không nhúng bí mật (ch15.prerequisites) | 15 (Điều kiện, Kiểm soát — câu lỗi nghĩa đã sửa) |
| "10 files, 50 MB/file", "100 files/Space" | Kiểm chứng trên UI ở 12.2/12.5 (Task 10) — ghi theo màn hình |

## 4.3 Chia sẻ / Export
| Nội dung cũ (rút gọn) | Trang mới |
|---|---|
| Không chia sẻ công khai/"phòng khi cần"; chỉ nội bộ NAB (ch12.guideSections[5], controls[0], faqs[6]) | 12 (Kiểm soát, FAQ); 12.3, 12.6, 12.7 |
| Viewer chỉ xem/lọc/xuất nếu được phép; không chia sẻ public (ch13.guideSections[5]) | 13 (FAQ, Kiểm soát) |
| File xuất là bản sao mới: kho NAB, nhãn phân loại, không email cá nhân, không link công khai, rủi ro CSV (ch13.walkthroughs[1], controls[3], faqs[6]) | 13 (Kiểm soát, FAQ); 13.1 |
| Kết quả Research/Scenarios là dữ liệu mới: kho NAB, nhãn, đúng người, dấu vết kiểm tra, không tạo bản sao bỏ quyền (ch14.guideSections[5], controls[4–5], faqs[5]) | 14 (Kiểm soát, FAQ); 13 (Kiểm soát); 14.2 |
| Không gửi nguyên văn kết quả AI khi chưa kiểm tra (ch14.guideSections[4]) | 14 (Kiểm soát) |
| Chia sẻ flow đúng người dùng/nhóm (ch15.walkthroughs[0]) | 15.2 (Chạy thử và chia sẻ) |

## 4.4 Tự động hoá, hành động & phê duyệt
| Nội dung cũ (rút gọn) | Trang mới |
|---|---|
| Tách đọc khỏi ghi; ghi cần phê duyệt (ch11.controls[3], ch15.controls[0]) | 11, 15 (Kiểm soát) |
| Apps là bản mẫu, không mặc nhiên là hệ thống chính thức (ch11.faqs[6]) | 15 (bảng so sánh, Kiểm soát); 15.3 |
| Agent có hành động ghi: ATTT phê duyệt, kiểm thử, theo dõi, thu hồi (ch12.prerequisites[3], guideSections[4–5], controls[4], faqs[4]) | 12 (Điều kiện, Kiểm soát) |
| Flow/automation do AI sinh là bản nháp; người chịu trách nhiệm kiểm tra, kiểm thử, phê duyệt (ch15.summary, guideSections[0]) | 15 (tóm tắt, Kiểm soát) |
| Bước xác nhận của con người cho ghi dữ liệu/lịch chạy; NAB mặc định giữ xác nhận (ch15.objectives[1], faqs[2]) | 15 (mục tiêu, Kiểm soát, FAQ) |
| Không bật lịch chạy khi chưa kiểm thử idempotency, múi giờ, đầu vào, xác nhận (ch15.guideSections[4], controls[3]) | 15 (Kiểm soát) |
| Không ghi môi trường chính thức khi kiểm thử; dữ liệu/đích kiểm thử (ch15.guideSections[4], faqs[4]) | 15 (Kiểm soát, FAQ) |
| UAT, phê duyệt rủi ro/ATTT cho hệ thống nhạy cảm (ch15.guideSections[5]) | 15 (Kiểm soát) |
| Khi lỗi: dừng trigger, cô lập, khôi phục theo runbook, không retry vô hạn (ch15.guideSections[5]) | 15 (Kiểm soát, FAQ) |
| Chi tiết vòng đời Automate (commit, deploy, smoke test, case/task metrics, correlation ID) | 15.4 — chỉ tổng quan và kiểm soát (không hướng dẫn tạo/triển khai) |

## 4.5 Kiểm chứng
| Nội dung cũ (rút gọn) | Trang mới |
|---|---|
| Kết quả AI là bản nháp; mở nguồn, đối chiếu số liệu (ch11.walkthroughs[0]) | 11 (Nguyên tắc dữ liệu, FAQ); 11.4 |
| KPI không suy từ tiêu đề biểu đồ; định nghĩa đã duyệt; số liệu đối soát; giải thích AI không thay kiểm tra nghiệp vụ (ch13.walkthroughs[0], controls[2,5], faqs[5]) | 13 (Kiểm soát, FAQ); 13.1 |
| Trích dẫn không bảo đảm đúng; ≥2 nguồn độc lập; checklist trước khi dùng kết quả (ch14.guideSections[4–5], controls, faqs) | 14 (mục riêng, Kiểm soát, FAQ); 14.2 |
| Kiểm tra kế hoạch Research trước khi chạy (ch14.guideSections[4], controls[1], faqs[4]) | 14 (Kiểm soát, FAQ); 14.1 |
| Kiểm thử agent bằng câu hỏi mẫu, đối chiếu nguồn (ch12.walkthroughs[1]) | 12.5 (Task 10) |

## 4.6 Khác
| Nội dung cũ | Trang mới |
|---|---|
| statusLabel/audience/owner | Mọi trang Quick |
| Ví dụ persona agent tại NAB | 12.5 (Task 10) — dùng ví dụ "trợ lý tra cứu quy định ngân hàng" |
| "Admin vào QuickSight settings → SPICE capacity…" | Loại (quản trị) |
