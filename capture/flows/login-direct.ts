/**
 * Cách 2 (khuyến nghị): mở thẳng link Quick có sẵn account name -> trang đăng nhập Identity Center
 * -> username, mật khẩu, MFA -> vào Quick. Không phải nhập account name.
 * (Đã khảo sát 2026-11-19 trên POC: link dạng /sn/account/<account>/start đi thẳng tới trang Username.)
 */
import { LIVE } from "../lib/config";
import type { Flow } from "../lib/flow";
import { identityCenterSteps, waitForQuickHome } from "./_login-steps";

const flow: Flow = {
  name: "login-direct",
  title: "Đăng nhập Amazon Quick bằng link trực tiếp (đã có account name opba-ai)",
  auth: "none",
  start: (ctx) => ctx.config.appUrl,
  steps: [
    {
      id: "open-link",
      caption: `Mở link đăng nhập Amazon Quick của NAB: ${LIVE.quickDirectUrl} (nên lưu bookmark). Link đã chứa account name opba-ai nên bạn được chuyển thẳng tới trang đăng nhập.`,
      action: "shot",
      noAnnotate: true,
      banner: { text: LIVE.quickDirectUrl, position: "top" },
      holdMs: 2000,
    },
    ...identityCenterSteps(),
    waitForQuickHome(),
  ],
};

export default flow;
