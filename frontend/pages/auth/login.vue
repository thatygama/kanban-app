<template>
  <el-container class="login-container">
    <el-header>
      <h1>Kanban!</h1>
      <h4>Suas tarefas organizadas</h4>
    </el-header>
    <el-main class="mt-5">
      <el-form
        @submit.native.prevent="submitForm"
        :model="form"
        :rules="rules"
        ref="loginForm"
        label-width="60px">

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="email" placeholder="Digite seu email" />
        </el-form-item>

        <el-form-item label="Senha" prop="password">
          <el-input v-model="form.password" type="password" placeholder="Digite sua senha" show-password />
        </el-form-item>

        <el-form-item>
          <el-button class="mt-4" type="primary" :loading="logging" :disabled="logging" @click="submitForm">Entrar</el-button>
        </el-form-item>
      </el-form>

      <el-alert v-if="error" type="error" :closable="false">{{ error }}</el-alert>
      <p class="register-link">
        Ainda não possui uma conta? <el-button type="text" :disabled="logging" @click="goToRegister">Registre-se aqui</el-button>
      </p>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'O email é obrigatório.', trigger: 'blur' },
          { type: 'email', message: 'Insira um email válido.', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'A senha é obrigatória.', trigger: 'blur' },
        ],
      },
      error: null,
      logging: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          await this.login();
        } else {
          this.$message.error('Por favor, complete corretamente os campos antes de prosseguir.');
        }
      });
    },
    async login() {
      this.logging = true;
      this.error = null;

      try {
        const response = await this.$store.dispatch('auth/login', this.form);

        if (response.success) {
          this.$router.push('/tarefas');
        } else {
          this.error = response.message;
        }
      } catch (err) {
        console.log('Erro: ', err);
        this.error = 'Erro ao tentar logar. Tente novamente.';
      } finally {
        this.logging = false;
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
  margin: 50px auto;
  text-align: center;
  max-width: 500px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  .el-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    h4 {
      margin-top: -20px;
      color: #2890f8;
    }
  }
}

.el-button {
  width: 100%;
}

.register-link {
  margin-top: 30px;
  font-size: 14px;
}
</style>
