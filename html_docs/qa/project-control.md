# Kiểm soát dự án, RACI và lịch review

> Tài liệu làm việc cho T01. RACI được khóa theo **vai trò**; Chủ biên phải điền người cụ thể trước kickoff. Không xem một ô vai trò là bằng chứng người đó đã review hoặc phê duyệt.

## 1. RACI

Ký hiệu: **R** — thực hiện; **A** — chịu trách nhiệm cuối; **C** — tham vấn; **I** — được thông báo.

| Hạng mục | Chủ biên | SME MS365 | SME Amazon Quick | Kỹ thuật web | ATTT/Tuân thủ/Pháp chế | Brand/Truyền thông | Đại diện ĐVKD | Approver |
|---|---|---|---|---|---|---|---|---|
| Nguồn, IA và nội dung chung | A/R | C | C | C | C | I | C | I |
| Nội dung và walkthrough MS365 | A | R | I | C | C | I | C | I |
| Nội dung và walkthrough Amazon Quick | A | I | R | C | C | I | C | I |
| Website tĩnh và kiểm thử kỹ thuật | A | C | C | R | C | C | C | I |
| Phân loại dữ liệu, connector, chia sẻ, sự cố | C | C | C | I | A/R | I | I | I |
| Logo, màu, typography và thể thức thông báo | C | I | I | R | I | A/R | I | I |
| Pilot ĐVKD | A | C | C | C | C | I | R | I |
| Go/no-go và phát hành | R | C | C | C | C | C | C | A |

## 2. Danh sách người đảm nhiệm cần khóa trước kickoff

| Vai trò | Người/đơn vị | Kênh xác nhận | Trạng thái |
|---|---|---|---|
| Chủ biên/content owner | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| SME Microsoft 365 | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| SME Amazon Quick | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| Kỹ thuật web | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| ATTT | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| Tuân thủ/Pháp chế | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| Brand/Truyền thông | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| Đại diện pilot ĐVKD | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| Người phê duyệt phát hành | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |
| Owner thư mục phát hành | Chưa được cung cấp | Chưa được cung cấp | Chờ chỉ định |

## 3. Lịch review và điều kiện vào/ra

| Mốc | Phiên review | Đầu vào bắt buộc | Đầu ra/bằng chứng |
|---|---|---|---|
| D2 | Chốt nguồn và feature matrix | Source register; danh sách owner; quyền tenant | Matrix có SME/ngày/Source ID; nguồn bắt buộc không còn thiếu |
| D8 | Alpha MS365 | Chương 04–10; walkthrough; tenant test | SME thao tác lại 100%; issue log |
| D10 | Alpha Amazon Quick | Chương 11–15; walkthrough; account test | SME thao tác lại 100%; issue log |
| D12 | Content freeze | 23 chương; thông báo; source register | Version/checksum freeze; content owner xác nhận |
| D13 | Website beta | 24 HTML; asset; checker PASS | Báo cáo static QA và package beta |
| D14–D15 | Review chuyên môn và pilot | Bản freeze; test script; nhóm pilot | Review log; kết quả 5–8 người từ ít nhất 2 nhóm |
| D16 | Regression | Issue đã sửa; release candidate | Critical/High = 0; broken link = 0; retest evidence |
| D17 | Go/no-go | Checklist; sign-off; rollback package | Quyết định GO hoặc NO-GO đúng version/checksum |
| D18 | Phát hành | Package GO; ACL; owner thư mục | Smoke test shared folder; release record; bản rollback |

## 4. Quy tắc quản lý thay đổi

- `qa/source-register.md` là sổ nguồn và feature matrix; `qa/review-log.md` là bằng chứng review/pilot/go-no-go.
- Mọi thay đổi sau content freeze phải có issue/change ID, owner, đánh giá tác động và retest phần liên quan.
- Chỉ approver được chuyển trạng thái sang GO; chỉ owner thư mục được ghi đè package phát hành.
- Không điền tên, ngày, kết quả tenant hoặc chữ ký thay cho reviewer thực tế.
