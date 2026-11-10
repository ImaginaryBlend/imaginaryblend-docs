import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import YouTube from './YouTube.vue'
import MediaVideo from './MediaVideo.vue'
import HeroSlideshow from './HeroSlideshow.vue'
import UsedIn from './UsedIn.vue'
import Tweet from './Tweet.vue'
import BugReportForm from './BugReportForm.vue'
import SiteFooter from './SiteFooter.vue'
import NotFoundPage from './NotFoundPage.vue'
import GlossaryPanel from './GlossaryPanel.vue'
import { useReadingSection } from './readingSection.mjs'
import { useSidebarAccordion } from './sidebarAccordion.mjs'
import { useImageZoom } from './imageZoom.mjs'
import { useTitleActive } from './titleActive.mjs'
import { useRedirects } from './redirects.mjs'
import { useNavAlign } from './navAlign.mjs'
import { useGlossary } from './useGlossary.mjs'
import { useHashScroll } from './hashScroll.mjs'
import './custom.css'
import './icons.css'

export default {
  extends: DefaultTheme,
  // footer below the content of the Overview page; own 404 page with search and main sections;
  // glossary panel for class names in the text
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-after': () => h(SiteFooter),
      'not-found': () => h(NotFoundPage),
      // glossary description: bottom of the right column (under "On this page") on wide screens, panel at the bottom on phones
      'aside-bottom': () => h(GlossaryPanel, { mode: 'aside' }),
      'layout-bottom': () => h(GlossaryPanel, { mode: 'sheet' })
    }),
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
    app.component('MediaVideo', MediaVideo)
    app.component('HeroSlideshow', HeroSlideshow)
    app.component('UsedIn', UsedIn)
    app.component('Tweet', Tweet)
    app.component('BugReportForm', BugReportForm)
  },
  setup() {
    useReadingSection()
    useSidebarAccordion()
    useImageZoom()
    useTitleActive()
    useRedirects()
    useNavAlign()
    useGlossary()
    useHashScroll()
  }
}
