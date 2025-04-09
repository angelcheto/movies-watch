import { useEffect } from 'react';
import { useLogout } from '@services/useAuth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.message || 'Logout failed');
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="logout-container">
      {isLoggingOut ? (
        <div className="loading-message">
          Logging out...
        </div>
      ) : error ? (
        <div className="error-message">
          {error} <button onClick={handleLogout}>Try again</button>
        </div>
      ) : null}
    </div>
  );
};

export default Logout;