// Interacciones mínimas: tema claro/oscuro, menú móvil y año del pie. Sin dependencias.
(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

  themeButton?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("tema", next);
    } catch {
      // Modo privado o almacenamiento bloqueado: el cambio aplica solo a esta visita.
    }
  });

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
