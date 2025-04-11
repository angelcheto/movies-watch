import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../services/AuthContext';

const GuestGuard = () => {
  const { isAuthenticated } = useAuthContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default GuestGuard;