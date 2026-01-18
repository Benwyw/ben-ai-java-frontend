<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="pink">mdi-image-multiple</v-icon>
      Photo Gallery
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(photo, index) in galleryPhotos"
          :key="index"
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
      />
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'

  // Import all gallery images
  import Whity1 from '@/assets/cat/gallery/Whity_1.jpg'
  import Whity2 from '@/assets/cat/gallery/Whity_2.jpeg'
  import Whity3 from '@/assets/cat/gallery/Whity_3.jpeg'
  import Whity4 from '@/assets/cat/gallery/Whity_4.jpeg'
  import Whity5 from '@/assets/cat/gallery/Whity_5.jpeg'
  import Whity6 from '@/assets/cat/gallery/Whity_6.jpeg'
  import Whity7 from '@/assets/cat/gallery/Whity_7.jpeg'
  import Whity8 from '@/assets/cat/gallery/Whity_8.jpeg'
  import Whity10 from '@/assets/cat/gallery/Whity_10.jpeg'
  import Whity11 from '@/assets/cat/gallery/Whity_11.jpeg'
  import Whity12 from '@/assets/cat/gallery/Whity_12.jpeg'

  // Gallery photos in display order
  const galleryPhotos = [
    { src: Whity1 },
    { src: Whity2 },
    { src: Whity3 },
    { src: Whity4 },
    { src: Whity5 },
    { src: Whity6 },
    { src: Whity7 },
    { src: Whity8 },
    { src: Whity10 },
    { src: Whity11 },
    { src: Whity12 },
  ]

  // Placeholder for lazy loading
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
    if (currentIndex.value < galleryPhotos.length - 1) {
      currentIndex.value++
    }
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
