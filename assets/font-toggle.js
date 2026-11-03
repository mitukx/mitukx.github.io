(() => {
  const STORAGE_KEY = "site-font-mode";
  const savedMode = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  })();

  let fontMode = savedMode === "normal" ? "normal" : "minecraft";
  document.documentElement.dataset.fontMode = fontMode;

  function updateButton(button) {
    const useNormalFont = fontMode === "minecraft";
    button.textContent = useNormalFont ? "Normal font" : "Minecraft font";
    button.setAttribute("aria-label", useNormalFont ? "Switch to normal font" : "Switch to Minecraft fonts");
    button.setAttribute("aria-pressed", String(!useNormalFont));
  }

  const button = document.querySelector("[data-font-toggle]");
  if (!button) return;

  updateButton(button);
  button.addEventListener("click", () => {
    fontMode = fontMode === "minecraft" ? "normal" : "minecraft";
    document.documentElement.dataset.fontMode = fontMode;
    try {
      localStorage.setItem(STORAGE_KEY, fontMode);
    } catch (_) {
      // The toggle still works for the current page if storage is unavailable.
    }
    updateButton(button);
  });
})();
