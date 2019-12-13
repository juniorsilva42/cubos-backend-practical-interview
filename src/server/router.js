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
import { Success } from '../infra/support/response';

module.exports = () => {
  const router = Router();

  router.options('*', cors());
  router.use(cors('*'));
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  // Default route to check api health
  router.get('/_health_check', (req, res) => res.status(Status.OK).json(Success('API is running with a lot health!')));

  /*
   *
   * Register routes of app/webapp gateways
  */

  // Attendance endpoints to handle with hours of service rules
  router.post('/attendance', () => console.log('attendance post'));
  router.delete('/attendance/:id', () => console.log('attendance delete'));
  router.get('/attendance', () => console.log('attendance get'));
  router.get('/attendance/:interval', () => console.log('attendance get by interval'));

  return router;
};