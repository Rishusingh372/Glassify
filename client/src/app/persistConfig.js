const storage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      return Promise.resolve(localStorage.getItem(key));
    }
    return Promise.resolve(null);
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return Promise.resolve();
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    return Promise.resolve();
  }
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

export default persistConfig;
