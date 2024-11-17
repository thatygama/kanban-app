<template>
  <div>
    <Header v-if="showHeader" />
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
  computed: {
    showHeader() {
      return this.$route.meta.middleware === 'auth';
    },
  },
};
</script>
