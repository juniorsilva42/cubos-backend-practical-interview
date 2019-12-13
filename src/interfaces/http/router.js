/*
 * External Dependecies
*/
import { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Status from 'http-status';

/*
 * Internal Dependencies
*/
import httpLogger from './middlewares/httpLogger';
import logger from '../../infra/logging';
import registerRoutes from '../../infra/support/registerRoutes';

module.exports = () => {
  const router = Router();

  // Set default logger to handle with all http requests
  router.use(httpLogger(logger()));

  // Set default middlewares to app
  router.options('*', cors());
  router.use(cors('*'));
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  // Redirect all router of app to default path /api/{version}
  router.use('/api/v1', router);

  // Default route to check api health
  router.get('/_health_check', (req, res) => res.status(Status.OK).json('API is running with a lot health!'));

  const routes = [
    { path: 'schedule', module: 'schedule' },
  ];

  /*
   * Register routes of app/webapp gateways
  */
  registerRoutes({ router, routes });

  return router;
};
