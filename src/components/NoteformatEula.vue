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

  const lastUpdated = '27 DEC 2025'

  const sections = [
    {
      title: 'License',
      content:
        'We grant you a personal, non-transferable, non-exclusive license to download and use NoteFormat for your personal use on Apple-branded devices that you own or control, as permitted by the Apple Media Services Terms and Conditions.',
    },
    {
      title: 'Restrictions',
      content:
        'You may not copy (except as permitted by law), decompile, reverse engineer, disassemble, attempt to derive the source code of, modify, or create derivative works of the App, or circumvent security features. You may not redistribute or resell the App.',
    },
    {
      title: 'Subscriptions & Billing',
      content:
        'Some features require a monthly or annual subscription. Payment is charged to your Apple ID account at confirmation of purchase. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. You can manage or cancel subscriptions in Settings > Apple ID > Subscriptions. Refund requests are handled by Apple in accordance with Apple’s policies and applicable law.',
    },
    {
      title: 'User Content',
      content:
        'You retain ownership of notes/expense entries you create in the App (“User Content”). The App is intended to store this content on your device. If you choose to share/export content (for example, exporting a report), you are responsible for where you send it and who can access it.',
    },
    {
      title: 'Support & Maintenance',
      content:
        'We are responsible for providing maintenance and support for NoteFormat. Apple has no obligation to provide any maintenance or support services with respect to the App.',
    },
    {
      title: 'Disclaimer & Liability',
      content:
        'The App is provided “as is” and “as available”, without warranties of any kind, to the maximum extent permitted by law. To the maximum extent permitted by law, we disclaim all warranties and we are not liable for indirect, incidental, special, consequential, or punitive damages.',
    },
    {
      title: 'Product Claims',
      content:
        'To the extent permitted by applicable law, we (not Apple) are responsible for addressing claims relating to the App, including but not limited to: (i) product liability claims; (ii) any claim that the App fails to conform to applicable legal or regulatory requirements; and (iii) claims arising under consumer protection or similar laws.',
    },
    {
      title: 'Intellectual Property Claims',
      content:
        'In the event of any third-party claim that the App or your possession and use of the App infringes that third party’s intellectual property rights, we (not Apple) will be solely responsible for the investigation, defense, settlement, and discharge of any such claim.',
    },
    {
      title: 'Termination',
      content:
        'This license is effective until terminated. It terminates automatically if you fail to comply with any term of this EULA. You may stop using the App at any time by deleting it from your device. Cancelling a subscription stops future renewals but does not retroactively refund already-paid periods (unless required by law or granted by Apple).',
    },
    {
      title: 'Export Compliance',
      content:
        'You may not use or export the App except as authorized by United States law, the laws of the jurisdiction in which you obtained the App, and any other applicable laws. In particular, the App may not be exported or re-exported into any U.S.-embargoed countries or to anyone on U.S. restricted lists.',
    },
    {
      title: 'Governing Law',
      content:
        'This EULA is governed by the laws of Hong Kong SAR, without regard to conflict of law principles, except where prohibited by applicable consumer protection laws that may provide you additional rights.',
    },
    {
      title: 'Apple as Third-Party Beneficiary',
      content:
        'Apple, and Apple’s subsidiaries, are third-party beneficiaries of this EULA, and upon your acceptance of this EULA, Apple will have the right (and will be deemed to have accepted the right) to enforce this EULA against you as a third-party beneficiary.',
    },
    {
      title: 'Contact',
      content: 'Email: support@benwyw.com',
    },
  ]
</script>
