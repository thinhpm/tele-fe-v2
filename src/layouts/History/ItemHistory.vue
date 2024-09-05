<template>
	<div className="history_item">
    <figure className="history_image">
      <img :src="imageSrc" :alt="imageAlt">
    </figure>
    <div className="history_body">
      <p className="year js-history-trigger active">{{ year }}</p>
      <div className="text" v-html="text"></div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ItemHistory',
    props: {
      year: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      imageSrc: {
        type: String,
        required: true,
      },
      imageAlt: {
        type: String,
        required: true,
      },
      imageWidth: {
        type: Number,
        required: true,
      },
      imageHeight: {
        type: Number,
        required: true,
      }
    },
  }
</script>

<style scoped>
</style>
