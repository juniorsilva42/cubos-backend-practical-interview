/**
 * Bootstrap of application
 *
 * @return {*}
*/
module.exports = ({ logger, server }) => ({
  start: () => Promise
    .resolve()
    .then(server.start)
    .catch((err) => logger.error(`Application crash! \n Stack Trace: ${err}`)),
});
