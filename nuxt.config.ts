// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Fijamos un buildId estable (en vez del UUID aleatorio por build) para
  // que el pequeño script de arranque que Nuxt incrusta en el HTML
  // (window.__NUXT__.config = {...}) tenga siempre el mismo contenido
  // byte a byte. Eso permite whitelistearlo en la CSP con un hash SHA-256
  // fijo en vez de tener que usar 'unsafe-inline' (ver más abajo).
  buildId: 'ecoturismo-cr',

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'EcoTurismo CR — Turismo sostenible en Costa Rica',
      titleTemplate: '%s · EcoTurismo CR',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'EcoTurismo CR ofrece tours y rutas de senderismo en zonas protegidas de Costa Rica, promoviendo el turismo responsable y la conservación del medio ambiente.'
        },
        { name: 'theme-color', content: '#386641' },
        // No usamos fuentes externas: solo la pila de fuentes del sistema
        // (ver assets/css/main.css) para reducir peticiones y huella de carbono.
        { property: 'og:site_name', content: 'EcoTurismo CR' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_CR' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  // --------------------------------------------------------------------
  // Cabeceras HTTP de seguridad (mínimas necesarias)
  // Documentadas en detalle en README.md → sección "Seguridad".
  // Nitro traduce routeRules.headers a la config nativa de la mayoría de
  // proveedores cloud (Netlify _headers, Vercel headers, etc.) al hacer
  // `nuxt generate` / `nuxt build`.
  //
  // La Content-Security-Policy SOLO se aplica fuera de `nuxt dev`: Vite
  // necesita inyectar un <script> inline con la config de la app para el
  // Hot Module Replacement, y una CSP con script-src 'self' estricto
  // bloquea ese script, impidiendo que la app de Vue llegue a montarse
  // (por eso ningún botón respondía en desarrollo). En el build de
  // producción (`nuxt generate` / `nuxt build`) ese script inline no
  // existe, así que ahí sí aplica la política completa.
  // --------------------------------------------------------------------
  routeRules: {
    '/**': {
      headers: {
        // Fuerza HTTPS en el navegador durante 2 años, incluye subdominios.
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        // Evita que el sitio sea incrustado en <iframe> de otros orígenes (clickjacking).
        'X-Frame-Options': 'DENY',
        // Evita que el navegador intente adivinar el tipo MIME de un recurso.
        'X-Content-Type-Options': 'nosniff',
        // Limita cuánta información de referer se envía a otros sitios.
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        // Desactiva APIs sensibles del navegador que el sitio no utiliza.
        'Permissions-Policy': 'geolocation=(), camera=(), microphone=(), interest-cohort=()',
        // Content-Security-Policy: solo permite recursos propios ('self').
        // style-src incluye 'unsafe-inline' porque Vue/Nuxt inyectan estilos
        // críticos en línea durante el renderizado; no se cargan estilos de
        // terceros. No se permite ningún script, imagen ni conexión externa.
        ...(process.dev
          ? {}
          : {
              'Content-Security-Policy':
                "default-src 'self'; " +
                // 'sha256-...' autoriza ÚNICAMENTE el script de arranque que
                // Nuxt incrusta en cada página (window.__NUXT__.config = {...}).
                // Su contenido es fijo (gracias a `buildId` fijado arriba) y no
                // depende de datos de usuario, así que puede whitelistearse por
                // hash sin recurrir a 'unsafe-inline'. Si se cambia `buildId`,
                // el hash debe recalcularse (ver README → Seguridad).
                "script-src 'self' 'sha256-mR240355mUsauB1oNcvOT3bJc7oZWpx0EoDWNkN1j8Q='; " +
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data:; " +
                "font-src 'self'; " +
                "connect-src 'self'; " +
                "object-src 'none'; " +
                "base-uri 'self'; " +
                "form-action 'self'; " +
                "frame-ancestors 'none'; " +
                'upgrade-insecure-requests'
            })
      }
    }
  },

  // El payload de datos de cada página se extrae a un archivo aparte
  // (comportamiento por defecto de Nuxt) en vez de incrustarse inline en
  // el HTML. Es clave para poder mantener una CSP estricta sin
  // 'unsafe-inline' ni hashes: un script inline con datos que cambian por
  // página necesitaría un hash distinto por página, algo inviable en un
  // sitio 100% estático.
  // Genera un sitio 100% estático: ideal para alojamiento en la nube
  // (Netlify, Vercel, Cloudflare Pages, GitHub Pages) con bajo consumo
  // energético por petición (sin servidor Node corriendo permanentemente).
  nitro: {
    prerender: {
      // Nitro rastrea automáticamente los enlaces internos a partir de "/",
      // por lo que las páginas de blog/tours con rutas dinámicas también
      // quedan pre-renderizadas como HTML estático.
      crawlLinks: true,
      routes: ['/']
    }
  },

  typescript: { strict: true }
})
