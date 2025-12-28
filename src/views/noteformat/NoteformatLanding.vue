<template>
  <v-container class="py-8 mx-auto" max-width="1200">
    <v-row class="align-center mb-6" justify="space-between">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">NoteFormat</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          Welcome to NoteFormat. Find legal documents, privacy details, and tutorials for the iOS app in one place.
        </p>
      </v-col>
      <v-col class="text-md-right" cols="12" md="4">
        <v-btn color="primary" href="/noteformat/tutorials" prepend-icon="mdi-school" variant="flat">
          View Tutorials
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mb-4" />

    <v-row dense>
      <v-col cols="12" md="6" lg="3">
        <v-card class="h-100" :to="'/noteformat/eula'" variant="outlined">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-file-document-outline</v-icon>
            EULA
          </v-card-title>
          <v-card-subtitle>Usage terms for NoteFormat.</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card class="h-100" :to="'/noteformat/privacy'" variant="outlined">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-shield-lock</v-icon>
            Privacy
          </v-card-title>
          <v-card-subtitle>How we handle your data.</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card class="h-100" :to="'/noteformat/tutorials'" variant="outlined">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-school</v-icon>
            Tutorials
          </v-card-title>
          <v-card-subtitle>Learn how to get the most from NoteFormat.</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card class="h-100" :to="'/noteformat/docs'" variant="outlined">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-file-tree</v-icon>
            Docs & FAQ
          </v-card-title>
          <v-card-subtitle>Reference and common questions.</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Simple landing hub for NoteFormat content
</script>
