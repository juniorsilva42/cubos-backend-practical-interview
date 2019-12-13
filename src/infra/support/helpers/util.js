export const reject = (object, keys) => {
  return Object.assign({}, ...Object.keys(object)
    .filter(k => !keys.includes(k))
    .map(k => ({ [k]: object[k] })));
}