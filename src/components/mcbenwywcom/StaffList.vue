<template>
  <div>
    <!-- Hero Section -->
    <v-card
      class="mb-6 bg-gradient-minecraft"
      rounded="xl"
      variant="flat"
    >
      <v-card-text class="py-8 text-center">
        <v-icon class="mb-2" color="white" size="60">mdi-account-group</v-icon>
        <h1 class="text-h4 font-weight-bold text-white mb-2">{{ t('minecraft.staffListTitle') }}</h1>
        <p class="text-body-1 text-white-darken-1">{{ t('minecraft.staffListSubtitle') }}</p>
      </v-card-text>
    </v-card>

    <!-- Global Staff Section -->
    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="red">mdi-shield-crown</v-icon>
        {{ t('minecraft.globalStaff') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="member in globalStaff"
            :key="member.name"
            cols="12"
            md="4"
            sm="6"
          >
            <v-card class="h-100" rounded="xl" variant="outlined">
              <v-card-text class="text-center pa-6">
                <v-avatar class="mb-3" :color="getRoleColor(member.roleKey)" size="64">
                  <v-icon color="white" size="32">{{ getRoleIcon(member.roleKey) }}</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold mb-1">{{ member.name }}</div>
                <v-chip :color="getRoleColor(member.roleKey)" size="small" variant="tonal">
                  {{ t(`minecraft.roles.${member.roleKey}`) }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Public Relations Team Section -->
    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="blue">mdi-account-voice</v-icon>
        {{ t('minecraft.publicRelationsTeam') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="member in publicRelationsTeam"
            :key="member.name"
            cols="12"
            md="4"
            sm="6"
          >
            <v-card class="h-100" rounded="xl" variant="outlined">
              <v-card-text class="text-center pa-6">
                <v-avatar class="mb-3" color="blue" size="64">
                  <v-icon color="white" size="32">mdi-account-voice</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold mb-1">{{ member.name }}</div>
                <v-chip color="blue" size="small" variant="tonal">
                  {{ t(`minecraft.roles.${member.roleKey}`) }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Build Team Section -->
    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="green">mdi-hammer-wrench</v-icon>
        {{ t('minecraft.buildTeam') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="member in buildTeam"
            :key="member.name"
            cols="12"
            md="4"
            sm="6"
          >
            <v-card class="h-100" rounded="xl" variant="outlined">
              <v-card-text class="text-center pa-6">
                <v-avatar class="mb-3" :color="member.roleKey === 'seniorBuilder' ? 'amber' : 'green'" size="64">
                  <v-icon color="white" size="32">mdi-hammer-wrench</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold mb-1">{{ member.name }}</div>
                <v-chip :color="member.roleKey === 'seniorBuilder' ? 'amber' : 'green'" size="small" variant="tonal">
                  {{ t(`minecraft.roles.${member.roleKey}`) }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Staff Image -->
    <v-card rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="purple">mdi-image</v-icon>
        {{ t('minecraft.staffPhoto') }}
      </v-card-title>
      <v-card-text>
        <v-img
          alt="mc.benwyw.com Staff List"
          class="rounded-xl"
          max-height="600"
          :src="staffListImage"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import staffListImage from '@/assets/mcbenwywcom/mcbenwywcom_staff-list.webp'

  const { t } = useI18n()

  const globalStaff = [
    { name: 'Benlien', roleKey: 'owner' },
    { name: 'Rykos714', roleKey: 'owner' },
    { name: 'willywilly234', roleKey: 'owner' },
    { name: 'PoKz98', roleKey: 'manager' },
  ]

  const publicRelationsTeam = [
    { name: 'Chestpacito', roleKey: 'publicRelations' },
    { name: 'AhikiroNiwa', roleKey: 'publicRelations' },
  ]

  const buildTeam = [
    { name: 'keikei0303', roleKey: 'seniorBuilder' },
    { name: 'NLGT', roleKey: 'seniorBuilder' },
    { name: 'IvanXLOL', roleKey: 'builder' },
  ]

  function getRoleColor (roleKey) {
    switch (roleKey) {
      case 'owner': {
        return 'red'
      }
      case 'manager': {
        return 'orange'
      }
      default: {
        return 'grey'
      }
    }
  }

  function getRoleIcon (roleKey) {
    switch (roleKey) {
      case 'owner': {
        return 'mdi-crown'
      }
      case 'manager': {
        return 'mdi-shield-star'
      }
      default: {
        return 'mdi-account'
      }
    }
  }
</script>

<style scoped>
.bg-gradient-minecraft {
  background: linear-gradient(135deg, #4CAF50 0%, #1B5E20 100%);
}

.h-100 {
  height: 100%;
}
</style>
