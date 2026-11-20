/** Tra đối tượng demo đã tạo (capture/out/created.json) để các flow sau dùng lại. */
import fs from "node:fs";
import { CREATED_FILE } from "../lib/runner";

export function createdUrl(kind: string, name: string): string {
  const list: { kind: string; name: string; url: string }[] = fs.existsSync(CREATED_FILE) ? JSON.parse(fs.readFileSync(CREATED_FILE, "utf8")) : [];
  const hit = [...list].reverse().find((item) => item.kind === kind && item.name === name);
  if (!hit) throw new Error(`Chưa có ${kind} "${name}" trong created.json — chạy flow tạo trước.`);
  // URL trong created.json đã qua bộ che (account opba-ai) -> chuyển về account POC khi mở.
  return hit.url;
}
