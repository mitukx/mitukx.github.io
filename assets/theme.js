(() => {
  const STORAGE_KEY = "kazuki-site-theme";
  const root = document.documentElement;
  const colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)");

  const readPreference = () => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved === "dark" || saved === "light" ? saved : null;
    } catch (_) {
      return null;
    }
  };

  let savedPreference = readPreference();
  let userHasChosen = savedPreference !== null;

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme;

    if (persist) {
      userHasChosen = true;
      savedPreference = theme;
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch (_) {
        // The current page can still use the selected theme when storage is unavailable.
      }
    }

    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    }
  };

  applyTheme(savedPreference || (colorScheme?.matches ? "dark" : "light"));

  colorScheme?.addEventListener?.("change", (event) => {
    if (!userHasChosen) applyTheme(event.matches ? "dark" : "light");
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.body || document.querySelector("[data-theme-toggle]")) return;

    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    toggle.type = "button";
    toggle.dataset.themeToggle = "";
    toggle.setAttribute("aria-label", "Dark mode");
    toggle.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
    toggle.title = root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    toggle.innerHTML = `
      <svg class="theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.6 8.6 0 1 0 20.2 15.4Z" />
      </svg>
      <svg class="theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
    `;

    toggle.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });

    document.body.append(toggle);
  });
})();
