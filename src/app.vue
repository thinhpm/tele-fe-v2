<template>
  <div>
    <APGLoading />
    <NuxtLayout>
      <!-- key=route.fullPath > queryやhashで再レンダーさせる(デフォルトではしないので) -->
      <NuxtPage
        v-bind:page-key="route => route.fullPath"
      />
    </NuxtLayout>
  </div>
</template>
