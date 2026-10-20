// Lists everything in docs/**/*.md that still points at the old WordPress site or at a missing local file.
import { readdir, readFile, access } from 'node:fs/promises'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs')

async function* mdFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (['.vitepress', 'public', 'node_modules'].includes(e.name)) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* mdFiles(p)
    else if (e.name.endsWith('.md')) yield p
  }
}

let problems = 0
for await (const file of mdFiles(docsDir)) {
  const f = relative(docsDir, file)
  const text = await readFile(file, 'utf8')
  for (const m of text.matchAll(/imaginaryblend\.com\/wp-content\/uploads\/[^\s)"'<>]+/g)) {
    console.log(`${f}: still remote -> ${m[0]}`); problems++
  }
  for (const m of text.matchAll(/(?:\]\(|src="|src: )(\/images\/[^)"\s]+)/g)) {
    try { await access(join(docsDir, 'public', m[1])) }
    catch { console.log(`${f}: missing file -> ${m[1]}`); problems++ }
  }
}
console.log(problems ? `\n${problems} problem(s).` : 'No media problems found.')
process.exitCode = problems ? 1 : 0
