<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      :user-base="userBase"
      :latest-whity-weight="latestWhityWeight"
    />

    <!-- Stats Cards -->
    <StatsSection
      :user-base="userBase"
      :latest-whity-weight="latestWhityWeight"
    />

    <!-- Quick Actions -->
    <QuickActionsSection :actions="quickActions" />

    <!-- Features Section -->
    <FeaturesSection :features="features" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as api from '@/api/misc'
import * as apiWhity from '@/api/whity'
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import QuickActionsSection from '@/components/home/QuickActionsSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'

const userBase = ref('')
const latestWhityWeight = ref('')
const isLoading = ref(false)
const isError = ref(false)

/**
 * Quick Actions Configuration
 * Add, remove, or modify actions here to update the Quick Actions section
 */
const quickActions = [
  { title: 'About', description: 'Learn more about us', icon: 'mdi-information', to: '/about', color: 'primary' },
  { title: 'Swagger', description: 'API Documentation', icon: 'mdi-api', to: '/swagger', color: 'success' },
  { title: 'Messenger', description: 'Send messages', icon: 'mdi-message', to: '/messenger', color: 'info' },
  { title: 'Whity Weight', description: 'Track weight', icon: 'mdi-scale-bathroom', to: '/whityweight', color: 'warning' },
  { title: 'Report', description: 'View reports', icon: 'mdi-file-chart', to: '/report', color: 'error' },
  { title: 'Login', description: 'Access your account', icon: 'mdi-login', to: '/login', color: 'secondary' },
]

/**
 * Features Configuration
 * Add, remove, or modify features here to update the Features section
 */
const features = [
  { title: 'AI Integration', description: 'Leverage cutting-edge AI technology for smarter insights and automation.', icon: 'mdi-brain', color: 'primary' },
  { title: 'Real-time Messaging', description: 'Communicate instantly with our secure messenger platform.', icon: 'mdi-message-flash', color: 'success' },
  { title: 'Weight Tracking', description: 'Monitor and track weight data with beautiful visualizations.', icon: 'mdi-chart-line', color: 'info' },
  { title: 'API Documentation', description: 'Comprehensive Swagger docs for seamless integration.', icon: 'mdi-file-document', color: 'warning' },
]

async function getUserBase() {
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

async function getLatestWhityWeight() {
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

