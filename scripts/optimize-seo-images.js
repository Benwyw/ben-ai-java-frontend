#!/usr/bin/env node
/**
 * SEO Image Optimization Script
 *
 * Optimizes images used for Open Graph / social media sharing.
 * Target: Good quality images under 300KB for fast loading.
 *
 * Run: node scripts/optimize-seo-images.js
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_ASSETS = path.join(__dirname, '../public/assets')

async function fileSize (filePath) {
  const stats = await fs.stat(filePath)
  return stats.size
}

function formatSize (bytes) {
  return (bytes / 1024).toFixed(1) + 'KB'
}

async function optimizeImage (inputPath, outputPath, options = {}) {
  const { width, height, format = 'png', quality = 80 } = options

  let pipeline = sharp(inputPath)

  if (width || height) {
    pipeline = pipeline.resize(width, height, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
  }

  switch (format) {
    case 'png': {
      pipeline = pipeline.png({ compressionLevel: 9, quality })

      break
    }
    case 'webp': {
      pipeline = pipeline.webp({ quality })

      break
    }
    case 'jpeg': {
      pipeline = pipeline.jpeg({ quality, mozjpeg: true })

      break
    }
  // No default
  }

  await pipeline.toFile(outputPath)

  const inputSize = await fileSize(inputPath)
  const outputSize = await fileSize(outputPath)
  const savings = ((1 - outputSize / inputSize) * 100).toFixed(1)

  return { inputSize, outputSize, savings }
}

async function main () {
  console.log('\n🖼️  SEO Image Optimization\n')
  console.log('Target: Quality images under 300KB for social sharing\n')

  const images = [
    {
      name: 'NoteFormat',
      input: 'NoteFormat-1024-transparent.png',
      output: 'NoteFormat-seo.png',
      options: { width: 600, height: 600, format: 'png' },
    },
    {
      name: 'BenKaneki',
      input: 'BenKaneki-381.png',
      output: 'BenKaneki-seo.png',
      options: { width: 381, height: 381, format: 'png' },
    },
  ]

  for (const img of images) {
    const inputPath = path.join(PUBLIC_ASSETS, img.input)
    const outputPath = path.join(PUBLIC_ASSETS, img.output)

    try {
      // Check if input exists
      await fs.access(inputPath)

      const result = await optimizeImage(inputPath, outputPath, img.options)

      console.log(`✅ ${img.name}:`)
      console.log(`   Input:  ${formatSize(result.inputSize)} (${img.input})`)
      console.log(`   Output: ${formatSize(result.outputSize)} (${img.output})`)
      console.log(`   Saved:  ${result.savings}%\n`)
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`⚠️  ${img.name}: Input file not found (${img.input})\n`)
      } else {
        console.error(`❌ ${img.name}: ${error.message}\n`)
      }
    }
  }

  console.log('Done! Update router to use the new -seo.png files.\n')
}

main().catch(console.error)
