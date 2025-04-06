import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext';
import { movieService } from '../../services/movieService';
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
    try {
      const newMovie = await movieService.create(formData, user.token);
      navigate(`/movies/${newMovie._id}`);
    } catch (err) {
      setError(err.message || 'Failed to create movie');
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