<template>
  <v-card class="mb-4" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="primary">mdi-chart-timeline-variant</v-icon>
      Discord Activity
      <v-spacer />
      <v-chip v-if="stats?.serverCount" color="success" size="small" variant="tonal">
        Live
      </v-chip>
    </v-card-title>
    <v-card-text>
      <v-row v-if="loading">
        <v-col v-for="i in 4" :key="i" cols="6" md="3">
          <v-skeleton-loader type="text" />
        </v-col>
      </v-row>
      <v-row v-else-if="stats">
        <v-col cols="6" md="3">
          <div class="text-center">
            <div class="text-h4 font-weight-bold text-primary">
              {{ formatNumber(stats.serverCount) }}
            </div>
            <div class="text-caption text-medium-emphasis">Servers</div>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <div class="text-h4 font-weight-bold text-success">
              {{ formatNumber(stats.totalUsers) }}
            </div>
            <div class="text-caption text-medium-emphasis">Total Users</div>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <div class="text-h4 font-weight-bold text-info">
              {{ formatNumber(stats.commandsToday) }}
            </div>
            <div class="text-caption text-medium-emphasis">Commands Today</div>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <div class="text-h4 font-weight-bold text-warning">
              {{ stats.uptime || '99.9%' }}
            </div>
            <div class="text-caption text-medium-emphasis">Uptime</div>
          </div>
        </v-col>
      </v-row>
      <div v-else class="text-center text-medium-emphasis py-4">
        <v-icon class="mb-2" size="48">mdi-server-off</v-icon>
        <div>Stats unavailable</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    stats: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  function formatNumber (num) {
    if (!num) return '0'
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }
</script>
