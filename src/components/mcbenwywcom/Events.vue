<template>
  <div>
    <!-- Hero Section -->
    <v-card
      class="mb-6 bg-gradient-events"
      rounded="xl"
      variant="flat"
    >
      <v-card-text class="py-8 text-center">
        <v-icon class="mb-2" color="white" size="60">mdi-calendar-star</v-icon>
        <h1 class="text-h4 font-weight-bold text-white mb-2">Past Events</h1>
        <p class="text-body-1 text-white-darken-1">Memorable events from mc.benwyw.com history</p>
      </v-card-text>
    </v-card>

    <!-- Coming Soon Notice -->
    <v-card class="mb-6" rounded="xl">
      <v-card-text class="text-center py-12">
        <v-icon class="mb-4" color="purple" size="80">mdi-calendar-clock</v-icon>
        <h2 class="text-h5 font-weight-bold mb-2">Under Construction</h2>
        <p class="text-body-1 text-medium-emphasis">
          This page is being developed. Check back later for a timeline of our past events!
        </p>
      </v-card-text>
    </v-card>

    <!-- Placeholder Events Timeline -->
    <v-card rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="purple">mdi-timeline</v-icon>
        Event Timeline
      </v-card-title>
      <v-card-text>
        <v-timeline side="end" density="compact">
          <v-timeline-item
            dot-color="grey"
            size="small"
          >
            <v-card variant="outlined" rounded="xl">
              <v-card-text>
                <div class="text-subtitle-2 font-weight-bold">Event coming soon...</div>
                <div class="text-caption text-medium-emphasis">Details to be added</div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
          <v-timeline-item
            dot-color="grey"
            size="small"
          >
            <v-card variant="outlined" rounded="xl">
              <v-card-text>
                <div class="text-subtitle-2 font-weight-bold">Event coming soon...</div>
                <div class="text-caption text-medium-emphasis">Details to be added</div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
          <v-timeline-item
            dot-color="grey"
            size="small"
          >
            <v-card variant="outlined" rounded="xl">
              <v-card-text>
                <div class="text-subtitle-2 font-weight-bold">Event coming soon...</div>
                <div class="text-caption text-medium-emphasis">Details to be added</div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.bg-gradient-events {
  background: linear-gradient(135deg, #9C27B0 0%, #4A148C 100%);
}
</style>

