import container from './container';

const app = container.resolve('app');

(async function() {
  try {
    // Application bootstrap
    await app.start();
  } catch (err) {
    console.log(err);
    throw new Error('Fatal Error Starting Application');
  }
})();