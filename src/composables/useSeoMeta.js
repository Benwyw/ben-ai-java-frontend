/**
 * SEO Meta Composable
 *
 * Provides dynamic SEO meta tag management for Vue Router routes.
 * Handles Open Graph, Twitter Cards, and structured data for better search visibility.
 *
 * Usage in router afterEach:
 *   import { updateSeoMeta } from '@/composables/useSeoMeta'
 *   router.afterEach(to => updateSeoMeta(to.meta, to.path, to.matched))
 */

const CANONICAL_ORIGIN = 'https://www.benwyw.com'
const DEFAULT_IMAGE = 'https://www.benwyw.com/Benwyw-1024.png'

/**
 * Resolve the SEO image by checking the current route's meta,
 * then falling back to parent routes' seoImage, and finally the default.
 *
 * @param {Object} meta - Current route's meta object
 * @param {Array} matched - Array of matched route records (from to.matched)
 * @returns {string} The resolved image URL
 */
function resolveImage (meta, matched = []) {
  // If current route has seoImage, use it
  if (meta.seoImage) {
    return meta.seoImage
  }

  // Walk up the matched routes (from most specific to least) to find a parent's seoImage
  // matched is ordered from parent to child, so we reverse to check child's parent first
  for (let i = matched.length - 2; i >= 0; i--) {
    const parentMeta = matched[i]?.meta
    if (parentMeta?.seoImage) {
      return parentMeta.seoImage
    }
  }

  // Fall back to default site image
  return DEFAULT_IMAGE
}

/**
 * Update or create a meta tag by name attribute
 */
function upsertMeta (name, content) {
  if (!content) return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.append(el)
  }
  el.setAttribute('content', content)
}

/**
 * Update or create a meta tag by property attribute (for OG tags)
 */
function upsertMetaProperty (property, content) {
  if (!content) return
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.append(el)
  }
  el.setAttribute('content', content)
}

/**
 * Update or create a link tag
 */
function upsertLink (rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.append(el)
  }
  el.setAttribute('href', href)
}

/**
 * Update or insert page-specific JSON-LD structured data
 */
function upsertJsonLd (id, data) {
  if (!data) return
  let el = document.querySelector(`script[data-seo-id="${id}"]`)
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', 'application/ld+json')
    el.setAttribute('data-seo-id', id)
    document.head.append(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Remove page-specific JSON-LD structured data
 */
function removeJsonLd (id) {
  const el = document.querySelector(`script[data-seo-id="${id}"]`)
  if (el) el.remove()
}

/**
 * Update all SEO meta tags based on route meta
 *
 * @param {Object} meta - Route meta object
 * @param {string} meta.seoTitle - Page title for SEO
 * @param {string} meta.seoDescription - Page description for SEO
 * @param {string} meta.canonicalPath - Canonical URL path
 * @param {string} meta.seoImage - Open Graph image URL (optional, inherits from parent if not set)
 * @param {string} meta.seoKeywords - SEO keywords (optional)
 * @param {string} meta.robots - Robots directive (optional)
 * @param {string} meta.ogType - Open Graph type (default: 'website')
 * @param {Object} meta.structuredData - Page-specific JSON-LD data (optional)
 * @param {string} path - Current route path
 * @param {Array} matched - Array of matched route records for image inheritance
 */
export function updateSeoMeta (meta = {}, path = '/', matched = []) {

  const title = meta.seoTitle || meta.title || 'Benwyw'
  const description = meta.seoDescription || 'Benwyw personal website with projects, tools, and documentation.'
  const canonicalPath = meta.canonicalPath || path
  const fullUrl = `${CANONICAL_ORIGIN}${canonicalPath}`
  const image = resolveImage(meta, matched)
  const keywords = meta.seoKeywords || ''
  const ogType = meta.ogType || 'website'

  // Update document title
  document.title = title

  // Primary meta tags
  upsertMeta('title', title)
  upsertMeta('description', description)
  if (keywords) upsertMeta('keywords', keywords)
  if (meta.robots) upsertMeta('robots', meta.robots)

  // Canonical link
  upsertLink('canonical', fullUrl)

  // Open Graph meta tags
  upsertMetaProperty('og:type', ogType)
  upsertMetaProperty('og:url', fullUrl)
  upsertMetaProperty('og:title', title)
  upsertMetaProperty('og:description', description)
  upsertMetaProperty('og:image', image)
  upsertMetaProperty('og:site_name', 'Benwyw')
  upsertMetaProperty('og:locale', 'en_US')

  // Twitter Card meta tags
  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:url', fullUrl)
  upsertMeta('twitter:title', title)
  upsertMeta('twitter:description', description)
  upsertMeta('twitter:image', image)

  // Handle page-specific structured data
  if (meta.structuredData) {
    upsertJsonLd('page-specific', meta.structuredData)
  } else {
    removeJsonLd('page-specific')
  }
}

/**
 * Generate BreadcrumbList structured data for a page
 */
export function generateBreadcrumbData (items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${CANONICAL_ORIGIN}${item.url}` : undefined,
    })),
  }
}

/**
 * Generate FAQPage structured data
 */
export function generateFaqData (faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate HowTo structured data (for tutorials)
 */
export function generateHowToData (title, description, steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export default {
  updateSeoMeta,
  generateBreadcrumbData,
  generateFaqData,
  generateHowToData,
}
