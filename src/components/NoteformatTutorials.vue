<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-success"
      icon="mdi-school"
      :subtitle="t('noteformat.tutorialsSubtitle')"
      :title="t('noteformat.tutorialsTitle')"
    />

    <!-- Video Tutorials Section -->
    <v-card class="mb-6" rounded="xl">
      <v-expansion-panels v-model="videoSectionOpen">
        <v-expansion-panel value="videos">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-play-circle</v-icon>
              <span class="text-h6">{{ t('noteformat.tutorials.videoTutorials') }}</span>
              <v-chip class="ml-2" size="small" color="primary" variant="tonal">
                {{ videoTutorials.length }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p class="text-body-1 mb-4">{{ t('noteformat.tutorials.videoTutorialsIntro') }}</p>
            <v-row>
              <v-col
                v-for="(video, index) in videoTutorials"
                :key="index"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card variant="outlined" rounded="lg" class="h-100">
                  <v-card-title class="text-subtitle-1">
                    <v-icon class="mr-2" size="small">{{ video.icon }}</v-icon>
                    {{ video.title }}
                  </v-card-title>
                  <v-card-text class="d-flex justify-center">
                    <InstagramEmbed :url="video.url" :captioned="true" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

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
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import BackButton from '@/components/shared/BackButton.vue'
  import InstagramEmbed from '@/components/shared/InstagramEmbed.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  const { t, tm } = useI18n()

  // Video section collapsed by default to reduce page length
  const videoSectionOpen = ref(null)

  // Video tutorials from Instagram Reels
  const videoTutorials = computed(() => [
    {
      title: t('noteformat.tutorials.appleShortcuts'),
      url: 'https://www.instagram.com/reel/DUIEsbJATST/',
      icon: 'mdi-lightning-bolt',
    },
    {
      title: t('noteformat.tutorials.importingData'),
      url: 'https://www.instagram.com/reel/DUFV3X7gT4G/',
      icon: 'mdi-import',
    },
    {
      title: t('noteformat.tutorials.importingData'),
      url: 'https://www.instagram.com/reel/DUSQgdNAW0J/',
      icon: 'mdi-import',
    },
    // {
    //   title: t('noteformat.tutorials.quickOverview'),
    //   url: 'https://www.instagram.com/reel/DUFV3X7gT4G/',
    //   icon: 'mdi-rocket-launch',
    // },
    // Add more reels here as needed:
    // {
    //   title: t('noteformat.tutorials.budgetSetup'),
    //   url: 'https://www.instagram.com/reel/YOUR_REEL_ID/',
    //   icon: 'mdi-wallet',
    // },
  ])
</script>
