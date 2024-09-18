export const useAPGLoadingStore = defineStore('APGLoading', () => {
  const _isLoading = ref(false)
  // 500ms以内の false > true > false の変更はローディング出ない
  let isLoading = ref(false)
  isLoading = refDebounced(_isLoading, 500)

  const start = () => {
    isLoading.value = true
    _isLoading.value = true
  }

  const lazyStart = () => {
    _isLoading.value = true
  }

  const finish = () => {
    isLoading.value = false
    _isLoading.value = false
  }

  const lazyFinish = () => {
    _isLoading.value = false
  }

  return { isLoading, start, lazyStart, finish, lazyFinish }
})
