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
  const stats = [
    {
      icon: 'mdi-note-multiple',
      color: 'primary',
      value: 'Notes',
      label: 'Organize Thoughts',
    },
    {
      icon: 'mdi-cash-multiple',
      color: 'success',
      value: 'Expenses',
      label: 'Track Spending',
    },
    {
      icon: 'mdi-chart-pie',
      color: 'info',
      value: 'Reports',
      label: 'Visual Analytics',
    },
  ]
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
