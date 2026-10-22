<script setup>
// Footer under the content of the Overview page. VitePress hides its own footer on pages with a sidebar,
// so this one shows the same texts (themeConfig.footer in config.mjs) below the page content.
import { useData } from 'vitepress'

const { theme, page } = useData()
</script>

<template>
  <footer v-if="theme.footer && page.relativePath === 'index.md'" class="site-footer">
    <p class="copyright" v-html="theme.footer.copyright"></p>
    <p class="message" v-html="theme.footer.message"></p>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 24px;
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 13px;
  line-height: 1.6;
}
.site-footer p {
  margin: 0;
}
.site-footer :deep(a) {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.site-footer :deep(a:hover) {
  color: var(--vp-c-brand-1);
}
</style>
