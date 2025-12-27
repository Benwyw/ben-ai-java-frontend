<template>
  <div>
    <PageHeader
      title="NoteFormat Privacy Policy"
      subtitle="How NoteFormat handles your data"
      icon="mdi-shield-lock"
      gradient-class="bg-gradient-indigo"
    />

    <SectionsPanel :sections="sections" :last-updated="lastUpdated" />

    <BackButton />
  </div>
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue'
import BackButton from '@/components/shared/BackButton.vue'
import SectionsPanel from '@/components/legal/SectionsPanel.vue'

const lastUpdated = '27 DEC 2025'

const sections = [
  {
    title: 'Overview',
    content: 'NoteFormat collects only the data needed to deliver note formatting, syncing, and purchase functionality. We do not sell your data.'
  },
  {
    title: 'Data We Collect',
    content: 'App data: notes, categories, templates, budgets, achievements stored on-device; optional iCloud sync if enabled. Purchases: subscription status via Apple StoreKit; we do not store your payment details. Optional services: location (weather), biometrics availability, Game Center identifiers for achievements.'
  },
  {
    title: 'How We Use Data',
    content: 'Provide core app features (notes, reports, exports). Process subscriptions and restore purchases. iCloud or CloudKit sync if enabled; WeatherKit if you allow location.'
  },
  {
    title: 'Sharing',
    content: 'No selling of data. Limited sharing with Apple services you enable (iCloud or CloudKit, StoreKit, WeatherKit, Game Center).'
  },
  {
    title: 'Your Choices',
    content: 'Revoke location, notifications, or biometrics in system Settings. Disable iCloud sync in app settings. Delete app data by removing the app; contact us for assistance.'
  },
  {
    title: 'Retention',
    content: 'Data stays on your device and in your iCloud (if enabled) until you delete it or remove the app.'
  },
  {
    title: 'Contact',
    content: 'Email: support@benwyw.com'
  }
]
</script>

