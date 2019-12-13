import path from 'path';

/**
 * Create controller path to resource
 *
 * @return {BootModule} instance.
 */
module.exports = (moduleUri) => {
  const modulePath = path.resolve('src/interfaces/http/modules', moduleUri);
  const BootModule = require(modulePath);

  return BootModule();
};