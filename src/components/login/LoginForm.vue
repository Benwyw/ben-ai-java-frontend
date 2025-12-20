<template>
  <v-card-text class="pa-6">
    <v-form @submit.prevent="$emit('submit')">
      <v-text-field
        :model-value="username"
        label="Username"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        rounded="lg"
        class="mb-4"
        required
        @update:model-value="$emit('update:username', $event)"
      />
      <v-text-field
        :model-value="password"
        label="Password"
        type="password"
        prepend-inner-icon="mdi-lock"
        variant="outlined"
        rounded="lg"
        class="mb-4"
        required
        @update:model-value="$emit('update:password', $event)"
      />
      <v-alert
        v-if="errorMsg"
        type="error"
        rounded="lg"
        class="mb-4"
        density="compact"
      >
        {{ errorMsg }}
      </v-alert>
      <v-btn
        type="submit"
        color="primary"
        :loading="isLoading"
        block
        size="large"
      >
        <v-icon class="mr-2">mdi-login</v-icon>
        Login
      </v-btn>
    </v-form>
  </v-card-text>
</template>

<script setup>
defineProps({
  username: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  errorMsg: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:username', 'update:password', 'submit'])
</script>
