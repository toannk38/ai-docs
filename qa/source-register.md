# Sổ đăng ký nguồn và bằng chứng

> Trạng thái tài liệu: Mẫu làm việc — chưa phải bằng chứng phê duyệt. Không phát hành website hoặc thông báo khi các nguồn bắt buộc còn ở trạng thái `Cần bổ sung` hoặc `Chờ xác nhận`.

## 1. Thông tin kiểm soát

| Trường | Giá trị |
|---|---|
| Bộ tài liệu | Hướng dẫn ứng dụng công nghệ/AI tại NAB |
| Chủ sở hữu nội dung | `[Họ tên/Đơn vị]` |
| Người quản lý sổ nguồn | `[Họ tên/Đơn vị]` |
| Phiên bản | `[x.y]` |
| Ngày chốt nguồn | `[dd/mm/yyyy]` |
| Kỳ rà soát tiếp theo | `[dd/mm/yyyy]` |

## 2. Quy tắc sử dụng nguồn

- Thứ tự ưu tiên: quy định nội bộ NAB còn hiệu lực → bằng chứng cấu hình/tenant NAB → xác nhận của SME có thẩm quyền → tài liệu chính thức của nhà cung cấp.
- Chỉ mô tả một tính năng là **được phép tại NAB** khi có cả bằng chứng tenant/quyền sử dụng và xác nhận của owner nghiệp vụ hoặc owner nền tảng.
- Tài liệu vendor chỉ chứng minh khả năng của sản phẩm, không chứng minh NAB đã mua license, bật tính năng, phê duyệt connector hoặc cho phép xử lý một loại dữ liệu.
- Mỗi khẳng định về tính năng, dữ liệu, retention, training, connector, quyền chia sẻ hoặc automation phải dẫn tới một `Source ID` còn hiệu lực.
- Bằng chứng có ảnh chụp phải che tên khách hàng, tài khoản, email, ID, số dư, giao dịch, token và dữ liệu nội bộ không cần thiết.
- Không đóng gói bằng chứng nhạy cảm vào website phát hành; ghi đường dẫn kho nội bộ có kiểm soát trong cột `Vị trí bằng chứng`.

### Trạng thái

| Trạng thái | Ý nghĩa |
|---|---|
| Cần bổ sung | Chưa có nguồn hoặc bằng chứng. Không được phát hành nội dung liên quan. |
| Chờ xác nhận | Đã có nguồn nhưng chưa được reviewer có thẩm quyền xác nhận. |
| Đã xác thực | Nguồn, phạm vi và ngày hiệu lực đã được kiểm tra. |
| Hết hiệu lực | Nguồn đã hết hạn, bị thay thế hoặc cấu hình thực tế đã thay đổi. |

## 3. Danh mục nguồn

| Source ID | Loại | Tên nguồn/bằng chứng | Phạm vi sử dụng | Owner/Reviewer | Ngày hiệu lực hoặc truy cập | Ngày rà soát lại | Vị trí bằng chứng | Trạng thái |
|---|---|---|---|---|---|---|---|---|
| NAB-POL-001 | Chính sách nội bộ | `[Quy định phân loại và xử lý dữ liệu]` | Chương 02–03 và mọi walkthrough | `[ATTT/Tuân thủ]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| NAB-POL-002 | Chính sách nội bộ | `[Quy định sử dụng dịch vụ cloud/AI]` | Toàn bộ công cụ | `[ATTT/Tuân thủ]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| NAB-POL-003 | Quy trình nội bộ | `[Quy trình báo cáo và xử lý sự cố]` | Chương 02 và 23 | `[Đầu mối sự cố]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| NAB-BRAND-001 | Nhận diện thương hiệu | `[Brand guideline/template NAB còn hiệu lực]` | Index, CSS, thông báo | `[Brand/Truyền thông]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| NAB-MS-001 | Bằng chứng tenant | Feature/license matrix Microsoft 365 tại NAB | Chương 04–10 | `[SME MS365]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| NAB-MS-002 | Bằng chứng walkthrough | Kết quả thao tác lại các hướng dẫn MS365 trên tenant NAB | Chương 04–10 | `[SME MS365]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| VEN-MS-001 | Tài liệu vendor | Microsoft Learn/Support — Microsoft 365 Copilot | Khả năng sản phẩm, không thay cho phê duyệt NAB | `[SME MS365]` | 19/08/2026 | `[dd/mm/yyyy]` | `https://learn.microsoft.com/en-us/copilot/microsoft-365/` và nguồn từng chương | Chờ xác nhận |
| NAB-AQ-001 | Bằng chứng tenant | Feature/role/connector matrix Amazon Quick tại NAB | Chương 11–15 | `[SME Amazon Quick]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| NAB-AQ-002 | Bằng chứng walkthrough | Kết quả thao tác lại các hướng dẫn Amazon Quick tại NAB | Chương 11–15 | `[SME Amazon Quick]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| VEN-AQ-001 | Tài liệu vendor | AWS — Amazon Quick User Guide | Khả năng sản phẩm, không thay cho phê duyệt NAB | `[SME Amazon Quick]` | 19/08/2026 | `[dd/mm/yyyy]` | `https://docs.aws.amazon.com/quick/latest/userguide/what-is.html` và nguồn từng chương | Chờ xác nhận |
| NAB-OTH-001 | Phê duyệt nội bộ | Danh mục công cụ AI ngoài MS365/Amazon Quick được phép sử dụng | Chương 16–21 | `[Owner phê duyệt]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |
| VEN-OAI-001 | Tài liệu vendor | OpenAI Docs — ChatGPT Work admin FAQ | Chương 16; khả năng sản phẩm, không thay phê duyệt NAB | `[SME/ATTT]` | 19/08/2026 | `[dd/mm/yyyy]` | `https://learn.chatgpt.com/docs/enterprise/work-admin-faq` | Chờ xác nhận |
| VEN-GGL-001 | Tài liệu vendor | Google Workspace AI, AI privacy và NotebookLM Help | Chương 17 và 19 | `[SME/ATTT]` | 19/08/2026 | `[dd/mm/yyyy]` | Nguồn chính thức ghi trong từng chương | Chờ xác nhận |
| VEN-ANT-001 | Tài liệu vendor | Anthropic Claude Help Center | Chương 18 | `[SME/ATTT]` | 19/08/2026 | `[dd/mm/yyyy]` | `https://support.anthropic.com/` | Chờ xác nhận |
| VEN-PPLX-001 | Tài liệu vendor | Perplexity Enterprise | Chương 20 | `[SME/ATTT]` | 19/08/2026 | `[dd/mm/yyyy]` | `https://www.perplexity.ai/enterprise` | Chờ xác nhận |
| VEN-CANVA-001 | Tài liệu vendor | Canva AI và hướng dẫn sử dụng an toàn | Chương 21 | `[SME/ATTT/Brand]` | 19/08/2026 | `[dd/mm/yyyy]` | Nguồn chính thức ghi trong chương | Chờ xác nhận |
| NAB-SUP-001 | Danh bạ nội bộ | Service Desk, đầu mối cấp quyền và báo sự cố | Chương 23 và footer | `[CNTT]` | `[dd/mm/yyyy]` | `[dd/mm/yyyy]` | `[Link kho nội bộ]` | Cần bổ sung |

## 4. Ma trận xác nhận tính năng tại NAB

Không suy diễn từ tên gói hoặc tài liệu vendor. SME đổi `Chờ xác nhận` thành `Có`, `Không` hoặc `Giới hạn`; đồng thời điền phạm vi, client/Region nếu áp dụng, bằng chứng tenant và ngày thao tác lại. `Source ID` vendor không thay thế `NAB-MS-001`/`NAB-AQ-001`.

| Chương | Tính năng cần xác nhận | Trạng thái NAB | License/role/client/Region và giới hạn | Source ID tenant | SME xác nhận/ngày |
|---|---|---|---|---|---|
| 04 | Tenant NAB, tài khoản doanh nghiệp và ứng dụng M365 được hỗ trợ | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 04–05 | Copilot Chat và enterprise data protection | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 04–05 | Microsoft 365 Copilot add-on; Work IQ/Graph grounding | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 04–05 | Web search, file upload và thay đổi data source | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 04–10 | Purview/DLP, sensitivity label, retention và audit áp dụng | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 06 | Teams transcription/recording và meeting policy | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 06 | Copilot recap, action item, chat và channel | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 07 | Outlook summarize, draft/reply, coaching và shared/delegated mailbox | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 08 | Word draft, rewrite, summary/Q&A và reference source | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 09 | Excel Edit/Plan/Chat, formula, insight, PivotTable/chart và web import | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 10 | PowerPoint create from source, summary/notes, Designer và Brand Kit | Chờ xác nhận | `[Điền]` | NAB-MS-001 | `[Điền]` |
| 11 | Amazon Quick account, subscription, Region và role | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 12 | Quick Sight dashboard/filter/KPI và Quick BI chat | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 12 | SPICE/Direct Query, refresh và control total | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 12 | RLS/CLS, export và chia sẻ dashboard | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 13 | Quick Research: web/internal source, citation và evidence | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 13 | Quick Index/knowledge base: connector, sync, ACL và permission test | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 14 | Quick Flows read-only, schedule, monitoring và retry | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 14 | Quick Automate: hành động ghi, approval/HITL, idempotency và rollback | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 15 | Apps: integration, READ/WRITE và private/shared storage | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |
| 15 | Apps: sandbox/UAT, publish Limited, share và rollback | Chờ xác nhận | `[Điền]` | NAB-AQ-001 | `[Điền]` |

### Nhật ký thao tác lại walkthrough

Mỗi walkthrough chương 04–15 cần một dòng; `Đạt` chỉ dùng khi SME đã làm lại trên tenant/account NAB bằng dữ liệu giả lập đã duyệt.

| Chapter/walkthrough | Môi trường và client/Region | Dữ liệu thử | Kết quả (`Đạt/Không đạt/Giới hạn`) | Bằng chứng kiểm soát | SME/ngày |
|---|---|---|---|---|---|
| `[04–15 / WT-01..03]` | `[Điền]` | `[Mã bộ dữ liệu giả lập]` | Chờ thao tác | `[Link kho nội bộ]` | `[Điền]` |

## 5. Nhật ký thay đổi nguồn

| Ngày | Source ID | Thay đổi | Chương bị ảnh hưởng | Người đánh giá | Hành động nội dung |
|---|---|---|---|---|---|
| `[dd/mm/yyyy]` | `[ID]` | `[Thêm/Sửa/Hết hiệu lực]` | `[Chương]` | `[Họ tên]` | `[Không đổi/Cập nhật/Thu hồi]` |

## 6. Điều kiện chốt nguồn

- [ ] Các nguồn chính sách, brand, danh bạ hỗ trợ và ma trận tenant đều ở trạng thái `Đã xác thực`.
- [ ] 100% walkthrough MS365 và Amazon Quick có bằng chứng SME thao tác lại.
- [ ] 100% trang có owner, phiên bản, ngày kiểm chứng và danh sách Source ID.
- [ ] Các trang công cụ tham khảo có cảnh báo: “Không đồng nghĩa với việc được NAB phê duyệt sử dụng.”
- [ ] Không còn khẳng định không có nguồn; không còn source đã hết hiệu lực.
