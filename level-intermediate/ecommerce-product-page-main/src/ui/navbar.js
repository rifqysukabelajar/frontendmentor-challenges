export function initNavbar() {
  const navOpen = document.querySelector(".navbar-open-btn");
  const navMenu = document.querySelector(".navbar-menu");
  const navClose = document.querySelector(".navbar-close-btn");
  const overlay = document.querySelector(".navbar-overlay");

  if (!navOpen || !navMenu) return;

  function openNav() {
    navMenu.classList.add("is-open");
    overlay?.classList.add("is-visible");
    navOpen.setAttribute("aria-expanded", "true");
    navOpen.style.display = "none";
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navMenu.classList.remove("is-open");
    overlay?.classList.remove("is-visible");
    navOpen.style.display = "block";
    navOpen.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  navOpen.addEventListener("click", () => openNav());
  navClose.addEventListener("click", () => closeNav());

  overlay?.addEventListener("click", closeNav);
}

export function initNavbarHeight() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const setHeight = () => {
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navbar.offsetHeight}px`,
    );
  };

  setHeight();

  window.addEventListener("resize", setHeight);

  const observer = new ResizeObserver(setHeight);
  observer.observe(navbar);
}
