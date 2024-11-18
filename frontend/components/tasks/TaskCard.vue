<template>
  <div class="task-card" :data-task-id="task.id" :style="{ backgroundColor: getStatusType(task.status_id) }">
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
        <strong>Excluir</strong>
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
import $functions from '@/utils/functions';

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
    getStatusType(status_id) {
      return $functions.getStatusType(status_id, true, .11);
    },
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
  border-radius: 5px;
  padding: 1px 10px 20px 10px;
  cursor: grab;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  .descript {
    border-radius: 4px;
    border: 1px solid #e8e8e8cc;
    background-color: #ffffffcc;
    padding: 0 10px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px inset, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px inset;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
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
