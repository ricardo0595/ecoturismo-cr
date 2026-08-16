<script setup lang="ts">
console.log('holis')
const { consent, loadConsent, setConsent } = useCookieConsent()

onMounted(loadConsent)
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
  >
    <div
      v-if="consent === 'pending'"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-titulo"
      aria-describedby="cookie-descripcion"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-selva-700/20 bg-arena-100 shadow-[0_-4px_16px_rgba(33,61,38,0.15)]"
    >
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div class="max-w-2xl">
          <h2 id="cookie-titulo" class="text-sm font-semibold text-selva-800">
            Uso de cookies
          </h2>
          <p id="cookie-descripcion" class="mt-1 text-sm text-selva-800/90">
            Usamos únicamente una cookie técnica propia para recordar tu
            preferencia sobre este aviso. No utilizamos cookies de
            publicidad ni herramientas de analítica de terceros. Más
            información en nuestra
            <NuxtLink to="/privacidad" class="underline underline-offset-2 hover:text-tucan-700">
              política de privacidad
            </NuxtLink>.
          </p>
        </div>
        <div class="flex shrink-0 gap-3">
          <button
            type="button"
            class="rounded-md border border-selva-700/30 px-4 py-2 text-sm font-medium text-selva-800 hover:bg-selva-50"
            @click="setConsent('rejected')"
          >
            Rechazar
          </button>
          <button
            type="button"
            class="rounded-md bg-selva-700 px-4 py-2 text-sm font-semibold text-arena hover:bg-selva-800"
            @click="setConsent('accepted')"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
