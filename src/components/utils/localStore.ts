export const Storage = {
    getItem: (key: string) => {
      const item = localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      } else {
        return null;
      }
    },
    setItem: (key: string, value: any) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
    },
  };