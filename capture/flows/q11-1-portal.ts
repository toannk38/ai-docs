/**
 * 11.1 Đăng nhập qua AWS access portal (POC: thư mục Identity Center của portal, MFA đã tắt cho tài khoản test).
 * Dừng ở bước khoanh ô ứng dụng opba-ai — trên POC bấm ô ứng dụng sẽ chuyển sang thư mục Identity Center khác.
 */
import { LIVE } from "../lib/config";
import type { Flow } from "../lib/flow";
import { identityCenterSteps } from "./_login-steps";
import { LOGIN_CLIP } from "./_login-steps";

const flow: Flow = {
  name: "q11-1-portal",
  title: "Đăng nhập Amazon Quick qua AWS access portal",
  auth: "none",
  start: (ctx) => ctx.config.startUrl,
  steps: [
    {
      id: "open-portal",
      clip: LOGIN_CLIP,
      caption: `Mở link AWS access portal của NAB (${LIVE.portalUrl}); trang đăng nhập hiện ra.`,
      action: "shot",
      target: { label: /^username$/i },
      label: "Trang đăng nhập",
      banner: { text: LIVE.portalUrl, position: "top" },
      holdMs: 1500,
    },
    ...identityCenterSteps(),
    {
      id: "portal-loaded",
      caption: "Đăng nhập xong, trang AWS access portal hiện ra.",
      action: "waitFor",
      shot: false,
      waitAfter: { label: "Đang tải AWS access portal", visible: { role: "tab", name: /applications/i }, timeoutMs: 60_000 },
    },
    {
      id: "accounts-loaded",
      caption: "Chờ danh sách Accounts tải xong (tối đa 20 giây, không bắt buộc).",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        await ctx.page.getByText(/Loading accounts/i).first().waitFor({ state: "hidden", timeout: 20_000 }).catch(() => undefined);
        await ctx.page.waitForTimeout(800);
      },
    },
    {
      id: "applications-tab",
      caption: "Chọn tab Applications.",
      action: "click",
      target: { role: "tab", name: /applications/i },
      label: "Tab Applications",
      waitAfter: { label: "Tải danh sách ứng dụng", visible: { text: /^\s*opba-ai\s*$/ }, timeoutMs: 30_000 },
    },
    {
      id: "quick-app-tile",
      caption: "Bấm vào ô ứng dụng opba-ai (biểu tượng Amazon Quick). Không chọn ứng dụng khác trong danh sách.",
      action: "shot",
      target: ':is(a, button, [role="button"], [role="link"]):has-text("opba-ai")',
      label: "Ứng dụng Amazon Quick: opba-ai",
      holdMs: 1500,
    },
  ],
};

export default flow;
