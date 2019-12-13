import morgan from 'morgan';

module.exports = logger => morgan('common', {
  stream: {
    write: (message) => {
      logger.info(message.slice(0, -1));
    },
  },
});