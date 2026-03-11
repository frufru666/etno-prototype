/**
 * Reads .env and writes public/env.js with window.__VITE_MAPBOX_ACCESS_TOKEN__
 * so the app gets the token at runtime and it is never inlined in the bundle.
 * Run before dev/build (see package.json predev/prebuild).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const envPath = join(root, '.env')
const outDir = join(root, 'public')
const outPath = join(outDir, 'env.js')

let token = ''
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf-8')
  const match = content.match(/^\s*VITE_MAPBOX_ACCESS_TOKEN\s*=\s*(.+?)\s*$/m)
  if (match) {
    token = match[1].replace(/^["']|["']$/g, '').trim()
  }
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true })
}

const js = `// Generated from .env – do not commit. See .env.example.
window.__VITE_MAPBOX_ACCESS_TOKEN__ = ${token ? `"${token.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : '""'};
`

writeFileSync(outPath, js, 'utf-8')
console.log('Wrote public/env.js (token ' + (token ? 'set' : 'empty') + ')')
