<template>
  <div>
    <!-- Error Alert -->
    <ErrorAlert :error="lastError" @close="lastError = ''" />

    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-teal"
      icon="mdi-api"
      subtitle="Utility page for Swagger JSON to Excel file conversion"
      title="Swagger"
    />

    <!-- JSON Input Card -->
    <JsonInputCard v-model="jsonString" />

    <!-- Actions Card -->
    <ActionsCard
      :has-content="!!jsonString"
      :is-loading="isLoading"
      @export-excel="generateExcelFromSwaggerJson(jsonString)"
      @export-zip="generateExcelZipFromSwaggerJson(jsonString)"
      @load-sample="loadSampleJson"
    />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import * as api from '@/api/swagger'
  import sampleSwaggerJson4Fields from '@/assets/swagger4.json'
  import sampleSwaggerJson3Fields from '@/assets/swagger.json'
  import BackButton from '@/components/shared/BackButton.vue'
  import ErrorAlert from '@/components/shared/ErrorAlert.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
  import ActionsCard from '@/components/swagger/ActionsCard.vue'
  import JsonInputCard from '@/components/swagger/JsonInputCard.vue'
  import { lastError } from '@/stores/errorStore'

  onMounted(() => {
    lastError.value = ''
  })

  const jsonString = ref('')
  const isLoading = ref(false)
  const isError = ref(false)

  function loadSampleJson (numberOfFields) {
    if (numberOfFields === 3) {
      jsonString.value = JSON.stringify(sampleSwaggerJson3Fields)
    } else if (numberOfFields === 4) {
      jsonString.value = JSON.stringify(sampleSwaggerJson4Fields)
    }
  }

  async function generateExcelFromSwaggerJson (json) {
    try {
      isLoading.value = true
      const response = await api.generateExcelFromSwaggerJson(json)
      const blob = response.data
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'data.xlsx')
      document.body.append(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function generateExcelZipFromSwaggerJson (json) {
    try {
      isLoading.value = true
      const response = await api.generateExcelZipFromSwaggerJson(json)
      const blob = response.data
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'data.zip')
      document.body.append(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }
</script>
