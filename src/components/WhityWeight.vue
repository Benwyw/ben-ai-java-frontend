<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-warning"
      icon="mdi-scale-bathroom"
      :subtitle="t('benkaneki.whityWeightSubtitle')"
      :title="t('benkaneki.whityWeight')"
    />

    <!-- Weight Table Card -->
    <WeightTable />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
  import WeightTable from '@/components/whityweight/WeightTable.vue'

  const { t } = useI18n()
</script>
