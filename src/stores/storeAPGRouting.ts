export const useAPGRoutingStore = defineStore('APGRouting', {
  state: () => ({
    isRouteMove: false,
    lastFullPath: '',
    scrollRestorePositionY: 0,
    isUseScrollRestore: false,
  }),

  getters: {
  },

  actions: {
    setScrollRestorePositionY (y) {
      this.scrollRestorePositionY = y
    },
    setIsRouteMove (val) {
      this.isRouteMove = val
    },
    setLastFullPath (path) {
      console.log('setLastFullPath', path)
      this.lastFullPath = path
      // リダイレクトする認証もあるので、LSに保存しておく
      useNuxtApp().$setWebStorageItem('localStorage', 'lastFullPath', path)
    },
    setIsUseScrollRestore (bUse) {
      this.isUseScrollRestore = bUse
    },
  },
})
