<template>
  <div
    :class="['status-column', `status-column-${status.id}`]"
    :key="status.id"
    :data-id="status.id"
    @drop="onDrop"
    @dragover.prevent="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <h3 :style="{ backgroundColor: getStatusColor(status.id), color: '#fff', padding: '10px' }">
      {{ status.name }}
    </h3>
    <div class="task-list">
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
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/tasks/TaskCard.vue';

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
      draggedTask: null, // Armazena a tarefa arrastada
    };
  },
  methods: {
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
    onDragEnter(event) {
      event.currentTarget.classList.add('drag-over');
    },
    onDragLeave(event) {
      event.currentTarget.classList.remove('drag-over');
    },
    getStatusColor(statusId) {
      switch (statusId) {
        case 1:
          return '#909399'; // Cinza
        case 2:
          return '#E6A23C'; // Amarelo
        case 3:
          return '#67C23A'; // Verde
        default:
          return '#409EFF'; // Azul padrão
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

  &.drag-over {
    border: 2px dashed #409eff;
    background-color: #f0f9ff;
  }
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
