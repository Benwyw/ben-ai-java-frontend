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
      <h1 class="text-h3 font-weight-bold text-white mb-2">NoteFormat</h1>
      <p class="text-h6 text-white-darken-1 mb-4">
        Your Smart Note & Expense Companion
      </p>
      <p class="text-body-2 text-white-darken-2 mb-4 mx-auto" style="max-width: 520px;">
        Capture expenses, format them with templates, and import/export easily. Track spending, budgets and reports—simple, private, and beautiful.
      </p>
      <div aria-label="App Features" class="d-flex justify-center ga-3 flex-wrap mb-4" role="list">
        <v-chip color="white" prepend-icon="mdi-apple" role="listitem" variant="flat">
          iOS App
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-cloud-sync" role="listitem" variant="flat">
          iCloud Sync
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-trophy" role="listitem" variant="flat">
          Game Center
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-microphone" role="listitem" variant="flat">
          Siri Shortcuts
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
