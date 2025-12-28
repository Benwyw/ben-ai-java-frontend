<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-code-json</v-icon>
      JSON Input
    </v-card-title>
    <v-card-text>
      <v-textarea
        clear-icon="mdi-close"
        clearable
        counter
        hint="Paste your Swagger API JSON here"
        label="Enter JSON text"
        :model-value="modelValue"
        rounded="lg"
        rows="8"
        variant="outlined"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })

  defineEmits(['update:modelValue'])
</script>
