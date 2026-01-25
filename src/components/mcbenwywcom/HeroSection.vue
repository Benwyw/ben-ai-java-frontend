<template>
  <v-card
    class="mb-6 bg-gradient-minecraft"
    rounded="xl"
    variant="flat"
  >
    <v-card-text class="py-12 text-center">
      <v-img
        alt="Ben's Minecraft Server"
        class="mb-4 mx-auto drop-shadow"
        height="120"
        src="@/assets/mcbenwywcom/mcbenwywcom_logo-794x439.webp"
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
          Server Archived
        </v-chip>
        <!--        <v-chip color="white" variant="flat">-->
        <!--          <v-icon start color="red">mdi-archive</v-icon>-->
        <!--          Server Archived-->
        <!--        </v-chip>-->
      </div>
      <v-hover v-slot="{ isHovering, props }">
        <v-btn
          v-bind="props"
          :border="isHovering ? 'md opacity-100' : 'sm opacity-50'"
          class="text-none"
          color="white"
          :elevation="isHovering ? 8 : 2"
          href="https://www.instagram.com/mcbenwywcom/"
          prepend-icon="mdi-instagram"
          rounded="pill"
          size="large"
          target="_blank"
          variant="flat"
        >
          View on Instagram
        </v-btn>
      </v-hover>
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
