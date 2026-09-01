#!/usr/bin/env node
// Simple verification script that checks prerendered titles against expected values
import fs from 'fs'
import path from 'path'

const checks = [
  { route: '/', expectedTitle: 'Benwyw — iOS Apps, Tools & Projects' },
  { route: '/noteformat', expectedTitle: 'NoteFormat - Expense Formatter | Flexible Import/Export for iOS' },
  { route: '/benkaneki', expectedTitle: 'Ben Kaneki Discord Bot — Benwyw' },
  { route: '/whity', expectedTitle: 'Whity — In Loving Memory (2019-2024)' },
  { route: '/mcbenwywcom', expectedTitle: "Ben's Minecraft Server — Benwyw" },
  { route: '/mcbenwywcom/about', expectedTitle: "Ben's Minecraft Server About — Benwyw" },
  { route: '/mcbenwywcom/staff', expectedTitle: "Ben's Minecraft Server Staff List — Benwyw" },
]

function readHtml(route) {
  const p = path.join('dist', route === '/' ? 'index.html' : route.replace(/^\//, '') + '/index.html')
  if (!fs.existsSync(p)) return null
  return fs.readFileSync(p, 'utf8')
}

function decodeHtmlEntities(str) {
  if (!str) return str
  return str.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
}

function extractTitle(html) {
  if (!html) return null
  const m = /<title>([\s\S]*?)<\/title>/i.exec(html)
  return m ? decodeHtmlEntities(m[1]) : null
}

function extractMetaContent(html, attr, name) {
  if (!html) return null
  const re = new RegExp(`<meta\\s+${attr}=["']${name}["'][^>]*content=["']([^"']+)["']`, 'i')
  const m = re.exec(html)
  return m ? decodeHtmlEntities(m[1]) : null
}

let failed = false
for (const c of checks) {
  const html = readHtml(c.route)
  if (!html) {
    console.error('MISSING', c.route)
    failed = true
    continue
  }
  const title = extractTitle(html)
  if (title !== c.expectedTitle) {
    console.error('MISMATCH', c.route)
    console.error('  expected:', c.expectedTitle)
    console.error('  got     :', title)
    failed = true
  } else {
    console.log('OK', c.route)
  }
}
process.exit(failed ? 2 : 0)
