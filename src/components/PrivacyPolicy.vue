<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-indigo"
      icon="mdi-shield-lock"
      subtitle="How Ben Kaneki Discord Bot handles your data"
      title="Ben Kaneki Privacy Policy"
    />

    <!-- Privacy Policy Content -->
    <SectionsPanel :last-updated="lastUpdated" :sections="sections" />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import SectionsPanel from '@/components/legal/SectionsPanel.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  // Keep this date in sync with your public policy URL.
  const lastUpdated = '25 JAN 2026'

  const sections = [
    {
      title: 'Who We Are',
      content:
        'This Privacy Policy applies to Ben Kaneki (the "Bot"), a Discord bot. If you have any questions, contact us at support@benwyw.com.',
    },
    {
      title: 'What Information We Collect',
      content:
        'Ben Kaneki collects minimal data necessary to provide bot functionality. This may include: (1) Discord User IDs and Server IDs for command execution and feature personalization; (2) Message content only when directly interacting with the bot (commands); (3) Basic usage data such as command usage statistics. We do not collect or store private messages, personal information, or data from servers where the bot is not actively being used.',
    },
    {
      title: 'How We Use Information',
      content:
        'We use information to: (1) Provide bot functionality and respond to commands; (2) Improve bot features and performance; (3) Troubleshoot issues and fix bugs; and (4) Generate anonymized usage statistics.',
    },
    {
      title: 'Data Storage & Retention',
      content:
        'User preferences and settings are stored to provide personalized bot experiences. Command logs may be temporarily stored for debugging purposes and are regularly purged. We retain data only as long as necessary to provide the bot services.',
    },
    {
      title: 'Information Sharing',
      content:
        'We do not sell your personal information. We do not share your data with third parties except: (1) When required by law; (2) To protect against fraud or abuse; (3) With Discord as required by their Terms of Service and API usage.',
    },
    {
      title: 'Security',
      content:
        'We take reasonable measures to protect information processed by the Bot. Access to stored data is restricted. However, no method of storage or transmission is 100% secure, so we cannot guarantee absolute security.',
    },
    {
      title: "Children's Privacy",
      content:
        'Ben Kaneki follows Discord\'s Terms of Service, which require users to be at least 13 years old. We do not knowingly collect personal information from children under 13.',
    },
    {
      title: 'Your Choices & Data Deletion',
      content:
        'You can stop using the bot at any time by removing it from your server or not interacting with it. To request deletion of any stored data associated with your Discord User ID, contact support@benwyw.com.',
    },
    {
      title: 'Changes to this Policy',
      content:
        'We may update this Privacy Policy from time to time. We will post the updated policy on this page and update the "Last updated" date.',
    },
    {
      title: 'Contact Us',
      content: 'Email: support@benwyw.com',
    },
  ]
</script>
