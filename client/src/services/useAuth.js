import { useNavigate } from "react-router-dom";
import { login, register, logout } from "./authAPI";
import { useAuthContext } from "./AuthContext"

export const useLogin = () => {
  const { changeAuthState } = useAuthContext();
  const navigate = useNavigate();

  const loginHandler = async (email, password) => {
      const { password: _, ...authData } = await login(email, password);
      changeAuthState(authData);
      localStorage.setItem('auth', JSON.stringify(authData)); 
      navigate('/'); 
      return authData;
  }

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useAuthContext();
  const navigate = useNavigate();
  const login = useLogin(); 

  const registerHandler = async (email, password) => {
    try {
      await register(email, password);
      
      const { password: _, ...authData } = await login(email, password);
      
      changeAuthState(authData);
      localStorage.setItem('auth', JSON.stringify(authData));
      navigate('/');
      return authData;
    } catch (error) {
      changeAuthState(null);
      localStorage.removeItem('auth');
      throw error;
    }
  };

  return registerHandler;
};

export const useLogout = () => {
  const { changeAuthState } = useAuthContext();
  const navigate = useNavigate();

  return async () => {
    localStorage.removeItem('auth');
    changeAuthState(null);
    navigate('/login');
    
    window.location.reload();
  };
};