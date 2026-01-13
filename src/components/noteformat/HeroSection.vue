<template>
  <v-card
    class="mb-6 bg-gradient-noteformat"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-avatar class="mb-4 elevation-4" size="120">
        <v-img
          alt="NoteFormat"
          cover
          src="@/assets/NoteFormat-1024-transparent.png"
        />
      </v-avatar>
      <h1 class="text-h3 font-weight-bold text-white mb-2">NoteFormat</h1>
      <p class="text-h6 text-white-darken-1 mb-4">iOS Note & Expense Tracker</p>
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
      <v-btn
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
