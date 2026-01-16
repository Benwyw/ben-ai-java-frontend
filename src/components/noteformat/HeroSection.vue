<template>
  <v-card
    class="mb-6 bg-gradient-noteformat"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-img
        class="mb-4 mx-auto drop-shadow"
        alt="NoteFormat"
        src="@/assets/NoteFormat-120-transparent.png"
        height="120"
        width="120"
      />
      <h1 class="text-h3 font-weight-bold text-white mb-2">NoteFormat</h1>
      <p class="text-h6 text-white-darken-1 mb-4">Custom Templates & Expense Import/Export</p>
      <div class="d-flex justify-center ga-3 flex-wrap mb-4">
        <v-chip color="white" prepend-icon="mdi-apple" variant="flat">
          iOS App
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-cloud-sync" variant="flat">
          iCloud Sync
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-trophy" variant="flat">
          Game Center
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
