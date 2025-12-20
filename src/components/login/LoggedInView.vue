<template>
  <v-card-text class="pa-6 text-center">
    <v-avatar color="primary" size="80" class="mb-4">
      <v-icon size="40" color="white">mdi-account</v-icon>
    </v-avatar>
    <div class="text-h6 mb-2">{{ displayName }}</div>
    <div class="text-body-2 text-medium-emphasis mb-6">You are currently logged in</div>
    <v-btn
      color="error"
      variant="flat"
      :loading="isLoading"
      block
      size="large"
      @click="$emit('logout')"
    >
      <v-icon class="mr-2">mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-card-text>
</template>

<script setup>
defineProps({
  displayName: {
    type: String,
    default: 'User'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['logout'])
</script>

