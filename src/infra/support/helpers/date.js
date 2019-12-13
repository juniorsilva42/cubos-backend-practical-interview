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

export const validateDate = (date) => {
  const dateSplit = date.split('-');

  return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
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

export const isValidHour = (hour) => {
  const regex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d))$/; 

  if (regex.exec(hour)) {
    return true;
  }
  
  return false;
};

export const formatAndSetHour = (hour, date) => {
  const splitHour = hour.split(':');

  return date.setHours(splitHour[0], splitHour[1]);
}