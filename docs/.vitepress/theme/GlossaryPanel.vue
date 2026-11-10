<script setup>
// Description of the glossary term the reader points at (see useGlossary.mjs).
// mode "aside": card under "On this page" (wide screens); mode "sheet": panel at the bottom (phones, tablets).
import { withBase } from 'vitepress'
import { activeTerm, sheetOpen } from './useGlossary.mjs'

defineProps({
  mode: { type: String, default: 'aside' }
})
</script>

<template>
  <Transition name="ib-glossary">
    <div
      v-if="activeTerm && (mode === 'aside' || sheetOpen)"
      :class="mode === 'aside' ? 'ib-glossary-aside' : 'ib-glossary-sheet'"
      role="note"
      aria-live="polite"
    >
      <div class="head">
        <a class="label" :href="withBase(`/help/glossary#${activeTerm.slug}`)">Glossary</a>
        <button v-if="mode === 'sheet'" class="close" type="button" aria-label="Close" @click="sheetOpen = false">×</button>
      </div>
      <p class="term">
        <a v-if="activeTerm.link" :href="withBase(activeTerm.link)"><code>{{ activeTerm.term }}</code></a>
        <code v-else>{{ activeTerm.term }}</code>
      </p>
      <p class="text">{{ activeTerm.text }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.ib-glossary-aside,
.ib-glossary-sheet {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  font-size: 13px;
  line-height: 1.55;
}
.ib-glossary-aside {
  /* rendered in the aside-bottom slot, after the spacer of the aside column, so it sits at the bottom of the window */
  margin-top: auto;
  padding: 14px 16px;
}
.ib-glossary-sheet {
  position: fixed;
  right: 12px;
  bottom: 12px;
  left: 12px;
  z-index: 30;
  padding: 14px 16px;
  box-shadow: var(--vp-shadow-3);
}
@media (min-width: 1280px) {
  .ib-glossary-sheet {
    display: none;
  }
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* "Glossary" opens the whole glossary at this term */
.label {
  padding: 2px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: border-color 0.2s, color 0.2s;
}
.label:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.close {
  color: var(--vp-c-text-2);
  font-size: 20px;
  line-height: 1;
}
.term {
  margin: 6px 0 4px;
}
.term code {
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
}
.text {
  margin: 0;
  color: var(--vp-c-text-2);
}
/* the term name links to the page that describes it */
.term a {
  text-decoration: none;
}
.term a code {
  color: var(--vp-c-brand-1);
}
.term a:hover code {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ib-glossary-enter-active,
.ib-glossary-leave-active {
  transition: opacity 0.2s;
}
.ib-glossary-enter-from,
.ib-glossary-leave-to {
  opacity: 0;
}
</style>
