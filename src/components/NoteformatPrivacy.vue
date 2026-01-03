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
      content:
        'NoteFormat is designed to work primarily on-device and through Apple services you enable (such as iCloud). We collect and use data only as needed to provide app features, subscriptions, and (for the free tier) advertising. We do not sell your personal data.',
    },
    {
      title: 'Data We Collect',
      content:
        'On-device app data: notes, categories, templates, budgets, and achievements stored on your device. iCloud sync (optional): if enabled, your app data may be stored in your iCloud/CloudKit account. Purchases: subscription status and purchase history via Apple StoreKit; we do not receive or store your full payment card details. Advertising (free tier): Google AdMob may collect device identifiers and information for ad delivery and measurement, and may support personalized ads depending on your settings. Optional features: approximate location (weather), biometric capability (Face ID/Touch ID availability only), and Game Center identifiers for achievements/leaderboards.',
    },
    {
      title: 'How We Use Data',
      content:
        'Provide core app functionality (notes, budgets, reports, exports) and optional features you enable (iCloud sync, weather, Game Center). Process subscriptions and restore purchases through Apple. Show ads to free users and measure ad performance via Google AdMob.',
    },
    {
      title: 'Third-Party Services',
      content:
        'Apple services: iCloud/CloudKit (sync), StoreKit (purchases/subscriptions), WeatherKit (weather), Game Center (achievements/leaderboards). Google AdMob (free tier): ad delivery, measurement, and (depending on your settings) personalization. These providers may process data under their own terms and privacy policies.',
    },
    {
      title: 'Sharing',
      content:
        'We do not sell your personal data. Data may be processed by Apple services you enable (e.g., iCloud/CloudKit) and by Google AdMob for advertising purposes in the free tier. When you export or share content, you control where it is sent and who can access it.',
    },
    {
      title: 'Tracking & Personalized Ads (iOS)',
      content:
        'If the app engages in tracking as defined by Apple (e.g., for cross-app advertising), iOS may prompt you for permission via AppTrackingTransparency (ATT). You can control personalized ads and related settings in iOS Settings (including Privacy & Security and Apple Advertising) and within Google’s ad settings where available. Pro subscribers do not see AdMob ads.',
    },
    {
      title: 'Your Choices',
      content:
        'Upgrade to Pro to remove ads. Enable/disable iCloud sync in the app. Revoke location permission in iOS Settings to disable weather features. Control notifications and other permissions in iOS Settings. You can delete your data by deleting content in the app and/or removing the app; iCloud data removal depends on your iCloud settings.',
    },
    {
      title: 'Data Security',
      content:
        'We rely on Apple platform security features (such as device encryption and iCloud security controls) to protect data stored on your device and in your iCloud (if enabled). NoteFormat does not require you to create an online account with us, and we do not operate a general-purpose cloud database for your notes. Third-party providers (Apple/Google) may process data as described in their policies.',
    },
    {
      title: 'Retention',
      content:
        'On-device data is retained until you delete it or remove the app. If iCloud sync is enabled, related data may remain in your iCloud until you delete it from iCloud or disable sync and remove the data according to your iCloud settings.',
    },
    {
      title: 'International Transfers',
      content:
        'Because Apple and Google operate globally, data processed by iCloud/CloudKit, StoreKit, WeatherKit, Game Center, and AdMob may be transferred to and processed in countries/regions outside Hong Kong, including places that may have different data protection laws.',
    },
    {
      title: 'Your Rights & Requests',
      content:
        'Depending on where you live, you may have rights to request access to or correction of personal data. If you have questions or requests about this policy, contact us at the email below. For data processed by Apple/Google services (such as iCloud or AdMob), you may also need to use their privacy tools and settings.',
    },
    {
      title: "Children's Privacy",
      content:
        'NoteFormat is not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided personal data in connection with the app, please contact us and we will take appropriate steps consistent with applicable law.',
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this policy from time to time. The "Last updated" date at the top will reflect the most recent revision. Continued use of the app after changes constitutes acceptance of the updated policy.',
    },
    {
      title: 'Contact',
      content: 'Email: support@benwyw.com',
    },
  ]
</script>
