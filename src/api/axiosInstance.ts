import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://inkmark-server-production.up.railway.app/api", // http://localhost:3000
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error); 
});

export default axiosInstance;

interface CustomErrorResponse {
  error?: string; 
}

export type axiosError = AxiosError<CustomErrorResponse>;
