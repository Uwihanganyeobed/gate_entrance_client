// src/api/api-client.ts
import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Ensure this environment variable is set
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  };

  post = (data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  put = (id: number | string, data: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put<T>(`${this.endpoint}/${id}`, data, config)
      .then((res) => res.data);
  };

  delete = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  };
}

export default APIClient;