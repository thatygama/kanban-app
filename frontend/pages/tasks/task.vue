<template>
  <el-container v-loading="loadingTask" class="task-form-container">
    <el-header>
      <h1>{{ isEdit ? 'Editar tarefa' : 'Criar tarefa' }}</h1>
    </el-header>
    <el-main>
      <el-form class="form-task" @submit.native.prevent="submitTask" :model="task" :rules="rules" ref="formTask" label-width="120p">
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
        <el-form-item label="Status" style="text-align: left;">
          <el-dropdown @command="changeStatus">
              <el-button class="btn-status" size="mini" :type="getStatusType(task.status_id)">
                {{ task.status?.name || '' }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="status in statuses"
                  :key="status.id"
                  :command="status"
                >
                  {{ status.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-form-item>
        <el-form-item>
          <div class="mt-4" />
          <el-button type="danger" @click="returnTasks">Cancelar</el-button>
          <el-button type="primary" @click="submitTask">{{ isEdit ? 'Salvar' : 'Criar' }}</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="error" type="error" :closable="false">{{ error }}</el-alert>
    </el-main>
  </el-container>
</template>

<script>
import requestApi from '@/helpers/request-helper';
import $functions from '@/utils/functions';

export default {
  data() {
    return {
      loadingTask: true,
      task: {
        title: '',
        description: '',
        status_id: 1,
        status: { id: 1, name: 'A fazer' },
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
          { max: 150, message: 'O título deve ter no máximo 150 caracteres.', trigger: 'blur' },
        ],
      },
    };
  },
  async mounted() {
    await this.getTask();
    this.loadingTask = false;
  },
  methods: {
    fetchStatuses() {
      // IF NECESSARY - get Statuses from API
    },
    changeStatus(status) {
      this.task.status_id = status.id;
      this.task.status = { ...status };
    },
    getStatusType(status_id) {
      return $functions.getStatusType(status_id);
    },
    async getTask() {
      const id = this.$route.params.id;
      if (id) {
        this.isEdit = true;
        try {
          const response = await requestApi(`tasks/${id}`, 'GET', true);
          if (response.status) {
            this.task = response.result.data;
          } else {
            this.error = response.error;
          }
        } catch (err) {
          console.log('Erro: ', err)
          this.error = 'Erro ao carregar tarefa. Tente novamente.';
        }
      }
    },
    returnTasks() {
      this.$router.push('/tarefas');
    },
    submitTask() {
      this.$refs.formTask.validate(async (valid) => {
        if (valid) {
          await this.saveTask();
        } else {
          this.$message.error('Por favor, complete corretamente os campos antes de prosseguir.');
        }
      });
    },
    async saveTask() {
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

.btn-status {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 30px -18px inset;
}

.el-button {
  margin-right: 10px;
}
</style>
