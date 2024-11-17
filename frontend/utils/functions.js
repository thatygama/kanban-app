import dayjs from 'dayjs';

const functions = {
  formatDateToDisplay(date) {
    return dayjs(date).format('DD/MM/YYYY');
  },
  formatDateToSave(date) {
    return dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }
};

export default functions;
