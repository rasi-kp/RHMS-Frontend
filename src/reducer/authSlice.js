// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    role:null,
    userid: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    userid: (state, action) => {
      state.userid = action.payload.userid
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.userid = null;
    },
  },
});

export const { loginSuccess, userid, logout } = authSlice.actions;

export default authSlice.reducer;
