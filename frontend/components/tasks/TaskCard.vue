<template>
  <div class="task-card" :data-task-id="task.id">
    <h4>{{ task.title }}</h4>
    <p>{{ task.description || '-' }}</p>
    <p><strong>Previsão de entrega:</strong> {{ task.due_date || '-' }}</p>
    <div class="card-actions">
      <el-button type="danger" size="mini" @click="$emit('delete-task', task.id)">
        Excluir
      </el-button>
      <el-button type="primary" size="mini" @click="$emit('edit-task', task.id)">
        Editar
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: grab;

  .card-actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
