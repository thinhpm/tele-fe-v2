<script setup lang="ts">
import { ref } from 'vue'
import faqData from '~/assets/data/faq.json'
import Title from '~/components/common/Title.vue'
import FAQList from '~/components/FAQList.vue'

const show = ref(false)
const faqs = ref(faqData.faqs)
</script>

<template>
  <div class="faq-container">
    <Title text="FAQ" className="ttl_section" tag="h2" />
    <FAQList :faqs="faqs" />
  </div>
</template>
