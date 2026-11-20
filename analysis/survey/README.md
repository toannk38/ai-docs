# Khảo sát giao diện Amazon Quick — POC, 19/11/2026

- Tài khoản test POC (hiển thị như LIVE: account name `opba-ai`, username `nhanvien.demo`, tên "Demo"/"Nhân viên Demo" — đã che bằng `capture/lib/env-mask.ts`). Không tìm thấy chuỗi POC còn lộ trên các ảnh dưới đây (bộ kiểm tra rò rỉ chạy trước mỗi ảnh).
- Cách đăng nhập dùng: trang Quick chung → nhập account name → Identity Center (username, mật khẩu; MFA đã tắt cho tài khoản test).
- **Tài khoản test là admin** (vào được Manage account). Theo quyết định ngày 19/11/2026: **không đưa phần quản trị vào tài liệu**; ảnh `manage-account.png` chỉ để ghi nhận.
- Chỉ đọc/điều hướng/mở menu; không tạo, sửa, xoá gì. Ảnh 1920×1080, mỗi ảnh có file `.json` cùng tên (URL đã che, tiêu đề, nút, ô nhập, chữ trên trang).
- Thông báo popup lúc vào trang chủ: "Your Reader users just got a lot more powerful — Readers now have access to the full Professional Tier feature set… use Custom permissions and Limit profiles" → phạm vi tính năng người dùng thường tại NAB phụ thuộc Custom permissions (cần SME).

## Ảnh theo khu vực

| Khu vực | Ảnh | Ghi nhận chính |
|---|---|---|
| Trang chủ | `00-home.png` | Header "AWS Quick", nút account `opba-ai` ▾, Help; "Private mode" góc phải; ô chat: chọn agent **Quick** ▾, **All data** ▾, **+**, **Smart** ▾, gửi; nút **Research / Document / Presentation / Visual** + "Show more tools"; footer "Usage is subject to AWS Responsible AI Policy"; sidebar Recents + tìm hội thoại |
| Sidebar | `nav-*.png` | New chat, Search, My stuff, Spaces, Research, Chat agents, **Apps**, Flows, Analyses, Dashboards, Data, My folders, Shared folders, More |
| Menu More | `more-menu.png`, `more-*.png` | Automations, Connectors, Knowledge, Extensions, Scenarios, Stories, Customize navigation |
| Menu tài khoản | `account-menu.png` | **Account name: opba-ai / Username: nhanvien.demo** (đặt cạnh nhau — dùng cho bảng Account name vs Username), Manage account (admin — không đưa vào tài liệu), Add another account, ngôn ngữ English (US), Region N. Virginia, Preferences, Sign out |
| Phạm vi dữ liệu chat | `chat-data-scope.png` | General knowledge / **All data** (mặc định) / Specific data; Recently viewed (Space, Dashboard); + Add |
| Chế độ chat | `chat-mode.png` | Fast / **Smart** (mặc định) / Advanced |
| My stuff | `nav-02-my-stuff.png` | Recents / Favorites (loại: Chat Agent, Space, Flow, Research…), Add widget |
| Spaces | `nav-03-spaces.png`, `space-detail.png`, `space-add-menu.png` | Danh sách (Recents/Created by me/Favorites/Shared with me/All), Create space; trong Space: mô tả, tìm, lọc, **Add → Create folder / Add knowledge / Upload files / Upload folder**, **Share**, xoá Space, bảng file (Status **Ready**, Added on, Added by); khung chat bên phải gắn với Space (+ Research, Document) |
| Research | `nav-04-research.png`, `research-new.png` (đang tải — chụp lại ở GĐ2) | Danh sách research (Investigation complete), New research |
| Chat agents | `nav-05-chat-agents.png`, `agent-create.png` | Template theo nhóm (Sales & Support, IT & Engineering, Productivity…), agent "Quick (Default)" + agent tự tạo; tạo agent bằng mô tả ("I want a chat agent that…") |
| Apps | `nav-06-apps.png`, `apps-library.png` | Tạo app từ mô tả hoặc ví dụ (Incident response tracker, Customer feedback tracker…); tab Recent / Library / My apps |
| Flows | `nav-01-flows.png`, `flow-create.png` | Tab Flow library / Triggers / Pending approval; flow pre-built (Whiteboard Notes Generator, 5-Why Root Cause…); tạo flow bằng mô tả |
| Automations | `more-automations.png`, `automations-start.png` | Projects / Groups / Triggers / Analytics / My tasks; samples multi-agent |
| Analyses / Dashboards / Data | `nav-08-analyses.png`, `nav-09-dashboards.png`, `dashboard-view.png`, `nav-10-data.png` | Generate/Create analysis; dashboard có ô "Ask a question"; Data: Datasets / Topics / Data sources, "Chat with datasets" |
| Scenarios / Stories | `more-scenarios.png`, `more-stories.png` | Create scenario; Create story |
| Connectors / Knowledge | `more-connectors.png`, `connectors-list.png`, `more-knowledge.png` | Tab Available / Create for your team (Airtable, Asana, Box, Dropbox, Gmail…); Knowledge: tạo knowledge base (vd Amazon Bedrock) |
| Extensions | `more-extensions.png`, `extensions-list.png` | Word / Outlook / Excel / PowerPoint add-in, Browser extension — "An admin must enable an extension type before it can be created" |
| Folders | `nav-11-my-folders.png`, `nav-12-shared-folders.png` | Trống |

Chưa chụp được (để GĐ2 khi dựng flow): hộp thoại Share của Space, form New research đầy đủ, Private mode bật/tắt, nút "+" đính kèm file, kết quả chat/Document/Presentation/Visual.
