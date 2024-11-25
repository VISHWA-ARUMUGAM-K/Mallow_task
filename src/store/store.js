import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { reqresApi } from "./api/apiSlice";
import userReducer from "../features/User/Slices/userSlice";

export const store = configureStore({
  reducer: {
    [reqresApi.reducerPath]: reqresApi.reducer,
    auth: authReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reqresApi.middleware),
});
