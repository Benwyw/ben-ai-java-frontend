<template>
  <v-slide-y-transition>
    <div
      v-if="isVisible"
      class="app-store-banner-wrapper"
    >
      <v-card
        class="app-store-banner mx-auto"
        :color="appearance.backgroundColor"
        elevation="4"
        rounded="pill"
      >
        <div class="d-flex align-center pa-2 pl-3">
          <!-- App Icon -->
          <v-avatar
            class="mr-3 flex-shrink-0"
            rounded="lg"
            size="36"
          >
            <v-img
              :alt="`${displayData.appName} App Icon`"
              :src="displayData.appIcon"
            />
          </v-avatar>

          <!-- App Info -->
          <div class="d-flex flex-column mr-3">
            <span class="text-body-2 font-weight-bold">
              {{ displayData.appName }}
            </span>
            <span class="text-caption text-medium-emphasis">
              {{ displayData.description }}
            </span>
          </div>

          <!-- Actions -->
          <v-btn
            class="mr-1"
            :color="appearance.buttonColor"
            :href="displayData.appStoreUrl"
            rel="noopener"
            rounded="pill"
            size="small"
            target="_blank"
            variant="flat"
          >
            {{ displayData.buttonText }}
          </v-btn>
          <v-btn
            density="comfortable"
            icon="mdi-close"
            size="x-small"
            variant="text"
            @click="dismiss"
          />
        </div>
      </v-card>
    </div>
  </v-slide-y-transition>
</template>

<script setup>
  import { useAppStoreBanner } from '@/composables/useAppStoreBanner'

  const {
    isVisible,
    displayData,
    appearance,
    dismiss,
  } = useAppStoreBanner()
</script>

<style scoped>
.app-store-banner-wrapper {
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.app-store-banner {
  pointer-events: auto;
  max-width: 420px;
}
</style>
