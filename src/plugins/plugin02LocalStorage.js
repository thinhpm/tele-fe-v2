export default defineNuxtPlugin(() => {
  return {
    provide: {
      // --------------------------------------------------
      // WebStorageのgetItem
      // --------------------------------------------------
      getWebStorageItem (storageType, key) {
        const publicConfig = useRuntimeConfig().public
        let storage
        try {
          storage = window[storageType]
          const fullkey = 'TODO:APG:' + key
          const value = storage.getItem(fullkey)
          return value
        } catch (e) {
          return false
        }
      },
      // --------------------------------------------------
      // WebStorageのsetItem
      // --------------------------------------------------
      setWebStorageItem (storageType, key, value) {
        const publicConfig = useRuntimeConfig().public
        let storage
        try {
          storage = window[storageType]
          const fullkey = 'TODO:APG:' + key
          storage.setItem(fullkey, value)
          return true
        } catch (e) {
          return false
        }
      },
    },
  }
})
