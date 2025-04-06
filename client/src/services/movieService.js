import * as requester from './requester';

const BASE_URL = 'http://localhost:3030/data/movies';

export const getAll = async () => {
  const result = await requester.get(BASE_URL);
  return Object.values(result); 
};

export const getFeatured = async () => {
  const params = new URLSearchParams({
    sortBy: 'createdAt',
    pageSize: '3',
  });
  return requester.get(`${BASE_URL}?${params.toString()}`);
};

export const getById = (id) => requester.get(`${BASE_URL}/${id}`);

export const create = (movieData) => requester.post(BASE_URL, movieData);

export const update = (id, movieData) => requester.put(`${BASE_URL}/${id}`, movieData);

export const remove = (id) => requester.del(`${BASE_URL}/${id}`);

export const addComment = (id, comment) => 
  requester.post(`${BASE_URL}/${id}/comments`, comment);

const movieAPI = {
  getAll,
  getFeatured,
  getById,
  create,
  update,
  remove,
  addComment,
};

export default movieAPI;