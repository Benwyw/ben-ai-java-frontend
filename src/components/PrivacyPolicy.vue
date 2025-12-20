<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Privacy Policy"
      subtitle="How we handle your data"
      icon="mdi-shield-lock"
      gradient-class="bg-gradient-indigo"
    />

    <!-- Privacy Policy Content -->
    <SectionsPanel :sections="sections" :last-updated="lastUpdated" />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
import PageHeader from '@/components/shared/PageHeader.vue'
import BackButton from '@/components/shared/BackButton.vue'
import SectionsPanel from '@/components/legal/SectionsPanel.vue'

const lastUpdated = '5 JUL 2024'

const sections = [
  {
    title: 'Personal Information',
    content: 'We do not collect any personal information unless explicitly provided by the users.'
  },
  {
    title: 'Non-Personal Information',
    content: 'We may collect non-personal information such as the server ID, user ID, and command usage to improve the functionality of the Bot.'
  },
  {
    title: 'Use of Information',
    content: 'The information we collect is used to improve the services of the Bot and to assist in troubleshooting problems.'
  },
  {
    title: 'Information Sharing',
    content: 'We do not sell, trade, or otherwise transfer your information to outside parties.'
  },
  {
    title: 'Data Security',
    content: 'We implement a variety of security measures to maintain the safety of your information.'
  },
  {
    title: 'Changes to this Policy',
    content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.'
  },
  {
    title: 'Contact Us',
    content: 'If you have any questions about this Privacy Policy, please contact us.'
  }
]
</script>

