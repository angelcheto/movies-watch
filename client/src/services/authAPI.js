import requester from './requester';

const BASE_URL = '/api/users';

/**
 * 
 * @param {string} email 
 * @param {string} password  
 */


export const login = (email, password) => requester.post(`${BASE_URL}/login`, { email, password });
export const register = (email, password) => requester.post(`${BASE_URL}/register`, { email, password });
export const logout = () => requester.get(`${BASE_URL}/logout`);