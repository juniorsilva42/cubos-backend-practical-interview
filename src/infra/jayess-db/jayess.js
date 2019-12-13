module.exports = ({ source }) => {
  const defaultValue = {};
  const serialize = (object) => JSON.stringify(object, null, 2);
  const deserialize = JSON.parse;

  return {
    source,
    defaultValue,
    serialize,
    deserialize,
  }
};
