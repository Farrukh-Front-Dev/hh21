import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";

// Import all API modules to register endpoints
import "./api/authApi";
import "./api/candidateApi";
import "./api/employerApi";
import "./api/postingApi";
import "./api/messageApi";
import "./api/notificationApi";
import "./api/invitationApi";
import "./api/likeApi";
import "./api/categoryApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
