import DefaultTheme from 'vitepress/theme'
import YouTube from './YouTube.vue'
import MediaVideo from './MediaVideo.vue'
import HeroSlideshow from './HeroSlideshow.vue'
import UsedIn from './UsedIn.vue'
import { useReadingSection } from './readingSection.mjs'
import { useSidebarAccordion } from './sidebarAccordion.mjs'
import { useImageZoom } from './imageZoom.mjs'
import { useTitleActive } from './titleActive.mjs'
import { useRedirects } from './redirects.mjs'
import './custom.css'
import './icons.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
    app.component('MediaVideo', MediaVideo)
    app.component('HeroSlideshow', HeroSlideshow)
    app.component('UsedIn', UsedIn)
  },
  setup() {
    useReadingSection()
    useSidebarAccordion()
    useImageZoom()
    useTitleActive()
    useRedirects()
  }
}
