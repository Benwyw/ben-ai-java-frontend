<template>
  <div class="text-center">
    <v-btn
      prepend-icon="mdi-arrow-left"
      :to="to"
      variant="text"
    >
      {{ label || t('nav.backToHome') }}
    </v-btn>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  defineProps({
    to: {
      type: String,
      default: '/',
    },
    label: {
      type: String,
      default: '',
    },
  })
</script>
