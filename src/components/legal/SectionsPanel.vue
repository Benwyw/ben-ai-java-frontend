<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-text class="pa-6">
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="(section, index) in sections" :key="index">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-avatar class="mr-3" color="primary" size="32">
                <span class="text-body-2 text-white">{{ index + 1 }}</span>
              </v-avatar>
              <span class="font-weight-medium">{{ section.title }}</span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p class="text-body-2">{{ section.content }}</p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider class="my-6" />

      <p class="text-caption text-medium-emphasis text-center">
        <v-icon class="mr-1" size="small">mdi-clock-outline</v-icon>
        Last updated on: {{ lastUpdated }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    sections: {
      type: Array,
      default: () => [],
    },
    lastUpdated: {
      type: String,
      default: '',
    },
  })
</script>
