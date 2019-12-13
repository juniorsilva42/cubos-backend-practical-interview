import dotenv from 'dotenv';
import path from 'path';

/**
 * Bootstrap app
 * 
 * @return {*}
*/
const { APP_ENV } = process.env;

if (APP_ENV === 'development') {
  dotenv.config({ path: `${path.normalize(path.join(__dirname, '..', '..', '..'))}/.env` });
}

module.exports = ({ logger, server }) => ({
  start: () => Promise
    .resolve()
    .then(server.start)
    .catch((err) => logger.erro(`Application crash! \n Stack Trace: ${err}`)),
});