<script setup lang="ts">
useSeoMeta({
  title: 'Contacto y reserva',
  description: 'Escríbenos para reservar tu tour con EcoTurismo CR.'
})

const tours = useTours()
const route = useRoute()

const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  tour: (route.query.tour as string) || '',
  personas: 2,
  fecha: '',
  mensaje: ''
})

const errores = reactive<Record<string, string>>({})
const estado = ref<'idle' | 'enviado'>('idle')

const validar = () => {
  Object.keys(errores).forEach((k) => delete errores[k])

  if (!form.nombre.trim()) errores.nombre = 'Ingresa tu nombre completo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
    errores.correo = 'Ingresa un correo electrónico válido.'
  }
  if (!form.tour) errores.tour = 'Selecciona el tour que te interesa.'
  if (!form.fecha) errores.fecha = 'Selecciona una fecha tentativa.'

  return Object.keys(errores).length === 0
}

const enviar = () => {
  estado.value = 'idle'
  if (validar()) {
    // Simulación: en un proyecto real esto llamaría a un endpoint propio.
    // No se envía información a servicios de terceros ni de analítica.
    estado.value = 'enviado'
  }
}
</script>

<template>
  <div>
    <section class="border-b border-selva-700/10 bg-arena-100">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h1 class="text-3xl font-bold text-selva-800 sm:text-4xl">Contacto y reserva</h1>
        <p class="mt-3 max-w-prose text-selva-800/85">
          Completa el formulario y te confirmamos disponibilidad por correo
          en menos de 48 horas. También puedes escribirnos directamente.
        </p>
      </div>
    </section>

    <section class="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[2fr,1fr]">
      <!-- Formulario de reserva -->
      <form novalidate class="space-y-6" @submit.prevent="enviar">
        <div
          v-if="estado === 'enviado'"
          role="status"
          aria-live="polite"
          class="rounded-md border border-selva-700/30 bg-selva-50 px-4 py-3 text-sm text-selva-800"
        >
          ¡Gracias, {{ form.nombre }}! Recibimos tu solicitud de reserva y te
          contactaremos a {{ form.correo }} para confirmar la fecha.
        </div>

        <div>
          <label for="nombre" class="block text-sm font-medium text-selva-800">
            Nombre completo
          </label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            name="nombre"
            autocomplete="name"
            class="mt-1 w-full rounded-md border border-selva-700/30 bg-arena px-3 py-2 text-selva-800 focus:border-selva-700"
            :aria-invalid="!!errores.nombre"
            :aria-describedby="errores.nombre ? 'nombre-error' : undefined"
          />
          <p v-if="errores.nombre" id="nombre-error" class="mt-1 text-sm text-tucan-700">
            {{ errores.nombre }}
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="correo" class="block text-sm font-medium text-selva-800">
              Correo electrónico
            </label>
            <input
              id="correo"
              v-model="form.correo"
              type="email"
              name="correo"
              autocomplete="email"
              class="mt-1 w-full rounded-md border border-selva-700/30 bg-arena px-3 py-2 text-selva-800 focus:border-selva-700"
              :aria-invalid="!!errores.correo"
              :aria-describedby="errores.correo ? 'correo-error' : undefined"
            />
            <p v-if="errores.correo" id="correo-error" class="mt-1 text-sm text-tucan-700">
              {{ errores.correo }}
            </p>
          </div>

          <div>
            <label for="telefono" class="block text-sm font-medium text-selva-800">
              Teléfono <span class="font-normal text-selva-800/80">(opcional)</span>
            </label>
            <input
              id="telefono"
              v-model="form.telefono"
              type="tel"
              name="telefono"
              autocomplete="tel"
              class="mt-1 w-full rounded-md border border-selva-700/30 bg-arena px-3 py-2 text-selva-800 focus:border-selva-700"
            />
          </div>
        </div>

        <fieldset class="grid gap-6 sm:grid-cols-3">
          <legend class="sr-only">Detalles de la reserva</legend>

          <div class="sm:col-span-1">
            <label for="tour" class="block text-sm font-medium text-selva-800">Tour</label>
            <select
              id="tour"
              v-model="form.tour"
              name="tour"
              class="mt-1 w-full rounded-md border border-selva-700/30 bg-arena px-3 py-2 text-selva-800 focus:border-selva-700"
              :aria-invalid="!!errores.tour"
              :aria-describedby="errores.tour ? 'tour-error' : undefined"
            >
              <option value="" disabled>Selecciona un tour</option>
              <option v-for="tour in tours" :key="tour.slug" :value="tour.slug">
                {{ tour.nombre }}
              </option>
            </select>
            <p v-if="errores.tour" id="tour-error" class="mt-1 text-sm text-tucan-700">
              {{ errores.tour }}
            </p>
          </div>

          <div>
            <label for="personas" class="block text-sm font-medium text-selva-800">Personas</label>
            <input
              id="personas"
              v-model.number="form.personas"
              type="number"
              name="personas"
              min="1"
              max="10"
              class="mt-1 w-full rounded-md border border-selva-700/30 bg-arena px-3 py-2 text-selva-800 focus:border-selva-700"
            />
          </div>

          <div>
            <label for="fecha" class="block text-sm font-medium text-selva-800">Fecha tentativa</label>
            <input
              id="fecha"
              v-model="form.fecha"
              type="date"
              name="fecha"
              class="mt-1 w-full rounded-md border border-selva-700/30 bg-arena px-3 py-2 text-selva-800 focus:border-selva-700"
              :aria-invalid="!!errores.fecha"
              :aria-describedby="errores.fecha ? 'fecha-error' : undefined"
            />
            <p v-if="errores.fecha" id="fecha-error" class="mt-1 text-sm text-tucan-700">
              {{ errores.fecha }}
            </p>
          </div>
        </fieldset>

        <div>
          <label for="mensaje" class="block text-sm font-medium text-selva-800">
            Mensaje <span class="font-normal text-selva-800/80">(opcional)</span>
          </label>
          <textarea
            id="mensaje"
            v-model="form.mensaje"
            name="mensaje"
            rows="4"
            class="mt-1 w-full rounded-md border border-selva-700/30 bg-arena px-3 py-2 text-selva-800 focus:border-selva-700"
          />
        </div>

        <p class="text-xs text-selva-800/80">
          Al enviar este formulario aceptas nuestra
          <NuxtLink to="/privacidad" class="underline hover:text-tucan-700">política de privacidad</NuxtLink>.
          Solo usamos estos datos para gestionar tu reserva.
        </p>

        <button
          type="submit"
          class="rounded-md bg-tucan-700 px-6 py-3 text-sm font-semibold text-arena hover:bg-tucan-800"
        >
          Enviar solicitud de reserva
        </button>
      </form>

      <!-- Datos de contacto directo -->
      <aside aria-labelledby="contacto-directo" class="h-fit rounded-lg bg-arena-100 p-6">
        <h2 id="contacto-directo" class="font-semibold text-selva-800">Contacto directo</h2>
        <ul class="mt-4 space-y-3 text-sm text-selva-800/90">
          <li>
            <span class="block text-selva-800/80">Correo</span>
            <a href="mailto:reservas@ecoturismocr.example" class="hover:text-tucan-700 hover:underline">
              reservas@ecoturismocr.example
            </a>
          </li>
          <li>
            <span class="block text-selva-800/80">Teléfono</span>
            <a href="tel:+50622345678" class="hover:text-tucan-700 hover:underline">+506 8888 8888</a>
          </li>
          <li>
            <span class="block text-selva-800/80">Oficina</span>
            San José, Costa Rica
          </li>
          <li>
            <span class="block text-selva-800/80">Horario</span>
            Lunes a sábado, 8:00 a.m. – 5:00 p.m.
          </li>
        </ul>
      </aside>
    </section>
  </div>
</template>
