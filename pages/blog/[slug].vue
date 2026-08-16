<script setup lang="ts">
const route = useRoute()
const articulos = useBlog()
const articulo = computed(() => articulos.find((a) => a.slug === route.params.slug))

if (!articulo.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
}

useSeoMeta({
  title: articulo.value.titulo,
  description: articulo.value.resumen
})
</script>

<template>
  <article v-if="articulo" class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <NuxtLink to="/blog" class="text-sm font-semibold text-tucan-700 hover:underline">
      ← Volver al blog
    </NuxtLink>

    <p class="mt-6 text-sm text-selva-800/80">{{ articulo.fecha }} · {{ articulo.autor }}</p>
    <h1 class="mt-2 text-3xl font-bold text-selva-800 sm:text-4xl">{{ articulo.titulo }}</h1>

    <div class="mt-6 aspect-[16/9] overflow-hidden rounded-lg">
      <EcoIllustration :variant="articulo.variant" :label="articulo.titulo" />
    </div>

    <div class="prose-eco mt-8 space-y-5">
      <p v-for="(parrafo, i) in articulo.cuerpo" :key="i" class="max-w-prose text-selva-800/90">
        {{ parrafo }}
      </p>
    </div>

    <div class="mt-10 border-t border-selva-700/10 pt-6">
      <NuxtLink
        to="/tours"
        class="inline-block rounded-md bg-tucan-700 px-5 py-2.5 text-sm font-semibold text-arena hover:bg-tucan-800"
      >
        Ver tours relacionados
      </NuxtLink>
    </div>
  </article>
</template>
