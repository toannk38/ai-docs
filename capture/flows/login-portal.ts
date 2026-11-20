/**
 * Cách 1: AWS access portal (IAM Identity Center) -> username, mật khẩu, MFA -> tab Applications
 * -> chọn ứng dụng Amazon Quick (trên POC ô ứng dụng mang tên account; bộ che hiển thị "opba-ai").
 * Trên POC, sau khi bấm ứng dụng, Quick có thể yêu cầu đăng nhập lại — các bước đó chỉ chạy khi màn hình xuất hiện.
 */
import { LIVE } from "../lib/config";
import type { Flow } from "../lib/flow";
import { identityCenterSteps, usernameVisible, waitForQuickHome } from "./_login-steps";

const flow: Flow = {
  name: "login-portal",
  title: "Đăng nhập Amazon Quick qua AWS access portal",
  auth: "none",
  start: (ctx) => ctx.config.startUrl,
  steps: [
    {
      id: "open-portal",
      caption: `Mở link AWS access portal của NAB: ${LIVE.portalUrl}. Bạn được chuyển tới trang đăng nhập.`,
      action: "shot",
      noAnnotate: true,
      banner: { text: LIVE.portalUrl, position: "top" },
      holdMs: 2000,
    },
    ...identityCenterSteps(),
    {
      id: "portal-applications-tab",
      caption: "Trên AWS access portal, chọn tab Applications.",
      action: "click",
      target: { role: "tab", name: /applications/i },
      label: "Tab Applications",
    },
    {
      id: "portal-quick-app",
      caption: "Bấm vào ô ứng dụng Amazon Quick (tên opba-ai). Không chọn các ứng dụng khác.",
      action: "click",
      target: { text: new RegExp(`^\\s*${LIVE.accountName}\\s*$`) },
      label: "Ứng dụng Amazon Quick (opba-ai)",
      sameTab: true,
      waitAfter: { label: "Đang mở Amazon Quick", url: /quicksight\.aws\.amazon\.com|signin\.aws/, timeoutMs: 60_000 },
    },
    ...identityCenterSteps({ prefix: "reauth", when: usernameVisible }),
    waitForQuickHome(),
  ],
};

export default flow;
