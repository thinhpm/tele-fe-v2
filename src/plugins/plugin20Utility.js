export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      // 金額に区切りカンマをつける
      addComma (value) {
        return value.toLocaleString()
      },
      setGuideImagesNumber (data) {
        const route = useRoute()
        const images = document.querySelectorAll('img')
        data.imagesNumber = images.length
        images.forEach((image) => {
          image.addEventListener('load', () => {
            data.loadedImagesNumber++
            if (data.loadedImagesNumber !== data.imagesNumber) {
              return
            }
            const hash = route.hash
            if (!(hash && hash.match(/^#.+$/))) {
              return
            }
            const targetElement = document.querySelector(hash)
            targetElement.scrollIntoView({
              behavior: 'smooth',
            })
          })
        })
      },
    },
  }
})
