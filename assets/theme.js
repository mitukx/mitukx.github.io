(() => {
  // Use a fresh key so older dark-mode test preferences do not override
  // the intended white default on the next visit.
  const STORAGE_KEY = "site-theme-v2";
  const THEMES = ["light", "dark", "black"];
  const THEME_ICONS = {
    light: "☼",
    dark: "◐",
    black: "●",
  };
  const savedTheme = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  })();

  const initialTheme = THEMES.includes(savedTheme) ? savedTheme : "light";
  document.documentElement.dataset.theme = initialTheme;

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) return;
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      // Theme switching still works when storage is unavailable.
    }

    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      const label = theme.charAt(0).toUpperCase() + theme.slice(1);
      toggle.textContent = THEME_ICONS[theme];
      toggle.setAttribute("aria-label", `Current color theme: ${label}. Click to change.`);
      toggle.title = `Current color theme: ${label}. Click to change.`;
    }
  }

  function initThemeControls() {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle && toggle.dataset.themeBound !== "true") {
      toggle.dataset.themeBound = "true";
      toggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme || initialTheme;
        const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
        applyTheme(THEMES[nextIndex]);
      });
    }
    applyTheme(document.documentElement.dataset.theme || initialTheme);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeControls, { once: true });
  } else {
    initThemeControls();
  }
})();
