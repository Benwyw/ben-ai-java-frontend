#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import * as acorn from 'acorn'
import { simple as walk } from 'acorn-walk'

const ROUTER = path.resolve(process.cwd(), 'src', 'router', 'index.js')
if (!fs.existsSync(ROUTER)) {
  console.error('router file not found at', ROUTER)
  process.exit(1)
}
const src = fs.readFileSync(ROUTER, 'utf8')
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module' })

function propKey(node) {
  if (node.type === 'Property') {
    if (node.key.type === 'Identifier') return node.key.name
    if (node.key.type === 'Literal') return node.key.value
  }
  return null
}

function literalValue(node) {
  if (!node) return null
  if (node.type === 'Literal') return node.value
  // TemplateLiteral without expressions
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis.map(q=>q.value.raw).join('')
  return null
}

const results = []

walk(ast, {
  ObjectExpression(node) {
    // find property named 'path'
    const props = node.properties
    const pathProp = props.find(p => propKey(p) === 'path')
    if (!pathProp) return
    const pathVal = literalValue(pathProp.value)
    if (!pathVal) return
    const metaProp = props.find(p => propKey(p) === 'meta')
    let meta = {}
    if (metaProp && metaProp.value && metaProp.value.type === 'ObjectExpression') {
      for (const p of metaProp.value.properties) {
        const k = propKey(p)
        const v = literalValue(p.value)
        if (k && v !== null) meta[k] = v
      }
    }
    results.push({ path: pathVal, meta })
  }
})

if (results.length === 0) {
  console.error('No routes found by AST scan')
  process.exit(1)
}

for (const r of results) {
  console.log('ROUTE:', r.path)
  if (Object.keys(r.meta).length === 0) {
    console.log('  meta: <none>')
  } else {
    for (const [k,v] of Object.entries(r.meta)) {
      console.log(`  ${k}: ${v}`)
    }
  }
}

console.log('\nTotal routes found:', results.length)
