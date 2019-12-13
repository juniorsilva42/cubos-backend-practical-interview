export const isEmptyObject = (dbInstance) => {
  const data = dbInstance.getState();
    
  if (Object.keys(data).length === 0) {
    return true;
  }

  return false;
}