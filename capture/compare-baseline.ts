/**
 * So sánh phần <main> (bỏ nav.pager) của các chương 01–10 và 16–23 với bản baseline
 * (capture/raw/baseline/, build từ site trước khi làm lại phần Amazon Quick).
 *   npx tsx capture/compare-baseline.ts
 * Exit 1 nếu có chương khác baseline.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const BASELINE = path.join(ROOT, "capture", "raw", "baseline", "chapters");
const CURRENT = path.join(ROOT, "html_docs", "chapters");

export function mainWithoutPager(html: string): string {
  const match = html.match(/<main\b[\s\S]*?<\/main>/);
  if (!match) throw new Error("Không tìm thấy <main>");
  return match[0].replace(/<nav class="pager"[\s\S]*?<\/nav>/, "");
}

export function compareChapters(baselineDir = BASELINE, currentDir = CURRENT): string[] {
  const slugs = fs.readdirSync(baselineDir).filter((f) => {
    const m = f.match(/^chapter-(\d{2})-/);
    if (!m) return false;
    const n = Number(m[1]);
    return n <= 10 || n >= 16;
  });
  const diffs: string[] = [];
  for (const slug of slugs) {
    const current = path.join(currentDir, slug);
    if (!fs.existsSync(current)) {
      diffs.push(`${slug}: không còn trong html_docs/chapters`);
      continue;
    }
    const a = mainWithoutPager(fs.readFileSync(path.join(baselineDir, slug), "utf8"));
    const b = mainWithoutPager(fs.readFileSync(current, "utf8"));
    if (a !== b) diffs.push(`${slug}: <main> khác baseline`);
  }
  if (slugs.length !== 18) diffs.push(`baseline có ${slugs.length} chương ngoài Quick (mong đợi 18)`);
  return diffs;
}

if (require.main === module) {
  if (!fs.existsSync(BASELINE)) {
    console.error("Chưa có baseline: capture/raw/baseline/chapters");
    process.exit(2);
  }
  const diffs = compareChapters();
  if (diffs.length) {
    console.error(`FAIL: ${diffs.length} khác biệt\n- ${diffs.join("\n- ")}`);
    process.exit(1);
  }
  console.log("OK: 18 chương không đổi");
}
