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
 * Router of schedule rules module
 *
 * @return {router} router verbs of schedule rules
*/
module.exports = ({
  logger,
}) => {
  const router = Router();

  router.use('/', swaggerUi.serve, swaggerUi.setup(docs));

  return router;
};
