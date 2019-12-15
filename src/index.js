import container from './container';

const app = container.resolve('app');
const jayessdb = container.resolve('jayessdb');

(async () => { 
  try {
    // Application start
    await app.start();

    // Start default database
    jayessdb.init({ database: 'cubos-db.json', docs: { scheduleRules: [] } });
  } catch (err) {
    throw new Error(`Fatal Error Starting Application \n Stack Trace: ${err}`);
  }
})();
