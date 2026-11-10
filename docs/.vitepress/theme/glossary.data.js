// Build-time loader for the glossary: reads docs/help/glossary.md (the single source of the terms)
// and gives every page a list of { term, slug, text, link } used by the hover panel (useGlossary.mjs).
// Each term is a table row: | [`Name`](link to the page that describes it) | Description |
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../help/glossary.md')

// same rule as VitePress uses for heading anchors
const slugify = (s) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()

// the link is optional: | `Name` | Description | works too
const ROW = /^\|\s*(?:\[`([^`]+)`\]\(([^)]+)\)|`([^`]+)`)\s*\|\s*(.+?)\s*\|\s*$/
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

export default {
  watch: [FILE],
  load() {
    const terms = []
    for (const line of fs.readFileSync(FILE, 'utf8').split(/\r?\n/)) {
      const m = line.match(ROW)
      if (!m) continue
      const term = (m[1] || m[3]).trim()
      const text = m[4].replace(LINK, '$1').replace(/[*`]/g, '').trim()
      terms.push({ term, slug: slugify(term), text, link: m[2] || null })
    }
    return terms
  }
}
