// Aligns the top bar with the page content: the logo starts at the left edge of the content column
// and the icons end at its right edge. The content position depends on the sidebar and the window
// width, so it is measured and passed to CSS as --ib-nav-left / --ib-nav-width (see custom.css).
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

export function useNavAlign() {
  const route = useRoute()
  const update = () => {
    const root = document.documentElement.style
    const content = document.querySelector('.VPDoc .content-container')
    if (!content || window.innerWidth < 960) {
      root.removeProperty('--ib-nav-left')
      root.removeProperty('--ib-nav-width')
      return
    }
    const box = content.getBoundingClientRect()
    root.setProperty('--ib-nav-left', `${Math.round(box.left)}px`)
    root.setProperty('--ib-nav-width', `${Math.round(box.width)}px`)
  }
  let observer
  onMounted(() => {
    update()
    window.addEventListener('resize', update)
    // the content column also changes when the outline appears or the page layout settles
    observer = new ResizeObserver(update)
    observer.observe(document.body)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', update)
    observer?.disconnect()
  })
  watch(
    () => route.path,
    () => nextTick(update)
  )
}
