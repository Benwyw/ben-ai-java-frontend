<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      :latest-whity-weight="latestWhityWeight"
      :user-base="userBase"
    />

    <!-- Stats Cards -->
    <StatsSection
      :latest-whity-weight="latestWhityWeight"
      :user-base="userBase"
    />

    <!-- Quick Actions -->
    <QuickActionsSection :actions="quickActions" />

    <!-- Features Section -->
    <FeaturesSection :features="features" />
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import * as api from '@/api/misc'
  import * as apiWhity from '@/api/whity'
  import FeaturesSection from '@/components/home/FeaturesSection.vue'
  import HeroSection from '@/components/home/HeroSection.vue'
  import QuickActionsSection from '@/components/home/QuickActionsSection.vue'
  import StatsSection from '@/components/home/StatsSection.vue'

  const { t } = useI18n()

  const userBase = ref('')
  const latestWhityWeight = ref('')
  const isLoading = ref(false)
  const isError = ref(false)

  /**
   * Quick Actions Configuration
   * Add, remove, or modify actions here to update the Quick Actions section
   */
  const quickActions = computed(() => [
    { title: t('benkaneki.about'), description: t('benkaneki.aboutDesc'), icon: 'mdi-information', to: '/benkaneki/about', color: 'info' },
    { title: t('benkaneki.messenger'), description: t('benkaneki.messengerDesc'), icon: 'mdi-message', to: '/benkaneki/messenger', color: 'success' },
    { title: t('benkaneki.whityWeight'), description: t('benkaneki.whityWeightDesc'), icon: 'mdi-scale-bathroom', to: '/benkaneki/whityweight', color: 'warning' },
    { title: t('benkaneki.report'), description: t('benkaneki.reportDesc'), icon: 'mdi-file-chart', to: '/benkaneki/report', color: 'error' },
    { title: t('benkaneki.swagger'), description: t('benkaneki.swaggerDesc'), icon: 'mdi-api', to: '/benkaneki/swagger', color: 'secondary' },
    { title: t('benkaneki.termsOfService'), description: t('benkaneki.termsOfServiceDesc'), icon: 'mdi-file-document', to: '/benkaneki/termsofservice', color: 'grey' },
    { title: t('benkaneki.privacyPolicy'), description: t('benkaneki.privacyPolicyDesc'), icon: 'mdi-shield-lock', to: '/benkaneki/privacypolicy', color: 'teal' },
  ])

  /**
   * Features Configuration
   * Add, remove, or modify features here to update the Features section
   */
  const features = computed(() => [
    {
      title: t('benkaneki.features.discordBot'),
      description: t('benkaneki.features.discordBotDesc'),
      icon: 'mdi-robot',
      color: 'primary',
    },
    { title: t('benkaneki.features.realTimeMessaging'), description: t('benkaneki.features.realTimeMessagingDesc'), icon: 'mdi-message-flash', color: 'success' },
    { title: t('benkaneki.features.weightTracking'), description: t('benkaneki.features.weightTrackingDesc'), icon: 'mdi-chart-line', color: 'info' },
    { title: t('benkaneki.features.apiDocs'), description: t('benkaneki.features.apiDocsDesc'), icon: 'mdi-file-document', color: 'warning' },
  ])

  async function getUserBase () {
    try {
      isLoading.value = true
      const response = await api.getUserBase()
      userBase.value = response
    } catch (error) {
      console.log(error)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getLatestWhityWeight () {
    try {
      isLoading.value = true
      const response = await apiWhity.getLatestWhityWeight()
      latestWhityWeight.value = response
    } catch (error) {
      console.log(error)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    getUserBase()
    getLatestWhityWeight()
  })
</script>
