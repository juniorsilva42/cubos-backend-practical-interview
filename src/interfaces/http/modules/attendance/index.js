import container from '../../../../container';
import router from './router';

module.exports = () => {
  const {
    logger,
  } = container.cradle;

  return {
    router: router({
      logger,
    }),
  };
};