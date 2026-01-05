import { onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
import * as contentApi from '@/api/content'

/**
 * Composable for managing dynamic content with auto-refresh
 *
 * Features:
 * - Auto-fetches content on mount
 * - Optional auto-refresh at specified intervals
 * - Loading and error states
 * - Manual refresh capability
 *
 * @param {Object} options
 * @param {boolean} options.autoRefresh - Enable auto-refresh (default: false)
 * @param {number} options.refreshInterval - Refresh interval in ms (default: 300000 = 5 min)
 * @param {boolean} options.fetchOnMount - Fetch content on mount (default: true)
 * @param {boolean} options.useMockData - Use mock data instead of API (default: false)
 */
export function useDynamicContent (options = {}) {
  const {
    autoRefresh = false,
    refreshInterval = 300_000, // 5 minutes
    fetchOnMount = true,
    useMockData = true, // Set to true for preview without backend
  } = options

  const state = reactive({
    dailyTip: null,
    discordStats: null,
    changelog: [],
    quote: null,
    trending: [],
    activities: [],
    loading: {
      tip: false,
      stats: false,
      changelog: false,
      quote: false,
      trending: false,
      activities: false,
    },
    errors: {
      tip: null,
      stats: null,
      changelog: null,
      quote: null,
      trending: null,
      activities: null,
    },
  })

  let refreshTimers = []

  // ═══════════════════════════════════════════════════════════════
  // MOCK DATA for preview without backend
  // ═══════════════════════════════════════════════════════════════
  function getMockData () {
    return {
      tip: getFallbackTip(),
      stats: {
        serverCount: 42,
        totalUsers: 12_847,
        commandsToday: 1523,
        uptime: '99.9%',
      },
      changelog: [
        { type: 'feature', title: 'New Dashboard Design', description: 'Completely redesigned home page with dynamic content', date: '2026-01-05' },
        { type: 'improvement', title: 'WebSocket Performance', description: 'Improved real-time messaging latency by 40%', date: '2026-01-03' },
        { type: 'fix', title: 'Auth Token Refresh', description: 'Fixed token refresh race condition', date: '2026-01-02' },
        { type: 'feature', title: 'Weight Tracking Charts', description: 'Added beautiful chart visualizations', date: '2025-12-28' },
        { type: 'security', title: 'Security Update', description: 'Updated dependencies to patch vulnerabilities', date: '2025-12-25' },
      ],
      quote: getFallbackQuote(),
      trending: [
        { name: '/help', count: 2847, unit: 'uses', trend: 'up', change: 15 },
        { name: '/play', count: 1923, unit: 'uses', trend: 'up', change: 8 },
        { name: '/stats', count: 1456, unit: 'uses', trend: 'down', change: -3 },
        { name: '/weight', count: 892, unit: 'uses', trend: 'up', change: 22 },
        { name: '/remind', count: 567, unit: 'uses', trend: 'neutral', change: 0 },
      ],
      activities: [
        { type: 'command', title: 'Command Executed', description: 'User123 used /help in #general', timestamp: new Date(Date.now() - 120_000).toISOString() },
        { type: 'user', title: 'New Member', description: 'JohnDoe joined the server', timestamp: new Date(Date.now() - 300_000).toISOString() },
        { type: 'message', title: 'Message Milestone', description: 'Server reached 100,000 messages!', timestamp: new Date(Date.now() - 600_000).toISOString() },
        { type: 'system', title: 'Bot Restarted', description: 'Scheduled maintenance completed', timestamp: new Date(Date.now() - 3_600_000).toISOString() },
        { type: 'weight', title: 'Weight Logged', description: 'Whity logged new weight entry', timestamp: new Date(Date.now() - 7_200_000).toISOString() },
      ],
    }
  }

  // Load mock data immediately
  function loadMockData () {
    const mock = getMockData()
    state.dailyTip = mock.tip
    state.discordStats = mock.stats
    state.changelog = mock.changelog
    state.quote = mock.quote
    state.trending = mock.trending
    state.activities = mock.activities
  }

  // Individual fetch functions with error handling
  async function fetchDailyTip () {
    if (useMockData) {
      state.dailyTip = getFallbackTip()
      return
    }
    state.loading.tip = true
    state.errors.tip = null
    try {
      state.dailyTip = await contentApi.getDailyTip()
    } catch (error) {
      console.warn('Failed to fetch daily tip:', error.message)
      state.errors.tip = error.message
      // Fallback content
      state.dailyTip = getFallbackTip()
    } finally {
      state.loading.tip = false
    }
  }

  async function fetchDiscordStats () {
    if (useMockData) {
      state.discordStats = getMockData().stats
      return
    }
    state.loading.stats = true
    state.errors.stats = null
    try {
      state.discordStats = await contentApi.getDiscordStats()
    } catch (error) {
      console.warn('Failed to fetch Discord stats:', error.message)
      state.errors.stats = error.message
      state.discordStats = null
    } finally {
      state.loading.stats = false
    }
  }

  async function fetchChangelog () {
    if (useMockData) {
      state.changelog = getMockData().changelog
      return
    }
    state.loading.changelog = true
    state.errors.changelog = null
    try {
      state.changelog = await contentApi.getChangelog()
    } catch (error) {
      console.warn('Failed to fetch changelog:', error.message)
      state.errors.changelog = error.message
      state.changelog = []
    } finally {
      state.loading.changelog = false
    }
  }

  async function fetchQuote () {
    if (useMockData) {
      state.quote = getFallbackQuote()
      return
    }
    state.loading.quote = true
    state.errors.quote = null
    try {
      state.quote = await contentApi.getQuoteOfDay()
    } catch (error) {
      console.warn('Failed to fetch quote:', error.message)
      state.errors.quote = error.message
      // Fallback quote
      state.quote = getFallbackQuote()
    } finally {
      state.loading.quote = false
    }
  }

  async function fetchTrending () {
    if (useMockData) {
      state.trending = getMockData().trending
      return
    }
    state.loading.trending = true
    state.errors.trending = null
    try {
      state.trending = await contentApi.getTrendingStats()
    } catch (error) {
      console.warn('Failed to fetch trending:', error.message)
      state.errors.trending = error.message
      state.trending = []
    } finally {
      state.loading.trending = false
    }
  }

  async function fetchActivities () {
    if (useMockData) {
      state.activities = getMockData().activities
      return
    }
    state.loading.activities = true
    state.errors.activities = null
    try {
      state.activities = await contentApi.getActivityFeed()
    } catch (error) {
      console.warn('Failed to fetch activities:', error.message)
      state.errors.activities = error.message
      state.activities = []
    } finally {
      state.loading.activities = false
    }
  }

  // Fetch all content
  async function fetchAll () {
    await Promise.allSettled([
      fetchDailyTip(),
      fetchDiscordStats(),
      fetchChangelog(),
      fetchQuote(),
      fetchTrending(),
      fetchActivities(),
    ])
  }

  // Fallback content generators (client-side, rotates daily)
  function getFallbackTip () {
    const tips = [
      { content: 'Use /help to see all available bot commands!' },
      { content: 'You can customize your dashboard in the settings.' },
      { content: 'Join our Discord server for support and updates.' },
      { content: 'Check out the API documentation for integration options.' },
      { content: 'Track your progress with the weight tracker feature.' },
      { content: 'Enable notifications to stay updated on new features.' },
      { content: 'Use keyboard shortcuts for faster navigation.' },
    ]
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86_400_000)
    return tips[dayOfYear % tips.length]
  }

  function getFallbackQuote () {
    const quotes = [
      { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
      { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
      { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
      { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
      { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
      { text: 'Any fool can write code that a computer can understand.', author: 'Martin Fowler' },
      { text: 'Programming is the art of telling another human what one wants the computer to do.', author: 'Donald Knuth' },
    ]
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86_400_000)
    return quotes[dayOfYear % quotes.length]
  }

  // Setup auto-refresh
  function setupAutoRefresh () {
    if (!autoRefresh || useMockData) {
      return
    }

    const timer = setInterval(fetchAll, refreshInterval)
    refreshTimers.push(timer)
  }

  // Cleanup
  function cleanup () {
    for (const timer of refreshTimers) {
      clearInterval(timer)
    }
    refreshTimers = []
  }

  // Lifecycle
  onMounted(() => {
    if (useMockData) {
      // Load mock data immediately for preview
      loadMockData()
    } else if (fetchOnMount) {
      fetchAll()
    }
    setupAutoRefresh()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    ...toRefs(state),
    fetchDailyTip,
    fetchDiscordStats,
    fetchChangelog,
    fetchQuote,
    fetchTrending,
    fetchActivities,
    fetchAll,
  }
}

/**
 * Simple composable for a single content type
 * Useful when you only need one type of dynamic content
 */
export function useDailyTip () {
  const tip = ref(null)
  const loading = ref(false)

  async function fetch () {
    loading.value = true
    try {
      tip.value = await contentApi.getDailyTip()
    } catch {
      // Fallback
      const tips = [
        { content: 'Use /help to see all available bot commands!' },
        { content: 'You can customize your dashboard in the settings.' },
        { content: 'Join our Discord server for support and updates.' },
      ]
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86_400_000)
      tip.value = tips[dayOfYear % tips.length]
    } finally {
      loading.value = false
    }
  }

  onMounted(fetch)

  return { tip, loading, refresh: fetch }
}
