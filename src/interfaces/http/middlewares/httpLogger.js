import morgan from 'morgan';

/**
 * Helper function to handle with HTTP logs response/requests logs
 *
 * @param {Winston Instance} logger Winston Logger instance
 *
 * @return {*}
*/
module.exports = (logger) => morgan('common', {
  stream: {
    write: (message) => {
      logger.info(message.slice(0, -1));
    },
  },
});
