// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/auth-api/authApi";
import { STORAGE_KEYS } from "../../api/axiosInstance";

/* ---------- Helpers ---------- */
const readJSON = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const {
  TOKEN: TOKEN_KEY,
  REFRESH: REFRESH_KEY,
  USER: USER_KEY,
  RBAC: RBAC_KEY,
  INSURANCE_TYPE: IT_KEY,
  IS_LOGGED_IN,
} = STORAGE_KEYS;

/* ---------- Thunks ---------- */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authApi.login({ email, password });
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return true;
    } catch (err) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

/* ---------- Initial state ---------- */
const initialState = {
  user: readJSON(USER_KEY),
  rbac: readJSON(RBAC_KEY),
  insuranceType: readJSON(IT_KEY),
  accessToken: localStorage.getItem(TOKEN_KEY) || null,
  refreshToken: localStorage.getItem(REFRESH_KEY) || null,
  isAuthenticated: Boolean(localStorage.getItem(TOKEN_KEY)),
  loading: false,
  error: null,
};

/* ---------- Slice ---------- */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    setInsuranceType: (state, action) => {
      state.insuranceType = action.payload;
      if (action.payload) {
        localStorage.setItem(IT_KEY, JSON.stringify(action.payload));
      } else {
        localStorage.removeItem(IT_KEY);
      }
    },

    syncFromStorage: (state) => {
      state.rbac = readJSON(RBAC_KEY);
      state.user = readJSON(USER_KEY);
      state.insuranceType = readJSON(IT_KEY);
      state.accessToken = localStorage.getItem(TOKEN_KEY) || null;
      state.refreshToken = localStorage.getItem(REFRESH_KEY) || null;
      state.isAuthenticated = Boolean(localStorage.getItem(TOKEN_KEY));
    },

    forceLogout: (state) => {
      state.user = null;
      state.rbac = null;
      state.insuranceType = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      [TOKEN_KEY, REFRESH_KEY, USER_KEY, RBAC_KEY, IT_KEY, IS_LOGGED_IN].forEach(
        (k) => localStorage.removeItem(k)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, rbac, accessToken, refreshToken } = action.payload;

        state.loading = false;
        state.error = null;
        state.user = user;
        state.rbac = rbac;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;

        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_KEY, refreshToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(RBAC_KEY, JSON.stringify(rbac));
        localStorage.setItem(IS_LOGGED_IN, "true");

        const first = rbac?.insuranceTypes?.[0];
        if (first) {
          const itEntry = {
            id: first.id,
            name: first.insuranceTypeName,
            nameAlias: first.nameAlias,
            code: first.code,
            description: first.insuranceTypeDescription,
          };
          state.insuranceType = itEntry;
          localStorage.setItem(IT_KEY, JSON.stringify(itEntry));
        } else {
          state.insuranceType = null;
          localStorage.removeItem(IT_KEY);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.rbac = null;
        state.insuranceType = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.rbac = null;
        state.insuranceType = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const {
  clearError,
  setInsuranceType,
  syncFromStorage,
  forceLogout,
} = authSlice.actions;

export default authSlice.reducer;