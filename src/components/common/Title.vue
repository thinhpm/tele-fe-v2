<!-- components/common/Title.vue -->
<template>
  <component :is="tag" :class="className">{{ text }}</component>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: 'h2',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  }
})
</script>

<style scoped>
</style>