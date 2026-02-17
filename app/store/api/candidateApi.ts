import { baseApi } from "./baseApi";

export type CityEnum =
  | "tashkent_city"
  | "tashkent_region"
  | "andijan"
  | "bukhara"
  | "fergana"
  | "jizzakh"
  | "namangan"
  | "navoiy"
  | "kashkadarya"
  | "samarkand"
  | "sirdarya"
  | "surkhandarya"
  | "karakalpakstan";

export type AvailabilityStatusEnum =
  | "actively_looking"
  | "open_to_offers"
  | "not_available";

export interface CandidateProfile {
  id: number;
  user: number;
  user_email: string;
  name: string;
  surname: string;
  phone: string;
  city: CityEnum;
  profile_image?: string | null;
  about_me?: string | null;
  telegram_username?: string | null;
  github_username?: string | null;
  sphere?: string | null;
  availability_status: AvailabilityStatusEnum;
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
}

export const candidateApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    listCandidates: builder.query<
      { results: CandidateProfile[]; count: number; next?: string | null; previous?: string | null },
      ListCandidatesParams | void
    >({
      query: (params) => ({
        url: "/candidates/",
        params,
      }),
    }),

    getCandidate: builder.query<CandidateProfile, number>({
      query: (id) => `/candidates/${id}/`,
    }),

    getCurrentCandidate: builder.query<CandidateProfile, void>({
      query: () => "/candidates/me/",
    }),

    completeProfile: builder.mutation<CandidateProfile, FormData | Partial<CandidateProfile>>({
      query: (body) => ({
        url: "/candidates/complete/",
        method: "POST",
        body,
      }),
    }),

    updateCandidate: builder.mutation<CandidateProfile, { id: number; body: FormData | Partial<CandidateProfile> }>({
      query: ({ id, body }) => ({
        url: `/candidates/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deleteCandidate: builder.mutation<void, number>({
      query: (id) => ({
        url: `/candidates/${id}/`,
        method: "DELETE",
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
  useDeleteCandidateMutation,
  useGetDashboardQuery: useGetCandidateDashboardQuery,
} = candidateApi;
