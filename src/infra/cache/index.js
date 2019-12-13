import redis from 'redis';

import { promisify } from 'util';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

// for docker: const cache = redis.createClient('6379', 'redis');
const cache = redis.createClient(REDIS_PORT, REDIS_HOST);
cache.auth(REDIS_PASSWORD);

module.exports = ({ logger }) => {
  cache.on('error', (err) => {
    logger.error(`Cache database error = ${err.message}`);
    process.exit();
  });

  cache.on('connect', () => {
    logger.info('Cache database is ready');
  });

  return {
    setAsync: promisify(cache.set).bind(cache),
    getAsync: promisify(cache.get).bind(cache),
  };
};