<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Whity Weight"
      subtitle="小白體重記錄"
      icon="mdi-scale-bathroom"
      gradient-class="bg-gradient-warning"
    />

    <!-- Weight Table Card -->
    <WeightTable />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue'
import BackButton from '@/components/shared/BackButton.vue'
import WeightTable from '@/components/whityweight/WeightTable.vue'
</script>

