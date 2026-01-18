<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="pink">mdi-heart</v-icon>
      In Loving Memory
    </v-card-title>
    <v-card-text>
      <p class="text-body-1 mb-4">
        This page is dedicated to <strong>Whity</strong>, my beloved cat who was by my side for over 5 wonderful years.
        From 12 July 2019 to 29 December 2024, Whity filled my life with unconditional love, warmth, and countless precious moments.
      </p>
      <p class="text-body-1 mb-4">
        I will forever love and miss you, Whity. You were more than a pet — you were family, a loyal companion, and a source of comfort through every day.
        Your memory lives on in my heart, always.
      </p>

      <v-divider class="my-4" />

      <!-- Memory highlights -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card variant="tonal" color="pink" rounded="lg" class="h-100">
            <v-card-text class="text-center">
              <v-icon size="40" color="pink" class="mb-2">mdi-paw</v-icon>
              <div class="text-h6 font-weight-bold">Playful Spirit</div>
              <div class="text-body-2 text-medium-emphasis">
                Always curious and full of life
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card variant="tonal" color="purple" rounded="lg" class="h-100">
            <v-card-text class="text-center">
              <v-icon size="40" color="purple" class="mb-2">mdi-sofa</v-icon>
              <div class="text-h6 font-weight-bold">Cuddle Expert</div>
              <div class="text-body-2 text-medium-emphasis">
                The best lap warmer and companion
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card variant="tonal" color="orange" rounded="lg" class="h-100">
            <v-card-text class="text-center">
              <v-icon size="40" color="orange" class="mb-2">mdi-star</v-icon>
              <div class="text-h6 font-weight-bold">Forever Loved</div>
              <div class="text-body-2 text-medium-emphasis">
                12 Jul 2019 — 29 Dec 2024
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
</script>
