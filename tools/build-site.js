#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const chaptersDir = path.join(root, "chapters");
const rawChapters = [
  ...require("./content-general"),
  ...require("./content-ms365"),
  ...require("./content-quick"),
  ...require("./content-reference")
];

const copyReplacements = [
  [/You are a senior financial analyst at NAB\. Be precise, cite sources, never speculate\./g, "Bạn là chuyên viên phân tích tài chính cấp cao tại NAB. Hãy trả lời chính xác, dẫn nguồn và không suy đoán."],
  [/Find top revenue drivers/g, "Tìm các yếu tố chính thúc đẩy doanh thu"],
  [/Identify churn risk segments/g, "Xác định các nhóm có nguy cơ rời bỏ"],
  [/Compare Q1 vs Q2 performance/g, "So sánh kết quả quý 1 và quý 2"],
  [/Summarize Q2 2026 fintech regulatory changes in APAC, focusing on crypto and payments\. Output: 2-page executive summary with citations\./g, "Tóm tắt các thay đổi quy định về công nghệ tài chính tại khu vực APAC trong quý 2 năm 2026, tập trung vào tiền mã hóa và thanh toán. Kết quả: bản tóm tắt điều hành dài 2 trang, có trích dẫn."],
  [/For risk team quarterly review; prioritize authoritative sources \(regulators, official announcements\)\./g, "Dùng cho đợt rà soát hằng quý của bộ phận quản lý rủi ro; ưu tiên nguồn chính thống như cơ quan quản lý và thông báo chính thức."],
  [/AI-assisted analysis canvas/g, "vùng phân tích có AI hỗ trợ"],
  [/AI-suggested analysis canvas/g, "vùng phân tích do AI đề xuất"],
  [/AI-suggested insights/g, "kết quả phân tích do AI đề xuất"],
  [/scenario canvas/g, "vùng làm việc của Scenario"],
  [/AI đề xuất initial visuals/g, "AI đề xuất các biểu đồ ban đầu"],
  [/AI đề xuất analysis canvas/g, "AI đề xuất vùng phân tích"],
  [/analysis goal/g, "mục tiêu phân tích"],
  [/AI insights/g, "Kết quả phân tích của AI"],
  [/review AI plan/gi, "kiểm tra kế hoạch do AI đề xuất"],
  [/partial\/misinterpreted/g, "chỉ khớp một phần hoặc bị diễn giải sai"],
  [/trước khi execute/g, "trước khi thực thi"],
  [/data as of/g, "dữ liệu tính đến"],
  [/source notes/g, "ghi chú nguồn"],
  [/Remove claims/g, "Loại bỏ các nhận định"],
  [/source register/g, "danh mục nguồn"],
  [/Plan rộng/g, "Kế hoạch rộng"],
  [/Report có/g, "Báo cáo có"],
  [/feature và sensitivity policy/g, "tính năng và chính sách độ nhạy"],
  [/brand\/accessibility review/g, "kiểm tra thương hiệu và khả năng tiếp cận"],
  [/fact-check/g, "kiểm tra dữ kiện"],
  [/based on your goal/g, "dựa trên mục tiêu của bạn"],
  [/đề xuất alternatives/g, "đề xuất các phương án khác"],
  [/change aggregations/g, "thay đổi cách tổng hợp"],
  [/ask follow-up questions/g, "đặt câu hỏi tiếp nối"],
  [/Add more data sources/g, "Thêm nguồn dữ liệu"],
  [/cross-dataset analysis/g, "phân tích giữa nhiều Dataset"],
  [/Refine canvas/g, "Tinh chỉnh vùng làm việc"],
  [/format labels và titles/g, "định dạng nhãn và tiêu đề"],
  [/Save Scenario/g, "Lưu Scenario"],
  [/business judgment/g, "đánh giá nghiệp vụ"],
  [/entry point/g, "điểm truy cập"],
  [/Spaces context menu/g, "menu ngữ cảnh của Spaces"],
  [/competitor analysis/g, "phân tích đối thủ"],
  [/trend reports/g, "báo cáo xu hướng"],
  [/policy summaries/g, "bản tóm tắt chính sách"],
  [/multi-source reports/g, "báo cáo từ nhiều nguồn"],
  [/cross-team insights/g, "kết quả phân tích liên nhóm"],
  [/analyze documents user upload/g, "phân tích tài liệu do người dùng tải lên"],
  [/user upload files/g, "file do người dùng tải lên"],
  [/Research goal/g, "Mục tiêu Research"],
  [/Context giúp/g, "Bối cảnh giúp"],
  [/authoritative source preferences/g, "ưu tiên nguồn chính thống"],
  [/search terms/g, "từ khóa tìm kiếm"],
  [/AI plan/g, "Kế hoạch do AI đề xuất"],
  [/Steps\/subtasks/g, "Các bước/tác vụ nhỏ"],
  [/Expected format/g, "Định dạng dự kiến"],
  [/expected timeline/g, "thời gian dự kiến"],
  [/Adjust scope/g, "Điều chỉnh phạm vi"],
  [/source count/g, "số lượng nguồn"],
  [/Inspect citations/g, "Kiểm tra trích dẫn"],
  [/verify evidence/g, "kiểm chứng căn cứ"],
  [/full paragraph\/section/g, "toàn bộ đoạn hoặc mục"],
  [/highlighted snippet/g, "đoạn trích được tô sáng"],
  [/authoritative source/g, "độ tin cậy của nguồn"],
  [/regulator announcement/g, "thông báo của cơ quan quản lý"],
  [/cross-source/g, "nhiều nguồn"],
  [/workpaper/g, "hồ sơ làm việc"],
  [/Edit và export/g, "Biên tập và xuất"],
  [/Export vào/g, "Xuất vào"],
  [/users\/groups/g, "người dùng/nhóm"],
  [/aggregation logic/g, "logic tổng hợp"],
  [/chart type/g, "loại biểu đồ"],
  [/calculated fields/g, "trường tính toán"],
  [/join logic/g, "logic kết nối dữ liệu"],
  [/definition document/g, "tài liệu định nghĩa"],
  [/downstream effect/g, "tác động tới bước sau"],
  [/response logic/g, "logic phản hồi"],
  [/Runtime cần handle missing\/invalid input/g, "Khi chạy, hệ thống cần xử lý đầu vào thiếu hoặc không hợp lệ"],
  [/detect intent/g, "nhận diện ý định"],
  [/staging\/production deployment/g, "triển khai qua môi trường thử nghiệm và chính thức"],
  [/centralized schedule/g, "lịch chạy tập trung"],
  [/operational dashboard/g, "dashboard vận hành"],
  [/risk rating/g, "mức độ rủi ro"],
  [/rollback runbook/g, "tài liệu hướng dẫn khôi phục"],
  [/lease privilege/g, "least privilege"],
  [/responder action/g, "người xử lý hành động"],
  [/pass cả happy\/negative cases/g, "đạt cả tình huống bình thường và tình huống lỗi"],
  [/purpose and access/g, "mục đích và quyền truy cập"],
  [/mục đích và access/g, "mục đích và quyền truy cập"],
  [/Review Research plan/g, "Kiểm tra kế hoạch Research"],
  [/Review và approve Research plan/g, "Kiểm tra và phê duyệt kế hoạch Research"],
  [/Topics là/g, "Topic là"],
  [/members hỏi đáp/g, "thành viên hỏi đáp"],
  [/Thêm members/g, "Thêm thành viên"],
  [/mời user hoặc group/g, "mời người dùng hoặc nhóm"],
  [/Review access/g, "Rà soát quyền truy cập"],
  [/cùng edit hoặc view/g, "cùng biên tập hoặc xem"],
  [/Permissions:/g, "Quyền:"],
  [/Dataset settings → Refresh schedule/g, "Dataset settings → Lịch cập nhật"],
  [/Refresh schedule/g, "Lịch cập nhật"],
  [/Schedule refresh/g, "Lập lịch cập nhật"],
  [/Dataset settings/g, "phần cài đặt Dataset"],
  [/Monitor refresh history/g, "Theo dõi lịch sử cập nhật"],
  [/restrict viewer controls/g, "giới hạn các điều khiển của người xem"],
  [/Approval bởi risk\/ATTT nếu automation ghi/g, "Cần bộ phận rủi ro hoặc ATTT phê duyệt nếu quy trình tự động hóa ghi"],
  [/Dashboard owner hoặc admin/g, "Chủ sở hữu Dashboard hoặc quản trị viên"],
  [/data permissions/g, "quyền dữ liệu"],
  [/Research và Scenarios output/g, "Kết quả Research và Scenarios"],
  [/data classification label/g, "nhãn phân loại dữ liệu"],
  [/include out-of-scope data/g, "bao gồm dữ liệu ngoài phạm vi"],
  [/Research\/Scenarios output/g, "Kết quả Research/Scenarios"],
  [/Research plan/g, "kế hoạch Research"],
  [/Research output/g, "kết quả Research"],
  [/Scenarios output/g, "kết quả Scenarios"],
  [/objective\/goal/g, "mục tiêu"],
  [/date cutoff/g, "mốc thời gian dữ liệu"],
  [/partial match/g, "chỉ khớp một phần"],
  [/misinterpreted/g, "bị diễn giải sai"],
  [/exploratory canvas/g, "vùng làm việc khám phá"],
  [/production dashboards/g, "dashboard chính thức"],
  [/full control/g, "toàn quyền kiểm soát"],
  [/Review AI-suggested visuals/g, "Kiểm tra các biểu đồ do AI đề xuất"],
  [/Upload files vào NAB-approved storage/g, "Tải file lên nơi lưu trữ đã được NAB phê duyệt"],
  [/không upload trực tiếp sensitive data/g, "không tải trực tiếp dữ liệu nhạy cảm"],
  [/không accept AI output blindly/gi, "không chấp nhận kết quả AI khi chưa kiểm chứng"],
  [/Production automation/g, "Quy trình tự động hóa trong môi trường chính thức"],
  [/production write/g, "ghi dữ liệu vào môi trường chính thức"],
  [/sensitive\/production system/g, "hệ thống nhạy cảm hoặc môi trường chính thức"],
  [/production system/g, "hệ thống chính thức"],
  [/User acceptance test/g, "Kiểm thử chấp nhận của người dùng"],
  [/Test environment/g, "Môi trường kiểm thử"],
  [/data representative/g, "dữ liệu đại diện"],
  [/Write action/g, "Hành động ghi dữ liệu"],
  [/write action/g, "hành động ghi dữ liệu"],
  [/inventory connector/g, "danh mục kết nối"],
  [/credential scope/g, "phạm vi thông tin xác thực"],
  [/resource limits/g, "giới hạn tài nguyên"],
  [/resource giới hạn/g, "giới hạn tài nguyên"],
  [/resource scope/g, "phạm vi tài nguyên"],
  [/use test target/g, "dùng đích kiểm thử"],
  [/explicit approval gate/g, "bước phê duyệt rõ ràng"],
  [/không autonomous approve\/send\/write/g, "không được tự động phê duyệt, gửi hoặc ghi dữ liệu"],
  [/HITL assignment works/g, "việc phân công HITL hoạt động đúng"],
  [/Task assignment/g, "Việc phân công tác vụ"],
  [/human review/g, "con người kiểm tra"],
  [/clean up partial writes/g, "dọn dẹp phần dữ liệu đã ghi dở"],
  [/restore previous version/g, "khôi phục phiên bản trước"],
  [/impacted users/g, "người dùng bị ảnh hưởng"],
  [/auth expiry check/g, "kiểm tra thời hạn xác thực"],
  [/backup owner/g, "người phụ trách dự phòng"],
  [/input default/g, "đầu vào mặc định"],
  [/confirmation setting/g, "cấu hình xác nhận"],
  [/test phase/g, "giai đoạn kiểm thử"],
  [/Research execute/g, "Research được thực thi"],
  [/expected output/g, "kết quả dự kiến"],
  [/sau khi complete/gi, "sau khi hoàn tất"],
  [/full context/g, "đầy đủ ngữ cảnh"],
  [/\bverification\b/g, "kiểm chứng"],
  [/\bdefinitions\b/g, "định nghĩa"],
  [/control totals/g, "số liệu đối soát"],
  [/\bcross-check\b/gi, "đối chiếu chéo"],
  [/ngày publish/g, "ngày xuất bản"],
  [/\bfailures\b/g, "lỗi"],
  [/Citations/g, "Trích dẫn"],
  [/match source/g, "khớp với nguồn"],
  [/sign-off/g, "xác nhận"],
  [/skip review/g, "bỏ qua bước kiểm tra"],
  [/Access yêu cầu/g, "Điều kiện truy cập"],
  [/all Spaces\/dashboards/g, "toàn bộ Spaces và dashboards"],
  [/all Spaces/g, "toàn bộ Spaces"],
  [/nếu applicable/g, "nếu phù hợp"],
  [/\bbypass\b/g, "bỏ qua cơ chế kiểm soát"],
  [/map đúng entity/g, "ánh xạ đúng đối tượng"],
  [/được handle/g, "được xử lý"],
  [/\baccept\b/g, "chấp nhận"],
  [/knowledge bases/g, "các kho kiến thức"],
  [/Co-owner/g, "Đồng sở hữu"],
  [/data classification/g, "phân loại dữ liệu"],
  [/out-of-scope/g, "ngoài phạm vi"],
  [/citation có thể partial\/misinterpreted/g, "trích dẫn có thể chỉ khớp một phần hoặc bị diễn giải sai"],
  [/check authoritative/g, "kiểm tra độ tin cậy của nguồn"],
  [/AI-assisted analysis/g, "phân tích có AI hỗ trợ"],
  [/AI-assisted/g, "có AI hỗ trợ"],
  [/AI-suggested/g, "do AI đề xuất"],
  [/human-in-the-loop/g, "có người tham gia kiểm soát"],
  [/human gate/g, "bước phê duyệt của con người"],
  [/human confirmation/g, "xác nhận của con người"],
  [/least privilege/g, "quyền tối thiểu"],
  [/read-only/g, "chỉ đọc"],
  [/natural language/g, "ngôn ngữ tự nhiên"],
  [/visual editor/g, "trình chỉnh sửa trực quan"],
  [/data sources/g, "nguồn dữ liệu"],
  [/data source/g, "nguồn dữ liệu"],
  [/data owner/g, "chủ sở hữu dữ liệu"],
  [/process owner/g, "người chịu trách nhiệm quy trình"],
  [/system owner/g, "người chịu trách nhiệm hệ thống"],
  [/business reviewer/g, "người kiểm tra nghiệp vụ"],
  [/representative end-user/g, "người dùng đại diện"],
  [/reviewer/g, "người kiểm tra"],
  [/use cases/g, "các tình huống sử dụng"],
  [/use case/g, "tình huống sử dụng"],
  [/source grounding/g, "đối chiếu với nguồn"],
  [/web search/g, "tìm kiếm web"],
  [/knowledge base/g, "kho kiến thức"],
  [/cross-boundary mixing/g, "việc kết hợp dữ liệu giữa các phạm vi"],
  [/cross-boundary/g, "giữa các phạm vi"],
  [/audit trail/g, "dấu vết kiểm tra"],
  [/public link/g, "liên kết công khai"],
  [/personal drive/g, "ổ lưu trữ cá nhân"],
  [/scheduled email/g, "email theo lịch"],
  [/refresh schedule/g, "lịch cập nhật"],
  [/incremental refresh/g, "cập nhật tăng dần"],
  [/real-time/g, "theo thời gian thực"],
  [/blank canvas/g, "khung trống"],
  [/blank flow/g, "Flow trống"],
  [/happy path/g, "tình huống hoạt động bình thường"],
  [/negative cases/g, "tình huống lỗi"],
  [/invalid input/g, "đầu vào không hợp lệ"],
  [/partial failure/g, "lỗi một phần"],
  [/partial completion/g, "hoàn thành một phần"],
  [/permission denied/g, "bị từ chối quyền"],
  [/auth expiry/g, "hết hạn xác thực"],
  [/rate limit/g, "giới hạn tần suất"],
  [/side effect/g, "tác động ngoài dự kiến"],
  [/root cause/g, "nguyên nhân gốc"],
  [/without fix/g, "khi chưa khắc phục lỗi"],
  [/Use cases/g, "Các tình huống sử dụng"],
  [/Use case/g, "Tình huống sử dụng"],
  [/AI suggestions/g, "gợi ý của AI"],
  [/what-if scenarios/g, "các tình huống giả định"],
  [/Exploratory analysis/g, "Phân tích khám phá"],
  [/Collaborative analysis/g, "Phân tích cộng tác"],
  [/Market research/g, "Nghiên cứu thị trường"],
  [/Internal research/g, "Nghiên cứu nội bộ"],
  [/Ad-hoc research/g, "Nghiên cứu phát sinh"],
  [/Accept suggestions/g, "Chấp nhận gợi ý"],
  [/Refine goal/g, "Điều chỉnh mục tiêu"],
  [/Inspect data/g, "Kiểm tra dữ liệu"],
  [/Review AI-suggested visuals/g, "Kiểm tra các biểu đồ do AI đề xuất"],
  [/Review plan/g, "Kiểm tra kế hoạch"],
  [/Approve plan/g, "Phê duyệt kế hoạch"],
  [/Monitor progress/g, "Theo dõi tiến độ"],
  [/Verify citations/g, "Kiểm chứng trích dẫn"],
  [/Edit output/g, "Biên tập kết quả"],
  [/Export format/g, "Định dạng xuất"],
  [/Share với/g, "Chia sẻ với"],
  [/Review Research plan, approve và verify citations/g, "Kiểm tra kế hoạch Research, phê duyệt và kiểm chứng trích dẫn"],
  [/Review và approve plan/g, "Kiểm tra và phê duyệt kế hoạch"],
  [/Verification best practices và safe sharing/g, "Cách kiểm chứng và chia sẻ an toàn"],
  [/Verification checklist/g, "Danh sách kiểm tra"],
  [/Safe sharing và export controls/g, "Chia sẻ an toàn và kiểm soát xuất dữ liệu"],
  [/Monitor và operational control/g, "Giám sát và kiểm soát vận hành"],
  [/Test, approve, monitor, stop và rollback/g, "Kiểm thử, phê duyệt, giám sát, dừng và khôi phục"],
  [/UAT và approval/g, "UAT và phê duyệt"],
  [/Version và deployment/g, "Phiên bản và triển khai"],
  [/Rollback và recovery/g, "Khôi phục phiên bản và phục hồi"],
  [/citation verification/g, "kiểm chứng trích dẫn"],
  [/\bapproved\b/g, "được phê duyệt"],
  [/\bcitations\b/g, "trích dẫn"],
  [/\bcitation\b/g, "trích dẫn"],
  [/\bgrounding\b/g, "đối chiếu nguồn"],
  [/\bapprovals\b/g, "các phê duyệt"],
  [/\bapproval\b/g, "phê duyệt"],
  [/\bapprove\b/g, "phê duyệt"],
  [/\breview\b/g, "kiểm tra"],
  [/\boutputs\b/g, "kết quả"],
  [/\boutput\b/g, "kết quả"],
  [/\binputs\b/g, "đầu vào"],
  [/\binput\b/g, "đầu vào"],
  [/\binsights\b/g, "kết quả phân tích"],
  [/\binsight\b/g, "kết quả phân tích"],
  [/\bvisualizations\b/g, "biểu đồ trực quan"],
  [/\bvisuals\b/g, "biểu đồ"],
  [/\bvisual\b/g, "biểu đồ"],
  [/\bfiltering\b/g, "lọc"],
  [/\bfilters\b/g, "bộ lọc"],
  [/\bfilter\b/g, "bộ lọc"],
  [/\bmonitoring\b/g, "giám sát"],
  [/\bmonitor\b/g, "theo dõi"],
  [/\bdeployment\b/g, "triển khai"],
  [/\bproduction\b/g, "môi trường chính thức"],
  [/\brollback\b/g, "khôi phục"],
  [/\brunbook\b/g, "tài liệu hướng dẫn vận hành"],
  [/\bcredentials\b/g, "thông tin xác thực"],
  [/\bcredential\b/g, "thông tin xác thực"],
  [/\bconnectors\b/g, "kết nối"],
  [/\bconnector\b/g, "kết nối"],
  [/\bstakeholders\b/g, "các bên liên quan"],
  [/\blimitations\b/g, "giới hạn"],
  [/\bdisclaimers\b/g, "lưu ý về giới hạn"],
  [/\bdisclaimer\b/g, "lưu ý về giới hạn"],
  [/\bauthoritative\b/g, "chính thống"],
  [/\bassumptions\b/g, "giả định"],
  [/\bpatterns\b/g, "mẫu hình"],
  [/\boutliers\b/g, "điểm bất thường"],
  [/\btrends\b/g, "xu hướng"],
  [/\bcolleagues\b/g, "đồng nghiệp"],
  [/\bworkspace\b/g, "không gian làm việc"],
  [/\breports\b/g, "báo cáo"],
  [/\breport\b/g, "báo cáo"],
  [/\bclaims\b/g, "nhận định"],
  [/\bclaim\b/g, "nhận định"],
  [/\bgoal\b/g, "mục tiêu"],
  [/\bcontext\b/g, "bối cảnh"],
  [/\btimeline\b/g, "thời gian dự kiến"],
  [/\bsteps\b/g, "các bước"],
  [/\bstep\b/g, "bước"],
  [/\bscope\b/g, "phạm vi"],
  [/\bsources\b/g, "nguồn"],
  [/\bsource\b/g, "nguồn"],
  [/\bpolicy\b/g, "chính sách"],
  [/\blicense\b/g, "giấy phép sử dụng"],
  [/\bowner\b/g, "người chịu trách nhiệm"],
  [/\btemplate\b/g, "mẫu"],
  [/\bschedule\b/g, "lịch chạy"],
  [/\bexport\b/g, "xuất dữ liệu"],
  [/\bshare\b/g, "chia sẻ"],
  [/\bwrite\b/g, "ghi dữ liệu"],
  [/\btest\b/g, "kiểm thử"],
  [/\bverify\b/g, "kiểm chứng"],
  [/\bvalidation\b/g, "kiểm tra hợp lệ"],
  [/\bnotifications\b/g, "thông báo"],
  [/\bnotification\b/g, "thông báo"],
  [/\balerting\b/g, "cảnh báo"],
  [/\bruntime\b/g, "khi chạy"],
  [/\bdata\b/g, "dữ liệu"],
  [/\banalysis\b/g, "phân tích"],
  [/\banalyses\b/g, "các bản phân tích"],
  [/\bcanvas\b/g, "vùng làm việc"],
  [/\buploads\b/g, "file đã tải lên"],
  [/\bobjective\b/g, "mục tiêu"],
  [/\bover-reliance\b/g, "phụ thuộc quá mức"],
  [/\bparameters\b/g, "tham số"],
  [/\baccount\b/g, "tài khoản"],
  [/\bpermissions\b/g, "quyền"],
  [/\bversion\b/g, "phiên bản"],
  [/\binitial\b/g, "ban đầu"],
  [/\badjust\b/g, "điều chỉnh"],
  [/\bbuild\b/g, "tạo"],
  [/\bdimensions\b/g, "chiều dữ liệu"],
  [/\baggregations\b/g, "cách tổng hợp"],
  [/\biterate\b/g, "lặp lại"],
  [/\bcompetitor\b/g, "đối thủ"],
  [/\bmulti-source\b/g, "nhiều nguồn"],
  [/\bcross-team\b/g, "liên nhóm"],
  [/\bad-hoc\b/g, "phát sinh"],
  [/\bpublic web\b/g, "web công khai"],
  [/\bdate range\b/g, "khoảng thời gian"],
  [/\bdata classification\b/g, "phân loại dữ liệu"],
  [/\bsensitive data\b/g, "dữ liệu nhạy cảm"],
  [/\bquery\b/g, "truy vấn"],
  [/\bnumbers\b/g, "số liệu"],
  [/\bspecific\b/g, "cụ thể"],
  [/\baudience\b/g, "đối tượng đọc"],
  [/\bconstraints\b/g, "ràng buộc"],
  [/\bplan\b/g, "kế hoạch"],
  [/\bsubtasks\b/g, "tác vụ nhỏ"],
  [/\banswer\b/g, "trả lời"],
  [/\bprocessing\b/g, "xử lý"],
  [/\bprogress\b/g, "tiến độ"],
  [/\bcurrent\b/g, "còn cập nhật"],
  [/\breject\b/g, "từ chối"],
  [/\brefine\b/g, "điều chỉnh"],
  [/\bremove\b/g, "loại bỏ"],
  [/\badd\b/g, "thêm"],
  [/\bedit\b/g, "biên tập"],
  [/\blocal\b/g, "máy cá nhân"],
  [/\breceive\b/g, "nhận"],
  [/\bpurpose\b/g, "mục đích"],
  [/documentation artifact/g, "tài liệu"],
  [/documentation/g, "tài liệu"],
];

function normalizeCopy(value) {
  return copyReplacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), value);
}

function normalizeChapterCopy(value, pathParts = []) {
  if (typeof value === "string") {
    const field = pathParts.at(-1);
    const pathText = pathParts.join(".");
    if (["id", "slug", "src", "type", "tone", "kind", "className", "wrapClassName"].includes(field)) return value;
    if (pathText.includes("sources")) return value;
    if (/\.toc\.\d+\.0$/.test(pathText)) return value;
    return normalizeCopy(value);
  }
  if (Array.isArray(value)) {
    return value.map((item, index) => normalizeChapterCopy(item, [...pathParts, String(index)]));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeChapterCopy(item, [...pathParts, key])]));
  }
  return value;
}

const chapters = rawChapters
  .map((chapter) => chapter.id === 23 ? chapter : normalizeChapterCopy(chapter))
  .sort((a, b) => a.id - b.id);

const sourceIdsByChapter = {
  1: ["NAB-POL-002", "VEN-MS-001", "VEN-AQ-001"],
  2: ["NAB-POL-001", "NAB-POL-003"],
  3: ["NAB-POL-001", "NAB-POL-002"],
  4: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  5: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  6: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  7: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  8: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  9: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  10: ["NAB-MS-001", "NAB-MS-002", "VEN-MS-001"],
  11: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  12: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  13: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  14: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  15: ["NAB-AQ-001", "NAB-AQ-002", "VEN-AQ-001"],
  16: ["NAB-POL-002", "VEN-MS-001", "VEN-AQ-001"],
  17: ["NAB-OTH-001", "VEN-OAI-001", "VEN-ANT-001", "VEN-GGL-001", "VEN-PPLX-001", "VEN-XAI-001"],
  18: ["NAB-OTH-001", "VEN-GGL-001"],
  19: ["NAB-OTH-001", "VEN-CANVA-001", "VEN-DESIGN-001"],
  20: ["NAB-OTH-001", "VEN-MEDIA-001"],
  21: ["NAB-OTH-001", "VEN-AUTO-001", "VEN-MS-001"],
  22: ["NAB-POL-001", "NAB-POL-002"],
  23: ["NAB-POL-001", "VEN-MS-001", "VEN-AQ-001"]
};

function assertContent() {
  const ids = chapters.map((chapter) => chapter.id);
  const slugs = chapters.map((chapter) => chapter.slug);
  if (chapters.length !== 23) throw new Error(`Expected 23 chapters, got ${chapters.length}`);
  for (let id = 1; id <= 23; id += 1) {
    if (!ids.includes(id)) throw new Error(`Missing chapter ${id}`);
  }
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate chapter id");
  if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate chapter slug");
  chapters.forEach((chapter) => {
    ["title", "navTitle", "summary", "statusLabel", "statusText", "audience", "owner"].forEach((field) => {
      if (!chapter[field]) throw new Error(`Chapter ${chapter.id} missing ${field}`);
    });
    if (!Array.isArray(chapter.walkthroughs) || !chapter.walkthroughs.length) {
      throw new Error(`Chapter ${chapter.id} needs at least one walkthrough`);
    }
    if (!Array.isArray(chapter.faqs) || chapter.faqs.length < 3) {
      throw new Error(`Chapter ${chapter.id} needs at least three FAQs`);
    }
    if (!sourceIdsByChapter[chapter.id]?.length) {
      throw new Error(`Chapter ${chapter.id} needs at least one Source ID`);
    }
  });
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cleanOutput(value) {
  return value.replace(/[ \t]+$/gm, "");
}

function chapterNo(id) {
  return String(id).padStart(2, "0");
}

function groupChapters() {
  return [
    ["AI trong công việc", chapters.filter((chapter) => chapter.id <= 3)],
    ["Microsoft 365", chapters.filter((chapter) => chapter.id >= 4 && chapter.id <= 10)],
    ["Amazon Quick", chapters.filter((chapter) => chapter.id >= 11 && chapter.id <= 15)],
    ["AI phổ biến", chapters.filter((chapter) => chapter.id >= 16 && chapter.id <= 21)],
    ["Phụ lục", chapters.filter((chapter) => chapter.id >= 22)]
  ];
}

function displayGroup(chapter) {
  if (chapter.id >= 4 && chapter.id <= 10) return "Microsoft 365";
  if (chapter.id >= 11 && chapter.id <= 15) return "Amazon Quick";
  if (chapter.id >= 16 && chapter.id <= 21) return "AI phổ biến";
  return chapter.group;
}

function renderNav(currentSlug, chapterPrefix = "./") {
  return groupChapters().map(([title, items], groupIndex) => {
    const groupId = `nav-group-${groupIndex + 1}`;
    const isCurrentGroup = items.some((chapter) => chapter.slug === currentSlug);
    const expanded = currentSlug ? isCurrentGroup : true;
    return `
    <nav class="nav-group${isCurrentGroup ? " current-group" : ""}" aria-label="${esc(title)}">
      <button class="nav-group-toggle" type="button" data-accordion-button aria-expanded="${expanded}" aria-controls="${groupId}">
        <span>${esc(title)}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <ol class="chapter-nav" id="${groupId}">
        ${items.map((chapter) => {
          return `
          <li>
            <a href="${chapterPrefix}${esc(chapter.slug)}" data-nav-link data-search="${esc(`${chapterNo(chapter.id)} ${chapter.navTitle} ${chapter.title} ${displayGroup(chapter)}`)}"${chapter.slug === currentSlug ? ' aria-current="page"' : ""}>
              <span class="nav-num">${chapterNo(chapter.id)}</span>
              <span class="nav-label"><span>${esc(chapter.navTitle)}</span></span>
            </a>
          </li>`;
        }).join("")}
      </ol>
    </nav>`;
  }).join("");
}

function renderHeader(includeMenu = true, rootPrefix = "./") {
  return `
  <a class="skip-link" href="#main-content">Bỏ qua điều hướng</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${rootPrefix}index.html" aria-label="Về trang chủ hướng dẫn NAB">
        <img src="${rootPrefix}logo/NAB-logo.png" alt="Ngân hàng Nam Á - NAB" width="297" height="58">
        <span class="brand-text">
          <span class="brand-kicker">Cẩm nang nội bộ</span>
          <span class="brand-title">Ứng dụng công nghệ và AI</span>
        </span>
      </a>
      <div class="header-search" role="search">
        <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
        <label class="sr-only" for="portal-search">Tìm nhanh chương</label>
        <input id="portal-search" type="search" data-portal-search placeholder="Tìm nhanh chương..." autocomplete="off">
        <kbd>Ctrl K</kbd>
      </div>
      <div class="header-actions">
        <a class="home-link" href="${rootPrefix}index.html">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>
          <span>Trang chủ</span>
        </a>
        ${includeMenu ? '<button class="menu-button" type="button" data-menu-button aria-controls="chapter-sidebar" aria-expanded="false" aria-label="Mở danh mục chương"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>Danh mục</span></button>' : ""}
      </div>
    </div>
  </header>`;
}

function renderSidebar(currentSlug, chapterPrefix = "./") {
  return `<aside class="sidebar" id="chapter-sidebar" data-sidebar aria-label="Danh mục hướng dẫn">
      <div class="sidebar-heading">
        <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22Z"/></svg>Danh mục chương</span>
        <button type="button" data-sidebar-close aria-label="Thu gọn danh mục"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m11 18-6-6 6-6M19 18l-6-6 6-6"/></svg></button>
      </div>
      <div class="sidebar-inner">
        ${renderNav(currentSlug, chapterPrefix)}
        <p class="nav-empty" data-nav-empty>Không tìm thấy chương phù hợp.</p>
      </div>
    </aside>`;
}

function renderSidebarExpand() {
  return `<button class="sidebar-expand" type="button" data-sidebar-expand aria-label="Mở danh mục chương"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16"/></svg><span>Mục lục</span></button>`;
}

function renderPageToc(items) {
  return `<nav class="page-toc" aria-label="Mục lục trong chương">
    <strong>Nội dung chương này</strong>
    <ol>${items.map(([id, label], index) => `<li><a href="#${id}"><span>${chapterNo(index + 1)}</span>${label}</a></li>`).join("")}</ol>
  </nav>`;
}

function renderRightSidebar(items) {
  return `<aside class="right-sidebar" id="right-sidebar" data-right-sidebar aria-label="Nội dung chương này">
    <div class="right-sidebar-heading"><strong>Nội dung chương này</strong><button type="button" data-right-sidebar-close aria-label="Thu gọn mục lục trang"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m13 6 6 6-6 6M5 6l6 6-6 6"/></svg></button></div>
    ${renderPageToc(items)}
    <div class="reading-note"><strong>Mẹo tra cứu</strong><p>Nhấn <kbd>Ctrl</kbd> + <kbd>K</kbd> để tìm nhanh một chương trong cẩm nang.</p></div>
  </aside>
  <button class="right-sidebar-expand" type="button" data-right-sidebar-expand aria-label="Mở mục lục trang"><span>Tiện ích</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>`;
}

function renderList(items, className = "check-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderCards(items) {
  return `<div class="grid grid-3">${items.map((item, index) => `
    <article class="card">
      <span class="card-number" aria-hidden="true">${index + 1}</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.text)}</p>
    </article>`).join("")}</div>`;
}

function renderTable(block) {
  const tableClass = block.className ? ` ${esc(block.className)}` : "";
  const caption = block.caption ? `<caption>${esc(block.caption)}</caption>` : "";
  return `<div class="table-wrap${block.wrapClassName ? ` ${esc(block.wrapClassName)}` : ""}">
    <table class="content-table${tableClass}">
      ${caption}
      <thead><tr>${block.headers.map((header) => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead>
      <tbody>${block.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;
}

function renderContentBlock(block) {
  if (block.type === "table") return renderTable(block);
  if (block.type === "callout") {
    const items = block.items?.length ? renderList(block.items, "callout-list") : "";
    return `<div class="callout ${esc(block.tone || "info")}">
      <strong>${esc(block.title)}</strong>
      ${block.text ? `<p>${esc(block.text)}</p>` : ""}
      ${items}
    </div>`;
  }
  throw new Error(`Unsupported content block: ${block.type}`);
}

function renderFeatureSections(sections = []) {
  return sections.map((section) => `<section id="${esc(section.id)}" class="feature-section">
    <h2>${esc(section.title)}</h2>
    ${section.intro ? `<p>${esc(section.intro)}</p>` : ""}
    ${(section.blocks || []).map(renderContentBlock).join("")}
  </section>`).join("");
}

function renderWalkthroughs(items) {
  return items.map((walkthrough, index) => `
    <article class="walkthrough">
      <header class="walkthrough-head">
        <h3>Hướng dẫn ${index + 1}: ${esc(walkthrough.title)}</h3>
        <p>${esc(walkthrough.intro)}</p>
      </header>
      <div class="walkthrough-body">
        <ol class="steps">
          ${walkthrough.steps.map((step) => `<li>${esc(step)}</li>`).join("")}
        </ol>
        <div class="verify-box"><strong>Kết quả cần kiểm chứng:</strong> ${esc(walkthrough.verify)}</div>
      </div>
    </article>`).join("");
}

function renderFigure(figure, rootPrefix = "./") {
  return `<figure class="doc-figure">
    <button class="doc-figure-trigger" type="button" data-image-zoom aria-label="Mở rộng: ${esc(figure.caption)}">
      <img src="${rootPrefix}${esc(figure.src)}" alt="${esc(figure.alt)}" loading="lazy" decoding="async">
    </button>
    <figcaption>${esc(figure.caption)}</figcaption>
  </figure>`;
}

function renderDetailItem(value) {
  const markdownLabel = value.match(/^\*\*(.+?)\*\*\s*(?:—|:|-)?\s*(.*)$/s);
  const dashLabel = value.match(/^([^.!?]{2,70})\s+—\s+(.+)$/s);
  const match = markdownLabel || dashLabel;
  if (!match) return esc(value);
  return `<strong>${esc(match[1])}:</strong>${match[2] ? ` <span>${esc(match[2])}</span>` : ""}`;
}

function renderGuideBody(body) {
  if (!body) return "";
  const parts = body.split(/\s*\(\d+\)\s*/);
  if (parts.length < 2) return `<p>${esc(body)}</p>`;
  const intro = parts.shift().trim();
  return `${intro ? `<p>${esc(intro)}</p>` : ""}<ul class="detail-list">${parts.map((part) => `<li>${renderDetailItem(part.trim())}</li>`).join("")}</ul>`;
}

function renderGuideSections(items, rootPrefix = "./") {
  return items.map((section, sectionIndex) => `<section class="guide-section" id="${esc(section.id)}">
    <h2>${sectionIndex + 1}. ${esc(section.title)}</h2>
    ${section.intro ? `<p>${esc(section.intro)}</p>` : ""}
    ${(section.subsections || []).map((item) => `<section class="guide-subsection" id="${esc(item.id)}">
      <h3>${esc(item.title || item.heading)}</h3>
      ${renderGuideBody(item.body)}
      ${item.items?.length ? `<ul class="feature-list">${item.items.map((entry) => `<li><strong>${esc(entry.label)}:</strong> <span>${esc(entry.text)}</span></li>`).join("")}</ul>` : ""}
      ${item.steps && (item.body || item.items) ? `<h4 class="guide-steps-title">${esc(item.stepsTitle || "Hướng dẫn thực hiện")}</h4>` : ""}
      ${item.steps ? `<ol class="steps">${item.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>` : ""}
      ${item.note ? `<p class="detail-note">${esc(item.note)}</p>` : ""}
      ${item.figures?.length ? `<div class="doc-figure-grid">${item.figures.map((figure) => renderFigure(figure, rootPrefix)).join("")}</div>` : ""}
    </section>`).join("")}
    ${section.figures?.length ? `<div class="doc-figure-grid">${section.figures.map((figure) => renderFigure(figure, rootPrefix)).join("")}</div>` : ""}
  </section>`).join("");
}

function renderFaqs(items) {
  return `<div class="faq-list">${items.map(([question, answer]) => `
    <details class="faq-item">
      <summary>${esc(question)}</summary>
      <div class="faq-answer">${renderGuideBody(answer)}</div>
    </details>`).join("")}</div>`;
}

function renderSources(items, sourceDate, sourceIds) {
  return `<div class="sources">
    <p><strong>Mã nguồn kiểm soát:</strong> ${sourceIds.map((id) => `<code>${esc(id)}</code>`).join(", ")}</p>
    <ol>${items.map(([label, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`).join("")}</ol>
    <p class="source-note">Nguồn của nhà cung cấp hoặc nguồn chuyên môn được truy cập ngày ${esc(sourceDate)}. Liên kết ngoài chỉ được mở khi người dùng chủ động chọn và có kết nối Internet phù hợp.</p>
  </div>`;
}

function renderPager(index) {
  const previous = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;
  return `<nav class="pager" aria-label="Chuyển chương">
    ${previous ? `<a href="./${esc(previous.slug)}"><small>← Chương trước</small><strong>${chapterNo(previous.id)}. ${esc(previous.navTitle)}</strong></a>` : '<a href="../index.html"><small>← Quay lại</small><strong>Trang chủ</strong></a>'}
    ${next ? `<a href="./${esc(next.slug)}"><small>Chương tiếp theo →</small><strong>${chapterNo(next.id)}. ${esc(next.navTitle)}</strong></a>` : '<a href="../index.html"><small>Hoàn tất →</small><strong>Trang chủ</strong></a>'}
  </nav>`;
}

function renderChapter(chapter, index) {
  const statusNoticeClass = chapter.publicDataOnly
    ? "status-notice danger public-data-warning"
    : chapter.kind === "reference"
      ? "status-notice reference"
      : "status-notice";
  const tocItems = chapter.guideSections?.length ? [
    ["muc-tieu", "Mục tiêu"],
    ["dieu-kien", "Điều kiện"],
    ["use-case", "Tình huống sử dụng"],
    ...chapter.guideSections.map((section) => [section.id, section.title]),
    ["huong-dan", "Hướng dẫn"],
    ["kiem-soat", "Kiểm soát"],
    ["faq", "Câu hỏi thường gặp"],
    ["nguon", "Nguồn"]
  ] : (chapter.toc || [
    ["muc-tieu", "Mục tiêu"],
    ["dieu-kien", "Điều kiện"],
    ["use-case", "Tình huống sử dụng"],
    ...(chapter.featureSections || []).map((section) => [section.id, section.title]),
    ["huong-dan", "Hướng dẫn"],
    ["kiem-soat", "Kiểm soát"],
    ["faq", "Câu hỏi thường gặp"],
    ["nguon", "Nguồn"]
  ]);
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${esc(chapter.summary)}">
  <title>${chapterNo(chapter.id)}. ${esc(chapter.navTitle)} | Hướng dẫn NAB</title>
  <link rel="icon" href="../logo/NAB-logo.png" type="image/png">
  <link rel="stylesheet" href="../assets/css/style.css">
  <script src="../assets/js/site.js" defer></script>
</head>
<body>
${renderHeader(true, "../")}
  ${renderSidebarExpand()}
  <div class="site-layout" data-site-layout>
    ${renderSidebar(chapter.slug)}
    <main class="main" id="main-content" tabindex="-1">
      <article class="content-wrap">
        <nav class="breadcrumb" aria-label="Đường dẫn">
          <ol><li><a href="../index.html">Trang chủ</a></li><li>${esc(displayGroup(chapter))}</li><li aria-current="page">${chapterNo(chapter.id)}. ${esc(chapter.navTitle)}</li></ol>
        </nav>
        <header class="chapter-header">
          <div class="chapter-header-accent" aria-hidden="true"></div>
          <p class="eyebrow">${esc(chapter.eyebrow)}</p>
          <h1>${esc(chapter.title)}</h1>
          <p class="lead">${esc(chapter.summary)}</p>
        </header>
        <div class="${statusNoticeClass}">
          <strong>${chapter.kind === "reference" ? "Lưu ý sử dụng" : esc(chapter.statusLabel)}</strong>
          <p>${esc(chapter.statusText)}</p>
        </div>
        <div class="mobile-page-toc">${renderPageToc(tocItems)}</div>

        <section id="muc-tieu">
          <h2>Mục tiêu</h2>
          ${renderList(chapter.objectives)}
        </section>

        <section id="dieu-kien">
          <h2>Điều kiện trước khi dùng</h2>
          ${renderList(chapter.prerequisites)}
        </section>

        <section id="use-case">
          <h2>Tình huống sử dụng và cách chọn phạm vi</h2>
          ${renderCards(chapter.useCases)}
        </section>

        ${renderFeatureSections(chapter.featureSections)}

        ${chapter.guideSections ? renderGuideSections(chapter.guideSections, "../") : ""}

        ${chapter.promptTemplate ? `<section aria-labelledby="prompt-mau"><h2 id="prompt-mau">Prompt mẫu dùng chung</h2><pre class="prompt-template"><span class="prompt-label">Mẫu — thay nội dung trong ngoặc vuông</span>${esc(chapter.promptTemplate)}</pre></section>` : ""}

        <section id="huong-dan">
          <h2>Hướng dẫn từng bước</h2>
          ${renderWalkthroughs(chapter.walkthroughs)}
        </section>

        <section id="kiem-soat">
          <h2>Rủi ro và biện pháp kiểm soát</h2>
          <div class="callout warning"><strong>Nguyên tắc dừng</strong><p>Nếu không xác định được quyền dữ liệu, tính năng được phép, nguồn kiểm chứng hoặc người chịu trách nhiệm cuối, hãy dừng thao tác và liên hệ Khối CNTT/đơn vị kiểm soát.</p></div>
          ${renderList(chapter.controls, "risk-list")}
        </section>

        <section id="faq">
          <h2>Câu hỏi thường gặp</h2>
          <button class="home-link" type="button" data-expand-faq aria-pressed="false">Mở tất cả câu hỏi</button>
          ${renderFaqs(chapter.faqs)}
        </section>

        <section id="nguon">
          <h2>Nguồn chính thức và kiểm chứng</h2>
          ${renderSources(chapter.sources, chapter.sourceDate, sourceIdsByChapter[chapter.id])}
        </section>

        ${renderPager(index)}
      </article>
    </main>
    ${renderRightSidebar(tocItems)}
  </div>
  <div class="sidebar-scrim" data-sidebar-scrim></div>
  <button class="back-to-top" type="button" data-back-to-top aria-label="Quay về đầu trang">↑</button>
</body>
</html>
`;
}

function renderHomeCard(chapter, extraClass = "") {
  const search = `${chapter.navTitle} ${chapter.title} ${chapter.summary} ${displayGroup(chapter)}`;
  return `<a class="card tool-card ${extraClass}" href="./chapters/${esc(chapter.slug)}" data-tool-card data-search="${esc(search)}">
    <div class="meta-row"><span class="tag">Chương ${chapterNo(chapter.id)}</span></div>
    <h3>${esc(chapter.navTitle)}</h3>
    <p>${esc(chapter.summary)}</p>
  </a>`;
}

function renderHome() {
  const ms = chapters.filter((chapter) => chapter.id >= 4 && chapter.id <= 10);
  const quick = chapters.filter((chapter) => chapter.id >= 11 && chapter.id <= 15);
  const foundation = chapters.filter((chapter) => chapter.id <= 3 || chapter.id >= 22);
  const reference = chapters.filter((chapter) => chapter.id >= 16 && chapter.id <= 21);
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Cẩm nang nội bộ NAB về Microsoft 365, Amazon Quick và ứng dụng AI an toàn.">
  <title>Cẩm nang ứng dụng AI và công nghệ trong công việc tại NAB</title>
  <link rel="icon" href="./logo/NAB-logo.png" type="image/png">
  <link rel="stylesheet" href="./assets/css/style.css">
  <script src="./assets/js/site.js" defer></script>
</head>
<body>
${renderHeader(true)}
  ${renderSidebarExpand()}
  <div class="site-layout home-layout" data-site-layout>
  ${renderSidebar(null, "./chapters/")}
  <main class="home-main" id="main-content" tabindex="-1">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-inner">
        <p class="eyebrow">Sáng kiến nội bộ · Khối Công nghệ thông tin</p>
        <h1 id="hero-title">Cẩm nang ứng dụng AI và công nghệ trong công việc tại NAB</h1>
        <p class="lead">Cẩm nang thực hành dành cho Đơn vị kinh doanh, tập trung chuyên sâu vào Microsoft 365 và Amazon Quick — hai nền tảng đang được sử dụng tại NAB.</p>
        <div class="hero-actions">
          <a class="button" href="./chapters/chapter-01-tong-quan.html">Bắt đầu đọc</a>
          <a class="button secondary" href="#cong-cu-trong-tam">Đến công cụ trọng tâm</a>
          <a class="button secondary" href="#vai-tro-cntt">Vai trò Khối CNTT</a>
        </div>
      </div>
    </section>

    <section class="home-section" aria-labelledby="principles-title">
      <div class="section-heading">
        <p class="eyebrow">Trước khi sử dụng</p>
        <h2 id="principles-title">Năm nguyên tắc không được bỏ qua</h2>
      </div>
      <div class="grid grid-3">
        ${[
          ["1", "Đúng công cụ", "Chỉ dùng tài khoản, môi trường tổ chức (tenant) và tính năng được NAB cho phép."],
          ["2", "Đúng dữ liệu", "Phân loại, tối thiểu hóa và không đưa dữ liệu cấm vào công cụ."],
          ["3", "Đúng quyền", "Rà quyền nguồn, người nhận, kết nối và liên kết chia sẻ."],
          ["4", "Có kiểm chứng", "Mở nguồn, đối soát số liệu, logic, thời điểm và giả định."],
          ["5", "Con người chịu trách nhiệm", "AI tạo bản nháp; người dùng và cấp duyệt chịu trách nhiệm cuối."]
        ].map(([num, title, text]) => `<article class="card"><span class="card-number">${num}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}
      </div>
    </section>

    <section class="home-section" id="cong-cu-trong-tam" aria-labelledby="priority-title">
      <div class="section-heading">
        <p class="eyebrow">Đang sử dụng tại NAB</p>
        <h2 id="priority-title">Hai nhóm công cụ trọng tâm</h2>
        <p>Khoảng 70% nội dung tập trung vào Microsoft 365 và Amazon Quick với các tình huống sử dụng thực tế tại NAB.</p>
      </div>
      <div class="grid grid-2">
        <article class="priority-card">
          <span class="priority-icon">M365</span>
          <h3>Microsoft 365</h3>
          <p>Copilot, Teams, Outlook, Word, Excel và PowerPoint cho cộng tác, soạn thảo, phân tích và trình bày.</p>
          <p><a class="button" href="./chapters/chapter-04-ms365-tong-quan.html">Mở hướng dẫn Microsoft 365</a></p>
        </article>
        <article class="priority-card quick">
          <span class="priority-icon">AQ</span>
          <h3>Amazon Quick</h3>
          <p>Tổng quan và giao diện, Spaces và Chat Agents, Dữ liệu/Analyses/Dashboards, Scenarios/Quick Research, Quick Flows &amp; Automate.</p>
          <p><a class="button" href="./chapters/chapter-11-amazon-quick-tong-quan.html">Mở hướng dẫn Amazon Quick</a></p>
        </article>
      </div>
    </section>

    <section class="home-section" aria-labelledby="all-title">
      <div class="section-heading">
        <p class="eyebrow">Danh mục đầy đủ</p>
        <h2 id="all-title">Tra cứu 23 chương</h2>
        <p>Tìm theo tên công cụ hoặc nhu cầu. Ô tìm kiếm chỉ lọc nội dung đã có trong trang và không gửi dữ liệu ra ngoài.</p>
      </div>
      <div class="filter-bar"><label><span class="sr-only">Tìm chương</span><input type="search" data-tool-filter placeholder="Ví dụ: Excel, dashboard, dữ liệu, FAQ" aria-label="Tìm trong danh mục chương"></label></div>
      <div class="empty-state" data-empty-state role="status">Không tìm thấy chương phù hợp. Hãy thử từ khóa ngắn hơn.</div>

      <h3>AI trong công việc</h3>
      <div class="grid grid-3">${foundation.filter((chapter) => chapter.id <= 3).map((chapter) => renderHomeCard(chapter)).join("")}</div>
      <h3>Microsoft 365</h3>
      <div class="grid grid-3">${ms.map((chapter) => renderHomeCard(chapter)).join("")}</div>
      <h3>Amazon Quick</h3>
      <div class="grid grid-3">${quick.map((chapter) => renderHomeCard(chapter)).join("")}</div>
      <h3>AI phổ biến</h3>
      <div class="callout danger public-data-warning"><strong>Lưu ý bắt buộc</strong><p>Chỉ sử dụng công cụ AI tham khảo với dữ liệu công khai. Không sử dụng dữ liệu của Nam A Bank, dữ liệu khách hàng hoặc bất kỳ dữ liệu nội bộ nào.</p></div>
      <div class="grid grid-3">${reference.map((chapter) => renderHomeCard(chapter)).join("")}</div>
      <h3>Phụ lục</h3>
      <div class="grid grid-3">${foundation.filter((chapter) => chapter.id >= 22).map((chapter) => renderHomeCard(chapter)).join("")}</div>
    </section>

    <section class="home-section" id="vai-tro-cntt" aria-labelledby="it-title">
      <div class="grid grid-2">
        <div class="section-heading">
          <p class="eyebrow">Vai trò Khối CNTT</p>
          <h2 id="it-title">Đồng hành từ nhu cầu đến vận hành</h2>
          <p>Khối CNTT tư vấn lựa chọn công cụ, cấp quyền, đánh giá tích hợp, cấu hình kiểm soát, hỗ trợ đào tạo và xử lý sự cố. ĐVKD chịu trách nhiệm mục tiêu, dữ liệu, tính đúng nghiệp vụ và quyết định cuối.</p>
        </div>
        <div class="card">
          <h3>Chuẩn bị yêu cầu hỗ trợ</h3>
          <ul class="check-list"><li>Mục tiêu và kết quả mong muốn</li><li>Nhóm người dùng và chủ sở hữu dữ liệu</li><li>Loại dữ liệu, nguồn và đích</li><li>Hành động đọc, ghi, chia sẻ hoặc lên lịch</li><li>KPI thành công và người phê duyệt</li></ul>
          <p><a class="button" href="./chapters/chapter-01-tong-quan.html">Xem hướng dẫn phối hợp</a></p>
        </div>
      </div>
    </section>
  </main>
  </div>
  <div class="sidebar-scrim" data-sidebar-scrim></div>
  <button class="back-to-top" type="button" data-back-to-top aria-label="Quay về đầu trang">↑</button>
</body>
</html>
`;
}

assertContent();
fs.mkdirSync(chaptersDir, { recursive: true });
const expectedChapterFiles = new Set(chapters.map((chapter) => chapter.slug));
for (const filename of fs.readdirSync(chaptersDir)) {
  if (/^chapter-\d{2}-.*\.html$/.test(filename) && !expectedChapterFiles.has(filename)) {
    fs.unlinkSync(path.join(chaptersDir, filename));
  }
}
chapters.forEach((chapter, index) => {
  fs.writeFileSync(path.join(chaptersDir, chapter.slug), cleanOutput(renderChapter(chapter, index)), "utf8");
});
fs.writeFileSync(path.join(root, "index.html"), cleanOutput(renderHome()), "utf8");
process.stdout.write(`Generated index.html and ${chapters.length} chapter pages.\n`);
