<template>
  <v-card
    class="mb-6 bg-gradient-primary"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-avatar class="mb-4 elevation-4" size="120">
        <v-img src="@/assets/BenKaneki-120.png" />
      </v-avatar>
      <h1 class="text-h3 font-weight-bold text-white mb-2">Ben Kaneki</h1>
      <p class="text-h6 text-white-darken-1 mb-4">Discord bot web application</p>
      <div class="d-flex justify-center ga-3 flex-wrap">
        <v-chip v-if="userBase" color="white" prepend-icon="mdi-account-group" variant="flat">
          {{ userBase }} Users
        </v-chip>
        <v-chip v-if="latestWhityWeight" color="white" prepend-icon="mdi-scale" variant="flat">
          {{ latestWhityWeight }} KG
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    userBase: {
      type: [String, Number],
      default: '',
    },
    latestWhityWeight: {
      type: [String, Number],
      default: '',
    },
  })
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #1867C0 0%, #5CBBF6 100%);
}
</style>
