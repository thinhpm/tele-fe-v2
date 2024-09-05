<template>
  <header :class="['header', { active: isHeaderActive }]" id="header">
    <div class="container">
      <div class="header_ctn">
        <Logo />
        <Nav />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Logo from '~/layouts/Logo.vue';
import Nav from '~/layouts/Header/Nav/Nav.vue';

const isHeaderActive = ref(false);

const handleScroll = () => {
  isHeaderActive.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>