<template>
  <v-card
    class="mb-6"
    rounded="xl"
    variant="flat"
  >
    <div class="hero-container rounded-xl">
      <video
        ref="videoRef"
        autoplay
        class="hero-background"
        loop
        muted
        playsinline
        :poster="heroImage"
        preload="metadata"
        @loadeddata="onVideoLoaded"
      >
        <source :src="heroVideo" type="video/mp4">
      </video>

      <img
        v-if="!videoLoaded"
        alt="Ben's Minecraft Server"
        class="hero-background hero-fallback"
        :src="heroImage"
      >

      <div class="d-flex align-center justify-center fill-height hero-overlay">
        <div class="text-center px-4 hero-content">
          <v-img
            alt="Ben's Minecraft Server logo"
            class="mb-4 mx-auto drop-shadow"
            height="120"
            :src="logoImage"
          />
          <h1 class="text-h3 font-weight-bold text-white mb-2 text-shadow">{{ t('minecraft.title') }}</h1>
          <p class="text-h6 text-white mb-4 text-shadow">{{ t('minecraft.heroSubtitle') }}</p>
          <div class="d-flex justify-center ga-3 flex-wrap mb-4">
            <v-chip color="white" prepend-icon="mdi-minecraft" variant="flat">
              {{ t('minecraft.javaEditionChip') }}
            </v-chip>
            <v-chip color="white" prepend-icon="mdi-cellphone-play" variant="flat">
              {{ t('minecraft.bedrockEditionChip') }}
            </v-chip>
            <v-chip color="white" prepend-icon="mdi-tree" variant="flat">
              {{ t('minecraft.survivalModeChip') }}
            </v-chip>
            <v-chip color="white" prepend-icon="mdi-ip" variant="flat" @click="copyIp">
              {{ t('minecraft.serverIp') }}
              <v-tooltip activator="parent" location="top">
                {{ t('minecraft.clickToCopyIp') }}
              </v-tooltip>
            </v-chip>
          </div>
        </div>
      </div>

      <!-- Social Media Links -->
      <div aria-label="Follow Ben's Minecraft Server on Social Media" class="d-flex justify-center ga-2 social-links" role="navigation">
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            v-bind="props"
            aria-label="Follow Ben's Minecraft Server on Instagram"
            :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"
            color="white"
            :elevation="isHovering ? 4 : 1"
            href="https://www.instagram.com/mcbenwywcom/"
            icon="mdi-instagram"
            rel="noopener"
            size="small"
            target="_blank"
            variant="flat"
          />
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            v-bind="props"
            aria-label="Follow Ben's Minecraft Server on Facebook"
            :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"
            color="white"
            :elevation="isHovering ? 4 : 1"
            href="https://www.facebook.com/mcbenwyw.com"
            icon="mdi-facebook"
            rel="noopener"
            size="small"
            target="_blank"
            variant="flat"
          />
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            v-bind="props"
            aria-label="Join Ben's Minecraft Server on Discord"
            :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"
            color="white"
            :elevation="isHovering ? 4 : 1"
            href="https://discord.benwyw.com/"
            icon
            rel="noopener"
            size="small"
            target="_blank"
            variant="flat"
          >
            <img alt="Discord" :src="discordIcon" style="width: 20px; height: 20px;">
          </v-btn>
        </v-hover>
      </div>
      <v-snackbar
        v-model="snackbar"
        color="success"
        location="bottom"
        rounded="pill"
        :timeout="2000"
      >
        <div class="text-center font-weight-medium">
          {{ t('minecraft.copySuccess') }}
        </div>
      </v-snackbar>
    </div>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import discordIcon from '@/assets/discord.svg'
  import heroImage from '@/assets/mcbenwywcom/mcbenwywcom-cover-vid-h.gif'
  import heroVideo from '@/assets/mcbenwywcom/mcbenwywcom-cover-vid-h.mp4'
  import logoImage from '@/assets/mcbenwywcom/mcbenwywcom_logo-794x439.webp'

  const { t } = useI18n()
  const videoRef = ref(null)
  const snackbar = ref(false)
  const videoLoaded = ref(false)

  function onVideoLoaded () {
    videoLoaded.value = true
  }

  async function copyIp () {
    try {
      const ipText = t('minecraft.serverIp')
      await navigator.clipboard.writeText(ipText)
      snackbar.value = true
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }
</script>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
  min-height: 430px;
  overflow: hidden;
  background: #1b5e20;
  --hero-content-opacity: 0.48;
  --hero-content-blur: 8px;
}

.hero-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-fallback {
  z-index: 1;
}

video.hero-background {
  z-index: 0;
}

.hero-overlay {
  position: relative;
  z-index: 1;
  min-height: 430px;
  padding: 2rem 1rem 5rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.18),
    rgba(0, 0, 0, 0.58)
  );
}

.hero-content {
  max-width: min(720px, 100%);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 1rem;
  background: rgba(0, 0, 0, var(--hero-content-opacity));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(var(--hero-content-blur));
  backdrop-filter: blur(var(--hero-content-blur));
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.65);
}

.social-links {
  position: absolute;
  right: 0;
  bottom: 1.5rem;
  left: 0;
  z-index: 2;
}

.discord-icon {
  width: 18px;
  height: 18px;
  filter: invert(37%) sepia(98%) saturate(1285%) hue-rotate(196deg) brightness(95%) contrast(87%);
}
</style>
