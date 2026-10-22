<script setup>
// Bug report form (Help → Bug report form): collects the details listed in "What to include" and
// prepares a structured email to support. Nothing is sent from the page itself – the report opens
// in the user's mail program or in Gmail, or can be copied and pasted anywhere (e.g. a Discord thread).
import { reactive, ref, computed } from 'vue'
import { withBase } from 'vitepress'

const SUPPORT_EMAIL = 'imaginaryblend@gmail.com'

const ENGINE_VERSIONS = ['5.8', '5.7', '5.6', '5.5', '5.4', '5.3', '4.27 – 5.2 (Fluid Flux 2.0)']
const FLUX_VERSIONS = ['Latest', '3', '2', '1']
const DEV_PLATFORMS = ['Windows', 'Linux', 'macOS']
const TARGET_PLATFORMS = ['PC', 'PS5', 'Xbox', 'VR', 'Mobile', 'macOS']
const FEATURES = ['Lumen', 'Nanite', 'Ray Tracing', 'Path Tracing', 'Forward Shading', 'Substrate', 'Virtual Shadow Maps', 'World Partition']
const SYSTEMS = ['Simulation Domain', 'Coastline Domain', 'Surface actor', 'Buoyancy', 'Interactions', 'Ground capture', 'Glass system', 'Niagara integration', 'Player character / vehicles', 'Installation / project settings', 'Other']

const form = reactive({
  checkedVersion: false,
  checkedTroubleshooting: false,
  orderId: '',
  engine: '',
  fluxVersion: 'Latest',
  devPlatform: 'Windows',
  targets: ['PC'],
  features: [],
  otherSettings: '',
  system: '',
  inDemo: '',
  summary: '',
  description: '',
  steps: '',
  expected: '',
  media: '',
  project: ''
})

const tried = ref(false)
const copied = ref(false)

const missing = computed(() => {
  const m = []
  if (!form.orderId.trim()) m.push('Order ID')
  if (!form.engine) m.push('Unreal Engine version')
  if (!form.summary.trim()) m.push('Summary')
  if (!form.description.trim()) m.push('Description')
  if (!form.steps.trim()) m.push('Steps to reproduce')
  return m
})

const list = (items) => (items.length ? items.join(', ') : '–')
const text = (value) => value.trim() || '–'

const report = computed(() =>
  [
    `Summary: ${text(form.summary)}`,
    `Order ID: ${text(form.orderId)}`,
    '',
    '— Configuration —',
    `Unreal Engine: ${form.engine || '–'}`,
    `Fluid Flux version: ${form.fluxVersion}`,
    `Development platform: ${form.devPlatform}`,
    `Target platforms: ${list(form.targets)}`,
    `Enabled features: ${list(form.features)}`,
    `Other settings: ${text(form.otherSettings)}`,
    `Affected system: ${form.system || '–'}`,
    `Same issue in the demo maps: ${form.inDemo || '–'}`,
    '',
    '— Description —',
    text(form.description),
    '',
    '— Steps to reproduce —',
    text(form.steps),
    '',
    '— Expected result —',
    text(form.expected),
    '',
    '— Video / screenshots —',
    text(form.media),
    '',
    '— Minimal project (link) —',
    text(form.project),
    '',
    `Checked: newest version ${form.checkedVersion ? 'yes' : 'no'}, Troubleshooting and Known issues ${form.checkedTroubleshooting ? 'yes' : 'no'}`
  ].join('\n')
)

const subject = computed(() => `[Fluid Flux bug] ${form.summary.trim()}`)

function prepareEmail() {
  tried.value = true
  if (missing.value.length) return
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(report.value)}`
}

// for people without a mail program: the same message in Gmail's compose window.
// It is a real link (not window.open), so pop-up blockers don't stop it.
const gmailUrl = computed(() => {
  const q = (v) => encodeURIComponent(v)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${q(SUPPORT_EMAIL)}&su=${q(subject.value)}&body=${q(report.value)}`
})

function openGmail(event) {
  tried.value = true
  if (missing.value.length) event.preventDefault()
}

async function copyReport() {
  tried.value = true
  if (missing.value.length) return
  try {
    await navigator.clipboard.writeText(report.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2500)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <form class="bug-form" @submit.prevent="prepareEmail">
    <fieldset class="check">
      <legend>Before you report</legend>
      <label><input v-model="form.checkedVersion" type="checkbox" /> I use the newest version of Fluid Flux.</label>
      <label>
        <input v-model="form.checkedTroubleshooting" type="checkbox" />
        I checked <a :href="withBase('/help/troubleshooting')">Troubleshooting</a> and the <a :href="withBase('/product/limitations#known-issues')">Known issues</a>.
      </label>
    </fieldset>

    <fieldset>
      <legend>Configuration</legend>
      <div class="grid">
        <label class="field">
          <span>Order ID <b>*</b></span>
          <input v-model="form.orderId" type="text" placeholder="From your Fab purchase confirmation" />
          <small>Used only to verify the purchase.</small>
        </label>
        <label class="field">
          <span>Unreal Engine version <b>*</b></span>
          <select v-model="form.engine">
            <option value="" disabled>Choose…</option>
            <option v-for="v in ENGINE_VERSIONS" :key="v">{{ v }}</option>
          </select>
        </label>
        <label class="field">
          <span>Fluid Flux version</span>
          <select v-model="form.fluxVersion">
            <option v-for="v in FLUX_VERSIONS" :key="v">{{ v }}</option>
          </select>
        </label>
        <label class="field">
          <span>Development platform</span>
          <select v-model="form.devPlatform">
            <option v-for="p in DEV_PLATFORMS" :key="p">{{ p }}</option>
          </select>
        </label>
        <label class="field">
          <span>Affected system</span>
          <select v-model="form.system">
            <option value="">Not sure</option>
            <option v-for="s in SYSTEMS" :key="s">{{ s }}</option>
          </select>
        </label>
        <label class="field">
          <span>Same issue in the demo maps?</span>
          <select v-model="form.inDemo">
            <option value="">Not checked</option>
            <option>Yes</option>
            <option>No – only in my project</option>
          </select>
        </label>
      </div>

      <div class="field">
        <span>Target platforms</span>
        <div class="chips">
          <label v-for="p in TARGET_PLATFORMS" :key="p" class="chip">
            <input v-model="form.targets" type="checkbox" :value="p" /><span>{{ p }}</span>
          </label>
        </div>
      </div>
      <div class="field">
        <span>Enabled engine features</span>
        <div class="chips">
          <label v-for="f in FEATURES" :key="f" class="chip">
            <input v-model="form.features" type="checkbox" :value="f" /><span>{{ f }}</span>
          </label>
        </div>
      </div>
      <label class="field">
        <span>Other settings that may matter</span>
        <input v-model="form.otherSettings" type="text" placeholder="e.g. custom post-process, third-party plugins" />
      </label>
    </fieldset>

    <fieldset>
      <legend>Problem</legend>
      <label class="field">
        <span>Summary <b>*</b></span>
        <input v-model="form.summary" type="text" placeholder="One sentence, e.g. Coastline waves disappear in a packaged build" />
      </label>
      <label class="field">
        <span>Description <b>*</b></span>
        <textarea v-model="form.description" rows="4" placeholder="What happens? When did it start?"></textarea>
      </label>
      <label class="field">
        <span>Steps to reproduce <b>*</b></span>
        <textarea v-model="form.steps" rows="4" placeholder="1. Open the map …&#10;2. …"></textarea>
      </label>
      <label class="field">
        <span>Expected result</span>
        <textarea v-model="form.expected" rows="2" placeholder="What should happen instead?"></textarea>
      </label>
      <div class="grid">
        <label class="field">
          <span>Video or screenshots (link)</span>
          <input v-model="form.media" type="url" placeholder="https://" />
        </label>
        <label class="field">
          <span>Minimal project (link)</span>
          <input v-model="form.project" type="url" placeholder="https://" />
          <small>See <a :href="withBase('/help/reporting-bugs#minimal-project')">Minimal project</a>. Never share it publicly.</small>
        </label>
      </div>
    </fieldset>

    <p v-if="tried && missing.length" class="error">Please fill in: {{ missing.join(', ') }}.</p>

    <div class="actions">
      <button type="submit" class="primary">Prepare email</button>
      <a class="button" :href="gmailUrl" target="_blank" rel="noopener noreferrer" @click="openGmail">Open in Gmail</a>
      <button type="button" @click="copyReport">{{ copied ? 'Copied!' : 'Copy report' }}</button>
      <span class="hint">The report is addressed to {{ SUPPORT_EMAIL }}.</span>
    </div>

    <details class="preview">
      <summary>Preview the report</summary>
      <pre>{{ report }}</pre>
    </details>
  </form>
</template>

<style scoped>
.bug-form {
  margin: 24px 0;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}
fieldset {
  margin: 0 0 24px;
  padding: 0;
  border: 0;
}
legend {
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.check label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 14px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  font-size: 14px;
}
.field > span {
  color: var(--vp-c-text-2);
  font-weight: 500;
}
.field b {
  color: var(--vp-c-brand-1);
}
.field small {
  color: var(--vp-c-text-3);
  font-size: 12px;
}
input[type='text'],
input[type='url'],
select,
textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 14px;
  transition: border-color 0.2s;
}
textarea {
  resize: vertical;
}
input:focus,
select:focus,
textarea:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}
input[type='checkbox'] {
  accent-color: var(--ib-teal-dark);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.chip span {
  display: inline-block;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}
.chip input:checked + span {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.chip input:focus-visible + span {
  outline: 2px solid var(--vp-c-brand-1);
}
.error {
  color: var(--vp-c-danger-1);
  font-size: 14px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.actions button,
.actions a.button {
  height: 40px;
  padding: 0 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}
.actions a.button {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}
.actions button:hover,
.actions a.button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.actions button.primary {
  border-color: var(--ib-teal-dark);
  background-color: var(--ib-teal-dark);
  color: #fff;
}
.actions button.primary:hover {
  border-color: var(--ib-teal);
  background-color: var(--ib-teal);
  color: #fff;
}
.hint {
  color: var(--vp-c-text-3);
  font-size: 12px;
}
.preview {
  margin-top: 16px;
  font-size: 14px;
}
.preview summary {
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.preview pre {
  margin-top: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>
