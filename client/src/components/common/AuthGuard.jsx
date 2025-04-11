import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../services/AuthContext';

const AuthGuard = () => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;