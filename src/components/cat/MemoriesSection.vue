<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2" color="pink">mdi-heart</v-icon>
      In Loving Memory ｜ 永遠懷念
    </v-card-title>
    <v-card-text>
      <!-- English -->
      <p class="text-body-1 mb-2">
        This page is dedicated to <strong>Whity</strong>, my beloved cat who was by my side for over 5 wonderful years.
        From 12 July 2019 to 29 December 2024, Whity filled my life with unconditional love, warmth, and countless precious moments.
      </p>
      <p class="text-body-1 mb-4">
        I will forever love and miss you, Whity. You were more than a pet — you were family, a loyal companion, and a source of comfort through every day.
        Your memory lives on in my heart, always.
      </p>

      <!-- Traditional Chinese -->
      <p class="text-body-2 text-medium-emphasis mb-2">
        本頁獻給<strong>Whity</strong>，我摯愛的貓咪，陪伴我渡過超過五年美好的時光。
        從2019年7月12日到2024年12月29日，Whity為我的生命帶來了無條件的愛、溫暖和無數珍貴的回憶。
      </p>
      <p class="text-body-2 text-medium-emphasis mb-4">
        我會永遠愛你、懷念你，Whity。你不只是一隻寵物——你是家人、忠誠的伙伴，也是我每一天的安慰。
        你的回憶將永遠留在我心中。
      </p>

      <v-divider class="my-4" />

      <!-- Memory highlights -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card variant="tonal" color="pink" rounded="lg" class="h-100">
            <v-card-text class="text-center">
              <v-icon size="40" color="pink" class="mb-2">mdi-paw</v-icon>
              <div class="text-h6 font-weight-bold">Playful Spirit</div>
              <div class="text-body-2 font-weight-medium">活潑的心靈</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                Always curious and full of life
              </div>
              <div class="text-caption text-medium-emphasis">
                永遠充滿好奇心和活力
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card variant="tonal" color="purple" rounded="lg" class="h-100">
            <v-card-text class="text-center">
              <v-icon size="40" color="purple" class="mb-2">mdi-sofa</v-icon>
              <div class="text-h6 font-weight-bold">Cuddle Expert</div>
              <div class="text-body-2 font-weight-medium">攬攬專家</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                The best lap warmer and companion
              </div>
              <div class="text-caption text-medium-emphasis">
                最好的暖腿仔和伙伴
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card variant="tonal" color="orange" rounded="lg" class="h-100">
            <v-card-text class="text-center">
              <v-icon size="40" color="orange" class="mb-2">mdi-star</v-icon>
              <div class="text-h6 font-weight-bold">Forever Loved</div>
              <div class="text-body-2 font-weight-medium">永遠被愛惜</div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                12 Jul 2019 — 29 Dec 2024
              </div>
              <div class="text-caption text-medium-emphasis">
                2019年7月12日 — 2024年12月29日
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
</script>
