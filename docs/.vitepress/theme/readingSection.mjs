// Highlights the sidebar entry of the section (h2) currently being read.
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const CLASS = 'ib-reading'
const OFFSET = 120 // nav height + a bit of margin

function update() {
  const headings = [...document.querySelectorAll('.vp-doc h2[id]')]
  const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
  let current = null
  for (const h of headings) {
    if (h.getBoundingClientRect().top <= OFFSET) current = h
    else break
  }
  if (atBottom && headings.length) current = headings[headings.length - 1]

  const page = window.location.pathname.replace(/\.html$/, '')
  let target = null
  if (current) {
    for (const a of document.querySelectorAll('.VPSidebar a.link[href*="#"]')) {
      const url = new URL(a.href)
      if (url.pathname.replace(/\.html$/, '') === page && url.hash === `#${current.id}`) {
        target = a.closest('.VPSidebarItem')
        break
      }
    }
  }
  document.querySelectorAll(`.VPSidebar .${CLASS}`).forEach((el) => {
    if (el !== target) el.classList.remove(CLASS)
  })
  target?.classList.add(CLASS)
}

export function useReadingSection() {
  const route = useRoute()
  let frame = 0
  const onScroll = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }
  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
  watch(
    () => route.path,
    () => nextTick(() => setTimeout(update, 100))
  )
}
