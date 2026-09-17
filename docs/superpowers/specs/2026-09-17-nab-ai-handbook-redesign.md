# Thiết kế cập nhật Cẩm nang ứng dụng AI và công nghệ tại NAB

## 1. Mục tiêu

Cập nhật website tài liệu tĩnh hiện tại thành cẩm nang thực hành ngắn gọn, trực quan cho người dùng nội bộ NAB. Tài liệu hướng dẫn cách chọn công cụ, bảo vệ dữ liệu, kiểm chứng kết quả và phối hợp với Khối CNTT để ứng dụng công nghệ vào công việc.

Microsoft 365 và Amazon Quick là hai nhóm trọng tâm vì đang được sử dụng tại NAB. Các dịch vụ AI công cộng chỉ được giới thiệu để tham khảo theo nhu cầu; việc xuất hiện trong cẩm nang không đồng nghĩa với việc được NAB phê duyệt sử dụng.

## 2. Nguyên tắc kiến trúc

- Giữ website HTML, CSS và JavaScript thuần, hoạt động khi mở trực tiếp bằng `file://`.
- Giữ `tools/build-site.js` làm nguồn sinh `index.html` và 23 trang trong `chapters/`.
- Không sửa thủ công từng trang HTML vì sẽ gây sai lệch với nguồn nội dung.
- Giữ bố cục desktop ba cột, sidebar, tìm kiếm, FAQ, lightbox, previous/next và responsive hiện tại.
- Bổ sung các khối nội dung có cấu trúc như bảng so sánh, bảng dữ liệu, nhãn trạng thái và callout cảnh báo.
- Không thêm dependency hoặc tài nguyên từ CDN.

## 3. Cấu trúc 23 chương

### AI trong công việc

1. Tổng quan
2. Nguyên tắc sử dụng AI an toàn
3. Kỹ thuật viết Prompt

### Microsoft 365 - TRỌNG TÂM

4. Microsoft 365 tổng quan
5. Copilot
6. Teams
7. Outlook
8. Word
9. Excel
10. PowerPoint

### Amazon Quick - TRỌNG TÂM

11. Tổng quan và giao diện Amazon Quick
12. Spaces và Chat Agents
13. Quick Sight - Dữ liệu, Analyses và Dashboards
14. Scenarios, Quick Research và Index
15. Quick Flows, Automate và Apps

### AI phổ biến - THAM KHẢO

16. Chọn AI theo nhu cầu
17. AI hội thoại và trợ lý đa năng
18. NotebookLM - Làm việc với tài liệu
19. AI thiết kế và trình bày
20. AI tạo hình ảnh và video
21. AI Agent và tự động hóa

### Phụ lục

22. Dữ liệu được phép và không được phép
23. Giải thích thuật ngữ

## 4. Xử lý nội dung trọng tâm

### Microsoft 365

Giữ gần như nguyên vẹn nội dung hiện có trong các chương 04-10, bao gồm mục tiêu, điều kiện, use case, walkthrough, rủi ro, FAQ và nguồn. Chỉ rút gọn câu chữ, đổi nhãn menu và thống nhất thuật ngữ nếu cần; không loại bỏ nội dung nghiệp vụ còn giá trị.

### Amazon Quick

Amazon Quick tiếp tục có năm chương và `Spaces và Chat Agents` vẫn là một chương lớn độc lập. Toàn bộ nội dung Amazon Quick hiện có phải được giữ nguyên, bao gồm phần giới thiệu, mục tiêu, điều kiện, use case, guide sections, walkthrough, hình minh họa, kiểm soát, FAQ và nguồn. Việc cập nhật chỉ được đổi nhãn điều hướng hoặc bổ sung nội dung còn thiếu; không rút gọn, viết lại hoặc loại bỏ nội dung hiện tại.

- Chương 11 giữ nguyên toàn bộ hướng dẫn đăng nhập, giao diện Home, Private Mode, sidebar, chat controls, output shortcuts và điều kiện truy cập an toàn.
- Chương 12 giữ nguyên toàn bộ nội dung tạo Space, quản lý files, datasets, dashboards, topics, members, tạo Custom Agent, reference documents, action connectors và least-privilege sharing.
- Chương 13 giữ nguyên toàn bộ nội dung Data Sources, Datasets, SPICE, Direct Query, Analyses, Dashboards, refresh, chia sẻ và RLS/CLS. Chỉ bổ sung cụm `Quick Sight` vào tên hiển thị để người dùng nhận biết nhanh nhóm năng lực BI.
- Chương 14 giữ nguyên toàn bộ nội dung Scenarios và Quick Research. Nội dung Quick Index/Knowledge Base, connector, đồng bộ nguồn, ACL, kiểm thử quyền và xử lý nguồn lỗi thời được bổ sung sau nội dung hiện có. Scenarios không bị đổi tên thành Index; đây là các năng lực riêng trong cùng nhóm phân tích và nghiên cứu.
- Chương 15 giữ nguyên toàn bộ nội dung Quick Flows và Quick Automate. Quick Apps chỉ được bổ sung thành một section tham khảo ở cuối chương, tập trung vào prototype, quyền đọc/ghi, UAT và phát hành giới hạn.

## 5. Nội dung AI tham khảo

Các chương 16-21 chỉ dùng dữ liệu công khai. Không được nhập, sao chép, tải lên hoặc kết nối dữ liệu của Nam A Bank, dữ liệu khách hàng, tài liệu nội bộ, ảnh chụp màn hình hệ thống, mã nguồn, cấu hình hay bất kỳ dữ liệu nội bộ nào vào các dịch vụ AI tham khảo. Mọi ví dụ, Prompt, tệp minh họa và walkthrough trong nhóm này phải sử dụng dữ liệu công khai.

Mỗi chương 16-21 phải hiển thị cảnh báo ở vị trí dễ nhận biết:

> Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.

### Chọn công cụ theo nhu cầu

Chương 16 cung cấp bảng tra cứu bắt đầu từ công việc cần hoàn thành. Microsoft 365 và Amazon Quick luôn được đặt ở cột ưu tiên tại NAB khi phù hợp; dịch vụ AI công cộng nằm ở cột tham khảo và chỉ áp dụng cho dữ liệu công khai.

### AI hội thoại và trợ lý đa năng

Chương 17 gộp ChatGPT, Claude, Gemini, Perplexity và Grok. Các công cụ chỉ được minh họa bằng nội dung công khai. Trang gồm:

- Giải thích ngắn về AI hội thoại và trợ lý đa năng.
- Bảng so sánh theo thế mạnh chính và tình huống phù hợp.
- Bảng chọn nhanh theo nhu cầu.
- Ghi chú rõ đây không phải bảng xếp hạng cố định; năng lực thay đổi theo thời gian và cần đối chiếu nguồn chính thức cùng cộng đồng chuyên môn đáng tin cậy.

### NotebookLM

Chương 18 trình bày NotebookLM như công cụ làm việc trên tập tài liệu công khai do người dùng cung cấp. Trang nêu các tình huống hỏi đáp, tóm tắt, tổng hợp, tạo FAQ và ghi chú; đồng thời hiển thị cảnh báo nổi bật không tải dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc tài liệu nội bộ lên dịch vụ này.

### Thiết kế, hình ảnh và video

- Chương 19 giới thiệu Canva AI, Gamma, Napkin AI và Microsoft Designer theo các tình huống slide, infographic, sơ đồ, banner và nội dung trực quan sử dụng dữ liệu công khai.
- Chương 20 giới thiệu các nhóm công cụ tạo hình ảnh và video, kèm cảnh báo không sử dụng hình ảnh khách hàng, nhân viên, tài sản nội bộ, ảnh chụp màn hình hệ thống hoặc dữ liệu của Nam A Bank làm đầu vào; đồng thời cảnh báo về deepfake và yêu cầu kiểm tra đầu ra trước khi sử dụng chính thức.

### AI Agent và tự động hóa

Chương 21 giải thích sự khác nhau giữa chatbot và AI Agent, giới thiệu OpenClaw, n8n AI, Microsoft Copilot Studio, Dify và Flowise ở mức tham khảo kỹ thuật. Trang mang nhãn `NÂNG CAO`, chỉ sử dụng ví dụ công khai và không hướng dẫn kết nối các công cụ tham khảo vào hệ thống, tài khoản hoặc dữ liệu của Nam A Bank.

## 6. Tái sử dụng nội dung cũ

- Nội dung tình huống nghiệp vụ được đưa vào Chương 01 và bảng chọn công cụ tại Chương 16.
- Vai trò, ranh giới trách nhiệm và quy trình hỗ trợ của Khối CNTT được đưa vào Chương 01, trang chủ và Chương 21.
- Nội dung quản trị rủi ro được tái sử dụng trong Chương 02 và Chương 22.
- Nội dung riêng về ChatGPT, Claude, Gemini và Perplexity được rút gọn và gộp vào Chương 17.
- Nội dung Canva AI được chia giữa Chương 19 và Chương 20 theo loại đầu ra.
- Nội dung Microsoft 365 còn giá trị được giữ lại; việc chuyển chương không làm mất walkthrough, kiểm soát hoặc FAQ quan trọng.
- Toàn bộ nội dung Amazon Quick hiện có được bảo toàn; nội dung Index và Apps chỉ được bổ sung sau phần hiện tại.

## 7. An toàn dữ liệu

Chương 02 và Chương 22 dùng chung một bảng phân loại gồm ba mức:

| Phân loại | Ví dụ | AI công cộng |
|---|---|---|
| Được phép | Nội dung công khai; văn bản mẫu không có dữ liệu thật | Có thể sử dụng trong công cụ đã được NAB cho phép; vẫn cần kiểm tra nguồn và bản quyền |
| Cần thận trọng | Nội dung công việc nội bộ nhưng không có dữ liệu nhạy cảm | Thực hiện theo quy định nội bộ và chỉ trong môi trường, tài khoản, tính năng đã được phê duyệt |
| Nghiêm cấm | Dữ liệu khách hàng, giao dịch, tài khoản, CCCD, mật khẩu, khóa API, dữ liệu mật, mã nguồn nhạy cảm, cấu hình hệ thống | Không được đưa lên dịch vụ AI công cộng khi chưa được phê duyệt |

Cảnh báo bắt buộc:

> Không nhập, sao chép hoặc tải dữ liệu khách hàng, dữ liệu giao dịch, tài liệu mật, thông tin xác thực hoặc dữ liệu nội bộ nhạy cảm lên các dịch vụ AI công cộng khi chưa được phê duyệt.

Tài liệu không tự tạo thêm chính sách nội bộ. Các nội dung về quyền, phân loại và phê duyệt luôn được trình bày như hướng dẫn và phải đối chiếu quy định NAB đang có hiệu lực.

Đối với riêng nhóm AI phổ biến - tham khảo, cẩm nang áp dụng ranh giới đơn giản và thống nhất: chỉ sử dụng dữ liệu công khai, không sử dụng dữ liệu của Nam A Bank hoặc dữ liệu nội bộ.

## 8. Giao diện và điều hướng

- Sidebar có năm nhóm, tiếp tục cho phép thu gọn và mở rộng.
- Trên trang chủ, các nhóm có thể mở để người dùng thấy toàn bộ cấu trúc; trên trang chương, nhóm hiện tại phải mở và mục hiện tại được highlight rõ.
- Tìm kiếm sidebar tiếp tục lọc trên dữ liệu đã render sẵn, không gửi dữ liệu ra ngoài.
- Microsoft 365 và Amazon Quick hiển thị nhãn chữ `TRỌNG TÂM`.
- Nhóm AI công cộng hiển thị nhãn `THAM KHẢO`.
- Chương AI Agent hiển thị nhãn `NÂNG CAO`.
- Callout cảnh báo bảo mật dùng màu đỏ và có độ tương phản cao hơn callout thông tin.
- Bảng phải có wrapper cuộn ngang ở màn hình hẹp để không làm hỏng responsive.
- Giữ màu sắc, logo, typography, card, khoảng cách và phong cách tổng thể hiện tại.

## 9. Nguồn dữ liệu và tệp thay đổi

Nguồn nội dung và renderer dự kiến thay đổi:

- `tools/build-site.js`
- `tools/content-general.js`
- `tools/content-quick.js`
- `tools/content-reference.js`
- `tools/content-glossary.js` (tạo mới)
- `assets/css/style.css`
- `assets/js/site.js` chỉ thay đổi nếu cần cho hành vi accordion hoặc highlight
- `qa/check-release.py`
- `qa/source-register.md`

`tools/content-ms365.js` chỉ được thay đổi khi cần thống nhất nhãn hoặc thuật ngữ. `index.html` và `chapters/*.html` được sinh lại từ build script.

## 10. Kiểm thử và tiêu chí hoàn tất

- Build tạo đúng `index.html` và 23 tệp chương có numbering liên tục.
- Menu trên tất cả các trang chứa cùng một danh sách chương, đúng nhóm và đúng liên kết.
- Breadcrumb, previous/next, anchor và mục lục trong trang không bị hỏng.
- Không còn tệp chương cũ không nằm trong cấu trúc mới.
- Không có ID trùng, section trùng, H1 trùng hoặc heading nhảy cấp.
- Tất cả ảnh có `alt`; bảng không tràn ngang ở viewport hẹp.
- Chương 12 vẫn là chương lớn độc lập về Spaces và Chat Agents.
- Nội dung HTML sinh ra cho các chương 11-15 phải chứa đầy đủ toàn bộ nội dung Amazon Quick hiện có trước khi bổ sung Index và Apps.
- Các cảnh báo bắt buộc xuất hiện tại Chương 02, 18, 20, 21 và 22.
- Tất cả chương 16-21 hiển thị cảnh báo chỉ sử dụng dữ liệu công khai và không sử dụng dữ liệu của Nam A Bank hoặc dữ liệu nội bộ.
- Microsoft 365 và Amazon Quick có nhãn `TRỌNG TÂM`; AI công cộng có nhãn `THAM KHẢO`; AI Agent có nhãn `NÂNG CAO`.
- Chạy thành công `node tools/build-site.js`, `node --check` cho JavaScript và `python3 qa/check-release.py`.
- Kiểm tra thủ công trên desktop, viewport hẹp, menu accordion, tìm kiếm, FAQ, lightbox và highlight mục hiện tại.
