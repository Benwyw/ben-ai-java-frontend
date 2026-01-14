<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <!-- Title Section -->
        <div class="text-center mb-8">
          <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">
            Welcome to Benwyw
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Choose a product to explore
          </p>
        </div>
      </v-col>

      <!-- Product Navigation Cards -->
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 16 : 4"
            :class="{ 'on-hover': isHovering }"
            class="product-card pa-8 text-center transition-swing"
            rounded="xl"
            max-width="400"
            width="100%"
            @click="navigateTo('/noteformat')"
          >
            <v-img
              :src="noteformatIcon"
              alt="NoteFormat"
              class="mx-auto mb-4"
              height="128"
              width="128"
            />
            <v-card-title class="text-h4 font-weight-bold justify-center">
              NoteFormat
            </v-card-title>
            <v-card-subtitle class="text-body-1 mt-2">
              iOS App
            </v-card-subtitle>
            <v-card-text class="text-body-2 text-medium-emphasis mt-4">
              Expense tracking, budget management and flexible import & export for iOS devices.
            </v-card-text>
            <v-chip color="primary" variant="tonal" class="mt-2">
              <v-icon start>mdi-apple</v-icon>
              App Store
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 16 : 4"
            :class="{ 'on-hover': isHovering }"
            class="product-card pa-8 text-center transition-swing"
            rounded="xl"
            max-width="400"
            width="100%"
            @click="navigateTo('/benkaneki')"
          >
            <v-img
              :src="benkanekiIcon"
              alt="NoteFormat"
              class="mx-auto mb-4"
              height="128"
              width="128"
            />
            <v-card-title class="text-h4 font-weight-bold justify-center">
              Ben Kaneki
            </v-card-title>
            <v-card-subtitle class="text-body-1 mt-2">
              Discord Bot
            </v-card-subtitle>
            <v-card-text class="text-body-2 text-medium-emphasis mt-4">
              A multi-purpose Discord bot with web dashboard for utilities and automation.
            </v-card-text>
            <v-chip color="info" variant="tonal" class="mt-2">
              <img :src="discordIcon" alt="Discord" class="discord-icon mr-2" />
              Discord
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>

      <!-- Deprecated Products Section -->
      <v-col cols="12" class="mt-8">
        <v-divider class="mb-4" />
        <p class="text-body-2 text-medium-emphasis text-center mb-4">
          Legacy Products
        </p>
      </v-col>

      <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
        <v-card
          class="deprecated-card pa-4 text-center"
          rounded="lg"
          max-width="280"
          width="100%"
          variant="outlined"
          @click="navigateTo('/mcbenwywcom')"
        >
<!--          <v-icon size="48" color="grey" class="mb-2">mdi-instagram</v-icon>-->
          <v-img
            :src="mcbenwywIcon"
            alt="mcbenwywcom"
            class="mx-auto mb-2"
            height="48"
            width="48"
          />
          <v-card-title class="text-subtitle-1 font-weight-medium justify-center text-grey">
            Ben's Minecraft Server
          </v-card-title>
          <v-card-subtitle class="text-caption text-grey-darken-1">
            Deprecated
          </v-card-subtitle>
          <v-chip size="small" color="grey" variant="outlined" class="mt-2">
            <v-icon start size="small">mdi-instagram</v-icon>
            View on Instagram
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import noteformatIcon from '@/assets/NoteFormat-1024-transparent.png'
  import benkanekiIcon from '@/assets/BenKaneki-120.png'
  import discordIcon from '@/assets/discord.svg'
  import mcbenwywIcon from '@/assets/mcbenwywcom/mcbenwywcom_fullsize-1000.png'

  const router = useRouter()

  function navigateTo (path) {
    router.push(path)
  }

  function openExternalLink (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
</script>

<style scoped>
.product-card {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.product-card.on-hover {
  transform: translateY(-8px);
}

.discord-icon {
  width: 18px;
  height: 18px;
  filter: invert(37%) sepia(98%) saturate(1285%) hue-rotate(196deg) brightness(95%) contrast(87%);
}

.deprecated-card {
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}

.deprecated-card:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
