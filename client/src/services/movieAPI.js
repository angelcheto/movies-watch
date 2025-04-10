import * as requester from './requester';

const BASE_URL = '/api/data/movies'


export const getAll = async () => {
  const result = await requester.get(BASE_URL);
  return Object.values(result); 
};

export const getLatest = async () => {
  const query = new URLSearchParams({
    sortBy: '_createdOn desc',
    pageSize: 3
  }).toString();
  
  return requester.get(`${BASE_URL}?${query}`);
};

export const getOne = (movieId) => requester.get(`${BASE_URL}/${movieId}`);
export const create = (movieData) => requester.post(BASE_URL, movieData);
export const remove = (movieId) => requester.del(`${BASE_URL}/${movieId}`);
export const update = (movieId, movieData) => requester.put(`${BASE_URL}/${movieId}`, movieData);

export default {
  getAll,
  getLatest,
  getOne,
  create,
  remove,
  update
};