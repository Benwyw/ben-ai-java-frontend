<template>
  <v-card
    class="mb-6 bg-gradient-noteformat"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-avatar class="mb-4 elevation-4" color="white" size="120">
        <v-icon color="primary" size="64">mdi-notebook-outline</v-icon>
      </v-avatar>
      <h1 class="text-h3 font-weight-bold text-white mb-2">NoteFormat</h1>
      <p class="text-h6 text-white-darken-1 mb-4">iOS Note & Expense Tracker</p>
      <div class="d-flex justify-center ga-3 flex-wrap">
        <v-chip color="white" prepend-icon="mdi-apple" variant="flat">
          iOS App
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-cloud-sync" variant="flat">
          iCloud Sync
        </v-chip>
      </div>
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
