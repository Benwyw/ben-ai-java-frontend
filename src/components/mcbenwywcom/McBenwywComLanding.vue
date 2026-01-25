<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Stats Cards -->
    <StatsSection />

    <!-- Quick Actions -->
    <QuickActionsSection :actions="quickActions" />

    <!-- Features Section -->
    <FeaturesSection :features="features" />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import FeaturesSection from '@/components/mcbenwywcom/FeaturesSection.vue'
  import HeroSection from '@/components/mcbenwywcom/HeroSection.vue'
  import QuickActionsSection from '@/components/mcbenwywcom/QuickActionsSection.vue'
  import StatsSection from '@/components/mcbenwywcom/StatsSection.vue'

  const { t } = useI18n()

  /**
   * Quick Actions Configuration
   * Add, remove, or modify actions here to update the Quick Actions section
   */
  const quickActions = computed(() => [
    { title: t('minecraft.quickActions.home'), description: t('minecraft.quickActions.homeDesc'), icon: 'mdi-home', to: '/mcbenwywcom/home', color: 'green' },
    { title: t('minecraft.quickActions.staffList'), description: t('minecraft.quickActions.staffListDesc'), icon: 'mdi-account-group', to: '/mcbenwywcom/staff', color: 'amber' },
    // Hidden for future development
    // { title: t('minecraft.quickActions.buildings'), description: t('minecraft.quickActions.buildingsDesc'), icon: 'mdi-domain', to: '/mcbenwywcom/buildings', color: 'blue' },
    // { title: t('minecraft.quickActions.events'), description: t('minecraft.quickActions.eventsDesc'), icon: 'mdi-calendar-star', to: '/mcbenwywcom/events', color: 'purple' },
  ])

  /**
   * Features Configuration
   * Add, remove, or modify features here to update the Features section
   */
  const features = computed(() => [
    {
      title: t('minecraft.features.survivalServer'),
      description: t('minecraft.features.survivalServerDesc'),
      icon: 'mdi-sword-cross',
      color: 'green',
    },
    {
      title: t('minecraft.features.customPlugins'),
      description: t('minecraft.features.customPluginsDesc'),
      icon: 'mdi-puzzle',
      color: 'blue',
    },
    {
      title: t('minecraft.features.communityEvents'),
      description: t('minecraft.features.communityEventsDesc'),
      icon: 'mdi-calendar-star',
      color: 'purple',
    },
    {
      title: t('minecraft.features.dedicatedStaff'),
      description: t('minecraft.features.dedicatedStaffDesc'),
      icon: 'mdi-shield-account',
      color: 'amber',
    },
  ])
</script>
