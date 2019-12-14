/**
 * Util to verify range condition base of two given dates (base: date1 <= date2)
 * 
 * @param {object} startDate primary date of condition
 * @param {object} endDate second date of condition
 *
 * @return {boolean} 
*/ 
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

/**
 * Util convert and validate a string date to new Date object instance 
 * 
 * @param {string} date string to verify and convert
 *
 * @return {boolean} 
*/ 
export const validateDate = (date) => {
  const dateSplit = date.split('-');

  return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
}

/**
 * Util to formatter and show a UTC Date on format dd:mm:yyyy 
 * 
 * @param {string} date string date to verify and convert
 *
 * @return {string} full date in format dd-mm-yyyy 
*/ 
export const formatter = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${day}-${formattedMonth}-${year}`;
};

/**
 * Util to validate a date in format dd-mmmm-yyyy and set conditions to each item (example: one day cannot have the value 32)  
 * 
 * @param {string} date string date to verify
 *
 * @return {boolean} true if date is valid
*/ 
export const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20|21|30)\d\d$/; 

  if (regex.exec(date)) {
    return true;
  }
  
  return false;
};

/**
 * Util to validate a hour in format hh:mm and set conditions to each item (example: one hour cannot have the value 25)  
 * 
 * @param {string} hour string hour to verify
 *
 * @return {boolean} true if date is valid
*/ 
export const isValidHour = (hour) => {
  const regex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d))$/; 

  if (regex.exec(hour)) {
    return true;
  }
  
  return false;
};

/**
 * Util to set a hour information into Date() object to can use getTime() function 
 * 
 * @param {string} hour string hour
 * @param {Date Instance} date instance of new Date()
 *
 * @return {boolean} true if date is valid
*/ 
export const formatAndSetHour = (hour, date) => {
  const splitHour = hour.split(':');

  return date.setHours(splitHour[0], splitHour[1]);
}