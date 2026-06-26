(function () {
  "use strict";
  var toggle = document.getElementById("navToggle"),
    links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      }
    });
  }
  document.querySelectorAll(".faq__item").forEach(function (item) {
    var q = item.querySelector(".faq__q"),
      a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(isOpen));
      a.style.maxHeight = isOpen ? a.scrollHeight + "px" : "0";
    });
  });
  var reveals = document.querySelectorAll(".reveal, .thread");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }
  var compare = document.getElementById("baCompare"),
    before = document.getElementById("baBefore"),
    handle = document.getElementById("baHandle");
  if (compare && before && handle) {
    var drag = false;
    function setPos(cx) {
      var r = compare.getBoundingClientRect();
      var p = Math.max(0, Math.min(100, ((cx - r.left) / r.width) * 100));
      before.style.clipPath = "inset(0 " + (100 - p) + "% 0 0)";
      handle.style.left = p + "%";
      compare.setAttribute("aria-valuenow", String(Math.round(p)));
    }
    compare.addEventListener("mousedown", function (e) {
      drag = true;
      setPos(e.clientX);
    });
    compare.addEventListener(
      "touchstart",
      function (e) {
        drag = true;
        setPos(e.touches[0].clientX);
      },
      { passive: true },
    );
    window.addEventListener("mousemove", function (e) {
      if (drag) setPos(e.clientX);
    });
    window.addEventListener(
      "touchmove",
      function (e) {
        if (drag) setPos(e.touches[0].clientX);
      },
      { passive: true },
    );
    window.addEventListener("mouseup", function () {
      drag = false;
    });
    window.addEventListener("touchend", function () {
      drag = false;
    });
    compare.addEventListener("keydown", function (e) {
      var n = Number(compare.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") n -= 5;
      else if (e.key === "ArrowRight") n += 5;
      else return;
      n = Math.max(0, Math.min(100, n));
      before.style.clipPath = "inset(0 " + (100 - n) + "% 0 0)";
      handle.style.left = n + "%";
      compare.setAttribute("aria-valuenow", String(n));
      e.preventDefault();
    });
  }
})();
