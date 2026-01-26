import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";
import { setCredentials, logout } from "../slices/authSlice";

const baseUrl = "http://89.236.218.90/api";

// Standard fetchBaseQuery used to make requests
const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// Wrap baseQuery to handle 401s by attempting token refresh and retrying once
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // try the original request
  // debug: show outgoing request and current token
  try {
    const token = (api.getState() as RootState).auth.accessToken;
    // eslint-disable-next-line no-console
    console.debug("baseApi request", { args, token });
  } catch (e) {
    // ignore
  }

  let result = await rawBaseQuery(args, api, extraOptions);

  // 404 errors'lar uchun warning'lar suppress qilish (optional endpoints)
  if (result.error && result.error.status === 404) {
    // 404 silent'da handle qilish - bu optional endpoints
    return result;
  }

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    // debug
    // eslint-disable-next-line no-console
    console.warn("baseApi detected 401 — attempting refresh", { refreshToken });
    if (!refreshToken) {
      // no refresh token, logout
      // eslint-disable-next-line no-console
      console.warn("No refresh token available — logging out");
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );

    // eslint-disable-next-line no-console
    console.debug("refreshResult", refreshResult);
    if (refreshResult.data) {
      // backend returns at least { access: string }
      const data: any = refreshResult.data;
      const newAccess = data.access;
      const newRefresh = data.refresh ?? refreshToken;

      // update redux state and localStorage
      const currentUser = (api.getState() as RootState).auth.user ?? null;
      api.dispatch(
        setCredentials({ access: newAccess, refresh: newRefresh, user: currentUser })
      );
      // debug
      // eslint-disable-next-line no-console
      console.info("Token refresh succeeded — updated credentials");

      // retry original request with new token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // refresh failed, logout
      // eslint-disable-next-line no-console
      console.error("Token refresh failed", refreshResult.error);
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
