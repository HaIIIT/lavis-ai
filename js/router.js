import { loadHTML, loadPageStyle, runPageScript } from "./loader.js";

const routes = {
  "/": "product",
  "/trang-chu": "product",
  "/gioi-thieu": "about",
};

const pageConfig = {
  product: {
    html: "/html/product.html",
    css: "/css/product.css",
    js: "/js/product.js",
    title:
      "LAVIS AI — Giải pháp công nghệ xanh trong canh tác xà lách thủy canh",
  },
  about: {
    html: "/html/about.html",
    css: "/css/about.css",
    js: "/js/about.js",
    title: "Về LAVIS AI — Lettuce AI Vision System",
  },
};

export function getRouteKey(pathname) {
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  return routes[cleanPath] || "product";
}

function updateActiveNav(activeKey) {
  document.querySelectorAll("[data-route]").forEach((el) => {
    el.classList.toggle("active", el.dataset.route === activeKey);
  });
}

function handleHashScroll(hash) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.querySelector(hash);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

export async function renderRoute(
  pathname = window.location.pathname,
  hash = window.location.hash,
) {
  const key = getRouteKey(pathname);
  const cfg = pageConfig[key];

  document.title = cfg.title;
  loadPageStyle(cfg.css);

  try {
    await loadHTML("#app", cfg.html);
    await runPageScript(cfg.js);
    updateActiveNav(key);

    if (window.lucide) window.lucide.createIcons();

    requestAnimationFrame(() => handleHashScroll(hash));
  } catch (err) {
    const app = document.getElementById("app");

    if (app) {
      app.innerHTML = `
        <div class="container">
          <div class="error-box">
            <strong>Không thể tải trang.</strong>
            Vui lòng chạy dự án qua Live Server hoặc local web server.
          </div>
        </div>`;
    }

    console.error(err);
  }
}

export function navigateTo(url) {
  const targetUrl = new URL(url, window.location.origin);

  if (targetUrl.pathname !== window.location.pathname) {
    window.history.pushState(
      {},
      "",
      targetUrl.pathname + targetUrl.search + targetUrl.hash,
    );

    renderRoute(targetUrl.pathname, targetUrl.hash);
  } else if (targetUrl.hash) {
    window.history.pushState(
      {},
      "",
      targetUrl.pathname + targetUrl.search + targetUrl.hash,
    );

    handleHashScroll(targetUrl.hash);
  } else {
    window.history.pushState({}, "", targetUrl.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function initRouter() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;

    e.preventDefault();
    navigateTo(link.getAttribute("href"));
  });

  window.addEventListener("popstate", () => {
    renderRoute(window.location.pathname, window.location.hash);
  });

  renderRoute(window.location.pathname, window.location.hash);
}
