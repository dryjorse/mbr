import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = import.meta.env.VITE_API_URL;
export const $api = axios.create({ baseURL: API_URL });
export const $apiPrivate = axios.create({ baseURL: API_URL });

export enum apiConfig {
  Profile = "profile/",
  Login = "auth/jwt/login/",
  Refresh = "auth/jwt/refresh/",
  Pay = "pay/",
  Payments = "payments/"
}

export enum queryKeys {
  Profile = "profile",
  Map = "map",
}

$apiPrivate.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("mbr-access-token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$apiPrivate.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.post<{ access: string }>(
          `${API_URL}/${apiConfig.Refresh}`,
          {
            refresh: Cookies.get("refresh"),
          }
        );
        localStorage.setItem("mbr-access-token", data.access);
        return $api.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  }
);
