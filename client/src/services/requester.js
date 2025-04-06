import { getAccessToken } from './authUtils';

async function requester(method, url, data) {
  const options = {
    method: method !== 'GET' ? method : 'GET',
    headers: {}
  };

  const token = getAccessToken();
  if (token) {
    options.headers['X-Authorization'] = token;

  }

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if (response.status === 204) {
    return;
  }

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');

export default {
  get, 
  post, 
  put, 
  del,
};