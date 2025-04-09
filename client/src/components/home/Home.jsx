import "@styles/typography.css";
import "@styles/welcome.css";
import "@styles/all-games.css";
import React, { useState, useEffect } from 'react';
import { getLatest } from '../../services/movieAPI'; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getLatest(); 
        setMovies(data);
      } catch (err) {
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (movies.length === 0) return <NoMoviesAvailable />;

  return (
    <div className="home-container">
      <HeroBanner />
      <MovieGrid movies={movies} />
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="loading">
    <div className="spinner"></div>
    <p>Loading movies...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="error">
    <p>{message}</p>
    <button onClick={() => window.location.reload()}>Retry</button>
  </div>
);

const NoMoviesAvailable = () => (
  <div className="empty-state">
    <img src="/images/popcorn.png" alt="No movies" />
    <p>Coming soon! Check back for new releases.</p>
  </div>
);

const HeroBanner = () => (
  <div className="hero">
    <div className="hero-text">
      <h2>DISCOVER THE LATEST CINEMATIC MASTERPIECES</h2>
      <h3>Exclusively on MovieHub</h3>
    </div>
    <img 
      src="/images/cinema_banner.jpg" 
      alt="Cinema banner" 
      onError={(e) => e.target.src = '/images/default_banner.jpg'}
    />
  </div>
);

const MovieGrid = ({ movies }) => (
  <div className="movie-section">
    <h1>Featured Movies</h1>
    <div className="movies-grid">
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} /> 
      ))}
    </div>
  </div>
);

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <div className="movie-image">
      <img
        src={movie.imageUrl || '/images/movie_placeholder.jpg'} 
        alt={movie.title}
        onError={(e) => e.target.src = '/images/movie_placeholder.jpg'}
      />
      <div className="movie-overlay">
        <a href={`/movies/${movie._id}`}>View Details</a> 
      </div>
    </div>
    <div className="movie-details">
      <h3>{movie.title}</h3>
      {movie.rating && <StarRating rating={movie.rating} />} 
    </div>
  </div>
);

const StarRating = ({ rating }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? 'filled' : ''}>
        {i < rating ? '★' : '☆'}
      </span>
    ))}
  </div>
);

export default Home;