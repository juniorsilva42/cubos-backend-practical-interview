import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { isEmptyObject } from './util';

module.exports = () => {
  const source = './data/cubos-db.json';
  const documents = { scheduleRules: [] };

  const adapter = new FileSync(source);
  const db = lowdb(adapter);

  // Start db documents
  if (isEmptyObject(db)) {
    db.defaults(documents).write();
  }

  const append = (from, data) => {
    db
      .get(from)
      .push(data)
      .write();
  };

  const update = (from, data) => {
    db
      .update(from)
      .push(data)
      .write();
  };

  const getByFind = (from, params = {}) => {
    return db
      .get(from)
      .find(params)
      .value();
  };

  const getAll = (from) => {
    return db
      .get(from)
      .value();
  };

  const del = (from, params = {}) => {
    db
      .get(from)
      .remove(params)
      .write();
  };

  return {
    append,
    update,
    del,
    getByFind,
    getAll,
  };
};
