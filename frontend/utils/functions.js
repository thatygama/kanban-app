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
        return color ? 'gray' : 'info';
      case 2:
        return color ?  '#E49B0F' : 'warning';
      case 3:
        return color ?  'green' : 'success';
      default:
        return color ?  '#17161e' : 'default';
    }
  },
};

export default functions;
