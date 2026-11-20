# Nhật ký review và phê duyệt

> Trạng thái ban đầu: Chưa review. Việc điền tên reviewer hoặc ngày review chỉ được thực hiện sau khi người đó thực sự hoàn thành kiểm tra.

## 1. Thông tin phiên bản review

| Trường | Giá trị |
|---|---|
| Release candidate | `[vX.Y / thư mục hoặc checksum]` |
| Content freeze | `[dd/mm/yyyy hh:mm]` |
| Ngày bắt đầu review | `[dd/mm/yyyy]` |
| Hạn phản hồi | `[dd/mm/yyyy]` |
| Điều phối review | `[Họ tên/Đơn vị]` |
| Trạng thái chung | Chưa review |

## 2. Ma trận reviewer bắt buộc

| Vai trò reviewer | Phạm vi | Bằng chứng tối thiểu | Người thực hiện | Kết quả | Ngày |
|---|---|---|---|---|---|
| Chủ sở hữu nội dung | Độ đầy đủ, thuật ngữ, nhất quán thông báo–website | Checklist nội dung và diff bản freeze | `[Điền]` | Chưa review | `[Điền]` |
| SME Microsoft 365 | Chương 04–10; tenant, license, walkthrough | Feature matrix và kết quả thao tác lại 100% walkthrough | `[Điền]` | Chưa review | `[Điền]` |
| SME Amazon Quick | Chương 11–15; role, connector, walkthrough | Feature matrix và kết quả thao tác lại 100% walkthrough | `[Điền]` | Chưa review | `[Điền]` |
| ATTT | Phân loại dữ liệu, quyền, connector, chia sẻ, sự cố | Nhận xét và xác nhận đóng lỗi Critical/High | `[Điền]` | Chưa review | `[Điền]` |
| Tuân thủ/Pháp chế | Bí mật ngân hàng, dữ liệu cá nhân, IP, disclaimer | Nhận xét và xác nhận nội dung bắt buộc | `[Điền]` | Chưa review | `[Điền]` |
| Brand/Truyền thông | Logo, màu, nền, giọng văn, thông báo | Đối chiếu guideline còn hiệu lực | `[Điền]` | Chưa review | `[Điền]` |
| Web/Accessibility | `file://`, browser, keyboard, zoom, print | Báo cáo test định lượng | `[Điền]` | Chưa review | `[Điền]` |
| Đại diện ĐVKD | Dễ hiểu, khả năng làm theo, use case | Pilot 5–8 người thuộc ít nhất 2 nhóm | `[Điền]` | Chưa review | `[Điền]` |
| Người phê duyệt phát hành | Toàn bộ package và rủi ro còn lại | Biên bản go/no-go | `[Điền]` | Chưa review | `[Điền]` |

Kết quả hợp lệ: `Đạt`, `Đạt có điều kiện`, `Không đạt`. Không dùng `Đạt có điều kiện` cho lỗi Critical/High chưa đóng.

## 3. Nhật ký vấn đề

| Issue ID | Ngày | Reviewer | Chương/file | Mô tả và bằng chứng | Mức độ | Owner xử lý | Hạn xử lý | Trạng thái | Bằng chứng retest |
|---|---|---|---|---|---|---|---|---|---|
| REV-001 | `[dd/mm]` | `[Điền]` | `[Điền]` | `[Điền]` | `[C/H/M/L]` | `[Điền]` | `[dd/mm]` | Mở | `[Link/ghi chú]` |

### Phân mức lỗi và SLA mục tiêu

| Mức | Tiêu chí | Ví dụ | Điều kiện phát hành | SLA mục tiêu |
|---|---|---|---|---|
| Critical | Có thể gây lộ dữ liệu, vi phạm quy định hoặc hướng dẫn hành động nguy hiểm | Cho phép nhập dữ liệu cấm; sai kênh báo sự cố | Bắt buộc = 0 | Sửa ngay, retest trong ngày |
| High | Sai phạm vi/phê duyệt hoặc chức năng trọng yếu không hoạt động | Ghi công cụ tham khảo là được duyệt; menu hỏng nhiều trang | Bắt buộc = 0 | 1 ngày làm việc |
| Medium | Làm giảm khả năng hiểu hoặc sử dụng nhưng có workaround | Thiếu FAQ, lỗi print cục bộ | Chỉ tồn tại khi approver chấp nhận bằng văn bản | 2 ngày làm việc |
| Low | Lỗi trình bày nhỏ, không đổi nghĩa | Khoảng cách, typo không trọng yếu | Có thể đưa vào backlog | Kỳ cập nhật kế tiếp |

## 4. Kết quả pilot ĐVKD

| Chỉ số | Ngưỡng đạt | Kết quả | Bằng chứng |
|---|---:|---:|---|
| Số người tham gia | 5–8 người, tối thiểu 2 nhóm ĐVKD | `[Điền]` | `[Điền]` |
| Hoàn thành 1 walkthrough MS365 | ≥ 90% không cần trợ giúp trực tiếp | `[Điền]` | `[Điền]` |
| Hoàn thành 1 walkthrough Amazon Quick | ≥ 90% không cần trợ giúp trực tiếp | `[Điền]` | `[Điền]` |
| Chọn đúng công cụ cho 5 tình huống mẫu | ≥ 80% câu trả lời đúng | `[Điền]` | `[Điền]` |
| Nhận biết dữ liệu không được nhập | 100% trả lời đúng tình huống bắt buộc | `[Điền]` | `[Điền]` |
| Tìm đúng kênh hỗ trợ/báo sự cố | 100% người tham gia | `[Điền]` | `[Điền]` |

## 5. Biên bản go/no-go

| Tiêu chí | Kết quả | Ghi chú/bằng chứng |
|---|---|---|
| Source register đã chốt | `[Đạt/Không đạt]` | `[Điền]` |
| Critical = 0; High = 0 | `[Đạt/Không đạt]` | `[Điền]` |
| Lỗi Medium còn lại đã được chấp nhận | `[Đạt/Không áp dụng/Không đạt]` | `[Điền]` |
| Checklist release hoàn tất | `[Đạt/Không đạt]` | `[Điền]` |
| Thông báo và website thống nhất | `[Đạt/Không đạt]` | `[Điền]` |
| Có release package và phương án rollback | `[Đạt/Không đạt]` | `[Điền]` |

**Quyết định:** `[GO / NO-GO]`  
**Phiên bản được duyệt:** `[vX.Y]`  
**Ngày hiệu lực dự kiến:** `[dd/mm/yyyy]`

## 6. Xác nhận reviewer

| Vai trò | Họ tên/Đơn vị | Phạm vi xác nhận | Kết quả | Chữ ký/xác nhận điện tử | Ngày |
|---|---|---|---|---|---|
| Chủ sở hữu nội dung | `[Điền]` | Nội dung | `[Điền]` | `[Điền]` | `[Điền]` |
| SME Microsoft 365 | `[Điền]` | Chương 04–10 | `[Điền]` | `[Điền]` | `[Điền]` |
| SME Amazon Quick | `[Điền]` | Chương 11–15 | `[Điền]` | `[Điền]` | `[Điền]` |
| ATTT | `[Điền]` | An toàn thông tin | `[Điền]` | `[Điền]` | `[Điền]` |
| Tuân thủ/Pháp chế | `[Điền]` | Tuân thủ | `[Điền]` | `[Điền]` | `[Điền]` |
| Brand/Truyền thông | `[Điền]` | Nhận diện và truyền thông | `[Điền]` | `[Điền]` | `[Điền]` |
| Người phê duyệt | `[Điền]` | Phát hành | `[Điền]` | `[Điền]` | `[Điền]` |

Xác nhận chỉ áp dụng cho phiên bản/checksum ghi tại mục 1. Bất kỳ thay đổi nội dung hoặc mã nguồn nào sau phê duyệt phải được đánh giá tác động và review lại phần liên quan.

