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

  // Espaço: baralho de fotos — passa da frente para trás, como na mão
  var deck = document.getElementById("espacoDeck");
  if (deck) {
    var stack = document.getElementById("espacoStack"),
      cards = Array.prototype.slice.call(stack.querySelectorAll(".deck__card")),
      dots = Array.prototype.slice.call(
        document.querySelectorAll("#espacoDots .deck__dot")
      ),
      nextBtn = document.getElementById("espacoNext"),
      order = cards.map(function (_, i) {
        return i;
      }),
      busy = false,
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function render() {
      order.forEach(function (ci, depth) {
        cards[ci].setAttribute("data-depth", String(depth));
      });
      dots.forEach(function (d, i) {
        var active = i === order[0];
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", String(active));
      });
    }

    // manda a foto da frente para o fundo do baralho
    function sendToBack() {
      order.push(order.shift());
      render();
    }

    // executa a "passada": desliza a foto para fora e recoloca atrás
    function passOut(dir) {
      if (busy) return;
      busy = true;
      var front = cards[order[0]];
      if (reduce) {
        sendToBack();
        busy = false;
        return;
      }
      front.classList.remove("is-dragging");
      front.style.transition = "";
      front.style.transform =
        "translate(" + dir * 130 + "%, 5%) rotate(" + dir * 16 + "deg) scale(.9)";
      front.style.opacity = "0";
      var finished = false;
      function done(e) {
        if (e && e.propertyName !== "transform") return;
        if (finished) return;
        finished = true;
        front.removeEventListener("transitionend", done);
        front.classList.add("no-anim");
        front.style.transform = "";
        front.style.opacity = "";
        sendToBack();
        void front.offsetWidth; // reflow antes de reativar a transição
        front.classList.remove("no-anim");
        busy = false;
      }
      front.addEventListener("transitionend", done);
      setTimeout(done, 700); // rede de segurança se o transitionend não vier
    }

    // traz uma foto específica para a frente (dots), sem a animação de passar
    function bringToFront(cardIndex) {
      if (busy || order[0] === cardIndex) return;
      while (order[0] !== cardIndex) order.push(order.shift());
      render();
    }

    // ---- arrastar / tocar na foto da frente ("mão") ----
    var dragging = false,
      startX = 0,
      dx = 0,
      stackW = 1;
    stack.addEventListener("pointerdown", function (e) {
      var front = cards[order[0]];
      if (busy || e.target.closest(".deck__card") !== front) return;
      dragging = true;
      startX = e.clientX;
      dx = 0;
      stackW = stack.getBoundingClientRect().width || 1;
      front.classList.add("is-dragging");
      if (front.setPointerCapture) {
        try {
          front.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
    });
    stack.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var raw = e.clientX - startX;
      // trava o arraste a ~45% da largura: não cobre o texto nem escapa da moldura
      var max = stackW * 0.45;
      dx = Math.max(-max, Math.min(max, raw));
      var front = cards[order[0]];
      front.style.transform =
        "translate(" +
        dx +
        "px, " +
        Math.abs(dx) * 0.04 +
        "px) rotate(" +
        dx * 0.028 +
        "deg)";
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      var front = cards[order[0]];
      front.classList.remove("is-dragging");
      // passou de ~28% da largura da foto? completa a passagem
      if (Math.abs(dx) > stackW * 0.28) {
        passOut(dx > 0 ? 1 : -1);
      } else if (Math.abs(dx) < 6) {
        // toque/clique curto = passar
        front.style.transform = "";
        passOut(1);
      } else {
        // não passou do limite: volta ao lugar
        front.style.transform = "";
        front.style.opacity = "";
      }
    }
    stack.addEventListener("pointerup", endDrag);
    stack.addEventListener("pointercancel", endDrag);

    if (nextBtn) nextBtn.addEventListener("click", function () {
      passOut(1);
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        bringToFront(i);
      });
    });

    // autoplay suave (pausa no hover/foco/aba oculta) — desligado se reduzir-animações
    if (!reduce) {
      var hovering = false;
      deck.addEventListener("pointerenter", function () {
        hovering = true;
      });
      deck.addEventListener("pointerleave", function () {
        hovering = false;
      });
      deck.addEventListener("focusin", function () {
        hovering = true;
      });
      deck.addEventListener("focusout", function () {
        hovering = false;
      });
      setInterval(function () {
        if (!busy && !dragging && !hovering && !document.hidden) passOut(1);
      }, 4200);
    }

    render();
  }
})();
