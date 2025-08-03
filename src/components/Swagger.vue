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
        <v-col cols="6">
          <v-row class="d-flex align-center justify-center">
          <v-col cols="6">
            <v-btn
              @click="loadSampleJson(3)"
              min-width="164"
              rel="noopener noreferrer"
              variant="text"
            >
              Load sample (3 fields)
            </v-btn>
            <v-btn
              @click="loadSampleJson(4)"
              min-width="164"
              rel="noopener noreferrer"
              variant="text"
            >
              Load sample (4 fields)
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              @click="generateExcelFromSwaggerJson(jsonString)"
              min-width="164"
              rel="noopener noreferrer"
              variant="text"
            >
              Download Excel
            </v-btn>
            <v-btn
              @click="generateExcelZipFromSwaggerJson(jsonString)"
              min-width="164"
              rel="noopener noreferrer"
              variant="text"
            >
              Download Excel (Multiple)
            </v-btn>
          </v-col>
          </v-row>
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
import * as api from "@/api/swagger";
import sampleSwaggerJson3Fields from "@/assets/swagger.json";
import sampleSwaggerJson4Fields from "@/assets/swagger4.json";

const jsonString = ref("");
const isLoading = ref(false);
const isError = ref(false);

function loadSampleJson(numberOfFields) {
  if (numberOfFields === 3) {
    jsonString.value = JSON.stringify(sampleSwaggerJson3Fields);
  } else if (numberOfFields === 4) {
    jsonString.value = JSON.stringify(sampleSwaggerJson4Fields);
  }
}

async function generateExcelFromSwaggerJson(json) {
  try {
    isLoading.value = true;
    const response = await api.generateExcelFromSwaggerJson(json);
    const headers = response.headers;
    const responseObj = new Response(response.data, {
      headers: { 'content-type': headers['content-type'] }
    });
    const blob = await responseObj.blob();
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

async function generateExcelZipFromSwaggerJson(json) {
  try {
    isLoading.value = true;
    const response = await api.generateExcelZipFromSwaggerJson(json);
    const headers = response.headers;
    const responseObj = new Response(response.data, {
      headers: { 'content-type': headers['content-type'] }
    });
    const blob = await responseObj.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.zip');
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
</script>
