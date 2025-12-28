/**
 * NoteFormat page components barrel export
 *
 * This file provides a centralized export for all NoteFormat page section components.
 * Import components from here for cleaner imports in the main NoteformatLanding.vue file.
 *
 * Usage:
 *   import { HeroSection, StatsSection, QuickActionsSection, FeaturesSection } from '@/components/noteformat'
 *
 * To add a new section:
 *   1. Create a new .vue file in this folder (e.g., NewSection.vue)
 *   2. Export it from this index.js file
 *   3. Import and use it in NoteformatLanding.vue
 */

export { default as FeaturesSection } from './FeaturesSection.vue'
export { default as HeroSection } from './HeroSection.vue'
export { default as QuickActionsSection } from './QuickActionsSection.vue'
export { default as StatsSection } from './StatsSection.vue'
