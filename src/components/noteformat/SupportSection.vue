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

      <!-- PayPal Official Button -->
      <form
        action="https://www.paypal.com/ncp/payment/QA5VGCEU9VMKU"
        class="paypal-form"
        method="post"
        target="_blank"
      >
        <button class="paypal-btn" type="submit">
          Donate
        </button>
        <img
          alt="Accepted payment methods"
          class="paypal-cards"
          src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg"
        />
        <span class="paypal-powered">
          Powered by
          <img
            alt="PayPal"
            :class="['paypal-logo', { 'dark-mode': isDark }]"
            src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
          />
        </span>
      </form>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { useTheme } from 'vuetify'
  import { computed } from 'vue'

  const theme = useTheme()
  const isDark = computed(() => theme.global.current.value.dark)
</script>

<style scoped>
.paypal-form {
  display: inline-grid;
  justify-items: center;
  align-content: start;
  gap: 0.5rem;
}

.paypal-btn {
  text-align: center;
  border: none;
  border-radius: 1.5rem;
  min-width: 11.625rem;
  padding: 0 2rem;
  height: 2.625rem;
  font-weight: bold;
  background-color: #FFD140;
  color: #000000;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.paypal-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.paypal-btn:active {
  transform: scale(0.98);
}

.paypal-cards {
  height: 1.25rem;
}

.paypal-powered {
  font-size: 0.75rem;
  opacity: 0.6;
}

.paypal-logo {
  height: 0.875rem;
  vertical-align: middle;
}

.paypal-logo.dark-mode {
  filter: brightness(0) invert(1);
}
</style>
