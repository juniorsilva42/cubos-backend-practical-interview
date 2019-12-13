export const validateTwoRangeInterval = ({ startDate, endDate }) => {
  const startDateSplit = startDate.split('-');
  const endDateSplit = endDate.split('-');

  const firstDate = new Date(startDateSplit[2], startDateSplit[1] - 1, startDateSplit[0]);
  const secondDate = new Date(endDateSplit[2], endDateSplit[1] - 1, endDateSplit[0]);

  if (firstDate.getTime() <= secondDate.getTime()) {
    return true;
  }

  return false;
}

export const formatter = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${day}-${formattedMonth}-${year}`;
};

export const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20|21|30)\d\d$/; 

  if (regex.exec(date)) {
    return true;
  }
  
  return false;
};