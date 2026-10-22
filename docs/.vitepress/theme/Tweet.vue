<script setup>
// Official X (Twitter) embed of a single post, rendered in the site's light/dark theme.
// Until the X script loads (or if it is blocked), a plain link to the post is shown instead.
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  id: { type: String, required: true }
})

const { isDark } = useData()
const box = ref(null)
const loaded = ref(false)

let scriptPromise
function loadScript() {
  if (window.twttr?.widgets) return Promise.resolve(window.twttr)
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://platform.twitter.com/widgets.js'
    s.async = true
    s.onload = () => (window.twttr?.ready ? window.twttr.ready(resolve) : resolve(window.twttr))
    s.onerror = reject
    document.head.appendChild(s)
  })
  return scriptPromise
}

async function render() {
  try {
    const twttr = await loadScript()
    if (!box.value) return
    box.value.innerHTML = ''
    const el = await twttr.widgets.createTweet(props.id, box.value, {
      theme: isDark.value ? 'dark' : 'light',
      align: 'center',
      dnt: true,
      conversation: 'none'
    })
    loaded.value = !!el
  } catch {
    loaded.value = false
  }
}

onMounted(render)
// re-render in the other color scheme when the theme is switched
watch(isDark, render)
</script>

<template>
  <div class="tweet">
    <div ref="box"></div>
    <p v-if="!loaded" class="fallback">
      <a :href="`https://x.com/ImaginaryBlend/status/${id}`" target="_blank" rel="noreferrer">View the post on X</a>
    </p>
  </div>
</template>

<style scoped>
.tweet {
  margin: 24px 0;
}
.fallback {
  text-align: center;
}
</style>
