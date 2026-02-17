"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useListNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetUnreadCountQuery,
} from "@/app/store/api";

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation("notifications");

  const { data: notificationsData, isLoading } = useListNotificationsQuery({ page });
  const { data: unreadData } = useGetUnreadCountQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const handleMarkRead = async (notificationId: number) => {
    try {
      await markRead(notificationId).unwrap();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
      alert("All notifications marked as read!");
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const notifications = notificationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
            <p className="text-gray-600 mt-2">
              {unreadData?.unread_count || 0} {t("unreadCount")}
            </p>
          </div>
          {(unreadData?.unread_count || 0) > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {t("markAllAsRead")}
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">{t("empty")}</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow p-6 border-l-4 transition ${
                  notification.is_read ? "border-gray-300" : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          notification.notification_type === "new_message"
                            ? "bg-blue-100 text-blue-800"
                            : notification.notification_type === "new_like"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {notification.notification_type.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>

                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkRead(notification.id)}
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm whitespace-nowrap"
                    >
                      {t("markAsRead")}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {notificationsData && (notificationsData.next || notificationsData.previous) && (
          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!notificationsData.previous}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              {t("pagination.previous")}
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!notificationsData.next}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              {t("pagination.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
