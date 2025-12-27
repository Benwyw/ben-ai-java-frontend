<template>
  <v-card-text class="pa-6 text-center">
    <v-avatar class="mb-4" color="primary" size="80">
      <v-icon color="white" size="40">mdi-account</v-icon>
    </v-avatar>
    <div class="text-h6 mb-2">{{ displayName }}</div>
    <div class="text-body-2 text-medium-emphasis mb-6">You are currently logged in</div>
    <v-btn
      block
      color="error"
      :loading="isLoading"
      size="large"
      variant="flat"
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
      default: 'User',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['logout'])
</script>
