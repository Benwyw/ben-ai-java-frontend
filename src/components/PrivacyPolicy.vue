<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Privacy Policy</h1>

      <h2>1. Personal Information</h2>
      <p>We do not collect any personal information unless explicitly provided by the users.</p>

      <h2>2. Non-Personal Information</h2>
      <p>We may collect non-personal information such as the server ID, user ID, and command usage to improve the functionality of the Bot.</p>

      <h2>3. Use of Information</h2>
      <p>The information we collect is used to improve the services of the Bot and to assist in troubleshooting problems.</p>

      <h2>4. Information Sharing</h2>
      <p>We do not sell, trade, or otherwise transfer your information to outside parties.</p>

      <h2>5. Data Security</h2>
      <p>We implement a variety of security measures to maintain the safety of your information.</p>

      <h2>6. Changes to this Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us.</p>

      <p><i>Last updated on: 5JUL2024</i></p>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
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
