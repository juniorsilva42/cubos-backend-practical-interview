import dotenv from 'dotenv';
import path from 'path';

/**
 * Bootstrap of application
*/
const { APP_ENV } = process.env;

/**
 * Set and dispatch default env
*/
if (APP_ENV === 'development') {
  dotenv.config({ path: `${path.normalize(path.join(__dirname, '..', '..', '..'))}/.env` });
}

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
