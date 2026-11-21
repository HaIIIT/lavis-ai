export async function loadHTML(targetSelector, filePath) {
  const url = new URL(window.location.href);

  if (url.searchParams.has("utm_source")) {
    url.searchParams.delete("utm_source");
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }
  const container = document.querySelector(targetSelector);
  if (!container) return;
  const res = await fetch(filePath);
  if (!res.ok)
    throw new Error(`Không thể tải ${filePath} (HTTP ${res.status})`);
  container.innerHTML = await res.text();
}
export function loadPageStyle(cssPath, id = "page-style") {
  let link = document.getElementById(id);
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = cssPath;
}
export async function runPageScript(jsPath) {
  const mod = await import(`${jsPath}?v=${Date.now()}`);
  if (typeof mod.init === "function") mod.init();
}
