<template>
  <v-alert
    v-if="error"
    type="error"
    closable
    class="mb-4"
    rounded="xl"
    @click:close="$emit('close')"
  >
    {{ error }}
  </v-alert>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['close'])
</script>

