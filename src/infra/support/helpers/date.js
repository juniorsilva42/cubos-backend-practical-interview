export const validateTwoRangeIntervalDates = ({ startDate, endDate }) => {
  const startDate = new Date(startDate);
  const startDate = new Date(endDate);

  if (startDate.getTime() < endDate.getTime()) {
    return true;
  }

  // Invalid date ranges  
  return false;
}