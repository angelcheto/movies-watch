const API_URL = 'http://localhost:3001/api/movies';

export const movieService = {
  async getAll() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return await response.json();
  },

  async create(movieData, token) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) throw new Error('Failed to create movie');
    return await response.json();
  },

  async update(id, movieData, token) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) throw new Error('Failed to update movie');
    return await response.json();
  },

  async deleteMovie(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete movie');
  },

  async addComment(id, comment, token) {
    const response = await fetch(`${API_URL}/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(comment)
    });
    if (!response.ok) throw new Error('Failed to add comment');
    return await response.json();
  }
};

export const fetchFeaturedMovies = async () => {
    const response = await fetch(API_URL + '/featured');
    if (!response.ok) throw new Error('Failed to fetch featured movies');
    return await response.json();
  };