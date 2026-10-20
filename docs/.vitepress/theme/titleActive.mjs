// The "Fluid Flux" title in the top bar opens the main section (overview, showcase, release notes, support);
// highlight it while that section is open, like "Documentation" is highlighted for the docs.
import { onMounted, watch, nextTick } from 'vue'
import { useRoute, withBase } from 'vitepress'

const MAIN = /^\/($|index|introduction\/|compatibility\/|showcase\/|release-notes\/|support\/)/

export function useTitleActive() {
  const route = useRoute()
  const update = () => {
    const path = route.path.replace(withBase('/'), '/')
    document.querySelector('.VPNavBarTitle')?.classList.toggle('ib-active', MAIN.test(path))
  }
  onMounted(update)
  watch(
    () => route.path,
    () => nextTick(update)
  )
}
