import fs from 'fs';
import winston from 'winston';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

module.exports = () =>
  new winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File(Object.assign(
        true, {
          filename: `logs/development.log.txt`,
        },
      )),
    ],
  });