#!/usr/bin/env node
/* Prerender-meta script (no browser required)
 * - Reads src/router/index.js to find public routes and their meta info
 * - Uses src/locales/en.json translations when seoKey is present
 * - Reads dist/index.html (built SPA) as template and writes dist/<route>/index.html
 * Run after `npm run build:prod` as: node scripts/prerender-meta.js
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(process.cwd())
const DIST = path.join(ROOT, 'dist')
const ROUTER_SRC = path.join(ROOT, 'src', 'router', 'index.js')
const LOCALE_EN = path.join(ROOT, 'src', 'locales', 'en.json')
const OVERRIDE = path.join(ROOT, 'scripts', 'prerender-routes.txt')

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8') } catch (e) { return null }
}

import * as acorn from 'acorn'
import { simple as walk } from 'acorn-walk'

function extractRoutesAndMeta(routerSrc) {
  const src = readFileSafe(routerSrc)
  if (!src) return []

  // Parse with acorn for robust extraction
  let ast
  try {
    ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module' })
  } catch (e) {
    // fallback to regex method
    console.warn('Acorn parse failed, falling back to regex extraction', e)
    return extractRoutesAndMetaRegex(routerSrc)
  }

  const routes = []

  function getLiteral(node) {
    if (!node) return null
    if (node.type === 'Literal') return node.value
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis.map(q => q.value.raw).join('')
    return null
  }

  walk(ast, {
    ObjectExpression(node) {
      const props = node.properties
      const pathProp = props.find(p => ((p.key && (p.key.name || p.key.value)) === 'path'))
      if (!pathProp) return
      const pathVal = getLiteral(pathProp.value)
      if (!pathVal) return
      const metaProp = props.find(p => ((p.key && (p.key.name || p.key.value)) === 'meta'))
      let meta = {}
      if (metaProp && metaProp.value && metaProp.value.type === 'ObjectExpression') {
        for (const p of metaProp.value.properties) {
          const k = p.key.name || p.key.value
          const v = getLiteral(p.value)
          if (k && v != null) meta[k] = v
        }
      }
      routes.push({ path: pathVal, meta })
    }
  })

  // dedupe and ensure root
  const map = new Map()
  for (const r of routes) map.set(r.path, r)
  map.set('/', map.get('/') || { path: '/', meta: {} })

  // apply overrides from prerender-routes.txt
  try {
    const override = readFileSafe(OVERRIDE)
    if (override) {
      const lines = override.split(/\r?\n/)
      for (let raw of lines) {
        let line = raw.trim()
        if (!line || line.startsWith('#')) continue
        let exclude = false
        if (line.startsWith('-') || line.startsWith('!')) { exclude = true; line = line.slice(1).trim() }
        if (!line.startsWith('/')) line = '/' + line
        if (exclude) {
          map.delete(line)
        } else {
          if (!map.has(line)) map.set(line, { path: line, meta: {} })
        }
      }
    }
  } catch (e) { /* ignore */ }

  return Array.from(map.values())
}

function extractRoutesAndMetaRegex(routerSrc) {
  // previous regex-based fallback
  const src = readFileSafe(routerSrc)
  const routes = []
  const pathRegex = /path:\s*('|")([^'\"]+)\1/g
  let m
  while ((m = pathRegex.exec(src))) {
    const routePath = m[2]
    // best-effort: search for meta within nearby text
    const start = m.index
    const objStart = src.lastIndexOf('{', start)
    const after = src.indexOf('\n\t},', start)
    const objEnd = after !== -1 ? after + 3 : src.indexOf('\n\t}', start)
    const objText = src.slice(objStart, objEnd === -1 ? start + 50 : objEnd)
    const metaMatch = /meta:\s*\{([\s\S]*?)\}/.exec(objText)
    const metaText = metaMatch ? metaMatch[1] : ''
    const getProp = (key) => {
      const re = new RegExp(key + "\\s*:\\s*(?:'((?:\\\\'|[^'])*)'|\"((?:\\\\\"|[^\"])*?)\")")
      const r = re.exec(metaText)
      if (!r) return null
      const val = r[1] || r[2] || ''
      return val.replace(/\\\\'/g, "'").replace(/\\\\\"/g, '"')
    }
    const meta = {
      seoTitle: getProp('seoTitle') || getProp('title') || null,
      seoDescription: getProp('seoDescription') || null,
      seoImage: getProp('seoImage') || null,
      canonicalPath: getProp('canonicalPath') || routePath,
      ogType: getProp('ogType') || null,
      seoKeywords: getProp('seoKeywords') || null,
      seoKey: getProp('seoKey') || null,
    }
    routes.push({ path: routePath, meta })
  }
  const map = new Map()
  for (const r of routes) map.set(r.path, r)
  map.set('/', map.get('/') || { path: '/', meta: {} })
  return Array.from(map.values())
}

function loadLocaleSeo(key) {
  const en = readFileSafe(LOCALE_EN)
  if (!en || !key) return {}
  try {
    const obj = JSON.parse(en)
    // look under seo.{key}.title/description/keywords
    const seo = obj?.seo?.[key]
    if (!seo) return {}
    return {
      seoTitle: seo.title || null,
      seoDescription: seo.description || null,
      seoKeywords: seo.keywords || null,
    }
  } catch (e) {
    return {}
  }
}

function applyMetaToHtml(template, values) {
  let html = template
  // title
  if (values.seoTitle) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(values.seoTitle)}</title>`)
    html = upsertMetaTag(html, 'name', 'title', values.seoTitle)
    html = upsertMetaTag(html, 'property', 'og:title', values.seoTitle)
    html = upsertMetaTag(html, 'name', 'twitter:title', values.seoTitle)
  }
  if (values.seoDescription) {
    html = upsertMetaTag(html, 'name', 'description', values.seoDescription)
    html = upsertMetaTag(html, 'property', 'og:description', values.seoDescription)
    html = upsertMetaTag(html, 'name', 'twitter:description', values.seoDescription)
  }
  if (values.seoKeywords) {
    html = upsertMetaTag(html, 'name', 'keywords', values.seoKeywords)
  }
  if (values.canonical) {
    html = upsertLink(html, 'canonical', values.canonical)
  }
  if (values.ogUrl) {
    html = upsertMetaTag(html, 'property', 'og:url', values.ogUrl)
    html = upsertMetaTag(html, 'name', 'twitter:url', values.ogUrl)
  }

  // images: og/twitter image
  const imageHref = values.seoImage || values.iconHref || 'https://www.benwyw.com/Benwyw-1024.png'
  if (imageHref) {
    html = upsertMetaTag(html, 'property', 'og:image', imageHref)
    html = upsertMetaTag(html, 'name', 'twitter:image', imageHref)
  }

  if (values.ogType) {
    html = upsertMetaTag(html, 'property', 'og:type', values.ogType)
  }

  // Icons: prefer explicit iconHref/appleTouchIcon, then seoImage, then site default
  const iconHref = values.iconHref || values.seoImage || '/Benwyw-1024.png'
  const faviconHref = values.faviconHref || '/favicon.ico'
  const appleHref = values.appleTouchIcon || values.seoImage || '/Benwyw-1024.png'
  // insert PNG icon (with type)
  html = upsertLinkWithAttrs(html, { rel: 'icon', href: iconHref, type: 'image/png' })

  // ensure favicon is explicitly set/overwritten to faviconHref if provided (replace .ico link), else keep existing
  if (faviconHref) {
    const icoRe = /<link\s+[^>]*rel=(?:"|')icon(?:"|')[^>]*href=(?:"|')[^"']*\.ico[^"']*(?:"|')[^>]*>/i
    const icoTag = `<link rel="icon" href="${escapeHtml(faviconHref)}" />`
    if (icoRe.test(html)) {
      html = html.replace(icoRe, icoTag)
    } else {
      html = addLinkIfMissing(html, { rel: 'icon', href: faviconHref })
    }
  }

  // ensure apple-touch-icon replaced/appended
  if (appleHref) {
    const appleRe = /<link\s+[^>]*rel=(?:"|')apple-touch-icon(?:"|')[^>]*>/i
    const appleTag = `<link rel="apple-touch-icon" href="${escapeHtml(appleHref)}" />`
    if (appleRe.test(html)) {
      html = html.replace(appleRe, appleTag)
    } else {
      html = addLinkIfMissing(html, { rel: 'apple-touch-icon', href: appleHref })
    }
  }

  return html
}

function escapeHtml (s) {
  return s.replace(/[&<>\"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c])
}

function upsertMetaTag(html, attr, key, content) {
  if (!content) return html
  const re = new RegExp(`<meta\\s+${attr}\\="${escapeReg(key)}"[\\s\\S]*?>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  // insert before closing head
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`)
}

function upsertLink(html, rel, href) {
  if (!href) return html
  const re = new RegExp(`<link\\s+rel=\\"${escapeReg(rel)}\\"[\\s\\S]*?>`, 'i')
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`)
}

function upsertLinkWithAttrs(html, attrs) {
  // Insert a link tag with attrs.rel/attrs.href/attrs.type.
  // If exact rel+href exists, do nothing. If a rel+type match exists, replace it. Otherwise append a new tag (don't clobber other rel entries).
  if (!attrs || !attrs.rel || !attrs.href) return html
  const rel = attrs.rel
  const href = attrs.href
  const type = attrs.type

  const relHrefRe = new RegExp(`<link\\s+[^>]*rel=\\"${escapeReg(rel)}\\"[^>]*href=\\"${escapeReg(href)}\\"[\\s\\S]*?>`, 'i')
  if (relHrefRe.test(html)) return html // exact tag already present

  // Build tag string
  const parts = Object.keys(attrs).map(k => `${k}="${escapeHtml(attrs[k])}"`).join(' ')
  const tag = `<link ${parts} />`

  // If a tag with same rel AND same type exists, replace it
  if (type) {
    const relTypeRe = new RegExp(`<link\\s+[^>]*rel=\\"${escapeReg(rel)}\\"[^>]*type=\\"${escapeReg(type)}\\"[\\s\\S]*?>`, 'i')
    if (relTypeRe.test(html)) return html.replace(relTypeRe, tag)
  }

  // If no tag with same rel exists at all, insert before </head>
  const relAnyRe = new RegExp(`<link\\s+[^>]*rel=\\"${escapeReg(rel)}\\"[\\s\\S]*?>`, 'i')
  if (!relAnyRe.test(html)) return html.replace(/<\/head>/i, `  ${tag}\n</head>`)

  // There are existing rel tags but none match type/href: append new tag (don't replace existing rel entries)
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`)
}

function addLinkIfMissing(html, attrs) {
  // Add a link tag only if the exact rel+href pair is missing; do not replace existing rel entries.
  if (!attrs || !attrs.rel || !attrs.href) return html
  const rel = attrs.rel
  const href = attrs.href
  const relHrefRe = new RegExp(`<link\\s+[^>]*rel=\\"${escapeReg(rel)}\\"[^>]*href=\\"${escapeReg(href)}\\"[\\s\\S]*?>`, 'i')
  if (relHrefRe.test(html)) return html
  const parts = Object.keys(attrs).map(k => `${k}="${escapeHtml(attrs[k])}"`).join(' ')
  const tag = `<link ${parts} />`
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`)
}

function escapeReg (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

function sanitizeSegmentForFs(segment) {
  // sanitize a single path segment (preserve directory structure)
  if (!segment) return 'param'
  let s = segment
  // remove characters that are universally invalid on filesystems
  s = s.replace(/[:\"<>\\|\r\n]/g, '')
  // remove parentheses, asterisks, question marks
  s = s.replace(/[()\*\?]/g, '')
  // replace any remaining non-alphanum, non -,_ with '-'
  s = s.replace(/[^a-zA-Z0-9\-_]/g, '-')
  // collapse multiple dashes and trim
  s = s.replace(/-+/g, '-').replace(/(^-+|-+$)/g, '')
  if (!s) s = 'param'
  return s
}

function writeOut(dist, route, content) {
  if (route === '/' || route === '') {
    fs.writeFileSync(path.join(dist, 'index.html'), content, 'utf8')
    return
  }

  // Preserve directory structure: /mcbenwywcom/about -> dist/mcbenwywcom/about/index.html
  const segments = route.split('/').filter(Boolean).map(sanitizeSegmentForFs)
  const outDir = path.join(dist, ...segments)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), content, 'utf8')
  console.log(`Wrote file for ${route} -> ${path.join('/', ...segments, 'index.html')}`)
}

function main() {
  if (!fs.existsSync(DIST)) { console.error('dist not found. Run build first.'); process.exit(1) }
  const template = readFileSafe(path.join(DIST, 'index.html'))
  if (!template) { console.error('dist/index.html not found'); process.exit(1) }

  const routes = extractRoutesAndMeta(ROUTER_SRC)
  console.log('Found routes:', routes.map(r=>r.path))

  // Inherit metadata from nearest parent path when missing.
  // Generic approach: copy parent.meta keys that are missing on the child, except excluded keys.
  const routeMap = new Map(routes.map(r => [r.path, r]))
  const excludeKeys = new Set(['canonicalPath', 'path', 'name', 'redirect', 'component', 'seoKey'])
  for (const r of routes) {
    r.meta = r.meta || {}
    // Only inherit from the immediate parent path (one level up). Do NOT climb to root.
    const idx = r.path.lastIndexOf('/')
    if (idx > 0 || (idx === 0 && r.path !== '/')) {
      const parentPath = idx === 0 ? '/' : r.path.slice(0, idx)
      const parent = routeMap.get(parentPath)
      if (parent && parent.meta) {
        for (const [k, v] of Object.entries(parent.meta)) {
          if (excludeKeys.has(k)) continue
          if (r.meta[k] == null || r.meta[k] === '') {
            r.meta[k] = v
          }
        }
        // If parent defines seoKey, inherit computed seoKeywords from its locale translations
        if (!r.meta.seoKeywords) {
          if (parent.meta.seoKeywords) {
            r.meta.seoKeywords = parent.meta.seoKeywords
          } else if (parent.meta.seoKey) {
            const t = loadLocaleSeo(parent.meta.seoKey)
            if (t.seoKeywords) r.meta.seoKeywords = t.seoKeywords
          }
        }
      }
    }
  }

  for (const r of routes) {
    const meta = r.meta || {}
    let values = {}
    // base values from meta
    values.seoTitle = meta.seoTitle || null
    values.seoDescription = meta.seoDescription || null
    values.seoImage = meta.seoImage || null
    values.ogType = meta.ogType || null
    values.seoKeywords = meta.seoKeywords || null
    values.canonical = meta.canonicalPath ? `https://www.benwyw.com${meta.canonicalPath}` : `https://www.benwyw.com${r.path}`
    values.ogUrl = `https://www.benwyw.com${r.path}`
    // icon/fav/apple-touch from meta (may be inherited already)
    values.iconHref = meta.iconHref || meta.iconImage || meta.seoImage || null
    values.faviconHref = meta.faviconHref || null
    values.appleTouchIcon = meta.appleTouchIcon || meta.iconImage || meta.seoImage || null

    // If seoKey present, try to read translations from en.json
    if (meta.seoKey) {
      const t = loadLocaleSeo(meta.seoKey)
      if (t.seoTitle && !values.seoTitle) values.seoTitle = t.seoTitle
      if (t.seoDescription && !values.seoDescription) values.seoDescription = t.seoDescription
      if (t.seoKeywords && !values.seoKeywords) values.seoKeywords = t.seoKeywords
    }

    // Fallbacks
    if (!values.seoTitle) values.seoTitle = 'Benwyw — iOS Apps, Tools & Projects'
    if (!values.seoDescription) values.seoDescription = 'Welcome to Benwyw. Explore the NoteFormat iOS expense tracker, Ben Kaneki Discord bot, and our 24/7 crossplay Minecraft SMP server.'
    if (!values.seoImage) values.seoImage = 'https://www.benwyw.com/Benwyw-1024.png'

    const outHtml = applyMetaToHtml(template, values)
    writeOut(DIST, r.path, outHtml)
    console.log('Wrote prerender for', r.path)
  }

  console.log('Meta prerender complete')
}

main()
