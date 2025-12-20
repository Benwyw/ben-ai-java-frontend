<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="About"
      subtitle="Multi-purpose private hosted bot for selected servers."
      icon="mdi-information"
      gradient-class="bg-gradient-info"
    />

    <!-- Features Table Card -->
    <FeaturesTable />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue'
import BackButton from '@/components/shared/BackButton.vue'
import FeaturesTable from '@/components/about/FeaturesTable.vue'
</script>

