<template>
  <div>
    <!-- Hero Section -->
    <v-card
      class="mb-6 bg-gradient-minecraft"
      rounded="xl"
      variant="flat"
    >
      <v-card-text class="py-8 text-center">
        <v-icon class="mb-2" color="white" size="60">mdi-domain</v-icon>
        <h1 class="text-h4 font-weight-bold text-white mb-2">Great Buildings</h1>
        <p class="text-body-1 text-white-darken-1">Showcase of amazing builds from mc.benwyw.com</p>
      </v-card-text>
    </v-card>

    <!-- Coming Soon Notice -->
    <v-card class="mb-6" rounded="xl">
      <v-card-text class="text-center py-12">
        <v-icon class="mb-4" color="blue" size="80">mdi-hammer-wrench</v-icon>
        <h2 class="text-h5 font-weight-bold mb-2">Under Construction</h2>
        <p class="text-body-1 text-medium-emphasis">
          This page is being developed. Check back later for amazing builds from our community!
        </p>
      </v-card-text>
    </v-card>

    <!-- Placeholder Gallery -->
    <v-card rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="blue">mdi-image-multiple</v-icon>
        Featured Builds
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="h-100" rounded="xl" variant="outlined">
              <v-card-text class="text-center pa-8">
                <v-icon class="mb-2" color="grey" size="60">mdi-image-off</v-icon>
                <div class="text-body-2 text-medium-emphasis">Coming soon...</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="h-100" rounded="xl" variant="outlined">
              <v-card-text class="text-center pa-8">
                <v-icon class="mb-2" color="grey" size="60">mdi-image-off</v-icon>
                <div class="text-body-2 text-medium-emphasis">Coming soon...</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="h-100" rounded="xl" variant="outlined">
              <v-card-text class="text-center pa-8">
                <v-icon class="mb-2" color="grey" size="60">mdi-image-off</v-icon>
                <div class="text-body-2 text-medium-emphasis">Coming soon...</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.bg-gradient-minecraft {
  background: linear-gradient(135deg, #2196F3 0%, #0D47A1 100%);
}

.h-100 {
  height: 100%;
}
</style>
