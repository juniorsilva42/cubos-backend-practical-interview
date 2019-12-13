import fs from 'fs';
import Winston from 'winston';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

/**
 * Function to handler with log files into application
 *
 * @return {*}
*/
module.exports = () => new Winston.createLogger({
  transports: [
    new Winston.transports.Console(),
    new Winston.transports.File(Object.assign(
      true, {
        filename: 'logs/development.log.txt',
      },
    )),
  ],
});
