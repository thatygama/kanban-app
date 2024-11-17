<template>
  <div class="not-found">
    <h1>Página não encontrada :(</h1>
    <p>Você será redirecionado para a página inicial em {{ countdown }} segundos...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 5,
    };
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown -= 1;
      } else {
        clearInterval(interval);
        this.$router.push('/');
      }
    }, 5000);
  },
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
