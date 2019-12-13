export const validateTwoRangeInterval = ({ startDate, endDate }) => {
  const startDate = new Date(startDate);
  const startDate = new Date(endDate);

  if (startDate.getTime() < endDate.getTime()) {
    return true;
  }

  // Invalid date ranges  
  return false;
}

export const formatter = (date) => {
  const day = day.getDate();
  const month = day.getMonth() + 1;
  const year = day.getFullYear();

  return `${monthDay}-${month}-${year}`;
};