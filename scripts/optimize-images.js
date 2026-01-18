#!/usr/bin/env node
/**
 * Image Optimization Script for Whity Page
 *
 * This script:
 * 1. Converts gallery images to WebP format
 * 2. Creates thumbnails (300px width) for gallery grid
 * 3. Optimizes hero image
 *
 * Run: node scripts/optimize-images.js
 */

import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ASSETS_DIR = path.join(__dirname, '../src/assets/cat')
const GALLERY_DIR = path.join(ASSETS_DIR, 'gallery')

// Configuration
const THUMBNAIL_WIDTH = 300
const FULL_IMAGE_WIDTH = 1200
const WEBP_QUALITY = 80
const JPEG_QUALITY = 80

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

async function getImageFiles(dir) {
  const files = await fs.readdir(dir)
  return files.filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('_thumb') && !f.includes('_optimized'))
}

async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width, quality = WEBP_QUALITY, format = 'webp' } = options

  let pipeline = sharp(inputPath)

  if (width) {
    pipeline = pipeline.resize(width, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
  }

  if (format === 'webp') {
    pipeline = pipeline.webp({ quality })
  } else if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true })
  }

  await pipeline.toFile(outputPath)

  const inputStats = await fs.stat(inputPath)
  const outputStats = await fs.stat(outputPath)
  const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)

  return {
    input: path.basename(inputPath),
    output: path.basename(outputPath),
    inputSize: (inputStats.size / 1024).toFixed(1) + 'KB',
    outputSize: (outputStats.size / 1024).toFixed(1) + 'KB',
    savings: savings + '%'
  }
}

async function processGalleryImages() {
  console.log('\n📸 Processing Gallery Images...\n')

  const thumbDir = path.join(GALLERY_DIR, 'thumbnails')
  const webpDir = path.join(GALLERY_DIR, 'webp')

  await ensureDir(thumbDir)
  await ensureDir(webpDir)

  const images = await getImageFiles(GALLERY_DIR)
  const results = []

  for (const image of images) {
    const inputPath = path.join(GALLERY_DIR, image)
    const baseName = path.parse(image).name

    // Create WebP thumbnail (for gallery grid)
    const thumbResult = await optimizeImage(
      inputPath,
      path.join(thumbDir, `${baseName}_thumb.webp`),
      { width: THUMBNAIL_WIDTH, quality: WEBP_QUALITY }
    )
    results.push({ ...thumbResult, type: 'thumbnail' })

    // Create full-size WebP (for lightbox)
    const fullResult = await optimizeImage(
      inputPath,
      path.join(webpDir, `${baseName}.webp`),
      { width: FULL_IMAGE_WIDTH, quality: WEBP_QUALITY }
    )
    results.push({ ...fullResult, type: 'full-webp' })
  }

  return results
}

async function processHeroImages() {
  console.log('\n🎬 Processing Hero Images...\n')

  const results = []

  // Optimize hero.png to WebP
  const heroPng = path.join(ASSETS_DIR, 'Whity_hero.png')
  try {
    await fs.access(heroPng)
    const heroResult = await optimizeImage(
      heroPng,
      path.join(ASSETS_DIR, 'Whity_hero.webp'),
      { width: 1920, quality: WEBP_QUALITY }
    )
    results.push({ ...heroResult, type: 'hero' })
  } catch (err) {
    console.log('  ⚠️  Whity_hero.png not found, skipping')
  }

  // Optimize hero_2.jpeg to WebP
  const heroJpeg = path.join(ASSETS_DIR, 'Whity_hero_2.jpeg')
  try {
    await fs.access(heroJpeg)
    const heroResult2 = await optimizeImage(
      heroJpeg,
      path.join(ASSETS_DIR, 'Whity_hero_2.webp'),
      { width: 1920, quality: WEBP_QUALITY }
    )
    results.push({ ...heroResult2, type: 'hero-2' })
  } catch (err) {
    console.log('  ⚠️  Whity_hero_2.jpeg not found, skipping')
  }

  return results
}

async function main() {
  console.log('🚀 Starting Image Optimization for Whity Page\n')
  console.log('=' .repeat(60))

  try {
    const galleryResults = await processGalleryImages()
    const heroResults = await processHeroImages()

    const allResults = [...galleryResults, ...heroResults]

    console.log('\n📊 Optimization Results:\n')
    console.log('-'.repeat(80))
    console.log('Type'.padEnd(12) + 'Input'.padEnd(22) + 'Output'.padEnd(28) + 'Size'.padEnd(10) + 'Savings')
    console.log('-'.repeat(80))

    let totalInputSize = 0
    let totalOutputSize = 0

    for (const r of allResults) {
      const inputKB = parseFloat(r.inputSize)
      const outputKB = parseFloat(r.outputSize)
      totalInputSize += inputKB
      totalOutputSize += outputKB

      console.log(
        r.type.padEnd(12) +
        r.input.substring(0, 20).padEnd(22) +
        r.output.substring(0, 26).padEnd(28) +
        (r.inputSize + '→' + r.outputSize).padEnd(10) +
        r.savings
      )
    }

    console.log('-'.repeat(80))
    console.log(`\n✅ Total: ${totalInputSize.toFixed(1)}KB → ${totalOutputSize.toFixed(1)}KB`)
    console.log(`💾 Total Savings: ${((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)}%\n`)

    console.log('=' .repeat(60))
    console.log('\n🎉 Optimization Complete!\n')
    console.log('Next steps:')
    console.log('1. Update GallerySection.vue to use the new optimized images')
    console.log('2. Update HeroSection.vue to use WebP with fallback')
    console.log('3. Run: npm run build:prod\n')

  } catch (error) {
    console.error('❌ Error during optimization:', error)
    process.exit(1)
  }
}

main()
