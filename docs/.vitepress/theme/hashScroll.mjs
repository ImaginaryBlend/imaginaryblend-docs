// Links to a section on another page (/page#section) landed too high: VitePress scrolls to the heading
// before the images above it are loaded, and the images (without fixed sizes) then push it down.
// After the page is shown, this waits for those images and scrolls to the heading again –
// unless the reader has already started scrolling on their own.
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const MAX_WAIT = 2500

function waitForImages(root) {
  const pending = [...root.querySelectorAll('img')].filter((img) => !img.complete)
  if (!pending.length) return Promise.resolve()
  const loaded = pending.map((img) => new Promise((done) => {
    img.addEventListener('load', done, { once: true })
    img.addEventListener('error', done, { once: true })
  }))
  return Promise.race([Promise.all(loaded), new Promise((done) => setTimeout(done, MAX_WAIT))])
}

export function useHashScroll() {
  const route = useRoute()

  const fix = async () => {
    const id = decodeURIComponent(location.hash.slice(1))
    const content = document.querySelector('.vp-doc')
    if (!id || !content) return
    let userScrolled = false
    const stop = () => (userScrolled = true)
    const events = ['wheel', 'touchmove', 'keydown']
    events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }))
    await waitForImages(content)
    events.forEach((e) => window.removeEventListener(e, stop))
    const target = document.getElementById(id)
    if (!target || userScrolled) return
    const offset = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height')) || 64) + 24
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top, behavior: 'auto' })
  }

  onMounted(() => nextTick(fix))
  watch(
    () => route.path,
    () => nextTick(() => setTimeout(fix, 50))
  )
}
