<template>
  <v-card-text class="pa-6">
    <v-form @submit.prevent="$emit('submit')">
      <v-text-field
        class="mb-4"
        :label="t('auth.username')"
        :model-value="username"
        prepend-inner-icon="mdi-account"
        required
        rounded="lg"
        variant="outlined"
        @update:model-value="$emit('update:username', $event)"
      />
      <v-text-field
        class="mb-4"
        :label="t('auth.password')"
        :model-value="password"
        prepend-inner-icon="mdi-lock"
        required
        rounded="lg"
        type="password"
        variant="outlined"
        @update:model-value="$emit('update:password', $event)"
      />
      <v-alert
        v-if="errorMsg"
        class="mb-4"
        density="compact"
        rounded="lg"
        type="error"
      >
        {{ errorMsg }}
      </v-alert>
      <v-btn
        block
        color="primary"
        :loading="isLoading"
        size="large"
        type="submit"
      >
        <v-icon class="mr-2">mdi-login</v-icon>
        {{ t('auth.login') }}
      </v-btn>
    </v-form>
  </v-card-text>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  defineProps({
    username: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    errorMsg: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['update:username', 'update:password', 'submit'])
</script>
