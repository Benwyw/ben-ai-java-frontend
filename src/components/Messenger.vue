<template>
  <div>
    <!-- Error Alert -->
    <ErrorAlert :error="lastError" @close="lastError = ''" />

    <!-- Alert for WebSocket status -->
    <v-alert
      v-if="alertState.show"
      class="mb-4"
      closable
      rounded="xl"
      :type="alertState.type"
      @click:close="alertState.show = false"
    >
      {{ alertState.message }}
      <template v-if="clientStatus === 'Disconnected'" #append>
        <v-btn
          size="small"
          variant="tonal"
          @click="reconnectNow"
        >
          Reconnect
        </v-btn>
      </template>
    </v-alert>

    <!-- Page Header -->
    <PageHeader
      gradient-class="bg-gradient-success"
      icon="mdi-message"
      subtitle="Real-time messaging platform"
      title="Messenger"
    >
      <template #chips>
        <div class="d-flex justify-center ga-3 mt-4">
          <v-chip
            :class="{ 'cursor-pointer': clientStatus === 'Disconnected' }"
            :color="clientStatus === 'Connected' ? 'white' : 'error'"
            :prepend-icon="clientStatus === 'Connected' ? 'mdi-check-circle' : 'mdi-close-circle'"
            variant="flat"
            @click="clientStatus === 'Disconnected' ? reconnectNow() : null"
          >
            {{ clientStatus }}
            <v-icon v-if="clientStatus === 'Disconnected'" class="ml-1" size="small">mdi-refresh</v-icon>
          </v-chip>
          <v-chip color="white" prepend-icon="mdi-account-multiple" variant="flat">
            {{ onlineUserCountDisplay }} Online
          </v-chip>
        </div>
      </template>
    </PageHeader>

    <!-- Chat Card -->
    <ChatCard
      v-model:message="message"
      :is-valid="isValid"
      :messages="messages"
      @send="sendFromClient"
    />

    <!-- Back Button -->
    <BackButton />
  </div>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
  import * as api from '@/api/messenger'
  import { buildUserWebSocketUrl, webSocketUrl } from '@/api/messenger'
  import ChatCard from '@/components/messenger/ChatCard.vue'
  import BackButton from '@/components/shared/BackButton.vue'
  import ErrorAlert from '@/components/shared/ErrorAlert.vue'
  import PageHeader from '@/components/shared/PageHeader.vue'
  import { lastError } from '@/stores/errorStore'

  // Alert state for WebSocket status messages
  const alertState = reactive({
    show: false,
    type: 'info',
    message: '',
    timeout: null,
  })

  // Clear the error whenever this page is first mounted
  onMounted(() => {
    lastError.value = ''
    initWebSocket()
  // onlineUserCountInterval = setInterval(getOnlineUserCount, 300000) // Check every 5 minutes
  })

  onUnmounted(() => {
    if (websock) {
      websock.close()
    }
    if (onlineUserCountInterval) {
      clearInterval(onlineUserCountInterval)
    }
  })

  const message = ref('')
  const messages = ref([])
  const onlineUserCount = ref('Loading...')
  const clientStatus = ref('Disconnected')
  let websock = null
  const onlineUserCountInterval = null

  const isValid = computed(() => {
    return message.value !== undefined && message.value !== null && message.value !== ''
  })

  const onlineUserCountDisplay = computed(() => {
    if (typeof onlineUserCount.value === 'number') {
      return onlineUserCount.value
    } else if (typeof onlineUserCount.value === 'string') {
      return onlineUserCount.value // e.g., "Server is offline"
    } else {
      return 'Loading...' // or default
    }
  })

  function pushMessageToContainer (msg) {
    messages.value.push(msg)
  // ChatCard component handles scrolling internally via watch
  }

  function initWebSocket () {
    // Close existing socket if not closed to avoid listeners piling up
    if (websock && websock.readyState !== WebSocket.CLOSED) {
      try {
        websock.close()
      } catch {}
      websock = null
    }
    // Get username from localStorage instead of generating a new user id
    const userId = localStorage.getItem('username')
    if (!userId) {
      console.warn('Username not found in localStorage; cannot establish WebSocket connection.')
      clientStatus.value = 'Disconnected'
      showAlert('error', 'User not logged in. Please log in to connect.')
      return
    }
    console.log(`Using username for WebSocket: ${userId}`)
    const fullUrl = buildUserWebSocketUrl(userId)
    try {
      websock = new WebSocket(fullUrl)
    } catch (error) {
      console.error('Failed to create WebSocket with url', fullUrl, error)
      clientStatus.value = 'Disconnected'
      showAlert('error', 'Failed to open WebSocket connection.')
      return
    }
    websock.addEventListener('open', websocketonopen)
    websock.addEventListener('error', websocketonerror)
    websock.addEventListener('message', websocketonmessage)
    websock.addEventListener('close', websocketclose)
  }

  function reconnectNow () {
    showAlert('info', 'Reconnecting...')
    initWebSocket()
  }

  function showAlert (type, message, timeout = 6000) {
    alertState.type = type
    alertState.message = message
    alertState.show = true
    if (alertState.timeout) {
      clearTimeout(alertState.timeout)
    }
    alertState.timeout = setTimeout(() => {
      alertState.show = false
    }, timeout)
  }

  function websocketonopen () {
    console.log('WebSocket connected')
    clientStatus.value = 'Connected'
  }

  function websocketonerror (error) {
    console.error(`WebSocket connection error: ${JSON.stringify(error, ['message', 'arguments', 'type', 'name'])}`)
    showAlert('error', 'Messenger error occurred.')
  }

  function websocketonmessage (e) {
    try {
      const message = JSON.parse(e.data)

      if (message.type === 'onlineCountUpdate') {
        onlineUserCount.value = message.count
      } else if (message.type === 'chatMessage') {
        // Handle chat messages
        pushMessageToContainer(message.content)
      }
    } catch {
      // Fallback to raw message
      pushMessageToContainer(e.data)
    }
  }

  function websocketclose (e) {
    console.log('connection closed', e)
    clientStatus.value = 'Disconnected'
    showAlert('warning', 'Messenger disconnected.')
  }

  function sendFromClient () {
    if (isValid.value && websock && websock.readyState === WebSocket.OPEN) {
      websock.send(message.value)
      pushMessageToContainer(`Me: ${message.value}`)
      message.value = ''
    } else if (!websock || websock.readyState !== WebSocket.OPEN) {
      showAlert('error', 'Cannot send: WebSocket not connected.')
    }
  }

  function handleEnterKey () {
    if (isValid.value) {
      sendFromClient()
    }
  }
</script>
