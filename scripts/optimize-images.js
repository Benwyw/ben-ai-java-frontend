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

  if (images.length === 0) {
    console.log('  ℹ️  No new images to process (only WebP files found)')
    return []
  }

  const results = []
  const filesToDelete = []

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

    // Mark original for deletion after successful conversion
    filesToDelete.push(inputPath)
  }

  // Delete original files after all conversions succeed
  if (filesToDelete.length > 0) {
    console.log('\n🗑️  Cleaning up original files...\n')
    for (const file of filesToDelete) {
      await fs.unlink(file)
      console.log(`  Deleted: ${path.basename(file)}`)
    }
  }

  return results
}

async function processHeroImages() {
  console.log('\n🎬 Processing Hero Images...\n')

  const results = []

  // Helper to check if conversion needed
  async function needsConversion(srcPath, destPath) {
    try {
      await fs.access(srcPath)
      const srcStat = await fs.stat(srcPath)
      try {
        const destStat = await fs.stat(destPath)
        // Skip if WebP exists and is newer than source
        return srcStat.mtime > destStat.mtime
      } catch {
        // WebP doesn't exist, needs conversion
        return true
      }
    } catch {
      // Source doesn't exist
      return false
    }
  }

  // Optimize hero.png to WebP
  const heroPng = path.join(ASSETS_DIR, 'Whity_hero.png')
  const heroWebp = path.join(ASSETS_DIR, 'Whity_hero.webp')
  if (await needsConversion(heroPng, heroWebp)) {
    const heroResult = await optimizeImage(
      heroPng,
      heroWebp,
      { width: 1920, quality: WEBP_QUALITY }
    )
    results.push({ ...heroResult, type: 'hero' })
  } else {
    console.log('  ⏭️  Whity_hero.webp is up to date, skipping')
  }

  // Optimize hero_2.jpeg to WebP
  const heroJpeg = path.join(ASSETS_DIR, 'Whity_hero_2.jpeg')
  const hero2Webp = path.join(ASSETS_DIR, 'Whity_hero_2.webp')
  if (await needsConversion(heroJpeg, hero2Webp)) {
    const heroResult2 = await optimizeImage(
      heroJpeg,
      hero2Webp,
      { width: 1920, quality: WEBP_QUALITY }
    )
    results.push({ ...heroResult2, type: 'hero-2' })
  } else {
    console.log('  ⏭️  Whity_hero_2.webp is up to date, skipping')
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

    if (allResults.length === 0) {
      console.log('\n✅ All images are already optimized. Nothing to do.\n')
      console.log('To add new photos:')
      console.log('1. Add .jpg/.jpeg/.png files to src/assets/cat/gallery/')
      console.log('2. Run: npm run optimize:images\n')
      return
    }

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

    if (allResults.length === 0) {
      console.log('No new images were processed.')
      console.log('Add new .jpg/.jpeg/.png files to src/assets/cat/gallery/ and run again.\n')
    } else {
      console.log('Original files have been deleted. Only optimized WebP files remain.\n')
    }

  } catch (error) {
    console.error('❌ Error during optimization:', error)
    process.exit(1)
  }
}

main()
