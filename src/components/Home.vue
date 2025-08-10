<template>
  <v-container class="fill-height" :class="{ 'is-loading': isLoading }">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img height="120" src="@/assets/logo.png" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Ben Kaneki</h1>

      <v-card-text v-if="userBase">Used by <u>{{ userBase }}</u> users</v-card-text>
      <v-card-text v-if="latestWhityWeight">Latest weight <u>{{ latestWhityWeight }}</u> KG</v-card-text>

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
      <v-row class="d-flex align-center justify-center">
          <v-col cols="auto">
            <v-btn
                to="/whityweight"
                min-width="164"
                rel="noopener noreferrer"

                variant="text"
            >
              <v-icon
                  icon="mdi-view-dashboard"
                  size="large"
                  start
              />

              Whity Weight
            </v-btn>
            <v-btn
              to="/report"
              min-width="164"
              rel="noopener noreferrer"

              variant="text"
            >
              <v-icon
                icon="mdi-view-dashboard"
                size="large"
                start
              />

              Report
            </v-btn>
            <v-btn
              to="/login"
              min-width="164"
              rel="noopener noreferrer"

              variant="text"
            >
              <v-icon
                icon="mdi-view-dashboard"
                size="large"
                start
              />

              Login
            </v-btn>
          </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import * as api from '@/api/misc';
import * as apiWhity from '@/api/whity'
import {ref, onMounted} from 'vue';

const title = ref('');
const msg = ref('');
const userBase = ref('');
const latestWhityWeight = ref('');
const isLoading = ref(false);
const isError = ref(false);

async function getTitle() {
  try {
    isLoading.value = true;
    const response = await api.getTitle();
    title.value = response;
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function getMessage() {
  try {
    isLoading.value = true;
    const response = await api.getMessage();
    msg.value = response;
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
    const response = await api.getUserBase();
    userBase.value = response;
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function getLatestWhityWeight() {
  try {
    isLoading.value = true;
    const response = await apiWhity.getLatestWhityWeight();
    latestWhityWeight.value = response;
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getUserBase();
  getLatestWhityWeight();
});
</script>

<style scoped>
.is-loading {
  filter: blur(5px);
}
</style>
