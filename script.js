const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  menuToggle.classList.remove("is-active");
  navPanel.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
};

const toggleMenu = () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.classList.toggle("is-active", !isOpen);
  navPanel.classList.toggle("is-open", !isOpen);
  header.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
};

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=82",
    alt: "Sala de musculação com equipamentos modernos e iluminação industrial",
    caption: "Musculação organizada para treinos guiados e pesos livres."
  },
  {
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=82",
    alt: "Bancos, halteres e aparelhos em academia urbana",
    caption: "Equipamentos distribuídos para uma rotina objetiva."
  },
  {
    src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=82",
    alt: "Pessoa treinando com halteres em ambiente de academia",
    caption: "Treino acompanhado, com foco em técnica e consistência."
  },
  {
    src: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=82",
    alt: "Área de cardio com esteiras em academia moderna",
    caption: "Cardio disponível para aquecimento, resistência e saúde."
  },
  {
    src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=82",
    alt: "Treino funcional em espaço amplo de academia",
    caption: "Área funcional para mobilidade, estabilidade e movimento."
  }
];

const initGallery = () => {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const main = gallery.querySelector(".gallery-main");
  const image = gallery.querySelector("[data-gallery-image]");
  const caption = gallery.querySelector("[data-gallery-caption]");
  const thumbs = gallery.querySelector("[data-gallery-thumbs]");
  const prev = gallery.querySelector("[data-gallery-prev]");
  const next = gallery.querySelector("[data-gallery-next]");
  let currentIndex = 0;

  const render = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];

    main.classList.add("is-changing");
    window.setTimeout(() => main.classList.remove("is-changing"), 180);

    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.caption;

    thumbs.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.setAttribute("aria-current", String(buttonIndex === currentIndex));
    });
  };

  galleryItems.forEach((item, index) => {
    const button = document.createElement("button");
    const thumb = document.createElement("img");

    button.type = "button";
    button.className = "gallery-thumb";
    button.setAttribute("aria-label", `Ver imagem ${index + 1}: ${item.caption}`);
    thumb.src = item.src;
    thumb.alt = "";
    thumb.loading = "lazy";
    button.appendChild(thumb);
    button.addEventListener("click", () => render(index));
    thumbs.appendChild(button);
  });

  prev.addEventListener("click", () => render(currentIndex - 1));
  next.addEventListener("click", () => render(currentIndex + 1));

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") render(currentIndex - 1);
    if (event.key === "ArrowRight") render(currentIndex + 1);
  });

  render(0);
};

const initFaq = () => {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector("button");

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      item.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });
};

const initReveal = () => {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
};

menuToggle.addEventListener("click", toggleMenu);
navPanel.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});

setHeaderState();
initGallery();
initFaq();
initReveal();
