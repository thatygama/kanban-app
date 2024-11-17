<template>
  <el-dialog
    :visible.sync="visible"
    :width="width"
    :before-close="handleClose"
  >
    <span>{{ message }}</span>
    <template #footer>
      <el-button @click="closeDialog">Cancelar</el-button>
      <el-button type="primary" @click="confirmAction">Confirmar</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '30%',
    },
    message: {
      type: String,
      default: 'Você tem certeza que deseja realizar essa ação?',
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    confirmAction() {
      this.$emit('confirm');
    },
    handleClose() {
      this.closeDialog();
    },
  },
};
</script>
