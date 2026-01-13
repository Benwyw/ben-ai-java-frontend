<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
      Quick Actions
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="action in actions"
          :key="action.title"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-card
            class="h-100 action-card"
            :color="action.color"
            hover
            rounded="xl"
            :to="action.to"
            variant="tonal"
          >
            <v-card-text class="d-flex flex-column align-center text-center pa-6">
              <v-icon class="mb-3" :color="action.color" size="40">{{ action.icon }}</v-icon>
              <div class="text-subtitle-1 font-weight-bold">{{ action.title }}</div>
              <div class="text-caption text-medium-emphasis">{{ action.description }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    actions: {
      type: Array,
      default: () => [],
    },
  })
</script>

<style scoped>
.action-card {
  transition: transform 0.2s ease-in-out;
}

.action-card:hover {
  transform: translateY(-4px);
}

.h-100 {
  height: 100%;
}
</style>

