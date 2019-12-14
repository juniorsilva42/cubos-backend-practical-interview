import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { isEmptyObject } from './util';

/**
 * Handle with json database under fs and lodash operations
 *
 * @return {*} 
 */
module.exports = () => {
  const source = './data/cubos-db.json';
  const documents = { scheduleRules: [] };

  const adapter = new FileSync(source);
  const db = lowdb(adapter);

  // Start db documents
  if (isEmptyObject(db)) {
    db.defaults(documents).write();
  }

  /**
   * Append a new collection into json db
   *
   * @param {string} from collection name
   * @param {object} data object to append
   *
   * @return {*} 
   */  
  const append = (from, data) => {
    db
      .get(from)
      .push(data)
      .write();
  };

  /**
   * Update a given collection into json db
   *
   * @param {string} from collection name
   * @param {object} data object to update
   *
   * @return {*} 
   */    
  const update = (from, data) => {
    db
      .update(from)
      .push(data)
      .write();
  };

  /**
   * Get a item or n items based a set of params
   *
   * @param {string} from collection name
   * @param {object} params object of params of where clausule
   *
   * @return {*} 
   */      
  const getByFind = (from, params = {}) => {
    return db
      .get(from)
      .find(params)
      .value();
  };

  /**
   * Get all items from json db
   *
   * @param {string} from collection name
   *
   * @return {*} 
   */      
  const getAll = (from) => {
    return db
      .get(from)
      .value();
  };

  /**
   * Delete a given collection item
   *
   * @param {string} from collection name
   * @param {object} params object of params of where clausule
   *
   * @return {*} 
   */     
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
