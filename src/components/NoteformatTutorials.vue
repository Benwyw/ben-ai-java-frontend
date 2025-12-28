<template>
  <div>
    <PageHeader
      gradient-class="bg-gradient-success"
      icon="mdi-school"
      subtitle="Learn how to get the most from NoteFormat"
      title="NoteFormat Tutorials"
    />

    <v-card class="mb-6" rounded="xl">
      <v-card-text class="pa-6">
        <v-alert border="start" color="primary" variant="tonal">
          Coming soon: onboarding, formatting tips, and best practices.
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
