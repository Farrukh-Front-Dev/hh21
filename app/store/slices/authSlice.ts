import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
  role: string;
  is_verified: boolean;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

// Initial state uchun localStorage’dan o‘qish
const initialState: AuthState = {
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("access") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refresh") : null,
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access: string; refresh: string; user: User }>
    ) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.user = action.payload.user;

      // localStorage’ga saqlash
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      // localStorage’dan tozalash
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
