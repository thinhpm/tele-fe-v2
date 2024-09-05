export default defineNuxtPlugin((nuxtApp) => {
  const fakeBasicAuth = () => {
    const publicConfig = useRuntimeConfig().public
    const setUserId = publicConfig.basicAuthName
    const setPass = publicConfig.basicAuthPass
    const whiteURL = ['192.168.86.87:3000', 'example.com']

    const htmlElStyle = document.querySelector('html').style
    htmlElStyle.opacity = 0

    let authenticated = useNuxtApp().$getWebStorageItem('localStorage', 'previewAuthenticated')
    const localExpire = useNuxtApp().$getWebStorageItem('localStorage', 'previewExpire')

    const date = new Date()
    const nowUnix = Math.floor(date.getTime() / 1000)
    const expire = nowUnix + 31536000

    if (localExpire !== null && localExpire <= nowUnix) {
      authenticated = false
      useNuxtApp().$setWebStorageItem('localStorage', 'previewAuthenticated', authenticated)
    }

    if (location.href && !location.href.match(/preview/)) {
      htmlElStyle.opacity = 1
      return
    }

    if (whiteURL.includes(location.host)) {
      htmlElStyle.opacity = 1
      return
    }
    if (authenticated) {
      htmlElStyle.opacity = 1
      return
    }

    window.setTimeout(() => {
      const userId = window.prompt('IDを入力してください', '')
      if (userId === setUserId) {
        const password = window.prompt('パスワードを入力してください', '')
        if (password === setPass) {
          useNuxtApp().$setWebStorageItem('localStorage', 'previewExpire', expire)
          useNuxtApp().$setWebStorageItem('localStorage', 'previewAuthenticated', true)
          htmlElStyle.opacity = 1
        } else {
          htmlElStyle.opacity = 0
          htmlElStyle.pointerEvents = 'none'
          window.alert('パスワードが違います')
        }
      } else {
        htmlElStyle.opacity = 0
        htmlElStyle.pointerEvents = 'none'
        window.alert('IDが違います')
      }
    }, 500)
  }
  fakeBasicAuth()
})
