<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-indigo"
      icon="mdi-shield-lock"
      subtitle="How we handle your data"
      title="Privacy Policy"
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

  // Keep this date in sync with your public policy URL and App Store Connect "Privacy Policy" link.
  const lastUpdated = '24 JAN 2026'

  const sections = [
    {
      title: 'Who We Are',
      content:
        'This Privacy Policy applies to NoteFormat (the "App"). If you have any questions, contact us at support@benwyw.com.',
    },
    {
      title: 'What Information We Collect',
      content:
        'NoteFormat is designed to work primarily on-device. Depending on how you use the App, we may process: (1) Content you create (notes/expenses) stored on your device; (2) Subscription information (e.g., purchase status/entitlement) to unlock premium features; (3) Basic diagnostics/technical information necessary to keep the App working (such as app version, device/OS version, and error information); (4) Advertising identifiers and related data as described in the Advertising section below. We do not ask for your name, address, or contacts to use the App.',
    },
    {
      title: 'How We Use Information',
      content:
        'We use information to: (1) Provide core features (creating and organizing notes/expenses); (2) Enable premium features (e.g., report export, biometric lock) based on your subscription status; (3) Troubleshoot, improve performance, and fix bugs; (4) Respond to support requests; and (5) Display advertisements in the free version of the App.',
    },
    {
      title: 'Advertising',
      content:
        'The free version of NoteFormat displays advertisements provided by third-party advertising partners, including Appodeal and its mediation partners (such as Google AdMob, and other ad networks). These partners may collect and use certain data to deliver personalized ads, including: device identifiers (such as IDFA, when you grant permission), IP address, device type and operating system, general location (derived from IP), and ad interaction data. This data is used to show relevant ads and measure ad performance. You can limit ad personalization by adjusting your device settings (Settings > Privacy & Security > Tracking) or by declining the App Tracking Transparency prompt. Premium subscribers do not see ads. For more information, see our partners\' privacy policies: Appodeal (https://appodeal.com/privacy-policy/), Google AdMob (https://policies.google.com/privacy).',
    },
    {
      title: 'Subscriptions & Payments (Apple)',
      content:
        'Payments and subscription management are handled by Apple through the App Store. We may receive limited information from Apple (such as subscription/entitlement status) to validate access to premium features. We do not receive your full payment card details.',
    },
    {
      title: 'Information Sharing',
      content:
        'We do not sell your personal information. We share information only when necessary to operate the App, such as with Apple for in-app purchases/subscriptions, with advertising partners to display ads (as described above), or if required by law.',
    },
    {
      title: 'Data Storage, Retention & Deletion',
      content:
        'Your notes/expense entries are intended to be stored on your device. We retain technical/diagnostic data only as long as needed for troubleshooting and improving the App. You can delete your notes/expense data at any time within the App (or by deleting the App). For subscription data, Apple controls billing records; please manage subscriptions through your Apple ID settings.',
    },
    {
      title: 'Security',
      content:
        'We take reasonable measures to protect information processed by the App. No method of storage or transmission is 100% secure, so we cannot guarantee absolute security.',
    },
    {
      title: 'Children’s Privacy',
      content:
        'NoteFormat is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information, contact us and we will take appropriate steps.',
    },
    {
      title: 'Your Choices & Privacy Requests',
      content:
        'You can control your data by editing or deleting your notes/expenses in the App. You can control ad personalization through your device\'s privacy settings. If you have privacy questions or wish to request access or deletion related to information we may process (such as diagnostics related to a support request), contact support@benwyw.com.',
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
