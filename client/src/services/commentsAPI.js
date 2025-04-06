import requester from './requester';

const BASE_URL = 'http://localhost:3030/data/comments';

const create = (movieId, text) => requester.post(BASE_URL, { movieId, text });

const getAll = (movieId) => {
  const params = new URLSearchParams({
    where: `movieId="${movieId}"`,
    load: `author=userId:users`, 
  });

  return requester.get(`${BASE_URL}?${params.toString()}`);
};

const commentsAPI = {
  create,
  getAll,
};

export default commentsAPI;