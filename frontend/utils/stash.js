export const stashData = (id, data) => localStorage.setItem(id, data);
export const getData = id => localStorage.getItem(id);
