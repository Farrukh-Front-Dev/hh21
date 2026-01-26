import { baseApi } from "./baseApi";

export interface Like {
  id: string;
  user: string;
  posting: string;
  created_at: string;
}

export interface ListLikesParams {
  page?: number;
  page_size?: number;
}

export const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listLikes: builder.query<
      { results: Like[]; count: number; next?: string; previous?: string },
      ListLikesParams
    >({
      query: (params) => ({
        url: "/likes/",
        params,
      }),
    }),

    toggleLike: builder.mutation<Like | { success: boolean }, string>({
      query: (posting_id) => ({
        url: `/likes/toggle/`,
        method: "POST",
        body: { posting_id },
      }),
    }),
  }),
});

export const { useListLikesQuery, useToggleLikeMutation } = likeApi;
