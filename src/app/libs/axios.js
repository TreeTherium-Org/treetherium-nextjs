import axios from "axios";

export default function createAxios() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const headers = {
    "Content-Type": "application/json",
  };

  let instance = axios.create({
    baseURL: baseUrl,
    headers,
    timeout: 50000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      if (config.data) {
        const haveFile = Object.values(config.data).some(
          (e) => e && e.toString() === "[object File]"
        );
        if (haveFile) {
          config.headers["Content-Type"] = "multipart/form-data";
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject({ ...error.response.data });
      } else {
        return Promise.reject({
          success: false,
          message: "Error Code 100: No response error from server",
          statusCode:
            error && error.request && error.request.status
              ? error.request.status
              : "6666",
        });
      }
    }
  );

  return instance;
}
