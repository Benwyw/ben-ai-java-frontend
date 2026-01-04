<template>
  <v-card class="mb-6" rounded="xl">
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
              color="primary"
              prepend-icon="mdi-file-document"
              variant="tonal"
              @click="$emit('load-sample', 3)"
            >
              3 Fields Sample
            </v-btn>
            <v-btn
              color="primary"
              prepend-icon="mdi-file-document-multiple"
              variant="tonal"
              @click="$emit('load-sample', 4)"
            >
              4 Fields Sample
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 mb-3 text-medium-emphasis">Export Options</div>
          <div class="d-flex ga-2 flex-wrap">
            <v-btn
              color="success"
              :disabled="!hasContent"
              :loading="isLoading"
              prepend-icon="mdi-file-excel"
              variant="flat"
              @click="$emit('export-excel')"
            >
              Download Excel
            </v-btn>
            <v-btn
              color="info"
              :disabled="!hasContent"
              :loading="isLoading"
              prepend-icon="mdi-folder-zip"
              variant="flat"
              @click="$emit('export-zip')"
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
      default: false,
    },
    hasContent: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['load-sample', 'export-excel', 'export-zip'])
</script>
