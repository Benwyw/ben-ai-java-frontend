<template>
  <v-card class="mb-4" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="info">mdi-new-box</v-icon>
      What's New
      <v-spacer />
      <v-btn
        color="primary"
        size="small"
        variant="text"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Show Less' : 'View All' }}
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-timeline
        v-if="!loading && displayedChanges.length > 0"
        align="start"
        density="compact"
        side="end"
      >
        <v-timeline-item
          v-for="(change, index) in displayedChanges"
          :key="index"
          :dot-color="getChangeColor(change.type)"
          size="small"
        >
          <div class="d-flex align-center mb-1">
            <v-chip
              class="mr-2"
              :color="getChangeColor(change.type)"
              size="x-small"
              variant="tonal"
            >
              {{ change.type }}
            </v-chip>
            <span class="text-caption text-medium-emphasis">
              {{ formatDate(change.date) }}
            </span>
          </div>
          <div class="text-subtitle-2 font-weight-medium">{{ change.title }}</div>
          <div v-if="change.description" class="text-body-2 text-medium-emphasis">
            {{ change.description }}
          </div>
        </v-timeline-item>
      </v-timeline>
      <div v-else-if="loading" class="py-4">
        <v-skeleton-loader v-for="i in 3" :key="i" class="mb-2" type="list-item" />
      </div>
      <div v-else class="text-center text-medium-emphasis py-6">
        <v-icon class="mb-2" size="48">mdi-file-document-outline</v-icon>
        <div>No recent updates</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const props = defineProps({
    changelog: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    initialLimit: {
      type: Number,
      default: 3,
    },
  })

  const showAll = ref(false)

  const displayedChanges = computed(() => {
    if (showAll.value) return props.changelog
    return props.changelog.slice(0, props.initialLimit)
  })

  function getChangeColor (type) {
    const colors = {
      feature: 'success',
      fix: 'warning',
      breaking: 'error',
      improvement: 'info',
      security: 'error',
      default: 'primary',
    }
    return colors[type?.toLowerCase()] || colors.default
  }

  function formatDate (dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
</script>
