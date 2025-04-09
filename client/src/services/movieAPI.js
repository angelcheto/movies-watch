import * as requester from './requester';

const BASE_URL = 'http://localhost:3030/data/movies';

export const getAll = async () => {
  try {
    const result = await requester.get(BASE_URL);
    return Array.isArray(result) ? result : Object.values(result);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
};


export const getLatest = async () => {
  const urlSearchParams = new URLSearchParams({
      sortBy: '_createdOn',
      pageSize: '3',
  });

  const result = await requester.get(`${BASE_URL}?${urlSearchParams.toString()}`);
  const latestGames = Object.values(result);
  return latestGames;
};


export const getOne = (movieId) => requester.get(`${BASE_URL}/${movieId}`);

export const create = (movieData) => requester.post(`${BASE_URL}`, movieData);

export const remove = (movieId) => requester.del(`${BASE_URL}/${movieId}`);

export const update = (movieId, movieData) => requester.put(`${BASE_URL}/${movieId}`, movieData);

const movieAPI = {
    getAll,
    getLatest,
    getOne,
    create,
    remove,
    update,
};

export default movieAPI;