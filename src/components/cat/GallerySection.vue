<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="pink">mdi-image-multiple</v-icon>
      Photo Gallery
      <v-chip class="ml-2" size="small" color="pink" variant="tonal">
        {{ galleryPhotos.length }} photos
      </v-chip>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(photo, index) in galleryPhotos"
          :key="photo.name"
          cols="6"
          sm="4"
          md="3"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 12 : 2"
              class="transition-swing cursor-pointer"
              rounded="lg"
              @click="openLightbox(index)"
            >
              <v-img
                :src="photo.src"
                :alt="`Whity photo ${index + 1}`"
                aspect-ratio="1"
                cover
                :lazy-src="placeholderImage"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="pink-lighten-3"
                      size="24"
                    />
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <!-- Lightbox Dialog -->
  <v-dialog
    v-model="lightboxOpen"
    max-width="900"
  >
    <v-card rounded="xl">
      <v-toolbar color="transparent" density="compact">
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          :disabled="currentIndex === 0"
          @click="prevPhoto"
        />
        <v-spacer />
        <span class="text-body-2 text-medium-emphasis">
          {{ currentIndex + 1 }} / {{ galleryPhotos.length }}
        </span>
        <v-spacer />
        <v-btn
          icon="mdi-chevron-right"
          variant="text"
          :disabled="currentIndex === galleryPhotos.length - 1"
          @click="nextPhoto"
        />
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="lightboxOpen = false"
        />
      </v-toolbar>
      <v-img
        v-if="galleryPhotos[currentIndex]"
        :src="galleryPhotos[currentIndex].src"
        :alt="`Whity photo ${currentIndex + 1}`"
        max-height="70vh"
        contain
      >
        <template #placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="pink"
            />
          </v-row>
        </template>
      </v-img>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { computed, ref } from 'vue'

  /**
   * Dynamically import all images from the gallery folder
   * Supports: .jpg, .jpeg, .png, .webp, .gif
   *
   * To add new photos:
   * 1. Add image files to src/assets/cat/gallery/
   * 2. Name them with Whity_ prefix and a number (e.g., Whity_13.jpeg)
   * 3. They will be automatically loaded and sorted by number
   */
  const imageModules = import.meta.glob('@/assets/cat/gallery/Whity_*.(jpg|jpeg|png|webp|gif)', {
    eager: true,
    import: 'default',
  })

  /**
   * Extract number from filename for sorting
   * e.g., "Whity_1.jpg" -> 1, "Whity_10.jpeg" -> 10
   */
  function extractNumber (filename) {
    const match = filename.match(/Whity_(\d+)/)
    return match ? parseInt(match[1], 10) : 999
  }

  /**
   * Process and sort gallery photos by their numeric suffix
   */
  const galleryPhotos = computed(() => {
    return Object.entries(imageModules)
      .map(([path, src]) => {
        const filename = path.split('/').pop()
        return {
          name: filename,
          src,
          order: extractNumber(filename),
        }
      })
      .sort((a, b) => a.order - b.order)
  })

  // Placeholder for lazy loading (lightweight SVG)
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%23f5f5f5" width="1" height="1"/%3E%3C/svg%3E'

  // Lightbox state
  const lightboxOpen = ref(false)
  const currentIndex = ref(0)

  const openLightbox = index => {
    currentIndex.value = index
    lightboxOpen.value = true
  }

  const prevPhoto = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  const nextPhoto = () => {
    if (currentIndex.value < galleryPhotos.value.length - 1) {
      currentIndex.value++
    }
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
