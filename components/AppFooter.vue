<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-selva-700/10 bg-selva-700 text-arena">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
      <div>
        <p class="flex items-center gap-2 text-lg font-semibold">
          <span aria-hidden="true">🌿</span> EcoTurismo CR
        </p>
        <p class="mt-3 max-w-xs text-sm text-arena/80">
          Turismo sostenible en Costa Rica: tours, senderismo y experiencias
          que protegen los ecosistemas que visitamos.
        </p>
      </div>

      <nav aria-label="Enlaces del pie de página">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-arena/85">
          Sitio
        </h2>
        <ul class="mt-3 space-y-2 text-sm">
          <li><NuxtLink to="/" class="hover:text-tucan-700">Inicio</NuxtLink></li>
          <li><NuxtLink to="/tours" class="hover:text-tucan-700">Tours y paquetes</NuxtLink></li>
          <li><NuxtLink to="/blog" class="hover:text-tucan-700">Blog de ecoturismo</NuxtLink></li>
          <li><NuxtLink to="/contacto" class="hover:text-tucan-700">Contacto y reserva</NuxtLink></li>
          <li><NuxtLink to="/privacidad" class="hover:text-tucan-700">Política de privacidad</NuxtLink></li>
        </ul>
      </nav>

      <div>
        <h2 class="text-sm font-semibold uppercase tracking-wide text-arena/85">
          Contacto
        </h2>
        <ul class="mt-3 space-y-2 text-sm text-arena/90">
          <li>
            <a href="mailto:reservas@ecoturismocr.example" class="hover:text-tucan-700"
              >reservas@ecoturismocr.example</a
            >
          </li>
          <li>
            <a href="tel:+50622345678" class="hover:text-tucan-700">+506 8888 8888</a>
          </li>
          <li>San José, Costa Rica</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-arena/10">
      <p class="mx-auto max-w-6xl px-4 py-4 text-xs text-arena/85 sm:px-6">
        © {{ year }} EcoTurismo CR. Proyecto universitario con fines
        educativos — contenido simulado.
      </p>
    </div>
  </footer>
</template>
