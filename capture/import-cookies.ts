/**
 * Nhập phiên đăng nhập Amazon Quick từ trình duyệt thật (thay cho đăng nhập tự động).
 *
 *   npx tsx capture/import-cookies.ts [capture/raw/browser-cookies.json]
 *
 * Hỗ trợ: JSON của tiện ích Cookie-Editor / EditThisCookie (mảng cookie), hoặc cookies.txt (Netscape).
 * - Không in giá trị cookie; chỉ in số lượng và tên miền (đã che).
 * - Ghi auth.json (storageState của Playwright), kiểm tra phiên mở được Quick, rồi XOÁ file cookie gốc.
 */
import fs from "node:fs";
import path from "node:path";
import { AUTH_FILE, RAW_DIR, loadConfig } from "./lib/config";
import { openSession, closeSession } from "./lib/browser";
import { ensureSession, SessionExpiredError } from "./lib/auth";
import { maskText } from "./lib/env-mask";

type SameSite = "Strict" | "Lax" | "None";
interface PwCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: SameSite;
}

function sameSiteOf(value: unknown): SameSite {
  const v = String(value ?? "").toLowerCase();
  if (v === "no_restriction" || v === "none") return "None";
  if (v === "strict") return "Strict";
  return "Lax";
}

function fromJson(raw: string): PwCookie[] {
  const data = JSON.parse(raw);
  const list: any[] = Array.isArray(data) ? data : Array.isArray(data?.cookies) ? data.cookies : [];
  return list
    .filter((c) => c && c.name && c.domain)
    .map((c) => {
      const sameSite = sameSiteOf(c.sameSite);
      return {
        name: String(c.name),
        value: String(c.value ?? ""),
        domain: c.hostOnly ? String(c.domain).replace(/^\./, "") : String(c.domain),
        path: c.path || "/",
        expires: typeof c.expirationDate === "number" ? Math.floor(c.expirationDate) : typeof c.expires === "number" ? c.expires : -1,
        httpOnly: Boolean(c.httpOnly),
        // SameSite=None bắt buộc Secure
        secure: Boolean(c.secure) || sameSite === "None",
        sameSite,
      };
    });
}

function fromNetscape(raw: string): PwCookie[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.replace(/^#HttpOnly_/, "HTTPONLY\t"))
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const httpOnly = line.startsWith("HTTPONLY\t");
      const parts = (httpOnly ? line.slice(9) : line).split("\t");
      if (parts.length < 7) return null;
      const [domain, , cookiePath, secure, expires, name, value] = parts;
      return {
        name,
        value,
        domain,
        path: cookiePath || "/",
        expires: Number(expires) > 0 ? Number(expires) : -1,
        httpOnly,
        secure: secure.toUpperCase() === "TRUE",
        sameSite: "Lax" as SameSite,
      };
    })
    .filter((c): c is PwCookie => c !== null);
}

async function main() {
  const input = path.resolve(process.argv[2] || path.join(RAW_DIR, "browser-cookies.json"));
  if (!fs.existsSync(input)) throw new Error(`Không thấy file cookie: ${path.relative(process.cwd(), input)}`);
  const raw = fs.readFileSync(input, "utf8").trim();
  const cookies = raw.startsWith("[") || raw.startsWith("{") ? fromJson(raw) : fromNetscape(raw);
  const relevant = cookies.filter((c) => /amazon\.com$|signin\.aws$|\.aws$|awsapps\.com$/.test(c.domain.replace(/^\./, "")));
  if (!relevant.length) throw new Error("File không có cookie nào của AWS/Quick — hãy xuất cookie khi đang ở tab Amazon Quick.");

  const config = loadConfig(false);
  const domains = [...new Set(relevant.map((c) => maskText(c.domain, config)))];
  console.log(`Đọc ${cookies.length} cookie, dùng ${relevant.length} cookie AWS/Quick thuộc ${domains.length} tên miền: ${domains.join(", ")}`);

  // --merge: gộp với cookie đã có trong auth.json (cookie mới thay cookie trùng name+domain+path)
  let merged = relevant;
  if (process.argv.includes("--merge") && fs.existsSync(AUTH_FILE)) {
    const old: PwCookie[] = JSON.parse(fs.readFileSync(AUTH_FILE, "utf8")).cookies || [];
    const key = (c: PwCookie) => `${c.name}|${c.domain}|${c.path}`;
    const fresh = new Set(relevant.map(key));
    merged = [...old.filter((c) => !fresh.has(key(c))), ...relevant];
    console.log(`Gộp với auth.json: ${old.length} cookie cũ + ${relevant.length} cookie mới -> ${merged.length}`);
  }
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: merged, origins: [] }, null, 2), { mode: 0o600 });
  if (process.argv.includes("--no-verify")) {
    fs.rmSync(input, { force: true });
    console.log("Đã lưu auth.json (chưa kiểm tra phiên) và xoá file cookie gốc.");
    return;
  }

  const session = await openSession(config, { useAuth: true });
  try {
    await ensureSession(session.page, config);
    console.log("OK: phiên từ trình duyệt dùng được — đã lưu auth.json.");
  } finally {
    await closeSession(session);
    fs.rmSync(input, { force: true });
    console.log("Đã xoá file cookie gốc.");
  }
}

main().catch((error) => {
  console.error(error instanceof SessionExpiredError ? `PHIÊN KHÔNG DÙNG ĐƯỢC: ${error.message}` : `LỖI: ${String(error?.message || error)}`);
  process.exit(2);
});
