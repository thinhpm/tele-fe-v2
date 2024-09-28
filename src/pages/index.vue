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
import GameUserSelect from '~/layouts/GameAccountSelect.vue'

</script>

<template>
  <div class="starter">
    <div className="container GameUserSelect">
      <GameUserSelect />
    </div>
  </div>
</template>


<style>
.header {
  display: none;
}

.mv img {
  width: 100%;
}

.GameUserSelect {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>