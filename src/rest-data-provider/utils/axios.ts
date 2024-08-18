import axios, { InternalAxiosRequestConfig } from "axios";
import type { HttpError } from "@refinedev/core";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Ensure that request.headers exists and is an object

    if (request.headers && token) {
      request.headers["Authorization"] = `${token}`;
    }

    return request;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export { axiosInstance };
