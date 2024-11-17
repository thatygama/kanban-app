<template>
  <div
    :class="['status-column', `status-column-${status.id}`]"
    :key="status.id"
    :data-id="status.id"
    @drop="onDrop"
    @dragover.prevent="onDragOver"
  >
    <el-badge :value="tasks.length" class="mt-2" :type="getStatusType(status.id)">
      <h3 class="status-name" :style="{ backgroundColor: getStatusColor(status.id), color: '#fff' }">
        {{ status.name === 'Finalizada' ? 'Finalizadas' : status.name }}
      </h3>
    </el-badge>
    <div class="task-list">
      <span v-if="tasks.length">
        <div
          v-for="task in tasks"
          :key="task.id"
          :class="`task-${task.id}`"
          :data-id="task.id"
          draggable="true"
          @dragstart="onDragStart"
        >
          <TaskCard
            :task="task"
            @delete-task="deleteTask"
            @edit-task="editTask"
          />
        </div>
      </span>
      <span v-else class="no-data">
        Nenhuma tarefa {{ status.name.toLowerCase() }}
      </span>
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/tasks/TaskCard.vue';
import $functions from '@/utils/functions';

export default {
  components: {
    TaskCard,
  },
  props: {
    status: {
      type: Object,
      required: true,
    },
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      draggedTask: null,
    };
  },
  methods: {
    getStatusType(status_id) {
      return $functions.getStatusType(status_id);
    },
    onDragStart(event) {
      const element = event.target;
      const taskClass = Array.from(element.classList).find((cls) => cls.startsWith('task-'));
      if (taskClass) {
        const taskId = taskClass.split('-')[1];
        if (taskId) {
          this.draggedTask = taskId;
          this.$emit('task-selected', taskId);
        }
      }
    },
    onDrop(event) {
      const newStatusId = event.currentTarget.dataset.id;
      if (newStatusId) {
        this.$emit('task-dropped', parseInt(newStatusId));
      }
    },
    onDragOver(event) {
      event.preventDefault();
    },
    getStatusColor(statusId) {
      switch (statusId) {
        case 1:
          return 'gray'; // Cinza
        case 2:
          return '#E49B0F'; // Amarelo
        case 3:
          return 'green'; // Verde
        default:
          return '#17161e'; // Preto padrão
      }
    },
    deleteTask(taskId) {
      this.$emit('delete-task', taskId);
    },
    editTask(taskId) {
      this.$emit('edit-task', taskId);
    },
  },
};
</script>

<style lang="scss" scoped>
.status-column {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  min-height: 300px;
  background-color: #f9f9f9;
  transition: background-color 0.2s, border 0.2s;

  * {
    border-radius: 4px;
  }

  .status-name {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 18px -18px inset;
    margin: 0;
    font-size: 1rem;
    text-align: center;
    padding: 5px 15px;
    width: 150px;
    border-radius: 50px;
    border: 3px solid;
  }

  .bg-space {
    height: 2px;
    width: 100%;
    margin: 10px 0;
  }
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .no-data {
    margin-top: 50px;
    background-color: rgba(239, 239, 239, .7);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    border: 1px solid rgba(221, 221, 221, .7);
    border-radius: 5px;
    color: #7c7c7c;
    font-size: .8rem;
    text-align: center;
  }
}
</style>
