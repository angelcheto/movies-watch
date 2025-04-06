import "@styles/movie-details.css";

import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../services/AuthContext.jsx';
import { movieService } from '../../services/movieService';

const MovieDetails = () => {
  const { movieId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await movieService.getById(movieId);
        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    try {
      const updatedMovie = await movieService.addComment(movieId, {
        author: user.email,
        content: comment,
        createdAt: new Date().toISOString()
      });
      setMovie(updatedMovie);
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await movieService.deleteMovie(movieId);
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
          onError={(e) => {
            e.target.src = '/images/movie_placeholder.jpg';
          }}
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-meta">
            <span className="year">Year: {movie.year}</span>
            <span className="genre">{movie.genre}</span>
          </div>
        </div>
      </div>

      <div className="movie-description">
        <p>{movie.description}</p>
      </div>

      <div className="reviews-section">
        <h2 className="reviews-title">Reviews</h2>
        {movie.comments?.length > 0 ? (
          <ul className="reviews-list">
            {movie.comments.map((comment, index) => (
              <li key={index} className="review-item">
                <p className="review-author">{comment.author}</p>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-reviews">No reviews yet</p>
        )}
      </div>

      {user && user._id === movie.ownerId && (
        <div className="action-buttons">
          <button 
            className="action-btn edit-btn"
            onClick={() => navigate(`/movies/${movie._id}/edit`)}
          >
            Edit
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      {user && (
        <div className="add-review">
          <form className="review-form" onSubmit={handleCommentSubmit}>
            <label htmlFor="new-comment">Add Review</label>
            <textarea
              id="new-comment"
              className="review-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              required
            />
            <button type="submit" className="review-submit">
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default MovieDetails;