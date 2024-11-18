<template>
  <el-container class="tasks-container">
    <el-header>
      <h1 class="bolder">Controle suas tarefas
        <span class="ml-4">
          <el-button type="primary" size="mini" :disabled="loadingTasks" @click="createTask">
            <i class="el-icon-plus el-icon--right"></i>
            Nova tarefa
          </el-button>
        </span>
      </h1>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="8" v-for="status in statuses" :key="status.id">
          <StatusColumn
            :status="status"
            :tasks="tasksByStatus[status.id]"
            @task-selected="onSelectTask"
            @task-dropped="onDropTask"
            @delete-task="deleteTask"
            @edit-task="editTask"
          />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import StatusColumn from '@/components/tasks/StatusColumn.vue';
import requestApi from '@/helpers/request-helper';
import $functions from '@/utils/functions';

export default {
  components: {
    StatusColumn,
  },
  data() {
    return {
      tasks: [],
      tasksByStatus: {},
      taskIdSelected: null,
      statuses: [
        { id: 1, name: "A fazer" },
        { id: 2, name: "Em andamento" },
        { id: 3, name: "Finalizada" },
      ],
      loadingTasks: false,
    };
  },
  async mounted() {
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      this.loadingTasks = true;
      try {
        const response = await requestApi('tasks', 'GET', true);
        if (response.status) {
          this.tasks = response.result.data.map((task) => ({
            ...task,
            description: task.description || '-',
            due_date: task.due_date ? $functions.formatDateToDisplay(task.due_date) : '-',
          }));
          this.groupTasksByStatus();
        } else {
          this.$message.error('Erro ao carregar tarefas.');
        }
      } catch (err) {
        console.error(err);
        this.$message.error('Erro ao carregar tarefas.');
      }
      this.loadingTasks = false;
    },
    groupTasksByStatus() {
      this.tasksByStatus = this.statuses.reduce((acc, status) => {
        acc[status.id] = this.tasks.filter((task) => task.status_id === status.id);
        return acc;
      }, {});
    },
    onSelectTask(taskId) {
      this.taskIdSelected = taskId;
    },
    async onDropTask(newStatusId) {
      const taskElem = this.tasks.findIndex((t) => t.id == this.taskIdSelected);

      if (this.tasks[taskElem].status_id != newStatusId) {
        try {
          const response = await requestApi(`tasks/${this.tasks[taskElem].id}`, 'PUT', true, {
            status_id: newStatusId,
          });

          if (response.status) {
            this.tasks[taskElem].status_id = newStatusId;
            this.tasks[taskElem].status = this.statuses.find(el => el.id === newStatusId);
            this.groupTasksByStatus();
            this.$message.success('Status atualizado com sucesso!');
          } else {
            this.$message.error('Erro ao atualizar status: ' + response.error);
          }
        } catch (err) {
          console.error(err);
          this.$message.error('Erro ao atualizar status.');
        } finally {
          this.taskIdSelected = null;
        }
      }
    },
    createTask() {
      this.$router.push('/tarefas/tarefa');
    },
    editTask(id) {
      this.$router.push(`/tarefas/tarefa/${id}`);
    },
    async deleteTask(id) {
      try {
        const response = await requestApi(`tasks/${id}`, 'DELETE', true);
        if (response.status) {
          this.$message.success('Tarefa excluída!');
          await this.fetchTasks();
        } else {
          this.$message.error('Erro ao excluir tarefa.');
        }
      } catch (err) {
        console.error(err);
        this.$message.error('Erro ao excluir tarefa.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks-container {
  min-width: 250px;
  padding: 0 20px;
  margin: 50px auto;

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  @media (max-width: 350px) {
    .el-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      h1 {
        min-width: 160px;
      }
    }
  }

  .el-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 700px) {
      justify-content: center;
    }
  }

  .el-col {
    flex: 1 1 300px;
    max-width: 100%;

    @media (max-width: 700px) {
      flex: 1 1 100%;
    }
  }
}
</style>
