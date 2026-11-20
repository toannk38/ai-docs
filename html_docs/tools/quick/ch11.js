"use strict";

/**
 * Chương 11 — trang việc: kích hoạt tài khoản, đăng nhập (portal, link Quick, Microsoft Office),
 * giao diện, chat, tạo tài liệu.
 * Nội dung 11.1–11.7 theo bộ bài mới (20/11/2026), gộp ảnh và chi tiết đúng của bản cũ.
 */
const { DOCS, task, fig } = require("./common");

const PORTAL = "https://nab-opba-ai.awsapps.com/start";
const PORTAL_BACKUP = "https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws";
const QUICK_LINK = "https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start";
const CAPTURED = { capturedAt: "2026-11-19" };
const PROVIDED = { flow: "ảnh do NAB cung cấp", capturedAt: "2026-11-20" };

const SLUG = {
  activate: "chapter-11-1-kich-hoat-tai-khoan.html",
  portal: "chapter-11-2-dang-nhap-qua-portal.html",
  link: "chapter-11-3-dang-nhap-bang-link-quick.html",
  office: "chapter-11-4-dang-nhap-tren-microsoft-office.html",
  ui: "chapter-11-5-lam-quen-giao-dien.html",
  chat: "chapter-11-6-chat-voi-quick.html",
  create: "chapter-11-7-tao-tai-lieu-slide-hinh.html",
};

const link = (url) => `[${url}](${url})`;
const page = (no, key, title) => `[**${no}** ${title}](./${SLUG[key]})`;

/** Ảnh giữ tên file gốc: assets/images/screenshots/amazon-quick/<page>/<file> */
function img(dir, file, alt, caption = alt) {
  return { src: `assets/images/screenshots/amazon-quick/${dir}/${file}`, alt, caption };
}

const loginControls = [
  "Chỉ dùng link đăng nhập do NAB công bố; không mở link lạ hoặc trang tự đăng ký tài khoản.",
  "Mật khẩu, mã MFA và mã QR chỉ chia sẻ trong team được giao dùng chung tài khoản; không gửi qua kênh công khai và không đưa cho người ngoài, kể cả người tự xưng là hỗ trợ kỹ thuật.",
  "Sau khi vào, kiểm tra account name `opba-ai` và username của bạn trong menu tài khoản. Nếu sai tài khoản, thiếu menu đã được cấp hoặc thấy quyền rộng bất thường: dừng thao tác và gửi yêu cầu hỗ trợ kèm ảnh đã che dữ liệu nhạy cảm.",
  "Không dùng tài khoản cá nhân, tài khoản Free/Plus tự tạo hoặc root user cho công việc tại NAB.",
];

const mfaFaq = [
  "Quên hoặc mất thiết bị MFA (điện thoại có ứng dụng Authenticator) thì làm sao?",
  "Dùng mã QR hoặc secret key đã lưu khi kích hoạt (trang 11.1) để quét lại trên máy mới. Nếu không còn mã QR, không thử nhập mã nhiều lần: bấm Troubleshoot MFA trên màn hình xác thực để xem hướng dẫn, rồi liên hệ quản trị viên qua kênh hỗ trợ để được đặt lại MFA.",
];

const activatedPrereq = `Đã kích hoạt tài khoản (trang ${page("11.1", "activate", "Kích hoạt tài khoản")}).`;

module.exports = [
  // -------------------------------------------------------------------------
  task({
    id: "11.1",
    parentId: 11,
    slug: SLUG.activate,
    navTitle: "Kích hoạt tài khoản",
    title: "Kích hoạt tài khoản",
    summary: "Mỗi người dùng chỉ cần kích hoạt tài khoản **một lần**, vào lần đăng nhập đầu tiên. Việc kích hoạt gồm 3 phần: nhận mã qua email, đặt mật khẩu mới và đăng ký xác thực 2 lớp (2FA).",
    statusText: "Làm một lần, vào lần đăng nhập đầu tiên. Từ lần sau chỉ cần đăng nhập theo trang 11.2, 11.3 hoặc 11.4.",
    searchKeywords: ["kích hoạt", "lần đầu", "đăng nhập lần đầu", "mật khẩu mới", "verification code", "mã xác minh", "mfa", "2fa", "authenticator", "assign mfa", "qr", "google authenticator", "microsoft authenticator", "aws sso", "quên mật khẩu"],
    capture: PROVIDED,
    objectives: [
      "Nhận mã xác minh qua email và đặt mật khẩu mới.",
      "Đăng ký xác thực 2 lớp (2FA) bằng ứng dụng xác thực và bấm **Assign MFA** để gắn vào tài khoản.",
    ],
    prerequisites: [
      "**Username** do quản trị viên cấp (ví dụ: `user_demo`).",
      "**Email công việc** đã đăng ký với tài khoản, để nhận mã xác minh.",
      "**Điện thoại đã cài một trong hai ứng dụng xác thực**: Google Authenticator hoặc Microsoft Authenticator.",
      `**Đường dẫn đăng nhập (portal URL)** của tài khoản Live: ${link(PORTAL)}`,
    ],
    walkthroughs: [
      {
        title: "Bước 1: Truy cập portal và nhập username",
        steps: [
          `Mở trình duyệt, vào đường dẫn portal: ${link(PORTAL)}`,
          "Tại màn hình **Sign in**, nhập **Username** được cấp vào ô Username.",
          {
            text: "Bấm **Next**.",
            figure: img("11-1", "11-1-01-sign-in.png", "Màn hình Sign in: nhập Username rồi bấm Next"),
            notes: [{ tone: "info", text: "Lưu ý: ở bước này chỉ nhập username, chưa nhập mật khẩu. Nhập username đúng như được cấp, không thêm khoảng trắng." }],
          },
        ],
      },
      {
        title: "Bước 2: Nhập mã xác minh gửi về email",
        intro: "Sau khi bạn bấm Next, AWS gửi một email có tiêu đề **Verify your identity** đến hòm thư của bạn.",
        steps: [
          "Mở email, lấy dãy 6 chữ số ở mục **Verification code**.",
          {
            text: "Quay lại trang đăng nhập, nhập mã vào ô xác minh rồi xác nhận.",
            figure: img("11-1", "11-1-02-email-verification-code.png", "Email Verify your identity chứa mã xác minh 6 số (đã che)"),
            notes: [{ text: "Mã chỉ có hiệu lực trong **10 phút**. Nếu mã quá hạn hoặc không thấy email, hãy kiểm tra thư mục Spam/Junk rồi quay lại Bước 1 để nhận mã mới. Không chia sẻ mã này cho bất kỳ ai." }],
          },
        ],
      },
      {
        title: "Bước 3: Đặt mật khẩu mới",
        intro: "Màn hình **New user sign up** hiện ra, username của bạn đã được điền sẵn.",
        steps: [
          "Nhập mật khẩu mới vào ô **New password**.",
          "Nhập lại đúng mật khẩu đó vào ô **Confirm password**. Có thể tích **Show password** để kiểm tra mình đã gõ đúng chưa.",
          {
            text: "Bấm **Set new password**.",
            figure: img("11-1", "11-1-03-new-password.png", "Màn hình New user sign up: đặt mật khẩu mới"),
            notes: [{ text: "Hãy ghi nhớ mật khẩu vừa đặt, vì bạn sẽ dùng nó cho mọi lần đăng nhập sau này." }],
          },
        ],
      },
      {
        title: "Bước 4: Đăng ký xác thực 2 lớp (2FA)",
        intro: "Màn hình **Register an MFA device** yêu cầu chọn loại thiết bị xác thực.",
        steps: [
          "Chọn **Authenticator app** (lựa chọn thứ hai, biểu tượng điện thoại).",
          {
            text: "Bấm **Next**.",
            figure: img("11-1", "11-1-04-register-mfa-device.png", "Màn hình Register an MFA device: chọn Authenticator app"),
            notes: [{ text: "Không chọn *Security key or other device*. Lựa chọn này dành cho khóa bảo mật phần cứng (YubiKey, Titan)." }],
          },
        ],
      },
      {
        title: "Bước 5: Quét mã QR và bấm Assign MFA",
        intro: "Màn hình **Set up the authenticator app** gồm 3 mục. Làm lần lượt như sau.",
        steps: [
          "**Mục 1: Cài ứng dụng xác thực.** Dùng **Google Authenticator** hoặc **Microsoft Authenticator** trên điện thoại. Nếu chưa có, tải từ App Store hoặc Google Play.",
          {
            text: "**Mục 2: Quét mã QR.**",
            list: [
              "Mở ứng dụng xác thực, bấm thêm tài khoản (dấu **+**) rồi chọn quét mã QR.",
              "Đưa camera vào mã QR trên màn hình.",
              "Sau khi quét, ứng dụng hiện một tài khoản mới tên **AWS SSO** kèm username của bạn. Bên dưới là một mã 6 số, cứ 30 giây đổi một lần.",
            ],
            figure: img("11-1", "11-1-05-authenticator-app-aws-sso.jpg", "Microsoft Authenticator sau khi quét: tài khoản AWS SSO kèm username và mã 6 số"),
            notes: [{ tone: "info", text: "**Hãy lưu lại mã QR này** và cất ở nơi an toàn. Có thể chụp màn hình, hoặc bấm *Show secret key* để chép khóa bí mật. Bạn sẽ cần mã này khi chia sẻ tài khoản cho người dùng khác trong đơn vị hoặc khi đổi điện thoại. Nếu mất mã QR, bạn phải nhờ quản trị viên đặt lại MFA. Không gửi mã QR qua kênh công khai, vì ai có nó cũng tạo được mã đăng nhập." }],
          },
          {
            text: "**Mục 3: Nhập mã và bấm Assign MFA.**",
            list: [
              "Xem mã 6 số đang hiện dưới tài khoản **AWS SSO** trong ứng dụng.",
              "Nhập mã đó vào ô **Authenticator code**. Nếu mã sắp hết 30 giây, hãy chờ mã mới rồi mới nhập.",
              "**Bấm nút Assign MFA.**",
            ],
            figure: img("11-1", "11-1-06-setup-authenticator-assign-mfa.png", "Màn hình Set up the authenticator app: quét QR (đã làm mờ), nhập Authenticator code, bấm Assign MFA"),
            notes: [{ tone: "warning", critical: true, text: "**QUAN TRỌNG: phải bấm Assign MFA thì 2FA mới được gắn vào tài khoản.** Đây là bước hay bị quên nhất. Nhiều người quét QR, nhập mã xong rồi đóng trang luôn. Khi đó ứng dụng vẫn hiện tài khoản AWS SSO, nhưng mã trong đó không dùng được để đăng nhập. Chỉ rời trang sau khi hệ thống báo gắn MFA thành công." }],
          },
        ],
        verify: "Hệ thống báo gắn MFA thành công. Chỉ rời trang sau khi thấy thông báo này.",
      },
    ],
    sections: [
      {
        id: "buoc-tiep-theo",
        title: "Bước tiếp theo: Đăng nhập",
        intro: "Kích hoạt xong, từ lần sau bạn chỉ cần username, mật khẩu và mã 6 số trong ứng dụng xác thực. Chọn một trong các cách đăng nhập sau:",
        listClass: "next-links",
        items: [
          page("11.2", "portal", "Đăng nhập qua AWS access portal"),
          page("11.3", "link", "Đăng nhập bằng link Quick"),
          page("11.4", "office", "Đăng nhập trên Microsoft Office"),
        ],
      },
      {
        id: "loi-thuong-gap",
        title: "Lỗi thường gặp",
        tables: [
          {
            headers: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không nhận được email mã xác minh", "Kiểm tra thư mục Spam/Junk, rồi quay lại Bước 1 để gửi lại mã. Nếu vẫn không có, liên hệ quản trị viên để kiểm tra email đã đăng ký."],
              ["Mã xác minh báo hết hạn", "Mã chỉ dùng được trong 10 phút. Làm lại từ Bước 1 để nhận mã mới."],
              ["Đã quét QR nhưng khi đăng nhập báo sai mã MFA", "Gần như chắc chắn là đã quên bấm **Assign MFA**. Liên hệ quản trị viên để đặt lại MFA, xóa tài khoản AWS SSO cũ trong ứng dụng rồi làm lại Bước 5."],
              ["Nhập đúng mã nhưng vẫn báo sai", "Giờ trên điện thoại bị lệch. Bật chế độ ngày giờ tự động, rồi nhập mã ngay khi mã vừa đổi."],
              ["Đổi hoặc mất điện thoại", "Dùng mã QR hoặc secret key đã lưu ở Bước 5 để quét lại trên máy mới. Nếu không còn mã QR, nhờ quản trị viên đặt lại MFA."],
              ["Quên mật khẩu", "Ở màn hình nhập mật khẩu, bấm **Forgot password** (Quên mật khẩu). AWS sẽ gửi email xác thực để bạn tự đặt lại mật khẩu. Nếu không nhận được email hoặc vẫn không đặt lại được, hãy liên hệ quản trị viên."],
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Đã quét QR nhưng khi đăng nhập báo sai mã MFA?", "Gần như chắc chắn là đã quên bấm Assign MFA. Liên hệ quản trị viên để đặt lại MFA, xóa tài khoản AWS SSO cũ trong ứng dụng rồi làm lại Bước 5."],
      ["Vì sao phải lưu lại mã QR?", "Bạn sẽ cần mã này khi chia sẻ tài khoản cho người dùng khác trong đơn vị hoặc khi đổi điện thoại. Nếu mất mã QR, bạn phải nhờ quản trị viên đặt lại MFA. Không gửi mã QR qua kênh công khai."],
      ["Quên mật khẩu thì làm sao?", "Ở màn hình nhập mật khẩu, bấm Forgot password. AWS sẽ gửi email xác thực để bạn tự đặt lại mật khẩu. Nếu không nhận được email, liên hệ quản trị viên."],
    ],
    controls: loginControls,
    sources: [DOCS.signIn, DOCS.whatIs],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "11.2",
    parentId: 11,
    slug: SLUG.portal,
    navTitle: "Đăng nhập qua AWS access portal",
    title: "Đăng nhập qua AWS access portal",
    summary: "Đây là cách nên dùng để đăng nhập hằng ngày: vào portal, đăng nhập một lần, rồi mở Quick từ danh sách ứng dụng.",
    statusText: "Cách đăng nhập dùng chung cho các ứng dụng AWS được cấp cho bạn.",
    searchKeywords: ["đăng nhập", "login", "portal", "aws access portal", "applications", "mfa", "opba-ai", "bookmark"],
    capture: { flow: "q11-1-portal + q11-1-mfa-screen", ...CAPTURED },
    objectives: [
      "Đăng nhập AWS access portal bằng tài khoản NAB của bạn.",
      "Mở đúng ứng dụng Amazon Quick (ô **opba-ai**) trong danh sách ứng dụng.",
    ],
    prerequisites: [
      activatedPrereq,
      "Có username, mật khẩu và ứng dụng xác thực trên điện thoại (tài khoản **AWS SSO**) để lấy mã 6 số.",
    ],
    linkBoxes: [
      { label: "Link AWS access portal (dùng link này trước)", url: PORTAL },
      { label: "Link dự phòng (khi link chính không mở được, hỗ trợ IPv6)", url: PORTAL_BACKUP },
    ],
    walkthroughs: [
      {
        title: "Đăng nhập và mở Amazon Quick",
        intro: "Làm lần lượt từng bước; mỗi ảnh khoanh đỏ chỗ cần thao tác.",
        steps: [
          { text: `Mở trình duyệt, vào ${link(PORTAL)}. Nếu trang không mở được, dùng đường dự phòng: ${link(PORTAL_BACKUP)}`, figure: fig("11-2", 1, "Trang đăng nhập AWS với ô Username được khoanh đỏ", "Màn hình Sign in của portal") },
          { text: "Nhập **Username** rồi bấm **Next**.", figure: fig("11-2", 2, "Ô Username đã nhập tên đăng nhập minh hoạ nhanvien.demo", "Nhập Username rồi bấm Next") },
          { text: "Nhập **mật khẩu** rồi bấm **Sign in**.", figure: fig("11-2", 3, "Ô Password được khoanh đỏ", "Nhập mật khẩu rồi bấm Sign in") },
          { text: "Mở ứng dụng xác thực, nhập mã 6 số đang hiện ở tài khoản **AWS SSO** (màn hình **Additional verification required**, ô **MFA code**) rồi bấm **Sign in**.", figure: fig("11-2", 6, "Màn hình xác thực MFA với ô MFA code được khoanh đỏ", "Nhập mã 6 số từ ứng dụng xác thực") },
          { text: "Trên trang portal, chọn tab **Applications**.", figure: fig("11-2", 4, "Trang AWS access portal, tab Applications được khoanh đỏ", "Chọn tab Applications") },
          {
            text: "Bấm ô **opba-ai** (biểu tượng Amazon Quick). Amazon Quick sẽ mở ra trong một tab mới.",
            figure: fig("11-2", 5, "Danh sách ứng dụng, ô opba-ai được khoanh đỏ", "Bấm ô opba-ai (biểu tượng Amazon Quick)"),
            notes: [{ tone: "info", text: "Mẹo: lưu trang portal vào Bookmark để lần sau mở nhanh hơn." }],
          },
        ],
        verify: "Trang chủ Amazon Quick hiện ra; menu tài khoản ở góc phải trên ghi account name **opba-ai** và username của bạn.",
      },
    ],
    troubleshooting: [
      { symptom: "Link portal không mở được", cause: "Mạng hoặc trình duyệt chặn link chính", action: `Dùng link dự phòng ${PORTAL_BACKUP}; nếu vẫn không được, liên hệ Khối CNTT.` },
      { symptom: "Báo sai mật khẩu hoặc sai mã MFA", cause: "Gõ nhầm, mã MFA đã hết hạn (đổi mỗi 30 giây), hoặc khi kích hoạt chưa bấm **Assign MFA**", action: "Nhập lại cẩn thận với mã mới nhất; không thử nhiều lần liên tiếp. Nếu vẫn lỗi, xem mục Lỗi thường gặp ở trang 11.1 hoặc liên hệ Khối CNTT." },
      { symptom: "Không thấy ô opba-ai trong tab Applications", cause: "Tài khoản chưa được cấp quyền Amazon Quick", action: "Gửi yêu cầu cấp quyền tới Khối CNTT." },
    ],
    faqs: [
      ["Không mở được link portal?", `Thử link dự phòng ${PORTAL_BACKUP} (hỗ trợ IPv6). Nếu cả hai đều không mở được, liên hệ Khối CNTT.`],
      ["Tôi bấm nhầm một ứng dụng khác trên portal?", "Quay lại tab Applications và chọn đúng ô opba-ai có biểu tượng Amazon Quick. Các ứng dụng khác không phải Amazon Quick."],
      mfaFaq,
      ["Sau khi bấm ô opba-ai, tôi bị hỏi đăng nhập lại?", "Nếu trang đăng nhập hiện lại, nhập lại username, mật khẩu và mã MFA của bạn. Nếu bị hỏi lặp lại nhiều lần, liên hệ Khối CNTT."],
    ],
    controls: loginControls,
    sources: [DOCS.signIn, DOCS.whatIs],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "11.3",
    parentId: 11,
    slug: SLUG.link,
    navTitle: "Đăng nhập bằng link Quick",
    title: "Đăng nhập bằng link Quick",
    summary: "Dùng cách này khi bạn mở thẳng trang Quick mà không đi qua portal. Trang sẽ hỏi **account name** trước, rồi mới chuyển sang trang đăng nhập AWS.",
    statusText: "Cách đăng nhập trực tiếp vào Amazon Quick.",
    searchKeywords: ["đăng nhập", "login", "account name", "opba-ai", "invalid account name", "username", "choose your account", "bookmark", "link quick"],
    capture: { flow: "q11-2-link-quick", ...CAPTURED },
    topCallout: {
      tone: "danger",
      title: "Account name tại NAB là opba-ai",
      text: "Ô **Quick account name** luôn nhập `opba-ai` — giống nhau cho mọi người tại NAB. Username và mật khẩu cá nhân chỉ nhập ở bước sau, trên trang đăng nhập.",
    },
    objectives: [
      "Vào Amazon Quick bằng link Quick của NAB.",
      "Nhập đúng account name `opba-ai` khi trang hỏi và tránh lỗi nhập username/email vào ô này.",
    ],
    prerequisites: [
      activatedPrereq,
      "Có username, mật khẩu và ứng dụng xác thực (tài khoản **AWS SSO**) để lấy mã 6 số.",
    ],
    linkBoxes: [
      { label: "Link Quick của tài khoản Live (nên lưu bookmark)", url: QUICK_LINK, note: "Link đã chứa account name `opba-ai`; nếu trang vẫn hỏi account name, nhập `opba-ai`." },
    ],
    tables: [
      {
        caption: "Account name khác Username thế nào",
        headers: ["Account name", "Username"],
        rows: [
          ["Tên tài khoản Amazon Quick của ngân hàng", "Tài khoản cá nhân của từng người"],
          ["Mọi người tại NAB nhập giống nhau: opba-ai", "Mỗi người một tên khác nhau"],
          ["Nhập ở ô Quick account name (trang đăng nhập chung)", "Nhập ở ô Username (trang đăng nhập, bước sau)"],
          ["Xem lại: menu tài khoản, dòng Account name", "Xem lại: menu tài khoản, dòng Username"],
        ],
      },
    ],
    walkthroughs: [
      {
        title: "Đăng nhập bằng link Quick",
        steps: [
          `Vào link Quick của tài khoản Live: ${link(QUICK_LINK)}`,
          {
            text: "Nếu trang hỏi **account name**, nhập `opba-ai` rồi bấm tiếp tục (**Next**).",
            preWarning: "**Lưu ý:** ô account name là tên tài khoản Quick của ngân hàng (`opba-ai`), **không phải username của bạn**. Đây là lỗi hay gặp nhất khi đăng nhập bằng link.",
            compare: {
              wrong: { label: "✗ Sai", text: "Nhập email hoặc username vào ô Quick account name → báo lỗi **Invalid account name**.", figure: fig("11-3", 3, "Ô Quick account name điền email ten.dang.nhap@example.com — cách làm sai", "Sai: nhập email vào ô account name") },
              right: { label: "✓ Đúng", text: "Nhập `opba-ai` vào ô Quick account name.", figure: fig("11-3", 5, "Ô Quick account name điền opba-ai — cách làm đúng", "Đúng: nhập opba-ai") },
            },
          },
          { text: "Nếu thấy dòng chữ đỏ **Invalid account name** ngay dưới ô: bạn đã nhập sai account name. Xoá nội dung trong ô và nhập lại `opba-ai`.", figure: fig("11-3", 4, "Thông báo lỗi Invalid account name dưới ô Quick account name", "Thấy lỗi này → quay lại nhập opba-ai") },
          { text: "Khi trang đăng nhập AWS hiện ra, nhập **Username**, **mật khẩu** và **mã 6 số** trong ứng dụng xác thực.", figure: img("11-1", "11-1-01-sign-in.png", "Trang đăng nhập AWS sau khi nhập account name: nhập Username rồi bấm Next") },
          { text: "Đăng nhập xong, bạn sẽ vào thẳng trang chủ Amazon Quick.", figure: fig("11-3", 8, "Trang chủ Amazon Quick sau khi đăng nhập", "Đăng nhập thành công") },
        ],
        verify: "Trang chủ Amazon Quick hiện ra; không còn thông báo Invalid account name.",
      },
      {
        title: "Kiểm tra bạn đã vào đúng tài khoản",
        intro: "Làm sau mỗi lần đăng nhập ở máy mới.",
        steps: [
          { text: "Bấm nút tài khoản ở góc phải trên: menu hiện **Account name** (`opba-ai`) và **Username** (tên đăng nhập của bạn).", figure: fig("11-3", 9, "Menu tài khoản hiện Account name opba-ai và Username", "Kiểm tra Account name và Username") },
        ],
        verify: "Account name là `opba-ai` và Username đúng là tên đăng nhập của bạn.",
      },
    ],
    troubleshooting: [
      { symptom: "Dòng chữ đỏ **Invalid account name** dưới ô account name", cause: "Bạn đã nhập username, email hoặc gõ sai chính tả", action: "Xoá nội dung trong ô, nhập chính xác `opba-ai` (chữ thường, có dấu gạch ngang) rồi bấm **Next**." },
      { symptom: "Ô account name đã có sẵn chữ", cause: "Trình duyệt nhớ giá trị lần trước", action: "Kiểm tra đúng là `opba-ai`; nếu khác, xoá và nhập lại." },
      { symptom: "Màn hình **Choose your account** với danh sách tài khoản", cause: "Trình duyệt đang lưu nhiều phiên đăng nhập", action: "Chọn dòng có account name `opba-ai` và username của bạn; nếu không có, chọn **Add another account** rồi nhập `opba-ai`." },
    ],
    faqs: [
      ["Tôi nhập tên đăng nhập vào ô Account name và bị báo lỗi?", "Ô Quick account name không phải chỗ nhập tên đăng nhập. Xoá nội dung trong ô, nhập opba-ai rồi bấm Next; username của bạn chỉ nhập ở trang đăng nhập hiện ra sau đó."],
      ["Màn hình Choose your account là gì?", "Khi trình duyệt còn lưu phiên đăng nhập, Amazon Quick liệt kê các tài khoản đã đăng nhập. Chọn dòng có account name opba-ai và username của bạn."],
      ["Có cách nào khỏi phải nhập account name?", `Mở và lưu bookmark link ${QUICK_LINK}; link đã chứa account name opba-ai.`],
      ["Đăng nhập Add-in Amazon Quick trên Word, Excel, PowerPoint thế nào?", "Xem trang 11.4 Đăng nhập trên Microsoft Office: ô Quick account name cũng nhập opba-ai."],
      mfaFaq,
    ],
    controls: loginControls,
    sources: [DOCS.signIn, DOCS.whatIs],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "11.4",
    parentId: 11,
    slug: SLUG.office,
    navTitle: "Đăng nhập trên Microsoft Office",
    title: "Đăng nhập trên Microsoft Office (Add-in trong Word, Excel, PowerPoint)",
    summary: `Sau khi đã kích hoạt tài khoản (mục 11.1), bạn có thể dùng Amazon Quick ngay trong Word, PowerPoint và Excel. Cách đăng nhập giống nhau ở cả ba ứng dụng. Dưới đây lấy Word làm ví dụ.`,
    statusText: "Add-in Amazon Quick dùng được trong Word, Excel và PowerPoint. Mỗi ứng dụng cần đăng nhập một lần.",
    searchKeywords: ["add-in", "addin", "office", "microsoft office", "word", "excel", "powerpoint", "quick account name", "opba-ai", "authorization requested", "approve and continue", "word assistant"],
    capture: PROVIDED,
    objectives: [
      "Đăng nhập Add-in Amazon Quick trong Word, Excel, PowerPoint bằng account name `opba-ai`.",
      "Đối chiếu mã xác nhận trước khi bấm **Approve and continue**.",
    ],
    prerequisites: [
      activatedPrereq,
      "Có username, mật khẩu và ứng dụng xác thực (tài khoản **AWS SSO**) để lấy mã 6 số.",
    ],
    walkthroughs: [
      {
        title: "Đăng nhập Add-in Amazon Quick (ví dụ trong Word)",
        steps: [
          "Mở Word. Trên tab **Home**, bấm nút **Amazon Quick** (góc phải thanh công cụ). Khung Amazon Quick sẽ mở ra bên phải.",
          { text: "Tại ô **Quick account name**, nhập `opba-ai` rồi bấm **Sign in**. Không dùng nút *Continue with* (email/Google/Apple).", figure: img("11-4", "11-4-01-office-addin-sign-in.png", "Khung Amazon Quick trong Word: nhập Quick account name rồi bấm Sign in") },
          "Một cửa sổ đăng nhập AWS hiện ra, giống như khi đăng nhập trên web. Nhập **Username**, **mật khẩu** và **mã 6 số** trong ứng dụng xác thực (tài khoản AWS SSO).",
          { text: "Trình duyệt hiện màn hình **Authorization requested**, tức là QuickSight Office Add-in đang xin quyền truy cập tài khoản. Hãy đối chiếu **mã xác nhận** (dạng `XXXX-XXXX`) trên màn hình này với mã đang hiện trong khung Quick của Word, và kiểm tra tên account là **opba-ai**. Nếu hai mã khớp, bấm **Approve and continue**. Nếu mã không khớp, hoặc bạn không tự bấm đăng nhập, hãy bấm **Cancel**.", figure: img("11-4", "11-4-02-office-addin-authorization.png", "Màn hình Authorization requested: đối chiếu mã rồi bấm Approve and continue") },
          {
            text: "Khi đăng nhập thành công, khung bên phải hiện **Welcome to Quick** kèm dòng *You are using Word Assistant*.",
            figure: img("11-4", "11-4-03-office-addin-ready.png", "Đăng nhập thành công: Welcome to Quick, Word Assistant sẵn sàng"),
            notes: [{ text: "Làm tương tự với **PowerPoint** và **Excel**. Mỗi ứng dụng cần đăng nhập một lần. Nếu không thấy nút Amazon Quick trên tab Home, hãy liên hệ quản trị viên." }],
          },
        ],
        verify: "Khung bên phải hiện **Welcome to Quick** kèm dòng *You are using Word Assistant*.",
      },
    ],
    sections: [
      {
        id: "sau-khi-dang-nhap",
        title: "Sau khi đăng nhập",
        intro: "Gõ yêu cầu vào ô *Write, edit, or format…* ở cuối khung. Quick sẽ hỗ trợ ngay trên tài liệu đang mở, ví dụ:",
        items: [
          "**Rà soát**: kiểm tra lỗi chính tả, tính nhất quán, đối chiếu với văn bản quy định trong thư viện.",
          "**Soạn thảo**: viết tờ trình, báo cáo, email từ dàn ý.",
          "**Chỉnh sửa**: viết lại đoạn văn, tóm tắt, định dạng lại tài liệu. Trong PowerPoint có thể tạo hoặc sửa slide, trong Excel có thể phân tích và xử lý bảng số liệu.",
        ],
        callout: { text: "Kiểm tra lại nội dung Quick tạo ra trước khi sử dụng chính thức." },
      },
    ],
    troubleshooting: [
      { symptom: "Không thấy nút **Amazon Quick** trên tab **Home**", cause: "Add-in chưa được cài hoặc chưa được cấp cho máy/tài khoản của bạn", action: "Liên hệ quản trị viên." },
      { symptom: "Mã trên màn hình **Authorization requested** không khớp mã trong khung Quick", cause: "Yêu cầu không phải do bạn vừa bấm đăng nhập", action: "Bấm **Cancel**, không bấm Approve and continue." },
    ],
    faqs: [
      ["Có phải đăng nhập riêng trong Word, Excel và PowerPoint không?", "Có. Mỗi ứng dụng cần đăng nhập một lần; cách đăng nhập giống nhau ở cả ba ứng dụng."],
      ["Có dùng nút Continue with (email/Google/Apple) được không?", "Không. Tại ô Quick account name, nhập opba-ai rồi bấm Sign in."],
      ["Khi nào bấm Approve and continue?", "Chỉ khi chính bạn vừa bấm đăng nhập, mã xác nhận khớp với mã trong khung Quick và tên account là opba-ai. Nếu không, bấm Cancel."],
    ],
    controls: [
      ...loginControls,
      "Chỉ bấm **Approve and continue** khi chính bạn vừa bấm đăng nhập và mã xác nhận khớp; nếu không, bấm **Cancel**.",
      "Kiểm tra lại nội dung Quick tạo ra trước khi sử dụng chính thức.",
    ],
    sources: [DOCS.signIn, DOCS.whatIs],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "11.5",
    parentId: 11,
    slug: SLUG.ui,
    navTitle: "Làm quen giao diện",
    title: "Làm quen giao diện",
    summary: "Trang chủ Amazon Quick gồm **khung chat ở giữa** và **thanh menu bên trái**. Bạn làm việc chủ yếu trong khung chat. Menu bên trái dùng để mở các thành phần khác.",
    statusText: "Giao diện hiển thị theo quyền được cấp cho tài khoản của bạn.",
    searchKeywords: ["giao diện", "menu", "sidebar", "khung chat", "spaces", "agents", "lịch sử chat", "my stuff", "more", "tài khoản", "sign out", "đăng xuất"],
    capture: { flow: "q11-3-giao-dien", ...CAPTURED },
    objectives: ["Biết mỗi khu vực trên màn hình dùng để làm gì.", "Tìm lại nhanh nội dung đã dùng, đăng xuất đúng cách."],
    prerequisites: [`Đã đăng nhập Amazon Quick (trang [11.2](./${SLUG.portal}), [11.3](./${SLUG.link}) hoặc [11.4](./${SLUG.office})).`],
    tables: [
      {
        caption: "Các khu vực trên trang chủ Amazon Quick",
        headers: ["Khu vực", "Dùng để làm gì"],
        rows: [
          ["Khung chat", "Đặt câu hỏi, yêu cầu tóm tắt, soạn thảo bằng ngôn ngữ tự nhiên. Có sẵn các câu gợi ý để bắt đầu."],
          ["Chọn nguồn dữ liệu (All data / Space)", "Giới hạn câu trả lời trong một Space cụ thể, ví dụ thư viện văn bản pháp chế."],
          ["Spaces", "Xem các Space được chia sẻ cho bạn. Mở một Space để chat riêng với tài liệu trong đó."],
          ["Agents", "Các trợ lý đã được cấu hình sẵn cho từng nhu cầu (nếu đơn vị được cấp)."],
          ["Lịch sử chat", "Mở lại các cuộc trò chuyện cũ. Xem lại chat cũ không tốn hạn mức sử dụng."],
        ],
      },
    ],
    walkthroughs: [
      {
        title: "Các khu vực chính",
        intro: "Mục bạn thấy có thể ít hơn ảnh nếu tài khoản không được cấp tính năng đó.",
        steps: [
          { text: "**Trang chủ**: thanh điều hướng bên trái, ô chat ở giữa, nút tài khoản và **Private mode** ở góc phải trên.", figure: fig("11-5", 1, "Trang chủ Amazon Quick", "Trang chủ") },
          { text: "**Thanh điều hướng**: **Spaces** (kho tài liệu), **Research** (nghiên cứu), **Chat agents** (trợ lý), **Flows** (tự động hoá), **Dashboards** và **Data** (dữ liệu), **My folders**/**Shared folders**. Các mục **Apps**, **Analyses** chỉ dành cho một số user.", figure: fig("11-5", 2, "Thanh điều hướng bên trái được khoanh đỏ", "Thanh điều hướng") },
          { text: `**Ô chat**: nơi đặt câu hỏi; xem cách dùng ở trang [11.6](./${SLUG.chat}).`, figure: fig("11-5", 3, "Ô chat ở giữa màn hình được khoanh đỏ", "Ô chat") },
          { text: "**My stuff**: tab **Recents** (mục xem gần đây) và **Favorites** (mục yêu thích) để tìm lại nhanh.", figure: fig("11-5", 4, "Trang My stuff với Recents và Favorites", "My stuff") },
          { text: "**More**: các mục ít dùng hơn và **Customize navigation** để ẩn/hiện, sắp xếp thanh điều hướng.", figure: fig("11-5", 5, "Menu More mở ra các mục bổ sung", "Menu More") },
          { text: "**Nút tài khoản** (góc phải trên): xem account name và username, đổi ngôn ngữ, **Preferences**, **Sign out** để đăng xuất khi dùng máy chung.", figure: fig("11-5", 6, "Menu tài khoản với Account name, Username, Sign out", "Menu tài khoản") },
        ],
        verify: "Bạn mở được My stuff, menu More và menu tài khoản; biết vị trí nút Sign out.",
      },
    ],
    sections: [
      {
        id: "tai-lieu-nguon",
        title: "Tài liệu nguồn",
        intro: "Tài liệu nguồn do quản trị viên đưa lên và gắn vào Space. Người dùng thường chỉ xem và hỏi đáp, không tải tài liệu lên kho chung.",
      },
    ],
    troubleshooting: [
      { symptom: "Không thấy một mục trong ảnh", cause: "Tài khoản không được cấp tính năng đó, hoặc mục đã bị ẩn bằng Customize navigation", action: "Kiểm tra menu More và Customize navigation; nếu vẫn thiếu mục đã được cấp, gửi yêu cầu hỗ trợ." },
    ],
    faqs: [
      ["Vì sao giao diện của tôi khác ảnh?", "Giao diện hiển thị theo quyền của từng tài khoản và có thể thay đổi theo bản cập nhật của Amazon Quick. Ảnh trong cẩm nang chụp ngày 19/11/2026."],
      ["Có dùng Amazon Quick trong Word, Excel, PowerPoint được không?", "Có, qua Add-in Amazon Quick. Cách đăng nhập xem trang 11.4 Đăng nhập trên Microsoft Office."],
      ["Làm sao đăng xuất?", "Bấm nút tài khoản ở góc phải trên rồi chọn Sign out. Luôn đăng xuất khi dùng máy tính dùng chung."],
    ],
    controls: [
      "Đăng xuất khi dùng máy tính dùng chung.",
      "Thấy mục hoặc quyền không đúng với công việc được giao: dừng và gửi yêu cầu hỗ trợ.",
    ],
    sources: [DOCS.whatIs, DOCS.howWorks],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "11.6",
    parentId: 11,
    slug: SLUG.chat,
    navTitle: "Chat với Amazon Quick",
    title: "Chat với Amazon Quick",
    summary: "Gõ câu hỏi bằng tiếng Việt vào ô chat. Quick sẽ tìm trong các tài liệu bạn được quyền xem và trả lời, kèm nguồn trích dẫn.",
    statusText: "Chat dùng được cho mọi user Amazon Quick tại NAB, trong phạm vi dữ liệu được phép.",
    searchKeywords: ["chat", "hỏi đáp", "câu hỏi", "all data", "specific data", "general knowledge", "smart", "fast", "advanced", "upload", "tệp", "sources", "nguồn", "trích dẫn", "private mode", "web search", "hạn mức"],
    capture: { flow: "q11-4-chat", ...CAPTURED },
    objectives: [
      "Hỏi Amazon Quick với đúng phạm vi dữ liệu và chế độ trả lời.",
      "Đính kèm tệp được phép và kiểm tra nguồn trước khi dùng câu trả lời.",
    ],
    prerequisites: [
      "Chỉ đính kèm hoặc hỏi về dữ liệu đã được phân loại và được phép sử dụng.",
      "**Web search** trong nút **+** đang bật sẵn: tắt đi nếu câu hỏi liên quan dữ liệu nội bộ hoặc tình huống của bạn chưa được phép dùng web.",
    ],
    tables: [
      {
        caption: "Chọn phạm vi dữ liệu (nút All data)",
        headers: ["Lựa chọn", "Quick dùng nguồn nào", "Khi nào dùng"],
        rows: [
          ["General knowledge", "Kiến thức chung của AI", "Câu hỏi phổ thông, không cần tài liệu nội bộ"],
          ["All data (mặc định)", "Kiến thức chung + mọi dữ liệu bạn có quyền", "Tra cứu rộng trong tài liệu, dashboard bạn được chia sẻ"],
          ["Specific data", "Kiến thức chung + Space/dashboard/tệp bạn chọn", "Muốn câu trả lời chỉ dựa trên một bộ tài liệu cụ thể"],
        ],
      },
      {
        caption: "Chọn chế độ trả lời (nút Smart)",
        headers: ["Chế độ", "Đặc điểm"],
        rows: [
          ["Fast", "Nhanh, cho việc hằng ngày đơn giản"],
          ["Smart (mặc định)", "Cân bằng tốc độ và chất lượng"],
          ["Advanced", "Suy luận kỹ cho câu hỏi phức tạp, chậm hơn"],
        ],
      },
    ],
    walkthroughs: [
      {
        title: "Hỏi và kiểm tra nguồn",
        steps: [
          { text: "Ở khung chat, chọn phạm vi dữ liệu: để **All data**, hoặc chọn một **Space** cụ thể để câu trả lời chỉ lấy từ tài liệu trong Space đó.", figure: fig("11-6", 2, "Menu phạm vi dữ liệu: General knowledge, All data, Specific data", "Chọn phạm vi dữ liệu") },
          { text: "Gõ câu hỏi rồi bấm gửi.", figure: fig("11-6", 6, "Ô chat đã nhập câu hỏi về Pháp lệnh ngoại hối", "Nhập câu hỏi") },
          { text: "Đọc câu trả lời. Bấm vào **nguồn trích dẫn** để mở đúng văn bản gốc và kiểm tra.", figure: fig("11-6", 7, "Câu trả lời có trích dẫn tài liệu và nút Sources", "Câu trả lời có trích dẫn") },
          "Hỏi tiếp trong cùng cuộc trò chuyện để đào sâu. Quick nhớ ngữ cảnh của các câu hỏi trước.",
        ],
        verify: "Câu trả lời có trích dẫn; bạn đã mở nguồn và đối chiếu ít nhất các ý quan trọng.",
      },
      {
        title: "Đính kèm tài liệu, đổi chế độ trả lời, xem danh sách nguồn",
        intro: "Ví dụ dùng văn bản pháp luật công khai (Pháp lệnh ngoại hối).",
        steps: [
          { text: "Bấm **New chat**. Nút **Private mode** ở góc phải trên dùng khi không muốn cuộc trò chuyện được ghi vào bộ nhớ hội thoại.", figure: fig("11-6", 1, "Nút Private mode được khoanh đỏ ở góc phải trên", "Private mode") },
          { text: "Bấm **Smart** nếu muốn đổi chế độ trả lời (Fast / Smart / Advanced).", figure: fig("11-6", 3, "Menu chế độ trả lời: Fast, Smart, Advanced", "Chọn chế độ trả lời") },
          { text: "Bấm nút **+**, chọn **File upload** rồi chọn tệp từ máy tính (cửa sổ chọn tệp của Windows hiện ra). Trong menu này còn có **Web search** — tắt nếu chưa được phép dùng web.", figure: fig("11-6", 4, "Menu nút + với mục File upload được khoanh đỏ", "Đính kèm tệp: File upload") },
          { text: "Tệp đã đính kèm hiện trong ô chat. Nhập câu hỏi và gửi như phần trên.", figure: fig("11-6", 5, "Tệp Pháp lệnh ngoại hối đã đính kèm trong ô chat", "Tệp đính kèm") },
          { text: "Bấm **Sources** dưới câu trả lời để xem danh sách nguồn; mở nguồn và đối chiếu trước khi dùng câu trả lời.", figure: fig("11-6", 8, "Panel Sources liệt kê tài liệu nguồn", "Kiểm tra nguồn") },
        ],
        verify: "Câu trả lời trích dẫn đúng tài liệu bạn đính kèm; bạn đã mở nguồn và đối chiếu ít nhất các ý quan trọng.",
      },
    ],
    sections: [
      {
        id: "hoi-the-nao",
        title: "Hỏi thế nào cho tốt",
        items: [
          "Nêu rõ đối tượng và phạm vi: hỏi *\"Theo quy chế cho vay hiện hành, điều kiện cho vay tiêu dùng tín chấp là gì?\"* thay vì *\"điều kiện vay?\"*.",
          "Yêu cầu dạng kết quả mong muốn: *\"trả lời dạng bảng\"*, *\"tóm tắt 5 ý\"*, *\"kèm số hiệu văn bản\"*.",
          "So sánh: *\"So sánh quy định X giữa văn bản A và văn bản B\"*.",
        ],
        callout: { tone: "info", text: "Luôn đối chiếu câu trả lời với văn bản gốc trước khi dùng cho công việc chính thức. Mỗi lượt Quick xử lý đều được tính vào hạn mức sử dụng hằng tháng, vì vậy hãy đặt câu hỏi rõ ràng ngay từ đầu." },
      },
    ],
    troubleshooting: [
      { symptom: "Câu trả lời không dựa trên tài liệu của bạn", cause: "Phạm vi dữ liệu đang là General knowledge hoặc All data quá rộng", action: "Chọn **Specific data** hoặc một Space cụ thể, rồi hỏi lại." },
      { symptom: "Câu trả lời có thông tin từ Internet", cause: "**Web search** đang bật", action: "Tắt Web search trong nút **+** nếu chưa được phép dùng web." },
      { symptom: "Không tải được tệp", cause: "Định dạng hoặc dung lượng không được hỗ trợ", action: "Kiểm tra thông báo trên màn hình; chuyển sang định dạng phổ biến (PDF, Word)." },
    ],
    faqs: [
      ["Nên chọn All data hay Specific data?", "All data phù hợp tra cứu rộng. Khi cần câu trả lời chỉ dựa trên một bộ tài liệu (ví dụ quy định của một phòng ban), chọn Specific data hoặc một Space cụ thể."],
      ["Private mode có thay chính sách dữ liệu của NAB không?", "Không. Private mode không dùng và không ghi bộ nhớ hội thoại, nhưng bạn vẫn phải tuân thủ phân loại dữ liệu và quyền truy cập của NAB."],
      ["Câu trả lời có trích dẫn rồi thì dùng ngay được không?", "Chưa. Trích dẫn giúp kiểm tra nhanh nhưng có thể chỉ khớp một phần; mở nguồn và đối chiếu các ý quan trọng trước khi dùng."],
      ["Được đính kèm loại dữ liệu nào?", "Chỉ dữ liệu đã được phân loại và được phép sử dụng cho công việc của bạn. Không đính kèm dữ liệu khách hàng hoặc dữ liệu mật nếu chưa được phép."],
    ],
    controls: [
      "Chỉ đính kèm và hỏi về dữ liệu đã được phân loại, được phép sử dụng.",
      "Tắt Web search khi câu hỏi liên quan dữ liệu nội bộ hoặc khi tình huống chưa được phép dùng web.",
      "Không tải tệp nếu chưa rõ dữ liệu được xử lý và lưu giữ thế nào.",
      "Câu trả lời là bản nháp: mở nguồn, đối chiếu số liệu và chịu trách nhiệm nội dung trước khi dùng.",
      "Private mode, lịch sử hội thoại và bộ nhớ không thay thế chính sách dữ liệu NAB.",
    ],
    sources: [DOCS.howWorks, DOCS.security],
  }),

  // -------------------------------------------------------------------------
  task({
    id: "11.7",
    parentId: 11,
    slug: SLUG.create,
    navTitle: "Tạo tài liệu, slide, hình từ chat",
    title: "Tạo tài liệu, slide, hình từ chat",
    summary: "Ngoài việc trả lời câu hỏi, Quick có thể biến nội dung chat thành file Word, PowerPoint, Excel hoặc hình minh hoạ để bạn tải về.",
    statusText: "Tạo nội dung từ chat dùng được cho mọi user Amazon Quick tại NAB.",
    searchKeywords: ["document", "word", "docx", "presentation", "slide", "powerpoint", "excel", "visual", "hình", "soạn thảo", "tạo tài liệu", "tạo file", "hạn mức"],
    capture: { flow: "q11-5-tao-tai-lieu", ...CAPTURED },
    objectives: ["Tạo file Word, PowerPoint, Excel hoặc hình minh hoạ từ nội dung chat.", "Xem, tải về và rà soát file trước khi gửi đi."],
    prerequisites: ["Nội dung yêu cầu và tài liệu nguồn chỉ gồm dữ liệu được phép sử dụng."],
    walkthroughs: [
      {
        title: "Tạo file từ nội dung chat",
        steps: [
          "Chat đến khi có đủ nội dung cần dùng, ví dụ một bản tóm tắt các quy định mới.",
          {
            text: "Yêu cầu rõ định dạng đầu ra, ví dụ:",
            list: [
              "*\"Tạo file Word tờ trình từ nội dung trên, có mục lục\"*",
              "*\"Tạo 6 slide PowerPoint tóm tắt các điểm mới của quy định\"*",
              "*\"Xuất bảng so sánh ra file Excel\"*",
            ],
          },
          "Quick tạo file và hiển thị ngay trong khung chat. Bấm vào file để xem trước hoặc tải về.",
          {
            text: `Nếu cần sửa, nói tiếp trong chat (ví dụ *"thêm slide kết luận"*, *"rút ngắn mục 2"*). Hoặc tải file về rồi chỉnh tiếp bằng add-in trong Office (mục [11.4](./${SLUG.office})).`,
            notes: [{ tone: "info", text: "Tạo file tốn nhiều hạn mức sử dụng hơn hỏi đáp thông thường. Chỉ tạo file khi nội dung đã đúng ý, và luôn rà soát file trước khi gửi đi." }],
          },
        ],
        verify: "Bạn xem hoặc tải được file và đã rà soát nội dung, số liệu, trích dẫn trước khi dùng.",
      },
      {
        title: "Dùng nút Document dưới ô chat",
        intro: "Presentation (slide) và Visual (hình) làm tương tự.",
        steps: [
          { text: "Dưới ô chat có các nút tạo nhanh: **Research**, **Document**, **Presentation**, **Visual**.", figure: fig("11-7", 1, "Các nút tạo nhanh dưới ô chat, nút Document được khoanh đỏ", "Nút tạo nhanh") },
          { text: "Bấm **Document**.", figure: fig("11-7", 2, "Đã chọn Document", "Chọn Document") },
          { text: "Mô tả tài liệu cần tạo: mục đích, người đọc, độ dài, các ý chính; rồi bấm gửi. Quick có thể mất vài phút để soạn.", figure: fig("11-7", 3, "Ô chat đã nhập mô tả tài liệu tóm tắt Pháp lệnh ngoại hối", "Mô tả tài liệu") },
          { text: "Tài liệu tạo xong hiện dạng thẻ tệp **.docx**: **View** để xem, **Download** để tải về, **Open in Word** để mở bằng Word.", figure: fig("11-7", 4, "Thẻ tệp phap_lenh_ngoai_hoi.docx với nút View, Download, Open in Word", "Tài liệu đã tạo") },
        ],
        verify: "Bạn tải được tệp .docx và đã rà soát nội dung, số liệu, trích dẫn trước khi dùng.",
      },
    ],
    troubleshooting: [
      { symptom: "Chờ lâu chưa thấy tài liệu", cause: "Tài liệu dài hoặc nhiều bước xử lý", action: "Chờ thêm vài phút; không gửi lại yêu cầu liên tục." },
      { symptom: "Nội dung chưa đúng ý", cause: "Mô tả còn chung chung", action: "Gõ tiếp yêu cầu chỉnh sửa trong cùng cuộc trò chuyện (ví dụ: rút gọn, thêm mục, đổi giọng văn)." },
    ],
    faqs: [
      ["Tài liệu do Quick tạo có dùng ngay được không?", "Không. Đây là bản nháp; người soạn phải rà soát nội dung, số liệu, trích dẫn và chịu trách nhiệm trước khi gửi."],
      ["Lưu tài liệu ở đâu?", "Lưu vào kho tài liệu được NAB cho phép và gắn nhãn phân loại phù hợp; không lưu trên ổ cá nhân hoặc gửi qua email cá nhân."],
    ],
    controls: [
      "Tài liệu, slide, hình do AI tạo là bản nháp; rà soát và chịu trách nhiệm trước khi dùng.",
      "Lưu và chia sẻ tệp tạo ra theo quy định phân loại dữ liệu của NAB.",
    ],
    sources: [DOCS.howWorks],
  }),
];
