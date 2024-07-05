<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Terms of Service</h1>

      <h2>1. Acceptance of Terms</h2>
      <p>By using the Ben Kaneki (hereinafter referred to as "the Bot"), you are agreeing to these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Bot.</p>

      <h2>2. Changes to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. We recommend users review these Terms periodically.</p>

      <h2>3. Bot Usage</h2>
      <p>The Bot is provided on an "as is" and "as available" basis for your use. The Bot is meant to be used as per Discord's guidelines and rules.</p>

      <h2>4. User Conduct</h2>
      <p>You agree not to interfere with or disrupt the Bot's services or servers. You also agree not to disobey any requirements or regulations of networks connected to the Bot's services.</p>

      <h2>5. Intellectual Property</h2>
      <p>All rights, title, and interest in and to the Bot (excluding content provided by users) are and will remain the exclusive property of the Bot's developers.</p>

      <h2>6. Limitation of Liability</h2>
      <p>In no event shall the Bot's developers be liable for any direct, indirect, incidental, special, consequential or exemplary damages resulting from your use or inability to use the Bot.</p>

      <h2>7. Termination</h2>
      <p>We may terminate or suspend access to our Bot immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.</p>

      <h2>8. Governing Law</h2>
      <p>These Terms shall be governed by the laws of the country where the Bot's developers are based, without regard to its conflict of law provisions.</p>

      <h2>9. Contact Information</h2>
      <p>If you have any questions about these Terms, please contact us.</p>

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
