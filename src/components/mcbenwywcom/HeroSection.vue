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
        <v-chip color="white" prepend-icon="mdi-archive" variant="flat">
          {{ t('minecraft.serverArchivedChip') }}
        </v-chip>
      </div>
      <v-hover v-slot="{ isHovering, props }">
        <v-btn
          v-bind="props"
          :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"
          class="text-none"
          color="white"
          :elevation="isHovering ? 8 : 2"
          href="https://www.instagram.com/mcbenwywcom/"
          prepend-icon="mdi-instagram"
          rounded="pill"
          size="large"
          target="_blank"
          variant="flat"
        >
          {{ t('minecraft.viewOnInstagram') }}
        </v-btn>
      </v-hover>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<style scoped>
.bg-gradient-minecraft {
  background: linear-gradient(135deg, #4CAF50 0%, #1B5E20 100%);
}
</style>
