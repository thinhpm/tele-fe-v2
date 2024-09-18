<template>
  <div class="services_box">
    <div class="services_box_icon">
      <span class="icon">
        <img :src="iconSrc" alt="Service Icon">
      </span>
    </div>
    <div class="services_box_name">
      <div class="name">
        <h4>{{ title }}</h4>
      </div>
    </div>
    <div class="services_box_des">
      <div class="description">{{ description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ItemServices',
    props: {
      iconSrc: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style scoped>
</style>
