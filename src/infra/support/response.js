import { assoc } from 'ramda';

/**
 * Helper to standardize responses
 * 
 * @param success
 * 
 * @return {data, version, date}
*/
const defaultResponse = (success = true) => ({
  success,
  version: 'v1',
  date: new Date(),
});

export const Success = data => assoc(
  'data',
  data,
  defaultResponse(true),
);

export const Fail = data => assoc(
  'error',
  data,
  defaultResponse(false),
);