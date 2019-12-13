import { createContainer, asFunction } from 'awilix';

import app from './server';

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
});

module.exports = container;