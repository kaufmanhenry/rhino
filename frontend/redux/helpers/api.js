import axios from 'axios';
import { getItem } from './stash';

export const tokenID = 'rhinoToken';

export default async function apiRequest(url, method = 'GET', body = null) {
  const token = getItem(tokenID);
  const params = {
    method,
    url: `/api${url}`,
    headers: {}
  };
  if (body) {
    params.data = body;
  }
  if (token) {
    params.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const { data } = await axios(params);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
