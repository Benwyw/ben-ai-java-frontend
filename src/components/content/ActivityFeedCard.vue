<template>
  <v-card class="mb-4" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="success">mdi-history</v-icon>
      Recent Activity
    </v-card-title>
    <v-card-text>
      <v-list v-if="!loading && activities.length > 0" lines="two">
        <v-list-item
          v-for="(activity, index) in activities"
          :key="index"
          :prepend-icon="getActivityIcon(activity.type)"
        >
          <v-list-item-title>{{ activity.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ activity.description }}
            <span class="text-caption"> · {{ formatTime(activity.timestamp) }}</span>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <div v-else-if="loading" class="py-4">
        <v-skeleton-loader v-for="i in 3" :key="i" class="mb-2" type="list-item-two-line" />
      </div>
      <div v-else class="text-center text-medium-emphasis py-6">
        <v-icon class="mb-2" size="48">mdi-clock-outline</v-icon>
        <div>No recent activity</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    activities: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  function getActivityIcon (type) {
    const icons = {
      command: 'mdi-console',
      user: 'mdi-account',
      message: 'mdi-message',
      system: 'mdi-cog',
      weight: 'mdi-scale',
      login: 'mdi-login',
      default: 'mdi-circle-small',
    }
    return icons[type] || icons.default
  }

  function formatTime (timestamp) {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60_000)
    const diffHours = Math.floor(diffMs / 3_600_000)
    const diffDays = Math.floor(diffMs / 86_400_000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }
</script>
