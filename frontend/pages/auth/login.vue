<template>
  <el-container class="login-container">
    <el-header>
      <h1>Login</h1>
    </el-header>
    <el-main>
      <el-form @submit.native.prevent="login" :model="form" label-width="120px">
        <el-form-item label="Email">
          <el-input v-model="form.email" type="email" placeholder="Digite seu email" />
        </el-form-item>
        <el-form-item label="Senha">
          <el-input v-model="form.password" type="password" placeholder="Digite sua senha" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="logging" :disabled="logging" @click="login">Entrar</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="error" type="error" :closable="false">{{ error }}</el-alert>
      <p class="register-link">
        Não possui uma conta? <el-button type="text" :disabled="logging" @click="goToRegister">Registre-se aqui</el-button>
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
        email: '',
        password: '',
      },
      error: null,
      logging: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await requestApi('login', 'POST', false, this.form);

        if (response.status) {
          localStorage.setItem('authorization_user', response.result.token);
          this.$router.push('/tarefas');
        } else {
          this.error = response.error;
        }
      } catch (err) {
        this.error = 'Erro ao tentar logar. Tente novamente.';
      }
    },
    goToRegister() {
      this.$router.push('/registrar');
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
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

.register-link {
  margin-top: 20px;
  font-size: 14px;
}
</style>
