import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext';
import movieAPI from '../../services/movieAPI';  
import '@styles/movie-form.css';

const CreateMovie = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    imageUrl: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!formData.title || !formData.genre || !formData.year) {
      setError('Title, Genre, and Year are required');
      return;
    }
  
    try {
      const newMovie = await movieAPI.create(formData);
      
      if (newMovie._id) {
        navigate(`/movies/${newMovie._id}`);
      }
    } catch (err) {
      console.error('Creation Error:', err);
      setError(err.message || 'Failed to create movie. Please try again.');
    }
  };
  return (
    <div className="movie-form-container">
      <h1>Add New Movie</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max="2030"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Movie</button>
      </form>
    </div>
  );
};

export default CreateMovie;