/*
 * Chạy TRONG trình duyệt (addInitScript, chỉ frame chính).
 * window.__captureOverlay:
 *   - annotate(rect, number, label): khung đỏ + số bước ①②③ quanh phần tử cần bấm
 *   - banner(text, opts): chú thích lớn trên ảnh / phụ đề trong video
 *   - clear(): gỡ toàn bộ chú thích
 *   - cursor: con trỏ giả + hiệu ứng click (hiện trong video headless)
 */
(function () {
  "use strict";
  if (window.top !== window.self) return;
  if (window.__captureOverlayInstalled) return;
  window.__captureOverlayInstalled = true;

  var Z = 2147483646;
  var RED = "#E11D48";
  var CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳"];
  var ATTR = "data-capture-overlay";

  function el(tag, style, text) {
    var node = document.createElement(tag);
    node.setAttribute(ATTR, "");
    node.setAttribute("aria-hidden", "true");
    node.setAttribute("data-capture-mask-overlay", "");
    Object.assign(node.style, style);
    if (text) node.textContent = text;
    (document.body || document.documentElement).appendChild(node);
    return node;
  }

  function viewportBounds(bounds) {
    return bounds || { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
  }

  function annotate(rect, number, label, bounds) {
    var pad = 6;
    el("div", {
      position: "fixed",
      left: rect.x - pad + "px",
      top: rect.y - pad + "px",
      width: rect.width + pad * 2 + "px",
      height: rect.height + pad * 2 + "px",
      border: "4px solid " + RED,
      borderRadius: "10px",
      boxShadow: "0 0 0 4px rgba(225,29,72,.25)",
      pointerEvents: "none",
      zIndex: String(Z),
      boxSizing: "border-box",
    });
    var badgeSize = number ? 40 : 0;
    // Đặt huy hiệu bên trái, ngoài khung, căn giữa theo chiều dọc; thiếu chỗ thì đặt trên-trái.
    var bx = rect.x - pad - badgeSize - 10;
    var by = rect.y + rect.height / 2 - badgeSize / 2;
    if (bx < 4) {
      bx = rect.x - pad;
      by = rect.y - pad - badgeSize - 8;
    }
    if (number) el("div", {
      position: "fixed",
      left: Math.max(4, bx) + "px",
      top: Math.max(4, by) + "px",
      width: badgeSize + "px",
      height: badgeSize + "px",
      borderRadius: "50%",
      background: RED,
      color: "#fff",
      font: "700 26px/40px Inter, Segoe UI, Arial, sans-serif",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,.35)",
      pointerEvents: "none",
      zIndex: String(Z),
    }, number ? CIRCLED[number - 1] || String(number) : "");
    if (label) placeLabel(rect, pad, label, viewportBounds(bounds));
  }

  var INTERACTIVE = "button, a[href], input, select, textarea, [role=button], [role=option], [role=listbox], [role=combobox], [role=menuitem], [role=tab], [role=link], [role=menu], [role=dialog], [role=tooltip]";

  function intersects(a, b) {
    return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  }

  /** Vùng các phần tử bấm được đang hiện (trừ chính phần tử được khoanh và chú thích). */
  function obstacles(target) {
    var out = [];
    var nodes = document.querySelectorAll(INTERACTIVE);
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.closest("[" + ATTR + "]")) continue;
      var r = node.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      var style = window.getComputedStyle(node);
      if (style.visibility === "hidden" || style.display === "none") continue;
      // bỏ phần tử nằm trong/chứa vùng được khoanh (chính nó, wrapper của nó)
      var inside = r.left >= target.left - 1 && r.right <= target.right + 1 && r.top >= target.top - 1 && r.bottom <= target.bottom + 1;
      var contains = r.left <= target.left && r.right >= target.right && r.top <= target.top && r.bottom >= target.bottom;
      if (inside || contains) continue;
      out.push(r);
    }
    return out;
  }

  /** Nhãn: ưu tiên dưới, rồi trên, phải, trái — chọn chỗ không che phần tử bấm được và nằm trong khung hình. */
  function placeLabel(rect, pad, label, area) {
    var node = el("div", {
      position: "fixed",
      left: "0px",
      top: "0px",
      maxWidth: "600px",
      padding: "10px 16px",
      background: RED,
      color: "#fff",
      font: "600 22px/1.3 Inter, Segoe UI, Arial, sans-serif",
      borderRadius: "8px",
      boxShadow: "0 4px 14px rgba(0,0,0,.3)",
      pointerEvents: "none",
      zIndex: String(Z),
      boxSizing: "border-box",
    }, label);
    var w = node.offsetWidth;
    var h = node.offsetHeight;
    var gap = 12;
    var target = { left: rect.x - pad, top: rect.y - pad, right: rect.x + rect.width + pad, bottom: rect.y + rect.height + pad };
    var clampX = function (x) { return Math.max(area.x + 8, Math.min(x, area.x + area.width - w - 8)); };
    var blockers = obstacles(target);
    var fits = function (c) { return c.x >= area.x + 4 && c.y >= area.y + 4 && c.x + w <= area.x + area.width - 4 && c.y + h <= area.y + area.height - 4; };
    var box = function (c) { return { left: c.x, top: c.y, right: c.x + w, bottom: c.y + h }; };
    var overlapArea = function (c) {
      var b = box(c);
      var total = 0;
      var list = blockers.concat([target]);
      for (var i = 0; i < list.length; i++) {
        var r = list[i];
        var ox = Math.min(b.right, r.right) - Math.max(b.left, r.left);
        var oy = Math.min(b.bottom, r.bottom) - Math.max(b.top, r.top);
        if (ox > 0 && oy > 0) total += ox * oy * (r === target ? 4 : 1);
      }
      return total;
    };
    // Khoảng cách từ nhãn tới vùng được khoanh (0 nếu chạm)
    var distance = function (c) {
      var b = box(c);
      var dx = Math.max(target.left - b.right, b.left - target.right, 0);
      var dy = Math.max(target.top - b.bottom, b.top - target.bottom, 0);
      return Math.sqrt(dx * dx + dy * dy);
    };
    var midY = rect.y + rect.height / 2 - h / 2;
    var candidates = [];
    var step = 8;
    // dưới / trên, căn trái theo vùng khoanh; dò xa dần
    for (var y = target.bottom + gap; y + h <= area.y + area.height; y += step) candidates.push({ x: clampX(target.left), y: y, pref: 0 });
    for (var y2 = target.top - gap - h; y2 >= area.y; y2 -= step) candidates.push({ x: clampX(target.left), y: y2, pref: 1 });
    // phải / trái, dò lên xuống quanh giữa
    for (var d = 0; d <= 400; d += step) {
      [midY + d, midY - d].forEach(function (yy) {
        candidates.push({ x: target.right + gap, y: yy, pref: 2 });
        candidates.push({ x: target.left - gap - w, y: yy, pref: 3 });
      });
    }
    var chosen = null;
    var best = Infinity;
    for (var i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (!fits(c) || overlapArea(c) > 0) continue;
      var score = distance(c) + c.pref;
      if (score < best) { best = score; chosen = c; }
    }
    if (!chosen) {
      // không có chỗ trống: chọn chỗ che ít nhất
      var least = Infinity;
      for (var j = 0; j < candidates.length; j++) {
        if (!fits(candidates[j])) continue;
        var a = overlapArea(candidates[j]);
        if (a < least) { least = a; chosen = candidates[j]; }
      }
    }
    if (!chosen) chosen = { x: clampX(target.left), y: target.bottom + gap };
    node.style.left = Math.max(area.x + 4, chosen.x) + "px";
    node.style.top = Math.max(area.y + 4, chosen.y) + "px";
  }

  function banner(text, opts) {
    opts = opts || {};
    var area = viewportBounds(opts.bounds);
    var position = opts.position || "bottom";
    var style = {
      position: "fixed",
      left: area.x + "px",
      right: (window.innerWidth - area.x - area.width) + "px",
      margin: "0 auto",
      width: "fit-content",
      maxWidth: (area.width - 32) + "px",
      boxSizing: "border-box",
      overflowWrap: "anywhere",
      padding: "18px 28px",
      background: opts.tone === "danger" ? "rgba(159,18,57,.94)" : "rgba(15,23,42,.88)",
      color: "#fff",
      font: "600 30px/1.35 Inter, Segoe UI, Arial, sans-serif",
      textAlign: "center",
      borderRadius: "12px",
      boxShadow: "0 6px 24px rgba(0,0,0,.35)",
      pointerEvents: "none",
      zIndex: String(Z),
    };
    if (position === "top") style.top = area.y + 48 + "px";
    else style.bottom = (window.innerHeight - area.y - area.height) + 48 + "px";
    var node = el("div", style, text);
    // Chuỗi không có khoảng trắng (URL): thu nhỏ chữ để nằm trên 1 dòng, tránh ngắt ở dấu "-" gây đọc sai.
    if (!/\s/.test(text.trim())) {
      node.style.whiteSpace = "nowrap";
      for (var size = 30; size > 16 && node.scrollWidth > node.clientWidth; size -= 1) {
        node.style.fontSize = size - 1 + "px";
      }
      if (node.scrollWidth > node.clientWidth) node.style.whiteSpace = "normal";
    }
  }

  function clear() {
    var nodes = document.querySelectorAll("[" + ATTR + "]:not([data-capture-cursor])");
    for (var i = 0; i < nodes.length; i++) nodes[i].remove();
  }

  // ----- Con trỏ chuột giả -----
  var cursor = null;
  function ensureCursor() {
    if (cursor && cursor.isConnected) return cursor;
    cursor = el("div", {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "28px",
      height: "28px",
      marginLeft: "-4px",
      marginTop: "-2px",
      pointerEvents: "none",
      zIndex: String(Z + 1),
      transition: "transform .08s ease-out",
      display: "none",
    });
    cursor.setAttribute("data-capture-cursor", "");
    cursor.innerHTML =
      '<svg width="28" height="28" viewBox="0 0 24 24"><path d="M4 2l15 11.5-6.6.9 3.9 7.3-2.6 1.3-3.8-7.4L4 20z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    return cursor;
  }
  function ripple(x, y) {
    var r = el("div", {
      position: "fixed",
      left: x - 22 + "px",
      top: y - 22 + "px",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      border: "3px solid " + RED,
      background: "rgba(225,29,72,.25)",
      pointerEvents: "none",
      zIndex: String(Z),
      transform: "scale(.4)",
      opacity: "1",
      transition: "transform .45s ease-out, opacity .45s ease-out",
    });
    r.setAttribute("data-capture-cursor", "");
    requestAnimationFrame(function () {
      r.style.transform = "scale(1.4)";
      r.style.opacity = "0";
    });
    setTimeout(function () { r.remove(); }, 600);
  }
  var cursorEnabled = false;
  window.addEventListener("mousemove", function (e) {
    if (!cursorEnabled) return;
    var c = ensureCursor();
    c.style.display = "block";
    c.style.left = e.clientX + "px";
    c.style.top = e.clientY + "px";
  }, true);
  window.addEventListener("mousedown", function (e) {
    if (!cursorEnabled) return;
    ensureCursor().style.transform = "scale(.85)";
    ripple(e.clientX, e.clientY);
  }, true);
  window.addEventListener("mouseup", function () {
    if (cursor) cursor.style.transform = "scale(1)";
  }, true);

  window.__captureOverlay = {
    annotate: annotate,
    banner: banner,
    clear: clear,
    enableCursor: function (on) {
      cursorEnabled = on !== false;
      if (!cursorEnabled && cursor) cursor.style.display = "none";
    },
    hideCursor: function () { if (cursor) cursor.style.display = "none"; },
    showCursor: function () { if (cursor && cursorEnabled) cursor.style.display = "block"; },
  };
})();
