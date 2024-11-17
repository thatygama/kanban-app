import dayjs from 'dayjs';

const functions = {
  formatDateToDisplay(date) {
    return dayjs(date).format('DD/MM/YYYY');
  },
  formatDateToSave(date) {
    return dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  },
  getStatusType(statusId, color = false) {
    switch (statusId) {
      case 1:
        return color ? '#909399' : 'info';
      case 2:
        return color ?  '#E6A23C' : 'warning';
      case 3:
        return color ?  '#67C23A' : 'success';
      default:
        return color ?  '#409EFF' : 'default';
    }
  },
};

export default functions;
