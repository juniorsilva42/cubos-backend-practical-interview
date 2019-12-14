/**
  * Util to verify if has elements into database
  *
  * @param {dbInstance} instance of lowdb
  *
  * @return {boolean} true if has elements
*/ 
export const isEmptyObject = (dbInstance) => {
  const data = dbInstance.getState();
    
  if (Object.keys(data).length === 0) {
    return true;
  }

  return false;
}