import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://inkmark-server-production.up.railway.app/api",
  withCredentials: true,
});

export default axiosInstance;

interface CustomErrorResponse {
  error?: string; 
}

export type axiosError = AxiosError<CustomErrorResponse>;
