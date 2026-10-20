import DefaultTheme from 'vitepress/theme'
import YouTube from './YouTube.vue'
import MediaVideo from './MediaVideo.vue'
import HeroSlideshow from './HeroSlideshow.vue'
import { useReadingSection } from './readingSection.mjs'
import { useSidebarAccordion } from './sidebarAccordion.mjs'
import { useImageZoom } from './imageZoom.mjs'
import { useTitleActive } from './titleActive.mjs'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
    app.component('MediaVideo', MediaVideo)
    app.component('HeroSlideshow', HeroSlideshow)
  },
  setup() {
    useReadingSection()
    useSidebarAccordion()
    useImageZoom()
    useTitleActive()
  }
}
