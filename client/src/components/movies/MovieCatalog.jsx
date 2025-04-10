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

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="catalog">
      <h1>Movie Catalog</h1>
      <div className="movies">
        {movies.map(movie => (
          <div key={movie._id} className="movie">
            <Link to={`/movies/${movie._id}`}>
              <img 
                src={movie.imageUrl} 
                alt={movie.title}
                onError={(e) => e.target.src = '/images/placeholder.jpg'}
              />
              <h3>{movie.title}</h3>
              <p>{movie.genre} • {movie.year}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;