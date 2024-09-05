export const useIndexStore = defineStore('index', {
  state: () => ({
    isContentLoaded: false,
    isRouteMove: false,
    expire: '',
    pagePath: '',
    positionY: 0,
    lastFullPath: '',
    isUseScrollRestore: false,
  }),

  getters: {
    getTest (state) {
      return 'test'
    },
  },

  actions: {
    setPositionY (y) {
      this.positionY = y
    },
    setIsContentLoaded (flag) {
      this.isContentLoaded = flag
    },
    setPagePath () {
      this.pagePath = location.pathname
    },
    setIsRouteMove (val) {
      this.isRouteMove = val
    },
    setLastFullPath (path) {
      console.log('setLastFullPath', path)
      this.lastFullPath = path
      useNuxtApp().$setWebStorageItem('localStorage', 'lastFullPath', path)
    },
    setIsUseScrollRestore (bUse) {
      this.isUseScrollRestore = bUse
    },
  },
})
