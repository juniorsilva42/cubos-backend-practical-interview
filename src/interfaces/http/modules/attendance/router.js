import { Router } from 'express';

module.exports = ({
  logger,
}) => {
  const router = Router();

  router.get('/', async (req, res) => {
    logger.info('attendance router works!')
  });

  return router;
};