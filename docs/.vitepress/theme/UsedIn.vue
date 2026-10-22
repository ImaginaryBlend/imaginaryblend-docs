<script setup>
// "Made with Fluid Flux" strip on the Fluid Flux page: project titles scroll in an endless loop, pausing on hover.
// The label is a button that opens the full list on the Showcase page.
import { withBase } from 'vitepress'

// same list as Games on the Showcase page
const projects = [
  { title: 'Senua’s Saga: Hellblade II', link: 'https://store.steampowered.com/app/2461850/Senuas_Saga_Hellblade_II/' },
  { title: 'Brushify - Beach Pack', link: 'https://youtu.be/JsQo13cPIkg' },
  { title: 'Tides of Tomorrow', link: 'https://www.youtube.com/watch?v=wy7TP81eBc8' },
  { title: 'Restore your island', link: 'https://store.steampowered.com/app/2698420/Restore_Your_Island/' },
  { title: 'DrainSim', link: 'https://store.steampowered.com/app/2963800/DrainSim/' },
  { title: 'Kayak VR: Mirage', link: 'https://www.youtube.com/watch?v=FxlRZYqLZWE' },
  { title: 'King Krab', link: 'https://store.steampowered.com/app/2523690/King_Crab/' },
  { title: 'SOUNDGRASS', link: 'https://youtu.be/X1RRcRy8PU4' }
]
</script>

<template>
  <div class="used-in">
    <a class="label" :href="withBase('/product/showcase#games')">Made with Fluid Flux</a>
    <div class="viewport">
      <!-- the list is rendered twice so the loop has no gap; the copy is hidden from screen readers -->
      <div class="track">
        <div v-for="copy in 2" :key="copy" class="group" :aria-hidden="copy === 2 ? 'true' : undefined">
          <a
            v-for="p in projects"
            :key="p.title"
            :href="p.link"
            target="_blank"
            rel="noreferrer"
            :tabindex="copy === 2 ? -1 : undefined"
          >{{ p.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.used-in {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 0 40px;
  padding: 14px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 15px;
}
.label {
  flex: none;
  padding: 5px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s;
}
.label:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.viewport {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  /* titles fade in and out at the edges */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.track {
  display: flex;
  width: max-content;
  animation: scroll 40s linear infinite;
}
.used-in:hover .track,
.track:focus-within {
  animation-play-state: paused;
}
.group {
  display: flex;
  flex: none;
}
.group a {
  padding-right: 36px;
  color: var(--vp-c-text-1);
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  transition: color 0.2s;
}
.group a:hover {
  color: var(--vp-c-brand-1);
}
@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
/* without animation the titles can be scrolled by hand */
@media (prefers-reduced-motion: reduce) {
  .viewport {
    overflow-x: auto;
  }
  .track {
    animation: none;
  }
  .group[aria-hidden] {
    display: none;
  }
}
</style>
