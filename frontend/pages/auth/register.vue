<template>
  <el-container class="register-container">
    <el-header>
      <h1>Registre-se no Kanban!</h1>
    </el-header>
    <el-main>
      <el-form
        @submit.native.prevent="register"
        :model="form"
        :rules="rules"
        ref="registerForm"
        label-width="150px">

        <el-form-item label="Nome" prop="name">
          <el-input v-model="form.name" placeholder="Digite seu nome" />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="email" placeholder="Digite seu email" />
        </el-form-item>

        <el-form-item label="Senha" prop="password">
          <el-input v-model="form.password" type="password" placeholder="Digite sua senha" />
        </el-form-item>

        <el-form-item label="Confirme a Senha" prop="password_confirmation">
          <el-input v-model="form.password_confirmation" type="password" placeholder="Confirme sua senha" />
        </el-form-item>

        <el-form-item>
          <el-button class="mt-4" type="primary" :loading="loading" @click="submitForm">Registrar</el-button>
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
      loading: false,
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        name: [
          { required: true, message: 'O nome é obrigatório.', trigger: 'blur' },
          { max: 100, message: 'O nome deve ter no máximo 100 caracteres.', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'O email é obrigatório.', trigger: 'blur' },
          { type: 'email', message: 'Insira um email válido.', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'A senha é obrigatória.', trigger: 'blur' },
          { min: 6, message: 'A senha deve ter pelo menos 6 caracteres.', trigger: 'blur' },
          { max: 10, message: 'A senha deve ter no máximo 10 caracteres.', trigger: 'blur' },
        ],
        password_confirmation: [
          { required: true, message: 'Confirme sua senha.', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value !== this.form.password) {
              callback(new Error('As senhas não coincidem.'));
            } else {
              callback();
            }
          }, trigger: 'blur' },
        ],
      },
      error: null,
    };
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          await this.register();
        } else {
          this.$message.error('Por favor, complete corretamente os campos antes de prosseguir.');
        }
      });
    },
    async register() {
      try {
        this.loading = true;
        const response = await requestApi('register', 'POST', false, this.form);

        if (response.status) {
          this.$message.success('Cadastro realizado com sucesso!');
          this.$router.push('/');
        } else {
          this.error = response.error;
        }
      } catch (err) {
        this.error = 'Erro ao tentar registrar. Tente novamente.';
      } finally {
        this.loading = false;
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
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

.el-button {
  width: 100%;
}

.login-link {
  margin-top: 30px;
  font-size: 14px;
}
</style>
