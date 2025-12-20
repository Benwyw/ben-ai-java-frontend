<template>
  <v-card rounded="xl" class="mb-6">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-cog</v-icon>
      Actions
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 mb-3 text-medium-emphasis">Load Sample Data</div>
          <div class="d-flex ga-2 flex-wrap">
            <v-btn
              variant="tonal"
              color="primary"
              prepend-icon="mdi-file-document"
              @click="$emit('loadSample', 3)"
            >
              3 Fields Sample
            </v-btn>
            <v-btn
              variant="tonal"
              color="primary"
              prepend-icon="mdi-file-document-multiple"
              @click="$emit('loadSample', 4)"
            >
              4 Fields Sample
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 mb-3 text-medium-emphasis">Export Options</div>
          <div class="d-flex ga-2 flex-wrap">
            <v-btn
              variant="flat"
              color="success"
              prepend-icon="mdi-file-excel"
              :loading="isLoading"
              :disabled="!hasContent"
              @click="$emit('exportExcel')"
            >
              Download Excel
            </v-btn>
            <v-btn
              variant="flat"
              color="info"
              prepend-icon="mdi-folder-zip"
              :loading="isLoading"
              :disabled="!hasContent"
              @click="$emit('exportZip')"
            >
              Download ZIP
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  hasContent: {
    type: Boolean,
    default: false
  }
})

defineEmits(['loadSample', 'exportExcel', 'exportZip'])
</script>

