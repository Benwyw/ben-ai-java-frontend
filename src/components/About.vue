<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-info"
      icon="mdi-information"
      :subtitle="t('benkaneki.aboutSubtitle')"
      :title="t('nav.about')"
    />

    <!-- Features Table Card -->
    <FeaturesTable />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import FeaturesTable from '@/components/about/FeaturesTable.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  const { t } = useI18n()
</script>
