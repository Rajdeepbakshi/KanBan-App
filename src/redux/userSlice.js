import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: storedUser || null,
  },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;
