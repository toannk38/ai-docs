/**
 * Khai báo một "flow" (một thao tác cần hướng dẫn) dạng dữ liệu.
 * Mỗi flow chạy độc lập: npx tsx capture/run.ts <flow>
 */
import type { BrowserContext, Locator, Page } from "playwright";
import type { CaptureConfig } from "./config";

/** Cách tìm phần tử — ưu tiên theo vai trò/nhãn hiển thị (đã qua bộ che: dùng chữ LIVE, vd "opba-ai"). */
export type Target =
  | string // CSS / Playwright selector
  | { role: Parameters<Page["getByRole"]>[0]; name?: string | RegExp; exact?: boolean; nth?: number }
  | { label: string | RegExp; nth?: number }
  | { text: string | RegExp; exact?: boolean; nth?: number }
  | { placeholder: string | RegExp; nth?: number }
  | { testId: string; nth?: number };

export interface FlowContext {
  page: Page;
  context: BrowserContext;
  config: CaptureConfig;
  /** Dữ liệu dùng chung giữa các bước (vd tên Space do script tạo). */
  vars: Record<string, string>;
  /** Ghi đối tượng do flow tạo trên POC vào capture/out/created.json (để dọn đúng đối tượng sau này). */
  recordCreated: (kind: string, name: string, url: string) => void;
}

export type Dynamic<T> = T | ((ctx: FlowContext) => T | Promise<T>);

export interface WaitSpec {
  /** Mô tả trạng thái đang chờ, vd "Space đang index tài liệu". */
  label: string;
  visible?: Target;
  hidden?: Target;
  url?: RegExp;
  /** Điều kiện tuỳ ý, kiểm tra mỗi 2 giây tới khi đúng (vd mọi tài liệu ở trạng thái Ready). */
  until?: (ctx: FlowContext) => Promise<boolean>;
  timeoutMs?: number;
}

export interface Step {
  id?: string;
  /** Chú thích tiếng Việt — dùng cho ảnh, phụ đề video và nội dung tài liệu. */
  caption: string;
  action: "goto" | "click" | "type" | "fill" | "press" | "upload" | "hover" | "waitFor" | "hold" | "shot" | "custom";
  target?: Target;
  value?: Dynamic<string>;
  /** Giá trị bí mật (mật khẩu, mã MFA): không bao giờ ghi log/steps.json. */
  secret?: boolean;
  /** Ô sắp nhập chuỗi POC nhạy cảm — khi gõ, video chỉ hiện giá trị LIVE/minh hoạ. */
  maskAs?: "account" | "username";
  /** Ô nhập được phép hiện nguyên giá trị (vd tên người nhận chia sẻ toannk2_reader). */
  noMask?: boolean;
  /** Nhãn ngắn cạnh khung đỏ trên ảnh. */
  label?: string;
  /** Chú thích lớn trên ảnh / phụ đề video. */
  banner?: { text: string; tone?: "info" | "danger"; position?: "top" | "bottom" };
  /** Giữ khung hình (ms) trong video — vd dừng 2–3 giây ở bước account name. */
  holdMs?: number;
  /** Chụp ảnh step-XX.png cho bước này (mặc định true). */
  shot?: boolean;
  /** Chụp trước hay sau thao tác (mặc định: "after" với type/fill/upload, "before" với còn lại). */
  shotWhen?: "before" | "after";
  /** Không khoanh phần tử trên ảnh (vd ảnh toàn cảnh). */
  noAnnotate?: boolean;
  /** Vùng cắt ảnh: toàn viewport (mặc định), quanh một phần tử (có lề) hoặc khung cố định. */
  clip?: "viewport" | { target: Target; padding?: number } | { rect: { x: number; y: number; width: number; height: number } };
  /** File cho bước upload (đường dẫn tương đối thư mục capture/samples). */
  files?: string[];
  /** Chờ trạng thái giao diện sau thao tác (không sleep cố định); mốc thời gian được ghi để tua nhanh. */
  waitAfter?: WaitSpec;
  /** Liên kết mở tab mới: ép mở cùng tab để video liền mạch. */
  sameTab?: boolean;
  /** Bỏ qua bước nếu điều kiện sai (vd màn hình xác thực lại không xuất hiện). */
  when?: (ctx: FlowContext) => Promise<boolean>;
  /** Bước tuỳ biến. */
  run?: (ctx: FlowContext) => Promise<void>;
  /** Ghi chú cho người viết tài liệu (vd "hộp thoại chọn file của hệ điều hành không hiện trong headless"). */
  note?: string;
}

export interface Flow {
  name: string;
  title: string;
  description?: string;
  /** session: auth.json; reader-session: auth-reader.json (user nhận chia sẻ); none: trình duyệt sạch. */
  auth: "session" | "reader-session" | "none";
  start?: Dynamic<string>;
  steps: Step[];
  /** Selector cần làm mờ thêm (avatar, tên người dùng…). */
  blur?: string[];
  /** Tắt quay video (chỉ chụp ảnh). */
  noVideo?: boolean;
  /** Hiện số thứ tự trên huy hiệu khung đỏ của ẢNH TĨNH (mặc định không: số bước nằm trong tài liệu). */
  badges?: boolean;
}

export function resolveTarget(page: Page, target: Target): Locator {
  let locator: Locator;
  let nth: number | undefined;
  if (typeof target === "string") locator = page.locator(target);
  else if ("role" in target) {
    locator = page.getByRole(target.role, { name: target.name, exact: target.exact });
    nth = target.nth;
  } else if ("label" in target) {
    locator = page.getByLabel(target.label);
    nth = target.nth;
  } else if ("text" in target) {
    locator = page.getByText(target.text, { exact: target.exact });
    nth = target.nth;
  } else if ("placeholder" in target) {
    locator = page.getByPlaceholder(target.placeholder);
    nth = target.nth;
  } else {
    locator = page.getByTestId(target.testId);
    nth = target.nth;
  }
  return nth === undefined ? locator.first() : locator.nth(nth);
}

export function describeTarget(target?: Target): string | undefined {
  if (!target) return undefined;
  if (typeof target === "string") return target;
  return JSON.stringify(target, (_k, v) => (v instanceof RegExp ? v.toString() : v));
}

export async function resolveValue(value: Dynamic<string> | undefined, ctx: FlowContext): Promise<string> {
  if (value === undefined) return "";
  return typeof value === "function" ? await value(ctx) : value;
}
