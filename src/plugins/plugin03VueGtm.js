import { useGtm, createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  const publicConfig = useRuntimeConfig().public
  const route = useRoute()
  console.log('pluginVueGtm: init', publicConfig.gtmId)

  if (publicConfig.gtmId) {
    nuxtApp.vueApp.use(createGtm({
      id: publicConfig.gtmId,
      defer: true,
      debug: true,
      vueRouter: null,
    }))
  }

  return {
    provide: {
      gtmEvent (params) {
        const gtm = useGtm()
        if (gtm) {
          gtm.trackEvent(
            params,
          )
        }
      },
      pushGtmMountedTrigger () {
        const pageTitle = (typeof document !== 'undefined' && document.title) || ''
        const gtm = useGtm()
        console.log('pluginVueGtm: pushGtmMountedTrigger', gtm, pageTitle)
        if (gtm) {
          gtm.trackEvent({
            event: 'NuxtPageReady',
            pageUrl: publicConfig.chainPath + route.fullPath,
            routeName: route.name,
            pageTitle: (typeof document !== 'undefined' && document.title) || '',
          })
        }
      },
    },
  }
})
