import axios from 'axios';

const API_URL = 'http://localhost:2006/admin';

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/viewallusers`);
  return response.data;
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteuserbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Delete Error:', error);
    console.error('Request URL:', `${API_URL}/deleteuserbyid/${id}`);
    throw error;
  }
};

export const getAllCertificates = async () => {
  try {
    const response = await axios.get(`${API_URL}/viewallcertificates`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    console.error('Response:', error.response);
    throw error;
  }
};
