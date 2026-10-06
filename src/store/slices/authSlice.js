import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, {
  setTokens,
  clearTokens,
} from "../../api/axiosInstance";

// ================= INITIAL STATE =================
const storedUser = localStorage.getItem("user");
const storedRbac = localStorage.getItem("rbac");
const storedToken = localStorage.getItem("accessToken");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  rbac: storedRbac ? JSON.parse(storedRbac) : null,
  accessToken: storedToken || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const payload = data?.message?.data;

      if (!data?.success || !payload) {
        return rejectWithValue(data?.message || "Login failed");
      }

      const { user, rbac, accessToken, refreshToken } = payload;

      // Persist tokens & user data
      setTokens({ accessToken, refreshToken });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rbac", JSON.stringify(rbac));

      return { user, rbac, accessToken, refreshToken };
    } catch (err) {
      const message =
        err?.response?.data?.message?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      return rejectWithValue(message);
    }
  }
);

// ================= LOGOUT =================
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      // Even if API fails, clear local session
    } finally {
      clearTokens();
    }
    return true;
  }
);

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Helper: check if user has permission for module + action
    hasPermission: (state, action) => state, // (kept for structure; use selector instead)
    forceLogout: (state) => {
      clearTokens();
      state.user = null;
      state.rbac = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- LOGIN ----
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.rbac = action.payload.rbac;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      })
      // ---- LOGOUT ----
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.rbac = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, forceLogout } = authSlice.actions;
export default authSlice.reducer;