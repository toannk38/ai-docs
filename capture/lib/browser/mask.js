/*
 * Chạy TRONG trình duyệt (addInitScript) ở mọi frame.
 * Thay chuỗi POC/nhạy cảm bằng giá trị LIVE/minh hoạ trên giao diện — chỉ để hiển thị.
 * - Text node, document.title, thuộc tính title/placeholder/aria-label/alt: thay trực tiếp.
 * - Ô input/textarea: KHÔNG đổi value thật (form vẫn gửi giá trị POC); phủ một lớp chữ
 *   hiển thị giá trị đã che, chữ thật của ô được làm trong suốt.
 * Cấu hình được tiêm trước file này: window.__CAPTURE_MASK__ = { rules: [...], sensitive: [...] }
 *   rules: [{ find: string, flags?: string, regex?: boolean, replace: string }]
 *   sensitive: [{ real: string, display: string }]  // dùng cho ô đang gõ dở (tiền tố)
 */
(function () {
  "use strict";
  if (window.__captureMaskInstalled) return;
  window.__captureMaskInstalled = true;

  var cfg = window.__CAPTURE_MASK__ || { rules: [], sensitive: [] };
  var rules = (cfg.rules || []).map(function (rule) {
    var source = rule.regex ? rule.find : rule.find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return { re: new RegExp(source, rule.flags || "gi"), replace: rule.replace };
  });
  var sensitive = cfg.sensitive || [];
  var ATTRS = ["title", "placeholder", "aria-label", "alt", "data-tooltip"];
  var OVERLAY_ATTR = "data-capture-mask-overlay";

  function maskString(value) {
    if (!value) return value;
    var out = value;
    for (var i = 0; i < rules.length; i++) {
      rules[i].re.lastIndex = 0;
      out = out.replace(rules[i].re, rules[i].replace);
    }
    return out;
  }

  /** Giá trị hiển thị cho ô input: xử lý cả trường hợp đang gõ dở một chuỗi nhạy cảm. */
  function displayValueFor(input) {
    var value = input.value || "";
    if (!value) return null;
    if (input.hasAttribute("data-capture-no-mask")) return null;
    var real = input.getAttribute("data-capture-mask-real");
    var display = input.getAttribute("data-capture-mask-display");
    var pairs = real && display ? [{ real: real, display: display }].concat(sensitive) : sensitive;
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      if (!pair.real) continue;
      var lower = value.toLowerCase();
      var realLower = pair.real.toLowerCase();
      var isMarked = real && pair.real === real;
      if (realLower.indexOf(lower) === 0 && (isMarked || value.length >= 3)) {
        var n = Math.max(1, Math.round((value.length / pair.real.length) * pair.display.length));
        return pair.display.slice(0, n);
      }
    }
    var masked = maskString(value);
    return masked !== value ? masked : null;
  }

  function maskTextNode(node) {
    var original = node.nodeValue;
    var masked = maskString(original);
    if (masked !== original) node.nodeValue = masked;
  }

  function maskElementAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute && el.getAttribute(ATTRS[i]);
      if (v) {
        var m = maskString(v);
        if (m !== v) el.setAttribute(ATTRS[i], m);
      }
    }
  }

  /** Ẩn mục quản trị (tài khoản test là admin; người dùng thường không thấy các mục này). */
  var ADMIN_TEXT = /^\s*Manage account\s*$/i;
  function hideAdmin(el) {
    if (!el || el.nodeType !== 1 || el.childElementCount > 0) return;
    if (!ADMIN_TEXT.test(el.textContent || "")) return;
    var target = el.closest('[role="menuitem"], li, a, button') || el;
    target.style.setProperty("display", "none", "important");
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { maskTextNode(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) {
      if (root.hasAttribute(OVERLAY_ATTR)) return;
      maskElementAttrs(root);
      hideAdmin(root);
      if (root.shadowRoot) { walk(root.shadowRoot); observe(root.shadowRoot); }
    }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var node = walker.nextNode();
    while (node) {
      if (node.nodeType === 3) maskTextNode(node);
      else {
        maskElementAttrs(node);
        hideAdmin(node);
        if (node.shadowRoot) { walk(node.shadowRoot); observe(node.shadowRoot); }
      }
      node = walker.nextNode();
    }
  }

  var observed = typeof WeakSet !== "undefined" ? new WeakSet() : null;
  function observe(root) {
    if (!root || (observed && observed.has(root))) return;
    if (observed) observed.add(root);
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === "characterData") maskTextNode(m.target);
        else if (m.type === "attributes") maskElementAttrs(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
      }
      if (document.title) {
        var t = maskString(document.title);
        if (t !== document.title) document.title = t;
      }
    }).observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  // ----- Lớp phủ cho ô input -----
  var overlays = new Map();
  function syncInputs() {
    var inputs = document.querySelectorAll("input:not([type=password]):not([type=hidden]), textarea");
    var seen = new Set();
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var display = displayValueFor(input);
      var rect = input.getBoundingClientRect();
      if (display === null || rect.width === 0 || rect.height === 0) continue;
      seen.add(input);
      var overlay = overlays.get(input);
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.setAttribute(OVERLAY_ATTR, "");
        overlay.setAttribute("aria-hidden", "true");
        document.documentElement.appendChild(overlay);
        overlays.set(input, overlay);
        input.style.setProperty("color", "transparent", "important");
        input.style.setProperty("-webkit-text-fill-color", "transparent", "important");
      }
      var cs = getComputedStyle(input);
      var s = overlay.style;
      s.position = "fixed";
      s.left = rect.left + "px";
      s.top = rect.top + "px";
      s.width = rect.width + "px";
      s.height = rect.height + "px";
      s.boxSizing = "border-box";
      s.paddingLeft = cs.paddingLeft;
      s.paddingRight = cs.paddingRight;
      s.paddingTop = cs.paddingTop;
      s.paddingBottom = cs.paddingBottom;
      s.borderLeft = cs.borderLeftWidth + " solid transparent";
      s.font = cs.font;
      s.letterSpacing = cs.letterSpacing;
      s.color = "rgb(22, 25, 31)";
      s.display = "flex";
      s.alignItems = input.tagName === "TEXTAREA" ? "flex-start" : "center";
      s.whiteSpace = "pre";
      s.overflow = "hidden";
      s.pointerEvents = "none";
      s.zIndex = "2147483600";
      overlay.textContent = display;
    }
    overlays.forEach(function (overlay, input) {
      if (!seen.has(input)) {
        overlay.remove();
        overlays.delete(input);
        input.style.removeProperty("color");
        input.style.removeProperty("-webkit-text-fill-color");
      }
    });
  }
  function loop() {
    try { syncInputs(); } catch (e) { /* bỏ qua */ }
    window.requestAnimationFrame(loop);
  }

  function start() {
    walk(document.documentElement);
    observe(document.documentElement);
    if (document.title) document.title = maskString(document.title);
    loop();
  }

  window.__captureMask = {
    maskString: maskString,
    rescan: function () { walk(document.documentElement); syncInputs(); },
    /** Thêm luật che lúc chạy (vd tên hiển thị của tài khoản test) rồi quét lại trang. */
    addRules: function (extra) {
      for (var i = 0; i < extra.length; i++) {
        var r = extra[i];
        var src = r.regex ? r.find : r.find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        rules.push({ re: new RegExp(src, r.flags || "gi"), replace: r.replace });
      }
      walk(document.documentElement);
      syncInputs();
    },
    /** Đánh dấu ô sắp gõ chuỗi nhạy cảm để hiển thị tiền tố tương ứng của giá trị LIVE. */
    markInput: function (selectorOrEl, real, display) {
      var el = typeof selectorOrEl === "string" ? document.querySelector(selectorOrEl) : selectorOrEl;
      if (!el) return false;
      el.setAttribute("data-capture-mask-real", real);
      el.setAttribute("data-capture-mask-display", display);
      return true;
    },
    /** Danh sách chuỗi nhạy cảm còn hiển thị (text + input không có lớp phủ). */
    findLeaks: function (needles) {
      var found = [];
      var text = (document.body ? document.body.innerText : "") + "\n" + document.title;
      var inputs = document.querySelectorAll("input:not([type=password]):not([type=hidden]), textarea");
      for (var i = 0; i < inputs.length; i++) {
        if (!overlays.has(inputs[i]) && inputs[i].value) text += "\n" + inputs[i].value;
      }
      var lower = text.toLowerCase();
      for (var j = 0; j < needles.length; j++) {
        var nd = needles[j];
        if (nd.regex) {
          if (new RegExp(nd.regex, "i").test(text)) found.push(nd.label);
        } else if (nd.value && lower.indexOf(nd.value.toLowerCase()) !== -1) found.push(nd.label);
      }
      return found;
    },
  };

  if (document.documentElement) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
