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
        <h1 class="text-h4 font-weight-bold text-white mb-2">Staff List</h1>
        <p class="text-body-1 text-white-darken-1">Meet the team behind mc.benwyw.com</p>
      </v-card-text>
    </v-card>

    <!-- Global Staff Section -->
    <v-card class="mb-6" rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="red">mdi-shield-crown</v-icon>
        Global Staff
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
                <v-avatar class="mb-3" :color="getRoleColor(member.role)" size="64">
                  <v-icon color="white" size="32">{{ getRoleIcon(member.role) }}</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold mb-1">{{ member.name }}</div>
                <v-chip :color="getRoleColor(member.role)" size="small" variant="tonal">
                  {{ member.role }}
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
        Public Relations Team
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
                  {{ member.role }}
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
        Build Team
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
                <v-avatar class="mb-3" :color="member.role.includes('Senior') ? 'amber' : 'green'" size="64">
                  <v-icon color="white" size="32">mdi-hammer-wrench</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold mb-1">{{ member.name }}</div>
                <v-chip :color="member.role.includes('Senior') ? 'amber' : 'green'" size="small" variant="tonal">
                  {{ member.role }}
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
        Staff Photo
      </v-card-title>
      <v-card-text>
        <v-img
          class="rounded-xl"
          :src="staffListImage"
          alt="mc.benwyw.com Staff List"
          max-height="600"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
  import staffListImage from '@/assets/mcbenwywcom/mcbenwywcom_staff-list.webp'

  const globalStaff = [
    { name: 'Benlien', role: 'Owner' },
    { name: 'Rykos714', role: 'Owner' },
    { name: 'willywilly234', role: 'Owner' },
    { name: 'PoKz98', role: 'Manager' },
  ]

  const publicRelationsTeam = [
    { name: 'Chestpacito', role: 'Public Relations' },
    { name: 'AhikiroNiwa', role: 'Public Relations' },
  ]

  const buildTeam = [
    { name: 'keikei0303', role: 'Senior Builder' },
    { name: 'NLGT', role: 'Senior Builder' },
    { name: 'IvanXLOL', role: 'Builder' },
  ]

  function getRoleColor (role) {
    switch (role) {
      case 'Owner':
        return 'red'
      case 'Manager':
        return 'orange'
      default:
        return 'grey'
    }
  }

  function getRoleIcon (role) {
    switch (role) {
      case 'Owner':
        return 'mdi-crown'
      case 'Manager':
        return 'mdi-shield-star'
      default:
        return 'mdi-account'
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

