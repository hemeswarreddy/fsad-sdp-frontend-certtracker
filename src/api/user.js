import axios from 'axios';

const API_URL = 'http://localhost:2006/user';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/updateuserprofile`, userData);
  return response.data;
};

export const getUserByUsername = async (username) => {
  const response = await axios.get(`${API_URL}/getbyusername/${username}`);
  return response.data;
};
