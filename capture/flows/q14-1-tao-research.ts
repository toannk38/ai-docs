/** 14.1 Tạo một nghiên cứu: nguồn là Space văn bản luật (Quick assets), tắt Web search. Dừng sau khi bắt đầu chạy. */
import type { Flow } from "../lib/flow";
import { SPACE_NAME } from "./q12-2-tao-space";

export const RESEARCH_OBJECTIVE =
  "So sánh quy định về các loại hình tổ chức tín dụng trong Luật Các tổ chức tín dụng và luật sửa đổi, bổ sung: loại hình nào được thêm, bỏ hoặc đổi tên; điều kiện thành lập và phạm vi hoạt động thay đổi thế nào. Chỉ dùng các văn bản trong Space được chọn, trích dẫn số điều, khoản cụ thể. Trình bày bằng tiếng Việt, có bảng so sánh.";

const flow: Flow = {
  name: "q14-1-tao-research",
  title: "Tạo một nghiên cứu",
  auth: "session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/research`,
  steps: [
    { id: "settle", caption: "Chờ.", action: "hold", holdMs: 4000, shot: false },
    { id: "new", caption: "Mở Research trên thanh điều hướng, bấm New research.", action: "click", target: { role: "button", name: /^new research$/i }, label: "New research", shotWhen: "before", waitAfter: { label: "Mở form", visible: { text: /Research objective/i }, timeoutMs: 60_000 } },
    { id: "record", caption: "Ghi research.", action: "custom", shot: false, run: async (ctx) => ctx.recordCreated("research", "So sánh loại hình TCTD (demo)", ctx.page.url()) },
    { id: "coach", caption: "Đóng hướng dẫn nổi (Dismiss all).", action: "click", target: { text: /^\s*Dismiss all\s*$/ }, shot: false, when: async (ctx) => ctx.page.getByText(/^\s*Dismiss all\s*$/).first().isVisible().catch(() => false), holdMs: 1000 },
    { id: "form", caption: "Form New research: Research objective (mục tiêu), Research mode, Research materials (nguồn).", action: "shot", target: { text: /Research objective/i }, label: "Mục tiêu nghiên cứu", holdMs: 1000 },
    { id: "objective", caption: "Viết mục tiêu cụ thể: câu hỏi, phạm vi, nguồn được dùng, cách trình bày kết quả.", action: "fill", target: "textarea >> nth=0", value: RESEARCH_OBJECTIVE, label: "Mục tiêu" },
    { id: "mode", caption: "Bấm Research mode để chọn chế độ (Fast nhanh hơn; chế độ sâu hơn mất nhiều thời gian hơn).", action: "click", target: { text: /^\s*Research mode:/ }, label: "Research mode", shotWhen: "after", holdMs: 1200 },
    { id: "mode-close", caption: "Giữ chế độ đang chọn.", action: "press", value: "Escape", shot: false },
    {
      id: "web-off",
      caption: "Tắt Web search khi chỉ được dùng tài liệu nội bộ đã chọn.",
      action: "click",
      target: '[role="switch"]:visible >> nth=0',
      label: "Web search",
      shotWhen: "after",
      holdMs: 1000,
    },
    { id: "assets-on", caption: "Bật Quick assets để dùng tài liệu đã có trong Quick (Space, dashboard…).", action: "click", target: '[role="switch"]:visible >> nth=1', label: "Quick assets", shotWhen: "after", holdMs: 1000 },
    { id: "select", caption: "Chọn Select data and apps (chỉ dùng nguồn bạn chọn), rồi bấm Browse.", action: "click", target: { text: /^\s*Select data and apps\s*$/ }, label: "Select data and apps", shot: false, holdMs: 800 },
    { id: "browse", caption: "Bấm Browse.", action: "click", target: { text: /^\s*Browse\s*$/ }, label: "Browse", shotWhen: "before", holdMs: 3000 },
    { id: "tab-spaces", caption: "Hộp thoại Add Quick assets: chọn tab Spaces.", action: "click", target: { text: /^\s*Spaces\s*$/ }, label: "Spaces", shot: false, holdMs: 2000 },
    {
      id: "pick",
      caption: "Tích chọn Space chứa tài liệu cần nghiên cứu.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        const box = ctx.page.getByText(SPACE_NAME, { exact: true }).last().locator("xpath=ancestor::*[.//input[@type='checkbox']][1]//input[@type='checkbox']").first();
        await box.check({ force: true });
        await ctx.page.waitForTimeout(800);
        if (!(await box.isChecked())) throw new Error("Chưa tích được Space");
      },
    },
    { id: "picked", caption: "Tích chọn Space chứa tài liệu cần nghiên cứu, rồi bấm Add.", action: "shot", target: { role: "button", name: /^add$/i }, label: "Add", holdMs: 800 },
    { id: "add", caption: "Bấm Add.", action: "click", target: { role: "button", name: /^add$/i }, label: "Add", shot: false, holdMs: 2000 },
    { id: "added", caption: "Space đã được thêm vào Quick assets (Spaces (1)); Review plan và Start researching sáng lên.", action: "shot", target: { text: /^\s*Spaces \(1\)\s*$/ }, label: "Nguồn đã chọn", holdMs: 1000 },
    {
      id: "plan",
      caption: "Bấm Review plan để xem kế hoạch nghiên cứu Quick đề xuất.",
      action: "click",
      target: { role: "button", name: /^review plan$/i },
      label: "Review plan",
      shotWhen: "before",
      waitAfter: { label: "Quick lập kế hoạch", visible: { text: /Topics to explore/i }, timeoutMs: 300_000 },
      holdMs: 3000,
    },
    { id: "plan-view", caption: "Kế hoạch nghiên cứu: kiểm tra các mục, sửa nếu cần trước khi chạy.", action: "shot", noAnnotate: true, holdMs: 1500 },
    { id: "start", caption: "Bấm Start researching.", action: "click", target: { role: "button", name: /start research/i }, label: "Start researching", shotWhen: "before", holdMs: 15_000 },
    { id: "running", caption: "Research đang chạy: theo dõi tiến độ; có thể rời trang, quay lại sau ở mục Research.", action: "shot", noAnnotate: true, holdMs: 1000 },
  ],
};

export default flow;
