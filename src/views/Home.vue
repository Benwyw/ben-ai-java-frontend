<template>
  <v-container class="py-8" style="max-width: 980px;">
    <!-- Hero Section -->
    <div class="text-center mb-8">
      <h1 class="text-h3 font-weight-bold mb-2">Welcome</h1>
      <p class="text-body-1 text-medium-emphasis">Choose a project to explore</p>
    </div>

    <!-- Navigation Banners -->
    <v-row class="justify-center">
      <!-- NoteFormat Banner -->
      <v-col cols="12" md="6">
        <v-card
          class="h-100 banner-card"
          :to="'/noteformat'"
          hover
          rounded="xl"
        >
          <div class="banner-gradient-noteformat">
            <v-card-text class="d-flex flex-column align-center text-center pa-8">
              <v-avatar class="mb-4 elevation-4" size="100">
                <v-img
                  alt="NoteFormat"
                  cover
                  src="@/assets/noteformat-128.png"
                />
              </v-avatar>
              <h2 class="text-h4 font-weight-bold text-white mb-2">NoteFormat</h2>
              <p class="text-body-1 text-white-darken-1 mb-4">iOS Note & Expense Tracker</p>
              <div class="d-flex justify-center ga-2 flex-wrap">
                <v-chip color="white" size="small" variant="flat">
                  <v-icon start size="small">mdi-apple</v-icon>
                  iOS App
                </v-chip>
                <v-chip color="white" size="small" variant="flat">
                  <v-icon start size="small">mdi-cloud-sync</v-icon>
                  iCloud
                </v-chip>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>

      <!-- Ben Kaneki Banner -->
      <v-col cols="12" md="6">
        <v-card
          class="h-100 banner-card"
          :to="'/benkaneki'"
          hover
          rounded="xl"
        >
          <div class="banner-gradient-benkaneki">
            <v-card-text class="d-flex flex-column align-center text-center pa-8">
              <v-avatar class="mb-4 elevation-4" color="white" size="100">
                <v-icon color="deep-purple" size="60">mdi-robot</v-icon>
              </v-avatar>
              <h2 class="text-h4 font-weight-bold text-white mb-2">Ben Kaneki</h2>
              <p class="text-body-1 text-white-darken-1 mb-4">Discord Bot & Web Tools</p>
              <div class="d-flex justify-center ga-2 flex-wrap">
                <v-chip color="white" size="small" variant="flat">
                  <v-icon start size="small">mdi-robot</v-icon>
                  Discord Bot
                </v-chip>
                <v-chip color="white" size="small" variant="flat">
                  <v-icon start size="small">mdi-api</v-icon>
                  API
                </v-chip>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.banner-card {
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
}

.banner-card:hover {
  transform: translateY(-8px);
}

.banner-gradient-noteformat {
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-gradient-benkaneki {
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-100 {
  height: 100%;
}
</style>