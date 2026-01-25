<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="pink">mdi-image-multiple</v-icon>
      Photo Gallery
      <v-chip class="ml-2" color="pink" size="small" variant="tonal">
        {{ galleryPhotos.length }} photos
      </v-chip>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(photo, index) in galleryPhotos"
          :key="photo.name"
          cols="6"
          md="3"
          sm="4"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="transition-swing cursor-pointer"
              :elevation="isHovering ? 12 : 2"
              rounded="lg"
              @click="openLightbox(index)"
            >
              <v-img
                :alt="`Whity photo ${index + 1}`"
                aspect-ratio="1"
                cover
                :lazy-src="placeholderImage"
                :src="photo.thumbnail"
              >
                <template #placeholder>
                  <v-row
                    align="center"
                    class="fill-height ma-0"
                    justify="center"
                  >
                    <v-progress-circular
                      color="pink-lighten-3"
                      indeterminate
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
          :disabled="currentIndex === 0"
          icon="mdi-chevron-left"
          variant="text"
          @click="prevPhoto"
        />
        <v-spacer />
        <span class="text-body-2 text-medium-emphasis">
          {{ currentIndex + 1 }} / {{ galleryPhotos.length }}
        </span>
        <v-spacer />
        <v-btn
          :disabled="currentIndex === galleryPhotos.length - 1"
          icon="mdi-chevron-right"
          variant="text"
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
        :alt="`Whity photo ${currentIndex + 1}`"
        :class="{ 'opacity-50': lightboxLoading }"
        contain
        max-height="70vh"
        :src="getFullImageSrc(currentIndex)"
      >
        <template #placeholder>
          <v-row
            align="center"
            class="fill-height ma-0"
            justify="center"
          >
            <v-progress-circular
              color="pink"
              indeterminate
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
   * Optimized Image Loading Strategy:
   *
   * 1. Thumbnails (300px WebP) - Used in gallery grid for fast initial load
   * 2. Full-size WebP - Used in lightbox for quality viewing
   *
   * WebP has 97%+ browser support, so no fallback needed.
   *
   * To add new photos:
   * 1. Add image files to src/assets/cat/gallery/
   * 2. Name them with Whity_ prefix and a number (e.g., Whity_13.jpeg)
   * 3. Run: npm run optimize:images
   * 4. They will be automatically loaded and sorted by number
   */

  // Optimized WebP thumbnails (small, fast-loading for grid)
  const thumbnailModules = import.meta.glob('@/assets/cat/gallery/thumbnails/*_thumb.webp', {
    eager: true,
    import: 'default',
  })

  // Full-size WebP images (loaded on-demand in lightbox)
  const fullSizeModules = import.meta.glob('@/assets/cat/gallery/webp/*.webp', {
    eager: false, // Lazy load full-size images
    import: 'default',
  })

  /**
   * Extract number from filename for sorting
   * e.g., "Whity_1.jpg" -> 1, "Whity_10_thumb.webp" -> 10
   */
  function extractNumber (filename) {
    const match = filename.match(/Whity_(\d+)/)
    return match ? Number.parseInt(match[1], 10) : 999
  }

  /**
   * Process and sort gallery photos by their numeric suffix
   * Uses optimized thumbnails for grid, with full-size for lightbox
   */
  const galleryPhotos = computed(() => {
    return Object.entries(thumbnailModules)
      .map(([path, thumbnailSrc]) => {
        const filename = path.split('/').pop()
        const baseName = filename.replace('_thumb.webp', '')
        const number = extractNumber(filename)

        // Find corresponding full-size WebP
        const fullSizeKey = Object.keys(fullSizeModules).find(k => k.includes(`${baseName}.webp`))

        return {
          name: baseName,
          thumbnail: thumbnailSrc, // Pre-loaded small thumbnail
          fullSizeLoader: fullSizeKey ? fullSizeModules[fullSizeKey] : null,
          order: number,
        }
      })
      .sort((a, b) => a.order - b.order)
  })

  // Cache for loaded full-size images
  const loadedFullImages = ref({})

  // Load full-size image on demand
  async function loadFullImage (index) {
    const photo = galleryPhotos.value[index]
    if (!photo || loadedFullImages.value[photo.name]) return loadedFullImages.value[photo.name]

    try {
      if (photo.fullSizeLoader) {
        loadedFullImages.value[photo.name] = await photo.fullSizeLoader()
        return loadedFullImages.value[photo.name]
      }
    } catch (error) {
      console.warn('Failed to load full image:', photo.name, error)
    }

    // Return thumbnail as fallback
    return photo.thumbnail
  }

  // Get full image src (cached or thumbnail while loading)
  function getFullImageSrc (index) {
    const photo = galleryPhotos.value[index]
    if (!photo) return ''
    return loadedFullImages.value[photo.name] || photo.thumbnail
  }

  // Placeholder for lazy loading (lightweight SVG)
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%23f5f5f5" width="1" height="1"/%3E%3C/svg%3E'

  // Lightbox state
  const lightboxOpen = ref(false)
  const currentIndex = ref(0)
  const lightboxLoading = ref(false)

  async function openLightbox (index) {
    currentIndex.value = index
    lightboxOpen.value = true
    lightboxLoading.value = true

    // Load current and adjacent images for smooth navigation
    await Promise.all([
      loadFullImage(index),
      loadFullImage(index - 1),
      loadFullImage(index + 1),
    ])
    lightboxLoading.value = false
  }

  async function prevPhoto () {
    if (currentIndex.value > 0) {
      currentIndex.value--
      // Preload previous image
      loadFullImage(currentIndex.value - 1)
    }
  }

  async function nextPhoto () {
    if (currentIndex.value < galleryPhotos.value.length - 1) {
      currentIndex.value++
      // Preload next image
      loadFullImage(currentIndex.value + 1)
    }
  }
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
