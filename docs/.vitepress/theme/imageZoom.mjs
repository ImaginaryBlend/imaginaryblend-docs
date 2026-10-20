// Click any image in the docs content to view it enlarged in the middle of the screen.
// Close with a click, Escape or by scrolling.
import { onMounted, onUnmounted } from 'vue'

const MAX_UPSCALE = 2.5 // small screenshots may be enlarged up to 2.5x their real size

let overlay = null

function close() {
  if (!overlay) return
  const el = overlay
  overlay = null
  el.classList.remove('open')
  setTimeout(() => el.remove(), 200)
  window.removeEventListener('scroll', close)
}

function open(img) {
  close()
  const nw = img.naturalWidth || img.width
  const nh = img.naturalHeight || img.height
  const scale = Math.min((window.innerWidth * 0.92) / nw, (window.innerHeight * 0.9) / nh, MAX_UPSCALE)
  const big = document.createElement('img')
  big.src = img.currentSrc || img.src
  big.alt = img.alt
  big.style.width = `${Math.round(nw * scale)}px`
  overlay = document.createElement('div')
  overlay.className = 'ib-lightbox'
  overlay.appendChild(big)
  overlay.addEventListener('click', close)
  document.body.appendChild(overlay)
  requestAnimationFrame(() => overlay?.classList.add('open'))
  window.addEventListener('scroll', close, { passive: true })
}

function onClick(e) {
  const img = e.target.closest?.('.vp-doc img')
  if (!img || img.classList.contains('no-zoom') || img.closest('a')) return
  e.preventDefault()
  open(img)
}
function onKey(e) {
  if (e.key === 'Escape') close()
}

export function useImageZoom() {
  onMounted(() => {
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
  })
  onUnmounted(() => {
    document.removeEventListener('click', onClick)
    document.removeEventListener('keydown', onKey)
    close()
  })
}
