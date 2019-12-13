import container from '../../../../container';
import router from './router';

/**
 * Main handle of module to connect and pass parameters of container DI to module router
 *
 * @return {router} router of module with container decl
*/
module.exports = () => {
  const {
    logger,
    response: { Success, Fail },
    jayessdb,
  } = container.cradle;

  return {
    router: router({
      response: { Success, Fail },
      logger,
      jayessdb,
    }),
  };
};
