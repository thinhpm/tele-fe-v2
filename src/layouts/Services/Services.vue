<template>
  <section class="services" id="services">
    <div class="container">
      <Title text="Services" className="ttl_section" tag="h2" />

      <div class="services_ctn">
        <ItemServices
          v-for="service in services"
          :key="service.id"
          :iconSrc="service.iconSrc"
          :title="service.title"
          :description="service.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import Title from '~/components/common/Title.vue'
import ItemServices from './ItemServices.vue'
import servicesData from '~/assets/data/services.json'

const services = servicesData.services;
</script>

<style scoped>
</style>
