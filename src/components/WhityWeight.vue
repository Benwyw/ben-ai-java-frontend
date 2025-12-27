<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-warning"
      icon="mdi-scale-bathroom"
      subtitle="小白體重記錄"
      title="Whity Weight"
    />

    <!-- Weight Table Card -->
    <WeightTable />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
  import WeightTable from '@/components/whityweight/WeightTable.vue'
</script>
