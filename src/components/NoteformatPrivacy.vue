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

  const lastUpdated = '25 JAN 2026'

  const sections = [
    {
      title: 'Overview',
      content:
        'NoteFormat is designed to work primarily on-device and through Apple services you enable (such as iCloud). We collect and use data only as needed to provide app features and subscriptions. For the free tier, ads are provided by Appodeal and its mediation partners (including Google AdMob and other ad networks), which may collect and process certain device and usage data as described below. We do not sell your personal data.',
    },
    {
      title: 'Data We Collect',
      content:
        'On-device app data: notes, categories, templates, budgets, and achievements stored on your device. iCloud sync (optional): if enabled, your app data may be stored in your iCloud/CloudKit account. Purchases: subscription status and purchase history via Apple StoreKit; we do not receive or store your full payment card details. Advertising (free tier): Appodeal and its mediation partners (including Google AdMob) may collect data such as device identifiers (including the advertising identifier / IDFA if you allow tracking), IP address, general location (derived from IP), and app interaction information for ad delivery, frequency capping, fraud prevention, measurement, and (if enabled) personalized ads. Optional features: biometric capability (Face ID/Touch ID availability only; we do not collect or store biometric data) and Game Center identifiers for achievements/leaderboards.',
    },
    {
      title: 'How We Use Data',
      content:
        'Provide core app functionality (notes, budgets, reports, exports) and optional features you enable (iCloud sync, Game Center). Process subscriptions and restore purchases through Apple. Show ads to free users and measure ad performance via Appodeal and its mediation partners.',
    },
    {
      title: 'Legal Bases & Consent',
      content:
        'We process data to provide the app features you request and to operate our free and paid tiers. Where required by law or platform policy, we rely on your consent (for example, system permission prompts and AppTrackingTransparency (ATT) permission for tracking-based advertising). You can withdraw consent at any time by changing your device settings (and, where available, in-app settings).',
    },
    {
      title: 'Third-Party Services',
      content:
        'Apple services: iCloud/CloudKit (sync) and StoreKit (purchases/subscriptions), Game Center (achievements/leaderboards). Appodeal (free tier): ad mediation platform that works with multiple ad networks including Google AdMob for ad delivery, measurement, and (depending on your choices) personalization. For more information, see the privacy policies of Appodeal (https://appodeal.com/privacy-policy/) and Google (https://policies.google.com/privacy). These providers may process data under their own terms and privacy policies.',
    },
    {
      title: 'Sharing',
      content:
        'We do not sell your personal data. Data may be processed by Apple services you enable (e.g., iCloud/CloudKit) and by Appodeal and its mediation partners (including Google AdMob) for advertising purposes in the free tier. When you export or share content, you control where it is sent and who can access it.',
    },
    {
      title: 'Tracking & Personalized Ads (iOS)',
      content:
        'The free tier displays ads via Appodeal and its mediation partners (including Google AdMob). We may request permission using AppTrackingTransparency (ATT) to allow tracking for personalized ads and related measurement. If you deny permission, we will still show ads, but they will be non-personalized. You can change your choice at any time in iOS Settings (Privacy & Security). Pro subscribers do not see ads.',
    },
    {
      title: 'Your Choices',
      content:
        'Upgrade to Pro to remove ads. Enable/disable iCloud sync in the app. Control permissions in iOS Settings (including tracking permission). You can delete your data by deleting content in the app and/or removing the app; if iCloud sync is enabled, deletions will sync to iCloud as well. You can also manage or remove NoteFormat iCloud data in iOS Settings > Apple ID > iCloud > Manage Account Storage.',
    },
    {
      title: 'Data Security',
      content:
        'We rely on Apple platform security features (such as device encryption and iCloud security controls) to protect data stored on your device and in your iCloud (if enabled). NoteFormat does not require you to create an online account with us, and we do not operate a general-purpose cloud database for your notes. Third-party providers (Apple, Appodeal, Google) may process data as described in their policies.',
    },
    {
      title: 'Retention',
      content:
        'On-device data is retained until you delete it or remove the app. If iCloud sync is enabled, related data may remain in your iCloud until you delete it from iCloud or disable sync and remove the data according to your iCloud settings. Data processed by Appodeal and its mediation partners (including Google AdMob) is handled under their respective retention practices and controls as described in their policies.',
    },
    {
      title: 'International Transfers',
      content:
        'Because Apple, Appodeal, and Google operate globally, data processed by iCloud/CloudKit, StoreKit, Game Center, Appodeal, and its mediation partners (including Google AdMob) may be transferred to and processed in countries/regions outside Hong Kong, including places that may have different data protection laws.',
    },
    {
      title: 'Your Rights & Requests',
      content:
        'Depending on where you live, you may have rights to request access to or correction of personal data. If you have questions or requests about this policy, contact us at the email below. For data processed by Apple, Appodeal, or Google services (such as iCloud, Appodeal mediation, or AdMob), you may also need to use their privacy tools and settings.',
    },
    {
      title: "Children's Privacy",
      content:
        'NoteFormat is a general-audience app and is not specifically directed to children under 13 (or the equivalent minimum age in your jurisdiction). We do not knowingly collect personal information from children. The app does not require users to create an account with us. If you are a parent/guardian and believe a child has provided personal information in connection with the app, please contact us so we can review and take appropriate steps. Please note that the free tier may display ads via Appodeal and its mediation partners; third-party advertising providers may process device information under their own policies and settings.',
    },
    {
      title: 'Changes to This Policy',
      content:
        'We may update this policy from time to time. The "Last updated" date at the top will reflect the most recent revision. Continued use of the app after changes constitutes acceptance of the updated policy.',
    },
    {
      title: 'Contact',
      content: 'Email: support@benwyw.com',
    },
  ]
</script>