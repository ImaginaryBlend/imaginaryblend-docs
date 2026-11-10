// Glossary hints: class names written as inline code (e.g. `BP_FluxSurface`, `Surface->CoastlineState`)
// that have an entry in the glossary get a dotted underline. Pointing at one (or tapping it on a phone)
// shows its description in GlossaryPanel.vue – under "On this page" on wide screens, at the bottom on phones.
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { data as terms } from './glossary.data.js'

export const activeTerm = ref(null)
export const sheetOpen = ref(false)

// `BP_FluxDataComponent` and `FluxDataComponent` are the same class; attributes are written as
// `Owner.Attribute = value` or `Owner->Attribute`, so only the last name before the value counts
const key = (s) => s.trim().toLowerCase().replace(/^bp_/, '')
const index = new Map(terms.map((t) => [key(t.term), t]))
const lookup = (code) => {
  const name = code.split(/\s|=/)[0].split(/\.|->/).pop()
  return index.get(key(name)) || null
}

export function useGlossary() {
  const route = useRoute()

  // glossary page: give every table row an id (#slug) and highlight the row the link points to
  const anchorRows = () => {
    document.querySelectorAll('.vp-doc tr').forEach((tr) => {
      const code = tr.querySelector('td:first-child code')
      const t = code && terms.find((x) => x.term === code.textContent.trim())
      if (t) tr.id = t.slug
    })
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (target) {
      target.scrollIntoView({ block: 'center' })
      target.classList.add('ib-term-target')
    }
  }

  const mark = () => {
    activeTerm.value = null
    sheetOpen.value = false
    if (route.path.endsWith('/help/glossary')) return anchorRows()
    document.querySelectorAll('.vp-doc :not(pre) > code').forEach((el) => {
      const t = lookup(el.textContent)
      if (!t) return
      el.classList.add('ib-term')
      el.dataset.term = t.slug
      el.tabIndex = 0
    })
  }

  const show = (el, openSheet) => {
    const t = terms.find((x) => x.slug === el.dataset.term)
    if (!t) return
    activeTerm.value = t
    if (openSheet) sheetOpen.value = true
  }

  onMounted(() => {
    mark()
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest?.('.ib-term')
      if (el) show(el, false)
    })
    document.addEventListener('focusin', (e) => {
      const el = e.target.closest?.('.ib-term')
      if (el) show(el, false)
    })
    // touch screens: a tap opens the panel at the bottom; a tap elsewhere closes it
    document.addEventListener('click', (e) => {
      const el = e.target.closest?.('.ib-term')
      if (el && !el.closest('a')) {
        show(el, true)
        return
      }
      if (!e.target.closest?.('.ib-glossary-sheet')) sheetOpen.value = false
    })
  })
  watch(
    () => route.path,
    () => nextTick(() => setTimeout(mark, 50))
  )
}
