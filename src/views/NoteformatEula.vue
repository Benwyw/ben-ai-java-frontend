<template>
  <div>Redirecting to Apple EULA...</div>
</template>

<script setup>
  import { onMounted } from 'vue'

  const appleEulaUrl = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'

  // Immediately redirect on mount
  onMounted(() => {
    window.location.replace(appleEulaUrl)
  })

  // Also redirect immediately during setup (belt and suspenders)
  if (typeof window !== 'undefined') {
    window.location.replace(appleEulaUrl)
  }
</script>
