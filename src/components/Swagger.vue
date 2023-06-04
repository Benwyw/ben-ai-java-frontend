<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Swagger</h1>
      <p>Utility page for Swagger text to Excel file.</p>
      <br>

      <v-textarea
        clearable
        clear-icon="mdi-close"
        v-model="jsonString"
        label="Enter JSON text"
        hint="Swagger API Json"
        rows="5"
        counter
      ></v-textarea> <!-- :rules="[v => v.length <= 6000 || 'Text cannot exceed 6000 characters']" -->

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center"><!-- target="_blank" -->
        <v-col cols="auto">
          <v-btn
            @click="loadSampleJson()"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            Load sample JSON
          </v-btn>
          <v-btn
            @click="generateExcelFromSwaggerJson(jsonString)"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            Download Excel
          </v-btn>
        </v-col>
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
</script>

<script>
import * as api from "@/api/swagger";
import {ref} from "vue";
import sampleSwaggerJson from "@/assets/swagger.json";

const isLoading = ref(false);
const isError = ref(false);

export default {
  data() {
    return {
      jsonString: ""
    }
  },
  methods: {
    loadSampleJson() {
      this.jsonString = JSON.stringify(sampleSwaggerJson)
    },
    // Original convertor
    async jsonStringToExcel(jsonString) {
      try {
        isLoading.value = true;
        const response = await api.jsonStringToExcel(jsonString);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.log(error);
        isError.value = true;
      } finally {
        isLoading.value = false;
      }
    },

    // More efficient
    async generateExcelFromSwaggerJson(jsonString) {
      try {
        isLoading.value = true;

        const response = await api.generateExcelFromSwaggerJson(jsonString);
        const headers = response.headers;

        // Create a new Response object from the response body
        const responseObj = new Response(response.data, {
          headers: { 'content-type': headers['content-type'] }
        });

        // Create a new Blob object from the response data
        const blob = await responseObj.blob();

        // Create a download link for the Blob and trigger a download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (error) {
        console.error(error);
        isError.value = true;
      } finally {
        isLoading.value = false;
      }
    }
    // async jsonStringToExcel(jsonString) {
    //   try {
    //     isLoading.value = true;
    //     const response = await api.jsonStringToExcel(jsonString);
    //     const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const link = document.createElement('a');
    //       link.href = reader.result;
    //       link.setAttribute('download', 'data.xlsx');
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     };
    //     reader.readAsDataURL(blob);
    //   } catch (error) {
    //     console.log(error);
    //     isError.value = true;
    //   } finally {
    //     isLoading.value = false;
    //   }
    // }
  }
}
</script>
