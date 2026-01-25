<template>
  <v-card
    class="mb-6"
    rounded="xl"
    variant="flat"
  >
    <div class="hero-container rounded-xl">
      <!-- Video Background -->
      <video
        ref="videoRef"
        autoplay
        class="hero-video"
        loop
        muted
        playsinline
        :poster="heroImage"
        preload="metadata"
        @loadeddata="onVideoLoaded"
      >
        <source :src="heroVideo" type="video/mp4">
      </video>

      <!-- Fallback Image (shows while video loads) -->
      <img
        v-if="!videoLoaded"
        alt="Whity the Cat"
        class="hero-fallback"
        :src="heroImage"
      >

      <!-- Content Overlay -->
      <div class="d-flex align-center justify-center fill-height hero-overlay">
        <div class="text-center px-4">
          <p class="text-body-2 text-white mb-1 text-shadow">✨ 🕊️ ✨</p>
          <h1 class="text-h3 text-md-h2 font-weight-bold text-white mb-0 text-shadow angel-glow">Whity</h1>
          <p class="text-h6 text-white-darken-1 mb-2 text-shadow">小白</p>
          <p class="text-body-1 text-white mb-3 text-shadow">12 July 2019 — 29 December 2024</p>
          <p class="text-body-1 text-white mb-1 text-shadow">Forever loved, forever missed 🐱💫</p>
          <p class="text-body-2 text-white-darken-1 mb-4 text-shadow">永遠愛你，永遠懷念</p>
          <div class="d-flex justify-center ga-2 flex-wrap mb-2">
            <v-chip color="white" prepend-icon="mdi-heart" size="small" variant="flat">
              5 Years of Joy ｜ 五年快樂時光
            </v-chip>
            <v-chip color="white" prepend-icon="mdi-star-four-points" size="small" variant="flat">
              Forever in My Heart ｜ 永在我心
            </v-chip>
          </div>
          <p class="text-body-2 text-white mt-3 text-shadow font-italic">
            "Until we meet again at the rainbow bridge" 🌈
          </p>
          <p class="text-caption text-white-darken-1 text-shadow font-italic">
            「直到我們在彩虹橋再重逢」
          </p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  // Use optimized WebP (97%+ browser support)
  import heroImage from '@/assets/cat/Whity_hero.webp'
  import heroVideo from '@/assets/cat/Whity_hero_video.mp4'

  const videoRef = ref(null)
  const videoLoaded = ref(false)

  function onVideoLoaded () {
    videoLoaded.value = true
  }
</script>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 223, 186, 0.9) 50%,
    rgba(173, 216, 230, 0.9) 100%
  );
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
}

.hero-fallback {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 223, 186, 0.4) 30%,
    rgba(173, 216, 230, 0.5) 70%,
    rgba(255, 255, 255, 0.4) 100%
  );
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
