import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { isEmptyObject } from './util';

/**
 * Handle with json database under fs and lodash operations
 *
 * @return {*} 
 */
module.exports = () => {
  let dbInstance;

  function init({ database, docs }) {
    const adapter = new FileSync(`./data/${database}`);
    dbInstance = lowdb(adapter);
    
    // Start db documents
    if (isEmptyObject(dbInstance)) {
      dbInstance.defaults(docs).write();

      return dbInstance;
    }

    return dbInstance;
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
    dbInstance
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
    dbInstance
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
    return dbInstance
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
    return dbInstance
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
    dbInstance
      .get(from)
      .remove(params)
      .write();
  };

  return {
    init,
    append,
    update,
    del,
    getByFind,
    getAll,
  };
};
