<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img height="120" src="@/assets/logo.png" />

      <h2 class="text-h4 font-weight-bold mb-4">Login</h2>

      <v-card class="mx-auto" max-width="400">
        <v-card-text>
          <v-text-field
            v-model="loginUsername"
            label="Username"
            prepend-icon="mdi-account"
            required
          />
          <v-text-field
            v-model="loginPassword"
            label="Password"
            type="password"
            prepend-icon="mdi-lock"
            required
          />
          <v-btn
            color="primary"
            :loading="isLoginLoading"
            block
            @click="handleLogin"
          >
            Login
          </v-btn>
        </v-card-text>
      </v-card>

      <v-row class="d-flex align-center justify-center"><!-- target="_blank" -->
        <v-col cols="auto">
          <v-btn
            to="/"
            min-width="164"
            rel="noopener noreferrer"

            variant="text"
          >
            Back to Home
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api/login';

const loginUsername = ref('');
const loginPassword = ref('');
const isLoginLoading = ref(false);
const loginErrorMsg = ref('');

async function handleLogin() {
  loginErrorMsg.value = '';
  isLoginLoading.value = true;
  try {
    const res = await login(loginUsername.value, loginPassword.value);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    // Optionally reload or fetch user data
  } catch (err) {
    loginErrorMsg.value = 'Login failed. Please check your credentials.';
  } finally {
    isLoginLoading.value = false;
  }
}
</script>
