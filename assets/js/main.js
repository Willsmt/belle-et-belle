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
  document.querySelectorAll(".faq__item").forEach(function (item, i) {
    var q = item.querySelector(".faq__q"),
      a = item.querySelector(".faq__a");
    if (!q || !a) return;
    // associa pergunta e resposta para leitores de tela
    var aid = "faq-a-" + (i + 1);
    a.id = aid;
    a.setAttribute("role", "region");
    q.setAttribute("aria-controls", aid);
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

  // Procedimentos: menu por categoria começa FECHADO; clique numa categoria
  // p/ ver os cards (clicar na aberta recolhe) — mesmo padrão da galeria abaixo
  var procMenu = document.getElementById("procMenu"),
    procItems = document.querySelectorAll("#procGrid .proc__item");
  if (procMenu && procItems.length) {
    var procTabs = procMenu.querySelectorAll(".proc__tab");
    function procHideAll() {
      procItems.forEach(function (item) {
        item.classList.add("is-hidden");
      });
    }
    function showProc(cat) {
      procItems.forEach(function (item) {
        item.classList.toggle(
          "is-hidden",
          item.getAttribute("data-cat") !== cat
        );
      });
    }
    procTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var wasActive = tab.classList.contains("is-active");
        procTabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        if (wasActive) {
          // clicar na categoria aberta recolhe os procedimentos
          procHideAll();
        } else {
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
          showProc(tab.getAttribute("data-cat"));
        }
      });
    });
    // estado inicial: fechado, só o menu aparece
    procHideAll();
  }

  // Lightbox: clique numa foto da galeria abre em tela cheia
  var lightbox = document.getElementById("lightbox"),
    lightboxImg = document.getElementById("lightboxImg"),
    lightboxClose = document.getElementById("lightboxClose"),
    galleryImgs = document.querySelectorAll("#galleryGrid .gallery__item img");
  if (lightbox && lightboxImg && galleryImgs.length) {
    var lastFocused = null;
    function openLightbox(src, alt) {
      lastFocused = document.activeElement;
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (lightboxClose) lightboxClose.focus();
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    galleryImgs.forEach(function (img) {
      // torna a foto acionável por teclado (Enter/Espaço), não só por clique
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Ampliar foto: " + (img.alt || "resultado"));
      function open() {
        openLightbox(img.dataset.full || img.src, img.alt);
      }
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
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

  // Carrossel de depoimentos: duplica os cards para o loop ser contínuo
  var testiTrack = document.getElementById("testiTrack");
  if (testiTrack) {
    var originals = Array.prototype.slice.call(testiTrack.children);
    originals.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      testiTrack.appendChild(clone);
    });
    // clicar em qualquer depoimento abre as avaliações no Google
    var googleReviews =
      "https://www.google.com/search?hl=pt&kgmid=/g/11rvgz4702&q=Studio+Patricia+Almeida#lrd=0x94ce6768ecf1141d:0x93b19881aced5d69,1";
    testiTrack.addEventListener("click", function (e) {
      if (e.target.closest(".quote"))
        window.open(googleReviews, "_blank", "noopener");
    });

    // botão pausar/continuar (acessível por teclado) + respeita reduzir-animações
    var testi = testiTrack.closest(".testi"),
      toggle = document.getElementById("testiToggle");
    if (testi && toggle) {
      var lbl = toggle.querySelector(".testi__toggle-label"),
        ico = toggle.querySelector(".ico");
      function setPaused(paused) {
        testi.classList.toggle("is-paused", paused);
        toggle.setAttribute("aria-pressed", String(paused));
        if (lbl) lbl.textContent = paused ? "Continuar" : "Pausar";
        if (ico) ico.textContent = paused ? "▶" : "⏸";
      }
      // se o usuário pediu menos animação, começa pausado
      var reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setPaused(reduce);
      toggle.addEventListener("click", function () {
        setPaused(!testi.classList.contains("is-paused"));
      });
    }
  }

  // --- ANIMAÇÃO DE ENTRADA DO SITE ---
  var intro = document.getElementById("site-intro"),
    introVideo = document.getElementById("site-intro-video");
  
  if (intro && introVideo) {
    // 1. UX: no celular a animação não funciona bem (vídeo 16:9 cortado/mal
    // aproveitado em tela retrato) — mostra só no desktop. Também evita
    // baixar os 2,3MB do vídeo à toa em conexão de celular.
    var isMobile = window.matchMedia(
      "(max-width: 640px), (max-aspect-ratio: 4/5)"
    ).matches;

    if (isMobile || sessionStorage.getItem("introVisto")) {
      intro.parentNode.removeChild(intro);
    } else {
      document.body.style.overflow = "hidden";
      sessionStorage.setItem("introVisto", "true");

      // 2. UX: Acelera o vídeo de leve (25% mais rápido) para não prender o usuário
      introVideo.playbackRate = 1.25;
      introVideo.preload = "auto";
      introVideo.load();

      var playPromise = introVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(function () {
            introVideo.classList.add("is-visible");
          })
          .catch(function () {
            hideIntro();
          });
      } else {
        introVideo.classList.add("is-visible");
      }

      var isIntroHidden = false;
      function hideIntro() {
        if (isIntroHidden) return;
        isIntroHidden = true;
        intro.classList.add("is-hidden");
        document.body.style.overflow = "";
        setTimeout(function () {
          if (intro.parentNode) intro.parentNode.removeChild(intro);
        }, 2000); // 1.5s da transição CSS + margem
      }

      // 3. UX: Se o usuário tocar ou clicar na tela, pula a intro na hora
      intro.addEventListener("click", hideIntro);

      introVideo.addEventListener("ended", hideIntro);
      
      // 4. UX: Começa a sumir mais cedo (aos 3.5 segundos)
      introVideo.addEventListener("timeupdate", function() {
        if (introVideo.currentTime >= 3.5) {
          hideIntro();
        }
      });

      // Fallback de segurança (se travar, libera em 8 segundos no máximo)
      setTimeout(hideIntro, 8000);
    }
  }
})();
