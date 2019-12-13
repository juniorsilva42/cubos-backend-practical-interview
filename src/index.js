import container from './container';
import jayess from './infra/jayess-db';

const app = container.resolve('app');

(async () => {
  try {
    // Application start
    await app.start();
  } catch (err) {
    console.log(err);
    throw new Error('Fatal Error Starting Application');
  }
})();
