import { getAccessToken } from './authUtils';

async function requester(method, url, data) {
  const options = {
    method: method.toUpperCase(),
    headers: {}
  };

  try {
    const accessToken = getAccessToken();
    if (accessToken) {
      options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }

    console.log('Making request to:', url, 'with options:', options);
    
    const response = await fetch(url, options);
    console.log('Received response:', response.status, response.statusText);

    if (response.status === 204) return null;
    
    const result = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      console.error('API Error:', result);
      throw new Error(result.message || `Request failed with status ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Full error details:', error);
    throw new Error(error.message || 'Network request failed');
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