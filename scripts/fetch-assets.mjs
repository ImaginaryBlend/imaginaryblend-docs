// Downloads every image/video that is still linked from imaginaryblend.com/wp-content/uploads
// into docs/public/images/ and rewrites the links in docs/**/*.md to local paths.
// Usage: npm run assets   (Node 18+; run it once, then commit docs/ and docs/public/images/)
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs')
const imagesDir = join(docsDir, 'public', 'images')
const RE = /https?:\/\/(?:www\.)?imaginaryblend\.com\/wp-content\/uploads\/([^\s)"'<>?]+)(?:\?[^\s)"'<>]*)?/g

async function* mdFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (['.vitepress', 'public', 'node_modules'].includes(e.name)) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* mdFiles(p)
    else if (e.name.endsWith('.md')) yield p
  }
}

const exists = (p) => access(p).then(() => true, () => false)
const failed = []
const done = new Set()

async function download(rel) {
  if (done.has(rel)) return true
  const target = join(imagesDir, decodeURIComponent(rel))
  if (!(await exists(target))) {
    const url = `https://imaginaryblend.com/wp-content/uploads/${rel}`
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await mkdir(dirname(target), { recursive: true })
      await writeFile(target, Buffer.from(await res.arrayBuffer()))
      console.log('downloaded', rel)
    } catch (err) {
      failed.push(`${rel} (${err.message})`)
      return false
    }
  }
  done.add(rel)
  return true
}

for await (const file of mdFiles(docsDir)) {
  const text = await readFile(file, 'utf8')
  const rels = [...new Set([...text.matchAll(RE)].map((m) => m[1]))]
  const ok = new Set()
  for (const rel of rels) if (await download(rel)) ok.add(rel)
  const out = text.replace(RE, (whole, rel) => (ok.has(rel) ? `/images/${rel}` : whole))
  if (out !== text) await writeFile(file, out)
}

if (failed.length) {
  console.log('\nNOT downloaded (links left unchanged):')
  failed.forEach((f) => console.log(' -', f))
  process.exitCode = 1
} else {
  console.log('\nAll assets downloaded and links rewritten.')
}
