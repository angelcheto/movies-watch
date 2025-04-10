import "@styles/movie-details.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../services/AuthContext';
import movieAPI from '../../services/movieAPI';
import commentsAPI from '../../services/commentsAPI';

const MovieDetails = () => {
  const { movieId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const movieData = await movieAPI.getOne(movieId);
        const commentsData = await commentsAPI.getAll(movieId);
        setMovie(movieData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [movieId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    try {
      const newComment = await commentsAPI.addComment(movieId, {
        content: commentInput,
        author: { email: user.email } 
      });
      
      setComments(prev => [...prev, {
        ...newComment,
        author: { email: user.email },
        _createdOn: new Date().toISOString()
      }]);
      setCommentInput('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await movieAPI.remove(movieId);
        navigate('/');
      } catch (err) {
        console.error('Error deleting movie:', err);
      }
    }
  };

  if (isLoading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <img 
          className="movie-poster" 
          src={movie.imageUrl} 
          alt={movie.title}
          onError={(e) => e.target.src = '/images/movie_placeholder.jpg'}
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span>Year: {movie.year}</span>
            <span>{movie.genre}</span>
          </div>
        </div>
      </div>

      <div className="movie-description">
        <p>{movie.description}</p>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {comments.length > 0 ? (
          <ul className="reviews-list">
            {comments.map((comment) => (
              <li key={comment._id}>
                <p className="author">
                  {comment.author?.email || 'Anonymous'}
                </p>
                <p>{comment.content}</p>
                {comment._createdOn && (
                  <p className="comment-date">
                    {new Date(comment._createdOn).toLocaleDateString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

      {user?._id === movie.ownerId && (
        <div className="action-buttons">
          <button onClick={() => navigate(`/movies/${movie._id}/edit`)}>
            Edit
          </button>
          <button onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {user && (
        <form className="review-form" onSubmit={handleCommentSubmit}>
          <label>Add Review</label>
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write your review..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default MovieDetails;