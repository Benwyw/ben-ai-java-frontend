import axios from '@/plugins/axios'

/**
 * Content API - Dynamic content generation endpoints
 * These endpoints should return auto-generated/aggregated content from your Spring Boot backend
 */

/**
 * Get daily digest - aggregated stats and highlights
 * Backend should compile: Discord stats, bot usage, user activity, etc.
 */
export async function getDailyDigest () {
  const response = await axios.get('/content/daily-digest')
  return response.data
}

/**
 * Get rotating tips/facts - different content each day
 * Backend rotates through a pool of tips based on day of year
 */
export async function getDailyTip () {
  const response = await axios.get('/content/daily-tip')
  return response.data
}

/**
 * Get trending/popular stats
 * Backend aggregates: most used commands, active channels, etc.
 */
export async function getTrendingStats () {
  const response = await axios.get('/content/trending')
  return response.data
}

/**
 * Get recent changelog/updates
 * Backend can auto-pull from git commits or manual entries
 */
export async function getChangelog (limit = 5) {
  const response = await axios.get('/content/changelog', {
    params: { limit },
  })
  return response.data
}

/**
 * Get quote of the day
 * Backend rotates through quotes or fetches from external API
 */
export async function getQuoteOfDay () {
  const response = await axios.get('/content/quote')
  return response.data
}

/**
 * Get Discord server stats
 * Real-time stats from your Discord JDA backend
 */
export async function getDiscordStats () {
  const response = await axios.get('/content/discord-stats')
  return response.data
}

/**
 * Get featured content - curated or auto-selected highlights
 */
export async function getFeaturedContent () {
  const response = await axios.get('/content/featured')
  return response.data
}

/**
 * Get activity feed - recent events across the platform
 */
export async function getActivityFeed (limit = 10) {
  const response = await axios.get('/content/activity', {
    params: { limit },
  })
  return response.data
}
