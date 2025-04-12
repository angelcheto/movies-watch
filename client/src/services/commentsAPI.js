import requester from './requester';

const BASE_URL = '/api/data/comments';

const createComment = (movieId, content) => 
  requester.post(BASE_URL, { 
    movieId, 
    content,
    userId: localStorage.getItem('auth')?.userId 
  });

const getMovieComments = (movieId) => {
  const query = new URLSearchParams({
    where: `movieId="${movieId}"`,
    load: 'owner=_ownerId:users' 
  }).toString();
  
  return requester.get(`${BASE_URL}?${query}`);
};
const commentsAPI = {
  addComment: createComment,
  getAll: getMovieComments,
};

export default commentsAPI;