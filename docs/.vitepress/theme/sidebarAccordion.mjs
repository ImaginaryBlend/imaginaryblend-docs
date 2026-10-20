// Keeps only the sidebar sections that contain the current page expanded; collapses the rest after navigation.
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

function collapseInactive() {
  for (const item of document.querySelectorAll('.VPSidebar .VPSidebarItem.collapsible:not(.collapsed)')) {
    if (item.classList.contains('has-active') || item.classList.contains('is-active')) continue
    item.querySelector(':scope > .item > .caret')?.click()
  }
}

export function useSidebarAccordion() {
  const route = useRoute()
  const run = () => nextTick(() => setTimeout(collapseInactive, 50))
  onMounted(run)
  watch(() => route.path, run)
}
