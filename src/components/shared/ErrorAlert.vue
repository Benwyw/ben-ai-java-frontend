<template>
  <v-alert
    v-if="error"
    class="mb-4"
    closable
    rounded="xl"
    type="error"
    @click:close="$emit('close')"
  >
    {{ error }}
  </v-alert>
</template>

<script setup>
  defineProps({
    error: {
      type: String,
      default: '',
    },
  })

  defineEmits(['close'])
</script>
