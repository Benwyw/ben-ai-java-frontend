<template>
  <v-card
    class="mb-6 bg-gradient-cat"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-8 text-center">
      <v-avatar
        class="mb-4 elevation-8"
        size="180"
      >
        <v-img
          alt="Whity the Cat"
          src="@/assets/cat/Whity_hero.png"
          cover
        />
      </v-avatar>
      <h1 class="text-h3 font-weight-bold text-white mb-2">Whity</h1>
      <p class="text-h6 text-white-darken-1 mb-2">12 July 2019 — 29 December 2024</p>
      <p class="text-body-1 text-white-darken-2 mb-4">Forever loved, forever missed 🐱💕</p>
      <div class="d-flex justify-center ga-3 flex-wrap">
        <v-chip color="white" prepend-icon="mdi-heart" variant="flat">
          5 Years of Joy
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-star" variant="flat">
          Forever in My Heart
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
</script>

<style scoped>
.bg-gradient-cat {
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F97316 100%);
}
</style>
