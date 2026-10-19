import DefaultTheme from 'vitepress/theme'
import YouTube from './YouTube.vue'
import MediaVideo from './MediaVideo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
    app.component('MediaVideo', MediaVideo)
  }
}
