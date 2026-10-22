<script setup>
// Large image on the Fluid Flux page that cross-fades between the best screenshots.
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const slides = [
  '/images/gallery/hero-beach.jpg',
  '/images/gallery/glass-tunnel.jpg',
  '/images/gallery/sunset-beach.jpg',
  '/images/gallery/coastline-waves.jpg',
  '/images/gallery/island-coastline.jpg'
]
const INTERVAL = 5000

const current = ref(0)
let timer = null

function start() {
  stop()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!document.hidden) current.value = (current.value + 1) % slides.length
  }, INTERVAL)
}
function stop() {
  clearInterval(timer)
  timer = null
}

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <div class="hero-slideshow" @mouseenter="stop" @mouseleave="start">
    <img
      v-for="(src, i) in slides"
      :key="src"
      :src="withBase(src)"
      :class="{ active: i === current }"
      :loading="i === 0 ? 'eager' : 'lazy'"
      class="no-zoom"
      alt="Fluid Flux"
    />
    <div class="dots">
      <button
        v-for="(src, i) in slides"
        :key="src"
        :class="{ active: i === current }"
        :aria-label="`Show image ${i + 1}`"
        @click="current = i"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.hero-slideshow {
  position: relative;
  margin: 24px 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.hero-slideshow img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  outline: none !important;
  cursor: default;
  opacity: 0;
  transition: opacity 1.2s ease;
}
.hero-slideshow img.active {
  opacity: 1;
}
.dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 6px;
}
.dots button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: background 0.3s;
}
.dots button.active {
  background: #fff;
}
</style>
