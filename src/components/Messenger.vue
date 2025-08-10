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
      <h1>Messenger</h1>
<!--      <div class="message-container" ref="messageContainer">-->
<!--        <div v-for="(msg, index) in messages" :key="index" class="message">{{ msg }}</div>-->
<!--      </div>-->

      <v-virtual-scroll :items="messages" height="200" ref="messageContainer" style="background-color: #f2f2f2;">
        <template v-slot:default="{ item }">
          {{ item }}
        </template>
      </v-virtual-scroll>

      <v-row class="d-flex align-center justify-left">
        <v-col>
          <v-row no-gutters class="align-center">
            <v-col>
              <v-text-field
                  v-model="message"
                  label="Message"
                  solo
                  maxlength="100"
                  type="text"
                  @keyup.enter="handleEnterKey"
                  clearable>
                <template #append>
                  <!-- secondary -->
                  <v-btn
                      color="primary"
                      type="submit"
                      value="Submit"
                      @click="sendFromClient"
                      :disabled="!isValid">
                    Send
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div>
        <p :class="{ 'disconnected': clientStatus === 'Disconnected', 'connected': clientStatus === 'Connected' }">{{ clientStatus }}</p>
      </div>
      <p>Online user: {{ onlineUserCount }}</p>

<!--      <button @click="sendFromServer">Send from server</button>-->

      <!--    <div v-for="msg in messages" :key="msg.id">{{ msg.text }}</div>-->

<!--      <div v-for="msg in messages" :key="msg">{{ msg }}</div>-->
      <!--  <button @click="sendFromClient">Send from client</button>-->

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
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import * as api from "@/api/messenger";
import { webSocketUrl } from "@/api/messenger";
import { lastError } from '@/stores/errorStore';

// Clear the error whenever this page is first mounted
onMounted(() => {
  lastError.value = '';
});

const message = ref("");
const messages = ref([]);
const onlineUserCount = ref(0);
const clientStatus = ref('Disconnected');
const messageContainer = ref(null);
let websock = null;
let onlineUserCountInterval = null;

onMounted(() => {
  initWebSocket();
  onlineUserCountInterval = setInterval(getOnlineUserCount, 300000); // Check every 5 minutes
});

onUnmounted(() => {
  if (websock) {
    websock.close();
  }
  if (onlineUserCountInterval) {
    clearInterval(onlineUserCountInterval);
  }
});

const isValid = computed(() => {
  return message.value !== undefined && message.value !== null && message.value !== '';
});

async function getOnlineUserCount() {
  try {
    const count = await api.getOnlineUserCount();
    onlineUserCount.value = count;
  } catch (error) {
    console.error(`Location: getOnlineUserCount; Error: ${error}`);
    onlineUserCount.value = 'Server is offline';
  }
}

async function scrollToBottom() {
  await nextTick();
  const el = messageContainer.value;
  if (el) {
    el.scrollToIndex(messages.value.length - 1);
  }
}

function pushMessageToContainer(msg) {
  messages.value.push(msg);
  scrollToBottom();
}

function initWebSocket() {
  api.generateUserId().then(userId => {
    console.log(`userId: ${userId}`);
    websock = new WebSocket(`${webSocketUrl}${userId}`);
    websock.onopen = websocketonopen;
    websock.onerror = websocketonerror;
    websock.onmessage = websocketonmessage;
    websock.onclose = websocketclose;
    clientStatus.value = 'Connected';
  }).catch(error => {
    console.error(`Location: generateUserId; Error: ${error}`);
    onlineUserCount.value = 'Server is offline';
  });
}

function websocketonopen() {
  console.log("WebSocket connected");
  getOnlineUserCount();
}

function websocketonerror(error) {
  console.error(`WebSocket connection error: ${JSON.stringify(error, ["message", "arguments", "type", "name"])}`);
}

function websocketonmessage(e) {
  const redata = e.data;
  pushMessageToContainer(redata);
}

function websocketclose(e) {
  console.log("connection closed", e);
  clientStatus.value = 'Disconnected';
}

function sendFromServer() {
  // This seems to be a test function, keeping it here.
  // In a real app, this would likely be triggered by a server event.
  pushMessageToContainer('A message from the server.');
}

function sendFromClient() {
  if (isValid.value) {
    websock.send(message.value);
    pushMessageToContainer(`Me: ${message.value}`);
    message.value = "";
  }
}

function handleEnterKey() {
  if (isValid.value) {
    sendFromClient();
  }
}
</script>

<style>
.disconnected {
  color: red;
}

.connected {
  color: green;
}
</style>
