<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-warning"
      icon="mdi-file-tree"
      :subtitle="t('noteformat.docsSubtitle')"
      :title="t('noteformat.docsTitle')"
    />

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-frequently-asked-questions</v-icon>
        {{ t('noteformat.faq') }}
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel :title="t('noteformat.faqItems.whatIs')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.whatIsAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.faqItems.dataSync')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.dataSyncAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.faqItems.proIncluded')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.proIncludedAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.faqItems.cancelSubscription')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.cancelSubscriptionAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.faqItems.siriUsage')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.siriUsageAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.faqItems.budgetAlerts')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.budgetAlertsAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.faqItems.achievements')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.achievementsAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.faqItems.deleteData')">
            <v-expansion-panel-text>
              {{ t('noteformat.faqItems.deleteDataAnswer') }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-code-braces</v-icon>
        {{ t('noteformat.templatePlaceholders') }}
      </v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th>{{ t('noteformat.placeholder') }}</th>
              <th>{{ t('common.description') }}</th>
              <th>{{ t('noteformat.exampleOutput') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{date}</code></td>
              <td>Entry date (format configurable)</td>
              <td>2026-01-01 14:30</td>
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
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-file-document-multiple</v-icon>
        {{ t('noteformat.defaultTemplates') }}
      </v-card-title>
      <v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th>{{ t('noteformat.template') }}</th>
              <th>{{ t('noteformat.pattern') }}</th>
              <th>{{ t('noteformat.dateFormat') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Full Notes</strong></td>
              <td><code>{date} ${amount} {category} - {content} ({tags})</code></td>
              <td>yyyy-MM-dd HH:mm</td>
            </tr>
            <tr>
              <td><strong>Notes</strong></td>
              <td><code>${amount} {content} ({tags})</code></td>
              <td>yyyy-MM-dd</td>
            </tr>
            <tr>
              <td><strong>Expense Log</strong></td>
              <td><code>{date} ${amount} [{category}] {content}</code></td>
              <td>yyyy-MM-dd</td>
            </tr>
            <tr>
              <td><strong>Quick Entry</strong></td>
              <td><code>{content} - ${amount}</code></td>
              <td>yyyy-MM-dd</td>
            </tr>
            <tr>
              <td><strong>CSV</strong></td>
              <td><code>{date},{category},{amount},{content},{tags}</code></td>
              <td>yyyy-MM-dd</td>
            </tr>
            <tr>
              <td><strong>Markdown</strong></td>
              <td><code>- **{date}** | `{category}` | {content} | *${amount}* | {tags}</code></td>
              <td>yyyy-MM-dd</td>
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
  import { useI18n } from 'vue-i18n'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  const { t } = useI18n()
</script>
