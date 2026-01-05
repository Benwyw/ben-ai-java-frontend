<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      :latest-whity-weight="latestWhityWeight"
      :user-base="userBase"
    />

    <!-- Daily Tip - Auto-rotates daily -->
    <DailyTipCard
      :loading="loading.tip"
      :tip="dailyTip"
      @refresh="fetchDailyTip"
    />

    <!-- Discord Stats - Live from JDA backend -->
    <DiscordStatsCard
      :loading="loading.stats"
      :stats="discordStats"
    />

    <!-- Two Column Layout for Secondary Content -->
    <v-row>
      <v-col cols="12" md="6">
        <!-- Quote of the Day -->
        <QuoteOfDayCard
          :loading="loading.quote"
          :quote="quote"
        />

        <!-- Trending Commands/Features -->
        <TrendingCard
          :loading="loading.trending"
          :trending="trending"
        />
      </v-col>
      <v-col cols="12" md="6">
        <!-- Changelog / What's New -->
        <ChangelogCard
          :changelog="changelog"
          :loading="loading.changelog"
        />

        <!-- Activity Feed -->
        <ActivityFeedCard
          :activities="activities"
          :loading="loading.activities"
        />
      </v-col>
    </v-row>

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
  import {
    ActivityFeedCard,
    ChangelogCard,
    DailyTipCard,
    DiscordStatsCard,
    QuoteOfDayCard,
    TrendingCard,
  } from '@/components/content'
  import FeaturesSection from '@/components/home/FeaturesSection.vue'
  import HeroSection from '@/components/home/HeroSection.vue'
  import QuickActionsSection from '@/components/home/QuickActionsSection.vue'
  import StatsSection from '@/components/home/StatsSection.vue'
  import { useDynamicContent } from '@/composables/useDynamicContent'

  // Original data
  const userBase = ref('')
  const latestWhityWeight = ref('')

  // Dynamic content from composable
  const {
    dailyTip,
    discordStats,
    changelog,
    quote,
    trending,
    activities,
    loading,
    fetchDailyTip,
  } = useDynamicContent({
    autoRefresh: true,
    refreshInterval: 300_000, // Refresh every 5 minutes
  })

  // Quick Actions Configuration
  const quickActions = [
    { title: 'About', description: 'Learn more about us', icon: 'mdi-information', to: '/about', color: 'primary' },
    { title: 'Swagger', description: 'API Documentation', icon: 'mdi-api', to: '/swagger', color: 'success' },
    { title: 'Messenger', description: 'Send messages', icon: 'mdi-message', to: '/messenger', color: 'info' },
    { title: 'Whity Weight', description: 'Track weight', icon: 'mdi-scale-bathroom', to: '/whityweight', color: 'warning' },
    { title: 'Report', description: 'View reports', icon: 'mdi-file-chart', to: '/report', color: 'error' },
    { title: 'Login', description: 'Access your account', icon: 'mdi-login', to: '/login', color: 'secondary' },
  ]

  // Features Configuration
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
      const response = await api.getUserBase()
      userBase.value = response
    } catch (error) {
      console.log(error)
    }
  }

  async function getLatestWhityWeight () {
    try {
      const response = await apiWhity.getLatestWhityWeight()
      latestWhityWeight.value = response
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => {
    getUserBase()
    getLatestWhityWeight()
  })
</script>
