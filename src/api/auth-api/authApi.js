// src/api/authApi.js
import axiosInstance, {
  setTokens,
  clearAuth,
  getRefreshToken,
} from "../axiosInstance";

/* ---------------- Helpers ---------------- */
const extractError = (error) => {
  const data = error?.response?.data;
  return (
    data?.message?.message ||
    data?.message ||
    error?.message ||
    "Something went wrong"
  );
};

/* ---------------- API METHODS ---------------- */

export const login = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    const json = res.data;

    if (!json?.success) {
      throw new Error(
        json?.message?.message || json?.message || "Login failed"
      );
    }

    const payload = json.message.data;

    if (payload?.accessToken) {
      setTokens({
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      });
    }

    return payload;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export const logout = async () => {
  try {
    const refreshToken = getRefreshToken();
    await axiosInstance.post("/auth/logout", { refreshToken });
  } catch {
    // swallow — logout should never fail locally
  } finally {
    clearAuth();
  }
  return true;
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await axiosInstance.post("/auth/refresh-token", {
      refreshToken,
    });
    const payload = res.data?.message?.data || res.data?.data;
    if (payload?.accessToken) {
      setTokens({ accessToken: payload.accessToken });
    }
    return payload;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data?.message?.data || res.data?.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axiosInstance.post("/auth/forgot-password", { email });
    return res.data?.message || res.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export const resetPassword = async ({ token, newPassword }) => {
  try {
    const res = await axiosInstance.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return res.data?.message || res.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

/* ---------------- Default Export ---------------- */
const authApi = {
  login,
  logout,
  refreshAccessToken,
  fetchCurrentUser,
  forgotPassword,
  resetPassword,
};

export default authApi;