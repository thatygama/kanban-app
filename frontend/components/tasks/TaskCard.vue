<template>
  <div class="task-card" :data-task-id="task.id">
    <h3 class="bolder">{{ task.title }}</h3>
    <div class="descript">
      <p>{{ task.description || '-' }}</p>
    </div>
    <p>
      <span>
        <i class="el-icon-date el-icon--right"></i>
      </span><strong>Previsão de entrega:</strong> {{ task.due_date || '-' }}
    </p>
    <div class="card-actions">
      <el-button type="danger" size="mini" @click="showDeleteDialog = true">
        <i class="el-icon-delete el-icon--right"></i>
        Excluir
      </el-button>
      <el-button type="primary" size="mini" @click="$emit('edit-task', task.id)">
        <i class="el-icon-edit el-icon--right"></i>
        Editar
      </el-button>
    </div>

    <ConfirmDialog
      width="40%"
      :visible="showDeleteDialog"
      :message="`Tem certeza que deseja excluir a tarefa ${task.title}?`"
      @close="closeDeleteDialog"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import ConfirmDialog from '@/components/dialogs/Confirm.vue';

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  components: { ConfirmDialog },
  data() {
    return {
      showDeleteDialog: false,
    };
  },
  methods: {
    openDeleteDialog() {
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },
    confirmDelete() {
      this.showDeleteDialog = false;
      this.$emit('delete-task', this.task.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 10px 20px 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: grab;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  .descript {
    border-radius: 4px;
    border: 1px solid #e8e8e8cc;
    background-color: #e8e8e8cc;box-shadow: rgba(50, 50, 93, 0.1) 0px 7px 7px -12px inset, rgba(0, 0, 0, 0.1) 0px 8px 6px -8px inset;
    padding: 0 10px;
  }

  p {
    span {
      i {
        margin-right: 5px;
      }
    }
  }

  .card-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 350px) {
    .card-actions {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-items: center;
      align-items: center;

      .el-button {
        margin: 0 0 5px 0;
      }
    }
  }
}
</style>
