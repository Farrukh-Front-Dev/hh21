import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { access: string; refresh: string; user?: any },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation<
      any,
      { email: string; password: string; password_confirm: string; role: "candidate" | "employer" }
    >({
      query: (data) => ({
        url: "/auth/register/",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query<any, void>({
      query: () => ({ url: "/auth/me/", method: "GET" }),
    }),
    verifyEmail: builder.mutation<any, string>({
      query: (token) => ({ url: `/auth/verify-email/${token}/`, method: "POST" }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
  useVerifyEmailMutation,
} = authApi;
