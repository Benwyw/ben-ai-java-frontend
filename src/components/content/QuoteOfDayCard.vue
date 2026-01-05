<template>
  <v-card
    class="mb-4 quote-card"
    :class="isDark ? 'bg-grey-darken-4' : 'bg-grey-lighten-4'"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-6 px-6">
      <div v-if="loading" class="text-center">
        <v-progress-circular indeterminate size="32" />
      </div>
      <div v-else-if="quote">
        <v-icon class="mb-2 text-medium-emphasis" size="32">mdi-format-quote-open</v-icon>
        <blockquote class="text-h6 font-weight-light font-italic mb-3">
          {{ quote.text }}
        </blockquote>
        <div class="text-subtitle-2 text-medium-emphasis">
          — {{ quote.author || 'Unknown' }}
          <span v-if="quote.source" class="text-caption">, {{ quote.source }}</span>
        </div>
      </div>
      <div v-else class="text-center text-medium-emphasis">
        <v-icon class="mb-2" size="48">mdi-format-quote-close</v-icon>
        <div>No quote available</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  defineProps({
    quote: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const theme = useTheme()
  const isDark = computed(() => theme.global.current.value.dark)
</script>

<style scoped>
.quote-card blockquote {
  line-height: 1.6;
}
</style>
