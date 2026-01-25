<template>
  <v-card
    aria-label="NoteFormat iOS App"
    class="mb-6 bg-gradient-noteformat"
    rounded="xl"
    tag="section"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-img
        alt="NoteFormat iOS App Logo - Smart Note & Expense Companion"
        class="mb-4 mx-auto drop-shadow"
        height="120"
        loading="eager"
        src="@/assets/NoteFormat-120-transparent.png"
        width="120"
      />
      <h1 class="text-h3 font-weight-bold text-white mb-2">{{ t('noteformat.title') }}</h1>
      <p class="text-h6 text-white-darken-1 mb-4">
        {{ t('noteformat.subtitle') }}
      </p>
      <p class="text-body-2 text-white-darken-2 mb-4 mx-auto" style="max-width: 520px;">
        {{ t('noteformat.description') }}
      </p>
      <div aria-label="App Features" class="d-flex justify-center ga-3 flex-wrap mb-4" role="list">
        <v-chip color="white" prepend-icon="mdi-apple" role="listitem" variant="flat">
          {{ t('noteformat.iosApp') }}
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-cloud-sync" role="listitem" variant="flat">
          {{ t('noteformat.icloudSync') }}
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-trophy" role="listitem" variant="flat">
          {{ t('noteformat.gameCenter') }}
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-microphone" role="listitem" variant="flat">
          {{ t('noteformat.siriShortcuts') }}
        </v-chip>
      </div>
      <v-hover v-slot="{ isHovering, props }">
        <v-btn
          v-bind="props"
          aria-label="Download NoteFormat on the App Store"
          :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"
          class="text-none"
          color="white"
          :elevation="isHovering ? 8 : 2"
          href="https://apps.apple.com/app/noteformat/id6756885265"
          prepend-icon="mdi-apple"
          rel="noopener"
          rounded="pill"
          size="large"
          target="_blank"
          variant="flat"
        >
          {{ t('noteformat.downloadAppStore') }}
        </v-btn>
      </v-hover>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<style scoped>
.bg-gradient-noteformat {
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
}
</style>
