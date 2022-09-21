export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  const item = localStorage.getItem(key);

  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
};
