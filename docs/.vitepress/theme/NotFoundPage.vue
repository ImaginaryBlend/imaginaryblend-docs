<script setup>
// 404 page: search and the main sections instead of the default "PAGE NOT FOUND" text.
// Old addresses from the previous site are still redirected by redirects.mjs after this page appears.
import { withBase } from 'vitepress'

const sections = [
  { title: 'Overview', text: 'What Fluid Flux is', link: '/', icon: 'i-waves' },
  { title: 'Getting started', text: 'Installation and project setup', link: '/getting-started/installation', icon: 'i-rocket' },
  { title: 'Documentation', text: 'Actors, systems and tools', link: '/core-systems/project-structure', icon: 'i-book' },
  { title: 'Support', text: 'Contact, troubleshooting, bug reports', link: '/help/support', icon: 'i-lifebuoy' }
]

// opens the local search box from the top bar
function openSearch() {
  document.querySelector('#local-search button')?.click()
}
</script>

<template>
  <div class="not-found">
    <p class="code">404</p>
    <h1 class="title">Page not found</h1>
    <p class="text">
      This page does not exist or has moved when the documentation was reorganized.
      Search for the topic or start from one of the sections below.
    </p>
    <button class="search" type="button" @click="openSearch">Search the documentation</button>
    <div class="cards">
      <a v-for="s in sections" :key="s.link" class="card" :href="withBase(s.link)">
        <strong><span class="ib-icon" :class="s.icon"></span>{{ s.title }}</strong>
        <span class="desc">{{ s.text }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 760px;
  margin: 0 auto;
  padding: 72px 24px 96px;
  text-align: center;
}
.code {
  color: var(--vp-c-brand-1);
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
}
.title {
  margin-top: 12px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.text {
  max-width: 520px;
  margin: 16px auto 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.search {
  margin-top: 24px;
  height: 42px;
  padding: 0 22px;
  border-radius: 21px;
  background-color: var(--ib-teal-dark);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  transition: background-color 0.2s;
}
.search:hover {
  background-color: var(--ib-teal);
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 40px;
  text-align: left;
}
.card {
  display: block;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.55;
  text-decoration: none;
  transition: border-color 0.2s, background-color 0.2s;
}
.card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}
.card strong {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  color: var(--vp-c-brand-1);
  font-size: 15px;
  font-weight: 600;
}
</style>
