import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateStoredAuth = () => {
      try {
        const storedAuth = localStorage.getItem('auth');
        if (!storedAuth) {
          setLoading(false);
          return;
        }

        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth?.accessToken && parsedAuth?._id && parsedAuth?.email) {
          setAuthState(parsedAuth);
        } else {
          localStorage.removeItem('auth');
        }
      } catch (error) {
        localStorage.removeItem('auth');
      } finally {
        setLoading(false);
      }
    };

    validateStoredAuth();
  }, []);

  useEffect(() => {
    if (authState?.accessToken) {
      localStorage.setItem('auth', JSON.stringify(authState));
    } else {
      localStorage.removeItem('auth');
    }
  }, [authState]);

  const contextValue = {
    user: authState,
    isAuthenticated: !!authState?.accessToken,
    loading,
    changeAuthState: setAuthState
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);