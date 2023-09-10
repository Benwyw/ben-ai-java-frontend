<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>About</h1>
      <p>Multi-purpose private hosted bot for selected servers.</p>
      <br>

      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        class="elevation-1"
        item-value="featureId"
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
import {getFeatures} from "@/api/misc";
import * as api from "@/api/misc";

export default {
  data() {
    return {
      itemsPerPage: 10,
      headers: [
        {
          title: 'Features',
          align: 'start',
          sortable: false,
          key: 'featureName',
        },
        { title: 'Description', align: 'end', key: 'featureDescription' }
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,

      defaultServerItems: [
        {
          featureName: 'Music',
          featureDescription: 4
        },
        {
          featureName: 'News Feed',
          featureDescription: 1
        }
      ],
    }
  },
  // created() {
  //   this.getFeatures(this.page, this.itemsPerPage)
  // },
  // watch: {
  //   itemsPerPage: {
  //     handler(newVal, oldVal) {
  //       this.getFeatures(this.page, newVal)
  //     },
  //     immediate: false
  //   },
  //   page: {
  //     handler(newVal, oldVal) {
  //       this.getFeatures(newVal, this.itemsPerPage);
  //     },
  //     immediate: false
  //   }
  // },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy }) {
      console.log(`page: ${page}, itemsPerPage: ${itemsPerPage}`)
      await api.getFeatures(page, itemsPerPage).then(data => {
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
