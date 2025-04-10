import requester from './requester';

const BASE_URL = '/api/data/comments';

const createComment = (movieId, text) => 
  requester.post(BASE_URL, { movieId, text });

const getMovieComments = (movieId) => {
  const query = `where=movieId%3D"${movieId}"&load=author%3DuserId%3Ausers`;
  return requester.get(`${BASE_URL}?${query}`);
};

const commentsAPI = {
  addComment: createComment,
  getAll: getMovieComments,
};

export default commentsAPI;