import { baseApi } from "./baseApi";
import { CandidateProfile } from "./candidateApi";

export type WorkTypeEnum = "remote" | "onsite" | "hybrid";
export type EmploymentTypeEnum = "full_time" | "part_time" | "contract" | "freelance" | "internship";

export interface JobPostingList {
  id: number;
  title: string;
  category: number;
  category_name: string;
  candidate: number;
  candidate_name: string;
  candidate_city: string;
  years_of_experience?: number | null;
  is_active: boolean;
  like_count: number;
  created_at: string;
}

export interface JobPostingDetail {
  id: number;
  candidate: number;
  candidate_profile: CandidateProfile;
  title: string;
  description: string;
  category: number;
  category_name: string;
  skills?: string | null;
  programming_languages?: string | null;
  spoken_languages?: string | null;
  years_of_experience?: number | null;
  expected_salary?: number | null;
  work_type?: WorkTypeEnum | null;
  employment_type?: EmploymentTypeEnum | null;
  education?: string | null;
  certifications?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  resume_file?: string | null;
  additional_details?: string | null;
  is_active: boolean;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface JobPostingCreateUpdate {
  title: string;
  description: string;
  category: number;
  skills?: string | null;
  programming_languages?: string | null;
  spoken_languages?: string | null;
  years_of_experience?: number | null;
  expected_salary?: number | null;
  work_type?: WorkTypeEnum | null;
  employment_type?: EmploymentTypeEnum | null;
  education?: string | null;
  certifications?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  resume_file?: File | null;
  additional_details?: string | null;
  is_active?: boolean;
}

export interface ListPostingsParams {
  page?: number;
  search?: string;
  category?: number;
  city?: string;
  min_exp?: number;
}

export const postingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listPostings: builder.query<
      { results: JobPostingList[]; count: number; next?: string | null; previous?: string | null },
      ListPostingsParams | void
    >({
      query: (params) => ({
        url: "/postings/",
        params,
      }),
    }),

    getPosting: builder.query<JobPostingDetail, number>({
      query: (id) => `/postings/${id}/`,
    }),

    createPosting: builder.mutation<JobPostingDetail, FormData | JobPostingCreateUpdate>({
      query: (body) => ({
        url: "/postings/",
        method: "POST",
        body,
      }),
    }),

    updatePosting: builder.mutation<JobPostingDetail, { id: number; body: FormData | Partial<JobPostingCreateUpdate> }>({
      query: ({ id, body }) => ({
        url: `/postings/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deletePosting: builder.mutation<void, number>({
      query: (id) => ({
        url: `/postings/${id}/`,
        method: "DELETE",
      }),
    }),

    getMyPostings: builder.query<JobPostingDetail, void>({
      query: () => "/postings/my_postings/",
    }),

    togglePostingStatus: builder.mutation<JobPostingDetail, number>({
      query: (id) => ({
        url: `/postings/${id}/toggle_status/`,
        method: "POST",
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
