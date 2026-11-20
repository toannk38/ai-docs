/** 11.3 Làm quen giao diện: trang chủ, thanh điều hướng, My stuff, menu More, menu tài khoản, Private mode. */
import type { Flow } from "../lib/flow";

const flow: Flow = {
  name: "q11-3-giao-dien",
  title: "Làm quen giao diện Amazon Quick",
  auth: "session",
  steps: [
    { id: "home", caption: "Trang chủ Amazon Quick: thanh điều hướng bên trái, ô chat ở giữa, nút tài khoản và Private mode ở góc phải.", action: "shot", noAnnotate: true },
    { id: "sidebar", caption: "Thanh điều hướng: các mục chính (Spaces, Research, Chat agents, Flows, Dashboards, Data…).", action: "shot", target: "nav, [role=navigation]", label: "Thanh điều hướng" },
    { id: "chat-box", caption: "Ô chat: chọn agent, phạm vi dữ liệu, chế độ trả lời và các nút tạo nhanh.", action: "shot", target: { placeholder: /ask a question/i }, label: "Ô chat" },
    { id: "my-stuff", caption: "My stuff: mục bạn xem gần đây (Recents) và mục yêu thích (Favorites).", action: "click", target: { text: /^\s*My stuff\s*$/ }, label: "My stuff", shotWhen: "after", waitAfter: { label: "Mở My stuff", url: /\/mystuff/, timeoutMs: 30_000 } },
    { id: "more-menu", caption: "Menu More: các mục ít dùng hơn (Automations, Knowledge, Scenarios, Stories) và Customize navigation để sắp xếp thanh điều hướng.", action: "click", target: { text: /^\s*More\s*$/ }, label: "More", shotWhen: "after", holdMs: 1200 },
    { id: "close-more", caption: "Đóng menu.", action: "press", value: "Escape", shot: false },
    { id: "account-menu", caption: "Nút tài khoản: xem account name, username, đổi ngôn ngữ, Preferences và Sign out.", action: "click", target: { text: /^\s*opba-ai\s*$/ }, label: "Tài khoản", shotWhen: "after", holdMs: 1200 },
    { id: "close-account", caption: "Đóng menu.", action: "press", value: "Escape", shot: false },
  ],
};

export default flow;
