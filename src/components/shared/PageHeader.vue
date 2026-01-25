<template>
  <v-card
    :aria-label="title"
    :class="`mb-6 ${gradientClass}`"
    role="banner"
    rounded="xl"
    tag="header"
    variant="flat"
  >
    <v-card-text class="py-8 text-center">
      <v-avatar v-if="showAvatar" class="mb-4 elevation-4" size="100">
        <v-img :alt="`${title} logo`" :src="avatarSrc" />
      </v-avatar>
      <v-icon
        v-else
        aria-hidden="true"
        class="mb-4"
        :color="iconColor"
        size="64"
      >{{ icon }}</v-icon>
      <h1 class="text-h4 font-weight-bold text-white mb-2">{{ title }}</h1>
      <p class="text-body-1 text-white-darken-1">{{ subtitle }}</p>
      <slot name="chips" />
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'mdi-information',
    },
    iconColor: {
      type: String,
      default: 'white',
    },
    gradientClass: {
      type: String,
      default: 'bg-gradient-primary',
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    avatarSrc: {
      type: String,
      default: '',
    },
  })
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #1867C0 0%, #5CBBF6 100%);
}
.bg-gradient-info {
  background: linear-gradient(135deg, #2196F3 0%, #64B5F6 100%);
}
.bg-gradient-success {
  background: linear-gradient(135deg, #4CAF50 0%, #81C784 100%);
}
.bg-gradient-warning {
  background: linear-gradient(135deg, #FB8C00 0%, #FFB74D 100%);
}
.bg-gradient-error {
  background: linear-gradient(135deg, #E53935 0%, #EF5350 100%);
}
.bg-gradient-purple {
  background: linear-gradient(135deg, #7B1FA2 0%, #BA68C8 100%);
}
.bg-gradient-teal {
  background: linear-gradient(135deg, #009688 0%, #4DB6AC 100%);
}
.bg-gradient-indigo {
  background: linear-gradient(135deg, #3949AB 0%, #7986CB 100%);
}
.bg-gradient-cyan {
  background: linear-gradient(135deg, #00838F 0%, #4DD0E1 100%);
}
</style>
