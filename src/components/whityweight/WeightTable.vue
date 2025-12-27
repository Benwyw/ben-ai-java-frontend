<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-chart-line</v-icon>
      Weight Records
    </v-card-title>
    <v-card-text>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        class="rounded-lg"
        :headers="headers"
        item-key="recordId"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :page="page"
        :sort-by="sortBy"
        @update:options="loadItems"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@5" />
        </template>
        <template #item.kg="{ value }">
          <v-chip color="warning" size="small" variant="tonal">
            {{ value }} KG
          </v-chip>
        </template>
      </v-data-table-server>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  import * as api from '@/api/whity'

  const COLUMN_MAP = {
    recordId: 'RECORD_ID',
    recordDate: 'RECORD_DATE',
    kg: 'KG',
    remarks: 'REMARKS',
  }

  const page = ref(1)
  const itemsPerPage = ref(10)
  const sortBy = ref([{ key: 'recordDate', order: 'desc' }])
  const headers = ref([
    {
      title: 'Date',
      align: 'start',
      sortable: true,
      key: 'recordDate',
    },
    {
      title: 'Weight',
      align: 'end',
      sortable: true,
      key: 'kg',
    },
  ])
  const serverItems = ref([])
  const loading = ref(true)
  const totalItems = ref(0)

  const defaultServerItems = [
    { recordDate: '2024-07-01', kg: 3.4 },
    { recordDate: '2024-07-06', kg: 3.5 },
  ]

  async function loadItems ({ page: newPage, itemsPerPage: newItemsPerPage, sortBy: sortByDefs }) {
    loading.value = true
    const sortByMapped = sortByDefs.map(def => COLUMN_MAP[def.key] || def.key)
    const sortDesc = sortByDefs.map(def => def.order === 'desc')
    const tempReq = {
      pageNumber: newPage,
      limit: newItemsPerPage,
      sortBy: sortByMapped,
      sortDesc,
    }
    try {
      const data = await api.getWhityWeight(tempReq)
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
