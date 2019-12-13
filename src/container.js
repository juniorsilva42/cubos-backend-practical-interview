import { createContainer, asFunction } from 'awilix';

import app from './server';
import logging from './infra/logging';

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  logger: asFunction(logging).singleton(),
});

module.exports = container;