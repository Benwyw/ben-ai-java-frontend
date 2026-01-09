<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <!-- Title Section -->
        <div class="text-center mb-8">
          <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">
            Welcome to Benwyw
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Choose a product to explore
          </p>
        </div>
      </v-col>

      <!-- Product Navigation Cards -->
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 16 : 4"
            :class="{ 'on-hover': isHovering }"
            class="product-card pa-8 text-center transition-swing"
            rounded="xl"
            max-width="400"
            width="100%"
            @click="navigateTo('/noteformat')"
          >
            <v-img
              :src="noteformatIcon"
              alt="NoteFormat"
              class="mx-auto mb-4"
              height="128"
              width="128"
            />
            <v-card-title class="text-h4 font-weight-bold justify-center">
              NoteFormat
            </v-card-title>
            <v-card-subtitle class="text-body-1 mt-2">
              iOS App
            </v-card-subtitle>
            <v-card-text class="text-body-2 text-medium-emphasis mt-4">
              Note organization, expense tracking, and budget management for iOS devices.
            </v-card-text>
            <v-chip color="primary" variant="tonal" class="mt-2">
              <v-icon start>mdi-apple</v-icon>
              App Store
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 16 : 4"
            :class="{ 'on-hover': isHovering }"
            class="product-card pa-8 text-center transition-swing"
            rounded="xl"
            max-width="400"
            width="100%"
            @click="navigateTo('/benkaneki')"
          >
            <v-icon
              size="128"
              color="primary"
              class="mb-4"
            >
              mdi-robot
            </v-icon>
            <v-card-title class="text-h4 font-weight-bold justify-center">
              Ben Kaneki
            </v-card-title>
            <v-card-subtitle class="text-body-1 mt-2">
              Discord Bot
            </v-card-subtitle>
            <v-card-text class="text-body-2 text-medium-emphasis mt-4">
              A multi-purpose Discord bot with web dashboard for utilities and automation.
            </v-card-text>
            <v-chip color="info" variant="tonal" class="mt-2">
              <v-icon start>mdi-discord</v-icon>
              Discord
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import noteformatIcon from '@/assets/noteformat-128.png'

  const router = useRouter()

  function navigateTo (path) {
    router.push(path)
  }
</script>

<style scoped>
.product-card {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.product-card.on-hover {
  transform: translateY(-8px);
}
</style>

