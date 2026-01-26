import { baseApi } from "./baseApi";

export interface Employer {
  id: string;
  user: string;
  company_name: string;
  email: string;
  phone?: string;
  logo?: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  company_size?: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmployerDashboard {
  postings_count: number;
  liked_candidates: number;
  recent_conversations: number;
  top_candidates: any[];
  profile_completion_percentage: number;
}

export interface ListEmployersParams {
  page?: number;
  page_size?: number;
  search?: string;
  industry?: string;
  location?: string;
}

export const employerApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    listEmployers: builder.query<
      { results: Employer[]; count: number; next?: string; previous?: string },
      ListEmployersParams
    >({
      query: (params) => ({
        url: "/employers/",
        params,
      }),
    }),

    getEmployer: builder.query<Employer, string>({
      query: (id) => `/employers/${id}/`,
    }),

    getCurrentEmployer: builder.query<Employer, void>({
      query: () => "/employers/me/",
    }),

    completeProfile: builder.mutation<
      Employer,
      Partial<Employer>
    >({
      query: (body) => ({
        url: "/employers/me/",
        method: "PATCH",
        body,
      }),
    }),

    updateEmployer: builder.mutation<
      Employer,
      { id: string; body: Partial<Employer> }
    >({
      query: ({ id, body }) => ({
        url: `/employers/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    getDashboard: builder.query<EmployerDashboard, void>({
      query: () => "/employers/dashboard/",
    }),
  }),
});

export const {
  useListEmployersQuery,
  useGetEmployerQuery,
  useGetCurrentEmployerQuery,
  useCompleteProfileMutation: useCompleteEmployerProfileMutation,
  useUpdateEmployerMutation,
  useGetDashboardQuery: useGetEmployerDashboardQuery,
} = employerApi;
