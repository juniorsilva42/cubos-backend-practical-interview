import { Router } from 'express';
import Status from 'http-status';
import shortUuid from 'short-uuid';

import { formatter } from '../../../../infra/support/helpers/date';
import { createSchema } from './schema';
import { parse } from '../../../../infra/support/request';
import { reject } from '../../../../infra/support/helpers/util';

/**
 * Router of attendance module
 *
 * @return {router} router verbs of attendance
*/
module.exports = ({
  logger,
  jayessdb,
  response: { Success, Fail },
}) => {
  const router = Router();

  router.get('/rules', async (req, res) => {
    const d = formatter(new Date());

    return res.status(Status.OK).json(Success(`get attendance rules works! ${d}`));
  });

  router.get('/rules/:interval', async (req, res) => {
    logger.info('attendance router works!');
  });

  router.post('/rules', async (req, res) => {
    const id = shortUuid.generate();

    const createBody = {
      id,
      ...req.body,
    };

    // Pass body data to validate with predefined schema
    const data = parse(createSchema, createBody);

    if (data.valid) {
      // Append schedule rule data rejecting valid property of Joi
      jayessdb.append('scheduleRules', reject(data, ['valid']));

      return res.status(Status.OK).json(Success(data));
    } 
    
    return res.status(Status.FORBIDDEN).json(Fail(data));
  });

  router.delete('/rules/:id', async (req, res) => {
    const { id } = req.params;

    const data = jayessdb.del('scheduleRules', { id }); 

    return res.status(Status.OK).json(Success(data));
  });

  return router;
};
