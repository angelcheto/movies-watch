import "@styles/movie-form.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@services/AuthContext';
import movieAPI from '@services/movieAPI';

const EditMovie = () => {
  const { movieId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: '', 
    genre: '', 
    year: '', 
    imageUrl: '', 
    description: '' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movie = await movieAPI.getOne(movieId);
        if (!user || movie.ownerId !== user._id) return navigate('/');
        setForm({ ...movie, year: movie.year.toString() });
      } catch {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [movieId, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title required';
    if (!form.genre.trim()) newErrors.genre = 'Genre required';
    if (!form.year || form.year < 1900 || form.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Valid year required';
    }
    if (!form.imageUrl.trim()) newErrors.imageUrl = 'Image URL required';
    if (!form.description.trim()) newErrors.description = 'Description required';
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await movieAPI.update(movieId, { ...form, year: parseInt(form.year) });
      navigate(`/movies/${movieId}`);
    } catch (err) {
      setErrors({ submit: err.message || 'Update failed. Please try again.' });
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-form-container">
      <h1>Edit Movie</h1>
      {errors.submit && <div className="error-message">{errors.submit}</div>}
      
      <form onSubmit={handleSubmit}>
        {['title', 'genre', 'year', 'imageUrl'].map(field => (
          <div key={field} className={`form-group ${errors[field] ? 'has-error' : ''}`}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'year' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              min={field === 'year' ? '1900' : undefined}
              max={field === 'year' ? new Date().getFullYear() + 5 : undefined}
            />
            {errors[field] && <span className="error-text">{errors[field]}</span>}
          </div>
        ))}

        <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>
        
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMovie;