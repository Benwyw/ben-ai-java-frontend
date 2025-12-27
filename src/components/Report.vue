<template>
  <div>
    <!-- Error Alert -->
    <ErrorAlert :error="lastError" @close="lastError = ''" />

    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-error"
      icon="mdi-file-chart"
      subtitle="Utility page for Report generation"
      title="Report"
    />

    <!-- Report Cards -->
    <v-row>
      <v-col cols="12" md="6">
        <Report1Card :is-loading="isLoading" @generate="generateTestReport1" />
      </v-col>
      <v-col cols="12" md="6">
        <Report2Card :is-loading="isLoading" @generate="generateTestReport2" />
      </v-col>
    </v-row>

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import * as api from '@/api/report'
  import Report1Card from '@/components/report/Report1Card.vue'
  import Report2Card from '@/components/report/Report2Card.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import ErrorAlert from '@/components/shared/ErrorAlert.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
  import { lastError } from '@/stores/errorStore'

  onMounted(() => {
    lastError.value = ''
  })

  const isLoading = ref(false)
  const isError = ref(false)

  async function generateTestReport1 (params) {
    try {
      isLoading.value = true
      const response = await api.generateTestReport1(
        params.dueDays,
        params.rmName,
        params.customerNum,
        params.sccStatus,
        params.groupNum,
        params.customerName,
      )
      const headers = response.headers
      const responseObj = new Response(response.data, {
        headers: { 'Content-Type': headers['content-type'] },
      })
      const blob = await responseObj.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'report1.pdf')
      document.body.append(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error(error)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function generateTestReport2 (params) {
    try {
      isLoading.value = true
      const response = await api.generateTestReport2(params.userName)
      const headers = response.headers
      const responseObj = new Response(response.data, {
        headers: { 'content-type': headers['content-type'] },
      })
      const blob = await responseObj.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'report2.pdf')
      document.body.append(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error(error)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }
</script>
