<template>
  <div class="instagram-embed-container" :class="{ 'instagram-embed--centered': centered }">
    <div
      ref="embedContainer"
      class="instagram-embed-wrapper"
    />
    <div v-if="loading" class="instagram-embed-loading">
      <v-progress-circular indeterminate color="primary" />
      <span class="ml-2">{{ $t('common.loading') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  captioned: {
    type: Boolean,
    default: true,
  },
  centered: {
    type: Boolean,
    default: true,
  },
  maxWidth: {
    type: String,
    default: '540px',
  },
})

const embedContainer = ref(null)
const loading = ref(true)

const loadInstagramScript = () => {
  return new Promise(resolve => {
    if (window.instgrm) {
      resolve()
      return
    }

    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]')
    if (existingScript) {
      existingScript.addEventListener('load', resolve)
      return
    }

    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.onload = resolve
    document.body.appendChild(script)
  })
}

const createEmbed = () => {
  if (!embedContainer.value) return

  const blockquote = document.createElement('blockquote')
  blockquote.className = 'instagram-media'
  blockquote.setAttribute('data-instgrm-permalink', props.url)
  blockquote.setAttribute('data-instgrm-version', '14')
  if (props.captioned) {
    blockquote.setAttribute('data-instgrm-captioned', '')
  }
  blockquote.style.cssText = `
    background: #FFF;
    border: 0;
    border-radius: 12px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15);
    margin: 0 auto;
    max-width: ${props.maxWidth};
    min-width: 280px;
    padding: 0;
    width: 100%;
  `

  // Fallback link content
  const link = document.createElement('a')
  link.href = props.url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.style.cssText = 'display: block; padding: 16px; text-align: center; color: #3897f0;'
  link.textContent = 'View on Instagram'
  blockquote.appendChild(link)

  embedContainer.value.appendChild(blockquote)
}

onMounted(async () => {
  createEmbed()
  await loadInstagramScript()
  await nextTick()

  if (window.instgrm?.Embeds?.process) {
    window.instgrm.Embeds.process()
  }

  // Hide loading after a short delay to allow embed to render
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

onUnmounted(() => {
  if (embedContainer.value) {
    embedContainer.value.innerHTML = ''
  }
})
</script>

<style scoped>
.instagram-embed-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.instagram-embed--centered {
  flex-direction: column;
  align-items: center;
}

.instagram-embed-wrapper {
  width: 100%;
  max-width: v-bind(maxWidth);
  display: flex;
  justify-content: center;
}

.instagram-embed-wrapper :deep(.instagram-media),
.instagram-embed-wrapper :deep(iframe) {
  margin: 0 auto !important;
}

.instagram-embed-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0.6;
}
</style>
