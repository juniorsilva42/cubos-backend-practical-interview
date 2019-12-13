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
import response from './infra/support/response';
import jayessdb from './infra/jayess-db';

// Create a new instance of DI IoC container
const container = createContainer();

/**
 * Create and dispatch a new container with all singleton functions
 */
container.register({
  app: asFunction(app).singleton(),
  logger: asFunction(logging).singleton(),
  router: asFunction(router).singleton(),
  server: asFunction(server).singleton(),
  response: asFunction(response).singleton(),
  jayessdb: asFunction(jayessdb).singleton(),
});

module.exports = container;
