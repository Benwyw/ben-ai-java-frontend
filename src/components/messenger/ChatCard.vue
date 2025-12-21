<template>
  <v-card rounded="xl" class="mb-6">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-chat</v-icon>
      Chat Room
    </v-card-title>
    <v-card-text>
      <!-- Messages Container -->
      <v-sheet
        class="message-container pa-4 mb-4 rounded-lg"
        color="grey-lighten-4"
        min-height="300"
        max-height="400"
      >
        <v-virtual-scroll
          v-if="messages.length > 0"
          :items="messages"
          height="300"
          ref="messageContainer"
        >
          <template #default="{ item }">
            <div
              class="message-item py-2 px-3 mb-2 rounded-lg"
              :class="item.startsWith('Me:') ? 'bg-primary text-white ml-auto' : 'bg-white'"
            >
              {{ item }}
            </div>
          </template>
        </v-virtual-scroll>
        <div
          v-else
          class="d-flex flex-column align-center justify-center text-medium-emphasis"
          style="height: 300px;"
        >
          <v-icon size="48" class="mb-2">mdi-chat-outline</v-icon>
          <p>No messages yet. Start the conversation!</p>
        </div>
      </v-sheet>

      <!-- Message Input -->
      <v-text-field
        :model-value="message"
        label="Type your message..."
        variant="outlined"
        rounded="lg"
        maxlength="100"
        type="text"
        clearable
        hide-details
        @update:model-value="$emit('update:message', $event)"
        @keyup.enter="$emit('send')"
      >
        <template #append-inner>
          <v-btn
            color="primary"
            variant="flat"
            icon="mdi-send"
            size="small"
            :disabled="!isValid"
            @click="$emit('send')"
          />
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  message: {
    type: String,
    default: ''
  },
  isValid: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:message', 'send'])

const messageContainer = ref(null)

async function scrollToBottom() {
  await nextTick()
  // Small delay to ensure v-virtual-scroll has rendered the new item
  setTimeout(() => {
    if (messageContainer.value) {
      const lastIndex = props.messages.length - 1
      if (lastIndex >= 0) {
        messageContainer.value.scrollToIndex(lastIndex)
      }
    }
  }, 50)
}

// Watch for any changes to messages array length
watch(
  () => props.messages.length,
  () => {
    scrollToBottom()
  },
  { immediate: true }
)
</script>

<style scoped>
.message-item {
  max-width: 80%;
  width: fit-content;
}
.ml-auto {
  margin-left: auto;
}
</style>
