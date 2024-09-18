<template>
  <main class="base">
    <div class="base__body">
      <Header />
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup>

const nuxtApp = useNuxtApp()
const publicConfig = useRuntimeConfig().public
const route = useRoute()
const router = useRouter()

const indexStore = useIndexStore()

import Header from '~/layouts/Header/Header.vue';

// ---------------------------------------------------
// computed

const isContentLoaded = computed(() => indexStore.isContentLoaded)

// ---------------------------------------------------
// method

</script>

<style lang="scss" scoped>
</style>
