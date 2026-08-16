# EcoTurismo CR

Sitio web para **EcoTurismo CR**, empresa costarricense de turismo
sostenible. Proyecto universitario del curso de Creación de Sitios Web,
construido con **Nuxt 3** (Vue 3, Composition API) y **Tailwind CSS**,
generado como sitio 100% estático para despliegue rápido en la nube.

## Stack

- **Nuxt 3** / Vue 3 con `<script setup>` (Composition API) en todos los componentes.
- **Tailwind CSS** (`@nuxtjs/tailwindcss`) para el diseño responsivo.
- **Sin librerías de UI de terceros, sin fuentes web, sin analítica externa.**
- Salida: sitio estático (`nuxt generate`) → HTML/CSS/JS listos para cualquier hosting estático.

## Cómo correrlo

```bash
npm install
npm run dev        # http://localhost:3000

npm run generate    # genera el sitio estático en .output/public
npx serve .output/public   # previsualizar el build de producción
```

## Estructura de páginas

| Ruta | Contenido |
|---|---|
| `/` | Inicio: hero, valores de la empresa, tours destacados, últimos artículos del blog, llamado a la acción |
| `/tours` | Listado completo de tours y paquetes (zona, duración, dificultad, precio, incluye) |
| `/blog` y `/blog/[slug]` | Blog de experiencias de ecoturismo |
| `/contacto` | Formulario de reserva + datos de contacto directo |
| `/privacidad` | Política de privacidad (datos recolectados, cookies, seguridad) |

Todo el contenido (tours y artículos) es **contenido simulado**, definido en
`composables/useTours.ts` y `composables/useBlog.ts`.

---

## Accesibilidad (WCAG 2.1 nivel AA)

- **Landmarks ARIA**: `<header>` (banner), `<nav aria-label>`, `<main>` único
  por página, `<footer>` (contentinfo), `<aside>` en contacto. Cada `<nav>`
  tiene una etiqueta accesible (`aria-label`) para diferenciarlas entre sí.
- **Navegación por teclado**: enlace "Saltar al contenido principal"
  (`.skip-link`, visible al recibir foco), foco visible consistente en todo
  el sitio vía `:focus-visible` (contorno de 3px en color `#bc4749`), menú
  móvil con `aria-expanded`/`aria-controls`, y elementos interactivos nativos
  (`<button>`, `<details>/<summary>`) en vez de `<div>` con JavaScript, que
  ya traen soporte de teclado del navegador.
- **Formulario accesible** (`/contacto`): cada campo tiene `<label for>`,
  errores asociados con `aria-describedby` y `aria-invalid`, agrupación con
  `<fieldset>/<legend>`, y confirmación de envío en una región
  `aria-live="polite"`.
- **Texto alternativo en imágenes**: no se usan fotografías; en su lugar hay
  ilustraciones SVG (`components/EcoIllustration.vue`) marcadas con
  `role="img"` + `<title>` (equivalente al `alt` de una `<img>`), cada una
  con una descripción específica de la escena.
- **Contraste de color** (verificado con la fórmula de luminancia relativa
  de WCAG, no solo a simple vista): el tono de marca `#bc4749` sobre el fondo
  `#f2e8cf` da **≈4.16:1**, insuficiente para texto normal (mínimo 4.5:1 en
  AA). Por eso el rojo "tucán" se usa en dos capas:
  - `#bc4749` (600) → solo en elementos **no textuales**: ilustraciones,
    bordes decorativos, acentos (aquí basta el mínimo de 3:1 de contraste
    no-textual, y se cumple).
  - `#9c3739` (700, mismo matiz oscurecido) → todo **texto y fondo de
    botones**, con contraste real de **≈5.7:1**.
  - Verde `#386641`/`#213d26` (selva) sobre `#f2e8cf` → **≈9.8:1**.
  - Texto claro `#f2e8cf` sobre verde oscuro `#2c5133` (footer) → **≈7.4:1**.
  Las variantes de texto "atenuado" (`text-selva-800/80` o superior,
  `text-arena/85` o superior) se limitaron a un mínimo de 80% de opacidad:
  por debajo de ese umbral el contraste cae bajo 4.5:1 al mezclarse con el
  fondo, así que se evita deliberadamente en todo el sitio.
- Se respeta `prefers-reduced-motion` (desactiva transiciones/animaciones)
  y `scroll-behavior` se ajusta en consecuencia.

## Rendimiento

- Sitio **pre-renderizado como HTML estático** (`nuxt generate`): no depende
  de un servidor Node en cada visita.
- **Cero fuentes web**: se usa la pila de fuentes del sistema
  (`ui-sans-serif, system-ui, ...`), definida en `tailwind.config.ts`.
- **Cero imágenes rasterizadas**: todas las "fotos" son SVG generados en
  código (unos pocos KB cada una, sin peticiones HTTP adicionales, sin
  necesidad de compresión de imágenes).
- Tailwind purga en build todas las clases no usadas.
- Recomendado: correr Lighthouse (Chrome DevTools → Lighthouse, o
  `npx unlighthouse --site <url>`) contra el build de producción. Con este
  stack, Performance y Accessibility ≥80 son esperables incluso en modo
  móvil, dado el peso mínimo de recursos.

## Seguridad — cabeceras HTTP

Configuradas de forma centralizada en `nuxt.config.ts` (`routeRules['/**'].headers`),
que Nitro traduce automáticamente al formato del proveedor de hosting elegido
(por ejemplo, genera un archivo `_headers` real para Netlify). Para Vercel se
incluye además `vercel.json` con las mismas cabeceras como respaldo.

| Cabecera | Valor | Motivo |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Fuerza HTTPS en el navegador (requisito de "HTTPS" del brief) |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests` | Solo permite cargar recursos del propio dominio; bloquea scripts/estilos/objetos externos. `style-src` incluye `'unsafe-inline'` porque Vue/Nuxt inyectan estilos críticos en línea al renderizar; no se cargan estilos de terceros |
| `X-Frame-Options` | `DENY` | Evita que el sitio se incruste en un `<iframe>` externo (clickjacking) |
| `X-Content-Type-Options` | `nosniff` | Evita que el navegador reinterprete el tipo MIME de un recurso |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limita qué información de referer se filtra a otros orígenes |
| `Permissions-Policy` | `geolocation=(), camera=(), microphone=(), interest-cohort=()` | Desactiva APIs sensibles que el sitio no usa, incluida la cohorte de FLoC |

No se usa ningún script ni dominio de terceros en el sitio (ni analítica, ni
fuentes, ni CDNs), por lo que la CSP puede ser estricta (`'self'` casi en
todas las directivas) sin romper funcionalidad.

## Sostenibilidad digital

- **Código limpio**: sin dependencias de UI innecesarias, sin polyfills
  extra, un único archivo CSS de entrada purgado por Tailwind.
- **Sin imágenes pesadas**: ilustraciones vectoriales en vez de fotografías
  de stock (ver sección Rendimiento).
- **Sin fuentes externas**: pila de fuentes del sistema operativo.
- **Hosting estático**: al servir HTML pre-generado, no hay cómputo por
  petición (sin funciones serverless ni base de datos), lo que reduce el
  consumo energético por visita frente a un sitio renderizado dinámicamente.
- **Evaluación recomendada**: correr la URL del sitio ya desplegado en
  [websitecarbon.com](https://www.websitecarbon.com/) y documentar el
  resultado (gramos de CO₂ por visita) como parte de la entrega del
  proyecto — el peso total de página (< 300 KB sin contar la ilustración
  del hero) debería ubicar al sitio en el rango "más limpio que la mayoría
  de páginas web probadas".

## Privacidad y cookies

- **Aviso de cookies simulado** (`components/CookieBanner.vue`): aparece al
  entrar al sitio, con botones "Aceptar" / "Rechazar", `role="dialog"` y
  texto explicativo enlazando a `/privacidad`. La preferencia se guarda solo
  en `localStorage` del navegador (nunca se envía a un servidor).
- **Sin rastreadores externos**: no hay Google Analytics, píxeles de
  redes sociales, ni scripts de terceros de ningún tipo — verificable
  directamente en el código fuente y reforzado por la Content-Security-Policy.
- **Página de política de privacidad** (`/privacidad`): explica qué datos
  se recolectan (solo los del formulario de contacto), para qué se usan,
  la política de cookies y los derechos del usuario.

## Despliegue en la nube

El comando `npm run generate` produce una carpeta estática
(`.output/public`) desplegable en cualquier proveedor:

- **Netlify**: conectar el repo, build command `npm run generate`, publish
  directory `.output/public` (o correr con `NITRO_PRESET=netlify` para que
  Nitro genere `dist/_headers` automáticamente a partir de `routeRules`).
- **Vercel**: build command `npm run generate`, output directory
  `.output/public`; las cabeceras se toman de `vercel.json`.
- **Cloudflare Pages**: build command `npm run generate`, output directory
  `.output/public`.

Cualquiera de estas opciones sirve el sitio sobre HTTPS por defecto,
cumpliendo el requisito de "alojamiento en la nube" con seguridad básica.
