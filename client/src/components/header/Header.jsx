import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../services/AuthContext';
import '@styles/navigation.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h1><Link className="home" to="/">MovieHub</Link></h1>
      <nav>
        <Link to="/">All movies</Link>
        
        {user ? (
          <div id="user">
            <Link to="/movies/create">Add Movie</Link>
            <button onClick={logout}>Logout</button>
            <span>Welcome, {user.email}</span>
          </div>
        ) : (
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;