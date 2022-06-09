import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import authenticationService from "../../../services/authenticationService";

const initialState = {
  currentUser: null,
  loading: false,
  error: null
};

const getCurrentUser = () => {
  const expirationString = localStorage.getItem("expirationTime");
  if (!expirationString) {
    return null;
  }

  const expirationTime = new Date(expirationString);
  if (expirationTime <= Date.now()) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return null;
  }

  return JSON.parse(localStorage.getItem("user"));
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("user");
    },
    loadCurrentUserFromLocal: (state) => {
      state.currentUser = getCurrentUser()
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("expirationTime", action.payload.expirationTime);
        localStorage.setItem("user", JSON.stringify(action.payload.user));

        state.currentUser = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const loginAsync = createAsyncThunk(
  "authentication/loginAsync",
  async (loginForm) => {
    const response = await authenticationService.login(loginForm);
    return response;
  }
);

export const { logout, loadCurrentUserFromLocal } = authenticationSlice.actions;

export const selectCurrentUser = (state) => state.authentication.currentUser;
export const selectLoading = (state) => state.authentication.loading;
export const selectError = (state) => state.authentication.error;

export default authenticationSlice.reducer;