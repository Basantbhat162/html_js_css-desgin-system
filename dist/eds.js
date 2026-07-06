/* ==========================================================================
   EDS — Elementor Design System v2
   File: eds.js — all component behaviors, zero dependencies.
   --------------------------------------------------------------------------
   Paste once site-wide (e.g. an Elementor HTML widget in the footer, or
   wp_footer). Binds to data-eds-* attributes, is multi-instance safe, and
   exits quietly when elements are missing.

   Public API (window.EDS):
     EDS.init(root?)        re-scan a subtree (for popups / dynamic content)
     EDS.toast(msg, type?)  show a toast: type = 'success'|'danger'|'info'
     EDS.openModal(id)      open a modal <dialog> by element id
     EDS.closeModal(id)     close a modal <dialog> by element id

   Components (attribute -> behavior):
     [data-eds-tabs]      accessible tabs (arrow keys, Home/End)
     [data-eds-filter]    single-select filter chips (aria-pressed)
     [data-eds-search]    debounced text filter of target items
     [data-eds-modal]     <dialog> open/close triggers
     [data-eds-menu]      dropdown with outside click + Escape
     [data-eds-copy]      copy-to-clipboard with feedback
     [data-eds-qty]       quantity stepper (min/max aware)
     [data-eds-submit]    form guard: disable + loading on submit
   ========================================================================== */

(function () {
  "use strict";

  var INIT_FLAG = "edsInit";

  /* ---------------------------------------------------------------- utils */

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments;
      var self = this;
      clearTimeout(t);
      t = setTimeout(function () {
        fn.apply(self, args);
      }, ms);
    };
  }

  /** Query within root, including root itself if it matches. */
  function findAll(root, selector) {
    var list = Array.prototype.slice.call(root.querySelectorAll(selector));
    if (root.nodeType === 1 && root.matches && root.matches(selector)) {
      list.unshift(root);
    }
    return list;
  }

  /** Returns true (and marks) if el has not been initialized for a feature. */
  function firstInit(el, feature) {
    var key = INIT_FLAG + feature;
    if (el.dataset[key]) return false;
    el.dataset[key] = "1";
    return true;
  }

  /* ----------------------------------------------------------------- tabs */
  /*
    <div data-eds-tabs>
      <div class="eds-tabs__list" role="tablist" aria-label="...">
        <button class="eds-tabs__tab" role="tab" id="t1" aria-controls="p1">One</button>
        ...
      </div>
      <div class="eds-tabs__panel" role="tabpanel" id="p1" aria-labelledby="t1">...</div>
      ...
    </div>
    First tab is selected unless a tab has aria-selected="true" in the markup.
  */

  function initTabs(root) {
    findAll(root, "[data-eds-tabs]").forEach(function (widget) {
      if (!firstInit(widget, "Tabs")) return;

      var tabs = Array.prototype.slice.call(
        widget.querySelectorAll('[role="tab"]')
      );
      if (!tabs.length) return;

      function select(tab, focus) {
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute("aria-selected", selected ? "true" : "false");
          t.tabIndex = selected ? 0 : -1;
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !selected;
        });
        if (focus) tab.focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () {
          select(tab, false);
        });
        tab.addEventListener("keydown", function (e) {
          var idx = -1;
          if (e.key === "ArrowRight") idx = (i + 1) % tabs.length;
          else if (e.key === "ArrowLeft") idx = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === "Home") idx = 0;
          else if (e.key === "End") idx = tabs.length - 1;
          if (idx > -1) {
            e.preventDefault();
            select(tabs[idx], true);
          }
        });
      });

      var initial =
        tabs.filter(function (t) {
          return t.getAttribute("aria-selected") === "true";
        })[0] || tabs[0];
      select(initial, false);
    });
  }

  /* --------------------------------------------------------------- filter */
  /*
    <div data-eds-filter data-eds-filter-target="#grid">
      <button class="eds-chip" aria-pressed="true" data-eds-filter-value="all">All</button>
      <button class="eds-chip" aria-pressed="false" data-eds-filter-value="shoes">Shoes</button>
    </div>
    Items inside the target need data-eds-category="shoes" (space-separated ok).
    Value "all" always shows everything.
  */

  function initFilters(root) {
    findAll(root, "[data-eds-filter]").forEach(function (group) {
      if (!firstInit(group, "Filter")) return;

      var buttons = Array.prototype.slice.call(
        group.querySelectorAll("[data-eds-filter-value]")
      );
      var targetSel = group.getAttribute("data-eds-filter-target");
      var target = targetSel ? document.querySelector(targetSel) : null;

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) {
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
          });
          if (!target) return;
          var value = btn.getAttribute("data-eds-filter-value");
          Array.prototype.slice
            .call(target.querySelectorAll("[data-eds-category]"))
            .forEach(function (item) {
              var cats = (item.getAttribute("data-eds-category") || "").split(/\s+/);
              item.hidden = value !== "all" && cats.indexOf(value) === -1;
            });
        });
      });
    });
  }

  /* --------------------------------------------------------------- search */
  /*
    <input data-eds-search data-eds-search-target="#list" ...>
    Filters children of the target that have [data-eds-search-text] (or falls
    back to textContent). Optional [data-eds-search-empty="#emptyEl"].
  */

  function initSearch(root) {
    findAll(root, "input[data-eds-search]").forEach(function (input) {
      if (!firstInit(input, "Search")) return;

      var targetSel = input.getAttribute("data-eds-search-target");
      var target = targetSel ? document.querySelector(targetSel) : null;
      if (!target) return;

      var emptySel = input.getAttribute("data-eds-search-empty");
      var emptyEl = emptySel ? document.querySelector(emptySel) : null;

      var run = debounce(function () {
        var q = input.value.trim().toLowerCase();
        var visible = 0;
        Array.prototype.slice.call(target.children).forEach(function (item) {
          var text = (
            item.getAttribute("data-eds-search-text") || item.textContent
          ).toLowerCase();
          var show = !q || text.indexOf(q) !== -1;
          item.hidden = !show;
          if (show) visible++;
        });
        if (emptyEl) emptyEl.hidden = visible !== 0;
      }, 150);

      input.addEventListener("input", run);
    });
  }

  /* ---------------------------------------------------------------- modal */
  /*
    Trigger: <button data-eds-modal="myModalId">Open</button>
    Dialog:  <dialog class="eds-modal" id="myModalId"> ...
               <button data-eds-modal-close>Close</button>
             </dialog>
    Uses the native <dialog> element: focus trapping, Escape, and backdrop
    are built in. Clicking the backdrop closes the dialog.
  */

  function openModal(id) {
    var dialog = document.getElementById(id);
    if (!dialog || typeof dialog.showModal !== "function") return;
    if (!dialog.open) dialog.showModal();
  }

  function closeModal(id) {
    var dialog = document.getElementById(id);
    if (dialog && dialog.open) dialog.close();
  }

  function initModals(root) {
    findAll(root, "[data-eds-modal]").forEach(function (trigger) {
      if (!firstInit(trigger, "Modal")) return;
      trigger.addEventListener("click", function () {
        openModal(trigger.getAttribute("data-eds-modal"));
      });
    });

    findAll(root, "dialog.eds-modal").forEach(function (dialog) {
      if (!firstInit(dialog, "ModalDialog")) return;

      dialog.addEventListener("click", function (e) {
        // Backdrop click: the dialog itself is the target only when the
        // click lands outside its content box.
        if (e.target === dialog) {
          var rect = dialog.getBoundingClientRect();
          var inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
          if (!inside) dialog.close();
        }
      });

      Array.prototype.slice
        .call(dialog.querySelectorAll("[data-eds-modal-close]"))
        .forEach(function (btn) {
          btn.addEventListener("click", function () {
            dialog.close();
          });
        });
    });
  }

  /* ---------------------------------------------------------------- toast */
  /*
    EDS.toast("Added to cart", "success")
    Types: 'success' | 'danger' | 'info' | undefined (neutral).
    Creates a single aria-live region on demand; toasts auto-dismiss in 4s.
  */

  var toastRegion = null;

  function ensureToastRegion() {
    if (toastRegion && document.body.contains(toastRegion)) return toastRegion;
    toastRegion = document.createElement("div");
    toastRegion.className = "eds eds-toast-region";
    toastRegion.setAttribute("aria-live", "polite");
    toastRegion.setAttribute("aria-atomic", "false");
    document.body.appendChild(toastRegion);
    return toastRegion;
  }

  function toast(message, type) {
    var region = ensureToastRegion();
    var el = document.createElement("div");
    el.className = "eds-toast" + (type ? " eds-toast--" + type : "");
    el.setAttribute("role", "status");
    el.textContent = message;
    region.appendChild(el);

    setTimeout(function () {
      el.classList.add("eds-toast--leaving");
      el.addEventListener(
        "animationend",
        function () {
          el.remove();
        },
        { once: true }
      );
      // Fallback removal in case animations are disabled
      setTimeout(function () {
        el.remove();
      }, 400);
    }, 4000);
  }

  /* Optional declarative trigger: <button data-eds-toast="Saved!" data-eds-toast-type="success"> */
  function initToastTriggers(root) {
    findAll(root, "[data-eds-toast]").forEach(function (trigger) {
      if (!firstInit(trigger, "Toast")) return;
      trigger.addEventListener("click", function () {
        toast(
          trigger.getAttribute("data-eds-toast"),
          trigger.getAttribute("data-eds-toast-type") || undefined
        );
      });
    });
  }

  /* ----------------------------------------------------------------- menu */
  /*
    <div class="eds-menu" data-eds-menu>
      <button class="eds-btn eds-btn--secondary" aria-expanded="false">Menu</button>
      <div class="eds-menu__panel" hidden> ...items... </div>
    </div>
  */

  function initMenus(root) {
    findAll(root, "[data-eds-menu]").forEach(function (menu) {
      if (!firstInit(menu, "Menu")) return;

      var trigger = menu.querySelector("button");
      var panel = menu.querySelector(".eds-menu__panel");
      if (!trigger || !panel) return;

      function setOpen(open) {
        panel.hidden = !open;
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
      }

      trigger.setAttribute("aria-haspopup", "true");
      setOpen(false);

      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        setOpen(panel.hidden);
      });

      document.addEventListener("click", function (e) {
        if (!panel.hidden && !menu.contains(e.target)) setOpen(false);
      });

      menu.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !panel.hidden) {
          setOpen(false);
          trigger.focus();
        }
      });

      // Close after choosing an item
      panel.addEventListener("click", function (e) {
        if (e.target.closest(".eds-menu__item")) setOpen(false);
      });
    });
  }

  /* ----------------------------------------------------------------- copy */
  /*
    <button data-eds-copy="text to copy">Copy</button>
    or  <button data-eds-copy data-eds-copy-target="#code">Copy</button>
    Feedback: swaps label to "Copied" for 1.5s and fires a toast-free state.
  */

  function initCopy(root) {
    findAll(root, "[data-eds-copy]").forEach(function (btn) {
      if (!firstInit(btn, "Copy")) return;

      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-eds-copy");
        if (!text) {
          var sel = btn.getAttribute("data-eds-copy-target");
          var el = sel ? document.querySelector(sel) : null;
          text = el ? el.textContent : "";
        }
        if (!text) return;

        var done = function () {
          var original = btn.textContent;
          btn.textContent = "Copied";
          btn.disabled = true;
          setTimeout(function () {
            btn.textContent = original;
            btn.disabled = false;
          }, 1500);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, done);
        } else {
          // Legacy fallback
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch (err) {
            /* no-op */
          }
          ta.remove();
          done();
        }
      });
    });
  }

  /* ------------------------------------------------------------------ qty */
  /*
    <div class="eds-qty" data-eds-qty>
      <button type="button" data-eds-qty-dec aria-label="Decrease quantity">−</button>
      <input type="number" value="1" min="1" max="99" aria-label="Quantity">
      <button type="button" data-eds-qty-inc aria-label="Increase quantity">+</button>
    </div>
  */

  function initQty(root) {
    findAll(root, "[data-eds-qty]").forEach(function (widget) {
      if (!firstInit(widget, "Qty")) return;

      var input = widget.querySelector('input[type="number"]');
      var dec = widget.querySelector("[data-eds-qty-dec]");
      var inc = widget.querySelector("[data-eds-qty-inc]");
      if (!input) return;

      function clamp(v) {
        var min = input.min !== "" ? parseInt(input.min, 10) : 1;
        var max = input.max !== "" ? parseInt(input.max, 10) : Infinity;
        if (isNaN(v)) v = min;
        return Math.min(max, Math.max(min, v));
      }

      function set(v) {
        var next = clamp(v);
        input.value = String(next);
        var min = input.min !== "" ? parseInt(input.min, 10) : 1;
        var max = input.max !== "" ? parseInt(input.max, 10) : Infinity;
        if (dec) dec.disabled = next <= min;
        if (inc) inc.disabled = next >= max;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (dec)
        dec.addEventListener("click", function () {
          set(parseInt(input.value, 10) - 1);
        });
      if (inc)
        inc.addEventListener("click", function () {
          set(parseInt(input.value, 10) + 1);
        });
      input.addEventListener("change", function () {
        var next = clamp(parseInt(input.value, 10));
        if (String(next) !== input.value) input.value = String(next);
      });

      set(parseInt(input.value, 10));
    });
  }

  /* --------------------------------------------------------------- submit */
  /*
    <form data-eds-submit> ... <button type="submit" class="eds-btn eds-btn--primary">Send</button></form>
    On submit: the submit button gets the loading state and the form is
    guarded against double submission. If the page does not navigate (e.g.
    AJAX), call form.dispatchEvent(new CustomEvent('eds:reset')) to restore.
  */

  function initSubmitGuards(root) {
    findAll(root, "form[data-eds-submit]").forEach(function (form) {
      if (!firstInit(form, "Submit")) return;

      var btn = form.querySelector('[type="submit"]');

      form.addEventListener("submit", function () {
        if (form.dataset.edsSubmitting) return;
        form.dataset.edsSubmitting = "1";
        if (btn) btn.setAttribute("data-eds-loading", "");
      });

      form.addEventListener("eds:reset", function () {
        delete form.dataset.edsSubmitting;
        if (btn) btn.removeAttribute("data-eds-loading");
      });
    });
  }

  /* ------------------------------------------------------- accordion anim */
  /* Smooth-close support for <details class="eds-accordion"> — progressive
     enhancement only; without JS the accordion still works natively. */

  function initAccordions(root) {
    findAll(root, "details.eds-accordion").forEach(function (details) {
      if (!firstInit(details, "Accordion")) return;

      var body = details.querySelector(".eds-accordion__body");
      if (!body) return;

      // Animate open via a transform/opacity-only entrance
      details.addEventListener("toggle", function () {
        if (details.open) {
          body.style.opacity = "0";
          body.style.transform = "translateY(-4px)";
          requestAnimationFrame(function () {
            body.style.transition =
              "opacity 180ms cubic-bezier(0.25,0.1,0.25,1), transform 180ms cubic-bezier(0.25,0.1,0.25,1)";
            body.style.opacity = "1";
            body.style.transform = "translateY(0)";
            setTimeout(function () {
              body.style.transition = "";
            }, 200);
          });
        }
      });
    });
  }

  /* ----------------------------------------------------------------- init */

  function init(root) {
    var scope = root || document;
    initTabs(scope);
    initFilters(scope);
    initSearch(scope);
    initModals(scope);
    initToastTriggers(scope);
    initMenus(scope);
    initCopy(scope);
    initQty(scope);
    initSubmitGuards(scope);
    initAccordions(scope);
  }

  window.EDS = {
    init: init,
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
  };

  ready(function () {
    init(document);
  });

  /* Elementor popups render content after load — re-scan when they open. */
  window.addEventListener("elementor/popup/show", function (e) {
    if (e.detail && e.detail.instance && e.detail.instance.$element) {
      init(e.detail.instance.$element[0]);
    } else {
      init(document);
    }
  });
})();
