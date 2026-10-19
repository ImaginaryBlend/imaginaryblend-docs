// Lists everything in docs/*.md that still points at the old WordPress site or at a missing local file.
import { readdir, readFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs')
let problems = 0
for (const f of (await readdir(docsDir)).filter((n) => n.endsWith('.md'))) {
  const text = await readFile(join(docsDir, f), 'utf8')
  for (const m of text.matchAll(/imaginaryblend\.com\/wp-content\/uploads\/[^\s)"'<>]+/g)) {
    console.log(`${f}: still remote -> ${m[0]}`); problems++
  }
  for (const m of text.matchAll(/(?:\]\(|src=")(\/images\/[^)"\s]+)/g)) {
    try { await access(join(docsDir, 'public', m[1])) }
    catch { console.log(`${f}: missing file -> ${m[1]}`); problems++ }
  }
}
console.log(problems ? `\n${problems} problem(s).` : 'No media problems found.')
process.exitCode = problems ? 1 : 0
