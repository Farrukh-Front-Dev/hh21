import { baseApi } from "./baseApi";

export type LocationEnum =
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

export interface EmployerProfile {
  id: number;
  user: number;
  user_email: string;
  name: string;
  surname: string;
  phone: string;
  location: LocationEnum;
  company_name?: string | null;
  position?: string | null;
  profile_image?: string | null;
  description?: string | null;
  telegram_username?: string | null;
  linkedin_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployerDashboard {
  likes_count: number;
  invitations_sent: number;
  active_conversations: number;
  recent_likes: any[];
  profile_completion_percentage: number;
}

export interface ListEmployersParams {
  page?: number;
}

export const employerApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    listEmployers: builder.query<
      { results: EmployerProfile[]; count: number; next?: string | null; previous?: string | null },
      ListEmployersParams | void
    >({
      query: (params) => ({
        url: "/employers/",
        params,
      }),
    }),

    getEmployer: builder.query<EmployerProfile, number>({
      query: (id) => `/employers/${id}/`,
    }),

    getCurrentEmployer: builder.query<EmployerProfile, void>({
      query: () => "/employers/me/",
    }),

    completeProfile: builder.mutation<EmployerProfile, FormData | Partial<EmployerProfile>>({
      query: (body) => ({
        url: "/employers/complete/",
        method: "POST",
        body,
      }),
    }),

    updateEmployer: builder.mutation<EmployerProfile, { id: number; body: FormData | Partial<EmployerProfile> }>({
      query: ({ id, body }) => ({
        url: `/employers/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deleteEmployer: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employers/${id}/`,
        method: "DELETE",
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
  useDeleteEmployerMutation,
  useGetDashboardQuery: useGetEmployerDashboardQuery,
} = employerApi;
