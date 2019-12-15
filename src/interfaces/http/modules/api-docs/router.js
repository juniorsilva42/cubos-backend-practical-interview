/*
 * External Dependencies
*/
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

/*
 * Internal Dependencies
*/
import docs from '../../../../../docs/docs.json';

/**
 * Router of api-docs
 *
 * @return {router} router verbs of api-docs
*/
module.exports = () => {
  const router = Router();

  router.use('/', swaggerUi.serve, swaggerUi.setup(docs));

  return router;
};
