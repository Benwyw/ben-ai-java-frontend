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
        {{ t('noteformat.tutorials.gettingStarted') }}
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel :title="t('noteformat.tutorials.addingFirstNote')">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li v-for="(step, index) in tm('noteformat.tutorials.addingFirstNoteSteps')" :key="index" v-html="step" />
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.tutorials.settingUpBudgets')">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li v-for="(step, index) in tm('noteformat.tutorials.settingUpBudgetsSteps')" :key="index" v-html="step" />
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.tutorials.viewingReports')">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li v-for="(step, index) in tm('noteformat.tutorials.viewingReportsSteps')" :key="index" v-html="step" />
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-cog</v-icon>
        {{ t('noteformat.tutorials.customization') }}
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel :title="t('noteformat.tutorials.creatingCustomCategories')">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li v-for="(step, index) in tm('noteformat.tutorials.creatingCustomCategoriesSteps')" :key="index" v-html="step" />
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.tutorials.customizingTemplates')">
            <v-expansion-panel-text>
              <p class="mb-2">{{ t('noteformat.tutorials.customizingTemplatesIntro') }}</p>
              <ul class="ml-4 mb-2">
                <li v-for="(placeholder, index) in tm('noteformat.tutorials.customizingTemplatesPlaceholders')" :key="index" v-html="placeholder" />
              </ul>
              <p v-html="t('noteformat.tutorials.customizingTemplatesExample')" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.tutorials.usingThemes')">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li v-for="(step, index) in tm('noteformat.tutorials.usingThemesSteps')" :key="index" v-html="step" />
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-swap-horizontal</v-icon>
        {{ t('noteformat.tutorials.importExport') }}
      </v-card-title>
      <v-card-text>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel :title="t('noteformat.tutorials.exportingNotes')">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li v-for="(step, index) in tm('noteformat.tutorials.exportingNotesSteps')" :key="index" v-html="step" />
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="t('noteformat.tutorials.importingNotes')">
            <v-expansion-panel-text>
              <ol class="ml-4">
                <li v-for="(step, index) in tm('noteformat.tutorials.importingNotesSteps')" :key="index" v-html="step" />
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

  const { t, tm } = useI18n()
</script>
