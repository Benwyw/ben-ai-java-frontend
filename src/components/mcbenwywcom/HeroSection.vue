<template>
  <v-card
    class="mb-6 bg-gradient-minecraft"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-img
        class="mb-4 mx-auto drop-shadow"
        alt="Ben's Minecraft Server"
        src="@/assets/mcbenwywcom/mcbenwywcom_logo-794x439.png"
        height="120"
      />
      <h1 class="text-h3 font-weight-bold text-white mb-2">Ben's Minecraft Server</h1>
      <p class="text-h6 text-white-darken-1 mb-4">Minecraft Java Edition survival server</p>
      <div class="d-flex justify-center ga-3 flex-wrap mb-4">
        <v-chip color="white" prepend-icon="mdi-minecraft" variant="flat">
          Java Edition
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-tree" variant="flat">
          Survival Mode
        </v-chip>
        <v-chip color="white" prepend-icon="mdi-archive" variant="flat">
          Archived
        </v-chip>
      </div>
      <v-btn
        class="text-none"
        color="white"
        href="https://www.instagram.com/mcbenwywcom/"
        prepend-icon="mdi-instagram"
        rounded="pill"
        size="large"
        target="_blank"
        variant="flat"
      >
        View on Instagram
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
</script>

<style scoped>
.bg-gradient-minecraft {
  background: linear-gradient(135deg, #4CAF50 0%, #1B5E20 100%);
}
</style>

