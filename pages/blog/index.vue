<script setup lang="ts">
useSeoMeta({
  title: 'Blog de ecoturismo',
  description:
    'Artículos sobre turismo responsable, conservación y experiencias en las rutas de EcoTurismo CR.'
})

const articulos = useBlog()
</script>

<template>
  <div>
    <section class="border-b border-selva-700/10 bg-arena-100">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 class="text-3xl font-bold text-selva-800 sm:text-4xl">Blog de ecoturismo</h1>
        <p class="mt-3 max-w-prose text-selva-800/85">
          Historias, consejos y aprendizajes de nuestras rutas por las áreas
          protegidas de Costa Rica.
        </p>
      </div>
    </section>

    <section aria-label="Artículos del blog" class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="articulo in articulos" :key="articulo.slug" class="flex flex-col overflow-hidden rounded-lg bg-arena-100">
          <div class="aspect-[16/9]">
            <EcoIllustration :variant="articulo.variant" :label="articulo.titulo" />
          </div>
          <div class="flex flex-1 flex-col p-5">
            <p class="text-xs text-selva-800/80">{{ articulo.fecha }} · {{ articulo.autor }}</p>
            <h2 class="mt-2 text-lg font-semibold text-selva-800">
              <NuxtLink :to="`/blog/${articulo.slug}`" class="hover:text-tucan-700 hover:underline">
                {{ articulo.titulo }}
              </NuxtLink>
            </h2>
            <p class="mt-2 flex-1 text-sm text-selva-800/85">{{ articulo.resumen }}</p>
            <NuxtLink
              :to="`/blog/${articulo.slug}`"
              class="mt-4 text-sm font-semibold text-tucan-700 hover:underline"
            >
              Leer artículo →
            </NuxtLink>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
