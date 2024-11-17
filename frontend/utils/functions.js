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
        return color ? '#95a5a6' : 'info';
      case 2:
        return color ?  '#f1c40f' : 'warning';
      case 3:
        return color ?  '#2ecc71' : 'success';
      default:
        return color ?  '#3498db' : 'default';
    }
  },
};

export default functions;
