<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-warning"
      icon="mdi-file-tree"
      subtitle="Reference and frequently asked questions"
      title="NoteFormat Docs & FAQ"
    />

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-frequently-asked-questions</v-icon>
        Frequently Asked Questions
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel title="What is NoteFormat?">
            <v-expansion-panel-text>
              NoteFormat is an iOS app for organizing notes and tracking expenses. Create formatted entries with categories, tags, and amounts, then export them in customizable formats.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Is my data synced across devices?">
            <v-expansion-panel-text>
              Yes! If you enable iCloud sync in Settings, your notes, categories, templates, and budgets sync automatically across all your Apple devices signed into the same iCloud account.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="What's included in Pro?">
            <v-expansion-panel-text>
              Pro subscription includes: ad-free experience, unlimited exports, CSV report exports, custom themes, biometric lock (Face ID/Touch ID), and detailed category breakdowns in reports.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="How do I cancel my subscription?">
            <v-expansion-panel-text>
              Go to your device's <strong>Settings</strong> > tap your name > <strong>Subscriptions</strong> > select NoteFormat > <strong>Cancel Subscription</strong>. You'll retain Pro access until the end of your billing period.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Can I use Siri with NoteFormat?">
            <v-expansion-panel-text>
              Yes! NoteFormat supports Siri Shortcuts. You can say things like "Add a note with NoteFormat" to quickly create entries or get reports.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="How do budget alerts work?">
            <v-expansion-panel-text>
              When you create a budget, you set an alert threshold (e.g., 80%). When your spending reaches that percentage of your budget, you'll receive an in-app alert. Budgets can be daily, weekly, monthly, or yearly.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="What are achievements?">
            <v-expansion-panel-text>
              NoteFormat integrates with Game Center. You can earn achievements for milestones like creating your first note, maintaining streaks, exporting data, and more. Check the Achievements tab to see your progress.
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="How do I delete all my data?">
            <v-expansion-panel-text>
              Go to <strong>Settings</strong> > <strong>Data Management</strong> > <strong>Delete All Data</strong>. This permanently removes all notes, templates, categories, budgets, and achievements. This action cannot be undone.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-code-braces</v-icon>
        Template Placeholders Reference
      </v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th>Placeholder</th>
              <th>Description</th>
              <th>Example Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{date}</code></td>
              <td>Entry date (format configurable)</td>
              <td>2026-01-01</td>
            </tr>
            <tr>
              <td><code>{category}</code></td>
              <td>Category name</td>
              <td>Food</td>
            </tr>
            <tr>
              <td><code>{content}</code></td>
              <td>Note content/description</td>
              <td>Lunch at cafe</td>
            </tr>
            <tr>
              <td><code>{amount}</code></td>
              <td>Numeric amount only</td>
              <td>25.50</td>
            </tr>
            <tr>
              <td><code>${amount}</code></td>
              <td>Amount with currency symbol</td>
              <td>$25.50</td>
            </tr>
            <tr>
              <td><code>{tags}</code></td>
              <td>Comma-separated tags</td>
              <td>Card, Work</td>
            </tr>
            <tr>
              <td><code>{currency}</code></td>
              <td>Currency symbol only</td>
              <td>$</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-lifebuoy</v-icon>
        Need Help?
      </v-card-title>
      <v-card-text>
        <p>If you have questions not covered here, please contact us:</p>
        <v-btn
          class="mt-2"
          color="primary"
          href="mailto:support@benwyw.com"
          prepend-icon="mdi-email"
          variant="tonal"
        >
          support@benwyw.com
        </v-btn>
      </v-card-text>
    </v-card>

    <BackButton />
  </div>
</template>

<script setup>
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
</script>
