<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-indigo"
      icon="mdi-shield-lock"
      subtitle="How NoteFormat handles your data"
      title="NoteFormat Privacy Policy"
    />

    <SectionsPanel :last-updated="lastUpdated" :sections="sections" />

    <BackButton />
  </div>
</template>

<script setup>
  import SectionsPanel from '@/components/legal/SectionsPanel.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  const lastUpdated = '01 JAN 2026'

  const sections = [
    {
      title: 'Overview',
      content: 'NoteFormat collects only the data needed to deliver note formatting, syncing, subscription, and advertising functionality. We do not sell your data.',
    },
    {
      title: 'Data We Collect',
      content: 'App data: notes, categories, templates, budgets, achievements stored on-device; optional iCloud sync if enabled. Purchases: subscription status via Apple StoreKit; we do not store your payment details. Advertising: Google AdMob may collect device identifiers for ad personalization (free tier only). Optional services: location (weather features), biometrics availability, Game Center identifiers for achievements and leaderboards.',
    },
    {
      title: 'How We Use Data',
      content: 'Provide core app features (notes, budgets, reports, exports). Process subscriptions and restore purchases. Display relevant ads to free users via Google AdMob. iCloud/CloudKit sync if enabled; WeatherKit if you allow location; Game Center for achievements.',
    },
    {
      title: 'Third-Party Services',
      content: 'Google AdMob: displays ads to free users and may collect device identifiers. Apple Services: iCloud/CloudKit (sync), StoreKit (purchases), WeatherKit (weather), Game Center (achievements/leaderboards). Pro subscribers do not see ads.',
    },
    {
      title: 'Sharing',
      content: 'No selling of personal data. Limited sharing with Apple services you enable and Google AdMob for advertising purposes (free tier).',
    },
    {
      title: 'Your Choices',
      content: 'Upgrade to Pro to remove ads. Revoke location, notifications, or biometrics in system Settings. Disable iCloud sync in app settings. Opt out of ad personalization in iOS Settings > Privacy > Apple Advertising. Delete app data by removing the app.',
    },
    {
      title: 'Retention',
      content: 'Data stays on your device and in your iCloud (if enabled) until you delete it or remove the app.',
    },
    {
      title: 'Contact',
      content: 'Email: support@benwyw.com',
    },
  ]
</script>
