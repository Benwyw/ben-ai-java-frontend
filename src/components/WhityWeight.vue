<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Whity Weight</h1>
      <p>小白體重記錄</p>
      <br>

      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :sort-by="sortBy"
        class="elevation-1"
        item-value="recordId"
        @update:options="loadItems"
      ></v-data-table>

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
  //
  import { VDataTable } from 'vuetify/labs/VDataTable'
</script>

<script>
import * as api from "@/api/whity";

export default {
  data() {
    return {
      itemsPerPage: 10,
      sortBy: [{ key: 'recordDate', order: 'desc' }],
      headers: [
        {
          title: 'Date',
          align: 'start',
          sortable: true,
          key: 'recordDate',
        },
        { title: 'KG', align: 'end', sortable: true, key: 'kg' }
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,

      defaultServerItems: [
        {
          recordDate: '2024-07-01',
          kg: 3.4
        },
        {
          recordDate: '2024-07-06',
          kg: 3.5
        }
      ],
    }
  },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy }) {
      console.log(`page: ${page}, itemsPerPage: ${itemsPerPage}`)
      await api.getWhityWeight(page, itemsPerPage).then(data => {
        this.serverItems = data.records;
        this.totalItems = data.total;
        this.loading = false
      }).catch(error => {
        console.error("Using default features due to API failure")
        this.serverItems = this.defaultServerItems
      })
    }
  }
}
</script>
