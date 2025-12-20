<template>
  <v-card rounded="xl" class="mb-6">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
      Quick Actions
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="action in actions" :key="action.title" cols="12" sm="6" md="4" lg="3">
          <v-card
            :to="action.to"
            :color="action.color"
            variant="tonal"
            rounded="xl"
            class="h-100 action-card"
            hover
          >
            <v-card-text class="d-flex flex-column align-center text-center pa-6">
              <v-icon :color="action.color" size="40" class="mb-3">{{ action.icon }}</v-icon>
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
    default: () => []
  }
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

