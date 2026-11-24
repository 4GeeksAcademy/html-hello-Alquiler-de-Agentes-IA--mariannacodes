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
const agentsList = document.querySelector("#agents-list");
const skillsCatalog = document.querySelector("#skills-catalog");
const contractsTableBody = document.querySelector("#contracts-table-body");
const errorsTableBody = document.querySelector("#errors-table-body");
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

function renderAgents() {
  agentsList.innerHTML = DATA.agentes.map((agente, index) => {
    const statusClasses = agente.estado === "Activo"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
      : agente.estado === "Fallando"
        ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800"
        : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

    return `
      <li class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" data-agent-index="${index}">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">${agente.nombre}</h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">Propietario: ${agente.propietario}</p>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses}">${agente.estado}</span>
            <div class="relative inline-block text-left">
              <button type="button" class="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950" aria-label="Acciones para ${agente.nombre}" aria-expanded="false" data-dropdown-trigger><span aria-hidden="true">⋮</span></button>
              <div class="absolute right-0 z-30 mt-2 hidden min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900" data-dropdown-menu>
                <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400" data-action="configure" data-entity="agent">Configurar</button>
                <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400" data-action="delete" data-entity="agent">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800/70">
          <button type="button" class="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-400" aria-expanded="false" data-skills-toggle>
            Skills (${agente.skills.length})
            <svg class="size-4 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-chevron><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-in-out" data-skills-panel>
            <div class="overflow-hidden"><ul class="mt-3 flex flex-wrap gap-2">${agente.skills.map((skill) => `<li class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">${skill}</li>`).join("")}</ul></div>
          </div>
        </div>
      </li>`;
  }).join("");
}

function showAgentConfig(agente) {
  const content = document.createDocumentFragment();
  const name = document.createElement("p");
  name.className = "font-medium text-slate-900 dark:text-slate-100";
  name.textContent = agente.nombre;
  const label = document.createElement("label");
  label.htmlFor = "agent-prompt";
  label.className = "block text-sm font-medium text-slate-700 dark:text-slate-300";
  label.textContent = "Prompt de sistema";
  const textarea = document.createElement("textarea");
  textarea.id = "agent-prompt";
  textarea.rows = 6;
  textarea.value = agente.prompt;
  textarea.className = "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:ring-indigo-400";
  content.append(name, label, textarea);
  openModal("Configurar agente", content);
}

function toggleAgentSkills(button) {
  const panel = button.nextElementSibling;
  const chevron = button.querySelector("[data-chevron]");
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  panel.classList.toggle("grid-rows-[0fr]", expanded);
  panel.classList.toggle("opacity-0", expanded);
  panel.classList.toggle("grid-rows-[1fr]", !expanded);
  panel.classList.toggle("opacity-100", !expanded);
  chevron.classList.toggle("rotate-180", !expanded);
}

function renderSkills() {
  skillsCatalog.innerHTML = DATA.skills.map((skill, index) => {
    const agentes = DATA.agentes.filter((agente) => agente.skills.includes(skill.nombre));
    return `
      <li class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" data-skill-index="${index}">
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">${skill.nombre}</h2>
          <div class="relative inline-block text-left">
            <button type="button" class="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950" aria-label="Acciones para ${skill.nombre}" aria-expanded="false" data-dropdown-trigger><span aria-hidden="true">⋮</span></button>
            <div class="absolute right-0 z-30 mt-2 hidden min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900" data-dropdown-menu>
              <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400" data-action="detail" data-entity="skill">Ver detalle</button>
              <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400" data-action="delete" data-entity="skill">Eliminar</button>
            </div>
          </div>
        </div>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">${skill.descripcion}</p>
        <dl class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
          <div><dt class="inline font-medium text-slate-700 dark:text-slate-300">Precio unitario: </dt><dd class="inline">${skill.precioUnitario} €</dd></div>
          <div><dt class="inline font-medium text-slate-700 dark:text-slate-300">Agentes: </dt><dd class="inline">${agentes.length}</dd></div>
        </dl>
      </li>`;
  }).join("");
}

function formatContractAmount(amount) {
  if (amount < 0) return `−${Math.abs(amount)} €`;
  return `${amount} €`;
}

function renderContracts() {
  contractsTableBody.innerHTML = DATA.contratos.map((contrato, index) => {
    const statusClasses = contrato.estado === "Activo"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
      : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

    return `
      <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800/70 dark:hover:bg-slate-800/70" data-contract-index="${index}">
        <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">${contrato.cliente}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300">${contrato.agente}</td>
        <td class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300"><ul class="space-y-1">${contrato.skills.map((skill) => `<li class="whitespace-nowrap">${skill.nombre} · <span class="tabular-nums">${skill.precio} €</span></li>`).join("")}</ul></td>
        <td class="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-700 dark:text-slate-300">${contrato.fechaInicio}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-700 dark:text-slate-300">${contrato.fechaFin}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300"><span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses}">${contrato.estado}</span></td>
        <td class="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-700 dark:text-slate-300">${formatContractAmount(contrato.subtotal)}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300">${contrato.cupon || "—"}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-700 dark:text-slate-300">${formatContractAmount(contrato.descuento)}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">${formatContractAmount(contrato.totalPagado)}</td>
        <td class="whitespace-nowrap px-4 py-3 text-right">
          <div class="relative inline-block text-left">
            <button type="button" class="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950" aria-label="Acciones para el contrato de ${contrato.cliente}" aria-expanded="false" data-dropdown-trigger><span aria-hidden="true">⋮</span></button>
            <div class="absolute right-0 z-30 mt-2 hidden min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900" data-dropdown-menu>
              <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400" data-action="detail" data-entity="contract">Ver detalle</button>
            </div>
          </div>
        </td>
      </tr>`;
  }).join("");
}

function showContractDetails(contrato) {
  const content = document.createDocumentFragment();
  const fields = [
    ["Cliente", contrato.cliente],
    ["Agente", contrato.agente],
    ["Estado", contrato.estado],
    ["Inicio", contrato.fechaInicio],
    ["Fin", contrato.fechaFin],
  ];
  fields.forEach(([label, value]) => {
    const row = document.createElement("p");
    const fieldLabel = document.createElement("span");
    fieldLabel.className = "font-medium text-slate-900 dark:text-slate-100";
    fieldLabel.textContent = `${label}: `;
    row.append(fieldLabel, document.createTextNode(value));
    content.append(row);
  });

  const skillsHeading = document.createElement("h3");
  skillsHeading.className = "font-medium text-slate-900 dark:text-slate-100";
  skillsHeading.textContent = "Skills contratadas";
  const skillsList = document.createElement("ul");
  skillsList.className = "list-disc space-y-1 pl-5";
  contrato.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nombre} · ${formatContractAmount(skill.precio)}`;
    skillsList.append(item);
  });
  content.append(skillsHeading, skillsList);

  const summary = [
    ["Subtotal", formatContractAmount(contrato.subtotal)],
    ["Cupón", contrato.cupon || "—"],
    ["Descuento", formatContractAmount(contrato.descuento)],
    ["Importe total pagado", formatContractAmount(contrato.totalPagado)],
  ];
  summary.forEach(([label, value], index) => {
    const row = document.createElement("p");
    if (index === summary.length - 1) row.className = "font-semibold text-slate-900 dark:text-slate-100";
    const fieldLabel = document.createElement("span");
    fieldLabel.className = "font-medium";
    fieldLabel.textContent = `${label}: `;
    row.append(fieldLabel, document.createTextNode(value));
    content.append(row);
  });
  openModal("Detalle de contratación", content);
}

function renderErrors() {
  errorsTableBody.innerHTML = DATA.errores.map((error, index) => {
    const severityClasses = error.gravedad === "Alta"
      ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800"
      : error.gravedad === "Media"
        ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800"
        : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    const statusClasses = error.estado === "Resuelto"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
    const neutralClasses = "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

    return `
      <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800/70 dark:hover:bg-slate-800/70" data-error-index="${index}">
        <td class="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-700 dark:text-slate-300">${error.timestamp}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">${error.agente}</td>
        <td class="whitespace-nowrap px-4 py-3 text-sm"><span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${neutralClasses}">${error.tipo}</span></td>
        <td class="whitespace-nowrap px-4 py-3 text-sm"><span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${severityClasses}">${error.gravedad}</span></td>
        <td class="whitespace-nowrap px-4 py-3 text-sm"><span data-error-status class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses}">${error.estado}</span></td>
        <td class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">${error.descripcion}</td>
        <td class="whitespace-nowrap px-4 py-3 text-right">
          <div class="relative inline-block text-left">
            <button type="button" class="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950" aria-label="Acciones para el error de ${error.agente} del ${error.timestamp}" aria-expanded="false" data-dropdown-trigger><span aria-hidden="true">⋮</span></button>
            <div class="absolute right-0 z-30 mt-2 hidden min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900" data-dropdown-menu>
              <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400" data-action="detail" data-entity="error">Ver detalle</button>
              <button type="button" class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-400" data-action="resolve" data-entity="error">Marcar como resuelto</button>
            </div>
          </div>
        </td>
      </tr>`;
  }).join("");
}

function showErrorDetails(error) {
  const content = document.createDocumentFragment();
  const fields = [
    ["Timestamp", error.timestamp],
    ["Agente", error.agente],
    ["Tipo", error.tipo],
    ["Gravedad", error.gravedad],
    ["Estado", error.estado],
    ["Descripción", error.descripcion],
  ];
  fields.forEach(([label, value]) => {
    const row = document.createElement("p");
    const fieldLabel = document.createElement("span");
    fieldLabel.className = "font-medium text-slate-900 dark:text-slate-100";
    fieldLabel.textContent = `${label}: `;
    row.append(fieldLabel, document.createTextNode(value));
    content.append(row);
  });
  const traceHeading = document.createElement("h3");
  traceHeading.className = "font-medium text-slate-900 dark:text-slate-100";
  traceHeading.textContent = "Traza completa";
  const trace = document.createElement("pre");
  trace.className = "overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300";
  trace.textContent = error.traza;
  content.append(traceHeading, trace);
  openModal("Detalle de error", content);
}

function showSkillDetails(skill) {
  const content = document.createDocumentFragment();
  const fields = [
    ["Descripción", skill.descripcion],
    ["Precio unitario", `${skill.precioUnitario} €`],
    ["Agentes que utilizan esta skill", DATA.agentes.filter((agente) => agente.skills.includes(skill.nombre)).map((agente) => agente.nombre).join(", ") || "Ninguno"],
  ];
  const name = document.createElement("p");
  name.className = "font-medium text-slate-900 dark:text-slate-100";
  name.textContent = skill.nombre;
  content.append(name);
  fields.forEach(([label, value]) => {
    const row = document.createElement("p");
    const fieldLabel = document.createElement("span");
    fieldLabel.className = "font-medium text-slate-900 dark:text-slate-100";
    fieldLabel.textContent = `${label}: `;
    row.append(fieldLabel, document.createTextNode(value));
    content.append(row);
  });
  openModal("Detalle de skill", content);
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
renderAgents();
renderSkills();
renderContracts();
renderErrors();

document.addEventListener("click", (event) => {
  const skillsToggle = event.target.closest("[data-skills-toggle]");
  if (skillsToggle) {
    toggleAgentSkills(skillsToggle);
    return;
  }

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
  if (actionButton.dataset.entity === "agent") {
    const card = actionButton.closest("li[data-agent-index]");
    if (!card) return;
    const agente = DATA.agentes[Number(card.dataset.agentIndex)];
    if (actionButton.dataset.action === "configure") {
      showAgentConfig(agente);
    } else if (actionButton.dataset.action === "delete") {
      card.remove();
    }
    return;
  }
  if (actionButton.dataset.entity === "skill") {
    const card = actionButton.closest("li[data-skill-index]");
    if (!card) return;
    const skill = DATA.skills[Number(card.dataset.skillIndex)];
    if (actionButton.dataset.action === "detail") {
      showSkillDetails(skill);
    } else if (actionButton.dataset.action === "delete") {
      card.remove();
    }
    return;
  }
  if (actionButton.dataset.entity === "contract") {
    const row = actionButton.closest("tr[data-contract-index]");
    if (!row) return;
    showContractDetails(DATA.contratos[Number(row.dataset.contractIndex)]);
    return;
  }
  if (actionButton.dataset.entity === "error") {
    const row = actionButton.closest("tr[data-error-index]");
    if (!row) return;
    const error = DATA.errores[Number(row.dataset.errorIndex)];
    if (actionButton.dataset.action === "detail") {
      showErrorDetails(error);
    } else if (actionButton.dataset.action === "resolve" && error.estado !== "Resuelto") {
      error.estado = "Resuelto";
      const status = row.querySelector("[data-error-status]");
      status.textContent = "Resuelto";
      status.className = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
    }
    return;
  }
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
