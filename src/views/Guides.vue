<template>
  <v-container class="py-8" style="max-width: 980px;">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">{{ t('guides.title') }}</h1>
        <p class="text-body-1">
          {{ t('guides.description') }}
        </p>

        <v-alert class="mt-4" type="info" variant="tonal">
          {{ t('guides.tip') }}
        </v-alert>
      </v-col>

      <v-col cols="12" md="6">
        <v-card variant="outlined">
          <v-card-title>{{ t('noteformat.title') }}</v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-3">
              {{ t('guides.noteformatCard') }}
            </p>
            <v-list density="compact">
              <v-list-item :title="t('guides.landing')" :to="{ path: '/noteformat' }" />
              <v-list-item :title="t('noteformat.docs')" :to="{ path: '/noteformat/docs' }" />
              <v-list-item :title="t('noteformat.tutorials')" :to="{ path: '/noteformat/tutorials' }" />
              <v-list-item :title="t('noteformat.privacy')" :to="{ path: '/noteformat/privacy' }" />
              <v-list-item :title="t('noteformat.eula')" :to="{ path: '/noteformat/eula' }" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card variant="outlined">
          <v-card-title>{{ t('sections.tools') }}</v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-3">
              {{ t('guides.toolsCard') }}
            </p>
            <v-list density="compact">
              <v-list-item :title="t('benkaneki.whityWeight')" :to="{ path: '/whityweight' }" />
              <v-list-item :title="`${t('benkaneki.swagger')} (${t('guides.loginRequired')})`" :to="{ path: '/swagger' }" />
              <v-list-item :title="`${t('benkaneki.messenger')} (${t('guides.loginRequired')})`" :to="{ path: '/messenger' }" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-title>{{ t('guides.siteAndLegal') }}</v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-3">
              {{ t('guides.siteAndLegalDesc') }}
            </p>
            <v-list density="compact">
              <v-list-item :title="t('nav.about')" :to="{ path: '/about' }" />
              <v-list-item :title="t('legal.privacyPolicyTitle')" :to="{ path: '/privacypolicy' }" />
              <v-list-item :title="t('legal.termsOfServiceTitle')" :to="{ path: '/termsofservice' }" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <h2 class="text-h6 font-weight-bold mb-2">{{ t('common.contact') }}</h2>
        <p class="text-body-2">
          {{ t('guides.contactDesc') }} <a href="mailto:support@benwyw.com">support@benwyw.com</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
