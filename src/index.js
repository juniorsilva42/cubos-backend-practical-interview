import container from './container';
import dotenv from 'dotenv';
import path from 'path';

const app = container.resolve('app');

/**
 * Bootstrap env of app
 * 
 * @return {*}
*/
(async () => {
  try {
    const { APP_ENV } = process.env;

    if (APP_ENV === 'development') {
      dotenv.config({ path: `${path.normalize(path.join(__dirname, '..', '..', '..'))}/.env` });
    }
    
    // Application bootstrap
    await app.start;
  } catch (err) {
    throw new Error(`Fatal application error! :(\nStack trace: ${err}`);
  }
})();