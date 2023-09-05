import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  // name of slice (must be unique)
  name: 'auth',
  initialState: {
    status: false,
    auth:[],
    user: null,
  },
  reducers: {
    // action: action handler
    login: (state, action) => {
      state.status = true
      state.user = action.payload;
    },
    // action: action handler
    logout: (state) => {
      state.status = false
      state.user = null;
    },
  },
})

export const { login, logout } = authSlice.actions
export const selectUser = (state) => state.auth.user; // Selector for user information
export default authSlice.reducer
