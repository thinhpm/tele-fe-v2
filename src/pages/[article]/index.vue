<script setup lang="ts">
const storeKjdsCore = useStoreKjdsCore()
const kjdsPageConfig = storeKjdsCore.getCurrentPageConfig()
const pageData = {
  category: [],
  items: [],
}

const initPage = async () => {
  const [resCateogry, resList] = await Promise.all([
    storeKjdsCore.fetchCategories({ articleTypeSlug: kjdsPageConfig.articleTypeSlug }),
    storeKjdsCore.fetchList(kjdsPageConfig.mainListName),
    // storeKjdsCore.fetchSlider(kjdsPageConfig.mainSliderSlug),
    // storeKjdsCore.fetchTags(),
  ])
  console.log('article: initPage', resCateogry, resList)
  pageData.category = resCateogry.data.data.Categories
  pageData.items = resList.data.data.articles
  console.log('article: initPage', pageData)
}
await initPage()

onMounted(() => {
  console.log('index: onMounted')
})
</script>

<template>
  <div class="p-page">
    <h1 class="c-head1">
      Article List Page in APG-Play
    </h1>
    <NuxtLink
      to="?page=2"
    >
      ページャ2テスト
    </NuxtLink>
    <br>
    <h2 class="c-head2">
      kjdsPageConfig
    </h2>
    <pre>
      {{ kjdsPageConfig }}
    </pre>
    <br>
    <h2 class="c-head2">
      category
    </h2>
    {{ pageData.category }}
    <br>
    <h2 class="c-head2">
      mainList の articles
    </h2>
    <div
      v-for="item in pageData.items"
      v-bind:key="item.id"
    >
      <NuxtLink
        v-bind:to="{ name: 'article-slug', params: { article: useRoute().params.article, slug: item.articleSlug } }"
      >
        {{ item.articleSlug }}: {{ item.title }}
      </NuxtLink>
    </div>
    <br>
    <br>
    {{ pageData.items }}
  </div>
</template>
