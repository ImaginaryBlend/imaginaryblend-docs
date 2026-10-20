import DefaultTheme from 'vitepress/theme'
import YouTube from './YouTube.vue'
import MediaVideo from './MediaVideo.vue'
import { useReadingSection } from './readingSection.mjs'
import { useSidebarAccordion } from './sidebarAccordion.mjs'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
    app.component('MediaVideo', MediaVideo)
  },
  setup() {
    useReadingSection()
    useSidebarAccordion()
  }
}
