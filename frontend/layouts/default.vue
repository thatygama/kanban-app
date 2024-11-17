<template>
  <div>
    <Header v-if="showHeader" />
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { publicRoutes } from '@/config';

export default {
  components: {
    Header,
  },
  computed: {
    showHeader() {
      return !publicRoutes.some(el => el === this.$route.path);
    },
  },
};
</script>
