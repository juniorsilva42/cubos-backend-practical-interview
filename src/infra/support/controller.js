import path from 'path';

/**
 * Create controller path to resource
 *
 * @return {Controller} instance.
 */
module.exports = (controllerUri) => {
  const controllerPath = path.resolve('src/resources', controllerUri);
  const Controller = require(controllerPath);

  return Controller();
};