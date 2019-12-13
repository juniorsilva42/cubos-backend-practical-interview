export const validateTwoRangeInterval = ({ startDate, endDate }) => {
  const firstDate = new Date(startDate);
  const secondDate = new Date(endDate);

  if (firstDate.getTime() < secondDate.getTime()) {
    return true;
  }

  // Invalid date ranges  
  return false;
}

export const formatter = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${day}-${formattedMonth}-${year}`;
};