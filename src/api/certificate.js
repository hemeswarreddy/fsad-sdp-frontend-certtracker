import axios from 'axios';

const API_URL = 'http://localhost:2006/cert';

export const addCertificate = async (certificateData) => {
  try {
    console.log('Sending certificate data:', certificateData);
    const response = await axios.post(`${API_URL}/add`, certificateData);
    return response.data;
  } catch (error) {
    console.error('Add Certificate Error:', error);
    console.error('Error Response:', error.response);
    console.error('Request Data:', certificateData);
    throw error;
  }
};

export const getCertificatesByUser = async (userid) => {
  const response = await axios.get(`${API_URL}/viewcertsbyuser/${userid}`);
  return response.data;
};

export const updateCertificate = async (certificateData) => {
  const response = await axios.put(`${API_URL}/updatebyname`, certificateData);
  return response.data;
};

export const deleteCertificate = async (certName, userid) => {
  const response = await axios.delete(`${API_URL}/delete/${certName}/${userid}`);
  return response.data;
};
