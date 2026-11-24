# Sistema de diseño de AgentHub

Este documento define las clases utilitarias de Tailwind CSS v4 para mantener una apariencia coherente en las seis secciones del panel. `SPECS.md` es la fuente de verdad para datos, etiquetas y comportamiento; las capturas de Stitch son únicamente una referencia visual.

## 1. Principios visuales

- Usar una interfaz limpia, moderna y sobria: fondos neutros, superficies claramente diferenciadas y acentos índigo.
- Mantener contraste suficiente entre la página, la navegación, las tarjetas y las tablas, tanto en modo claro como oscuro.
- Aplicar esquinas redondeadas de forma consistente y reservar las sombras para elevar superficies interactivas, como menús y modales.
- Utilizar espaciado generoso y jerarquía tipográfica clara, sin recargar las pantallas con elementos decorativos.
- Usar el color de estado como ayuda visual, nunca como único medio para comunicar un estado o gravedad. El texto del badge siempre debe permanecer visible.
- Las tablas pueden desplazarse horizontalmente cuando no quepan en el ancho disponible; no deben comprimir el contenido hasta hacerlo ilegible.

## 2. Paleta de colores

Aplicar los colores con utilidades de Tailwind y su variante `dark:` correspondiente. En cada pareja, la primera clase es para modo claro y la segunda para modo oscuro.

| Uso | Modo claro | Modo oscuro |
|---|---|---|
| Fondo de página | `bg-slate-50` | `dark:bg-slate-950` |
| Sidebar | `bg-white` | `dark:bg-slate-900` |
| Superficie de tarjeta, tabla o modal | `bg-white` | `dark:bg-slate-900` |
| Superficie secundaria o filas alternas | `bg-slate-50` | `dark:bg-slate-800/60` |
| Hover de fila o elemento | `hover:bg-slate-50` | `dark:hover:bg-slate-800/70` |
| Borde predeterminado | `border-slate-200` | `dark:border-slate-800` |
| Borde sutil | `border-slate-100` | `dark:border-slate-800/70` |
| Texto principal | `text-slate-900` | `dark:text-slate-100` |
| Texto secundario | `text-slate-600` | `dark:text-slate-400` |
| Texto tenue o auxiliar | `text-slate-500` | `dark:text-slate-500` |
| Primario índigo | `bg-indigo-600 text-white` | `dark:bg-indigo-500 dark:text-white` |
| Hover primario | `hover:bg-indigo-700` | `dark:hover:bg-indigo-600` |
| Enlace o acento índigo | `text-indigo-600` | `dark:text-indigo-400` |
| Fondo suave índigo | `bg-indigo-50` | `dark:bg-indigo-950/50` |

### Colores de estado

Para fondos de badge, texto y borde, aplicar una pareja clara/oscura por propiedad:

| Estado o gravedad | Fondo claro / oscuro | Texto claro / oscuro | Borde claro / oscuro |
|---|---|---|---|
| Éxito: Activo, Resuelto | `bg-emerald-50` / `dark:bg-emerald-950/50` | `text-emerald-700` / `dark:text-emerald-300` | `border-emerald-200` / `dark:border-emerald-800` |
| Aviso: Suspendido, Abierto, Media | `bg-amber-50` / `dark:bg-amber-950/50` | `text-amber-700` / `dark:text-amber-300` | `border-amber-200` / `dark:border-amber-800` |
| Error: Fallando, Alta | `bg-rose-50` / `dark:bg-rose-950/50` | `text-rose-700` / `dark:text-rose-300` | `border-rose-200` / `dark:border-rose-800` |
| Neutro: Inactivo, Pasado, Baja, tipo de error | `bg-slate-100` / `dark:bg-slate-800` | `text-slate-600` / `dark:text-slate-300` | `border-slate-200` / `dark:border-slate-700` |

El estado `Suspendido` se distingue en ámbar. `Pasado`, `Baja` y los tipos de error usan el estilo neutro. `Media` usa el estilo de aviso y `Alta`, el de error. Todos los badges incluyen su etiqueta textual.

## 3. Tipografía

Usar la fuente sans del sistema mediante `font-sans`; no cargar fuentes externas.

| Elemento | Clases |
|---|---|
| Título de sección | `text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100` |
| Descripción o contexto de sección | `mt-1 text-sm text-slate-600 dark:text-slate-400` |
| Valor de métrica | `text-2xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-slate-100` |
| Etiqueta de métrica | `text-sm font-medium text-slate-600 dark:text-slate-400` |
| Encabezado de tabla | `text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400` |
| Celda de tabla | `text-sm text-slate-700 dark:text-slate-300` |
| Nombre destacado en tabla o tarjeta | `text-sm font-medium text-slate-900 dark:text-slate-100` |
| Badge | `text-xs font-medium` |

Para importes, fechas y valores numéricos, añadir `tabular-nums` cuando facilite la lectura en columnas.

## 4. Espaciado, bordes, radios y sombras

- Espaciado base entre secciones: `space-y-6`.
- Separación entre tarjetas: `gap-4` o `gap-6`.
- Relleno habitual de tarjetas y paneles: `p-5` o `p-6`.
- Celdas de tabla: `px-4 py-3`; encabezados: `px-4 py-3`.
- Controles compactos: `px-3 py-2`.
- Borde estándar: `border border-slate-200 dark:border-slate-800`.
- Separadores de fila: `divide-y divide-slate-200 dark:divide-slate-800`.
- Tarjeta o panel: `rounded-xl`.
- Botón e input: `rounded-lg`.
- Badge: `rounded-full`.
- Sombra sutil de tarjeta: `shadow-sm`.
- Dropdown: `shadow-lg`.
- Modal: `shadow-2xl`.

Aplicar las clases de borde, superficie y texto oscuro también en los estados interactivos que correspondan.

## 5. Layout

### Escritorio

- Sidebar persistente, de ancho fijo: `w-64`.
- Contenedor de la aplicación: `min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`.
- Área de contenido: `min-w-0 flex-1`.
- Barra superior: `sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90`.
- Contenedor principal: `mx-auto w-full max-w-7xl p-6`.

### Tablet, referencia de 768 px

- En tablet, la sidebar usa una columna de iconos: `w-20`; el ancho completo de `w-64` se aplica a partir del breakpoint `lg`.
- Ocultar los textos de enlaces y logo con `hidden lg:inline`; conservar nombres accesibles en los enlaces.
- Centrar los iconos en tablet con `justify-center`; alinearlos al inicio a partir de `lg` con `lg:justify-start`.
- Mantener la cuadrícula de métricas en dos columnas: `grid grid-cols-2 gap-4`.
- Permitir desplazamiento horizontal de tablas con un contenedor `overflow-x-auto`; conservar un ancho mínimo legible para la tabla.
- La barra superior y el contenido deben poder contraerse con `min-w-0`.

La variante `lg:` corresponde al breakpoint estándar de 1024 px de Tailwind. Así, la sidebar permanece compacta a 768 px y se expande en escritorio.

## 6. Recetas de componentes

Las clases de esta sección son patrones reutilizables. Cuando una clase define color, debe acompañarse de su variante oscura correspondiente.

### Sidebar

- Contenedor: `flex h-full w-20 shrink-0 flex-col border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:w-64`.
- Logo: mostrar su texto con `hidden lg:inline`.
- Enlace normal: `flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:justify-start`.
- Texto del enlace: `hidden lg:inline`.
- Enlace activo: `flex items-center justify-center gap-3 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 lg:justify-start`.
- Conservar nombres accesibles en los enlaces compactos. El enlace activo debe seguir destacándose en la sidebar de iconos.

### Barra superior y toggle de modo oscuro

- Barra: usar las clases de layout de la sección 5; mantener el título o contexto actual alineado con el toggle.
- Botón del toggle: `inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white`.
- Incluir dos SVG en el botón, con tamaño `size-5`:
  - Sol: `hidden dark:block`.
  - Luna: `block dark:hidden`.
- Los iconos deben usar `currentColor`. El control debe ser un botón accesible, tener nombre accesible y mostrar foco visible.

### Tarjetas de métricas

- Cuadrícula: `grid grid-cols-2 gap-4`.
- Tarjeta: `rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900`.
- Icono: contenedor `flex size-10 items-center justify-center rounded-lg`; SVG `size-5`.
- Colores de acento por métrica:
  - Ingresos del mes: fondo `bg-emerald-50 dark:bg-emerald-950/50`, icono `text-emerald-600 dark:text-emerald-400`.
  - Pérdida por descuentos y cupones: fondo `bg-amber-50 dark:bg-amber-950/50`, icono `text-amber-600 dark:text-amber-400`.
  - Agentes activos: fondo `bg-indigo-50 dark:bg-indigo-950/50`, icono `text-indigo-600 dark:text-indigo-400`.
  - Agentes fallando: fondo `bg-rose-50 dark:bg-rose-950/50`, icono `text-rose-600 dark:text-rose-400`.
- Etiqueta y valor: usar las clases tipográficas de la sección 3.

### Tablas

- Contenedor exterior: `overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900`.
- Tabla: `w-full min-w-max text-left`.
- Cabecera: `border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60`.
- Celdas de cabecera: `whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400`.
- Filas: `border-b border-slate-100 last:border-0 dark:border-slate-800/70`.
- Celdas: `whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-300`.
- Hover de fila: `hover:bg-slate-50 dark:hover:bg-slate-800/70`.
- Mantener el mismo tratamiento en usuarios, contrataciones y log de errores.

### Botón ⋮ y menú dropdown

- Contenedor del botón y menú: `relative`.
- Botón: `inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100`.
- El botón debe incluir un nombre accesible y reflejar su estado abierto/cerrado.
- Menú: `absolute right-0 z-30 mt-2 min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900`.
- Opción: `block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800`.
- Cuando esté cerrado, el menú lleva `hidden`.
- Mantener un solo menú abierto a la vez y cerrarlo tras seleccionar una acción, al hacer clic fuera o al pulsar Escape.

### Modal y backdrop

- Backdrop: `fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-slate-950/50 p-4`.
- Panel: `relative z-50 w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900`.
- Título: `text-lg font-semibold text-slate-900 dark:text-slate-100`.
- Texto secundario: `text-sm text-slate-600 dark:text-slate-400`.
- Botón de cierre: usar el patrón de botón de icono, con nombre accesible y foco visible.
- El contenido largo debe poder desplazarse dentro del panel. Mantener una separación clara entre encabezado, contenido y acciones.

### Badges de estado y gravedad

- Base: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium`.
- Combinar la base con los colores de la tabla de estados de la sección 2:
  - Activo y Resuelto: éxito.
  - Inactivo, Pasado, Baja y tipo de error: neutro.
  - Suspendido, Abierto y Media: aviso.
  - Fallando y Alta: error.
- El texto del badge debe ser el valor definido por `SPECS.md`; no utilizar el color para sustituir la etiqueta.

### Tarjeta de agente

- Elemento de lista: `rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900`.
- Cabecera: `flex items-start justify-between gap-4`.
- Nombre: `text-base font-semibold text-slate-900 dark:text-slate-100`.
- Propietario y metadatos: `mt-1 text-sm text-slate-600 dark:text-slate-400`.
- Skills: colocarlas en un bloque separado con borde superior y espaciado consistente; usar badges neutros si se necesita mostrarlas individualmente.
- Estado y acciones deben conservar la alineación y las recetas de badge y dropdown.

### Lista de skills colapsable

- Control: botón `inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300`.
- Chevron: `size-4 transition-transform`; añadir `rotate-180` cuando la lista esté abierta.
- Contenedor animado: `grid transition-[grid-template-rows,opacity] duration-300 ease-in-out`.
- Estado cerrado: `grid-rows-[0fr] opacity-0`.
- Estado abierto: `grid-rows-[1fr] opacity-100`.
- Hijo interno: `overflow-hidden`.
- El comportamiento debe actualizar `aria-expanded` y alternar entre los estados abierto y cerrado.

### Botones primario y secundario

- Primario: `inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600`.
- Secundario: `inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800`.
- Ambos deben incorporar el foco visible descrito a continuación.

### Foco visible

Añadir a todo elemento interactivo:

`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950`

No eliminar el indicador de foco sin reemplazarlo por una alternativa igualmente visible.

## 7. Iconos

- Usar SVG en línea; no añadir librerías de iconos ni CDNs de iconos.
- Usar iconos simples, reconocibles y consistentes, con `stroke="currentColor"`, `fill="none"` y trazos redondeados.
- Iconos de navegación: `size-5 shrink-0`.
- Iconos de métricas: `size-5`.
- Icono del botón de acciones ⋮: `size-5`.
- Iconos de botones pequeños: `size-4`.
- Aplicar el color con utilidades de Tailwind en el elemento SVG o su contenedor, incluyendo la clase `dark:`.
- Los iconos decorativos no deben duplicar información accesible; los botones que solo muestren un icono requieren nombre accesible.

## 8. Reglas de implementación

1. Usar exclusivamente clases utilitarias de Tailwind CSS v4 para el estilo.
2. No crear archivos CSS propios ni añadir atributos `style`.
3. Toda clase de color debe tener una variante `dark:` equivalente para mantener coherencia en ambos modos.
4. El modo oscuro se activa mediante la clase `dark` en el elemento `html`, de acuerdo con `SPECS.md`.
5. Las secciones no activas y los modales cerrados se ocultan con la clase `hidden`.
6. El contenedor de cada botón ⋮ debe tener la clase `relative` para posicionar su menú; los menús cerrados también usan `hidden`.
7. No cambiar, inventar ni copiar datos o textos de las capturas; el contenido y los estados deben provenir de `SPECS.md`.
8. Mantener HTML semántico y accesibilidad: enlaces para navegación, botones para acciones, etiquetas legibles, `aria-expanded` en controles desplegables y foco visible.
9. En caso de duda sobre contenido, comportamiento o valores, prevalece `SPECS.md`; este documento solo normaliza la presentación visual.
