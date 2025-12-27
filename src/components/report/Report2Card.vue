<template>
  <v-card class="mb-6 h-100" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="success">mdi-file-document-outline</v-icon>
      Report 2
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="params.userName"
        class="mb-3"
        density="compact"
        label="User Name"
        rounded="lg"
        variant="outlined"
      />
      <v-btn
        block
        color="success"
        :loading="isLoading"
        prepend-icon="mdi-download"
        variant="flat"
        @click="$emit('generate', params)"
      >
        Generate Report 2
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { reactive } from 'vue'

  defineProps({
    isLoading: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['generate'])

  const params = reactive({
    userName: '',
  })
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
