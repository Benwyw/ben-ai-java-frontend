<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      :title="isLoggedIn ? 'Welcome Back!' : 'Login'"
      :subtitle="isLoggedIn ? `Logged in as ${displayName}` : 'Access your account'"
      :show-avatar="true"
      avatar-src="@/assets/logo.png"
      gradient-class="bg-gradient-purple"
    />

    <!-- Login/Logout Card -->
    <v-card rounded="xl" class="mb-6 mx-auto" max-width="450">
      <LoginForm
        v-if="!isLoggedIn"
        v-model:username="loginUsername"
        v-model:password="loginPassword"
        :error-msg="loginErrorMsg"
        :is-loading="isLoginLoading"
        @submit="handleLogin"
      />
      <LoggedInView
        v-else
        :display-name="displayName"
        :is-loading="isLogoutLoading"
        @logout="handleLogout"
      />
    </v-card>

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { login } from '@/api/login'
import { logout } from '@/api/logout'
import PageHeader from '@/components/shared/PageHeader.vue'
import BackButton from '@/components/shared/BackButton.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import LoggedInView from '@/components/login/LoggedInView.vue'

const loginUsername = ref('')
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
  window.addEventListener('storage', onStorage);
});

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStorage);
});

function onStorage(e) {
  if (e.key === 'accessToken' || e.key === 'username' || e.key === null) {
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
    syncAuthState();
  } catch (err) {
    loginErrorMsg.value = 'Login failed. Please check your credentials.';
  } finally {
    isLoginLoading.value = false;
  }
}

async function handleLogout() {
  isLogoutLoading.value = true;
  try {
    await logout();
    syncAuthState();
  } finally {
    isLogoutLoading.value = false;
  }
}
</script>

