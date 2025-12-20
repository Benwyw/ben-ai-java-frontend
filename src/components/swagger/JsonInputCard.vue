<template>
  <v-card rounded="xl" class="mb-6">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-code-json</v-icon>
      JSON Input
    </v-card-title>
    <v-card-text>
      <v-textarea
        :model-value="modelValue"
        label="Enter JSON text"
        hint="Paste your Swagger API JSON here"
        variant="outlined"
        rounded="lg"
        rows="8"
        counter
        clearable
        clear-icon="mdi-close"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
