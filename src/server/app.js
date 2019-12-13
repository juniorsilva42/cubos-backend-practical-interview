/* 
 * External Dependecies 
*/
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';

module.exports = ({
  router,
  logger,
}) => {
  const app = express();

  app.use(helmet());
  app.use(compression());

  app.use(router);

  let httpServer;
  const HTTP_MODE_ON = true;

  if (HTTP_MODE_ON) {
    httpServer = fn => http.createServer(app).listen(5000, fn);
  }

  return {
    app,
    start: async () => {
      if (HTTP_MODE_ON) {
        await httpServer(() => {
          logger.info(`API running on HTTP server on port 5000}}`);
        });
      }
    },
  };
};