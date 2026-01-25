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

      <!-- PayPal Donate Button - Fully responsive -->
      <v-hover v-slot="{ isHovering, props }">
        <v-btn
          v-bind="props"
          :elevation="isHovering ? 8 : 2"
          class="text-none donate-btn"
          color="#0070ba"
          href="https://www.paypal.com/ncp/payment/QA5VGCEU9VMKU"
          rel="noopener"
          rounded="pill"
          size="large"
          target="_blank"
          variant="flat"
        >
          <v-icon class="mr-2" size="20">mdi-heart</v-icon>
          Donate with PayPal
        </v-btn>
      </v-hover>

      <p class="text-caption text-medium-emphasis mt-4">
        Secure payment powered by PayPal
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup>
  // No SDK needed - using direct link approach
</script>

<style scoped>
.donate-btn {
  min-width: 200px;
  max-width: 100%;
}
</style>
