import { baseApi } from "./baseApi";

export interface Posting {
  id: string;
  author: string;
  title: string;
  description: string;
  category: string;
  required_experience?: number;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  views_count: number;
  likes_count: number;
}

export interface ListPostingsParams {
  page?: number;
  page_size?: number;
  search?: string;
  category?: string;
  city?: string;
  min_exp?: number;
  is_active?: boolean;
}

export const postingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listPostings: builder.query<
      { results: Posting[]; count: number; next?: string; previous?: string },
      ListPostingsParams
    >({
      query: (params) => ({
        url: "/postings/",
        params,
      }),
    }),

    getPosting: builder.query<Posting, string>({
      query: (id) => `/postings/${id}/`,
    }),

    createPosting: builder.mutation<Posting, Partial<Posting>>({
      query: (body) => ({
        url: "/postings/",
        method: "POST",
        body,
      }),
    }),

    updatePosting: builder.mutation<
      Posting,
      { id: string; body: Partial<Posting> }
    >({
      query: ({ id, body }) => ({
        url: `/postings/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deletePosting: builder.mutation<void, string>({
      query: (id) => ({
        url: `/postings/${id}/`,
        method: "DELETE",
      }),
    }),

    getMyPostings: builder.query<
      { results: Posting[]; count: number },
      ListPostingsParams
    >({
      query: (params) => ({
        url: "/postings/my-postings/",
        params,
      }),
    }),

    togglePostingStatus: builder.mutation<
      Posting,
      { id: string; is_active: boolean }
    >({
      query: ({ id, is_active }) => ({
        url: `/postings/${id}/toggle-status/`,
        method: "POST",
        body: { is_active },
      }),
    }),
  }),
});

export const {
  useListPostingsQuery,
  useGetPostingQuery,
  useCreatePostingMutation,
  useUpdatePostingMutation,
  useDeletePostingMutation,
  useGetMyPostingsQuery,
  useTogglePostingStatusMutation,
} = postingApi;
