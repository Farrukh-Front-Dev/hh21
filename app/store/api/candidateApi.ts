import { baseApi } from "./baseApi";

export interface Candidate {
  id: string;
  user: string;
  full_name: string;
  email: string;
  phone?: string;
  photo?: string;
  bio?: string;
  experience_years?: number;
  skills?: string[];
  education?: string;
  location?: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface CandidateDashboard {
  postings_count: number;
  likes_count: number;
  pending_invitations: number;
  recent_postings: any[];
  profile_completion_percentage: number;
}

export interface ListCandidatesParams {
  page?: number;
  page_size?: number;
  search?: string;
  experience_min?: number;
  location?: string;
}

export const candidateApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    listCandidates: builder.query<
      { results: Candidate[]; count: number; next?: string; previous?: string },
      ListCandidatesParams
    >({
      query: (params) => ({
        url: "/candidates/",
        params,
      }),
    }),

    getCandidate: builder.query<Candidate, string>({
      query: (id) => `/candidates/${id}/`,
    }),

    getCurrentCandidate: builder.query<Candidate, void>({
      query: () => "/candidates/me/",
    }),

    completeProfile: builder.mutation<
      Candidate,
      Partial<Candidate>
    >({
      query: (body) => ({
        url: "/candidates/me/",
        method: "PATCH",
        body,
      }),
    }),

    updateCandidate: builder.mutation<
      Candidate,
      { id: string; body: Partial<Candidate> }
    >({
      query: ({ id, body }) => ({
        url: `/candidates/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    getDashboard: builder.query<CandidateDashboard, void>({
      query: () => "/candidates/dashboard/",
    }),
  }),
});

export const {
  useListCandidatesQuery,
  useGetCandidateQuery,
  useGetCurrentCandidateQuery,
  useCompleteProfileMutation,
  useUpdateCandidateMutation,
  useGetDashboardQuery: useGetCandidateDashboardQuery,
} = candidateApi;
