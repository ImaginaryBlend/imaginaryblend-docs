// Redirects from addresses used by the previously published version of the site (flat page list).
// Unknown paths render the 404 page first; this script then sends the visitor to the new address.
import { onMounted, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'

const PAGES = {
  '/introduction': '/',
  '/installation-process': '/getting-started/updating',
  '/release-notes-3-0': '/updates/3-0',
  '/player-character': '/core-systems/player-character',
  '/surface-actor': '/core-systems/surface-actor',
  '/ground-capture': '/core-systems/ground-capture',
  '/simulation-domain': '/core-systems/simulation-domain',
  '/coastline-domain': '/core-systems/coastline-domain',
  '/glass-system': '/core-systems/glass-system',
  '/api-examples': '/',
  '/markdown-examples': '/'
}

// Sections that moved to a different page; the remaining anchors keep their name.
const SECTIONS = {
  '/introduction#installation': '/getting-started/installation',
  '/introduction#substrate-compatibility': '/requirements/compatibility/substrate',
  '/introduction#project-structure': '/core-systems/project-structure',
  '/introduction#reporting-bugs': '/help/reporting-bugs',
  '/player-character#buoyancy-component': '/core-systems/buoyancy',
  '/surface-actor#interaction-system': '/core-systems/interactions'
}

export function useRedirects() {
  const route = useRoute()
  const router = useRouter()
  const check = () => {
    const path = window.location.pathname.replace(withBase('/'), '/').replace(/\.html$/, '').replace(/\/$/, '') || '/'
    const hash = window.location.hash
    const target = SECTIONS[path + hash] || (PAGES[path] && PAGES[path] + hash)
    if (target) router.go(withBase(target))
  }
  onMounted(check)
  watch(() => route.path, check)
}
