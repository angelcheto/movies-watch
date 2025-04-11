import { Link } from 'react-router-dom';
import { useAuthContext } from '../../services/AuthContext';
import { useLogout } from '../../services/useAuth';
import '@styles/navigation.css';

const Header = () => {
  const { user } = useAuthContext();
  const logout = useLogout();

  return (
    <header className="header">
      <div className="nav-container">
        <h1>
          <Link to="/" className="brand">MovieHub</Link>
        </h1>
        
        <nav className="nav-links">
          <Link to="/catalog" className="nav-link">All Movies</Link>
          
          {user ? (
            <div id="user">
              <Link to="/movies/create" className="nav-link">Add Movie</Link>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
              <span className="user-greeting">Welcome, {user.email}</span>
            </div>
          ) : (
            <div id="guest">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;