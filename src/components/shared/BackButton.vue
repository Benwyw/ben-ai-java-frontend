<template>
  <div class="text-center">
    <v-btn
      prepend-icon="mdi-arrow-left"
      :to="to"
      variant="text"
    >
      {{ label }}
    </v-btn>
  </div>
</template>

<script setup>
  defineProps({
    to: {
      type: String,
      default: '/',
    },
    label: {
      type: String,
      default: 'Back to Home',
    },
  })
</script>
