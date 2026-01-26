import { baseApi } from "./baseApi";

export interface Notification {
  id: string;
  user: string;
  type: string;
  title: string;
  message: string;
  related_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface UnreadCount {
  unread_count: number;
}

export interface ListNotificationsParams {
  page?: number;
  page_size?: number;
  is_read?: boolean;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listNotifications: builder.query<
      {
        results: Notification[];
        count: number;
        next?: string;
        previous?: string;
      },
      ListNotificationsParams
    >({
      query: (params) => ({
        url: "/notifications/",
        params,
      }),
    }),

    markNotificationRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `/notifications/${id}/mark-read/`,
        method: "POST",
      }),
    }),

    markAllNotificationsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/mark-all-read/",
        method: "POST",
      }),
    }),

    getUnreadCount: builder.query<UnreadCount, void>({
      query: () => "/notifications/unread-count/",
    }),
  }),
});

export const {
  useListNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetUnreadCountQuery,
} = notificationApi;
