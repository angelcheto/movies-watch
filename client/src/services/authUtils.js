export const getAccessToken = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : '';
};

export const storeUserData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const clearUserData = () => {
  localStorage.removeItem('user');
};

export const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};