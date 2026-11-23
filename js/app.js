(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Tracking (all optional, driven by config) ---------- */
  function loadScript(src) { var s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); }
  if (C.META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", C.META_PIXEL_ID); fbq("track", "PageView");
  }
  if (C.GA_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", C.GA_MEASUREMENT_ID);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.GA_MEASUREMENT_ID));
  }
  if (C.GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    loadScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(C.GTM_ID));
  }
  if (C.TIKTOK_PIXEL_ID) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify"]; ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat([].slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (e) { var n = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); loadScript(n + "?sdkid=" + e + "&lib=" + t); };
      ttq.load(C.TIKTOK_PIXEL_ID); ttq.page();
    }(window, document, "ttq");
  }

  /* ---------- Config-driven links / text ---------- */
  function applyLink(a, url) {
    var href = url || "#";
    a.href = href;
    if (/^https?:\/\//i.test(href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  }
  $$("[data-cta='rankflow']").forEach(function (a) { applyLink(a, C.RANKFLOW_URL || "#"); });
  $$("[data-cta='demo']").forEach(function (a) { applyLink(a, C.DEMO_URL || "support.html"); });
  $$("[data-cta='support']").forEach(function (a) { applyLink(a, C.SUPPORT_URL || "support.html"); });
  $$("[data-contact]").forEach(function (a) {
    if (a.tagName === "A") {
      a.href = "mailto:" + C.CONTACT_EMAIL;
      if (a.hasAttribute("data-show-email")) a.textContent = C.CONTACT_EMAIL;
    } else a.textContent = C.CONTACT_EMAIL;
  });
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      if (!el || !navigator.clipboard) return;
      var label = btn.textContent;
      navigator.clipboard.writeText(el.innerText.trim()).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = label; }, 1600);
      }, function () {});
    });
  });
  $$(".js-year").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- Video reviews + lightbox (secondary page) ---------- */
  var grid = $("#video-grid");
  var vModal = $("#video-modal");
  if (grid && vModal) {
    (C.REVIEW_VIDEOS || []).forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "vthumb"; b.setAttribute("aria-label", "Play " + v.name);
      b.innerHTML = '<img loading="lazy" alt="' + v.name + '" src="' + v.poster + '"><span class="vplay"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>';
      b.addEventListener("click", function () { openVideo(v); });
      grid.appendChild(b);
    });
    var player = $("video", vModal);
    var openVideo = function (v) {
      player.src = v.src; player.poster = v.poster;
      vModal.classList.add("open"); document.body.classList.add("noscroll");
      var p = player.play(); if (p && p.catch) p.catch(function () {});
    };
    var closeVideo = function () {
      player.pause(); player.removeAttribute("src"); player.load();
      vModal.classList.remove("open"); document.body.classList.remove("noscroll");
    };
    $$("[data-close-video]", vModal).forEach(function (e) { e.addEventListener("click", closeVideo); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && vModal.classList.contains("open")) closeVideo(); });
  }

  /* ---------- Click-to-zoom for result screenshots ---------- */
  var iModal = $("#img-modal");
  if (iModal) {
    var big = $("img", iModal);
    var closeImg = function () { iModal.classList.remove("open"); document.body.classList.remove("noscroll"); big.removeAttribute("src"); };
    $$("img.zoomable").forEach(function (im) {
      im.addEventListener("click", function () {
        big.src = im.currentSrc || im.src; big.alt = im.alt;
        iModal.classList.add("open"); document.body.classList.add("noscroll");
        var sc = $(".img-scroll", iModal); if (sc) sc.scrollTop = 0;
      });
    });
    iModal.addEventListener("click", function (e) { if (e.target !== big) closeImg(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeImg(); });
  }

  /* ---------- Opt-in survey (one question at a time) ---------- */
  var fModal = $("#lead-modal");
  var form = $("#lead-form");
  if (fModal && form) {
    var STEPS = ["agency", "bottleneck", "clients", "revenue", "contact"];
    var RADIO = { agency: "agency_type", bottleneck: "bottleneck", clients: "client_count" };
    var index = 0;
    var submitted = false;

    var openForm = function () {
      fModal.classList.add("open"); document.body.classList.add("noscroll");
    };
    var closeForm = function () { fModal.classList.remove("open"); document.body.classList.remove("noscroll"); };
    $$("[data-open-form]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openForm(); }); });
    $$("[data-close-form]", fModal).forEach(function (b) { b.addEventListener("click", closeForm); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && fModal.classList.contains("open")) closeForm(); });

    function digitsOnly(v) { return String(v || "").replace(/\D/g, ""); }
    function fieldValue(name) {
      var checked = form.querySelector('[name="' + name + '"]:checked');
      if (checked) return checked.value;
      var el = form.querySelector('[name="' + name + '"]');
      if (!el || el.type === "radio") return "";
      return el.value.trim();
    }
    function formatPhone(raw) {
      var d = digitsOnly(raw).slice(0, 10);
      if (d.length > 6) return "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6);
      if (d.length > 3) return "(" + d.slice(0, 3) + ") " + d.slice(3);
      if (d.length > 0) return "(" + d;
      return "";
    }
    function contactProblems() {
      var problems = [];
      if (fieldValue("first_name").length < 2) problems.push("first_name");
      if (fieldValue("company_name").length < 2) problems.push("company_name");
      if (digitsOnly(fieldValue("phone")).length !== 10) problems.push("phone");
      return problems;
    }
    function contactErrorMessage(problems) {
      var needsName = problems.indexOf("first_name") !== -1;
      var needsCompany = problems.indexOf("company_name") !== -1;
      var needsPhone = problems.indexOf("phone") !== -1;
      if (needsName && needsCompany && needsPhone) return "Enter your first name, company name, and a 10-digit phone number.";
      if (needsName && needsCompany) return "Enter your first name and company name.";
      if (needsName && needsPhone) return "Enter your first name and a 10-digit phone number.";
      if (needsCompany && needsPhone) return "Enter your company name and a 10-digit phone number.";
      if (needsName) return "Enter your first name.";
      if (needsCompany) return "Enter your company name.";
      if (needsPhone) return "Enter a 10-digit phone number.";
      return "";
    }
    function markContactErrors() {
      var step = form.querySelector('[data-step="contact"]');
      var problems = contactProblems();
      step.classList.toggle("has-error", problems.length > 0);
      var err = $("#contact-error");
      if (err) err.textContent = contactErrorMessage(problems);
      $$("input", step).forEach(function (input) {
        input.classList.toggle("is-invalid", problems.indexOf(input.name) !== -1);
      });
    }
    function stepComplete(name) {
      if (RADIO[name]) return !!fieldValue(RADIO[name]);
      if (name === "revenue") return !!fieldValue("current_revenue") && !!fieldValue("target_revenue");
      if (name === "contact") return contactProblems().length === 0;
      return false;
    }
    function render() {
      STEPS.forEach(function (name, i) {
        var field = form.querySelector('[data-step="' + name + '"]');
        if (!field) return;
        var show = i === index;
        field.classList.toggle("is-hidden", !show);
        field.classList.toggle("is-open", show);
        if (!show) field.classList.remove("has-error");
      });
      var countEl = $("#step-count");
      if (countEl) countEl.textContent = "Question " + (index + 1) + " of " + STEPS.length;
      var bar = form.querySelector(".form-progress i");
      if (bar) bar.style.width = Math.round((index / STEPS.length) * 100) + "%";
      var back = form.querySelector(".form-back");
      if (back) back.hidden = index === 0;
    }
    function advance() {
      if (!stepComplete(STEPS[index])) return;
      if (index < STEPS.length - 1) {
        index += 1;
        render();
      }
    }

    form.addEventListener("change", function (e) {
      var t = e.target;
      if (!t || !t.name || submitted) return;
      if (t.name === "current_revenue" || t.name === "target_revenue") {
        var revenue = form.querySelector('[data-step="revenue"]');
        if (revenue && stepComplete("revenue")) revenue.classList.remove("has-error");
        return;
      }
      if (t.name === "first_name" || t.name === "company_name" || t.name === "phone") {
        var contact = form.querySelector('[data-step="contact"]');
        if (contact && contact.classList.contains("has-error")) markContactErrors();
        return;
      }
      if (RADIO[STEPS[index]] === t.name) advance();
    });

    var next = form.querySelector(".form-next");
    if (next) {
      next.addEventListener("click", function () {
        if (STEPS[index] !== "revenue") return;
        var revenue = form.querySelector('[data-step="revenue"]');
        if (!stepComplete("revenue")) {
          if (revenue) revenue.classList.add("has-error");
          return;
        }
        if (revenue) revenue.classList.remove("has-error");
        advance();
      });
    }
    var backBtn = form.querySelector(".form-back");
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        if (index > 0) index -= 1;
        render();
      });
    }
    ["first_name", "company_name"].forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      if (!input) return;
      input.addEventListener("input", function () {
        var contact = form.querySelector('[data-step="contact"]');
        if (contact && contact.classList.contains("has-error")) markContactErrors();
      });
    });
    if (form.phone) {
      form.phone.addEventListener("input", function () {
        var pos = this.value.length;
        this.value = formatPhone(this.value);
        if (pos < this.value.length) this.setSelectionRange(this.value.length, this.value.length);
        var contact = form.querySelector('[data-step="contact"]');
        if (contact && contact.classList.contains("has-error")) markContactErrors();
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitted) return;
      if (STEPS[index] !== "contact" || !stepComplete("contact")) {
        markContactErrors();
        return;
      }
      var phone = fieldValue("phone");
      if (digitsOnly(phone).length !== 10) {
        markContactErrors();
        return;
      }

      submitted = true;
      var btn = $("#lf-submit");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      var q = new URLSearchParams(window.location.search);
      var payload = {
        agency_type: fieldValue("agency_type"),
        bottleneck: fieldValue("bottleneck"),
        client_count: fieldValue("client_count"),
        current_revenue: fieldValue("current_revenue"),
        target_revenue: fieldValue("target_revenue"),
        first_name: fieldValue("first_name"),
        company_name: fieldValue("company_name"),
        phone: phone,
        source: "rankflow-optin",
        pageUrl: window.location.href,
        utm_source: q.get("utm_source") || "",
        utm_medium: q.get("utm_medium") || "",
        utm_campaign: q.get("utm_campaign") || "",
        utm_term: q.get("utm_term") || "",
        utm_content: q.get("utm_content") || ""
      };
      q.forEach(function (value, key) {
        if (key.indexOf("utm_") === 0 && !Object.prototype.hasOwnProperty.call(payload, key)) payload[key] = value;
      });

      if (window.fbq) try { fbq("track", "Lead"); } catch (x) {}
      if (window.gtag) try { gtag("event", "generate_lead"); } catch (x) {}
      if (window.ttq) try { ttq.track("SubmitForm"); } catch (x) {}

      var go = function () { window.location.href = C.NEXT_PAGE || "main.html"; };
      var webhook = C.RANKFLOW_WEBHOOK_URL || C.LEAD_WEBHOOK_URL || "";
      var posted = Promise.resolve();
      if (webhook) {
        try {
          posted = fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true
          }).catch(function () {});
        } catch (x) { posted = Promise.resolve(); }
      }
      Promise.race([posted, new Promise(function (r) { setTimeout(r, 1200); })]).then(go, go);
    });

    render();
  }
})();
