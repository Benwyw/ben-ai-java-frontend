<template>
  <v-card rounded="xl" class="mb-6 h-100">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="success">mdi-file-document-outline</v-icon>
      Report 2
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="params.userName"
        label="User Name"
        variant="outlined"
        rounded="lg"
        density="compact"
        class="mb-3"
      />
      <v-btn
        color="success"
        variant="flat"
        block
        :loading="isLoading"
        prepend-icon="mdi-download"
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
    default: false
  }
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

