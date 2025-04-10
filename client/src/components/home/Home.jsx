import "@styles/typography.css";
import "@styles/welcome.css";
import "@styles/all-games.css";
import { useState, useEffect } from 'react';
import { getLatest } from '@services/movieAPI';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getLatest();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <div className="loading"><div className="spinner"></div>Loading movies...</div>;
  if (error) return <div className="error"><p>{error}</p><button onClick={() => window.location.reload()}>Retry</button></div>;
  if (movies.length === 0) return <div className="empty"><img src="/images/popcorn.png" alt="No movies"/><p>Coming soon!</p></div>;

  return (
    <div className="home-container">
      <div className="welcome-banner">
        <div className="welcome-text">
          <h2>DISCOVER THE LATEST CINEMATIC MASTERPIECES</h2>
          <h3>Exclusively on MovieHub</h3>
        </div>
        <img 
          src="/images/cinema_banner.jpg" 
          alt="Cinema banner" 
          className="welcome-image"
          onError={(e) => e.target.src = '/images/default_banner.jpg'}
        />
      </div>

      <div className="games-grid-container">
        <h1>Featured Movies</h1>
        <div className="games-grid">
          {movies.map(movie => (
            <div key={movie._id} className="game-card">
              <div className="game-image">
                <img
                  src={movie.imageUrl || '/images/movie_placeholder.jpg'}
                  alt={movie.title}
                  onError={(e) => e.target.src = '/images/movie_placeholder.jpg'}
                />
                <div className="game-overlay">
                  <Link to={`/movies/${movie._id}`} className="game-link">View Details</Link>
                </div>
              </div>
              <div className="game-details">
                <h3>{movie.title}</h3>
                {movie.rating && (
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < movie.rating ? 'filled' : ''}>
                        {i < movie.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;