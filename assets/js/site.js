(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var menuButton = document.querySelector("[data-menu-button]");
  var sidebar = document.querySelector("[data-sidebar]");
  var layout = document.querySelector("[data-site-layout]");
  var scrim = document.querySelector("[data-sidebar-scrim]");
  var sidebarClose = document.querySelector("[data-sidebar-close]");
  var sidebarExpand = document.querySelector("[data-sidebar-expand]");
  var rightSidebarClose = document.querySelector("[data-right-sidebar-close]");
  var rightSidebarExpand = document.querySelector("[data-right-sidebar-expand]");
  var backToTop = document.querySelector("[data-back-to-top]");
  var scrollContainer = document.querySelector(".main, .home-main");
  var portalSearch = document.querySelector("[data-portal-search]");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
  var navEmpty = document.querySelector("[data-nav-empty]");
  var filterInput = document.querySelector("[data-tool-filter]");
  var toolCards = Array.prototype.slice.call(document.querySelectorAll("[data-tool-card]"));
  var emptyState = document.querySelector("[data-empty-state]");

  function isMobile() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  function setMobileMenu(open) {
    if (!sidebar) return;
    sidebar.classList.toggle("open", open);
    if (scrim) scrim.classList.toggle("visible", open);
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Đóng danh mục chương" : "Mở danh mục chương");
    }
    document.body.style.overflow = open && isMobile() ? "hidden" : "";
  }

  if (menuButton && sidebar) {
    menuButton.addEventListener("click", function () {
      setMobileMenu(!sidebar.classList.contains("open"));
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setMobileMenu(false); });

  if (sidebarClose && layout) {
    sidebarClose.addEventListener("click", function () {
      if (isMobile()) setMobileMenu(false);
      else layout.classList.add("left-collapsed");
    });
  }
  if (sidebarExpand && layout) {
    sidebarExpand.addEventListener("click", function () {
      layout.classList.remove("left-collapsed");
    });
  }
  if (rightSidebarClose && layout) {
    rightSidebarClose.addEventListener("click", function () {
      layout.classList.add("right-collapsed");
    });
  }
  if (rightSidebarExpand && layout) {
    rightSidebarExpand.addEventListener("click", function () {
      layout.classList.remove("right-collapsed");
    });
  }

  document.querySelectorAll("[data-accordion-button]").forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
    });
  });

  if (sidebar) {
    sidebar.addEventListener("click", function (event) {
      if (event.target.closest("a") && isMobile()) setMobileMenu(false);
    });
    var currentNavLink = sidebar.querySelector('[aria-current="page"]');
    if (currentNavLink) {
      window.setTimeout(function () {
        currentNavLink.scrollIntoView({ block: "center" });
      }, 0);
    }
  }

  function normalize(value) {
    return String(value || "").trim().toLocaleLowerCase("vi");
  }

  function filterNavigation(query) {
    var normalized = normalize(query);
    var visible = 0;
    navLinks.forEach(function (link) {
      var matches = !normalized || normalize(link.getAttribute("data-search") || link.textContent).indexOf(normalized) !== -1;
      link.closest("li").hidden = !matches;
      if (matches) visible += 1;
    });
    document.querySelectorAll(".nav-group").forEach(function (group) {
      var hasMatch = Boolean(group.querySelector("li:not([hidden])"));
      group.hidden = !hasMatch;
      if (normalized && hasMatch) {
        var toggle = group.querySelector("[data-accordion-button]");
        if (toggle) toggle.setAttribute("aria-expanded", "true");
      }
    });
    if (navEmpty) navEmpty.style.display = visible ? "none" : "block";
    return navLinks.find(function (link) { return !link.closest("li").hidden; });
  }

  if (portalSearch) {
    portalSearch.addEventListener("input", function () {
      filterNavigation(portalSearch.value);
      if (portalSearch.value && isMobile()) setMobileMenu(true);
    });
    portalSearch.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        var firstMatch = filterNavigation(portalSearch.value);
        if (firstMatch && portalSearch.value.trim()) window.location.href = firstMatch.href;
      }
      if (event.key === "Escape") {
        portalSearch.value = "";
        filterNavigation("");
        portalSearch.blur();
      }
    });
    document.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        portalSearch.focus();
        portalSearch.select();
      }
    });
  }

  function getScrollTop() {
    if (isMobile() || !scrollContainer) return window.scrollY;
    return scrollContainer.scrollTop;
  }

  if (backToTop) {
    var updateBackToTop = function () {
      backToTop.classList.toggle("visible", getScrollTop() > 600);
    };
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    if (scrollContainer) scrollContainer.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener("click", function () {
      var target = isMobile() || !scrollContainer ? window : scrollContainer;
      target.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (filterInput && toolCards.length) {
    filterInput.addEventListener("input", function () {
      var query = normalize(filterInput.value);
      var visible = 0;
      toolCards.forEach(function (card) {
        var matches = !query || normalize(card.getAttribute("data-search") || card.textContent).indexOf(query) !== -1;
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      if (emptyState) emptyState.style.display = visible ? "none" : "block";
    });
  }

  document.querySelectorAll("[data-expand-faq]").forEach(function (button) {
    button.addEventListener("click", function () {
      var section = button.closest("section") || document;
      var items = section.querySelectorAll(".faq-item");
      var shouldOpen = button.getAttribute("aria-pressed") !== "true";
      items.forEach(function (item) { item.open = shouldOpen; });
      button.setAttribute("aria-pressed", String(shouldOpen));
      button.textContent = shouldOpen ? "Thu gọn tất cả" : "Mở tất cả FAQ";
    });
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) setMobileMenu(false);
  });
})();
