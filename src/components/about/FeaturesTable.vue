<template>
  <v-card rounded="xl" class="mb-6">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-feature-search</v-icon>
      Bot Features
    </v-card-title>
    <v-card-text>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :page="page"
        class="rounded-lg"
        item-key="featureId"
        @update:options="loadItems"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@5" />
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import * as api from '@/api/misc'

const page = ref(1)
const itemsPerPage = ref(10)
const headers = ref([
  {
    title: 'Features',
    align: 'start',
    sortable: true,
    key: 'featureName',
  },
  {
    title: 'Description',
    align: 'end',
    sortable: true,
    key: 'featureDescription'
  }
])
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)

const defaultServerItems = [
  { featureName: 'Music', featureDescription: 4 },
  { featureName: 'News Feed', featureDescription: 1 }
]

async function loadItems({ page: newPage, itemsPerPage: newItemsPerPage }) {
  loading.value = true
  try {
    const data = await api.getFeatures(newPage, newItemsPerPage)
    serverItems.value = data.records
    totalItems.value = data.total
  } catch (error) {
    console.error('Using default features due to API failure', error)
    serverItems.value = defaultServerItems
    totalItems.value = defaultServerItems.length
  } finally {
    loading.value = false
  }
}
</script>
