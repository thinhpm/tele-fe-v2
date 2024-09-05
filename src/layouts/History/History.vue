<template>
  <section class="history" id="history">
    <div class="container">
      <Title text="History" className="ttl_section" tag="h2" />
      <p className="sub_ttl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
      <div className="history_stage">
        <div className="history_guide js-history-guide"></div>
        <div class="history_list">
          <ItemHistory
            v-for="history in historys"
            :key="history.id"
            :imageSrc="history.imageSrc"
            :imageAlt="history.imageAlt"
            :imageWidth="history.imageWidth"
            :imageHeight="history.imageHeight"
            :year="history.year"
            :text="history.text"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Title from '~/components/common/Title.vue';
  import ItemHistory from './ItemHistory.vue';
  import historyData from '~/assets/data/history.json';

  const historys = historyData.historys;
</script>
