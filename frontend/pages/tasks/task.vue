<template>
  <el-container class="task-form-container">
    <el-header>
      <h1>{{ isEdit ? 'Editar Tarefa' : 'Criar Tarefa' }}</h1>
    </el-header>
    <el-main>
      <el-form class="form-task" @submit.native.prevent="submitTask" :model="task" :rules="rules" label-width="120p">
        <el-form-item label="Título" prop="title">
          <el-input v-model="task.title" placeholder="Digite o título da tarefa" />
        </el-form-item>
        <el-form-item label="Descrição">
          <el-input v-model="task.description" type="textarea" placeholder="Digite a descrição da tarefa" />
        </el-form-item>
        <el-form-item label="Previsão de entrega">
          <el-date-picker
            v-model="task.due_date"
            type="date"
            placeholder="Escolha uma data"
            value-format="yyyy-MM-dd"
            format="dd/MM/yyyy"
            style="width: 100%"
            minimun
          />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="task.status_id" placeholder="Selecione o status" style="width: 100%">
            <el-option
              v-for="item in statuses"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitTask">{{ isEdit ? 'Salvar' : 'Criar' }}</el-button>
          <el-button type="danger" @click="returnTasks">Cancelar</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="error" type="error" :closable="false">{{ error }}</el-alert>
    </el-main>
  </el-container>
</template>

<script>
import requestApi from '@/helpers/request-helper';
import dayjs from 'dayjs';
import $functions from '@/utils/functions';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        status_id: 1,
        due_date: '',
      },
      isEdit: false,
      error: null,
      statuses: [
        { id: 1, name: 'A fazer' },
        { id: 2, name: 'Em andamento' },
        { id: 3, name: 'Finalizada' }
      ],
      rules: {
        title: [
          { required: true, message: 'O título é obrigatório.', trigger: 'blur' },
        ],
      },
    };
  },
  async mounted() {
    await this.getTask();
  },
  methods: {
    fetchStatuses() {
      // IF NECESSARY - get Statuses from API
    },
    async getTask() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      try {
        const response = await requestApi(`tasks/${id}`, 'GET', true);
        if (response.status) {
          if (this.response.result.data.due_date) {
            this.response.result.data.due_date = dayjs(this.response.result.data.due_date).format('DD/MM/YYYY');
          }
          this.task = response.result.data;
        } else {
          this.error = response.error;
        }
      } catch (err) {
        this.error = 'Erro ao carregar tarefa. Tente novamente.';
      }
    }
    },
    returnTasks() {
      this.$router.push('/tarefas');
    },
    async submitTask() {
      const id = this.$route.params.id;
      try {
        const taskToSubmit = { ...this.task };
        if (taskToSubmit.due_date) {
          taskToSubmit.due_date = $functions.formatDateToSave(taskToSubmit.due_date);
        }

        let response;
        if (this.isEdit) {
          response = await requestApi(`tasks/${id}`, 'PUT', true, taskToSubmit);
        } else {
          response = await requestApi('tasks', 'POST', true, taskToSubmit);
        }

        if (response.status) {
          this.$message.success(this.isEdit ? 'Tarefa atualizada!' : 'Tarefa criada!');
          this.$router.push('/tarefas');
        } else {
          this.error = response.error;
        }
      } catch (err) {
        this.error = 'Erro ao salvar a tarefa.';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task-form-container {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
