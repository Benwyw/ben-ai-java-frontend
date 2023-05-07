<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>About</h1>
      <p>Multi-purpose private hosted bot for selected servers.</p>
      <br>

      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="features"
        item-value="name"
        class="elevation-1"
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
export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          title: 'Features',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Types', align: 'end', key: 'types' }
      ],
      features: [
        {
          name: 'Music',
          types: 4
        },
        {
          name: 'News Feed',
          types: 1
        }
      ]
    }
  }
}
</script>
