import axios from "axios";
import { useUserStore } from "@/05-entities/user/userStore";

const backend = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api`,
  timeout: 20_000,
  headers: {
    Accept: "application/json",
  },
  /*withCredentials: false,*/
});

backend.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();

    config.headers = {
      ...config.headers.common,
      Accept: "application/json",
      Authorization: `Bearer ${userStore.bearerToken}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backend.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const userStore = useUserStore();
      userStore.$patch((state) => {
        state.isAuthenticated = false;
        state.bearerToken = undefined;
      });
    }

    throw error;
  }
);

export default backend;
