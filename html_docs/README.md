# AI for Bank — Cẩm nang nội bộ NAB

Website tài liệu tĩnh sử dụng HTML, CSS và JavaScript thuần.

## Chạy bằng HTTP server

Từ thư mục gốc của dự án, chạy:

```bash
python3 -m http.server 8999 --bind 0.0.0.0
```

Thông tin mặc định:

- Host: `127.0.0.1`
- Port: `8000`
- URL: <http://127.0.0.1:8000/>

Để tùy chỉnh host và port:

```bash
SERVER_HOST=127.0.0.1
SERVER_PORT=8080
python3 -m http.server "$SERVER_PORT" --bind "$SERVER_HOST"
```

Để các thiết bị khác trong cùng mạng LAN truy cập, dùng host `0.0.0.0`:

```bash
SERVER_HOST=0.0.0.0
SERVER_PORT=8000
python3 -m http.server "$SERVER_PORT" --bind "$SERVER_HOST"
```

Sau đó truy cập từ thiết bị khác bằng địa chỉ IP của máy chạy server, ví dụ:

```text
http://192.168.1.10:8000/
```

Nhấn `Ctrl+C` trong terminal để dừng server. Khi mở cho mạng LAN, cần bảo đảm firewall cho phép kết nối tới port đã chọn.
