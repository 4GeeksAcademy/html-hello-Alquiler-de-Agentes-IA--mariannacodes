const sectionTitles = {
  dashboard: "Dashboard",
  usuarios: "Gestión de usuarios",
  agentes: "Gestión de agentes",
  skills: "Skills",
  contrataciones: "Contrataciones de agentes",
  errores: "Log de errores",
};

const DATA = {
  usuarios: [
    { nombre: "Ana Torres", email: "ana.torres@example.com", plan: "Pro", estado: "Activo", fechaAlta: "2026-01-15" },
    { nombre: "Luis Gómez", email: "luis.gomez@example.com", plan: "Team", estado: "Activo", fechaAlta: "2026-02-03" },
    { nombre: "Marta Ruiz", email: "marta.ruiz@example.com", plan: "Starter", estado: "Suspendido", fechaAlta: "2026-03-21" },
    { nombre: "Diego Navarro", email: "diego.navarro@example.com", plan: "Pro", estado: "Activo", fechaAlta: "2026-04-12" },
    { nombre: "Sofía Vidal", email: "sofia.vidal@example.com", plan: "Enterprise", estado: "Activo", fechaAlta: "2026-05-08" },
  ],
  agentes: [
    { nombre: "Nexo Support", propietario: "Ana Torres", estado: "Activo", skills: ["Navegación web", "Lectura de documentos", "Gestión de calendario"], prompt: "Eres Nexo Support, un asistente de operaciones. Ayuda a los equipos a consultar información web, revisar documentos y organizar eventos con respuestas claras y verificables." },
    { nombre: "Atlas Finance", propietario: "Luis Gómez", estado: "Activo", skills: ["Lectura de documentos", "Envío de email"], prompt: "Eres Atlas Finance, un asistente especializado en operaciones financieras. Analiza documentos proporcionados por el usuario y prepara comunicaciones profesionales por email." },
    { nombre: "Lumen Research", propietario: "Marta Ruiz", estado: "Fallando", skills: ["Navegación web", "Lectura de documentos", "Envío de email"], prompt: "Eres Lumen Research, un asistente de investigación. Recopila información de fuentes web, sintetiza documentos y prepara resúmenes para el equipo." },
    { nombre: "Orion Scheduler", propietario: "Sofía Vidal", estado: "Inactivo", skills: ["Gestión de calendario"], prompt: "Eres Orion Scheduler, un asistente de planificación. Ayuda a coordinar reuniones, revisar disponibilidad y mantener organizados los calendarios del equipo." },
  ],
  skills: [
    { nombre: "Navegación web", descripcion: "Permite consultar y recopilar información de páginas web.", precioUnitario: 25, agentes: 2 },
    { nombre: "Lectura de documentos", descripcion: "Permite analizar documentos y extraer información relevante.", precioUnitario: 18, agentes: 3 },
    { nombre: "Gestión de calendario", descripcion: "Permite consultar disponibilidad y organizar eventos.", precioUnitario: 15, agentes: 2 },
    { nombre: "Envío de email", descripcion: "Permite preparar y enviar comunicaciones por correo electrónico.", precioUnitario: 12, agentes: 2 },
  ],
  contratos: [
    { cliente: "Ana Torres", agente: "Nexo Support", skills: [{ nombre: "Navegación web", precio: 25 }, { nombre: "Lectura de documentos", precio: 18 }, { nombre: "Gestión de calendario", precio: 15 }], fechaInicio: "2026-10-01", fechaFin: "2026-12-31", estado: "Activo", subtotal: 58, cupon: "BIENVENIDA10", descuento: -5, totalPagado: 53 },
    { cliente: "Luis Gómez", agente: "Atlas Finance", skills: [{ nombre: "Lectura de documentos", precio: 18 }, { nombre: "Envío de email", precio: 12 }], fechaInicio: "2026-11-01", fechaFin: "2027-01-31", estado: "Activo", subtotal: 30, cupon: "FIDELIDAD", descuento: -3, totalPagado: 27 },
    { cliente: "Marta Ruiz", agente: "Lumen Research", skills: [{ nombre: "Navegación web", precio: 25 }, { nombre: "Lectura de documentos", precio: 18 }, { nombre: "Envío de email", precio: 12 }], fechaInicio: "2026-06-01", fechaFin: "2026-08-31", estado: "Pasado", subtotal: 55, cupon: "—", descuento: 0, totalPagado: 55 },
    { cliente: "Sofía Vidal", agente: "Orion Scheduler", skills: [{ nombre: "Gestión de calendario", precio: 15 }], fechaInicio: "2026-10-15", fechaFin: "2026-12-15", estado: "Activo", subtotal: 15, cupon: "—", descuento: 0, totalPagado: 15 },
  ],
  errores: [
    { timestamp: "2026-11-23 09:14:32", agente: "Lumen Research", tipo: "Navegación", gravedad: "Alta", estado: "Abierto", descripcion: "La fuente web rechazó la conexión.", traza: "WebNavigator.fetch -> HttpClient.request -> ConnectionError: remote host refused connection" },
    { timestamp: "2026-11-22 16:42:11", agente: "Nexo Support", tipo: "Documentos", gravedad: "Media", estado: "Abierto", descripcion: "No se pudo extraer texto del archivo recibido.", traza: "DocumentReader.parse -> PdfExtractor.read -> UnsupportedFormatError: encrypted document" },
    { timestamp: "2026-11-21 11:08:54", agente: "Atlas Finance", tipo: "Email", gravedad: "Baja", estado: "Abierto", descripcion: "El envío quedó temporalmente en cola.", traza: "EmailSender.send -> MailQueue.enqueue -> TemporaryDeliveryError: retry scheduled" },
    { timestamp: "2026-11-20 14:26:09", agente: "Orion Scheduler", tipo: "Calendario", gravedad: "Alta", estado: "Abierto", descripcion: "El calendario del propietario no respondió.", traza: "CalendarManager.listEvents -> CalendarClient.get -> TimeoutError: request exceeded 10s" },
    { timestamp: "2026-11-19 10:37:45", agente: "Lumen Research", tipo: "Documentos", gravedad: "Media", estado: "Abierto", descripcion: "El documento contiene una estructura no reconocida.", traza: "DocumentReader.parse -> ContentAnalyzer.scan -> ParseError: invalid section structure" },
    { timestamp: "2026-11-18 08:51:20", agente: "Nexo Support", tipo: "Navegación", gravedad: "Baja", estado: "Abierto", descripcion: "La página solicitada devolvió una respuesta vacía.", traza: "WebNavigator.fetch -> ResponseParser.parse -> EmptyResponseError: no readable content" },
  ],
};

const usersTableBody = document.querySelector("#users-table-body");
const modal = document.querySelector("#app-modal");
const modalDialog = modal.querySelector('[role="dialog"]');
const modalTitle = document.querySelector("#modal-title");
const modalContent = document.querySelector("#modal-content");
const modalCloseButton = document.querySelector("#modal-close");

function renderUsers() {
  usersTableBody.innerHTML = DATA.usuarios.map((usuario, index) => {
    const statusClasses = usuario.estado === "Activo"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";

    return `
      <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800/70 dark:hover:bg-slate-800/70" data-user-index="${index}">
        <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">${usuario.nombre}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300">${usuario.email}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300">${usuario.plan}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300"><span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses}">${usuario.estado}</span></td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300">${usuario.fechaAlta}</td>
        <td class="whitespace-nowrap px-4 py-3 text-right">
          <div class="relative inline-block text-left">
            <button type="button" class="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950" aria-label="Acciones para ${usuario.nombre}" aria-expanded="false" data-dropdown-trigger>
              <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>
            </button>
            <div class="absolute right-0 z-30 mt-2 hidden min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900" data-dropdown-menu>
              <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800" data-action="detail" data-entity="user">Ver detalle</button>
              <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800" data-action="delete" data-entity="user">Eliminar</button>
            </div>
          </div>
        </td>
      </tr>`;
  }).join("");
}

function closeAllDropdowns() {
  document.querySelectorAll("[data-dropdown-menu]").forEach((menu) => menu.classList.add("hidden"));
  document.querySelectorAll("[data-dropdown-trigger]").forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
}

function openModal(title, content) {
  modalTitle.textContent = title;
  modalContent.replaceChildren();
  modalContent.append(content);
  modal.classList.remove("hidden");
  modal.classList.add("grid");
  modal.setAttribute("aria-hidden", "false");
  modalDialog.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("grid");
  modal.setAttribute("aria-hidden", "true");
}

function showUserDetails(usuario) {
  const fields = [
    ["Nombre", usuario.nombre],
    ["Email", usuario.email],
    ["Plan", usuario.plan],
    ["Estado", usuario.estado],
    ["Fecha de alta", usuario.fechaAlta],
  ];
  const content = document.createDocumentFragment();

  fields.forEach(([label, value]) => {
    const row = document.createElement("p");
    const fieldLabel = document.createElement("span");
    fieldLabel.className = "font-medium text-slate-900 dark:text-slate-100";
    fieldLabel.textContent = `${label}: `;
    row.append(fieldLabel, document.createTextNode(value));
    content.append(row);
  });

  openModal("Detalle de usuario", content);
}

renderUsers();

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-dropdown-trigger]");
  if (trigger) {
    const menu = trigger.nextElementSibling;
    const willOpen = menu.classList.contains("hidden");
    closeAllDropdowns();
    if (willOpen) {
      menu.classList.remove("hidden");
      trigger.setAttribute("aria-expanded", "true");
    }
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  closeAllDropdowns();
  if (actionButton.dataset.entity !== "user") return;

  const row = actionButton.closest("tr[data-user-index]");
  if (!row) return;
  const usuario = DATA.usuarios[Number(row.dataset.userIndex)];

  if (actionButton.dataset.action === "detail") {
    showUserDetails(usuario);
  } else if (actionButton.dataset.action === "delete") {
    row.remove();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-dropdown-trigger]") && !event.target.closest("[data-dropdown-menu]")) {
    closeAllDropdowns();
  }
});

modalCloseButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllDropdowns();
    if (!modal.classList.contains("hidden")) closeModal();
  }
});

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
