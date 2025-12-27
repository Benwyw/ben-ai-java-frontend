<template>
  <v-card class="mb-6 h-100" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="primary">mdi-file-document</v-icon>
      Report 1
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="params.dueDays"
        class="mb-3"
        density="compact"
        label="Days"
        rounded="lg"
        type="number"
        variant="outlined"
      />
      <v-text-field
        v-model="params.rmName"
        class="mb-3"
        density="compact"
        label="RM Name"
        rounded="lg"
        variant="outlined"
      />
      <v-text-field
        v-model="params.customerNum"
        class="mb-3"
        density="compact"
        label="User Number"
        rounded="lg"
        type="number"
        variant="outlined"
      />
      <v-text-field
        v-model="params.sccStatus"
        class="mb-3"
        density="compact"
        label="DEV"
        rounded="lg"
        variant="outlined"
      />
      <v-text-field
        v-model="params.groupNum"
        class="mb-3"
        density="compact"
        label="Group Unit Number"
        rounded="lg"
        type="number"
        variant="outlined"
      />
      <v-text-field
        v-model="params.customerName"
        class="mb-3"
        density="compact"
        label="User Name"
        rounded="lg"
        variant="outlined"
      />
      <v-btn
        block
        color="primary"
        :loading="isLoading"
        prepend-icon="mdi-download"
        variant="flat"
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
      default: false,
    },
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
