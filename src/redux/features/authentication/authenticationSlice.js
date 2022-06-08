import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: null
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload
    },
    logout: (state) => {
      state.name = null
    }
  }
});

export const {login, logout} = authenticationSlice.actions;

export const selectUserName = (state) => state.authentication.name;

export default authenticationSlice.reducer;