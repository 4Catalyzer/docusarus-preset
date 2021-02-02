import React from 'react';

export const allValues = (obj) => {
  const keys = Object.keys(obj);
  return Promise.all(keys.map((k) => obj[k])).then((values) => {
    const next = {};
    keys.forEach((k, i) => {
      next[k] = values[i];
    });
    return next;
  });
};

export const Context = React.createContext();

// eslint-disable-next-line react/prop-types
export default ({ imports, children }) => (
  <Context.Provider value={imports}>{children}</Context.Provider>
);
