<template>
  <v-card
    class="mb-6 bg-gradient-minecraft"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-img
        alt="Ben's Minecraft Server"
        class="mb-4 mx-auto drop-shadow"
        height="120"
        src="@/assets/mcbenwywcom/mcbenwywcom_logo-794x439.webp"
      />
      <h1 class="text-h3 font-weight-bold text-white mb-2">{{ t('minecraft.title') }}</h1>
      <p class="text-h6 text-white-darken-1 mb-4">{{ t('minecraft.heroSubtitle') }}</p>
      <div class="d-flex justify-center ga-3 flex-wrap mb-4">
        <v-chip color="white" prepend-icon="mdi-minecraft" variant="flat">
          {{ t('minecraft.javaEditionChip') }}
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
      <!-- Social Media Links -->
      <div aria-label="Follow Ben's Minecraft Server on Social Media" class="d-flex justify-center ga-2 mt-4" role="navigation">
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
            <img alt="Discord" :src="discordIcon" style="width: 20px; height: 20px;" />
          </v-btn>
        </v-hover>
      </div>
<!--      <v-hover v-slot="{ isHovering, props }">-->
<!--        <v-btn-->
<!--          v-bind="props"-->
<!--          :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"-->
<!--          class="text-none"-->
<!--          color="white"-->
<!--          :elevation="isHovering ? 8 : 2"-->
<!--          href="https://www.instagram.com/mcbenwywcom/"-->
<!--          prepend-icon="mdi-instagram"-->
<!--          rounded="pill"-->
<!--          size="large"-->
<!--          target="_blank"-->
<!--          variant="flat"-->
<!--        >-->
<!--          {{ t('minecraft.viewOnInstagram') }}-->
<!--        </v-btn>-->
<!--      </v-hover>-->

      <!-- 補上 Snackbar 彈出提示 -->
      <v-snackbar
        v-model="snackbar"
        color="success"
        location="bottom"
        :timeout="2000"
        rounded="pill"
      >
        <div class="text-center font-weight-medium">
          {{ t('minecraft.copySuccess') }}
        </div>
      </v-snackbar>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import discordIcon from '@/assets/discord.svg'

  const { t } = useI18n()
  const snackbar = ref(false)

  const copyIp = async () => {
    try {
      const ipText = t('minecraft.serverIp')
      await navigator.clipboard.writeText(ipText)
      snackbar.value = true
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }
</script>

<style scoped>
.bg-gradient-minecraft {
  background: linear-gradient(135deg, #4CAF50 0%, #1B5E20 100%);
}

.discord-icon {
  width: 18px;
  height: 18px;
  filter: invert(37%) sepia(98%) saturate(1285%) hue-rotate(196deg) brightness(95%) contrast(87%);
}
</style>
