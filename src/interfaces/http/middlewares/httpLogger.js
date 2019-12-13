import morgan from 'morgan';

/**
 * Helper function to handle with HTTP logs response/requests logs
 *
 * @param {logger} Winston logger instance
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
