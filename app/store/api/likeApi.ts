import { baseApi } from "./baseApi";

export interface Like {
  id: number;
  employer: number;
  posting: number;
  posting_title: string;
  candidate_name: string;
  created_at: string;
}

export interface ListLikesParams {
  page?: number;
}

export const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listLikes: builder.query<
      { results: Like[]; count: number; next?: string | null; previous?: string | null },
      ListLikesParams | void
    >({
      query: (params) => ({
        url: "/likes/",
        params,
      }),
    }),

    getLike: builder.query<Like, number>({
      query: (id) => `/likes/${id}/`,
    }),

    createLike: builder.mutation<Like, { posting: number }>({
      query: (body) => ({
        url: "/likes/",
        method: "POST",
        body,
      }),
    }),

    toggleLike: builder.mutation<Like, { posting: number }>({
      query: (body) => ({
        url: "/likes/toggle/",
        method: "POST",
        body,
      }),
    }),

    updateLike: builder.mutation<Like, { id: number; body: { posting: number } }>({
      query: ({ id, body }) => ({
        url: `/likes/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deleteLike: builder.mutation<void, number>({
      query: (id) => ({
        url: `/likes/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useListLikesQuery,
  useGetLikeQuery,
  useCreateLikeMutation,
  useToggleLikeMutation,
  useUpdateLikeMutation,
  useDeleteLikeMutation,
} = likeApi;
