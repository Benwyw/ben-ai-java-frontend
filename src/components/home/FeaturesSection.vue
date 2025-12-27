<template>
  <v-card rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-star</v-icon>
      Features
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="feature in features" :key="feature.title" cols="12" md="6">
          <v-card class="h-100" rounded="xl" variant="outlined">
            <v-card-text class="d-flex align-start">
              <v-avatar class="mr-4" :color="feature.color" size="48">
                <v-icon color="white">{{ feature.icon }}</v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-bold mb-1">{{ feature.title }}</div>
                <div class="text-body-2 text-medium-emphasis">{{ feature.description }}</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    features: {
      type: Array,
      default: () => [],
    },
  })
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
