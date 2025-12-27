<template>
  <div>
    <PageHeader
      title="NoteFormat EULA"
      subtitle="End User License Agreement"
      icon="mdi-file-document-outline"
      gradient-class="bg-gradient-cyan"
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
    title: 'License',
    content: 'We grant you a personal, non-transferable, non-exclusive license to use NoteFormat on Apple platforms you own or control.'
  },
  {
    title: 'Restrictions',
    content: 'No redistribution, resale, reverse engineering, or circumvention of security. Use only as permitted by Apple’s App Store Terms.'
  },
  {
    title: 'Subscriptions & Billing',
    content: 'Auto-renews unless cancelled at least 24 hours before the period ends. Manage or cancel in Settings > Apple ID > Subscriptions. Refunds are handled by Apple under App Store policy.'
  },
  {
    title: 'User Content',
    content: 'You retain ownership of your notes; you grant us a limited license to operate and sync them as needed by the app.'
  },
  {
    title: 'Disclaimer & Liability',
    content: 'Provided "as is" without warranties; liability is limited to the maximum permitted by law.'
  },
  {
    title: 'Termination',
    content: 'We may terminate access for violations; you may stop use at any time by removing the app or cancelling your subscription.'
  },
  {
    title: 'Governing Law',
    content: 'Specify your governing law or jurisdiction here (e.g., Hong Kong SAR).'
  },
  {
    title: 'Contact',
    content: 'Email: support@benwyw.com'
  }
]
</script>

