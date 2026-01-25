<template>
  <v-row class="mb-6">
    <v-col cols="12" md="4">
      <v-card class="h-100" rounded="xl">
        <v-card-text class="text-center">
          <v-icon class="mb-2" color="amber" size="40">mdi-star</v-icon>
          <div class="text-h4 font-weight-bold">2019</div>
          <div class="text-caption text-medium-emphasis">{{ t('minecraft.stats.founded') }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card class="h-100" rounded="xl">
        <v-card-text class="text-center">
          <v-icon class="mb-2" color="green" size="40">mdi-account-group</v-icon>
          <div class="text-h4 font-weight-bold">100+</div>
          <div class="text-caption text-medium-emphasis">{{ t('minecraft.stats.playersServed') }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card class="h-100" rounded="xl">
        <v-card-text class="text-center">
          <v-icon class="mb-2" color="blue" size="40">mdi-domain</v-icon>
          <div class="text-h4 font-weight-bold">1000+</div>
          <div class="text-caption text-medium-emphasis">{{ t('minecraft.stats.buildsCreated') }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
