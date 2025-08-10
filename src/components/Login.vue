<template>
  <v-container class="fill-height" :key="isLoggedIn">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img height="120" src="@/assets/logo.png" />

      <h2 class="text-h4 font-weight-bold mb-4">
        {{ isLoggedIn ? 'Welcome' : 'Login' }}
      </h2>

      <!-- Login card -->
      <v-card v-if="!isLoggedIn" class="mx-auto" max-width="400">
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
          <div v-if="loginErrorMsg" class="text-error mt-2">
            {{ loginErrorMsg }}
          </div>
        </v-card-text>
      </v-card>

      <!-- Logged-in actions -->
      <v-card v-else class="mx-auto" max-width="400">
        <v-card-text>
          <div class="mb-4">
            You are logged in as <strong>{{ displayName }}</strong>.
          </div>
          <v-btn
            color="error"
            variant="elevated"
            :loading="isLogoutLoading"
            block
            @click="handleLogout"
          >
            Logout
          </v-btn>
        </v-card-text>
      </v-card>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn to="/" min-width="164" rel="noopener noreferrer" variant="text">
            Back to Home
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { login } from '@/api/login';
import { logout } from '@/api/logout'; // see helper below

const loginUsername = ref('');
const loginPassword = ref('');
const isLoginLoading = ref(false);
const isLogoutLoading = ref(false);
const loginErrorMsg = ref('');

const isLoggedIn = ref(false);
const displayName = ref('');

function syncAuthState() {
  isLoggedIn.value = !!localStorage.getItem('accessToken');
  displayName.value = localStorage.getItem('username') || 'user';
}

onMounted(() => {
  syncAuthState();
  // cross-tab sync (fires when other tabs change localStorage)
  window.addEventListener('storage', onStorage);
});

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStorage);
});

function onStorage(e) {
  if (e.key === 'accessToken' || e.key === 'username' || e.key === null) {
    // key === null can happen on clear()
    syncAuthState();
  }
}

async function handleLogin() {
  loginErrorMsg.value = '';
  isLoginLoading.value = true;
  try {
    const res = await login(loginUsername.value, loginPassword.value);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('username', loginUsername.value);
    syncAuthState(); // make UI flip to Logout view
    // optional: navigate elsewhere after login
    // await router.push('/dashboard');
  } catch (err) {
    loginErrorMsg.value = 'Login failed. Please check your credentials.';
  } finally {
    isLoginLoading.value = false;
  }
}

async function handleLogout() {
  isLogoutLoading.value = true;
  try {
    await logout();       // server revoke + local cleanup
    syncAuthState();      // flip UI to Login view
    // if your helper doesn't navigate, do it here:
    // await router.push('/login');
  } finally {
    isLogoutLoading.value = false;
  }
}
</script>
