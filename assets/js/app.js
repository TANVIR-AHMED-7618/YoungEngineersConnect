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
  function photo(c, eager) {
    var html = '<div class="ph" aria-hidden="true">' + ic("user:f") + "</div>";
    if (c.photo) {
      html += '<img src="' + esc(c.photo) + '" alt="Photo of ' + esc(c.name) + '"' + (eager ? "" : ' loading="lazy" decoding="async"') + '>';
    }
    return html;
  }
  function roleOf(c) { return ROLE[c.role] || ROLE.member; }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }
  var YEC_LOGO = '<img class="yec-logo" src="assets/img/yec-logo.png" alt="Young Engineers Connect" width="578" height="223">';
  function brand() {
    return '<a class="brand" href="index.html" aria-label="Young Engineers Connect home page">' + YEC_LOGO + "</a>";
  }
  function iebBadge() {
    return '<div class="ieb"><span class="ieb__seal"><img src="assets/img/ieb-logo.png" alt="The Institution of Engineers, Bangladesh logo" width="320" height="320"></span>' +
      '<span class="ieb__text">' + esc(P.election) + "</span></div>";
  }
  function footer() {
    var links = "";
    if (P.contactPhone) links += '<a href="tel:' + esc(P.contactPhone.replace(/[^+\d]/g, "")) + '">' + ic("phone") + '<span class="mono">' + esc(P.contactPhone) + "</span></a>";
    if (P.contactEmail) links += '<a href="mailto:' + esc(P.contactEmail) + '">' + ic("envelope-simple") + "<span>" + esc(P.contactEmail) + "</span></a>";
    links += '<a href="qr.html">' + ic("qr-code") + "<span>Panel QR code</span></a>";
    return '<footer class="footer"><div class="wrap">' +
      '<div class="footer__grid">' +
        '<div class="footer__about"><span class="brand brand--footer">' + YEC_LOGO + "</span><p>" + esc(P.slogan) + ". Vote for all " + C.length + " candidates of the panel in the " + esc(P.election) + ".</p></div>" +
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
  function card(c, variant, n) {
    var r = roleOf(c);
    return '<article class="card card--' + variant + " card--role-" + c.role + '" style="--n:' + n + '">' +
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
    var top = ["president", "vice-president", "secretary"].map(function (r) {
      return C.filter(function (c) { return c.role === r; })[0];
    }).filter(Boolean);
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
          '<h1 class="mast__logo">' + YEC_LOGO + "</h1>" +
          iebBadge() +
          (facts ? '<ul class="mast__facts">' + facts + "</ul>" : "") +
        "</div>" +
        '<span class="mast__line" aria-hidden="true"></span>' +
      "</header>" +
      '<main id="main">' +
        '<section class="panel wrap" aria-label="Panel candidates">' +
          '<p class="tier-label">President · Vice-President · Secretary</p>' +
          '<div class="tier tier--top">' + top.map(function (c) { return card(c, c.role === "president" ? "lead" : "pair", n++); }).join("") + "</div>" +
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
    var src = P.qrImage || "assets/img/panel-qr.jpg";
    app.innerHTML =
      '<header class="topbar"><div class="wrap topbar__in">' + brand() +
        '<a class="toplink" href="index.html">' + ic("arrow-left:r") + "All Candidates</a></div></header>" +
      '<main id="main">' +
        '<section class="qr-hero blueprint"><div class="wrap">' +
          '<span class="eyebrow">' + ic("qr-code") + "Scan code for voters</span>" +
          "<h1>Panel QR Code</h1>" +
          "<p>Scan the code with your phone camera, or save the poster to share it.</p>" +
        "</div></section>" +
        '<div class="wrap qr-wrap">' +
          '<figure class="qr-poster">' +
            '<a href="' + esc(src) + '" target="_blank" rel="noopener"><img src="' + esc(src) + '" alt="Young Engineers Connect panel QR code poster for the IEB Election 2027-28" width="1400" height="1857"></a>' +
            '<figcaption class="qr-actions">' +
              '<a class="btn" href="' + esc(src) + '" download="Young-Engineers-Connect-Panel-QR.jpg">' + ic("download-simple:r") + "Download Poster</a>" +
              '<a class="btn btn--ghost" href="' + esc(src) + '" target="_blank" rel="noopener">' + ic("arrow-up-right:r") + "Open Full Size</a>" +
            "</figcaption>" +
          "</figure>" +
        "</div>" +
      "</main>" + footer();
  }

  /* ---------- boot ---------- */
  var page = app.getAttribute("data-page");
  if (page === "candidate") renderCandidate(app.getAttribute("data-candidate"));
  else if (page === "qr") renderQR();
  else renderHome();
})();
