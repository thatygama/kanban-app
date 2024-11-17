<template>
  <el-header class="header">
    <div class="header-content">
      <h2>Kanban!</h2>
      <h4>Bem-vindo(a){{ (user || {}).name ? `, ${user.name}` : '' }}!</h4>
      <el-button type="danger" :disabled="loading" :loading="loading" @click="logout">Logout</el-button>
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

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d3e50;
  color: white;
  padding: 10px 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.el-button {
  background-color: #e74c3c;
  color: white;
}

h2 {
  margin: 0;
}
</style>
