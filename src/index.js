import container from './container';

const app = container.resolve('app');
const jayessdb = container.resolve('jayessdb');

(async () => {
  const { APP_ENV } = process.env;
  
  try {
    // Application start
    await app.start();

    // Start default database
    jayessdb.init({ database: 'cubos-db.json', docs: { scheduleRules: [] } });
  } catch (err) {
    console.log(err);
    throw new Error('Fatal Error Starting Application');
  }
})();
