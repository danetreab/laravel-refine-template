import { LOCAL_ACCESS_TOKEN } from "@/config/local-storage-key";
import { HttpError } from "@refinedev/core";
import axios, { AxiosRequestHeaders } from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem(LOCAL_ACCESS_TOKEN);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
  }

  return request;
});
axiosInstance.interceptors.response.use(
  async (response) => {
    // If the response is a Blob
    if (response.data instanceof Blob) {
      try {
        // Convert the Blob to JSON
        const data = JSON.parse(await new Response(response.data).text());

        if (data.code !== 200) {
          const customError: HttpError = {
            statusCode: data.code,
            message: data.message,
            errors: data.error,
          };

          return Promise.reject(customError);
        }

        return response;
      } catch (error) {
        // If the Blob can't be converted to JSON, just return the original response
        return response;
      }
    }

    // If the response is not a Blob
    if (response.data.code !== 200) {
      const customError: HttpError = {
        statusCode: response.data.code,
        message: response.data.message,
        errors: response.data.error,
      };

      return Promise.reject(customError);
    }

    return response;
  },
  async (error) => {
    if (error.response) {
      let message;
      let status;

      if (error.response.data instanceof Blob) {
        try {
          const data = JSON.parse(
            await new Response(error.response.data).text()
          );

          message = data?.message;
          status = error.response?.status;
        } catch (error: any) {
          message = error.message;
          status = error.status;
        }
      } else {
        message = error.response?.data?.message;
        status = error.response?.status;
      }

      const customError: HttpError = {
        ...error,
        message,
        statusCode: status,
      };

      return Promise.reject(customError);
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
