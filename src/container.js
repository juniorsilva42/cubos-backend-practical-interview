import { createContainer, asFunction } from 'awilix';

import app from './bootstrap';
import logging from './infra/logging';
import router from './interfaces/http/router';
import server from './server/app';

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  logger: asFunction(logging).singleton(),
  router: asFunction(router).singleton(),
  server: asFunction(server).singleton(),
});

module.exports = container;