<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
const router = useRouter()
const storeIndex = useIndexStore()

async function initPage () {
  // スクロール位置復元
  useAPGRoutingStore().setIsUseScrollRestore(true)
  await promiseTimeout(1000)
}
await initPage()

onMounted(() => {
  console.log('Sample2: onMounted')
})
</script>

<template>
  <div class="p-pageSample2">
    <h1>Sample2 Page</h1>
    <div class="p-pageSample2_list">
      <div
        v-for="index of 10"
        v-bind:key="index"
        class="p-pageSample2_list_item"
      >
        <h2>item-{{ index }}</h2>
        <NuxtLink
          v-bind:to="'/sample2/' + index"
        >
          詳細
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-pageSample2 {
  h1 {
    font-size: 30px;
    font-weight: bold;
  }

  &_list {
    margin: 20px 40px;
    padding: 20px;
    background-color: #f2f2f2;

    &_item {
      width: 100%;
      height: 250px;
      margin-bottom: 15px;
      border-radius: 4px;
      background-color: #fff;
    }
  }
}
</style>
