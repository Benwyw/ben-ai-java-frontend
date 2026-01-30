import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'acorn'
import * as walk from 'acorn-walk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const ROUTER_PATH = path.join(ROOT, 'src/router/index.js')
const OUTPUT_PATH = path.join(ROOT, 'public/sitemap.xml')
const SITE_ORIGIN = 'https://www.benwyw.com'

const lastmod = getArgValue('--date') ?? new Date().toISOString().slice(0, 10)

const rules = [
  { prefix: '/', exact: true, changefreq: 'weekly', priority: '1.0' },
  { prefix: '/noteformat', exact: true, changefreq: 'weekly', priority: '0.9' },
  { prefix: '/noteformat/docs', changefreq: 'weekly', priority: '0.8' },
  { prefix: '/noteformat/tutorials', changefreq: 'weekly', priority: '0.8' },
  { prefix: '/noteformat/privacy', changefreq: 'monthly', priority: '0.5' },
  { prefix: '/benkaneki', exact: true, changefreq: 'weekly', priority: '0.8' },
  { prefix: '/benkaneki/about', changefreq: 'monthly', priority: '0.7' },
  { prefix: '/benkaneki/whityweight', changefreq: 'monthly', priority: '0.6' },
  { prefix: '/whity', changefreq: 'monthly', priority: '0.7' },
  { prefix: '/mcbenwywcom', exact: true, changefreq: 'monthly', priority: '0.7' },
  { prefix: '/mcbenwywcom/about', changefreq: 'monthly', priority: '0.6' },
  { prefix: '/mcbenwywcom/staff', changefreq: 'monthly', priority: '0.5' },
]

const defaultRule = { changefreq: 'monthly', priority: '0.5' }

const routerSource = await fs.readFile(ROUTER_PATH, 'utf8')
const ast = parse(routerSource, { ecmaVersion: 'latest', sourceType: 'module' })

let routesArrayNode = null
walk.simple(ast, {
  VariableDeclarator (node) {
    if (node.id?.type === 'Identifier' && node.id.name === 'routes' && node.init?.type === 'ArrayExpression') {
      routesArrayNode = node.init
    }
  },
})

if (!routesArrayNode) {
  throw new Error('Routes array not found in router file.')
}

const collected = []
const seen = new Set()
extractRoutesFromArray(routesArrayNode, '')

const urls = collected.map(pathValue => ({
  path: pathValue,
  ...matchRule(pathValue),
}))

const xml = buildSitemapXml(urls)
await fs.writeFile(OUTPUT_PATH, xml, 'utf8')
console.log(`Sitemap written to ${OUTPUT_PATH} with ${urls.length} URLs.`)

function getArgValue (name) {
  const index = process.argv.indexOf(name)
  if (index === -1) return null
  return process.argv[index + 1] ?? null
}

function extractRoutesFromArray (arrayNode, parentPath) {
  for (const element of arrayNode.elements ?? []) {
    if (element?.type === 'ObjectExpression') {
      extractRouteFromObject(element, parentPath)
    }
  }
}

function extractRouteFromObject (objectNode, parentPath) {
  let pathValue = null
  let hasRedirect = false
  let meta = {}
  let children = null

  for (const property of objectNode.properties ?? []) {
    if (property.type !== 'Property') continue
    const key = getKeyName(property.key)

    if (key === 'path') {
      pathValue = getLiteralValue(property.value)
    } else if (key === 'redirect') {
      hasRedirect = true
    } else if (key === 'meta') {
      meta = extractMeta(property.value)
    } else if (key === 'children' && property.value?.type === 'ArrayExpression') {
      children = property.value
    }
  }

  const fullPath = pathValue !== null ? joinPaths(parentPath, pathValue) : parentPath

  if (pathValue !== null) {
    if (isIndexableRoute(fullPath, { hasRedirect, meta })) {
      if (!seen.has(fullPath)) {
        seen.add(fullPath)
        collected.push(fullPath)
      }
    }
  }

  if (children) {
    extractRoutesFromArray(children, fullPath)
  }
}

function getKeyName (keyNode) {
  if (!keyNode) return null
  if (keyNode.type === 'Identifier') return keyNode.name
  if (keyNode.type === 'Literal') return keyNode.value
  return null
}

function getLiteralValue (node) {
  if (!node) return null
  if (node.type === 'Literal') return node.value
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis.map(quasi => quasi.value.cooked).join('')
  }
  return null
}

function extractMeta (metaNode) {
  if (!metaNode || metaNode.type !== 'ObjectExpression') return {}
  const meta = {}
  for (const property of metaNode.properties ?? []) {
    if (property.type !== 'Property') continue
    const key = getKeyName(property.key)
    if (!key) continue
    meta[key] = getLiteralValue(property.value)
  }
  return meta
}

function isIndexableRoute (fullPath, { hasRedirect, meta }) {
  if (!fullPath || fullPath.includes(':')) return false
  if (hasRedirect) return false
  if (meta?.navHidden === true) return false
  if (meta?.requiresAuth === true) return false
  if (typeof meta?.externalLink === 'string' && meta.externalLink.length > 0) return false
  if (typeof meta?.robots === 'string' && meta.robots.toLowerCase().includes('noindex')) return false
  return true
}

function joinPaths (parentPath, childPath) {
  if (childPath.startsWith('/')) return childPath
  if (!parentPath || parentPath === '/') {
    if (!childPath) return '/'
    return `/${childPath}`
  }
  if (!childPath) return parentPath
  return `${parentPath.replace(/\/$/, '')}/${childPath}`
}

function matchRule (pathValue) {
  const sorted = [...rules].sort((a, b) => b.prefix.length - a.prefix.length)
  for (const rule of sorted) {
    if (rule.exact && pathValue === rule.prefix) return rule
    if (!rule.exact && pathValue.startsWith(rule.prefix)) return rule
  }
  return defaultRule
}

function buildSitemapXml (urls) {
  const lines = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
  lines.push('        xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  lines.push('        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"')
  lines.push('        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9')
  lines.push('        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">')

  for (const entry of urls) {
    lines.push('  <url>')
    lines.push(`    <loc>${escapeXml(SITE_ORIGIN + entry.path)}</loc>`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(buildHref(entry.path))}"/>`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="zh-HK" href="${escapeXml(buildHref(entry.path, 'zh-HK'))}"/>`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(buildHref(entry.path))}"/>`)
    lines.push(`    <lastmod>${lastmod}</lastmod>`)
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`)
    lines.push(`    <priority>${entry.priority}</priority>`)
    lines.push('  </url>')
  }

  lines.push('</urlset>')
  lines.push('')
  return lines.join('\n')
}

function buildHref (pathValue, locale) {
  const base = SITE_ORIGIN + pathValue
  if (!locale || locale === 'en') return base
  return `${base}?lang=${encodeURIComponent(locale)}`
}

function escapeXml (value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
