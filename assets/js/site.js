(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var menuButton = document.querySelector("[data-menu-button]");
  var sidebar = document.querySelector("[data-sidebar]");
  var backToTop = document.querySelector("[data-back-to-top]");
  var filterInput = document.querySelector("[data-tool-filter]");
  var toolCards = Array.prototype.slice.call(document.querySelectorAll("[data-tool-card]"));
  var emptyState = document.querySelector("[data-empty-state]");

  if (menuButton && sidebar) {
    menuButton.addEventListener("click", function () {
      var isOpen = sidebar.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Đóng danh mục chương" : "Mở danh mục chương");
    });

    sidebar.addEventListener("click", function (event) {
      if (event.target.closest("a") && window.matchMedia("(max-width: 820px)").matches) {
        sidebar.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (backToTop) {
    var updateBackToTop = function () {
      backToTop.classList.toggle("visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (filterInput && toolCards.length) {
    filterInput.addEventListener("input", function () {
      var query = filterInput.value.trim().toLocaleLowerCase("vi");
      var visible = 0;

      toolCards.forEach(function (card) {
        var haystack = (card.getAttribute("data-search") || card.textContent).toLocaleLowerCase("vi");
        var matches = !query || haystack.indexOf(query) !== -1;
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      if (emptyState) emptyState.style.display = visible ? "none" : "block";
    });
  }

  document.querySelectorAll("[data-expand-faq]").forEach(function (button) {
    button.addEventListener("click", function () {
      var items = document.querySelectorAll(".faq-item");
      var shouldOpen = button.getAttribute("aria-pressed") !== "true";
      items.forEach(function (item) { item.open = shouldOpen; });
      button.setAttribute("aria-pressed", String(shouldOpen));
      button.textContent = shouldOpen ? "Thu gọn tất cả" : "Mở tất cả FAQ";
    });
  });
})();
