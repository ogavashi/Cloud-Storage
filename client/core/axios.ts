import axios from "axios";
import { parseCookies } from "nookies";

import * as utils from "@/utils";

const handleAxiosError = (error: any) => {
  const { code } = error;

  if (code === "ERR_NETWORK") {
    throw new Error("Check your connection");
  }

  const errorData = error.response?.data;

  const parsedErrors = utils.parseErrors(errorData) || "An error has occurred.";

  if (parsedErrors?.message) {
    throw new Error(parsedErrors.message as string);
  }

  throw parsedErrors;
};

axios.defaults.baseURL = "http://localhost:7777";

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const { _token } = parseCookies();

    config.headers.Authorization = "Bearer " + _token;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(handleAxiosError(error));
  }
);

export default axios;
