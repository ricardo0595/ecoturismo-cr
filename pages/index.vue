<script setup lang="ts">
useSeoMeta({
  description:
    'Tours y rutas de senderismo en zonas protegidas de Costa Rica. Turismo responsable con grupos reducidos y guías locales certificados.'
})

const tours = useTours().slice(0, 3)
const articulos = useBlog().slice(0, 2)

const valores = [
  {
    titulo: 'Grupos reducidos',
    texto: 'Máximo 10 personas por tour para minimizar el impacto en cada sendero.'
  },
  {
    titulo: 'Guías locales',
    texto: 'Naturalistas certificados de las comunidades donde operamos.'
  },
  {
    titulo: 'Cero plástico de un solo uso',
    texto: 'Pedimos a cada visitante llevar botella reutilizable propia.'
  }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-selva-700/10 bg-arena-100">
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-tucan-700">
            Turismo sostenible · Costa Rica
          </p>
          <h1 class="mt-3 text-4xl font-bold leading-tight text-selva-800 sm:text-5xl">
            Camina Costa Rica sin dejar huella
          </h1>
          <p class="mt-5 max-w-prose text-lg text-selva-800/90">
            Tours guiados en volcanes, bosques nubosos y humedales protegidos,
            diseñados junto a comunidades locales para conservar lo que
            visitamos.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="/tours"
              class="rounded-md bg-tucan-700 px-6 py-3 text-sm font-semibold text-arena hover:bg-tucan-800"
            >
              Ver tours y paquetes
            </NuxtLink>
            <NuxtLink
              to="/contacto"
              class="rounded-md border border-selva-700 px-6 py-3 text-sm font-semibold text-selva-700 hover:bg-selva-50"
            >
              Reservar ahora
            </NuxtLink>
          </div>
        </div>
        <div class="aspect-[4/3] overflow-hidden rounded-lg">
          <EcoIllustration variant="volcan" label="Senderistas caminando frente al Volcán Arenal al amanecer" />
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section aria-labelledby="valores-titulo" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 id="valores-titulo" class="text-2xl font-bold text-selva-800">
        Cómo hacemos turismo responsable
      </h2>
      <ul class="mt-8 grid gap-8 sm:grid-cols-3">
        <li v-for="valor in valores" :key="valor.titulo" class="border-t-4 border-tucan-600 pt-4">
          <h3 class="font-semibold text-selva-800">{{ valor.titulo }}</h3>
          <p class="mt-2 text-sm text-selva-800/80">{{ valor.texto }}</p>
        </li>
      </ul>
    </section>

    <!-- Tours destacados -->
    <section aria-labelledby="tours-titulo" class="border-t border-selva-700/10 bg-arena-100">
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="tours-titulo" class="text-2xl font-bold text-selva-800">Tours destacados</h2>
          <NuxtLink to="/tours" class="text-sm font-semibold text-tucan-700 hover:underline">
            Ver todos los paquetes →
          </NuxtLink>
        </div>
        <ul class="mt-8 grid gap-6 md:grid-cols-3">
          <li v-for="tour in tours" :key="tour.slug" class="flex flex-col overflow-hidden rounded-lg bg-arena">
            <div class="aspect-[4/3]">
              <EcoIllustration :variant="tour.variant" :label="tour.nombre" />
            </div>
            <div class="flex flex-1 flex-col p-5">
              <h3 class="font-semibold text-selva-800">{{ tour.nombre }}</h3>
              <p class="mt-2 flex-1 text-sm text-selva-800/80">{{ tour.resumen }}</p>
              <p class="mt-4 text-sm font-semibold text-tucan-700">{{ tour.precio }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Blog -->
    <section aria-labelledby="blog-titulo" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="blog-titulo" class="text-2xl font-bold text-selva-800">Del blog de ecoturismo</h2>
        <NuxtLink to="/blog" class="text-sm font-semibold text-tucan-700 hover:underline">
          Ver todos los artículos →
        </NuxtLink>
      </div>
      <ul class="mt-8 grid gap-6 sm:grid-cols-2">
        <li v-for="articulo in articulos" :key="articulo.slug" class="flex gap-4 rounded-lg bg-arena-100 p-4">
          <div class="aspect-square w-24 shrink-0 overflow-hidden rounded-md">
            <EcoIllustration :variant="articulo.variant" :label="articulo.titulo" />
          </div>
          <div>
            <p class="text-xs text-selva-800/80">{{ articulo.fecha }}</p>
            <h3 class="mt-1 font-semibold text-selva-800">
              <NuxtLink :to="`/blog/${articulo.slug}`" class="hover:text-tucan-700 hover:underline">
                {{ articulo.titulo }}
              </NuxtLink>
            </h3>
            <p class="mt-1 text-sm text-selva-800/80">{{ articulo.resumen }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- CTA final -->
    <section class="border-t border-selva-700/10 bg-selva-700">
      <div class="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
        <h2 class="text-2xl font-bold text-arena">¿Listo para tu próxima ruta?</h2>
        <p class="mx-auto mt-3 max-w-prose text-arena/85">
          Cuéntanos qué zona te interesa y armamos un tour a la medida de tu
          grupo, sin sacrificar los estándares de conservación del área.
        </p>
        <NuxtLink
          to="/contacto"
          class="mt-6 inline-block rounded-md bg-tucan-700 px-6 py-3 text-sm font-semibold text-arena hover:bg-tucan-800"
        >
          Escribir para reservar
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
