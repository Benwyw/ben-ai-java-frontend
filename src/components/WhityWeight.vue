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
import * as api from "@/api/whity";

const COLUMN_MAP = {
  recordId: 'RECORD_ID',
  recordDate: 'RECORD_DATE',
  kg: 'KG',
  remarks: 'REMARKS',
  // add more as needed…
}

export default {
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
    async loadItems(newOpts = null) {
      const {page, itemsPerPage, sortBy: sortByDefs} = newOpts || this.$refs.dataTable.options;
      console.log(`page: ${page}, itemsPerPage: ${itemsPerPage}, sortBy: ${JSON.stringify(sortByDefs)}`);
      this.loading = true

      const sortBy = sortByDefs.map(def => COLUMN_MAP[def.key] || def.key);
      const sortDesc = sortByDefs.map(def => def.order === 'desc');
      let tempReq = {
        pageNumber: page,
        limit: itemsPerPage,
        sortBy,
        sortDesc
      }
      await api.getWhityWeight(tempReq).then(data => {
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
