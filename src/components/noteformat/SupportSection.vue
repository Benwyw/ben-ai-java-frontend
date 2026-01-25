<template>
  <v-card
    aria-label="Support NoteFormat Development"
    class="mb-6"
    rounded="xl"
    tag="section"
    variant="flat"
  >
    <v-card-text class="py-8 text-center">
      <v-icon
        class="mb-4"
        color="pink"
        size="48"
      >
        mdi-heart
      </v-icon>
      <h2 class="text-h5 font-weight-bold mb-2">Support NoteFormat</h2>
      <p class="text-body-2 text-medium-emphasis mb-6 mx-auto" style="max-width: 480px;">
        NoteFormat is developed with passion as an indie project.
        If you find the app helpful, consider supporting its continued development.
        Every contribution helps bring new features and improvements!
      </p>

      <!-- PayPal Button Container -->
      <div class="d-flex justify-center">
        <div id="paypal-container-QA5VGCEU9VMKU" class="paypal-button-wrapper" />
      </div>

      <!-- Fallback link if PayPal SDK fails to load -->
      <v-btn
        v-if="showFallback"
        class="mt-4"
        color="primary"
        href="https://www.paypal.com/ncp/payment/QA5VGCEU9VMKU"
        prepend-icon="mdi-heart"
        rel="noopener"
        rounded="pill"
        target="_blank"
        variant="flat"
      >
        Donate via PayPal
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  const showFallback = ref(false)

  /**
   * Load PayPal SDK and render hosted button
   */
  onMounted(() => {
    // Check if PayPal SDK is already loaded
    if (window.paypal?.HostedButtons) {
      renderPayPalButton()
      return
    }

    // Load PayPal SDK dynamically
    const script = document.createElement('script')
    script.src = 'https://www.paypal.com/sdk/js?client-id=BAAL3IdxWZm88mH2uRA9GBKjYpdPJ75XTkyP59ty7IgPoRBzVvIZIKLK8EnV9EiMMK7a8GKe8gXEclAxM4&components=hosted-buttons&disable-funding=venmo&currency=HKD'
    script.async = true

    script.addEventListener('load', () => {
      renderPayPalButton()
    })

    script.addEventListener('error', () => {
      console.warn('PayPal SDK failed to load, showing fallback button')
      showFallback.value = true
    })

    document.head.append(script)
  })

  /**
   * Render PayPal hosted button into container
   */
  function renderPayPalButton () {
    const container = document.querySelector('#paypal-container-QA5VGCEU9VMKU')

    if (!container) {
      console.warn('PayPal container not found')
      showFallback.value = true
      return
    }

    if (window.paypal?.HostedButtons) {
      window.paypal.HostedButtons({
        hostedButtonId: 'QA5VGCEU9VMKU',
      }).render('#paypal-container-QA5VGCEU9VMKU').catch(error => {
        console.warn('PayPal button render failed:', error)
        showFallback.value = true
      })
    } else {
      showFallback.value = true
    }
  }
</script>

<style scoped>
.paypal-button-wrapper {
  min-height: 50px;
  min-width: 200px;
}
</style>
