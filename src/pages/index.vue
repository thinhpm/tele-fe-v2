<script setup lang="ts">
const router = useRouter()
const storeIndex = useIndexStore()

onMounted(() => {
  // const ret = useNuxtApp().$MasterApi.masterGet()
  //   .then((value) => {
  //     console.log(value)
  //   })
  // console.log('index: onMounted', ret)
  console.log('index: onMounted')
})

</script>

<template>
  <div class="starter">
    <!-- <Mv />
    <Services />
    <History />
    <FAQ /> -->
    <div className="container GameUserSelect">
      <GameUserSelect />
    </div>
  </div>
</template>


<style>
  .mv img {
    width: 100%;
  }

  .GameUserSelect {
    padding-bottom: 100px;
  }
</style>