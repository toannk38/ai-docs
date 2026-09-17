# Kế hoạch đồng bộ giao diện cẩm nang

- Giữ `tools/content-*.js` làm nguồn nội dung chuyên môn cho 23 chương.
- Dùng `tools/build-site.js` để sinh lại trang chủ và toàn bộ trang chương với cùng portal shell.
- Tái tạo thiết kế của `tmp.html` bằng CSS/JavaScript cục bộ để hỗ trợ cả HTTP và `file://`.
- Giữ nguyên tên file, liên kết, metadata, FAQ, walkthrough, nguồn và chức năng lọc hiện có.
- Kiểm tra release, tài nguyên cục bộ và responsive tại 375px, 768px, 1024px, 1440px.
