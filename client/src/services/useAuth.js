import { useNavigate } from "react-router-dom";
import { login, register, logout } from "@services/authAPI";
import { useAuthContext } from "@services/AuthContext";
import { storeUserData, clearUserData } from "@services/authUtils";

export const useLogin = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const loginHandler = async (email, password) => {
    try {
      const authData = await login(email, password);
      storeUserData(authData); 
      setUser(authData);
      navigate('/'); 
      return { success: true, data: authData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return loginHandler;
};

export const useRegister = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const registerHandler = async (email, password) => {
    try {
      const authData = await register(email, password);
      storeUserData(authData); // Store in localStorage
      setUser(authData);
      navigate('/'); // Redirect after registration
      return { success: true, data: authData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return registerHandler;
};

export const useLogout = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      clearUserData(); 
      setUser(null);
      navigate('/login');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return logoutHandler;
};