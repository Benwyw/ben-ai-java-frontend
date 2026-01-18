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
          <p class="text-body-2 text-white mb-1 text-shadow">✨ 🕊️ ✨</p>
          <h1 class="text-h3 text-md-h2 font-weight-bold text-white mb-2 text-shadow angel-glow">Whity</h1>
          <p class="text-h6 text-white mb-2 text-shadow">12 July 2019 — 29 December 2024</p>
          <p class="text-body-1 text-white mb-4 text-shadow">Forever loved, forever missed 🐱💫</p>
          <div class="d-flex justify-center ga-3 flex-wrap">
            <v-chip color="white" prepend-icon="mdi-heart" variant="flat">
              5 Years of Joy
            </v-chip>
            <v-chip color="white" prepend-icon="mdi-star-four-points" variant="flat">
              Forever in My Heart
            </v-chip>
          </div>
          <p class="text-body-2 text-white mt-4 text-shadow font-italic">
            "Until we meet again at the rainbow bridge" 🌈
          </p>
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
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 223, 186, 0.4) 30%,
    rgba(173, 216, 230, 0.5) 70%,
    rgba(255, 255, 255, 0.4) 100%
  );
  backdrop-filter: brightness(1.1);
}

.text-shadow {
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5),
    2px 2px 4px rgba(0, 0, 0, 0.3);
}

.angel-glow {
  text-shadow:
    0 0 15px rgba(255, 255, 255, 1),
    0 0 30px rgba(255, 215, 0, 0.8),
    0 0 45px rgba(255, 215, 0, 0.5),
    2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.05em;
}

.font-italic {
  font-style: italic;
}
</style>
