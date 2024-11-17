<template>
  <el-container class="register-container">
    <el-header>
      <h1>Registrar</h1>
    </el-header>
    <el-main>
      <el-form @submit.native.prevent="register" :model="form" label-width="120px">
        <el-form-item label="Nome">
          <el-input v-model="form.name" placeholder="Digite seu nome" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" type="email" placeholder="Digite seu email" />
        </el-form-item>
        <el-form-item label="Senha">
          <el-input v-model="form.password" type="password" placeholder="Digite sua senha" />
        </el-form-item>
        <el-form-item label="Confirme a Senha">
          <el-input v-model="form.password_confirmation" type="password" placeholder="Confirme sua senha" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">Registrar</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="error" type="error" :closable="false">{{ error }}</el-alert>
      <p class="login-link">
        Já possui uma conta? <el-button type="text" @click="goToLogin">Faça login aqui</el-button>
      </p>
    </el-main>
  </el-container>
</template>

<script>
import requestApi from '@/helpers/request-helper';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await requestApi('register', 'POST', false, this.form);

        if (response.status) {
          this.$message.success('Cadastro realizado com sucesso!');
          this.$router.push('/');
        } else {
          this.error = response.error;
        }
      } catch (err) {
        this.error = 'Erro ao tentar registrar. Tente novamente.';
      }
    },
    goToLogin() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

.el-form-item {
  margin-bottom: 15px;
}

.el-button {
  width: 100%;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
}
</style>
