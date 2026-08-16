<script setup lang="ts">
/**
 * Ilustraciones vectoriales simples en lugar de fotografías.
 * Motivo (sostenibilidad digital): un SVG inline pesa unos pocos KB,
 * no genera peticiones HTTP adicionales y escala sin pérdida de calidad
 * en cualquier pantalla, evitando el costo de imágenes de alta resolución.
 *
 * `label` es obligatorio y se usa como alternativa textual (WCAG 1.1.1):
 * la ilustración se marca role="img" + <title>, igual que una <img alt="">.
 */
const props = withDefaults(
  defineProps<{
    variant: 'volcan' | 'nuboso' | 'humedal' | 'sendero' | 'playa' | 'mapa'
    label: string
  }>(),
  {}
)
</script>

<template>
  <svg
    viewBox="0 0 400 240"
    role="img"
    :aria-label="props.label"
    class="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
  >
    <title>{{ props.label }}</title>

    <rect width="400" height="240" fill="#f2e8cf" />

    <template v-if="variant === 'volcan'">
      <polygon points="0,240 130,60 200,150 240,90 400,240" fill="#386641" />
      <polygon points="130,60 155,95 105,95" fill="#bc4749" />
      <circle cx="330" cy="55" r="26" fill="#bc4749" opacity="0.85" />
    </template>

    <template v-else-if="variant === 'nuboso'">
      <rect x="0" y="150" width="400" height="90" fill="#386641" />
      <path d="M0 150 Q60 110 120 150 T240 150 T400 150 V170 H0 Z" fill="#2c5133" />
      <ellipse cx="90" cy="80" rx="55" ry="24" fill="#f2e8cf" opacity="0.9" />
      <ellipse cx="180" cy="60" rx="70" ry="28" fill="#f2e8cf" />
      <ellipse cx="300" cy="90" rx="50" ry="22" fill="#f2e8cf" opacity="0.9" />
    </template>

    <template v-else-if="variant === 'humedal'">
      <rect x="0" y="170" width="400" height="70" fill="#2c5133" opacity="0.5" />
      <path d="M0 170 Q100 140 200 170 T400 170" fill="none" stroke="#386641" stroke-width="6" />
      <path d="M0 200 Q100 175 200 200 T400 200" fill="none" stroke="#386641" stroke-width="6" />
      <circle cx="320" cy="130" r="18" fill="#bc4749" />
      <rect x="315" y="145" width="10" height="30" fill="#bc4749" />
    </template>

    <template v-else-if="variant === 'sendero'">
      <rect x="0" y="0" width="400" height="240" fill="#e7d6a8" />
      <path d="M40 240 Q160 120 200 60" fill="none" stroke="#386641" stroke-width="14" stroke-linecap="round" stroke-dasharray="2 22" />
      <circle cx="200" cy="55" r="16" fill="#bc4749" />
    </template>

    <template v-else-if="variant === 'playa'">
      <rect x="0" y="150" width="400" height="90" fill="#e7d6a8" />
      <path d="M0 150 Q200 100 400 150 V0 H0 Z" fill="#386641" opacity="0.85" />
      <circle cx="330" cy="45" r="24" fill="#bc4749" />
    </template>

    <template v-else-if="variant === 'mapa'">
      <path d="M20 40 L120 20 L200 60 L300 30 L380 70 L380 200 L280 220 L180 190 L80 220 L20 190 Z" fill="none" stroke="#386641" stroke-width="4" stroke-linejoin="round" />
      <path d="M60 60 Q200 140 340 90" fill="none" stroke="#bc4749" stroke-width="4" stroke-dasharray="1 14" stroke-linecap="round" />
      <circle cx="60" cy="60" r="8" fill="#bc4749" />
      <circle cx="340" cy="90" r="8" fill="#386641" />
    </template>
  </svg>
</template>
