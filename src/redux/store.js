import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
