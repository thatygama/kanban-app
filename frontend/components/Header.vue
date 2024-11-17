<template>
  <el-header class="header">
    <div class="header-content">
      <h2>Kanban!</h2>
      <el-button type="danger" :disabled="loading" :loading="loading" @click="logout">Logout</el-button>
    </div>
  </el-header>
</template>

<script>
import requestApi from '@/helpers/request-helper';

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async logout() {
      try {
        this.loading = true;
        const response = await requestApi('logout', 'POST', true);

        if (response.status) {
          localStorage.removeItem('authorization_user');
          this.$router.push('/');
        } else {
          this.error = response.error;
        }
      } catch (err) {
        this.error = 'Erro ao tentar deslogar. Tente novamente.';
      } finally {
        this.loading = false;
      }
    }
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
