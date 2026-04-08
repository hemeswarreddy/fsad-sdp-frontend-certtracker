import axiosClient from './axiosClient'

export const addCertificate = async (certificateData) => {
  const response = await axiosClient.post('/cert/add', certificateData)
  return response.data
}

export const getCertificatesByUser = async (userid) => {
  const response = await axiosClient.get(`/cert/viewcertsbyuser/${userid}`)
  return response.data
}

export const updateCertificate = async (certificateData) => {
  const response = await axiosClient.put('/cert/updatebyname', certificateData)
  return response.data
}

export const deleteCertificate = async (certName, userid) => {
  const response = await axiosClient.delete(`/cert/delete/${certName}/${userid}`)
  return response.data
}
