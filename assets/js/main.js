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

    // Galeria: miniaturas trocam o caso exibido no slider
    var beforeImg = document.getElementById("baBeforeImg"),
      afterImg = document.getElementById("baAfterImg"),
      caption = document.getElementById("baCaption"),
      thumbs = document.querySelectorAll("#baThumbs .ba__thumb");
    if (beforeImg && afterImg && thumbs.length) {
      thumbs.forEach(function (thumb) {
        thumb.addEventListener("click", function () {
          beforeImg.src = thumb.getAttribute("data-before");
          afterImg.src = thumb.getAttribute("data-after");
          var label = thumb.getAttribute("data-label");
          if (caption && label) caption.textContent = label;
          thumbs.forEach(function (t) {
            t.classList.remove("is-active");
            t.setAttribute("aria-selected", "false");
          });
          thumb.classList.add("is-active");
          thumb.setAttribute("aria-selected", "true");
          // volta o slider ao centro a cada novo caso
          before.style.clipPath = "inset(0 50% 0 0)";
          handle.style.left = "50%";
          compare.setAttribute("aria-valuenow", "50");
        });
      });
    }
  }

  // Galeria por sessão: menu filtra as fotos por procedimento
  var galleryMenu = document.getElementById("galleryMenu"),
    galleryItems = document.querySelectorAll("#galleryGrid .gallery__item");
  if (galleryMenu && galleryItems.length) {
    var tabs = galleryMenu.querySelectorAll(".gallery__tab");
    function hideAll() {
      galleryItems.forEach(function (item) {
        item.classList.add("is-hidden");
      });
    }
    function showCat(cat) {
      galleryItems.forEach(function (item) {
        item.classList.toggle("is-hidden", item.getAttribute("data-cat") !== cat);
      });
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var wasActive = tab.classList.contains("is-active");
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        if (wasActive) {
          // clicar na sessão aberta recolhe a galeria
          hideAll();
        } else {
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          showCat(tab.getAttribute("data-cat"));
        }
      });
    });
    // estado inicial: galeria fechada, só o menu aparece
    hideAll();
  }

  // Lightbox: clique numa foto da galeria abre em tela cheia
  var lightbox = document.getElementById("lightbox"),
    lightboxImg = document.getElementById("lightboxImg"),
    lightboxClose = document.getElementById("lightboxClose"),
    galleryImgs = document.querySelectorAll("#galleryGrid .gallery__item img");
  if (lightbox && lightboxImg && galleryImgs.length) {
    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      document.body.style.overflow = "";
    }
    galleryImgs.forEach(function (img) {
      img.addEventListener("click", function () {
        openLightbox(img.src, img.alt);
      });
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target !== lightboxImg) closeLightbox();
    });
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open"))
        closeLightbox();
    });
  }
})();
