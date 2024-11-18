import dayjs from 'dayjs';

const functions = {
  formatDateToDisplay(date) {
    return dayjs(date).format('DD/MM/YYYY');
  },
  formatDateToSave(date) {
    return dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  },
  getStatusType(statusId, color = false, transparency = null) {
    switch (statusId) {
      case 1:
        return color ? transparency ? `rgba(128, 128, 128, ${transparency})` : 'gray' : 'info';
      case 2:
        return color ? transparency ? `rgba(255, 149, 0, ${transparency})` :  '#E49B0F' : 'warning';
      case 3:
        return color ? transparency ? `rgba(0, 128, 0, ${transparency})` :  'green' : 'success';
      default:
        return color ? transparency ? `rgba(23, 22, 30, ${transparency})` :  '#17161e' : 'default';
    }
  },
};

export default functions;
