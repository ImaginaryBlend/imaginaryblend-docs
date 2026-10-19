<script setup>
import { withBase } from 'vitepress'
defineProps({ src: { type: String, required: true } })
</script>

<template>
  <video class="media-video" controls playsinline preload="metadata" :src="withBase(src)"></video>
</template>
