/**
 * Util to reject a past key
 * 
 * @param {object} object default data object
 * @param {array} keys string properties to reject 
 *
 * @return {Array} object mapped to new values 
*/ 
export const reject = (object, keys) => {
  return Object.assign({}, ...Object.keys(object)
    .filter(k => !keys.includes(k))
    .map(k => ({ [k]: object[k] })));
}