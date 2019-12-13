import container from './container';

const app = container.resolve('app');

(async () => {
  try {
    // Application start
    await app.start();
  } catch (err) {
    throw new Error('Fatal Error Starting Application');
  }
})();
