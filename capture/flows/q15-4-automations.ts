/** 15.4* Automations — chỉ chụp tổng quan (không tạo, không deploy). */
import type { Flow } from "../lib/flow";

const flow: Flow = {
  name: "q15-4-automations",
  title: "Automations (tổng quan)",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/automations`,
  steps: [
    { id: "settle", caption: "Chờ.", action: "hold", holdMs: 7000, shot: false },
    { id: "overview", caption: "More → Automations: giới thiệu tính năng (tạo automation bằng AI, AI agent thao tác ứng dụng, triển khai và theo dõi).", action: "shot", target: { text: /Transform business processes with AI-powered automations/i }, label: "Automations", holdMs: 1500 },
    { id: "projects", caption: "Danh sách Projects / Groups và nút Start building — chỉ dùng khi được Khối CNTT, ATTT phê duyệt.", action: "shot", target: { role: "button", name: /^start building$/i }, label: "Start building", holdMs: 1000 },
  ],
};

export default flow;
