<template>
  <div class="home-landing">
    <v-row align="center" class="ma-0" justify="center">
      <v-col cols="12">
        <!-- Title Section -->
        <div class="text-center mb-8">
          <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">
            {{ t('home.welcome') }}
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            {{ t('home.chooseProduct') }}
          </p>
        </div>
      </v-col>

      <!-- Product Navigation Cards -->
      <v-col class="d-flex justify-center px-4" cols="12" md="6">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="product-card pa-4 pa-sm-8 text-center transition-swing"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 16 : 4"
            max-width="400"
            rounded="xl"
            tag="article"
            width="100%"
            @click="navigateTo('/noteformat')"
          >
            <v-img
              alt="NoteFormat iOS App - Expense Tracker and Note Taking"
              class="mx-auto mb-4"
              height="128"
              :src="noteformatIcon"
              width="128"
            />
            <v-card-title class="text-h4 font-weight-bold justify-center" tag="h2">
              {{ t('noteformat.title') }}
            </v-card-title>
            <v-card-subtitle class="text-body-1 mt-2">
              {{ t('noteformat.subtitle') }}
            </v-card-subtitle>
            <v-card-text class="text-body-2 text-medium-emphasis mt-4">
              {{ t('noteformat.cardDescription') }}
            </v-card-text>
            <v-chip class="mt-2" color="primary" variant="tonal">
              <v-icon start>mdi-apple</v-icon>
              {{ t('noteformat.appStore') }}
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>

      <v-col class="d-flex justify-center px-4" cols="12" md="6">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="product-card pa-4 pa-sm-8 text-center transition-swing"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 16 : 4"
            max-width="400"
            rounded="xl"
            tag="article"
            width="100%"
            @click="navigateTo('/benkaneki')"
          >
            <v-img
              alt="Ben Kaneki Discord Bot"
              class="mx-auto mb-4"
              height="128"
              :src="benkanekiIcon"
              width="128"
            />
            <v-card-title class="text-h4 font-weight-bold justify-center">
              {{ t('benkaneki.title') }}
            </v-card-title>
            <v-card-subtitle class="text-body-1 mt-2">
              {{ t('benkaneki.subtitle') }}
            </v-card-subtitle>
            <v-card-text class="text-body-2 text-medium-emphasis mt-4">
              {{ t('benkaneki.description') }}
            </v-card-text>
            <v-chip class="mt-2" color="info" variant="tonal">
              <img alt="Discord" class="discord-icon mr-2" :src="discordIcon">
              Discord
            </v-chip>
          </v-card>
        </v-hover>
      </v-col>

      <!-- Deprecated Products Section -->
      <v-col class="mt-8" cols="12">
        <v-divider class="mb-4" />
        <p class="text-body-2 text-medium-emphasis text-center mb-4">
          {{ t('common.legacyProducts') }}
        </p>
      </v-col>

      <v-col class="d-flex justify-center px-4" cols="12" md="4" sm="6">
        <v-card
          class="deprecated-card pa-4 text-center"
          max-width="280"
          rounded="lg"
          variant="outlined"
          width="100%"
          @click="navigateTo('/mcbenwywcom')"
        >
          <!--          <v-icon size="48" color="grey" class="mb-2">mdi-instagram</v-icon>-->
          <v-img
            alt="mcbenwywcom"
            class="mx-auto mb-2"
            height="48"
            :src="mcbenwywIcon"
            width="48"
          />
          <v-card-title class="text-subtitle-1 font-weight-medium justify-center text-grey">
            {{ t('minecraft.title') }}
          </v-card-title>
          <v-card-subtitle class="text-caption text-grey-darken-1">
            {{ t('common.deprecated') }}
          </v-card-subtitle>
          <v-chip class="mt-2" color="grey" size="small" variant="outlined">
            <v-icon size="small" start>mdi-instagram</v-icon>
            {{ t('minecraft.viewOnInstagram') }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import benkanekiIcon from '@/assets/BenKaneki-120.png'
  import discordIcon from '@/assets/discord.svg'
  import mcbenwywIcon from '@/assets/mcbenwywcom/mcbenwywcom_fullsize-1000.webp'
  import noteformatIcon from '@/assets/NoteFormat-120-transparent.png'

  const { t } = useI18n()
  const router = useRouter()

  function navigateTo (path) {
    router.push(path)
  }

  function openExternalLink (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
</script>

<style scoped>
.home-landing {
  width: 100%;
  overflow-x: hidden;
}

.product-card {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  max-width: 100%;
  box-sizing: border-box;
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
