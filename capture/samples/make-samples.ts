/**
 * Tạo file mẫu GIẢ LẬP để upload khi chụp/quay (không chứa dữ liệu thật của NAB):
 *   - quy-dinh-gia-lap-cong-tac-phi.pdf
 *   - quy-trinh-gia-lap-mo-the.docx
 *   - so-lieu-gia-lap-chi-nhanh.xlsx
 *   npx tsx capture/samples/make-samples.ts
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import ExcelJS from "exceljs";

const DIR = __dirname;
const BANNER = "TÀI LIỆU GIẢ LẬP — chỉ dùng để minh hoạ hướng dẫn, không phải quy định thật của Nam A Bank.";

async function makePdf() {
  const html = `<!doctype html><html lang="vi"><meta charset="utf-8"><style>
    body{font-family:"DejaVu Sans",Arial,sans-serif;font-size:12pt;line-height:1.5;margin:40px}
    .demo{border:2px dashed #b91c1c;color:#b91c1c;padding:8px 12px;font-weight:bold}
    h1{font-size:18pt} h2{font-size:14pt;margin-top:18px} td,th{border:1px solid #999;padding:4px 8px} table{border-collapse:collapse}
  </style><body>
  <p class="demo">${BANNER}</p>
  <h1>Quy định (giả lập) về công tác phí trong nước</h1>
  <p>Mã tài liệu: QD-DEMO-001 · Hiệu lực: 01/01/2026 · Đơn vị ban hành: Phòng Hành chính (giả lập)</p>
  <h2>Điều 1. Phạm vi áp dụng</h2>
  <p>Quy định áp dụng cho nhân viên đi công tác trong nước từ 01 ngày trở lên theo quyết định cử đi công tác.</p>
  <h2>Điều 2. Mức phụ cấp lưu trú</h2>
  <table><tr><th>Khu vực</th><th>Phụ cấp/ngày</th><th>Phòng nghỉ tối đa/đêm</th></tr>
  <tr><td>Hà Nội, TP.HCM</td><td>250.000 đ</td><td>1.200.000 đ</td></tr>
  <tr><td>Thành phố trực thuộc trung ương khác</td><td>200.000 đ</td><td>1.000.000 đ</td></tr>
  <tr><td>Tỉnh/thành còn lại</td><td>150.000 đ</td><td>800.000 đ</td></tr></table>
  <h2>Điều 3. Hồ sơ thanh toán</h2>
  <p>Nộp đề nghị thanh toán trong 10 ngày làm việc kể từ ngày kết thúc công tác, kèm hoá đơn hợp lệ và quyết định cử đi công tác.</p>
  <h2>Điều 4. Phê duyệt</h2>
  <p>Trưởng đơn vị phê duyệt khoản dưới 10 triệu đồng; Giám đốc khối phê duyệt khoản từ 10 triệu đồng trở lên.</p>
  </body></html>`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: path.join(DIR, "quy-dinh-gia-lap-cong-tac-phi.pdf"), format: "A4" });
  await browser.close();
}

async function makeDocx() {
  const p = (text: string, bold = false) => new Paragraph({ children: [new TextRun({ text, bold })] });
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [new TextRun({ text: BANNER, bold: true, color: "B91C1C" })] }),
          new Paragraph({ text: "Quy trình (giả lập) mở thẻ ghi nợ cho khách hàng cá nhân", heading: HeadingLevel.HEADING_1 }),
          p("Mã tài liệu: QT-DEMO-002 · Phiên bản 1.0 · Đơn vị: Khối Bán lẻ (giả lập)"),
          new Paragraph({ text: "Bước 1. Tiếp nhận yêu cầu", heading: HeadingLevel.HEADING_2 }),
          p("Giao dịch viên tiếp nhận phiếu đề nghị và giấy tờ tuỳ thân còn hiệu lực của khách hàng."),
          new Paragraph({ text: "Bước 2. Kiểm tra hồ sơ", heading: HeadingLevel.HEADING_2 }),
          p("Đối chiếu thông tin trên phiếu với giấy tờ tuỳ thân; hồ sơ thiếu thì hướng dẫn khách hàng bổ sung."),
          new Paragraph({ text: "Bước 3. Phê duyệt và phát hành", heading: HeadingLevel.HEADING_2 }),
          p("Kiểm soát viên phê duyệt trên hệ thống; thẻ được phát hành trong 5 ngày làm việc."),
          new Paragraph({ text: "Câu hỏi thường gặp (giả lập)", heading: HeadingLevel.HEADING_2 }),
          p("Hỏi: Phí phát hành thẻ là bao nhiêu? — Đáp: 50.000 đ (giả lập)."),
          p("Hỏi: Thẻ có thời hạn bao lâu? — Đáp: 5 năm (giả lập)."),
        ],
      },
    ],
  });
  fs.writeFileSync(path.join(DIR, "quy-trinh-gia-lap-mo-the.docx"), await Packer.toBuffer(doc));
}

async function makeXlsx() {
  const wb = new ExcelJS.Workbook();
  const info = wb.addWorksheet("Ghi chu");
  info.addRow([BANNER]);
  const ws = wb.addWorksheet("So lieu");
  ws.columns = [
    { header: "Thang", key: "thang", width: 10 },
    { header: "Chi nhanh", key: "cn", width: 22 },
    { header: "Khu vuc", key: "kv", width: 12 },
    { header: "So the moi", key: "the", width: 12 },
    { header: "Du no (trieu dong)", key: "duno", width: 20 },
    { header: "So giao dich", key: "gd", width: 14 },
  ];
  const branches: [string, string][] = [
    ["Chi nhanh Demo A", "Mien Nam"],
    ["Chi nhanh Demo B", "Mien Nam"],
    ["Chi nhanh Demo C", "Mien Bac"],
    ["Chi nhanh Demo D", "Mien Trung"],
  ];
  let seed = 7;
  const rnd = (min: number, max: number) => {
    seed = (seed * 9301 + 49297) % 233280;
    return Math.round(min + (seed / 233280) * (max - min));
  };
  for (let m = 1; m <= 12; m += 1) {
    for (const [cn, kv] of branches) {
      ws.addRow({ thang: `2026-${String(m).padStart(2, "0")}`, cn, kv, the: rnd(40, 160), duno: rnd(800, 4200), gd: rnd(2000, 9000) });
    }
  }
  ws.getRow(1).font = { bold: true };
  await wb.xlsx.writeFile(path.join(DIR, "so-lieu-gia-lap-chi-nhanh.xlsx"));
}

(async () => {
  await makePdf();
  await makeDocx();
  await makeXlsx();
  console.log("OK: đã tạo 3 file mẫu giả lập trong capture/samples/");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
