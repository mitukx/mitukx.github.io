async function initGallery() {
  const carousels = Array.from(document.querySelectorAll(".photo-carousel[data-gallery]"));
  if (!carousels.length) return;


  const fallbackGalleries = {
    eats: [
      {
        src: "assets/extra/eats-1.jpg",
        alt: "Unagi meal photo",
        caption: "unagi"
      },
      {
        src: "assets/extra/eats-2.jpg",
        alt: "Gyutan set meal photo",
        caption: "gyutan"
      },
      {
        src: "assets/extra/eats-3.jpg",
        alt: "Ramen photo",
        caption: "ramen"
      }
    ]
  };

  let galleries = fallbackGalleries;
  try {
    const response = await fetch("assets/extra-gallery.json", { cache: "no-store" });
    if (response.ok) {
      const json = await response.json();
      galleries = { ...fallbackGalleries, ...json };
    }
  } catch (error) {
    galleries = fallbackGalleries;
  }

  function setPhoto(carousel, items, index) {
    const img = carousel.querySelector("img");
    const fallback = carousel.querySelector(".gallery-fallback");
    const caption = carousel.querySelector(".gallery-caption");
    const count = carousel.querySelector(".gallery-count");
    const current = items[index];

    if (!current || !img) return;

    img.classList.remove("is-loaded");
    img.src = current.src || "";
    img.alt = current.alt || "Extra photo";

    if (caption) caption.textContent = current.caption || "photo";
    if (count) count.textContent = `${index + 1} / ${items.length}`;

    img.onload = () => {
      img.classList.add("is-loaded");
      if (fallback) fallback.hidden = true;
    };

    img.onerror = () => {
      img.classList.remove("is-loaded");
      if (fallback) {
        fallback.hidden = false;
        fallback.textContent = `Add ${current.src || "your photo"}`;
      }
    };
  }

  carousels.forEach((carousel) => {
    const key = carousel.dataset.gallery;
    const items = Array.isArray(galleries[key]) && galleries[key].length
      ? galleries[key]
      : [{ src: "", alt: "Extra photo", caption: key }];

    let index = 0;
    setPhoto(carousel, items, index);

    const prev = carousel.querySelector(".gallery-prev");
    const next = carousel.querySelector(".gallery-next");

    if (items.length <= 1) {
      if (prev) prev.disabled = true;
      if (next) next.disabled = true;
      return;
    }

    if (prev) {
      prev.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        setPhoto(carousel, items, index);
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        index = (index + 1) % items.length;
        setPhoto(carousel, items, index);
      });
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGallery);
} else {
  initGallery();
}
