<template>
  <div>
    <!-- Hero Section with Banner -->
    <v-card
      class="mb-6"
      rounded="xl"
      variant="flat"
    >
      <v-img
        :src="bannerImage"
        alt="Ben's Minecraft Server Banner"
        class="rounded-xl"
        cover
        height="300"
      >
        <div class="d-flex align-center justify-center fill-height" style="background: rgba(0,0,0,0.4);">
          <div class="text-center">
            <h1 class="text-h3 font-weight-bold text-white mb-2">Welcome to Ben's Minecraft Server</h1>
            <p class="text-h6 text-white">A legacy Minecraft server community</p>
          </div>
        </div>
      </v-img>
    </v-card>

    <!-- Server Info -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card class="h-100" rounded="xl">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="green">mdi-information</v-icon>
            About the Server
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              Ben's Minecraft Server was a Minecraft Java Edition survival server that brought together players
              from around the world to build, explore, and create memories together.
            </p>
            <p class="text-body-1 mb-4">
              Although the server is no longer active, this page preserves the history and
              achievements of our wonderful community.
            </p>
            <v-chip class="mr-2" color="red" variant="tonal">
              <v-icon start>mdi-archive</v-icon>
              Server Archived
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="h-100" rounded="xl">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="blue">mdi-server</v-icon>
            Server Details
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template #prepend>
                  <v-icon color="green">mdi-web</v-icon>
                </template>
                <v-list-item-title>Server Address</v-list-item-title>
                <v-list-item-subtitle>mc.benwyw.com</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="orange">mdi-minecraft</v-icon>
                </template>
                <v-list-item-title>Game Version</v-list-item-title>
                <v-list-item-subtitle>Java Edition</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="purple">mdi-gamepad-variant</v-icon>
                </template>
                <v-list-item-title>Game Mode</v-list-item-title>
                <v-list-item-subtitle>Survival</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="red">mdi-calendar</v-icon>
                </template>
                <v-list-item-title>Status</v-list-item-title>
                <v-list-item-subtitle>Deprecated / Archived</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gallery Preview -->
    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="amber">mdi-image-multiple</v-icon>
        Gallery
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card rounded="xl" variant="outlined">
              <v-img
                :src="fullsizeImage"
                alt="Server Fullsize"
                class="rounded-xl"
                height="200"
                cover
              />
              <v-card-text class="text-center">
                <div class="text-subtitle-1 font-weight-bold">Server Spawn</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card rounded="xl" variant="outlined">
              <v-img
                :src="ownerStatuesImage"
                alt="Owner Statues"
                class="rounded-xl"
                height="200"
                cover
              />
              <v-card-text class="text-center">
                <div class="text-subtitle-1 font-weight-bold">Owner Statues</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card rounded="xl" variant="outlined">
              <v-img
                :src="staffListImage"
                alt="Staff List"
                class="rounded-xl"
                height="200"
                cover
              />
              <v-card-text class="text-center">
                <div class="text-subtitle-1 font-weight-bold">Staff Team</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Quick Links -->
    <v-card rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="green">mdi-link</v-icon>
        Quick Links
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-card
              class="h-100 action-card"
              color="amber"
              hover
              rounded="xl"
              to="/mcbenwywcom/staff"
              variant="tonal"
            >
              <v-card-text class="d-flex flex-column align-center text-center pa-6">
                <v-icon class="mb-3" color="amber" size="40">mdi-account-group</v-icon>
                <div class="text-subtitle-1 font-weight-bold">Staff List</div>
                <div class="text-caption text-medium-emphasis">Meet our team</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
  import bannerImage from '@/assets/mcbenwywcom/mcbenwywcom_animated-banner.gif'
  import fullsizeImage from '@/assets/mcbenwywcom/mcbenwywcom_fullsize-1000.webp'
  import ownerStatuesImage from '@/assets/mcbenwywcom/mcbenwywcom_owner-statues.webp'
  import staffListImage from '@/assets/mcbenwywcom/mcbenwywcom_staff-list.webp'
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.action-card {
  transition: transform 0.2s ease-in-out;
}

.action-card:hover {
  transform: translateY(-4px);
}
</style>

