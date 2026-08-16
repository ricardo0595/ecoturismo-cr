<script setup lang="ts">
const isOpen = ref(false)

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/tours', label: 'Tours y paquetes' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto y reserva' }
]

const route = useRoute()

// Cierra el menú móvil al navegar (mejora la experiencia de teclado)
watch(
  () => route.path,
  () => {
    isOpen.value = false
  }
)
</script>

<template>
  <header class="border-b border-selva-700/10 bg-arena">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-lg font-semibold tracking-tight text-selva-700"
      >
        <span aria-hidden="true" class="text-xl">🌿</span>
        <span>EcoTurismo <span class="text-tucan-700">CR</span></span>
      </NuxtLink>

      <!-- Navegación principal: landmark <nav> con etiqueta accesible -->
      <nav
        aria-label="Navegación principal"
        class="hidden items-center gap-8 md:flex"
      >
        <ul class="flex items-center gap-8">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm font-medium text-selva-800 underline-offset-4 hover:text-tucan-700 hover:underline"
              active-class="text-tucan-700 underline"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink
          to="/contacto"
          class="rounded-md bg-tucan-700 px-4 py-2 text-sm font-semibold text-arena hover:bg-tucan-800"
        >
          Reservar tour
        </NuxtLink>
      </nav>

      <!-- Botón de menú móvil, accesible con aria-expanded/controls -->
      <button
        type="button"
        class="inline-flex items-center rounded-md border border-selva-700/30 p-2 text-selva-700 md:hidden"
        :aria-expanded="isOpen"
        aria-controls="menu-movil"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">{{ isOpen ? 'Cerrar menú' : 'Abrir menú' }}</span>
        <svg v-if="!isOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Menú móvil -->
    <nav
      v-show="isOpen"
      id="menu-movil"
      aria-label="Navegación móvil"
      class="border-t border-selva-700/10 md:hidden"
    >
      <ul class="flex flex-col gap-1 px-4 py-3">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block rounded-md px-3 py-2 text-sm font-medium text-selva-800 hover:bg-selva-50"
            active-class="text-tucan-700"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
