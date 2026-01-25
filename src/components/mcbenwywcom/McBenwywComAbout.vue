<template>
  <div>
    <!-- Hero Section with Banner -->
    <v-card
      class="mb-6"
      rounded="xl"
      variant="flat"
    >
      <v-img
        alt="Ben's Minecraft Server Banner"
        class="rounded-xl"
        cover
        height="300"
        :src="bannerImage"
      >
        <div class="d-flex align-center justify-center fill-height" style="background: rgba(0,0,0,0.4);">
          <div class="text-center">
            <h1 class="text-h3 font-weight-bold text-white mb-2">{{ t('minecraft.welcomeTitle') }}</h1>
            <p class="text-h6 text-white">{{ t('minecraft.welcomeSubtitle') }}</p>
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
            {{ t('minecraft.aboutServer') }}
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              {{ t('minecraft.aboutServerDesc1') }}
            </p>
            <p class="text-body-1 mb-4">
              {{ t('minecraft.aboutServerDesc2') }}
            </p>
            <v-chip class="mr-2" color="red" variant="tonal">
              <v-icon start>mdi-archive</v-icon>
              {{ t('minecraft.serverArchived') }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="h-100" rounded="xl">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="blue">mdi-server</v-icon>
            {{ t('minecraft.serverDetails') }}
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template #prepend>
                  <v-icon color="green">mdi-web</v-icon>
                </template>
                <v-list-item-title>{{ t('minecraft.serverAddress') }}</v-list-item-title>
                <v-list-item-subtitle>mc.benwyw.com</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="orange">mdi-minecraft</v-icon>
                </template>
                <v-list-item-title>{{ t('minecraft.gameVersion') }}</v-list-item-title>
                <v-list-item-subtitle>{{ t('minecraft.javaEdition') }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="purple">mdi-gamepad-variant</v-icon>
                </template>
                <v-list-item-title>{{ t('minecraft.gameMode') }}</v-list-item-title>
                <v-list-item-subtitle>{{ t('minecraft.survival') }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="red">mdi-calendar</v-icon>
                </template>
                <v-list-item-title>{{ t('minecraft.status') }}</v-list-item-title>
                <v-list-item-subtitle>{{ t('minecraft.deprecatedArchived') }}</v-list-item-subtitle>
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
        {{ t('minecraft.gallery') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card rounded="xl" variant="outlined">
              <v-img
                alt="Server Fullsize"
                class="rounded-xl"
                cover
                height="200"
                :src="fullsizeImage"
              />
              <v-card-text class="text-center">
                <div class="text-subtitle-1 font-weight-bold">{{ t('minecraft.serverSpawn') }}</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card rounded="xl" variant="outlined">
              <v-img
                alt="Owner Statues"
                class="rounded-xl"
                cover
                height="200"
                :src="ownerStatuesImage"
              />
              <v-card-text class="text-center">
                <div class="text-subtitle-1 font-weight-bold">{{ t('minecraft.ownerStatues') }}</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card rounded="xl" variant="outlined">
              <v-img
                alt="Staff List"
                class="rounded-xl"
                cover
                height="200"
                :src="staffListImage"
              />
              <v-card-text class="text-center">
                <div class="text-subtitle-1 font-weight-bold">{{ t('minecraft.staffTeam') }}</div>
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
        {{ t('minecraft.quickLinks') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="6">
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
                <div class="text-subtitle-1 font-weight-bold">{{ t('minecraft.staffList') }}</div>
                <div class="text-caption text-medium-emphasis">{{ t('minecraft.meetOurTeam') }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import bannerImage from '@/assets/mcbenwywcom/mcbenwywcom_animated-banner.gif'
  import fullsizeImage from '@/assets/mcbenwywcom/mcbenwywcom_fullsize-1000.webp'
  import ownerStatuesImage from '@/assets/mcbenwywcom/mcbenwywcom_owner-statues.webp'
  import staffListImage from '@/assets/mcbenwywcom/mcbenwywcom_staff-list.webp'

  const { t } = useI18n()
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
