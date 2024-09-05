import { globalMiddleware } from '#build/middleware'

export default defineNuxtPlugin((nuxtApp) => {
  //  初回のアプリケーション初期化

  // nuxtApp.hook('app:beforeMount', () => console.log('app:beforeMount'))
  // nuxtApp.hook('app:created', () => console.log('app:created'))
  // nuxtApp.hook('app:mounted', () => console.log('app:mounted'))
  // nuxtApp.hook('app:rendered', () => console.log('app:rendered'))
  // nuxtApp.hook('app:register', () => console.log('app:register'))
  // nuxtApp.hook('app:start', () => console.log('app:start'))
  // nuxtApp.hook('app:finish', () => console.log('app:finish'))
  // nuxtApp.hook('page:start', () => console.log('page:start'))
  // nuxtApp.hook('app:error', (err) => {
  //   console.log('app:error', err.statusCode)
  // })

  // ミドルウェアフック
  globalMiddleware.unshift((to, from) => {
    console.log('globalMiddleware: hook', to, from)

    const storeAPGRouting = useAPGRoutingStore()
    // nuxt routerでの遷移=trueか、直接読み込みか
    storeAPGRouting.setIsRouteMove(!(to === from))
    // 認証切れのとき戻れるように、ページ遷移先を保存しておく
    storeAPGRouting.setLastFullPath(to.fullPath)
    // スクロール位置復元はデフォルトOFF(topへ)
    storeAPGRouting.setIsUseScrollRestore(false)
  })

  // ページが表示完了したときの共通処理
  nuxtApp.hook('page:finish', (component) => {
    console.log('** page:finish', component)

    const storeAPGRouting = useAPGRoutingStore()
    if (storeAPGRouting.isUseScrollRestore && storeAPGRouting.isRouteMove) {
      console.log('** page:finish: scroll task')
      nextTick(() => {
        //  app/router.scrollBehavior.jsで書き込んだスクロール位置を復元
        const positionY = storeAPGRouting.scrollRestorePositionY
        console.log('positionY', positionY)
        scrollTo(0, positionY)
      })
    } else {
      nextTick(() => {
        scrollTo(0, 0)
      })
    }

    console.log('** page:finish: GTM task')
    nextTick(() => {
      setTimeout(() => {
        nuxtApp.$pushGtmMountedTrigger()
      }, 100)
    })
  })
})
