// src/api/axiosInstance.js
import axios from "axios";

// ================= ENV CONFIG =================
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const API_KEY = import.meta.env.VITE_API_KEY || "your-x-api-key";
const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

// ================= STORAGE KEYS =================
export const STORAGE_KEYS = {
  TOKEN: "accessToken",
  REFRESH: "refreshToken",
  USER: "user",
  RBAC: "rbac",
  INSURANCE_TYPE: "selectedInsuranceType",
  IS_LOGGED_IN: "isLoggedIn",
};

// ================= AXIOS INSTANCE =================
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "x-app-version": APP_VERSION,
  },
  timeout: 15000,
});

// ================= TOKEN HELPERS =================
export const getAccessToken = () =>
  localStorage.getItem(STORAGE_KEYS.TOKEN);

export const getRefreshToken = () =>
  localStorage.getItem(STORAGE_KEYS.REFRESH);

export const setTokens = ({ accessToken, refreshToken } = {}) => {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH, refreshToken);
};

export const setAuthData = ({ user, rbac } = {}) => {
  if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  if (rbac) localStorage.setItem(STORAGE_KEYS.RBAC, JSON.stringify(rbac));
  localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true");
};

export const clearAuth = () => {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
};

// Backwards-compat alias (in case any file still imports clearTokens)
export const clearTokens = clearAuth;

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR (Refresh Token) =================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh for auth endpoints
    const skipUrls = ["/auth/login", "/auth/refresh-token", "/auth/logout"];
    if (skipUrls.some((url) => originalRequest?.url?.includes(url))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
              "x-app-version": APP_VERSION,
            },
          }
        );

        const newAccessToken =
          data?.message?.data?.accessToken || data?.data?.accessToken;

        if (!newAccessToken) throw new Error("Invalid refresh response");

        localStorage.setItem(STORAGE_KEYS.TOKEN, newAccessToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;