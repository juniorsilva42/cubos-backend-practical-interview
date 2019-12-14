import { 
  isValidDate,
  validateDate,
} from '../../support/helpers/date';

/**
 * Util found n elements based on result of Binary Search Algorithm
 *
 * @param {array} arr data array of schedule
 * @param {object} from start range date condition
 * @param {object} to end range date condition
 *
 * @return {array} seekedData array of found elements 
*/ 
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
        h = h + 1;
        
        seekedData.push(arr[findBestIndex]);
      }
    }

    findBestIndex++;
  } while ((findBestIndex <= arr.length) && arr[findBestIndex]);

  // Execute algorithm
  binarySearch(arr, { from, to }, l, h);

  return seekedData;
};

/**
 * Binary Search Algorithm 
 * 
 * Custom BS algorithm to found element that satisfy the date range condition
 *
 * @param {array} data objects of schedules
 * @param {object} from start range date condition
 * @param {object} to end range date condition
 * @param {int} start index of array
 * @param {int} end index of array
 *
 * @return {*} 
*/ 
const binarySearch = (data, { from, to }, start, end) => {
  let findBestIndex = 0;
  let middle = 0;

  if (data.length <= 2) {
    middle = 1;
  } else {
    middle = Math.floor((start + end) / 2) - 1;
  }

  do {
    if (isValidDate(data[findBestIndex].dateRule.at)) {
      const currentDate = validateDate(data[middle].dateRule.at).getTime();

      const fromDateToTime = from.getTime();
      const toDateToTime = to.getTime();

      if ((fromDateToTime === currentDate) || (toDateToTime === currentDate)) {
        return data[middle];
      }

      if ((fromDateToTime <= currentDate) && (toDateToTime <= currentDate)) {
        return binarySearch(data, { from, to }, start, middle);
      }

      if ((fromDateToTime >= currentDate) && (toDateToTime >= currentDate)) {
        return binarySearch(data, { from, to }, middle, end);
      }
    }

    findBestIndex++;
  } while (data[findBestIndex] && isValidDate(data[findBestIndex].dateRule.at));
};
