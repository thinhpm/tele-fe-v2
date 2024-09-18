<script setup lang="ts">
const storeKjdsCore = useStoreKjdsCore()
const kjdsPageConfig = storeKjdsCore.getCurrentPageConfig()
const pageData = {
  item: {
    article: {},
    extend: {} as any,
  },
  eyeCatch: {} as any,
}

const initPage = async () => {
  const [resDetail] = await Promise.all([
    storeKjdsCore.fetchDetail(),
  ])
  console.log('article detail: initPage', resDetail)
  pageData.item.article = resDetail.data.data.article
  pageData.eyeCatch = storeKjdsCore.getImgInfoByEyeCatch(pageData.item.article, 'l') || {}
}
await initPage()

onMounted(() => {
  console.log('index: onMounted')
})
</script>

<template>
  <div class="p-page">
    <h1 class="c-head1">
      Article Detail Page in APG-PLAY
    </h1>
    <h2 class="c-head2">
      kjdsPageConfig.detailTitle
    </h2>
    {{ kjdsPageConfig.detailTitle }}
    <br>
    <h2 class="c-head2">
      eyeCatch
    </h2>
    <img
      v-if="pageData.eyeCatch?.url"
      v-bind:src="pageData.eyeCatch.url"
    >
    <br>
    <pre>
      {{ pageData.item }}
    </pre>
  </div>
</template>
