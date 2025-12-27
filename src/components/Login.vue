<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      avatar-src="@/assets/logo.png"
      gradient-class="bg-gradient-purple"
      :show-avatar="true"
      :subtitle="isLoggedIn ? `Logged in as ${displayName}` : 'Access your account'"
      :title="isLoggedIn ? 'Welcome Back!' : 'Login'"
    />

    <!-- Login/Logout Card -->
    <v-card class="mb-6 mx-auto" max-width="450" rounded="xl">
      <LoginForm
        v-if="!isLoggedIn"
        v-model:password="loginPassword"
        v-model:username="loginUsername"
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
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { login } from '@/api/login'
  import { logout } from '@/api/logout'
  import LoggedInView from '@/components/login/LoggedInView.vue'
  import LoginForm from '@/components/login/LoginForm.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'

  const router = useRouter()

  const loginUsername = ref('')
  const loginPassword = ref('')
  const isLoginLoading = ref(false)
  const isLogoutLoading = ref(false)
  const loginErrorMsg = ref('')

  const isLoggedIn = ref(false)
  const displayName = ref('')

  function syncAuthState () {
    isLoggedIn.value = !!localStorage.getItem('accessToken')
    displayName.value = localStorage.getItem('username') || 'user'
  }

  onMounted(() => {
    syncAuthState()
    window.addEventListener('storage', onStorage)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('storage', onStorage)
  })

  function onStorage (e) {
    if (e.key === 'accessToken' || e.key === 'username' || e.key === null) {
      syncAuthState()
    }
  }

  async function handleLogin () {
    loginErrorMsg.value = ''
    isLoginLoading.value = true
    try {
      const res = await login(loginUsername.value, loginPassword.value)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      localStorage.setItem('username', loginUsername.value)
      syncAuthState()
      // Redirect to Home after successful login
      router.push('/')
    } catch {
      loginErrorMsg.value = 'Login failed. Please check your credentials.'
    } finally {
      isLoginLoading.value = false
    }
  }

  async function handleLogout () {
    isLogoutLoading.value = true
    try {
      await logout()
      syncAuthState()
    } finally {
      isLogoutLoading.value = false
    }
  }
</script>
