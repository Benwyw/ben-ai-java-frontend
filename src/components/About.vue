<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-info"
      icon="mdi-information"
      subtitle="Multi-purpose private hosted bot for selected servers."
      title="About"
    />

    <!-- Features Table Card -->
    <FeaturesTable />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import FeaturesTable from '@/components/about/FeaturesTable.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
</script>
