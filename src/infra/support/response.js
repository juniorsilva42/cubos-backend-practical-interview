import { assoc } from 'ramda';

/**
 * Helper function to standardize responses
 *
 * @param {string} success default = true
 *
 * @return {object} default response with data, success, date and version properties
*/
module.exports = () => {
  const defaultResponse = (success = true) => ({
    success,
    version: 'v1',
    date: new Date(),
  });

  const Success = data => assoc(
    'data',
    data,
    defaultResponse(true),
  );

  const Fail = data => assoc(
    'error',
    data,
    defaultResponse(false),
  );

  return {
    Success,
    Fail,
  };
};