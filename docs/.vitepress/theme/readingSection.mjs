// Highlights the sidebar entry of the section (h2) currently being read.
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const CLASS = 'ib-reading'
// VitePress scrolls a clicked heading to ~134px from the top (nav + margin), so the threshold must be below that.
const OFFSET = 150

// Section picked by clicking a link; wins over scroll position until the user scrolls by hand.
let clickedId = null

function sectionOf(el) {
  // h3/h4 belong to the closest preceding h2
  if (el.tagName === 'H2') return el
  const all = [...document.querySelectorAll('.vp-doc h2[id], .vp-doc h3[id], .vp-doc h4[id]')]
  for (let i = all.indexOf(el); i >= 0; i--) if (all[i].tagName === 'H2') return all[i]
  return null
}

function update() {
  const headings = [...document.querySelectorAll('.vp-doc h2[id]')]
  let current = null

  const clicked = clickedId && document.getElementById(clickedId)
  if (clicked && document.querySelector('.vp-doc')?.contains(clicked)) {
    current = sectionOf(clicked)
  } else {
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= OFFSET) current = h
      else break
    }
    if (atBottom && headings.length) current = headings[headings.length - 1]
  }

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
  const schedule = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }
  const onClick = (e) => {
    const a = e.target.closest?.('a[href*="#"]')
    if (!a) return
    const url = new URL(a.href, window.location.href)
    if (url.pathname.replace(/\.html$/, '') !== window.location.pathname.replace(/\.html$/, '')) return
    clickedId = decodeURIComponent(url.hash.slice(1)) || null
    setTimeout(schedule, 50)
  }
  const onManualScroll = () => {
    if (clickedId) {
      clickedId = null
      schedule()
    }
  }
  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    document.addEventListener('click', onClick, true)
    for (const ev of ['wheel', 'touchmove', 'keydown']) window.addEventListener(ev, onManualScroll, { passive: true })
    if (window.location.hash) clickedId = decodeURIComponent(window.location.hash.slice(1))
    update()
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', schedule)
    document.removeEventListener('click', onClick, true)
    for (const ev of ['wheel', 'touchmove', 'keydown']) window.removeEventListener(ev, onManualScroll)
  })
  watch(
    () => route.path,
    () => {
      clickedId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : null
      nextTick(() => setTimeout(update, 100))
    }
  )
}
