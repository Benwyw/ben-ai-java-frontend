<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="pink">mdi-heart</v-icon>
      {{ t('cat.inLovingMemory') }}
    </v-card-title>
    <v-card-text>
      <p class="text-body-1 mb-2" v-html="t('cat.memoryParagraph1')" />
      <p class="text-body-1 mb-4" v-html="t('cat.memoryParagraph2')" />

      <v-divider class="my-4" />

      <!-- Memory highlights -->
      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-card class="h-100" color="pink" rounded="lg" variant="tonal">
            <v-card-text class="text-center">
              <v-icon class="mb-2" color="pink" size="40">mdi-paw</v-icon>
              <div class="text-h6 font-weight-bold">{{ t('cat.highlights.playfulSpirit') }}</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                {{ t('cat.highlights.playfulSpiritDesc') }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-card class="h-100" color="purple" rounded="lg" variant="tonal">
            <v-card-text class="text-center">
              <v-icon class="mb-2" color="purple" size="40">mdi-sofa</v-icon>
              <div class="text-h6 font-weight-bold">{{ t('cat.highlights.cuddleExpert') }}</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                {{ t('cat.highlights.cuddleExpertDesc') }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-card class="h-100" color="orange" rounded="lg" variant="tonal">
            <v-card-text class="text-center">
              <v-icon class="mb-2" color="orange" size="40">mdi-star</v-icon>
              <div class="text-h6 font-weight-bold">{{ t('cat.highlights.foreverLoved') }}</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                {{ t('cat.dates') }}
              </div>
              <div class="text-caption text-medium-emphasis">
                {{ t('cat.highlights.foreverLovedDesc') }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
