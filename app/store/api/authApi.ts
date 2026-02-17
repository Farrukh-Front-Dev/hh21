import { baseApi } from "./baseApi";

export interface User {
  id: number;
  email: string;
  role: "candidate" | "employer";
  is_verified: boolean;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirm: string;
  role: "candidate" | "employer";
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  password_confirm: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation<any, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register/",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),

    getMe: builder.query<User, void>({
      query: () => ({ url: "/auth/me/", method: "GET" }),
    }),

    verifyEmail: builder.mutation<any, string>({
      query: (token) => ({ 
        url: `/auth/verify-email/${token}/`, 
        method: "POST" 
      }),
    }),

    requestPasswordReset: builder.mutation<any, PasswordResetRequest>({
      query: (data) => ({
        url: "/auth/password-reset/request/",
        method: "POST",
        body: data,
      }),
    }),

    confirmPasswordReset: builder.mutation<any, PasswordResetConfirm>({
      query: ({ token, ...data }) => ({
        url: `/auth/password-reset/confirm/${token}/`,
        method: "POST",
        body: data,
      }),
    }),

    refreshToken: builder.mutation<{ access: string; refresh: string }, { refresh: string }>({
      query: (data) => ({
        url: "/auth/token/refresh/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
  useVerifyEmailMutation,
  useRequestPasswordResetMutation,
  useConfirmPasswordResetMutation,
  useRefreshTokenMutation,
} = authApi;
