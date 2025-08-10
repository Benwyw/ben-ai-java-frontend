<template>
  <v-alert
    v-if="lastError"
    type="error"
    closable
    @click:close="lastError = ''"
  >
    {{ lastError }}
  </v-alert>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Report</h1>
      <p>Utility page for Report generation.</p>
      <br>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="6">
          <v-row class="d-flex align-center justify-center">
            <v-col cols="6">
              <!-- Input fields for Generate Report 1 -->
              <v-text-field
                v-model="report1Params.dueDays"
                label="Days"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="report1Params.rmName"
                label="RM Name"
              ></v-text-field>
              <v-text-field
                v-model="report1Params.customerNum"
                label="User Number"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="report1Params.sccStatus"
                label="DEV"
              ></v-text-field>
              <v-text-field
                v-model="report1Params.groupNum"
                label="Group Unit Number"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="report1Params.customerName"
                label="User Name"
              ></v-text-field>
              <v-btn
                @click="generateTestReport1(
                  report1Params.dueDays,
                  report1Params.rmName,
                  report1Params.customerNum,
                  report1Params.sccStatus,
                  report1Params.groupNum,
                  report1Params.customerName
                )"
                min-width="164"
                rel="noopener noreferrer"
                variant="text"
              >
                Generate Report 1
              </v-btn>
            </v-col>
            <v-col cols="6">
              <!-- Input field for Generate Report 2 -->
              <v-text-field
                v-model="report2Params.userName"
                label="User Name"
              ></v-text-field>
              <v-btn
                @click="generateTestReport2(report2Params.userName)"
                min-width="164"
                rel="noopener noreferrer"
                variant="text"
              >
                Generate Report 2
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
import {ref, reactive, onMounted} from 'vue';
import * as api from "@/api/report";
import { lastError } from '@/stores/errorStore';

// Clear the error whenever this page is first mounted
onMounted(() => {
  lastError.value = '';
});

const isLoading = ref(false);
const isError = ref(false);

const report1Params = reactive({
  dueDays: null,
  rmName: "",
  customerNum: null,
  sccStatus: "",
  groupNum: null,
  customerName: "",
});

const report2Params = reactive({
  userName: "",
});

async function generateTestReport1(dueDays, rmName, customerNum, sccStatus, groupNum, customerName) {
  try {
    isLoading.value = true;
    const response = await api.generateTestReport1(dueDays, rmName, customerNum, sccStatus, groupNum, customerName);
    const headers = response.headers;
    const responseObj = new Response(response.data, {
      headers: { 'Content-Type': headers['content-type'] }
    });
    const blob = await responseObj.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report1.pdf');
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

async function generateTestReport2(userName) {
  try {
    isLoading.value = true;
    const response = await api.generateTestReport2(userName);
    const headers = response.headers;
    const responseObj = new Response(response.data, {
      headers: { 'content-type': headers['content-type'] }
    });
    const blob = await responseObj.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report2.pdf');
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
