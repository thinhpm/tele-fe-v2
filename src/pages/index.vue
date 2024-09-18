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

import Services from '~/layouts/Services/Services.vue';
import History from '~/layouts/History/History.vue';
import Mv from '~/layouts/Mv.vue';
import FAQ from '@/components/FAQ.vue';
// import GameUserLayout from '~/layouts/GameAccountSelect.vue';
import GameUserSelect from '~/layouts/GameAccountSelect.vue'


</script>

<template>
  <div class="starter">
    <Mv />
    <!-- <Services />
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