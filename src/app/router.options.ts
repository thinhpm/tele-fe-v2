import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  // nuxt3 bug ?key=value valueが 123%3d456 だと 123=456 と勝手にデコードされる問題
  stringifyQuery: (query) => {
    const keys = Object.keys(query)
    return keys.map((key) => `${key}=${encodeURIComponent(query[key] as string)}`).join('&')
  },
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      useAPGRoutingStore().setScrollRestorePositionY(savedPosition.top)
    } else {
      useAPGRoutingStore().setScrollRestorePositionY(0)
    }
  },
}
