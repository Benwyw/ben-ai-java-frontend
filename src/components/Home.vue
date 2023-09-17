<template>
  <v-container class="fill-height" :class="{ 'is-loading': isLoading }">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img height="120" src="@/assets/logo.png" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Ben Kaneki</h1>

      <v-card-text v-if="userBase">Used by <u>{{ userBase }}</u> users</v-card-text>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center"><!-- target="_blank" -->
        <v-col cols="auto">
          <v-btn
            to="/about"
            min-width="164"
            rel="noopener noreferrer"

            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            About
          </v-btn>
          <v-btn
            to="/swagger"
            min-width="164"
            rel="noopener noreferrer"

            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Swagger
          </v-btn>
          <v-btn
              to="/messenger"
              min-width="164"
              rel="noopener noreferrer"

              variant="text"
          >
            <v-icon
                icon="mdi-view-dashboard"
                size="large"
                start
            />

            Messenger
          </v-btn>
        </v-col>

        <!-- <v-col cols="auto">
          <v-btn
            color="primary"
            href="#"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Get Started
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="#"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-account-group"
              size="large"
              start
            />

            Community
          </v-btn>
        </v-col> -->
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import * as api from '@/api/misc';
import {ref} from 'vue';

const title = ref('');
const msg = ref('');
const userBase = ref('');
const isLoading = ref(false);
const isError = ref(false);

async function getTitle() {
  try {
    isLoading.value = true;
    title.value = await api.getTitle();
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function getUserBase() {
  try {
    isLoading.value = true;
    userBase.value = await api.getUserBase();
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

// getTitle();
getUserBase();
msg.value = 'Development in-progress';
</script>

<style scoped>
.is-loading {
  filter: blur(5px);
}
</style>
