/* global localStorage */
export const fetchItem = id => localStorage.getItem(id);
export const saveItem = (id, data) => localStorage.setItem(id, JSON.stringify(data));
