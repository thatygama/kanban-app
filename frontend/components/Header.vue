<template>
  <el-header class="header">
    <div class="header-content">
      <h2>Kanban!</h2>
      <h4 class="welcome-user">Bem-vindo(a){{ (user || {}).name ? `, ${user.name}` : '' }}!</h4>
      <el-button size="mini" :disabled="loading" :loading="loading" @click="logout">Sair</el-button>
    </div>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async logout() {
      this.loading = true;
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao deslogar:', error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(6, 6, 6);
  color: white;
  padding: 10px 20px;


.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .el-button {
    background-color: transparent;
    color: #aeaeae;
    border-color: #aeaeae;
  }

  h2 {
    margin: 0;
  }

  @media (max-width: 500px) {
      h4 {
        display: none;
      }
    }
  }
}
</style>
