import { 
  isValidDate,
  validateDate,
} from '../../support/helpers/date';

export const findElementsBasedOnBinarySearch = (arr, { from, to }) => {
  const seekedData = [];

  let findBestIndex = 0; 
  let seek;
  let l = 0; 
  let h = 1; 

  const fromDateToTime = from.getTime();
  const toDateToTime = to.getTime();
  let currentDate;

  do {
    if (isValidDate(arr[findBestIndex].dateRule.at)) {
      seek = arr[findBestIndex];

      currentDate = validateDate(arr[findBestIndex].dateRule.at).getTime();

      if (currentDate >= fromDateToTime && currentDate <= toDateToTime) {
        l = h;
        h = 2 * h;
        
        seekedData.push(arr[findBestIndex]);
      }
    }

    findBestIndex++;
  } while ((findBestIndex <= arr.length) && arr[findBestIndex]);

  // Execute algorithm
  binarySearch(arr, { from, to }, l, h);

  return seekedData;
};

const binarySearch = (data, { from, to }, start, end) => {
  let findBestIndex = 0;
  const middle = Math.floor((start + end) / 2);

  do {
    if (isValidDate(data[findBestIndex].dateRule.at)) {
      const currentDate = validateDate(data[middle].dateRule.at).getTime();

      const fromDateToTime = from.getTime();
      const toDateToTime = to.getTime();

      if ((fromDateToTime === currentDate) || (toDateToTime === currentDate)) {
        return data[middle];
      }

      if ((fromDateToTime <= currentDate) && (toDateToTime <= currentDate)) {
        return bs(data, { from, to }, start, middle);
      }

      if ((fromDateToTime >= currentDate) && (toDateToTime >= currentDate)) {
        return bs(data, { from, to }, middle, end);
      }
    }

    findBestIndex++;
  } while (isValidDate(data[findBestIndex].dateRule.at));
};
