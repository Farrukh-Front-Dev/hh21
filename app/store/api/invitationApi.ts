import { baseApi } from "./baseApi";

export type InvitationStatus = "pending" | "accepted" | "rejected";

export interface Invitation {
  id: number;
  employer: number;
  employer_company: string;
  candidate: number;
  candidate_name: string;
  message: string;
  status: InvitationStatus;
  created_at: string;
  updated_at: string;
}

export interface InvitationCreate {
  candidate: number;
  message: string;
}

export interface ListInvitationsParams {
  page?: number;
}

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listInvitations: builder.query<
      {
        results: Invitation[];
        count: number;
        next?: string | null;
        previous?: string | null;
      },
      ListInvitationsParams | void
    >({
      query: (params) => ({
        url: "/invitations/",
        params,
      }),
    }),

    getInvitation: builder.query<Invitation, number>({
      query: (id) => `/invitations/${id}/`,
    }),

    createInvitation: builder.mutation<Invitation, InvitationCreate>({
      query: (body) => ({
        url: "/invitations/",
        method: "POST",
        body,
      }),
    }),

    acceptInvitation: builder.mutation<Invitation, number>({
      query: (id) => ({
        url: `/invitations/${id}/accept/`,
        method: "POST",
        body: {},
      }),
    }),

    rejectInvitation: builder.mutation<Invitation, number>({
      query: (id) => ({
        url: `/invitations/${id}/reject/`,
        method: "POST",
        body: {},
      }),
    }),

    getPendingInvitations: builder.query<Invitation, void>({
      query: () => "/invitations/pending/",
    }),

    updateInvitation: builder.mutation<Invitation, { id: number; body: Partial<Invitation> }>({
      query: ({ id, body }) => ({
        url: `/invitations/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deleteInvitation: builder.mutation<void, number>({
      query: (id) => ({
        url: `/invitations/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useListInvitationsQuery,
  useGetInvitationQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
  useGetPendingInvitationsQuery,
  useUpdateInvitationMutation,
  useDeleteInvitationMutation,
} = invitationApi;
