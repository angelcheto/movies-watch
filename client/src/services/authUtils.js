export const getAccessToken = () => {
  const authJSON = localStorage.getItem('auth');
  return authJSON ? JSON.parse(authJSON).accessToken : null;
};