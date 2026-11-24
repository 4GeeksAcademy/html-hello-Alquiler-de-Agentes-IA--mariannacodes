const sectionTitles = {
  dashboard: "Dashboard",
  usuarios: "Gestión de usuarios",
  agentes: "Gestión de agentes",
  skills: "Skills",
  contrataciones: "Contrataciones de agentes",
  errores: "Log de errores",
};

const navigationLinks = document.querySelectorAll("[data-section]");
const sections = document.querySelectorAll("main section");
const pageTitle = document.querySelector("#page-title");

navigationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const sectionId = link.dataset.section;
    const activeSection = document.getElementById(sectionId);

    if (!activeSection) return;

    sections.forEach((section) => {
      section.classList.toggle("hidden", section.id !== sectionId);
    });

    navigationLinks.forEach((navigationLink) => {
      const isActive = navigationLink === link;
      navigationLink.classList.toggle("bg-indigo-50", isActive);
      navigationLink.classList.toggle("text-indigo-700", isActive);
      navigationLink.classList.toggle("dark:bg-indigo-950/50", isActive);
      navigationLink.classList.toggle("dark:text-indigo-300", isActive);
      navigationLink.classList.toggle("text-slate-600", !isActive);
      navigationLink.classList.toggle("dark:text-slate-400", !isActive);

      if (isActive) {
        navigationLink.setAttribute("aria-current", "page");
      } else {
        navigationLink.removeAttribute("aria-current");
      }
    });

    pageTitle.textContent = sectionTitles[sectionId];
  });
});

const themeToggle = document.querySelector("#theme-toggle");
const themeStorageKey = "agenthub-theme";
const savedTheme = localStorage.getItem(themeStorageKey);

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
});
