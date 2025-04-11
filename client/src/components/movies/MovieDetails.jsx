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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      const newComment = await commentsAPI.addComment(movieId, commentInput);
      setComments(prev => [...prev, newComment]);
      setCommentInput('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await movieAPI.remove(movieId);
      navigate('/');
    } catch (err) {
      console.error('Error deleting movie:', err);
      setError('Failed to delete movie. Please try again.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (isLoading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;
  
  return (
    <>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete "{movie.title}"?</p>
            <div className="modal-actions">
              <button 
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    
      <div className="movie-container">
        <div className="movie-hero">
          <img 
            className="movie-poster" 
            src={movie.imageUrl} 
            alt={movie.title}
            onError={(e) => e.target.src = '/images/movie_placeholder.jpg'}
          />
          <div className="movie-details">
            <h1>{movie.title}</h1>
            <div className="movie-info">
              <span className="genre">{movie.genre}</span>
              <span className="year">{movie.year}</span>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="synopsis">
            <h2>Storyline</h2>
            <p>{movie.description}</p>
          </div>

          <div className="reviews">
            <h2>Reviews</h2>
            {comments.length > 0 ? (
              <div className="reviews-list">
                {comments.map((comment) => (
                  <div key={comment._id} className="review">
                    <div className="review-header">
                      <span className="review-author">
                        {comment.owner?.email || 'Anonymous'}
                      </span>
                      <span className="review-date">
                        {new Date(comment._createdOn).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="review-text">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews yet</p>
            )}
          </div>

          {user && movie && user._id === movie.ownerId && (
          <div className="action-buttons">
            <button 
              className="btn btn-edit"
              onClick={() => navigate(`/movies/${movie._id}/edit`)}
            >
              Edit Movie
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Movie
            </button>
          </div>
        )}
          {user && (
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <h3>Write a Review</h3>
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Share your thoughts about the movie..."
                required
              />
              <button type="submit" className="btn btn-primary">
                Post Review
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;