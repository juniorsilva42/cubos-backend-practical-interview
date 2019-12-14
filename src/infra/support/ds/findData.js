/* eslint-disable import/prefer-default-export */
import {
  validateDate,
  isValidDate,
} from '../helpers/date';

/**
 * Util found n elements on array
 * Worst and avg case: O(n) / O(n / 2)
 * Best case: O(1) very rare
 * 
 * @param {array} arr data array of schedule
 * @param {object} from start range date condition
 * @param {object} to end range date condition
 *
 * @return {array} seekedData array of found elements
*/
export const findData = (data, { from, to }) => {
  let findBestIndex = 0;
  let currentDate;
  const seekedData = [];

  const fromDateToTime = from.getTime();
  const toDateToTime = to.getTime();

  do {
    currentDate = validateDate(data[findBestIndex].dateRule.at).getTime();

    if (currentDate >= fromDateToTime && currentDate <= toDateToTime) {
      seekedData.push(data[findBestIndex]);
    }

    findBestIndex += 1;
  } while ((findBestIndex <= data.length) && data[findBestIndex]);

  return seekedData;
};
