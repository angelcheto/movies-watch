import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieAPI from '@services/movieAPI';
import '@styles/movie-catalog.css';

const MovieCatalog = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await movieAPI.getAll();
        setMovies(data);
      } catch {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div className="movie-card" key={movie._id}>
          <img 
            className="movie-poster" 
            src={movie.imageUrl}
            alt={movie.title}
            onError={(e) => e.target.src = '/images/movie_placeholder.jpg'}
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-meta">
              <span className="badge">{movie.genre}</span>
              <span className="movie-year">{movie.year}</span>
            </div>
            <Link to={`/movies/${movie._id}`} className="details-link">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCatalog;