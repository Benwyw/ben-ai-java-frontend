<template>
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

<script>

import * as api from "@/api/messenger";
import {webSocketUrl} from "@/api/messenger";

export default {
  data() {
    return {
      message: "",
      messages: [],
      onlineUserCount: 0,
      clientStatus: 'Disconnected'
    };
  },
  mounted() {
    this.initWebSocket();
  },
  destroyed() {
    this.websocketclose()
  },
  created() {
    setInterval(this.getOnlineUserCount, 300000); // Check every 5 minutes (5 * 60 * 1000 = 300000 milliseconds)
  },
  computed: {
    isValid() {
      return this.message !== undefined && this.message !== null && this.message !== '';
    }
  },
  methods: {
    async getOnlineUserCount() {
      api.getOnlineUserCount().then(count => {
        this.onlineUserCount = count
      }).catch(error => {
        console.error(`Location: getOnlineUserCount; Error: ${error}`)
        this.onlineUserCount = 'Server is offline'
      })
    },
    scrollToBottom() {
      const el = this.$refs.messageContainer;
      if (el) {
        el.scrollToIndex(this.messages.length)
      }
    },
    pushMessageToContainer(message) {
      this.messages.push(message);
      this.scrollToBottom();
    },
    submit() {
      console.log('tested submit button')
    },
    initWebSocket() {
      api.generateUserId().then(userId => {
        console.log(`userId: ${userId}`)
        this.websock = new WebSocket(`${webSocketUrl}${userId}`);
        this.websock.onopen = this.websocketonopen;
        // this.websock.send = this.websocketsend;
        this.websock.onerror = this.websocketonerror;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.clientStatus = 'Connected'
      }).catch(error => {
        console.error(`Location: generateUserId; Error: ${error}`)
        this.onlineUserCount = 'Server is offline'
      })
    },
    websocketonopen() {
      console.log("WebSocket connected");
      this.getOnlineUserCount();
    },
    websocketonerror(e) {
      console.log(`WebSocket connection error: ${e}`);
    },
    // websocketsend(message) {
    //   console.log(`WebSocket send message: ${message}`)
    //   this.messages.push(message)
    //   // this.websock.send(message)
    // },
    websocketonmessage(message) {
      this.pushMessageToContainer(message.data)
    },
    websocketclose(e) {
      console.log("WebSocket connection closed (" + e.code + ")");
      this.clientStatus = 'Disconnected'
      this.getOnlineUserCount()
    },

    // Validation
    handleEnterKey() {
      if (this.isValid) {
        this.sendFromClient()
      }
    },

    //Server send to client
    sendFromClient() {
      this.websock.send(this.message)
      console.log(`WebSocket sent message: ${this.message}`)
    },

    // sendFromServer() {
    //   console.log('Before')
    //   api.sendOneMessage();
    // }
  }
};
</script>

<style>
.disconnected {
  color: red;
}

.connected {
  color: green;
}
</style>