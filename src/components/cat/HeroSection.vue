<template>
  <v-card
    class="mb-6"
    rounded="xl"
    variant="flat"
  >
    <v-img
      :src="heroImage"
      alt="Whity the Cat"
      class="rounded-xl"
      cover
      height="350"
    >
      <div class="d-flex align-center justify-center fill-height hero-overlay">
        <div class="text-center px-4">
          <h1 class="text-h3 text-md-h2 font-weight-bold text-white mb-2 text-shadow">Whity</h1>
          <p class="text-h6 text-white mb-2 text-shadow">12 July 2019 — 29 December 2024</p>
          <p class="text-body-1 text-white mb-4 text-shadow">Forever loved, forever missed 🐱💕</p>
          <div class="d-flex justify-center ga-3 flex-wrap">
            <v-chip color="white" prepend-icon="mdi-heart" variant="flat">
              5 Years of Joy
            </v-chip>
            <v-chip color="white" prepend-icon="mdi-star" variant="flat">
              Forever in My Heart
            </v-chip>
          </div>
        </div>
      </div>
    </v-img>
  </v-card>
</template>

<script setup>
  import heroImage from '@/assets/cat/Whity_hero.png'
</script>

<style scoped>
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(139, 92, 246, 0.6) 0%,
    rgba(236, 72, 153, 0.6) 50%,
    rgba(249, 115, 22, 0.6) 100%
  );
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
