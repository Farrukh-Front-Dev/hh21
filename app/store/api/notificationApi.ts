import { baseApi } from "./baseApi";

export type NotificationTypeEnum = "new_message" | "new_like" | "new_invitation";
export type RelatedObjectTypeEnum = "message" | "like" | "invitation";

export interface Notification {
  id: number;
  recipient: number;
  notification_type: NotificationTypeEnum;
  title: string;
  message: string;
  related_object_id?: number | null;
  related_object_type?: RelatedObjectTypeEnum | null;
  is_read: boolean;
  created_at: string;
}

export interface UnreadCount {
  unread_count: number;
}

export interface ListNotificationsParams {
  page?: number;
  is_read?: boolean;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listNotifications: builder.query<
      {
        results: Notification[];
        count: number;
        next?: string | null;
        previous?: string | null;
      },
      ListNotificationsParams | void
    >({
      query: (params) => ({
        url: "/notifications/",
        params,
      }),
    }),

    getNotification: builder.query<Notification, number>({
      query: (id) => `/notifications/${id}/`,
    }),

    markNotificationRead: builder.mutation<Notification, number>({
      query: (id) => ({
        url: `/notifications/${id}/mark_read/`,
        method: "POST",
        body: {},
      }),
    }),

    markAllNotificationsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/mark_all_read/",
        method: "POST",
        body: {},
      }),
    }),

    getUnreadCount: builder.query<UnreadCount, void>({
      query: () => "/notifications/unread_count/",
    }),
  }),
});

export const {
  useListNotificationsQuery,
  useGetNotificationQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetUnreadCountQuery,
} = notificationApi;
