import { baseApi } from "./baseApi";

export interface Invitation {
  id: string;
  posting: string;
  employer: string;
  candidate: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
}

export interface ListInvitationsParams {
  page?: number;
  page_size?: number;
  status?: string;
}

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listInvitations: builder.query<
      {
        results: Invitation[];
        count: number;
        next?: string;
        previous?: string;
      },
      ListInvitationsParams
    >({
      query: (params) => ({
        url: "/invitations/",
        params,
      }),
    }),

    createInvitation: builder.mutation<
      Invitation,
      { posting_id: string; candidate_id: string }
    >({
      query: (body) => ({
        url: "/invitations/",
        method: "POST",
        body,
      }),
    }),

    acceptInvitation: builder.mutation<Invitation, string>({
      query: (id) => ({
        url: `/invitations/${id}/accept/`,
        method: "POST",
      }),
    }),

    rejectInvitation: builder.mutation<Invitation, string>({
      query: (id) => ({
        url: `/invitations/${id}/reject/`,
        method: "POST",
      }),
    }),

    getPendingInvitations: builder.query<
      { results: Invitation[]; count: number },
      void
    >({
      query: () => "/invitations/pending/",
    }),
  }),
});

export const {
  useListInvitationsQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
  useGetPendingInvitationsQuery,
} = invitationApi;
