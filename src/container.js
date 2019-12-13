/*
 * External Dependecies
*/
import { createContainer, asFunction } from 'awilix';

/*
 * Internal Dependecies
*/
import app from './bootstrap';
import logging from './infra/logging';
import router from './interfaces/http/router';
import server from './server/app';

// Create a new instance of DI container
const container = createContainer();

/**
 * Create and dispatch a new container with all singleton functions
 */
container.register({
  app: asFunction(app).singleton(),
  logger: asFunction(logging).singleton(),
  router: asFunction(router).singleton(),
  server: asFunction(server).singleton(),
});

module.exports = container;
