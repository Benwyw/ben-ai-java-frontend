<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Whity Weight</h1>
      <p>小白體重記錄</p>
      <br>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :sort-by="sortBy"
        :page="page"
        class="elevation-1"
        item-key="recordId"
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
import * as api from "@/api/whity";

const COLUMN_MAP = {
  recordId: 'RECORD_ID',
  recordDate: 'RECORD_DATE',
  kg: 'KG',
  remarks: 'REMARKS',
  // add more as needed…
}

const page = ref(1);
const itemsPerPage = ref(10);
const sortBy = ref([{ key: 'recordDate', order: 'desc' }]);
const headers = ref([
  {
    title: 'Date',
    align: 'start',
    sortable: true,
    key: 'recordDate',
  },
  { title: 'KG',
    align: 'end',
    sortable: true,
    key: 'kg'
  }
]);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const defaultServerItems = [
  {
    recordDate: '2024-07-01',
    kg: 3.4
  },
  {
    recordDate: '2024-07-06',
    kg: 3.5
  }
];

async function loadItems ({ page: newPage, itemsPerPage: newItemsPerPage, sortBy: sortByDefs }) {
  loading.value = true
  const sortByMapped = sortByDefs.map(def => COLUMN_MAP[def.key] || def.key);
  const sortDesc = sortByDefs.map(def => def.order === 'desc');
  let tempReq = {
    pageNumber: newPage,
    limit: newItemsPerPage,
    sortBy: sortByMapped,
    sortDesc
  }
  try {
    const data = await api.getWhityWeight(tempReq);
    serverItems.value = data.records;
    totalItems.value = data.total;
  } catch (error) {
    console.error("Using default features due to API failure", error);
    serverItems.value = defaultServerItems;
    totalItems.value = defaultServerItems.length;
  } finally {
    loading.value = false
  }
}
</script>
