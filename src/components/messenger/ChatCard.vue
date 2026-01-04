<template>
  <v-card class="mb-6" rounded="xl">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-chat</v-icon>
      Chat Room
    </v-card-title>
    <v-card-text>
      <!-- Messages Container -->
      <v-sheet
        class="message-container pa-4 mb-4 rounded-lg"
        :class="$vuetify.theme.current.dark ? 'bg-grey-darken-3' : 'bg-grey-lighten-4'"
        max-height="400"
        min-height="300"
      >
        <v-virtual-scroll
          v-if="messages.length > 0"
          ref="messageContainer"
          height="300"
          :items="messages"
        >
          <template #default="{ item }">
            <div
              class="message-item py-2 px-3 mb-2 rounded-lg"
              :class="item.startsWith('Me:') ? 'bg-primary text-white ml-auto' : ($vuetify.theme.current.dark ? 'bg-grey-darken-4' : 'bg-white')"
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
          <v-icon class="mb-2" size="48">mdi-chat-outline</v-icon>
          <p>No messages yet. Start the conversation!</p>
        </div>
      </v-sheet>

      <!-- Message Input -->
      <v-text-field
        clearable
        hide-details
        label="Type your message..."
        maxlength="100"
        :model-value="message"
        rounded="lg"
        type="text"
        variant="outlined"
        @keyup.enter="$emit('send')"
        @update:model-value="$emit('update:message', $event)"
      >
        <template #append-inner>
          <v-btn
            color="primary"
            :disabled="!isValid"
            icon="mdi-send"
            size="small"
            variant="flat"
            @click="$emit('send')"
          />
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { nextTick, ref, watch } from 'vue'

  const props = defineProps({
    messages: {
      type: Array,
      default: () => [],
    },
    message: {
      type: String,
      default: '',
    },
    isValid: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(['update:message', 'send'])

  const messageContainer = ref(null)

  async function scrollToBottom () {
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
    { immediate: true },
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
