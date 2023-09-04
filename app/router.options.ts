import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
}