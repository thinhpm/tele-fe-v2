<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  faqs: Array<{ question: string; answer: string }>
}>()

const openIndex = ref(-1)

const toggleAnswer = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <div class="faq-list">
    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <div class="faq-question" @click="toggleAnswer(index)">
        {{ faq.question }}
      </div>
      <div v-if="openIndex === index" class="faq-answer">
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>