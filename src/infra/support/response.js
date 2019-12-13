import { assoc } from 'ramda';

/**
 * Helper function to standardize responses
 *
 * @param success default = true
 *
 * @return {data, version, date}
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