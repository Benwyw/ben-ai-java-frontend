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

<script>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import * as api from "@/api/whity";

export default {
  components: {
    VDataTableServer
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      sortBy: [{ key: 'recordDate', order: 'desc' }],
      headers: [
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
      console.log(`page: ${page}, itemsPerPage: ${itemsPerPage}, sortBy: ${sortBy}`)
      this.loading = true
      await api.getWhityWeight(page, itemsPerPage).then(data => {
        this.serverItems = data.records;
        this.totalItems = data.total;
      }).catch(error => {
        console.error("Using default features due to API failure")
        this.serverItems = this.defaultServerItems
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
