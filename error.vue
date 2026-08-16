<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()

useSeoMeta({ title: props.error.statusCode === 404 ? 'Página no encontrada' : 'Ocurrió un error' })

const limpiar = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main id="contenido-principal" class="flex flex-1 items-center justify-center px-4 py-20 text-center" tabindex="-1">
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest text-tucan-700">
          Error {{ error.statusCode }}
        </p>
        <h1 class="mt-2 text-3xl font-bold text-selva-800">
          {{ error.statusCode === 404 ? 'No encontramos ese sendero' : 'Algo salió mal' }}
        </h1>
        <p class="mx-auto mt-3 max-w-prose text-selva-800/80">
          {{
            error.statusCode === 404
              ? 'La página que buscas no existe o cambió de dirección.'
              : 'Intenta de nuevo en unos minutos.'
          }}
        </p>
        <button
          type="button"
          class="mt-6 rounded-md bg-tucan-700 px-6 py-3 text-sm font-semibold text-arena hover:bg-tucan-800"
          @click="limpiar"
        >
          Volver al inicio
        </button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
