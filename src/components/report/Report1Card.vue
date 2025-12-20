<template>
  <v-card rounded="xl" class="mb-6 h-100">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="primary">mdi-file-document</v-icon>
      Report 1
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="params.dueDays"
        label="Days"
        type="number"
        variant="outlined"
        rounded="lg"
        density="compact"
        class="mb-3"
      />
      <v-text-field
        v-model="params.rmName"
        label="RM Name"
        variant="outlined"
        rounded="lg"
        density="compact"
        class="mb-3"
      />
      <v-text-field
        v-model="params.customerNum"
        label="User Number"
        type="number"
        variant="outlined"
        rounded="lg"
        density="compact"
        class="mb-3"
      />
      <v-text-field
        v-model="params.sccStatus"
        label="DEV"
        variant="outlined"
        rounded="lg"
        density="compact"
        class="mb-3"
      />
      <v-text-field
        v-model="params.groupNum"
        label="Group Unit Number"
        type="number"
        variant="outlined"
        rounded="lg"
        density="compact"
        class="mb-3"
      />
      <v-text-field
        v-model="params.customerName"
        label="User Name"
        variant="outlined"
        rounded="lg"
        density="compact"
        class="mb-3"
      />
      <v-btn
        color="primary"
        variant="flat"
        block
        :loading="isLoading"
        prepend-icon="mdi-download"
        @click="$emit('generate', params)"
      >
        Generate Report 1
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
  dueDays: null,
  rmName: '',
  customerNum: null,
  sccStatus: '',
  groupNum: null,
  customerName: '',
})
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
