// Client-side navigation: swap only the right-hand <main> content when moving
// between pages, so the sidebar and its background animation are never reset.
// Falls back to normal full-page navigation if anything goes wrong (e.g. when
// opened via file:// where fetch() is blocked).
(() => {
  if (!document.querySelector(".page-shell")) return;

  // Scripts that live on the sidebar / drive navigation must NOT be re-run,
  // otherwise the persistent animation would restart.
  const PERSIST = ["network.js", "spa-nav.js"];

  const pageName = (url) =>
    new URL(url, location.href).pathname.split("/").pop() || "index.html";

  function isInternalLink(a) {
    if (!a) return false;
    const href = a.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return false;
    if (a.target === "_blank") return false;
    try {
      const u = new URL(href, location.href);
      return u.origin === location.origin && u.pathname.endsWith(".html");
    } catch (_) {
      return false;
    }
  }

  function resetScroll() {
    const m = document.querySelector("main.content");
    if (m) m.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function runPageScripts(doc) {
    document
      .querySelectorAll("script[data-spa-script]")
      .forEach((s) => s.remove());

    doc.querySelectorAll("script[src]").forEach((s) => {
      const src = s.getAttribute("src") || "";
      if (PERSIST.some((p) => src.includes(p))) return;
      const el = document.createElement("script");
      el.src = src;
      el.setAttribute("data-spa-script", "");
      document.body.appendChild(el);
    });
  }

  function applyPageStyles(doc) {
    document
      .querySelectorAll("style[data-spa-style]")
      .forEach((s) => s.remove());
    doc.querySelectorAll("head style").forEach((s) => {
      const clone = s.cloneNode(true);
      clone.setAttribute("data-spa-style", "");
      document.head.appendChild(clone);
    });
  }

  function updateActiveNav(url) {
    const target = pageName(url);
    document.querySelectorAll(".nav a").forEach((a) => {
      a.classList.toggle("active", pageName(a.getAttribute("href")) === target);
    });
  }

  async function load(url, push) {
    let html;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("bad status");
      html = await res.text();
    } catch (_) {
      location.href = url; // graceful fallback
      return;
    }

    const doc = new DOMParser().parseFromString(html, "text/html");
    const newMain = doc.querySelector("main.content");
    const curMain = document.querySelector("main.content");
    if (!newMain || !curMain) {
      location.href = url;
      return;
    }

    curMain.replaceWith(newMain);
    if (doc.title) document.title = doc.title;
    applyPageStyles(doc);
    updateActiveNav(url);
    runPageScripts(doc);

    if (push) history.pushState({ spa: true }, "", url);
    resetScroll();
  }

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const a = e.target.closest("a");
    if (!isInternalLink(a)) return;

    e.preventDefault();
    const url = a.getAttribute("href");
    if (pageName(url) === pageName(location.href)) {
      resetScroll();
      return;
    }
    load(url, true);
  });

  window.addEventListener("popstate", () => {
    load(pageName(location.href), false);
  });
})();
