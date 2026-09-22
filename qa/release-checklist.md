# Checklist QA và phát hành

> Chỉ đánh dấu `[x]` khi có bằng chứng kiểm tra. Người chạy test ghi ngày, môi trường và đường dẫn bằng chứng; không đưa dữ liệu nhạy cảm vào package phát hành.

## 1. Thông tin lần kiểm tra

| Trường | Giá trị |
|---|---|
| Phiên bản/checksum package | `[Điền]` |
| Người kiểm tra | `[Điền]` |
| Ngày kiểm tra | `[dd/mm/yyyy]` |
| Máy/OS | `[Điền]` |
| Edge/Chrome version | `[Điền]` |
| Đường dẫn thử nghiệm | `[Local / mapped drive / UNC]` |

## 2. Package và tính toàn vẹn

- [ ] Có đúng 24 trang HTML: `index.html` ở thư mục gốc và `chapter-01` đến `chapter-23` trong `chapters/`; tất cả đều khác rỗng.
- [ ] `tools/content-quick.js` có SHA-256 `47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278`.
- [ ] Có `assets/css/style.css`, `assets/js/site.js`, `logo/NAB-logo.png`, `logo/background.png` và đủ hồ sơ QA trong `qa/`.
- [ ] Bản phát hành chính thức có thông báo DOCX/PDF đã phê duyệt; bản Markdown chỉ là nguồn biên soạn.
- [ ] Không có file tạm, file backup, credential, token, `.env`, lịch sử trình duyệt hoặc metadata nhạy cảm.
- [ ] Tạo checksum package và ghi trong `review-log.md`; bản rollback trước đó được lưu ở kho có kiểm soát.

## 3. Nội dung và nguồn

- [ ] 23/23 chương đủ mục tiêu, đối tượng, điều kiện, hướng dẫn, kiểm chứng, rủi ro, FAQ, nguồn và hỗ trợ.
- [ ] 12/12 trang MS365/Amazon Quick ưu tiên có trạng thái “Đang sử dụng tại NAB”; từng tính năng chỉ ghi “được phép” khi có bằng chứng.
- [ ] 100% walkthrough MS365 và Amazon Quick đã được SME thao tác lại trên tenant NAB.
- [ ] 6/6 trang AI tham khảo hiển thị nguyên văn: “Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.”
- [ ] Năm chương Amazon Quick giữ nguyên tên menu: “Tổng quan và giao diện Amazon Quick”, “Spaces và Chat Agents”, “Dữ liệu, Analyses và Dashboards”, “Scenarios và Quick Research”, “Quick Flows & Automate”.
- [ ] 100% trang có owner, version, ngày kiểm chứng và Source ID; không còn nguồn hết hiệu lực.
- [ ] `source-register.md` không còn nguồn bắt buộc ở trạng thái `Cần bổ sung`/`Chờ xác nhận`.
- [ ] Không còn `TODO`, `TBD`, `[Điền]`, `[Họ tên]`, `[dd/mm/yyyy]`, lorem ipsum hoặc nội dung mẫu trong artefact phát hành.
- [ ] Thuật ngữ “Microsoft 365”, “Amazon Quick”, “ĐVKD”, “CNTT” và tên chương nhất quán giữa thông báo, index và trang con.

## 4. An toàn, tuân thủ và riêng tư

- [ ] Không có dữ liệu khách hàng, số tài khoản/thẻ, giao dịch, email cá nhân, ID nhân viên, credential, token hoặc dữ liệu production trong văn bản/ảnh.
- [ ] Mỗi walkthrough có cổng phân loại dữ liệu, bước tối thiểu hóa/làm sạch dữ liệu và bước kiểm chứng của con người.
- [ ] Không hướng dẫn dùng tài khoản cá nhân, connector, upload, public link, export hoặc automation ngoài phạm vi đã phê duyệt.
- [ ] Nội dung nêu rõ AI không tự ra quyết định tín dụng, phê duyệt nghiệp vụ hoặc kết luận cuối cùng.
- [ ] Có kênh và trình tự báo sự cố đã được owner xác nhận; không công khai thông tin liên hệ nội bộ ra ngoài NAB.
- [ ] ATTT và Tuân thủ/Pháp chế đã ký xác nhận đúng phiên bản release candidate.

## 5. Thương hiệu và khả năng tiếp cận

- [ ] Logo dùng đúng file được duyệt, không méo/cắt/đổi màu; chiều rộng và chiều cao giữ đúng tỷ lệ `297:58`.
- [ ] `background.png` chỉ hỗ trợ trang trí; nội dung vẫn đọc được khi ảnh không tải và không đặt chữ trên vùng thiếu tương phản.
- [ ] Màu, typography, khoảng trống logo và giọng văn đã được Brand/Truyền thông xác nhận.
- [ ] Tất cả ảnh có `alt`; ảnh trang trí dùng `alt=""`; heading đi theo thứ tự; mỗi trang chỉ có một `h1`.
- [ ] Điều hướng hoàn toàn bằng bàn phím; focus nhìn rõ; không có keyboard trap.
- [ ] Zoom 200% không mất nội dung/chức năng; độ tương phản chữ thường ≥ 4.5:1, chữ lớn ≥ 3:1.
- [ ] Print preview A4 không cắt tiêu đề, bảng hoặc bước hướng dẫn; sidebar/điều khiển không cần thiết được ẩn khi in.

## 6. Kiểm thử kỹ thuật `file://`

- [ ] Mở `index.html` bằng double-click trên Edge và Chrome, không cần web server.
- [ ] Lặp lại trên local path, đường dẫn có dấu/khoảng trắng, mapped drive và UNC path thực tế.
- [ ] 24/24 trang tải thành công; 0 broken internal link, 0 missing asset, 0 missing fragment ID.
- [ ] 100% menu/sidebar, breadcrumb, previous/next và liên kết về trang chủ trỏ đúng trang.
- [ ] Tắt JavaScript vẫn đọc đủ nội dung và chuyển giữa mọi chương được.
- [ ] DevTools Network khi tải từng loại trang có 0 request tự động ra Internet; không có CDN, remote font, analytics, API, `fetch`, ES module hoặc service worker.
- [ ] DevTools Console có 0 error trên `index.html`, một trang MS365, một trang Amazon Quick và một trang tham khảo.
- [ ] Không có static asset dùng absolute path, `file://`, drive letter hoặc root-relative path.
- [ ] Pass viewport 1366×768 và 1920×1080; sidebar không che nội dung và nội dung chính không tràn ngang.

## 7. Kiểm tra tự động chỉ đọc được đề xuất

Chạy từ thư mục gốc. Các lệnh sau chỉ đọc file và trả mã lỗi; không sửa package.

```bash
# Đếm HTML: kết quả phải là 24 (1 trang chủ + 23 chương).
find . -maxdepth 2 -type f -name '*.html' -not -path './documents/*' | wc -l

# Phát hiện placeholder: không được có kết quả trong artefact phát hành.
rg -n 'TODO|TBD|lorem ipsum|\[Điền\]|\[Họ tên|\[dd/mm/yyyy\]' \
  --glob '*.html' --glob 'documents/*.{md,html}' .

# Phát hiện tài nguyên tự động tải từ mạng.
rg -n --pcre2 "<(?:script|img|link|iframe|source)\b[^>]*(?:src|href)=['\"](?:https?:)?//" \
  --glob '*.html' .

# Phát hiện API/module/service-worker không phù hợp file://.
rg -n --pcre2 "\bfetch\s*\(|XMLHttpRequest|navigator\.serviceWorker|type=['\"]module['\"]" \
  --glob '*.html' --glob '*.js' .

# Phát hiện asset dùng file://, drive letter hoặc đường dẫn từ root.
rg -n --pcre2 "(?:src|href)=['\"](?:file:|[A-Za-z]:\\\\|/(?!/))" \
  --glob '*.html' .

# Kiểm tra tên file chương liên tục 01..23.
for n in $(seq -w 1 23); do
  find ./chapters -maxdepth 1 -type f -name "chapter-${n}-*.html" | grep -q . || echo "Thiếu chapter-${n}"
done
```

Nên bổ sung `qa/check-release.py` bằng thư viện chuẩn Python, chỉ đọc, với các kiểm tra:

1. Parse toàn bộ HTML; kiểm tra `href`, `src`, fragment ID và tên file có tồn tại.
2. Xác nhận mỗi trang có đúng một `h1`, có `lang="vi"`, `title`, skip-link, main landmark và metadata bắt buộc.
3. Xác nhận mọi `img` có thuộc tính `alt` và mọi `id` là duy nhất trong trang.
4. Xác nhận menu trên 24 trang chứa cùng tập 23 chương và chỉ một mục có `aria-current="page"`.
5. Chặn external resource; cho phép external URL chỉ ở thẻ `a` nguồn tham khảo và phải có nhãn rõ ràng.
6. Trả exit code khác 0 nếu bất kỳ kiểm tra bắt buộc nào thất bại; không tự sửa file.

Checker hiện còn xác nhận định mức walkthrough/FAQ cho chương 04–21, metadata và Source ID của 23 chương, Source ID đã khai báo trong sổ nguồn, cùng thứ tự heading không nhảy cấp.

## 8. UAT, sign-off và phát hành

- [ ] Pilot có 5–8 người thuộc ít nhất 2 nhóm ĐVKD và đạt các ngưỡng trong `review-log.md`.
- [ ] Critical = 0; High = 0; mọi Medium còn lại có chấp thuận bằng văn bản.
- [ ] SME MS365, SME Amazon Quick, ATTT, Tuân thủ/Pháp chế, Brand và approver ký đúng version/checksum.
- [ ] Shared folder áp ACL chỉ đọc cho người dùng; chỉ owner phát hành có quyền ghi.
- [ ] Smoke test sau sao chép: mở `index.html`, một trang MS365, một trang Amazon Quick, tải logo/nền và thử previous/next.
- [ ] Ghi version, ngày hiệu lực, owner nội dung, lịch review kế tiếp và phương án thu hồi/rollback.

**Kết quả:** `[PASS / FAIL]`  
**Người xác nhận:** `[Họ tên/Đơn vị]`  
**Ngày:** `[dd/mm/yyyy]`
