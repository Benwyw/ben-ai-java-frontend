<template>
  <v-container class="py-8" style="max-width: 980px;">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Guides</h1>
        <p class="text-body-1">
          This page is a starting point for documentation and tutorials across my personal projects.
          If you're new here, start with NoteFormat.
        </p>

        <v-alert class="mt-4" type="info" variant="tonal">
          Tip: these pages are public and include longer-form documentation, which also helps user understand the site.
        </v-alert>
      </v-col>

      <v-col cols="12" md="6">
        <v-card variant="outlined">
          <v-card-title>NoteFormat</v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-3">
              Documentation, FAQ, tutorials, and legal pages for the NoteFormat app.
            </p>
            <v-list density="compact">
              <v-list-item title="Landing" :to="{ path: '/noteformat' }" />
              <v-list-item title="Docs & FAQ" :to="{ path: '/noteformat/docs' }" />
              <v-list-item title="Tutorials" :to="{ path: '/noteformat/tutorials' }" />
              <v-list-item title="Privacy" :to="{ path: '/noteformat/privacy' }" />
              <v-list-item title="EULA" :to="{ path: '/noteformat/eula' }" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card variant="outlined">
          <v-card-title>Tools</v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-3">
              Small utilities and demos.
            </p>
            <v-list density="compact">
              <v-list-item title="Whity Weight" :to="{ path: '/whityweight' }" />
              <v-list-item title="Swagger (login required)" :to="{ path: '/swagger' }" />
              <v-list-item title="Messenger (login required)" :to="{ path: '/messenger' }" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-title>Site & legal</v-card-title>
          <v-card-text>
            <p class="text-body-2 mb-3">
              Transparency pages required for privacy and advertising compliance.
            </p>
            <v-list density="compact">
              <v-list-item title="About" :to="{ path: '/about' }" />
              <v-list-item title="Privacy Policy" :to="{ path: '/privacypolicy' }" />
              <v-list-item title="Terms of Service" :to="{ path: '/termsofservice' }" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <h2 class="text-h6 font-weight-bold mb-2">Contact</h2>
        <p class="text-body-2">
          For support or business enquiries, email: <a href="mailto:support@benwyw.com">support@benwyw.com</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Intentionally minimal: this view is primarily indexable text and internal links.
</script>
