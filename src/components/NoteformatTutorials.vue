<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-success"
      icon="mdi-school"
      :subtitle="t('noteformat.tutorialsSubtitle')"
      :title="t('noteformat.tutorialsTitle')"
    />

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-rocket-launch</v-icon>
        Getting Started
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel title="Adding Your First Note">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li>Open NoteFormat and tap the <strong>Notes</strong> tab</li>
                <li>Tap the <strong>+</strong> button in the top right</li>
                <li>Enter your note content, select a category, and optionally add an amount</li>
                <li>Choose tags like "Card" or "Cash" to track payment methods</li>
                <li>Tap <strong>Save</strong> to create your note</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Setting Up Budgets">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li>Navigate to the <strong>Budgets</strong> tab</li>
                <li>Tap <strong>Add Budget</strong></li>
                <li>Enter a name (e.g., "Monthly Food")</li>
                <li>Set your budget amount</li>
                <li>Choose a category (or "All Categories")</li>
                <li>Select the period: Daily, Weekly, Monthly, or Yearly</li>
                <li>Adjust the alert threshold to get notified before exceeding</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Viewing Reports">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li>Go to the <strong>Reports</strong> tab</li>
                <li>Select a period: Daily, Weekly, Monthly, or Yearly</li>
                <li>View your spending summary and category breakdown</li>
                <li>Pro users can see detailed pie charts and export to CSV</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-cog</v-icon>
        Customization
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel title="Creating Custom Categories">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li>Go to <strong>Settings</strong> > <strong>Categories</strong></li>
                <li>Tap <strong>Add Category</strong></li>
                <li>Enter a name, choose an emoji, and set a template placeholder</li>
                <li>Reorder categories by dragging or using Edit mode</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Customizing Format Templates">
            <v-expansion-panel-text>
              <p class="mb-2">Templates control how your notes are formatted when exported. Available placeholders:</p>
              <ul class="ml-4 mb-2">
                <li><code>{date}</code> - Entry date</li>
                <li><code>{category}</code> - Category name</li>
                <li><code>{content}</code> - Note content</li>
                <li><code>{amount}</code> or <code>${amount}</code> - Amount with currency</li>
                <li><code>{tags}</code> - Tags list</li>
              </ul>
              <p>Example: <code>{date} {category} - {content} ${amount}</code></p>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Using Themes (Pro)">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li>Go to <strong>Settings</strong> > <strong>Appearance</strong></li>
                <li>Enable <strong>Themes</strong></li>
                <li>Choose from preset themes or create custom ones</li>
                <li>Custom themes require a Pro subscription</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-swap-horizontal</v-icon>
        Import & Export
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel title="Exporting Notes">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li>Go to <strong>Notes</strong> tab</li>
                <li>Tap the <strong>Export</strong> button</li>
                <li>Select entries and choose a format template</li>
                <li>Share via Messages, Email, Files, or copy to clipboard</li>
                <li>Pro users can export as CSV for spreadsheet apps</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Importing Notes">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li>Go to <strong>Notes</strong> tab</li>
                <li>Tap <strong>Import</strong></li>
                <li>Paste your formatted text</li>
                <li>Select the matching template format</li>
                <li>Review parsed entries and confirm import</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <BackButton />
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  const { t } = useI18n()
</script>
