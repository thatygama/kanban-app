<template>
  <el-container class="tasks-container">
    <el-header>
      <h1>Minhas Tarefas</h1>
      <el-button type="primary" :disabled="loadingTasks" @click="createTask">+ Nova tarefa</el-button>
    </el-header>
    <el-main>
      <el-table :data="tasks" :loading="loadingTasks" style="width: 100%"
        :empty-text="loadingTasks
          ? 'Carregando...'
          : 'Não há tarefas adicionadas'"
      >
        <el-table-column prop="title" label="Título" width="180" />
        <el-table-column label="Status" width="180">
          <template #default="scope">
            <el-dropdown @command="updateStatus(scope.row, $event)">
              <el-button size="mini" :type="getStatusType(scope.row.status_id)">
                {{ scope.row.status.name }}
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="status in statuses"
                  :key="status.id"
                  :command="status.id"
                >
                  {{ status.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="Descrição" />
        <el-table-column prop="due_date" label="Previsão de entrega" />
        <el-table-column label="Ações" width="170">
          <template #default="scope">
            <el-button type="primary" size="mini" class="btn-action" @click="editTask(scope.row.id)">
              Editar
            </el-button>
            <el-button type="danger" size="mini" class="btn-action" @click="deleteTask(scope.row.id)">
              Excluir
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import requestApi from '@/helpers/request-helper';
import $functions from '@/utils/functions';

export default {
  data() {
    return {
      tasks: [],
      statuses: [
        { id: 1, name: 'A fazer' },
        { id: 2, name: 'Em andamento' },
        { id: 3, name: 'Finalizada' }
      ],
      loadingTasks: false
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchStatuses() {
      // IF NECESSARY - get Statuses from API
    },
    async fetchTasks() {
      this.loadingTasks = true;
      const response = await requestApi('tasks', 'GET', true);
      if (response.status) {
        console.log(response)
        this.tasks = response.result.data.map((task) => {
          task.description = task.description || '-';
          if (task.due_date) {
            task.due_date = $functions.formatDateToDisplay(task.due_date);
          }
          return task;
        });
      } else {
        this.$message.error('Erro ao carregar tarefas: ' + response.error);
      }
      this.loadingTasks = false;
    },
    createTask() {
      this.$router.push('/tarefas/tarefa');
    },
    async updateStatus(task, statusId) {
      try {
        const response = await requestApi(`tasks/${task.id}`, 'PUT', true, {
          status_id: statusId,
        });
        if (response.status) {
          const newStatus = this.statuses.find((status) => status.id === statusId);
          this.$message.success(`Status atualizado para: ${newStatus.name}`);
          task.status_id = newStatus.id;
          task.status.name = newStatus.name;
        } else {
          this.$message.error('Erro ao atualizar status: ' + response.error);
        }
      } catch (err) {
        this.$message.error('Erro ao atualizar status.');
      }
    },
    getStatusType(statusId) {
      switch (statusId) {
        case 1:
          return 'info';
        case 2:
          return 'warning';
        case 3:
          return 'success';
        default:
          return 'default';
      }
    },
    editTask(id) {
      this.$router.push(`/tarefas/tarefa/${id}`);
    },
    async deleteTask(id) {
      const response = await requestApi(`tasks/${id}`, 'DELETE', true);
      if (response.status) {
        this.$message.success('Tarefa excluída!');
        await this.fetchTasks();
      } else {
        this.$message.error('Erro ao excluir tarefa: ' + response.error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks-container {
  padding: 0 20px;
  margin: 50px auto;

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .el-table {
    margin-top: 20px;
  }
}
</style>
