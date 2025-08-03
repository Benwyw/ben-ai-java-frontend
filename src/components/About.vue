<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>About</h1>
      <p>Multi-purpose private hosted bot for selected servers.</p>
      <br>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :page="page"
        class="elevation-1"
        item-key="featureId"
        @update:options="loadItems"
      ></v-data-table-server>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center"><!-- target="_blank" -->
        <v-col cols="auto">
          <v-btn
                to="/"
                min-width="164"
                rel="noopener noreferrer"

                variant="text"
          >
          Back to Home
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import * as api from "@/api/misc";

const page = ref(1);
const itemsPerPage = ref(10);
const sortBy = ref([{ key: 'featureId', order: 'asc' }]);
const headers = ref([
  {
    title: 'Features',
    align: 'start',
    sortable: true,
    key: 'featureName',
  },
  {
    title: 'Description',
    align: 'end',
    sortable: true,
    key: 'featureDescription'
  }
]);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const defaultServerItems = [
  {
    featureName: 'Music',
    featureDescription: 4
  },
  {
    featureName: 'News Feed',
    featureDescription: 1
  }
];

async function loadItems({ page: newPage, itemsPerPage: newItemsPerPage, sortBy: newSortBy }) {
  console.log(`page: ${newPage}, itemsPerPage: ${newItemsPerPage}, sortBy: ${newSortBy}`);
  loading.value = true;
  try {
    const data = await api.getFeatures(newPage, newItemsPerPage);
    serverItems.value = data.records;
    totalItems.value = data.total;
  } catch (error) {
    console.error("Using default features due to API failure", error);
    serverItems.value = defaultServerItems;
    totalItems.value = defaultServerItems.length;
  } finally {
    loading.value = false;
  }
}
</script>
