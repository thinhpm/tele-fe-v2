<script setup lang="ts">
// ------------------------------------------
// props
// ------------------------------------------
interface ErrorPage {
  error: any,
}
const props = withDefaults(defineProps<ErrorPage>(), {
  error: {
    statusCode: 0,
    statusMessage: '',
    data: {
      errorCode: '',
      errorMessage: '',
      errorMessageDetail: '',
    },
  },
})

const route = useRoute()

console.log('error', props.error?.statusCode, props.error?.data)

// ---------------------------------------------------
// data

useHead({
  title: 'エラー',
  meta: [
    {
      name: 'description', content: '',
    },
  ],
})

// ---------------------------------------------------
// computed

const apiCode = computed((): string => {
  return props.error?.data?.errorCode
    ? props.error.data.errorCode
    : ''
})

const errorMessage = computed((): string => {
  if (props.error?.data?.errorCode && props.error?.data?.errorMessage) {
    return props.error.data.errorMessage
  } else if (props.error?.statusCode === 404) {
    return '対象のコンテンツは存在しません'
  } else if (props.error?.statusMessage) {
    return props.error.statusMessage
  } else {
    return '不明なエラーです'
  }
})

const errorMessageDetail = computed((): string => {
  if (props.error?.data?.errorCode && props.error?.data?.errorMessageDetail) {
    return props.error.data.errorMessageDetail
  } else if (props.error?.statusCode === 404) {
    return 'ページが存在しない、またはページが削除された可能性があります。'
  } else {
    return ''
  }
})

onMounted(() => {
})
</script>

<template>
  <NuxtLayout>
    <div class="p-errorPage">
      <ErrorPageContent
        v-bind:status-code="error?.statusCode"
        v-bind:api-code="apiCode"
        v-bind:message="errorMessage"
        v-bind:message-detail="errorMessageDetail"
      />
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
</style>
