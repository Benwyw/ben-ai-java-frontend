<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-feature-search</v-icon>
      {{ t('benkaneki.botFeatures') }}
    </v-card-title>
    <v-card-text>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        class="rounded-lg"
        :headers="headers"
        item-key="featureId"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :page="page"
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
  import { useI18n } from 'vue-i18n'
  import * as api from '@/api/misc'

  const { t } = useI18n()

  const page = ref(1)
  const itemsPerPage = ref(10)
  const headers = ref([
    {
      title: t('common.features'),
      align: 'start',
      sortable: true,
      key: 'featureName',
    },
    {
      title: t('common.description'),
      align: 'end',
      sortable: true,
      key: 'featureDescription',
    },
  ])
  const serverItems = ref([])
  const loading = ref(true)
  const totalItems = ref(0)

  const defaultServerItems = [
    { featureName: 'Music', featureDescription: 4 },
    { featureName: 'News Feed', featureDescription: 1 },
  ]

  async function loadItems ({ page: newPage, itemsPerPage: newItemsPerPage }) {
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
