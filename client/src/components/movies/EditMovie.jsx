import "@styles/movie-form.css";

import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../services/AuthContext.jsx';
import { movieService } from '../../services/movieService';

const EditMovie = () => {
  const { movieId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    imageUrl: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await movieService.getById(movieId);
        if (movie.ownerId !== user._id) {
          navigate('/');
          return;
        }
        setFormData({
          title: movie.title,
          genre: movie.genre,
          year: movie.year,
          imageUrl: movie.imageUrl,
          description: movie.description
        });
      } catch (error) {
        console.error('Error fetching movie:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [movieId, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (formData.year < 1900 || formData.year > 2030) newErrors.year = 'Year must be between 1900 and 2030';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await movieService.update(movieId, formData, user.accessToken);
      navigate(`/movies/${movieId}`);
    } catch (error) {
      console.error('Error updating movie:', error);
      setErrors({ submit: 'Failed to update movie. Please try again.' });
    }
  };

  if (isLoading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="movie-form-container">
      <div className="movie-form-header">
        <h1>Edit Movie</h1>
      </div>
      {errors.submit && <div className="error-message">{errors.submit}</div>}
      
      <form className="movie-form" onSubmit={handleSubmit}>
        {/* Form groups remain the same but use new CSS classes */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'has-error' : ''}
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>
        
        {/* Other form groups... */}
        
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Movie'}
        </button>
      </form>
    </div>
  );
};
export default EditMovie;