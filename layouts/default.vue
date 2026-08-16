<template>
  <div class="flex min-h-screen flex-col">
    <!-- Enlace para saltar la navegación repetitiva (WCAG 2.4.1) -->
    <a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>

    <AppHeader />

    <!-- landmark <main> único por página -->
    <main id="contenido-principal" class="flex-1" tabindex="-1">
      <slot />
    </main>

    <AppFooter />

    <CookieBanner />
  </div>
</template>
