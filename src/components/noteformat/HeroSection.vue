<template>
  <v-card
    class="mb-6 bg-gradient-noteformat"
    rounded="xl"
    variant="flat"
    tag="section"
    aria-label="NoteFormat iOS App"
  >
    <v-card-text class="py-12 text-center">
      <v-img
        class="mb-4 mx-auto drop-shadow"
        alt="NoteFormat iOS App Logo - Smart Note & Expense Companion"
        src="@/assets/NoteFormat-120-transparent.png"
        height="120"
        width="120"
        loading="eager"
      />
      <h1 class="text-h3 font-weight-bold text-white mb-2">NoteFormat</h1>
      <p class="text-h6 text-white-darken-1 mb-4">
        Your Smart Note & Expense Companion
      </p>
      <p class="text-body-2 text-white-darken-2 mb-4 mx-auto" style="max-width: 520px;">
        Capture expenses, format them with templates, and import/export easily. Track spending, budgets and reports—simple, private, and beautiful.
      </p>
      <div class="d-flex justify-center ga-3 flex-wrap mb-4" role="list" aria-label="App Features">
        <v-chip color="white" prepend-icon="mdi-apple" variant="flat" role="listitem">
          iOS App
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-cloud-sync" variant="flat" role="listitem">
          iCloud Sync
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-trophy" variant="flat" role="listitem">
          Game Center
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-microphone" variant="flat" role="listitem">
          Siri Shortcuts
        </v-chip>
      </div>
      <v-hover v-slot="{ isHovering, props }">
        <v-btn
          v-bind="props"
          :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"
          :elevation="isHovering ? 8 : 2"
          class="text-none"
          color="white"
          href="https://apps.apple.com/app/noteformat/id6756885265"
          prepend-icon="mdi-apple"
          rounded="pill"
          size="large"
          target="_blank"
          rel="noopener"
          variant="flat"
          aria-label="Download NoteFormat on the App Store"
        >
          Download on the App Store
        </v-btn>
      </v-hover>
    </v-card-text>
  </v-card>
</template>

<script setup>
</script>

<style scoped>
.bg-gradient-noteformat {
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
}
</style>
