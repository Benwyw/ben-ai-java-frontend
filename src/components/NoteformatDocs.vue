<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-warning"
      icon="mdi-file-tree"
      subtitle="Reference and frequently asked questions"
      title="NoteFormat Docs & FAQ"
    />

    <v-card class="mb-6" rounded="xl">
      <v-card-text class="pa-6">
        <v-alert border="start" color="primary" variant="tonal">
          Docs and FAQs are coming soon. Check back for updates.
        </v-alert>
      </v-card-text>
    </v-card>

    <BackButton />
  </div>
</template>

<script setup>
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
</script>
