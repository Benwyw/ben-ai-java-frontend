<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-cyan"
      icon="mdi-file-document-outline"
      subtitle="End User License Agreement"
      title="NoteFormat EULA"
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
      title: 'License',
      content:
        'We grant you a personal, non-transferable, non-exclusive license to download and use NoteFormat for your personal, non-commercial use on Apple-branded devices that you own or control, as permitted by the Apple Media Services Terms and Conditions.',
    },
    {
      title: 'Restrictions',
      content:
        'You may not copy (except as permitted by law), decompile, reverse engineer, disassemble, attempt to derive the source code of, modify, or create derivative works of the App, or circumvent security features. You may not redistribute or resell the App.',
    },
    {
      title: 'Free Tier & Advertisements',
      content:
        'The App is free to download with basic features. Free users will see advertisements powered by Google AdMob. You may watch rewarded ads to unlock temporary premium features. Ad frequency and placement may vary.',
    },
    {
      title: 'Subscriptions & Billing',
      content:
        "Pro features require a monthly or annual subscription. Payment is charged to your Apple ID account at confirmation of purchase. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. Pro subscribers enjoy an ad-free experience and access to all premium features. You can manage or cancel subscriptions in Settings > Apple ID > Subscriptions. Refund requests are handled by Apple in accordance with Apple's policies and applicable law.",
    },
    {
      title: 'Pro Features',
      content:
        'Pro subscription includes: ad-free experience, unlimited exports, CSV reports, custom themes, biometric lock (Face ID/Touch ID), and detailed category breakdowns in reports.',
    },
    {
      title: 'User Content',
      content:
        'You retain ownership of notes/expense entries you create in the App ("User Content"). The App is intended to store this content on your device and optionally in your iCloud. If you choose to share/export content (for example, exporting a report), you are responsible for where you send it and who can access it.',
    },
    {
      title: 'Support & Maintenance',
      content:
        'We are responsible for providing maintenance and support for NoteFormat. Apple has no obligation to provide any maintenance or support services with respect to the App.',
    },
    {
      title: 'Disclaimer & Liability',
      content:
        'The App is provided "as is" and "as available", without warranties of any kind, to the maximum extent permitted by law. Nothing in this EULA excludes or limits any rights you may have under applicable law that cannot be waived. To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages.',
    },
    {
      title: 'Product Claims',
      content:
        'To the extent permitted by applicable law, we (not Apple) are responsible for addressing claims relating to the App, including but not limited to: (i) product liability claims; (ii) any claim that the App fails to conform to applicable legal or regulatory requirements; and (iii) claims arising under consumer protection or similar laws.',
    },
    {
      title: 'Intellectual Property Claims',
      content:
        "In the event of any third-party claim that the App or your possession and use of the App infringes that third party's intellectual property rights, we (not Apple) will be solely responsible for the investigation, defense, settlement, and discharge of any such claim.",
    },
    {
      title: 'Termination',
      content:
        'This license is effective until terminated. It terminates automatically if you fail to comply with any term of this EULA. You may stop using the App at any time by deleting it from your device. Cancelling a subscription stops future renewals but does not retroactively refund already-paid periods (unless required by law or granted by Apple).',
    },
    {
      title: 'Eligibility',
      content:
        'You must be legally permitted to use the App in your country/region. If you are under the age required to enter into a binding contract where you live, you may use the App only with the consent and involvement of a parent or legal guardian.',
    },
    {
      title: 'Children',
      content:
        'The App is a general-audience product and is not specifically directed to children. If a child uses the App, a parent or legal guardian is responsible for supervising the child’s use and managing device/app settings (including privacy and purchase controls).',
    },
    {
      title: 'Export Compliance & Sanctions',
      content:
        'You may not use, export, re-export, or transfer the App except as authorized under applicable export control, sanctions, and other laws and regulations of Hong Kong SAR, the jurisdiction in which you obtained the App, and any other relevant jurisdictions. You represent that you are not located in, and are not a national or resident of, any country/region subject to comprehensive sanctions, and you are not on any restricted or denied party list applicable to you.',
    },
    {
      title: 'Apple as Third-Party Beneficiary',
      content:
        'You acknowledge that Apple and Apple’s subsidiaries are third-party beneficiaries of this EULA and that, upon your acceptance of this EULA, Apple will have the right (and will be deemed to have accepted the right) to enforce this EULA against you as a third-party beneficiary.',
    },
    {
      title: 'Third-Party Services & Terms',
      content:
        'The App may integrate with third-party services (for example, iCloud/CloudKit, StoreKit, WeatherKit, Game Center, or advertising services). You understand that your use of those services may be subject to the third parties’ terms and policies. We do not control and are not responsible for third-party services, their availability, or their content/data practices.',
    },
    {
      title: 'Governing Law',
      content:
        'This EULA is governed by the laws of Hong Kong SAR, without regard to conflict of law principles, except where prohibited by applicable consumer protection laws that may provide you additional rights.',
    },
    {
      title: 'Severability & Entire Agreement',
      content:
        'If any provision of this EULA is held unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable (or, if not possible, severed), and the remaining provisions will remain in full force. This EULA is the entire agreement between you and us regarding the App and supersedes any prior agreements on this subject.',
    },
    {
      title: 'Contact',
      content: 'Email: support@benwyw.com',
    },
  ]
</script>
