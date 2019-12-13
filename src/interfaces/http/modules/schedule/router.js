import { Router } from 'express';
import Status from 'http-status';
import shortUuid from 'short-uuid';

import { formatter } from '../../../../infra/support/helpers/date';
import { createSchema } from './schema';
import { parse } from '../../../../infra/support/request';

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

    const commitChanges = {
      id,
      ...req.body,
    };

    const a = parse(createSchema, req.body);
    return res.status(Status.OK).json(Success(a));
  });

  router.delete('/rules/:id', async (req, res) => {
    logger.info('attendance router works!');
  });

  return router;
};
