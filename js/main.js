import { loadHTML } from "./loader.js";
import { initRouter } from "./router.js";
import { initNavbar } from "/component/navbar.js";

async function bootstrap() {
  await Promise.all([
    loadHTML("#navbar", "/component/navbar.html"),
    loadHTML("#footer", "/component/footer.html")
  ]);
  initNavbar();
  initRouter();
  if (window.lucide) window.lucide.createIcons();
}
bootstrap();
