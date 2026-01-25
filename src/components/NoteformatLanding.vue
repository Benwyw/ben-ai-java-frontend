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
  import FeaturesSection from '@/components/noteformat/FeaturesSection.vue'
  import HeroSection from '@/components/noteformat/HeroSection.vue'
  import QuickActionsSection from '@/components/noteformat/QuickActionsSection.vue'
  import StatsSection from '@/components/noteformat/StatsSection.vue'
  import SupportSection from '@/components/noteformat/SupportSection.vue'

  /**
   * Quick Actions Configuration
   * Add, remove, or modify actions here to update the Quick Actions section
   */
  const quickActions = [
    { title: 'EULA', description: 'Usage terms for NoteFormat', icon: 'mdi-file-document-outline', to: '/noteformat/eula', color: 'primary' },
    { title: 'Privacy', description: 'How we handle your data', icon: 'mdi-shield-lock', to: '/noteformat/privacy', color: 'info' },
    { title: 'Tutorials', description: 'Learn how to use NoteFormat', icon: 'mdi-school', to: '/noteformat/tutorials', color: 'success' },
    { title: 'Docs & FAQ', description: 'Reference and common questions', icon: 'mdi-file-tree', to: '/noteformat/docs', color: 'warning' },
  ]

  /**
   * Features Configuration
   * Add, remove, or modify features here to update the Features section
   */
  const features = [
    { title: 'Note Organization', description: 'Create and organize notes with categories, tags, and customizable templates.', icon: 'mdi-note-multiple', color: 'primary' },
    { title: 'Expense Tracking', description: 'Track daily expenses with budgets, alerts, and visual reports.', icon: 'mdi-cash-multiple', color: 'success' },
    { title: 'Budget Management', description: 'Set monthly, weekly, or yearly budgets with threshold alerts.', icon: 'mdi-chart-donut', color: 'orange' },
    { title: 'Reports & Analytics', description: 'Generate daily, weekly, monthly reports with category breakdowns.', icon: 'mdi-chart-pie', color: 'purple' },
    { title: 'iCloud Sync', description: 'Seamlessly sync your data across all your Apple devices.', icon: 'mdi-cloud-sync', color: 'info' },
    { title: 'Game Center', description: 'Unlock achievements and compete on leaderboards.', icon: 'mdi-trophy', color: 'amber' },
    { title: 'Siri Shortcuts', description: 'Quick add notes and get reports using Siri commands.', icon: 'mdi-microphone', color: 'pink' },
    { title: 'Privacy First', description: 'Face ID/Touch ID lock with your data staying on-device and iCloud.', icon: 'mdi-shield-check', color: 'teal' },
  ]
</script>
