/* Young Engineers Connect — renders every page from assets/js/data.js */
(function () {
  "use strict";

  var D = window.YEC;
  var ICONS = window.YEC_ICONS || {};
  var app = document.getElementById("app");
  if (!D || !app) return;
  document.documentElement.lang = "en";

  var ROLE = {
    "president":      { label: "President",      icon: "crown-simple" },
    "vice-president": { label: "Vice-President", icon: "medal" },
    "secretary":      { label: "Secretary",      icon: "pen-nib" },
    "member":         { label: "Member",         icon: "users-three" }
  };
  var P = D.panel;
  var C = D.candidates;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ic(name, cls) {
    var body = ICONS[name] || ICONS[name.split(":")[0]] || "";
    return '<svg class="i' + (cls ? " " + cls : "") + '" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">' + body + "</svg>";
  }
  function logo(cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
      '<path d="M24 3.5 41.75 13.75v20.5L24 44.5 6.25 34.25v-20.5Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M24 15.5 15.8 29.5h16.4Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" opacity=".55"/>' +
      '<circle cx="24" cy="15.5" r="3.6" fill="currentColor"/><circle cx="15.8" cy="29.5" r="3.6" fill="currentColor"/><circle cx="32.2" cy="29.5" r="3.6" fill="currentColor"/></svg>';
  }
  function photo(c, eager) {
    var html = '<div class="ph" aria-hidden="true">' + ic("user:f") + "</div>";
    if (c.photo) {
      html += '<img src="' + esc(c.photo) + '" alt="Photo of ' + esc(c.name) + '"' + (eager ? "" : ' loading="lazy" decoding="async"') + '>';
    }
    return html;
  }
  function roleOf(c) { return ROLE[c.role] || ROLE.member; }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }
  function brand() {
    return '<a class="brand" href="index.html" aria-label="' + esc(P.name) + ' home page">' +
      '<span class="brand__mark">' + logo() + "</span>" +
      '<span class="brand__text topbar__name"><b>' + esc(P.name) + "</b><span>" + esc(P.election) + "</span></span></a>";
  }
  function brandStatic() {
    return '<span class="brand"><span class="brand__mark">' + logo() + '</span><span class="brand__text"><b>' + esc(P.name) + "</b><span>" + esc(P.election) + "</span></span></span>";
  }
  function footer() {
    var links = "";
    if (P.contactPhone) links += '<a href="tel:' + esc(P.contactPhone.replace(/[^+\d]/g, "")) + '">' + ic("phone") + '<span class="mono">' + esc(P.contactPhone) + "</span></a>";
    if (P.contactEmail) links += '<a href="mailto:' + esc(P.contactEmail) + '">' + ic("envelope-simple") + "<span>" + esc(P.contactEmail) + "</span></a>";
    links += '<a href="qr.html">' + ic("qr-code") + "<span>Panel QR code</span></a>";
    return '<footer class="footer"><div class="wrap">' +
      '<div class="footer__grid">' +
        '<div class="footer__about">' + brandStatic() + "<p>" + esc(P.slogan) + ". Vote for all " + C.length + " candidates of the panel in the " + esc(P.election) + ".</p></div>" +
        '<nav class="footer__links" aria-label="Contact">' + links + "</nav>" +
      "</div>" +
      '<div class="footer__base"><span>© 2026 ' + esc(P.name) + "</span><span>Published for election campaign purposes</span></div>" +
      (P.photoCredit ? '<p class="footer__credit">' + esc(P.photoCredit) + "</p>" : "") +
    "</div></footer>";
  }
  function wireImages(root) {
    (root || document).querySelectorAll(".photo img").forEach(function (img) {
      var drop = function () { img.remove(); };
      if (img.complete && !img.naturalWidth) drop(); else img.addEventListener("error", drop);
    });
  }
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2200);
  }
  function copyText(text, btn) {
    var done = function () {
      toast("Copied");
      if (btn) { btn.classList.add("is-done"); setTimeout(function () { btn.classList.remove("is-done"); }, 1600); }
    };
    var fallback = function () {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      ta.remove();
      if (ok) done(); else toast("Couldn't copy. Press and hold the text to copy it.");
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }

  /* ---------- home ---------- */
  function titleHtml(name) {
    var parts = String(name).trim().split(/\s+/);
    if (parts.length < 2) return esc(name);
    var last = parts.pop();
    return esc(parts.join(" ")) + " <span>" + esc(last) + "</span>";
  }
  function card(c, variant, n) {
    var r = roleOf(c);
    return '<article class="card card--' + variant + '" style="--n:' + n + '">' +
      '<div class="card__media"><div class="card__photo photo">' + photo(c, true) + "</div></div>" +
      '<div class="card__body">' +
        '<div class="card__head"><h3 class="card__name">' + esc(c.name) + "</h3>" +
          '<span class="role-chip">' + ic(r.icon) + "<span><em>Candidate for </em>" + esc(r.label) + "</span></span></div>" +
        '<dl class="meta">' +
          "<div><dt>" + ic("identification-card") + "Membership No.</dt><dd>" + esc(c.membershipNo) + "</dd></div>" +
          '<div class="meta__ballot"><dt>' + ic("stamp") + "Ballot No.</dt><dd>" + esc(c.ballotNo) + "</dd></div>" +
        "</dl>" +
        '<a class="btn" href="' + esc(c.page) + '"><span>View More</span>' + ic("arrow-right:r") + '<span class="sr"> about ' + esc(c.name) + "</span></a>" +
      "</div>" +
    "</article>";
  }

  function renderHome() {
    var pres = C.filter(function (c) { return c.role === "president"; });
    var pair = C.filter(function (c) { return c.role === "vice-president" || c.role === "secretary"; });
    var mem = C.filter(function (c) { return c.role === "member"; });
    var n = 0;
    var facts = [
      ["calendar-dots:f", "Date", P.date],
      ["clock:f", "Time", P.time],
      ["map-pin:f", "Venue", P.venue]
    ].filter(function (f) { return f[2]; }).map(function (f) {
      return '<li><span class="mast__ic">' + ic(f[0]) + '</span><span class="mast__fv"><small>' + f[1] + "</small><b>" + esc(f[2]) + "</b></span></li>";
    }).join("");

    app.innerHTML =
      '<header class="mast blueprint">' +
        '<svg class="mast__art" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3.5 41.75 13.75v20.5L24 44.5 6.25 34.25v-20.5Z" fill="none" stroke="currentColor" stroke-width=".5"/><path d="M24 9.5 36.55 16.75v14.5L24 38.5 11.45 31.25v-14.5Z" fill="none" stroke="currentColor" stroke-width=".3"/></svg>' +
        '<div class="wrap mast__in">' +
          '<span class="mast__emblem" aria-hidden="true">' + logo() + "</span>" +
          '<h1 class="mast__title">' + titleHtml(P.name) + "</h1>" +
          '<p class="mast__election"><span class="mast__rule" aria-hidden="true"></span><span>' + esc(P.election) + '</span><span class="mast__rule" aria-hidden="true"></span></p>' +
          (facts ? '<ul class="mast__facts">' + facts + "</ul>" : "") +
        "</div>" +
        '<span class="mast__line" aria-hidden="true"></span>' +
      "</header>" +
      '<main id="main">' +
        '<section class="panel wrap" aria-label="Panel candidates">' +
          '<p class="tier-label">Running for President</p>' +
          '<div class="tier tier--lead">' + pres.map(function (c) { return card(c, "lead", n++); }).join("") + "</div>" +
          '<p class="tier-label">Vice-President &amp; Secretary</p>' +
          '<div class="tier tier--pair">' + pair.map(function (c) { return card(c, "pair", n++); }).join("") + "</div>" +
          '<p class="tier-label">Members · ' + plural(mem.length, "Candidate") + "</p>" +
          '<div class="tier tier--members">' + mem.map(function (c) { return card(c, "member", n++); }).join("") + "</div>" +
        "</section>" +
      "</main>" + footer();
    wireImages(app);
    layoutCards();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutCards);
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(layoutCards, 100); });
  }

  /* Card text layout, re-run on load, font load and resize:
     1. Names: one font size for every card that shares a layout. If a slightly smaller
        size (down to --name-min) puts every name on one line, use it; otherwise keep the
        normal size and let long names wrap.
     2. Role tags: show "Candidate for …" where it fits; if any tag in a row would
        overflow, that row uses the short label ("Member").
     3. Every name in a row gets the same height, so the tag, numbers and button sit at
        the same position on every card. */
  function layoutCards() {
    var tiers = [].slice.call(app.querySelectorAll(".tier"));
    if (!tiers.length) return;
    var phone = window.matchMedia("(max-width: 720px)").matches;
    var groups = phone ? [tiers.filter(function (t) { return !t.classList.contains("tier--members"); }),
                          tiers.filter(function (t) { return t.classList.contains("tier--members"); })]
                       : [tiers];
    groups.forEach(function (group) {
      var names = [];
      group.forEach(function (t) { names = names.concat([].slice.call(t.querySelectorAll(".card__name"))); });
      if (!names.length) return;
      names.forEach(function (n) { n.style.fontSize = ""; n.style.minHeight = ""; });
      var ratio = 1, base = Infinity, min = 0;
      names.forEach(function (n) {
        var cs = getComputedStyle(n);
        base = Math.min(base, parseFloat(cs.fontSize));
        min = Math.max(min, parseFloat(cs.getPropertyValue("--name-min")) || 0);
      });
      names.forEach(function (n) {
        n.style.fontSize = base + "px";
        n.classList.add("is-measure");
        if (n.scrollWidth > n.clientWidth) ratio = Math.min(ratio, n.clientWidth / n.scrollWidth);
      });
      names.forEach(function (n) { n.classList.remove("is-measure"); });
      var fs = base;
      if (ratio < 1) {
        var fit = Math.floor(base * ratio * 4) / 4 - 0.25;
        if (fit >= min) fs = fit;
      }
      names.forEach(function (n) { n.style.fontSize = fs + "px"; });
    });
    tiers.forEach(function (tier) {
      var chips = tier.querySelectorAll(".role-chip"), short = false;
      chips.forEach(function (c) { c.classList.remove("is-short"); });
      chips.forEach(function (c) { if (c.scrollWidth > c.parentNode.clientWidth + 0.5) short = true; });
      if (short) chips.forEach(function (c) { c.classList.add("is-short"); });
      var names = tier.querySelectorAll(".card__name"), h = 0;
      names.forEach(function (n) { h = Math.max(h, n.getBoundingClientRect().height); });
      names.forEach(function (n) { n.style.minHeight = h + "px"; });
    });
  }

  /* ---------- candidate page ---------- */
  function renderCandidate(id) {
    var idx = -1;
    for (var k = 0; k < C.length; k++) if (C[k].id === id) idx = k;
    if (idx < 0) { app.innerHTML = '<p class="wrap" style="padding-block:60px">Candidate not found. <a href="index.html">Back to the home page</a></p>'; return; }
    var c = C[idx], r = roleOf(c);
    var prev = C[(idx - 1 + C.length) % C.length], next = C[(idx + 1) % C.length];
    document.title = c.name + " · Candidate for " + r.label + " · " + P.name;

    var facts = [
      ["gear-six", "Discipline", c.discipline],
      ["buildings", "Workplace", c.workplace],
      ["hourglass-medium", "Experience", c.experience],
      ["map-pin", "Home District", c.district]
    ].filter(function (f) { return f[2]; }).map(function (f) {
      return "<li>" + ic(f[0]) + "<small>" + f[1] + "</small><b>" + esc(f[2]) + "</b></li>";
    }).join("");

    var blocks = "";
    if (c.about) blocks += block("user-circle", "About", '<p class="about">' + esc(c.about) + "</p>");
    if (c.pledges && c.pledges.length) blocks += block("handshake", "Election Pledges",
      '<div class="pledges">' + c.pledges.map(function (p) {
        return '<div class="pledge">' + ic(p.icon || "check-circle") + "<h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p></div>";
      }).join("") + "</div>");
    if (c.career && c.career.length) blocks += block("briefcase", "Professional Experience",
      '<ol class="tl">' + c.career.map(function (e) {
        return '<li><span class="tl__period">' + esc(e.period) + "</span><h3>" + esc(e.role) + '</h3><span class="tl__org">' + esc(e.org) + "</span>" + (e.text ? "<p>" + esc(e.text) + "</p>" : "") + "</li>";
      }).join("") + "</ol>");
    if (c.education && c.education.length) blocks += block("graduation-cap", "Education & Certifications",
      '<ol class="tl">' + c.education.map(function (e) {
        return '<li><span class="tl__period">' + esc(e.year) + "</span><h3>" + esc(e.degree) + '</h3><span class="tl__org">' + esc(e.institute) + "</span></li>";
      }).join("") + "</ol>");
    if (c.achievements && c.achievements.length) blocks += block("trophy", "Achievements & Service",
      '<ul class="wins">' + c.achievements.map(function (a) { return "<li>" + ic("medal-military") + "<span>" + esc(a) + "</span></li>"; }).join("") + "</ul>");

    var ct = c.contact || {};
    var rows = "";
    if (ct.phone) rows += crow("phone", "Mobile", '<a class="mono" href="tel:' + esc(ct.phone.replace(/[^+\d]/g, "")) + '">' + esc(ct.phone) + "</a>", ct.phone);
    if (ct.email) rows += crow("envelope-simple", "Email", '<a href="mailto:' + esc(ct.email) + '">' + esc(ct.email) + "</a>", ct.email);
    if (ct.facebook) rows += crow("facebook-logo:f", "Facebook", '<a href="' + esc(ct.facebook) + '" target="_blank" rel="noopener">' + esc(ct.facebook.replace(/^https?:\/\/(www\.)?/, "")) + "</a>", ct.facebook);
    if (ct.linkedin) rows += crow("linkedin-logo:f", "LinkedIn", '<a href="' + esc(ct.linkedin) + '" target="_blank" rel="noopener">' + esc(ct.linkedin.replace(/^https?:\/\/(www\.)?/, "")) + "</a>", ct.linkedin);

    var aside =
      '<div class="vote blueprint"><small>Find on the ballot paper</small>' +
        '<span class="vote__no">' + esc(c.ballotNo) + "</span>" +
        "<b>Candidate for " + esc(r.label) + "</b><p>" + esc(c.name) + "</p></div>" +
      (rows ? block("chats-circle", "Contact", '<div class="contact">' + rows + "</div>") : "") +
      (c.expertise && c.expertise.length ? block("lightbulb", "Areas of Expertise", '<ul class="chips">' + c.expertise.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") : "") +
      block("share-network", "Share This Page",
        '<div class="share"><button class="btn btn--ghost" type="button" id="copy-link">' + ic("link:r") + "Copy Link</button>" +
        '<a class="btn btn--ghost" href="qr.html">' + ic("qr-code") + "Panel QR Code</a></div>");

    var strip = C.map(function (o) {
      var ro = roleOf(o);
      return "<li><a href=\"" + esc(o.page) + "\"" + (o.id === c.id ? ' aria-current="page"' : "") + ">" +
        '<span class="strip__av photo">' + photo(o) + "</span>" +
        "<b>" + esc(o.name.replace(/^Engr\.\s*/, "")) + "</b><span>" + esc(ro.label) + "</span><em>" + esc(o.ballotNo) + "</em></a></li>";
    }).join("");

    app.innerHTML =
      '<header class="topbar"><div class="wrap topbar__in">' + brand() +
        '<a class="toplink" href="index.html">' + ic("arrow-left:r") + "All Candidates</a></div></header>" +
      (P.sampleNotice ? '<div class="sample-note" role="note"><div class="wrap">' + ic("hourglass-medium") + "<span>" + esc(P.sampleNotice) + "</span></div></div>" : "") +
      '<main id="main">' +
        '<section class="phero blueprint"><div class="wrap">' +
          '<div class="phero__grid">' +
            '<div class="frame"><div class="photo">' + photo(c, true) + "</div>" +
              '<span class="frame__mark frame__mark--tl"></span><span class="frame__mark frame__mark--tr"></span><span class="frame__mark frame__mark--bl"></span><span class="frame__mark frame__mark--br"></span></div>' +
            '<div class="phero__info">' +
              '<span class="eyebrow">' + ic(r.icon) + "Candidate for " + esc(r.label) + "</span>" +
              "<h1>" + esc(c.name) + "</h1>" +
              '<p class="phero__en">' + esc(c.designation || c.discipline) + "</p>" +
              (c.tagline ? '<p class="quote">' + ic("quotes:f") + esc(c.tagline) + "</p>" : "") +
              '<div class="ids">' +
                '<div class="stamp" aria-label="Ballot number ' + esc(c.ballotNo) + '"><small>Ballot No.</small><b>' + esc(c.ballotNo) + "</b></div>" +
                '<div class="idcard"><small>' + ic("identification-card") + 'Membership No.</small><b>' + esc(c.membershipNo) + "</b></div>" +
              "</div>" +
            "</div>" +
          "</div>" +
          (facts ? '<ul class="facts">' + facts + "</ul>" : "") +
        "</div></section>" +
        '<div class="wrap">' +
          '<div class="profile"><div class="profile__main">' + blocks + '</div><aside class="profile__aside">' + aside + "</aside></div>" +
          '<nav class="pager" aria-label="Other candidates">' +
            '<a href="' + esc(prev.page) + '"><small>' + ic("arrow-left:r") + "Previous candidate</small><b>" + esc(prev.name) + "</b></a>" +
            '<a class="pager__next" href="' + esc(next.page) + '"><small>Next candidate' + ic("arrow-right:r") + "</small><b>" + esc(next.name) + "</b></a>" +
          "</nav>" +
          '<section class="strip" aria-labelledby="strip-h"><h2 id="strip-h">All Panel Candidates</h2><ul class="strip__list">' + strip + "</ul></section>" +
        "</div>" +
      "</main>" + footer();

    wireImages(app);
    app.querySelectorAll(".copy").forEach(function (b) {
      b.addEventListener("click", function () { copyText(b.getAttribute("data-copy"), b); });
    });
    var cl = document.getElementById("copy-link");
    if (cl) cl.addEventListener("click", function () { copyText(location.href.split("#")[0], cl); });
    var cur = app.querySelector('.strip__list a[aria-current="page"]');
    if (cur) {
      var ul = cur.closest("ul");
      if (ul.scrollWidth > ul.clientWidth) {
        var off = cur.getBoundingClientRect().left - ul.getBoundingClientRect().left;
        if (off + cur.offsetWidth > ul.clientWidth) ul.scrollLeft = off - 8;
      }
    }
  }
  function block(icon, title, body) {
    return '<section class="block"><h2 class="block__title">' + ic(icon) + esc(title) + "</h2>" + body + "</section>";
  }
  function crow(icon, label, valueHtml, raw) {
    return '<div class="crow">' + ic(icon) + '<div class="crow__v"><small>' + label + "</small>" + valueHtml + "</div>" +
      '<button class="copy" type="button" data-copy="' + esc(raw) + '" aria-label="Copy ' + label.toLowerCase() + '">' + ic("copy:r") + "</button></div>";
  }

  /* ---------- QR page ---------- */
  function renderQR() {
    var defUrl = new URL("./", location.href).href;
    var note0 = "Press and hold the image (phone) or right-click it (computer) to save it.";
    app.innerHTML =
      '<header class="topbar"><div class="wrap topbar__in">' + brand() +
        '<a class="toplink" href="index.html">' + ic("arrow-left:r") + "All Candidates</a></div></header>" +
      '<main id="main">' +
        '<section class="qr-hero blueprint"><div class="wrap">' +
          '<span class="eyebrow">' + ic("qr-code") + "Scan code for voters</span>" +
          "<h1>Panel QR Code</h1>" +
          "<p>Make a QR code from the website address. Print it on posters, leaflets or banners, and voters can scan it with their phone camera to see every candidate's profile.</p>" +
        "</div></section>" +
        '<div class="wrap qr-grid">' +
          '<section class="block">' +
            '<h2 class="block__title">' + ic("link") + "Website Address</h2>" +
            '<form id="qr-form" class="field" novalidate>' +
              '<label for="qr-url">Link inside the QR code</label>' +
              '<input id="qr-url" name="qr-url" type="url" inputmode="url" autocomplete="url" spellcheck="false" value="' + esc(defUrl) + '">' +
              "<small>Once the site is hosted, enter your domain, for example https://www.yourdomain.com/</small>" +
              '<label class="check" for="qr-dots"><input id="qr-dots" type="checkbox"> Rounded-dot style (softer look, but some older scanner apps may not read it)</label>' +
              '<div class="qr-actions"><button class="btn" type="submit">' + ic("qr-code") + 'Generate QR</button>' +
              '<a class="btn btn--ghost" id="qr-dl" href="#" download="young-engineers-connect-qr.png">' + ic("download-simple:r") + "Download PNG</a></div>" +
            "</form>" +
            '<ol class="steps"><li>Host the website (any static hosting works).</li><li>Enter the site address above and generate the QR code.</li><li>Download the image and scan it once with your own phone before printing.</li></ol>' +
          "</section>" +
          '<section class="block qr-out" aria-live="polite"><img id="qr-img" alt="QR code for the Young Engineers Connect panel website"><p id="qr-note">' + note0 + "</p></section>" +
        "</div>" +
      "</main>" + footer();

    var form = document.getElementById("qr-form");
    var input = document.getElementById("qr-url");
    var img = document.getElementById("qr-img");
    var dl = document.getElementById("qr-dl");
    var note = document.getElementById("qr-note");
    function go() {
      var url = (input.value || "").trim();
      if (!url) { note.className = "qr-err"; note.textContent = "Enter the website address first."; return; }
      if (typeof window.qrcode !== "function") { note.className = "qr-err"; note.textContent = "The QR library didn't load. Check your internet connection and reload the page."; return; }
      drawQR(url, !document.getElementById("qr-dots").checked).then(function (canvas) {
        var data = canvas.toDataURL("image/png");
        img.src = data;
        dl.href = data;
        note.className = "";
        note.textContent = note0;
      });
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); go(); });
    document.getElementById("qr-dots").addEventListener("change", go);
    go();
  }

  function drawQR(url, square) {
    var fontsReady = (document.fonts && document.fonts.load)
      ? Promise.all([document.fonts.load('800 60px "Archivo"'), document.fonts.load('600 30px "Instrument Sans"'), document.fonts.load('500 24px "IBM Plex Mono"')]).catch(function () {})
      : Promise.resolve();
    return fontsReady.then(function () {
      var q = window.qrcode(0, "H");
      q.addData(url);
      q.make();
      var n = q.getModuleCount();
      var W = 1080, H = 1350;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var x = cv.getContext("2d");

      // background
      x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H);
      var g = x.createLinearGradient(0, 0, W, 360);
      g.addColorStop(0, "#172C6B"); g.addColorStop(.52, "#1F4FD1"); g.addColorStop(1, "#0AA5C7");
      x.fillStyle = g; x.fillRect(0, 0, W, 330);
      x.strokeStyle = "rgba(255,255,255,.08)"; x.lineWidth = 2;
      for (var gx = 0; gx <= W; gx += 60) { x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, 330); x.stroke(); }
      for (var gy = 0; gy <= 330; gy += 60) { x.beginPath(); x.moveTo(0, gy); x.lineTo(W, gy); x.stroke(); }

      drawLogo(x, W / 2, 102, 92, "#FFFFFF");
      x.textAlign = "center"; x.fillStyle = "#FFFFFF";
      x.font = '800 66px "Archivo", "Helvetica Neue", Arial, sans-serif';
      x.fillText(P.name, W / 2, 228);
      x.font = '600 32px "Instrument Sans", "Helvetica Neue", Arial, sans-serif';
      x.fillStyle = "#F7C95C";
      x.fillText(P.election, W / 2, 284);

      // QR body
      var box = 760, quiet = 4, cell = box / (n + quiet * 2);
      var ox = (W - box) / 2, oy = 390;
      x.fillStyle = "#FFFFFF";
      roundRect(x, ox - 12, oy - 12, box + 24, box + 24, 36); x.fill();
      x.strokeStyle = "#DCE3EE"; x.lineWidth = 3; x.stroke();
      var qg = x.createLinearGradient(ox, oy, ox + box, oy + box);
      qg.addColorStop(0, "#0F2259"); qg.addColorStop(1, "#1B47C2");
      x.fillStyle = qg;
      function inFinder(r, c) {
        return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
      }
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
        if (!q.isDark(r, c) || inFinder(r, c)) continue;
        if (square) { x.fillRect(Math.floor(ox + (c + quiet) * cell), Math.floor(oy + (r + quiet) * cell), Math.ceil(cell) + 1, Math.ceil(cell) + 1); continue; }
        roundRect(x, ox + (c + quiet) * cell + cell * .05, oy + (r + quiet) * cell + cell * .05, cell * .9, cell * .9, cell * .24);
        x.fill();
      }
      var rr = square ? 0 : 1;
      [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (p) {
        var fx = ox + (p[1] + quiet) * cell, fy = oy + (p[0] + quiet) * cell;
        x.fillStyle = qg; roundRect(x, fx, fy, cell * 7, cell * 7, cell * 1.9 * rr); x.fill();
        x.fillStyle = "#FFFFFF"; roundRect(x, fx + cell, fy + cell, cell * 5, cell * 5, cell * 1.3 * rr); x.fill();
        x.fillStyle = qg; roundRect(x, fx + cell * 2, fy + cell * 2, cell * 3, cell * 3, cell * .9 * rr); x.fill();
      });
      // centre badge
      var b = box * .2, bx = W / 2 - b / 2, by = oy + box / 2 - b / 2;
      x.fillStyle = "#FFFFFF"; roundRect(x, bx - 8, by - 8, b + 16, b + 16, 28); x.fill();
      var bg = x.createLinearGradient(bx, by, bx + b, by + b);
      bg.addColorStop(0, "#172C6B"); bg.addColorStop(1, "#1F4FD1");
      x.fillStyle = bg; roundRect(x, bx, by, b, b, 22); x.fill();
      drawLogo(x, W / 2, oy + box / 2, b * .66, "#FFFFFF");

      // caption
      x.textAlign = "center";
      x.fillStyle = "#0C1A35";
      x.font = '700 44px "Archivo", "Helvetica Neue", Arial, sans-serif';
      x.fillText("Scan to meet the candidates", W / 2, 1236);
      x.fillStyle = "#55657F";
      x.font = '500 24px "IBM Plex Mono", monospace';
      var shown = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
      if (shown.length > 58) shown = shown.slice(0, 55) + "…";
      x.fillText(shown, W / 2, 1290);
      return cv;
    });
  }
  function roundRect(x, X, Y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    if (r <= 0) { x.beginPath(); x.rect(X, Y, w, h); return; }
    x.beginPath();
    x.moveTo(X + r, Y);
    x.arcTo(X + w, Y, X + w, Y + h, r);
    x.arcTo(X + w, Y + h, X, Y + h, r);
    x.arcTo(X, Y + h, X, Y, r);
    x.arcTo(X, Y, X + w, Y, r);
    x.closePath();
  }
  function drawLogo(x, cx, cy, size, color) {
    var s = size / 48;
    x.save();
    x.translate(cx - 24 * s, cy - 24 * s);
    x.scale(s, s);
    x.strokeStyle = color; x.fillStyle = color; x.lineJoin = "round";
    x.lineWidth = 3;
    x.beginPath(); x.moveTo(24, 3.5); x.lineTo(41.75, 13.75); x.lineTo(41.75, 34.25); x.lineTo(24, 44.5); x.lineTo(6.25, 34.25); x.lineTo(6.25, 13.75); x.closePath(); x.stroke();
    x.globalAlpha = .55; x.lineWidth = 2.2;
    x.beginPath(); x.moveTo(24, 15.5); x.lineTo(15.8, 29.5); x.lineTo(32.2, 29.5); x.closePath(); x.stroke();
    x.globalAlpha = 1;
    [[24, 15.5], [15.8, 29.5], [32.2, 29.5]].forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], 3.6, 0, Math.PI * 2); x.fill(); });
    x.restore();
  }

  /* ---------- boot ---------- */
  var page = app.getAttribute("data-page");
  if (page === "candidate") renderCandidate(app.getAttribute("data-candidate"));
  else if (page === "qr") renderQR();
  else renderHome();
})();
