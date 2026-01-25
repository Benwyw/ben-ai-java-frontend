<template>
  <v-row class="mb-6">
    <v-col v-for="stat in stats" :key="stat.label" cols="12" md="4">
      <v-card class="h-100" rounded="xl">
        <v-card-text class="text-center pa-6">
          <v-icon class="mb-3" :color="stat.color" size="48">{{ stat.icon }}</v-icon>
          <div class="text-h4 font-weight-bold mb-1">{{ stat.value }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ stat.label }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps({
    userBase: {
      type: [String, Number],
      default: '',
    },
    latestWhityWeight: {
      type: [String, Number],
      default: '',
    },
  })

  const stats = computed(() => [
    {
      icon: 'mdi-account-group',
      color: 'primary',
      value: props.userBase || '...',
      label: t('benkaneki.stats.activeUsers'),
    },
    {
      icon: 'mdi-scale-bathroom',
      color: 'success',
      value: `${props.latestWhityWeight || '...'} KG`,
      label: t('benkaneki.stats.latestWeight'),
    },
    {
      icon: 'mdi-robot',
      color: 'info',
      value: 'Discord',
      label: t('benkaneki.stats.bot'),
    },
  ])
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
