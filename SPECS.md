# SPECS.md — Panel de administración de AgentHub

## 1. Descripción del producto

AgentHub es una plataforma SaaS interna para que empresas alquilen agentes de inteligencia artificial preconfigurados. Cada agente puede equiparse con distintas skills, como navegar por la web, leer documentos, gestionar calendarios o enviar emails, y desplegarse para resolver tareas de negocio.

Este panel es la consola administrativa interna de AgentHub. Su usuario principal es una persona administradora de la plataforma, responsable de supervisar usuarios, agentes, skills disponibles, contratos de alquiler y errores de ejecución.

El prototipo utilizará datos hardcodeados y no tendrá conexión con APIs, bases de datos ni servicios externos, salvo la carga de Tailwind CSS desde CDN.

## 2. Stack y restricciones

- La aplicación tendrá un único `index.html` con las seis secciones del panel:
  - `dashboard`
  - `usuarios`
  - `agentes`
  - `skills`
  - `contrataciones`
  - `errores`
- Solo una sección será visible a la vez. La navegación entre secciones se gestionará con JavaScript.
- Cada enlace de la sidebar debe tener un atributo `data-section` cuyo valor coincida con el `id` de la sección que controla:
  - `data-section="dashboard"` para `<section id="dashboard">`
  - `data-section="usuarios"` para `<section id="usuarios">`
  - `data-section="agentes"` para `<section id="agentes">`
  - `data-section="skills"` para `<section id="skills">`
  - `data-section="contrataciones"` para `<section id="contrataciones">`
  - `data-section="errores"` para `<section id="errores">`
- El JavaScript debe leer `data-section`, mostrar la sección correspondiente y ocultar todas las demás.
- La sección activa debe indicarse visualmente en la sidebar.
- El enlace activo de la sidebar debe incluir `aria-current="page"`. Los enlaces no activos no deben conservar ese atributo.
- La lógica interactiva estará en un archivo `app.js`, cargado con `defer`.
- Se utilizará Tailwind CSS v4 exclusivamente mediante CDN:
  - `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`
- En el `<head>` se declarará la variante de modo oscuro mediante:

```html
<style type="text/tailwindcss">@custom-variant dark (&:where(.dark, .dark *));</style>
```

- El modo oscuro funcionará añadiendo o eliminando la clase `dark` del elemento `html`.
- El modo seleccionado:
  - Debe mantenerse al cambiar de sección.
  - Debe guardarse en `localStorage`.
  - Debe restaurarse al recargar la página.
- Toda la interactividad debe implementarse con JavaScript vanilla.
- No se permite React, Vue, Angular, Svelte, jQuery ni otras librerías JavaScript.
- No habrá backend, API, autenticación, login ni persistencia real de datos.
- No se crearán archivos CSS propios.
- No se utilizarán atributos `style` en línea.
- La estructura debe utilizar HTML semántico, incluyendo `header`, `nav`, `main`, `section`, `ul`, `li`, `table`, `thead`, `tbody` y `button`.
- Los modales pueden implementarse mediante `dialog` o mediante un contenedor con `role="dialog"`.
- Los botones que solo contengan un icono deben incluir `aria-label`.
- Los dropdowns y controles colapsables deben incluir y actualizar `aria-expanded`.
- Todos los elementos interactivos deben mostrar un estado de foco visible.
- El layout debe ser usable en escritorio y tablet, con un ancho mínimo de referencia de 768 px.
- Todos los datos serán inventados, coherentes y definidos directamente en el frontend.

## 3. Datos de referencia

Todos los listados y métricas deben utilizar estos mismos datos. No se deben duplicar nombres con variaciones entre secciones.

### 3.1 Usuarios

| Nombre | Email | Plan | Estado | Fecha de alta |
|---|---|---|---|---|
| Ana Torres | ana.torres@example.com | Pro | Activo | 2026-01-15 |
| Luis Gómez | luis.gomez@example.com | Team | Activo | 2026-02-03 |
| Marta Ruiz | marta.ruiz@example.com | Starter | Suspendido | 2026-03-21 |
| Diego Navarro | diego.navarro@example.com | Pro | Activo | 2026-04-12 |
| Sofía Vidal | sofia.vidal@example.com | Enterprise | Activo | 2026-05-08 |

### 3.2 Agentes

Los agentes deben mostrarse en Gestión de agentes como una lista semántica compuesta por un elemento `<ul>` y un `<li>` por agente.

| Nombre | Propietario | Estado | Skills asignadas | Prompt de sistema |
|---|---|---|---|---|
| Nexo Support | Ana Torres | Activo | Navegación web, Lectura de documentos, Gestión de calendario | Eres Nexo Support, un asistente de operaciones. Ayuda a los equipos a consultar información web, revisar documentos y organizar eventos con respuestas claras y verificables. |
| Atlas Finance | Luis Gómez | Activo | Lectura de documentos, Envío de email | Eres Atlas Finance, un asistente especializado en operaciones financieras. Analiza documentos proporcionados por el usuario y prepara comunicaciones profesionales por email. |
| Lumen Research | Marta Ruiz | Fallando | Navegación web, Lectura de documentos, Envío de email | Eres Lumen Research, un asistente de investigación. Recopila información de fuentes web, sintetiza documentos y prepara resúmenes para el equipo. |
| Orion Scheduler | Sofía Vidal | Inactivo | Gestión de calendario | Eres Orion Scheduler, un asistente de planificación. Ayuda a coordinar reuniones, revisar disponibilidad y mantener organizados los calendarios del equipo. |

Los nombres anteriores deben repetirse exactamente en Gestión de agentes, Contrataciones de agentes y Log de errores.

### 3.3 Skills

| Nombre | Descripción | Precio unitario | Agentes que la utilizan |
|---|---|---:|---:|
| Navegación web | Permite consultar y recopilar información de páginas web. | 25 EUR | 2 |
| Lectura de documentos | Permite analizar documentos y extraer información relevante. | 18 EUR | 3 |
| Gestión de calendario | Permite consultar disponibilidad y organizar eventos. | 15 EUR | 2 |
| Envío de email | Permite preparar y enviar comunicaciones por correo electrónico. | 12 EUR | 2 |

Los contadores se calculan a partir de las skills asignadas a los agentes:

- Navegación web: Nexo Support y Lumen Research.
- Lectura de documentos: Nexo Support, Atlas Finance y Lumen Research.
- Gestión de calendario: Nexo Support y Orion Scheduler.
- Envío de email: Atlas Finance y Lumen Research.

Una skill en AgentHub es una capacidad modular que puede habilitarse en un agente para ampliar las tareas que puede realizar.

### 3.4 Contratos

El subtotal de cada contrato es la suma de los precios individuales de sus skills antes de aplicar descuentos.

El descuento representa la cantidad monetaria aplicada por el cupón. El importe total pagado se calcula así:

`Importe total pagado = Subtotal − Descuento`

| Cliente | Agente alquilado | Skills contratadas | Fecha de inicio | Fecha de fin | Estado | Subtotal | Cupón | Descuento | Importe total pagado |
|---|---|---|---|---|---|---:|---|---:|---:|
| Ana Torres | Nexo Support | Navegación web: 25 EUR; Lectura de documentos: 18 EUR; Gestión de calendario: 15 EUR | 2026-10-01 | 2026-12-31 | Activo | 58 EUR | BIENVENIDA10 | −5 EUR | 53 EUR |
| Luis Gómez | Atlas Finance | Lectura de documentos: 18 EUR; Envío de email: 12 EUR | 2026-11-01 | 2027-01-31 | Activo | 30 EUR | FIDELIDAD | −3 EUR | 27 EUR |
| Marta Ruiz | Lumen Research | Navegación web: 25 EUR; Lectura de documentos: 18 EUR; Envío de email: 12 EUR | 2026-06-01 | 2026-08-31 | Pasado | 55 EUR | — | 0 EUR | 55 EUR |
| Sofía Vidal | Orion Scheduler | Gestión de calendario: 15 EUR | 2026-10-15 | 2026-12-15 | Activo | 15 EUR | — | 0 EUR | 15 EUR |

Los cálculos deben cuadrar:

- Ana Torres: 25 + 18 + 15 = 58 EUR de subtotal; 58 − 5 = 53 EUR pagados.
- Luis Gómez: 18 + 12 = 30 EUR de subtotal; 30 − 3 = 27 EUR pagados.
- Marta Ruiz: 25 + 18 + 12 = 55 EUR de subtotal; 55 − 0 = 55 EUR pagados.
- Sofía Vidal: 15 EUR de subtotal; 15 − 0 = 15 EUR pagados.
- Descuentos totales: 5 + 3 = 8 EUR.
- Ingresos de contratos activos: 53 + 27 + 15 = 95 EUR.

### 3.5 Log de errores

El badge con código de color representa la **gravedad** del error: Alta, Media o Baja. El tipo de error debe mostrarse como texto o como badge neutro, sin utilizar el color de gravedad para representarlo.

El estado inicial de todos los errores es `Abierto`.

| Timestamp | Agente | Tipo | Gravedad | Estado | Descripción | Traza |
|---|---|---|---|---|---|---|
| 2026-11-23 09:14:32 | Lumen Research | Navegación | Alta | Abierto | La fuente web rechazó la conexión. | `WebNavigator.fetch -> HttpClient.request -> ConnectionError: remote host refused connection` |
| 2026-11-22 16:42:11 | Nexo Support | Documentos | Media | Abierto | No se pudo extraer texto del archivo recibido. | `DocumentReader.parse -> PdfExtractor.read -> UnsupportedFormatError: encrypted document` |
| 2026-11-21 11:08:54 | Atlas Finance | Email | Baja | Abierto | El envío quedó temporalmente en cola. | `EmailSender.send -> MailQueue.enqueue -> TemporaryDeliveryError: retry scheduled` |
| 2026-11-20 14:26:09 | Orion Scheduler | Calendario | Alta | Abierto | El calendario del propietario no respondió. | `CalendarManager.listEvents -> CalendarClient.get -> TimeoutError: request exceeded 10s` |
| 2026-11-19 10:37:45 | Lumen Research | Documentos | Media | Abierto | El documento contiene una estructura no reconocida. | `DocumentReader.parse -> ContentAnalyzer.scan -> ParseError: invalid section structure` |
| 2026-11-18 08:51:20 | Nexo Support | Navegación | Baja | Abierto | La página solicitada devolvió una respuesta vacía. | `WebNavigator.fetch -> ResponseParser.parse -> EmptyResponseError: no readable content` |

### 3.6 Métricas derivadas del Dashboard

Las métricas iniciales deben ser:

- Ingresos totales generados este mes: `95 EUR`, correspondientes a los tres contratos activos después de aplicar sus descuentos.
- Pérdida total por descuentos y cupones: `8 EUR`, correspondientes a 5 EUR del cupón `BIENVENIDA10` y 3 EUR del cupón `FIDELIDAD`.
- Agentes activos en todos los clientes: `2`, correspondientes a Nexo Support y Atlas Finance.
- Agentes marcados como fallando: `1`, correspondiente a Lumen Research.

## 4. Especificaciones por sección

### 4.1 Dashboard

1. **Tarjetas de métricas:** mostrar cuatro tarjetas en una cuadrícula responsive de 2 × 2 en escritorio y tablet. Cada tarjeta debe contener un icono, una etiqueta y un valor hardcodeado.
2. **Contenido de las métricas:** las tarjetas deben mostrar ingresos del mes, pérdida por descuentos y cupones, agentes activos y agentes fallando.
3. **Consistencia de ingresos:** los ingresos totales deben ser 95 EUR y deben corresponder a la suma de los importes ya descontados de los tres contratos activos.
4. **Consistencia de descuentos:** la pérdida total por descuentos y cupones debe ser 8 EUR y debe corresponder a la suma de los descuentos de Ana Torres y Luis Gómez.
5. **Consistencia de agentes:** los valores de agentes activos y fallando deben corresponder a los estados definidos en Gestión de agentes.
6. **Gráfico de actividad semanal:** debajo de las tarjetas debe existir un área de ancho completo que funcione como marcador de posición para un gráfico de actividad semanal. No se requiere implementar un gráfico real.
7. **Cambio de sección:** la sección Dashboard debe mostrarse por defecto al cargar la aplicación y debe poder abrirse desde la sidebar mediante el enlace con `data-section="dashboard"`.

### 4.2 Gestión de usuarios

1. **Tabla de usuarios:** mostrar una tabla semántica con nombre, email, plan, estado y fecha de alta para los cinco usuarios de referencia.
2. **Dropdown de acciones:** cada fila debe incluir un botón de acciones con el icono vertical de tres puntos. El botón debe abrir un menú con las opciones `Ver detalle` y `Eliminar`.
3. **Estado accesible del dropdown:** el botón de tres puntos debe incluir `aria-label` y actualizar `aria-expanded` al abrir o cerrar el menú.
4. **Detalle de usuario:** `Ver detalle` debe abrir un modal overlay con el registro completo del usuario, incluyendo nombre, email, plan, estado y fecha de alta.
5. **Cierre del detalle:** el modal debe cerrarse mediante su botón de cierre, haciendo clic en el backdrop o pulsando Escape.
6. **Eliminación visual:** `Eliminar` debe retirar la fila de la interfaz tras la interacción. No debe realizar ninguna petición ni persistir cambios en backend.

### 4.3 Gestión de agentes

1. **Lista de agentes:** mostrar los cuatro agentes dentro de un elemento `<ul>`, con un elemento `<li>` independiente para cada agente. No se debe implementar esta sección como una tabla ni dejar la opción de elegir entre fila o tarjeta.
2. **Contenido de cada tarjeta:** cada `<li>` debe presentar el nombre del agente, su propietario, su estado y sus skills asignadas.
3. **Skills colapsables:** la lista de skills debe estar colapsada por defecto. Un control expandible debe mostrarla u ocultarla y actualizar `aria-expanded`.
4. **Transición:** la apertura y el cierre de la lista de skills deben incluir una transición visible y suave.
5. **Dropdown de acciones:** cada agente debe incluir un dropdown con las opciones `Configurar` y `Eliminar`.
6. **Configuración:** `Configurar` debe abrir un modal con el nombre del agente y su prompt de sistema dentro de un `textarea` editable.
7. **Cambios locales:** el contenido editado del `textarea` puede mantenerse mientras el modal permanezca abierto, pero no se requiere guardar los cambios ni sincronizarlos con ningún backend.
8. **Eliminación visual:** `Eliminar` debe retirar la tarjeta del agente de la lista y actualizar visualmente el contenido de esa sección.

### 4.4 Skills

1. **Explicación introductoria:** incluir un texto breve que explique que una skill es una capacidad modular que puede habilitarse en un agente.
2. **Catálogo:** mostrar las cuatro skills con nombre, descripción breve, precio unitario y número de agentes que la tienen habilitada.
3. **Contadores coherentes:** los contadores deben coincidir con las asignaciones de Gestión de agentes.
4. **Dropdown de acciones:** cada skill debe incluir un dropdown con las opciones `Ver detalle` y `Eliminar`.
5. **Detalle de skill:** `Ver detalle` debe abrir un modal con nombre, descripción, precio y agentes que utilizan la skill.
6. **Cierre del detalle:** el modal debe cerrarse mediante su botón de cierre, haciendo clic en el backdrop o pulsando Escape.
7. **Eliminación visual:** `Eliminar` debe retirar la skill del catálogo visible. No debe modificar de forma permanente los agentes ni los contratos.

### 4.5 Contrataciones de agentes

1. **Tabla de contratos:** mostrar una tabla semántica con cliente, agente alquilado, skills contratadas, fechas del contrato, estado, subtotal, cupón, descuento e importe total pagado.
2. **Skills contratadas:** cada fila debe mostrar las skills incluidas y sus precios individuales de forma identificable.
3. **Subtotal:** la columna `Subtotal` debe mostrar la suma de los precios individuales de todas las skills del contrato antes de aplicar descuentos.
4. **Cupón:** la columna `Cupón` debe mostrar `BIENVENIDA10` para el contrato de Ana Torres, `FIDELIDAD` para el contrato de Luis Gómez y `—` para los contratos sin cupón.
5. **Descuento:** la columna `Descuento` debe mostrar −5 EUR para Ana Torres, −3 EUR para Luis Gómez y 0 EUR para Marta Ruiz y Sofía Vidal.
6. **Importe total:** la columna `Importe total pagado` debe calcularse como subtotal menos descuento: 53 EUR para Ana Torres, 27 EUR para Luis Gómez, 55 EUR para Marta Ruiz y 15 EUR para Sofía Vidal.
7. **Dropdown de acciones:** cada contrato debe incluir un menú con la opción `Ver detalle`.
8. **Detalle de contrato:** la opción debe abrir un modal con cliente, agente, estado, fechas, skills contratadas, precio individual de cada skill, subtotal, cupón, descuento e importe total pagado.
9. **Relaciones entre datos:** los clientes deben existir en Gestión de usuarios, los agentes deben existir en Gestión de agentes y las skills deben existir en el catálogo de Skills.

### 4.6 Log de errores

1. **Tabla de errores:** mostrar timestamp, nombre del agente, tipo de error, gravedad, estado y descripción breve.
2. **Badge de gravedad:** el badge con código de color debe representar exclusivamente la gravedad del error: Alta, Media o Baja.
3. **Tipo de error:** el tipo debe mostrarse como texto o mediante un badge neutro, sin reutilizar el código de color de la gravedad.
4. **Estado inicial:** todos los errores deben comenzar con el estado `Abierto`.
5. **Dropdown de acciones:** cada fila debe incluir un menú con `Ver detalle` y `Marcar como resuelto`.
6. **Detalle del error:** `Ver detalle` debe abrir un modal con toda la información del error, incluida la traza completa.
7. **Cierre del detalle:** el modal debe cerrarse mediante su botón de cierre, haciendo clic en el backdrop o pulsando Escape.
8. **Resolver error:** `Marcar como resuelto` debe cambiar el estado visible de la fila de `Abierto` a `Resuelto`.
9. **Badge actualizado:** al resolver un error, el contenido de la columna Estado y su badge deben reflejar `Resuelto`.
10. **Persistencia local:** el estado resuelto solo debe afectar a la interfaz durante la sesión actual. No se requiere backend ni almacenamiento permanente.

## 5. Inventario de componentes reutilizables

### Sidebar

- Se utiliza en las seis secciones.
- Contiene la navegación hacia Dashboard, Gestión de usuarios, Gestión de agentes, Skills, Contrataciones de agentes y Log de errores.
- Cada enlace debe tener un atributo `data-section` con uno de estos valores:
  - `dashboard`
  - `usuarios`
  - `agentes`
  - `skills`
  - `contrataciones`
  - `errores`
- El valor de `data-section` debe coincidir exactamente con el `id` de la sección correspondiente.
- Al activar un enlace, el JavaScript debe mostrar su sección y ocultar todas las demás.
- Debe mostrar un indicador claro de la sección activa.
- El enlace activo debe incluir `aria-current="page"`.
- Los enlaces no activos no deben incluir `aria-current="page"`.
- La sidebar debe permanecer disponible al cambiar de sección.

### Barra superior

- Se utiliza en todo el panel.
- Contiene el título o contexto de la sección actual y el toggle de modo oscuro.
- El toggle debe añadir o quitar la clase `dark` en `html`.
- Debe leer y guardar la preferencia en `localStorage`.
- El estado no debe reiniciarse al navegar entre secciones.

### Tarjeta de métrica

- Se utiliza en Dashboard.
- Contiene un icono, una etiqueta y un valor.
- Debe aceptar valores numéricos o monetarios.
- Debe mantener una estructura estable en diferentes anchos de pantalla.

### Tabla

- Se utiliza en Gestión de usuarios, Contrataciones de agentes y Log de errores.
- Debe utilizar `table`, `thead` y `tbody`.
- Sus encabezados deben describir claramente el contenido de cada columna.
- Cada fila debe incluir las acciones correspondientes a su sección.
- Las tablas deben mantener una estructura usable en escritorio y tablet.

### Lista de tarjetas de agentes

- Se utiliza exclusivamente en Gestión de agentes.
- Debe utilizar un elemento `<ul>` con un `<li>` por agente.
- Cada tarjeta contiene identidad del agente, propietario, estado, lista de skills y dropdown de acciones.
- Debe permitir expandir y contraer la lista de skills de cada tarjeta independientemente.
- Las skills deben estar colapsadas inicialmente.

### Dropdown de acciones

- Se utiliza en todas las filas o tarjetas con acciones: usuarios, agentes, skills, contratos y errores.
- Se abre mediante un botón de tres puntos con `aria-label`.
- El botón debe actualizar `aria-expanded`.
- Solo puede existir un dropdown abierto simultáneamente.
- Debe cerrarse al elegir una acción, pulsar de nuevo el botón, hacer clic fuera o pulsar Escape.

### Modal con backdrop

- Se utiliza para detalles de usuarios, configuración de agentes, detalles de skills, detalles de contratos y detalles de errores.
- Debe incluir un contenedor con `role="dialog"` o un elemento `dialog`.
- Debe incluir una etiqueta accesible y un botón de cierre.
- Debe mostrarse sobre un backdrop.
- Debe cerrarse mediante el botón, haciendo clic en el backdrop o pulsando Escape.
- El contenido debe cambiar según el registro seleccionado.

### Badge de estado o gravedad

- Se utiliza para estados de usuarios, agentes, contratos y errores.
- Debe mostrar texto legible, no solo una diferencia cromática.
- Los badges de gravedad deben distinguir Alta, Media y Baja mediante un código de color.
- El tipo de error debe utilizar texto o un badge neutro, no el código visual de gravedad.
- Debe distinguir estados como Activo, Inactivo, Fallando, Pasado, Abierto y Resuelto.

### Lista de skills colapsable

- Se utiliza en Gestión de agentes.
- Muestra una vista resumida cuando está cerrada.
- Al expandirse revela todas las skills asignadas al agente.
- Debe actualizar `aria-expanded`.
- Debe incluir una transición visible de apertura y cierre.
- Debe estar colapsada inicialmente para todos los agentes.

## 6. Comportamientos interactivos globales

1. Solo puede haber un dropdown abierto a la vez.
2. Abrir un dropdown debe cerrar automáticamente cualquier otro dropdown abierto.
3. Pulsar de nuevo el botón de tres puntos debe cerrar su dropdown.
4. Elegir cualquier opción de un dropdown debe cerrarlo.
5. Hacer clic fuera de un dropdown debe cerrarlo.
6. Pulsar Escape debe cerrar el dropdown abierto.
7. Los modales deben cerrarse mediante su botón de cierre.
8. Los modales deben cerrarse haciendo clic en el backdrop.
9. Los modales deben cerrarse pulsando Escape.
10. Abrir un modal debe mostrar únicamente el contenido correspondiente al registro seleccionado.
11. `Eliminar` solo debe cambiar la interfaz, retirando visualmente el registro seleccionado.
12. `Marcar como resuelto` solo debe cambiar la interfaz, actualizando el estado de la fila de `Abierto` a `Resuelto`.
13. La navegación lateral debe leer el atributo `data-section` del enlace pulsado, mostrar la sección cuyo `id` coincide y ocultar las demás sin recargar la página.
14. La navegación debe actualizar el indicador visual de sección activa.
15. La navegación debe añadir `aria-current="page"` únicamente al enlace activo.
16. El modo oscuro debe mantenerse al navegar entre secciones y al recargar la aplicación mediante `localStorage`.
17. Los controles que se expanden o contraen deben mantener actualizado su atributo `aria-expanded`.
18. La edición del prompt de un agente es únicamente local y no requiere persistencia.

## 7. Criterios de aceptación

1. `SPECS.md` debe estar commiteado antes de crear cualquier archivo HTML.
2. Las seis secciones deben estar presentes en un único `index.html`.
3. Las seis secciones deben ser accesibles desde la sidebar.
4. Cada enlace de la sidebar debe tener un atributo `data-section` con el valor `dashboard`, `usuarios`, `agentes`, `skills`, `contrataciones` o `errores`.
5. El valor de cada `data-section` debe coincidir con el `id` de su elemento `<section>` correspondiente.
6. El JavaScript debe mostrar la sección seleccionada y ocultar las demás sin recargar la página.
7. La sección activa debe estar marcada visualmente.
8. El enlace activo de la sidebar debe incluir `aria-current="page"`.
9. Los enlaces no activos no deben conservar `aria-current="page"`.
10. Tailwind CSS v4 debe cargarse exclusivamente mediante el CDN indicado.
11. El modo oscuro debe utilizar la clase `dark` en `html` y la variante personalizada indicada en el `<head>`.
12. No debe existir CSS externo propio ni ningún atributo `style` en línea.
13. El archivo `app.js` debe cargarse con `defer`.
14. Todos los listados deben utilizar datos hardcodeados y coherentes.
15. La gestión de agentes debe utilizar una lista `<ul>` con un `<li>` por agente.
16. Las skills de los agentes deben estar colapsadas por defecto.
17. Las skills deben expandirse y colapsarse mediante un control con una transición visible.
18. Todas las filas o tarjetas que tengan acciones deben incluir un dropdown con el botón de tres puntos.
19. Los dropdowns deben abrirse y cerrarse al pulsar el botón.
20. Solo debe haber un dropdown abierto simultáneamente.
21. Los dropdowns deben cerrarse al elegir una acción.
22. Los dropdowns deben cerrarse al hacer clic fuera.
23. Los dropdowns deben cerrarse al pulsar Escape.
24. `Ver detalle` debe abrir un modal en al menos cuatro secciones distintas.
25. Los modales deben cerrarse con el botón de cierre.
26. Los modales deben cerrarse haciendo clic en el backdrop.
27. Los modales deben cerrarse pulsando Escape.
28. El Log de errores debe incluir las columnas Timestamp, Agente, Tipo, Gravedad, Estado y Descripción.
29. El badge con código de color del Log de errores debe representar la gravedad, no el tipo.
30. El tipo de error debe mostrarse como texto o badge neutro.
31. Todos los errores deben comenzar con estado `Abierto`.
32. `Marcar como resuelto` debe cambiar el estado de la fila a `Resuelto`.
33. El toggle de modo oscuro debe cambiar todo el panel.
34. La preferencia de modo oscuro debe mantenerse al cambiar de sección y al recargar.
35. Los nombres de los agentes deben coincidir exactamente entre Gestión de agentes, Contrataciones y Log de errores.
36. Los contadores de uso de skills deben coincidir con las asignaciones de los agentes.
37. Los subtotales de contratos deben coincidir con la suma de los precios individuales de sus skills.
38. El descuento de Ana Torres debe ser de 5 EUR mediante el cupón `BIENVENIDA10`.
39. El descuento de Luis Gómez debe ser de 3 EUR mediante el cupón `FIDELIDAD`.
40. La pérdida total por descuentos y cupones del Dashboard debe ser de 8 EUR.
41. Los importes totales pagados deben ser 53 EUR para Ana Torres, 27 EUR para Luis Gómez, 55 EUR para Marta Ruiz y 15 EUR para Sofía Vidal.
42. Los ingresos totales del Dashboard deben ser de 95 EUR, correspondientes a los contratos activos después de descuentos.
43. Los agentes activos del Dashboard deben ser 2.
44. Los agentes marcados como fallando del Dashboard deben ser 1.
45. El HTML debe utilizar una estructura semántica.
46. Los botones de solo icono deben incluir `aria-label`.
47. Los dropdowns y controles colapsables deben incluir y actualizar `aria-expanded`.
48. Todos los controles interactivos deben tener foco visible.
49. El layout debe ser usable en escritorio y tablet con un mínimo de 768 px.
50. La aplicación debe utilizar únicamente JavaScript vanilla.
51. No debe incluir frameworks, jQuery, backend, API, login ni herramientas de build.
52. El prototipo no debe añadir búsqueda, formularios reales ni funcionalidades no descritas en esta especificación.
