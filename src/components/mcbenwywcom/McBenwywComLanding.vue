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
  import FeaturesSection from '@/components/mcbenwywcom/FeaturesSection.vue'
  import HeroSection from '@/components/mcbenwywcom/HeroSection.vue'
  import QuickActionsSection from '@/components/mcbenwywcom/QuickActionsSection.vue'
  import StatsSection from '@/components/mcbenwywcom/StatsSection.vue'

  /**
   * Quick Actions Configuration
   * Add, remove, or modify actions here to update the Quick Actions section
   */
  const quickActions = [
    { title: 'Home', description: 'Server overview', icon: 'mdi-home', to: '/mcbenwywcom/home', color: 'green' },
    { title: 'Staff List', description: 'Meet our team', icon: 'mdi-account-group', to: '/mcbenwywcom/staff', color: 'amber' },
    // Hidden for future development
    // { title: 'Buildings', description: 'Great builds', icon: 'mdi-domain', to: '/mcbenwywcom/buildings', color: 'blue' },
    // { title: 'Events', description: 'Past events', icon: 'mdi-calendar-star', to: '/mcbenwywcom/events', color: 'purple' },
  ]

  /**
   * Features Configuration
   * Add, remove, or modify features here to update the Features section
   */
  const features = [
    {
      title: 'Survival Server',
      description: 'Classic survival gameplay with quality-of-life improvements and active community.',
      icon: 'mdi-sword-cross',
      color: 'green',
    },
    {
      title: 'Custom Plugins',
      description: 'Unique server features and custom-developed plugins for enhanced gameplay.',
      icon: 'mdi-puzzle',
      color: 'blue',
    },
    {
      title: 'Community Events',
      description: 'Regular events, competitions, and community gatherings.',
      icon: 'mdi-calendar-star',
      color: 'purple',
    },
    {
      title: 'Dedicated Staff',
      description: 'Active and friendly staff team to help players and maintain the server.',
      icon: 'mdi-shield-account',
      color: 'amber',
    },
  ]
</script>
