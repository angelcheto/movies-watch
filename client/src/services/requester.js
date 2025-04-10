import { getAccessToken } from './authUtils';

async function requester(method, url, data) {
  const options = {
    method: method.toUpperCase(),
    headers: {}
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    options.headers['X-Authorization'] = accessToken;
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    if (response.status === 204) {
      return;
    }

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;

  } catch (error) {
    console.error('Request failed:', error.message || error);
    throw error;
  }
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