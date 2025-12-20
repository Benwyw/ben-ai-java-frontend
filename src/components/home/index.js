/**
 * Home page components barrel export
 *
 * This file provides a centralized export for all Home page section components.
 * Import components from here for cleaner imports in the main Home.vue file.
 *
 * Usage:
 *   import { HeroSection, StatsSection, QuickActionsSection, FeaturesSection } from '@/components/home'
 *
 * To add a new section:
 *   1. Create a new .vue file in this folder (e.g., NewSection.vue)
 *   2. Export it from this index.js file
 *   3. Import and use it in Home.vue
 */

import HeroSection from './HeroSection.vue'
import StatsSection from './StatsSection.vue'
import QuickActionsSection from './QuickActionsSection.vue'
import FeaturesSection from './FeaturesSection.vue'

export {
  HeroSection,
  StatsSection,
  QuickActionsSection,
  FeaturesSection
}
