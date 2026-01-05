<template>
  <v-card class="mb-4" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="warning">mdi-fire</v-icon>
      Trending
    </v-card-title>
    <v-card-text>
      <div v-if="loading">
        <v-skeleton-loader v-for="i in 3" :key="i" class="mb-2" type="list-item" />
      </div>
      <div v-else-if="trending && trending.length > 0">
        <v-list density="compact">
          <v-list-item
            v-for="(item, index) in trending"
            :key="index"
            :prepend-icon="getTrendIcon(item.trend)"
          >
            <template #prepend>
              <div class="d-flex align-center mr-3">
                <span class="text-h6 font-weight-bold text-medium-emphasis mr-2">
                  #{{ index + 1 }}
                </span>
                <v-icon :color="getTrendColor(item.trend)" size="small">
                  {{ getTrendIcon(item.trend) }}
                </v-icon>
              </div>
            </template>
            <v-list-item-title class="font-weight-medium">
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.count }} {{ item.unit || 'uses' }}
              <span v-if="item.change" :class="getTrendColor(item.trend) + '--text'">
                ({{ item.change > 0 ? '+' : '' }}{{ item.change }}%)
              </span>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>
      <div v-else class="text-center text-medium-emphasis py-6">
        <v-icon class="mb-2" size="48">mdi-chart-line</v-icon>
        <div>No trending data</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    trending: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  function getTrendIcon (trend) {
    if (trend === 'up') return 'mdi-trending-up'
    if (trend === 'down') return 'mdi-trending-down'
    return 'mdi-trending-neutral'
  }

  function getTrendColor (trend) {
    if (trend === 'up') return 'success'
    if (trend === 'down') return 'error'
    return 'grey'
  }
</script>
