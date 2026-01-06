<template>
  <div>Redirecting to Apple EULA...</div>
</template>

<script setup>
  /**
   * NoteformatEula Component
   *
   * This component immediately redirects to Apple's Standard EULA.
   * The EULA content is hosted externally at Apple's official URL.
   *
   * @see https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
   */
  import { onMounted } from 'vue'

  const appleEulaUrl = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'

  // Immediately redirect on mount
  onMounted(() => {
    window.location.replace(appleEulaUrl)
  })

  // Also redirect immediately during setup (belt and suspenders approach)
  if (typeof window !== 'undefined') {
    window.location.replace(appleEulaUrl)
  }
</script>
