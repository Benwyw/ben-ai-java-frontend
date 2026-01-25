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
  import { onMounted, ref } from 'vue'
  import * as api from '@/api/misc'
  import * as apiWhity from '@/api/whity'
  import FeaturesSection from '@/components/home/FeaturesSection.vue'
  import HeroSection from '@/components/home/HeroSection.vue'
  import QuickActionsSection from '@/components/home/QuickActionsSection.vue'
  import StatsSection from '@/components/home/StatsSection.vue'

  const userBase = ref('')
  const latestWhityWeight = ref('')
  const isLoading = ref(false)
  const isError = ref(false)

  /**
   * Quick Actions Configuration
   * Add, remove, or modify actions here to update the Quick Actions section
   */
  const quickActions = [
    { title: 'Home', description: 'Dashboard overview', icon: 'mdi-home', to: '/benkaneki/home', color: 'primary' },
    { title: 'About', description: 'Learn more about us', icon: 'mdi-information', to: '/benkaneki/about', color: 'info' },
    { title: 'Messenger', description: 'Send messages', icon: 'mdi-message', to: '/benkaneki/messenger', color: 'success' },
    { title: 'Whity Weight', description: 'Track weight', icon: 'mdi-scale-bathroom', to: '/benkaneki/whityweight', color: 'warning' },
    { title: 'Report', description: 'View reports', icon: 'mdi-file-chart', to: '/benkaneki/report', color: 'error' },
    { title: 'Swagger', description: 'API Documentation', icon: 'mdi-api', to: '/benkaneki/swagger', color: 'secondary' },
    { title: 'Terms of Service', description: 'Usage terms', icon: 'mdi-file-document', to: '/benkaneki/termsofservice', color: 'grey' },
    { title: 'Privacy Policy', description: 'Data privacy', icon: 'mdi-shield-lock', to: '/benkaneki/privacypolicy', color: 'teal' },
  ]

  /**
   * Features Configuration
   * Add, remove, or modify features here to update the Features section
   */
  const features = [
    {
      title: 'Discord Bot',
      description: 'A multi-purpose Discord bot with a companion web dashboard for utilities and automation.',
      icon: 'mdi-robot',
      color: 'primary',
    },
    { title: 'Real-time Messaging', description: 'Communicate instantly with our secure messenger platform.', icon: 'mdi-message-flash', color: 'success' },
    { title: 'Weight Tracking', description: 'Monitor and track weight data with beautiful visualizations.', icon: 'mdi-chart-line', color: 'info' },
    { title: 'API Documentation', description: 'Comprehensive Swagger docs for seamless integration.', icon: 'mdi-file-document', color: 'warning' },
  ]

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
