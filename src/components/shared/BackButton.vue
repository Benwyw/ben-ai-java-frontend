<template>
  <div class="text-center">
    <v-btn
      :to="to"
      variant="text"
      prepend-icon="mdi-arrow-left"
    >
      {{ label }}
    </v-btn>
  </div>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: '/'
  },
  label: {
    type: String,
    default: 'Back to Home'
  }
})
</script>

