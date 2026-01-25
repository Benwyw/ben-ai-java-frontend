<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-cyan"
      icon="mdi-file-document"
      :subtitle="t('legal.termsOfServiceSubtitle')"
      :title="t('legal.termsOfServiceTitle')"
    />

    <!-- Terms of Service Content -->
    <SectionsPanel :last-updated="lastUpdated" :sections="sections" />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import SectionsPanel from '@/components/legal/SectionsPanel.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  const { t } = useI18n()

  const lastUpdated = '5 JUL 2024'

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By using the Ben Kaneki (hereinafter referred to as "the Bot"), you are agreeing to these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Bot.',
    },
    {
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these Terms at any time. We recommend users review these Terms periodically.',
    },
    {
      title: 'Bot Usage',
      content: 'The Bot is provided on an "as is" and "as available" basis for your use. The Bot is meant to be used as per Discord\'s guidelines and rules.',
    },
    {
      title: 'User Conduct',
      content: 'You agree not to interfere with or disrupt the Bot\'s services or servers. You also agree not to disobey any requirements or regulations of networks connected to the Bot\'s services.',
    },
    {
      title: 'Intellectual Property',
      content: 'All rights, title, and interest in and to the Bot (excluding content provided by users) are and will remain the exclusive property of the Bot\'s developers.',
    },
    {
      title: 'Limitation of Liability',
      content: 'In no event shall the Bot\'s developers be liable for any direct, indirect, incidental, special, consequential or exemplary damages resulting from your use or inability to use the Bot.',
    },
    {
      title: 'Termination',
      content: 'We may terminate or suspend access to our Bot immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.',
    },
    {
      title: 'Governing Law',
      content: 'These Terms shall be governed by the laws of the country where the Bot\'s developers are based, without regard to its conflict of law provisions.',
    },
    {
      title: 'Contact Information',
      content: 'If you have any questions about these Terms, please contact us.',
    },
  ]
</script>
