<template>
  <v-card class="mb-4" rounded="xl" variant="outlined">
    <v-card-text class="d-flex align-center">
      <v-avatar class="mr-4" color="amber" size="48">
        <v-icon color="white">mdi-lightbulb</v-icon>
      </v-avatar>
      <div class="flex-grow-1">
        <div class="text-overline text-medium-emphasis mb-1">
          {{ label }}
        </div>
        <div v-if="loading" class="d-flex align-center">
          <v-progress-circular class="mr-2" indeterminate size="16" width="2" />
          <span class="text-medium-emphasis">Loading...</span>
        </div>
        <div v-else-if="tip" class="text-body-1">
          {{ tip.content }}
        </div>
        <div v-else class="text-body-2 text-medium-emphasis">
          No tip available
        </div>
      </div>
      <v-btn
        v-if="!loading"
        color="primary"
        icon="mdi-refresh"
        size="small"
        variant="text"
        @click="$emit('refresh')"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    tip: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Tip of the Day',
    },
  })

  defineEmits(['refresh'])
</script>
