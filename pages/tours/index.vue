<script setup lang="ts">
useSeoMeta({
  title: 'Tours y paquetes',
  description:
    'Conoce nuestros tours en zonas protegidas de Costa Rica: Volcán Arenal, Monteverde, Tortuguero y Corcovado.'
})

const tours = useTours()
</script>

<template>
  <div>
    <section class="border-b border-selva-700/10 bg-arena-100">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 class="text-3xl font-bold text-selva-800 sm:text-4xl">Tours y paquetes</h1>
        <p class="mt-3 max-w-prose text-selva-800/85">
          Todos nuestros paquetes incluyen guía naturalista, equipo de
          seguridad y una acción concreta de conservación. Los cupos son
          limitados para proteger cada zona.
        </p>
      </div>
    </section>

    <section aria-label="Listado de tours disponibles" class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ul class="grid gap-8 md:grid-cols-2">
        <li v-for="tour in tours" :key="tour.slug" class="flex flex-col overflow-hidden rounded-lg bg-arena-100">
          <div class="aspect-[16/9]">
            <EcoIllustration :variant="tour.variant" :label="tour.nombre" />
          </div>
          <div class="flex flex-1 flex-col p-6">
            <h2 class="text-xl font-semibold text-selva-800">{{ tour.nombre }}</h2>
            <p class="mt-1 text-sm text-selva-800/80">{{ tour.zona }}</p>

            <dl class="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt class="text-selva-800/80">Duración</dt>
                <dd class="font-medium text-selva-800">{{ tour.duracion }}</dd>
              </div>
              <div>
                <dt class="text-selva-800/80">Dificultad</dt>
                <dd class="font-medium text-selva-800">{{ tour.dificultad }}</dd>
              </div>
              <div>
                <dt class="text-selva-800/80">Precio</dt>
                <dd class="font-medium text-tucan-700">{{ tour.precio }}</dd>
              </div>
            </dl>

            <p class="mt-4 text-sm text-selva-800/85">{{ tour.resumen }}</p>

            <!-- <details> nativo: accesible por teclado sin JavaScript extra -->
            <details class="mt-4 group flex-1">
              <summary
                class="cursor-pointer text-sm font-semibold text-selva-700 underline-offset-2 group-open:mb-2 hover:underline"
              >
                Qué incluye este tour
              </summary>
              <ul class="ml-4 list-disc space-y-1 text-sm text-selva-800/85">
                <li v-for="item in tour.detalle" :key="item">{{ item }}</li>
              </ul>
            </details>

            <NuxtLink
              :to="`/contacto?tour=${tour.slug}`"
              class="mt-6 inline-block rounded-md bg-tucan-700 px-5 py-2.5 text-center text-sm font-semibold text-arena hover:bg-tucan-800"
            >
              Reservar {{ tour.nombre }}
            </NuxtLink>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
