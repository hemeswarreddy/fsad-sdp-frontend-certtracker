import axios from 'axios'

const axiosClient = axios.create({ baseURL: 'https://certracker.up.railway.app' })

axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const role = localStorage.getItem('role')
      // admin has no token, skip auto-logout on 401
      if (role !== 'admin') {
        sessionStorage.clear()
        localStorage.clear()
        if (window.location.pathname !== '/login') window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient
