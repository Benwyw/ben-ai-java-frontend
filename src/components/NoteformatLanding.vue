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

    <!-- Support Section -->
    <SupportSection />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import FeaturesSection from '@/components/noteformat/FeaturesSection.vue'
  import HeroSection from '@/components/noteformat/HeroSection.vue'
  import QuickActionsSection from '@/components/noteformat/QuickActionsSection.vue'
  import StatsSection from '@/components/noteformat/StatsSection.vue'
  import SupportSection from '@/components/noteformat/SupportSection.vue'

  const { t } = useI18n()

  /**
   * Quick Actions Configuration
   * Add, remove, or modify actions here to update the Quick Actions section
   */
  const quickActions = computed(() => [
    { title: t('noteformat.eula'), description: t('noteformat.eulaDesc'), icon: 'mdi-file-document-outline', to: '/noteformat/eula', color: 'primary' },
    { title: t('noteformat.privacy'), description: t('noteformat.privacyDesc'), icon: 'mdi-shield-lock', to: '/noteformat/privacy', color: 'info' },
    { title: t('noteformat.tutorials.tutorials'), description: t('noteformat.tutorialsDesc'), icon: 'mdi-school', to: '/noteformat/tutorials', color: 'success' },
    { title: t('noteformat.docs'), description: t('noteformat.docsDesc'), icon: 'mdi-file-tree', to: '/noteformat/docs', color: 'warning' },
  ])

  /**
   * Features Configuration
   * Add, remove, or modify features here to update the Features section
   */
  const features = computed(() => [
    { title: t('noteformat.features.noteOrganization'), description: t('noteformat.features.noteOrganizationDesc'), icon: 'mdi-note-multiple', color: 'primary' },
    { title: t('noteformat.features.expenseTracking'), description: t('noteformat.features.expenseTrackingDesc'), icon: 'mdi-cash-multiple', color: 'success' },
    { title: t('noteformat.features.budgetManagement'), description: t('noteformat.features.budgetManagementDesc'), icon: 'mdi-chart-donut', color: 'orange' },
    { title: t('noteformat.features.reportsAnalytics'), description: t('noteformat.features.reportsAnalyticsDesc'), icon: 'mdi-chart-pie', color: 'purple' },
    { title: t('noteformat.features.icloudSync'), description: t('noteformat.features.icloudSyncDesc'), icon: 'mdi-cloud-sync', color: 'info' },
    { title: t('noteformat.features.gameCenter'), description: t('noteformat.features.gameCenterDesc'), icon: 'mdi-trophy', color: 'amber' },
    { title: t('noteformat.features.siriShortcuts'), description: t('noteformat.features.siriShortcutsDesc'), icon: 'mdi-microphone', color: 'pink' },
    { title: t('noteformat.features.privacyFirst'), description: t('noteformat.features.privacyFirstDesc'), icon: 'mdi-shield-check', color: 'teal' },
  ])
</script>
